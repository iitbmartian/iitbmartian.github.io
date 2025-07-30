
import React from 'react';
import { Award, MapPin } from 'lucide-react';

interface CompetitionResult {
  year: string;
  achievement: string;
  description: string;
}

export interface CompetitionProps {
  title: string;
  location: string;
  description: string;
  image: string;
  results: CompetitionResult[];
}

const CompetitionCard = ({ title, location, description, image, results }: CompetitionProps) => (
  <div className="mb-16 bg-space-light/20 rounded-xl overflow-hidden border border-white/10">
    <div className="md:flex">
      <div className="md:w-1/3 h-64 md:h-auto">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-half object-cover object-center"
        />
      </div>
      <div className="w-full p-6">
        <div className="flex items-center mb-2">
          <MapPin className="h-4 w-4 text-mars mr-2" />
          <span className="text-white/70">{location}</span>
        </div>
        <h2 className="text-2xl font-bold mb-3 font-technospace">{title}</h2>
        <p className="text-white/80 mb-6">{description}</p>
        
        <h3 className="text-xl font-semibold mb-4 font-technospace">Our Journey</h3>
        <div className="space-y-4">
          {results.map((result, index) => (
            <div key={index} className="flex">
              <div className="w-20 flex-shrink-0">
                <div className="bg-cosmic/20 rounded-full px-3 py-1 text-center text-white">
                  {result.year}
                </div>
              </div>
              <div className="ml-4 pl-4 border-l border-white/20">
                <h4 className="text-white font-semibold mb-1 flex items-center">
                  <Award className="h-4 w-4 text-mars mr-2" />
                  {result.achievement}
                </h4>
                <p className="text-white/70">{result.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default CompetitionCard;
