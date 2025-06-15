
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-PAID-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const { planId, paymentMethodId } = await req.json();
    logStep("Request data", { planId, paymentMethodId });

    if (!planId) {
      throw new Error("Plan ID is required");
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { 
      apiVersion: "2023-10-16" 
    });

    // Check if customer already exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing customer found", { customerId });
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          user_id: user.id,
        },
      });
      customerId = customer.id;
      logStep("New customer created", { customerId });
    }

    // Define price mapping
    const priceMapping: Record<string, { amount: number; interval: string; product_name: string }> = {
      premium_monthly: { 
        amount: 13900, 
        interval: "month",
        product_name: "Premium รายเดือน"
      },
      premium_yearly: { 
        amount: 139000, 
        interval: "year",
        product_name: "Premium รายปี"
      }
    };

    const priceInfo = priceMapping[planId];
    if (!priceInfo) {
      throw new Error("Invalid plan selected");
    }

    // Create or retrieve price
    const prices = await stripe.prices.list({
      lookup_keys: [planId],
      limit: 1,
    });

    let priceId;
    if (prices.data.length > 0) {
      priceId = prices.data[0].id;
    } else {
      // Create new price
      const price = await stripe.prices.create({
        currency: "thb",
        unit_amount: priceInfo.amount,
        recurring: { interval: priceInfo.interval as any },
        product_data: {
          name: priceInfo.product_name,
          description: `เข้าถึงข้อสอบทั้งหมด ไม่จำกัด${priceInfo.interval === 'year' ? ' + ประหยัด 42%' : ''}`,
        },
        lookup_key: planId,
      });
      priceId = price.id;
    }

    // Check if payment method is provided
    if (paymentMethodId) {
      // Attach payment method to customer
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });

      // Set as default payment method
      await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
    }

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      default_payment_method: paymentMethodId,
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        user_id: user.id,
        plan: planId,
      },
    });

    logStep("Subscription created", { 
      subscriptionId: subscription.id,
      status: subscription.status 
    });

    // Update subscription in database
    await supabaseClient.from("subscriptions").upsert({
      user_id: user.id,
      plan: planId === 'premium_yearly' ? 'premium' : 'premium',
      status: subscription.status === 'active' ? 'active' : 'inactive',
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });

    logStep("Database updated with subscription info");

    // Handle payment intent status
    const invoice = subscription.latest_invoice as any;
    const paymentIntent = invoice?.payment_intent;

    if (paymentIntent?.status === 'requires_action') {
      return new Response(JSON.stringify({
        subscription_id: subscription.id,
        client_secret: paymentIntent.client_secret,
        status: 'requires_action',
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    if (paymentIntent?.status === 'succeeded' || subscription.status === 'active') {
      return new Response(JSON.stringify({
        subscription_id: subscription.id,
        status: 'success',
        message: 'สมัครสมาชิกสำเร็จ',
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    return new Response(JSON.stringify({
      subscription_id: subscription.id,
      status: subscription.status,
      message: 'การสมัครสมาชิกอยู่ระหว่างการประมวลผล',
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ 
      error: errorMessage,
      status: 'error'
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
