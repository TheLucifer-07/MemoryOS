import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

// Homepage Sections
import Hero from './Hero';
import LifeHappensFast from './LifeHappensFast';
import StoryProblem from './StoryProblem';
import Solution from './Solution';
import WhyMemoryOS from './WhyMemoryOS';
import ProductShowcase from './ProductShowcase';
import FeatureGrid from './FeatureGrid';
import FutureVision from './FutureVision';
import SecurityTrust from './SecurityTrust';
import SocialProof from './SocialProof';
import FAQ from './FAQ';
import FinalCTA from './FinalCTA';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background font-sans text-text selection:bg-primary-100 selection:text-primary-800">
      {/* Sticky Header */}
      <Navbar />

      {/* Main Homepage Flow */}
      <main>
        <Hero />
        <LifeHappensFast />
        <StoryProblem />
        <Solution />
        <WhyMemoryOS />
        <ProductShowcase />
        <FeatureGrid />
        <FutureVision />
        <SecurityTrust />
        <SocialProof />
        <FAQ />
        <FinalCTA />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
