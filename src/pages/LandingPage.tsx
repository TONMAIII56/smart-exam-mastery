
import React from 'react';
import { Hero } from '@/components/landing/Hero';
import { TrustSignals } from '@/components/landing/TrustSignals';
import { Features } from '@/components/landing/Features';
import { SampleQuestion } from '@/components/landing/SampleQuestion';
import { Testimonials } from '@/components/landing/Testimonials';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { BeforeAfterComparison } from '@/components/landing/BeforeAfterComparison';
import { PremiumPlans } from '@/components/landing/PremiumPlans';
import { AnalyticsDashboard } from '@/components/landing/AnalyticsDashboard';
import { FAQ } from '@/components/subscription/FAQ';
import { SatisfactionGuarantee } from '@/components/landing/SatisfactionGuarantee';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/landing/Footer';
import { LandingNavbar } from '@/components/landing/LandingNavbar';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <Hero />
      <TrustSignals />
      <HowItWorks />
      <Features />
      <BeforeAfterComparison />
      <SampleQuestion />
      <Testimonials />
      <PremiumPlans />
      <AnalyticsDashboard />
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <FAQ />
      </div>
      <SatisfactionGuarantee />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
