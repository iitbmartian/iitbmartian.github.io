
import React from 'react';
import CompetitionCard from './CompetitionCard';
import { competitionsData } from './CompetitionsData';

const CompetitionsList = () => {
  return (
    <div className="space-y-10">
      {competitionsData.map((competition, index) => (
        <CompetitionCard key={index} {...competition} />
      ))}
    </div>
  );
};

export default CompetitionsList;
