
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TeamSection from '@/components/TeamSection';

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-space">
      <Navbar />
      <div className="pt-20">
        <TeamSection />
      </div>
      <Footer />
    </div>
  );
};

export default TeamPage;
