
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CompetitionsHeader from '@/components/competitions/CompetitionsHeader';
import CompetitionsTimeline from '@/components/competitions/CompetitionsTimeline';
import CompetitionsList from '@/components/competitions/CompetitionsList';
import { timelineData } from '@/components/competitions/CompetitionsData';

const CompetitionsPage = () => {
  // Ensure the page scrolls to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-space">
      <Navbar />
      
      <section className="pt-28 pb-20 bg-space-dark relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-mars/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-cosmic/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 md:px-6">
          <CompetitionsHeader />
          <CompetitionsTimeline events={timelineData} />
          <CompetitionsList />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CompetitionsPage;
