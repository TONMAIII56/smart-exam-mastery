
import React from 'react';
import { LiquidGlassNavbar } from '@/components/landing/LiquidGlassNavbar';
import { LiquidGlassHero } from '@/components/landing/LiquidGlassHero';
import { LiquidGlassFeatures } from '@/components/landing/LiquidGlassFeatures';
import { LiquidGlassPremiumPlans } from '@/components/landing/LiquidGlassPremiumPlans';
import { LiquidGlassCTA } from '@/components/landing/LiquidGlassCTA';

const LiquidGlassLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <LiquidGlassNavbar />
      <LiquidGlassHero />
      <LiquidGlassFeatures />
      <LiquidGlassPremiumPlans />
      <LiquidGlassCTA />
    </div>
  );
};

export default LiquidGlassLanding;
