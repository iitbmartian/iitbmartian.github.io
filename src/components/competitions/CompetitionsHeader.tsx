
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CompetitionsHeader = () => {
  return (
    <div className="text-center mb-16">
      <h1 className="section-title">Competitive Records</h1>
      <p className="section-subtitle">
        Our journey through international rover competitions and the milestones we've achieved.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <Link to="/rover">
          <Button variant="default" className="bg-mars hover:bg-mars-dark">
            Our Rovers
          </Button>
        </Link>
        <Link to="/subsystems">
          <Button variant="outline" className="border-cosmic text-cosmic hover:bg-cosmic/10">
            Subsystems
          </Button>
        </Link>
        <Link to="/gallery">
          <Button variant="secondary" className="bg-space-light hover:bg-space-light/80">
            Gallery
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CompetitionsHeader;
