
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
      <Navbar />                {/* done */}
      <HeroSection />           {/* done */}
      <AboutSection />          {/* done */}
      <RoversSection />         {/* done */}
      <SubsystemsSection />     {/* done */}
      <CompetitionsSection />   {/* done */}
      <SponsorsSection />       {/* done */}  
      <ContactSection />        {/* done */}
      <Footer />                {/* done */}
    </div>
  );
};

export default Index;
