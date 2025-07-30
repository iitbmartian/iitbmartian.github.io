
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const RoversSection = () => {
  const rovers = [
    {
      name: "Akrula 1.0",
      year: "2015",
      image: "https://via.placeholder.com/600x400?text=Rover+Alpha"
    },
    {
      name: "Agathsya 1.0",
      year: "2016",
      image: "https://via.placeholder.com/600x400?text=Rover+Beta"
    },
    {
      name: "Agathsya 2.0",
      year: "2017",
      image: "https://via.placeholder.com/600x400?text=Rover+Gamma"
    },
    {
      name: "Hemant 1.0",
      year: "2018",
      image: "https://via.placeholder.com/600x400?text=Rover+Delta"
    },
    {
      name: "Agruni 1.0",
      year: "2019-20",
      image: "https://via.placeholder.com/600x400?text=Rover+Epsilon"
    },
    {
      name: "Yash",
      year: "2020-21",
      image: "https://via.placeholder.com/600x400?text=Rover+Zeta"
    },
    {
      name: "Tezant",
      year: "2022-23",
      image: "https://via.placeholder.com/600x400?text=Rover+Zeta"
    }, 
    {
      name: "Amaran",
      year: "2024",
      image: "https://via.placeholder.com/600x400?text=Rover+Zeta"
    }
  ];

  return (
    <section id="rovers" className="section-padding bg-space relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/3 left-0 w-1/2 h-1/3 bg-mars/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-0 w-1/3 h-1/2 bg-cosmic/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title"> Our Rovers Through The Years</h2>
          <p className="section-subtitle">
            Each rover represents a milestone in our journey, incorporating innovations and lessons from previous designs.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {rovers.map((rover, index) => (
            <div key={index} className="relative group overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-space-dark via-transparent to-transparent z-10"></div>
             
              <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                <h3 className="text-white font-semibold font-technospace">{rover.name}</h3>
                <p className="text-white/70 text-sm">{rover.year}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/rover">
            <Button className="bg-gradient-to-r from-mars to-cosmic hover:opacity-90 text-white group">
              Explore Our Rovers 
              <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RoversSection;
