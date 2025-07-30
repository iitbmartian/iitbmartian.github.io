
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import RoversSection from '@/components/RoversSection';
import SubsystemsSection from '@/components/SubsystemsSection';
import CompetitionsSection from '@/components/CompetitionsSection';
import SponsorsSection from '@/components/SponsorsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-space">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <RoversSection />
      <SubsystemsSection />
      <CompetitionsSection />
      <SponsorsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
