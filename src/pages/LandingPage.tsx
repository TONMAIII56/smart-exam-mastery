
import React from 'react';
import { Hero } from '@/components/landing/Hero';
import { TrustSignals } from '@/components/landing/TrustSignals';
import { Features } from '@/components/landing/Features';
import { SampleQuestion } from '@/components/landing/SampleQuestion';
import { Testimonials } from '@/components/landing/Testimonials';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { BeforeAfterComparison } from '@/components/landing/BeforeAfterComparison';
import { CtaSection } from '@/components/landing/CtaSection';
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
      <CtaSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
