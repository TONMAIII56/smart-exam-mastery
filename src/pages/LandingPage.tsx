
import React, { useState } from 'react';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { SampleQuestion } from '@/components/landing/SampleQuestion';
import { Testimonials } from '@/components/landing/Testimonials';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { CtaSection } from '@/components/landing/CtaSection';
import { Footer } from '@/components/landing/Footer';
import { LandingNavbar } from '@/components/landing/LandingNavbar';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <Hero />
      <Features />
      <SampleQuestion />
      <Testimonials />
      <HowItWorks />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
