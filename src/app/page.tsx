
import React from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SubsystemsSection from '@/components/SubsystemsSection';
import CompetitionsSection from '@/components/CompetitionsSection';
import SponsorsSection from '@/components/SponsorsSection';
import ContactSection from '@/components/ContactSection';
import CCarousel from '@/components/CCarousel';

const Index = () => {
  return (
    <>
      <HeroSection />           
      <CCarousel/>     
      <SubsystemsSection />     
      <CompetitionsSection />   
      <AboutSection />     
      <SponsorsSection />         
      <ContactSection />        
    </>

  );
};

export default Index;
