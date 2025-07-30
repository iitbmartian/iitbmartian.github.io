
import React from 'react';
import { Award, Globe, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CompetitionProps {
  title: string;
  description: string;
  location: string;
  image: string;
}

const Competition = ({ title, description, location, image }: CompetitionProps) => (
  <div className="bg-space-light/30 rounded-xl overflow-hidden">
    <div className="h-48 overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-6">
      <div className="flex items-center mb-2">
        <MapPin className="h-4 w-4 text-mars mr-2" />
        <span className="text-white/70 text-sm">{location}</span>
      </div>
      <h3 className="text-xl font-bold mb-2 font-technospace">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  </div>
);

const CompetitionsSection = () => {
  const competitions = [
    {
      title: "University Rover Challenge (URC)",
      description: "The world's premier robotics competition for university students, held annually in the desert of southern Utah, USA.",
      location: "Mars Desert Research Station, Utah, USA",
      image: "https://via.placeholder.com/600x400?text=URC"
    },
    {
      title: "International Rover Challenge (IRC)",
      description: "A competition that tests rovers' capabilities in various challenges simulating real Mars mission scenarios.",
      location: "India",
      image: "https://via.placeholder.com/600x400?text=IRC"
    },
    {
      title: "European Rover Challenge (ERC)",
      description: "One of the largest space and robotics events in Europe, featuring simulated Martian terrain challenges.",
      location: "Poland",
      image: "https://via.placeholder.com/600x400?text=ERC"
    }
  ];

  return (
    <section id="competitions" className="section-padding bg-space-dark relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/3 right-0 w-1/3 h-1/3 bg-mars/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-0 w-1/3 h-1/3 bg-cosmic/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">Proving Grounds For Our Capabilities</h2>
          <p className="section-subtitle">
            We test our rovers' capabilities and our team's skills in premier international competitions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {competitions.map((competition, index) => (
            <Competition key={index} {...competition} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/competitions">
            <Button className="bg-gradient-to-r from-mars to-cosmic hover:opacity-90 text-white px-8 py-6">
              View Our Competitive Records
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CompetitionsSection;
