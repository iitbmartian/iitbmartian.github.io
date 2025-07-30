
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  year: string;
  className?: string;
}

const ProjectCard = ({ title, description, image, year, className }: ProjectCardProps) => (
  <div className={cn("group relative overflow-hidden rounded-xl bg-space-light/30 hover:bg-space-light/50 transition-colors duration-300", className)}>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-space/90 z-10"></div>
    <img 
      src={image} 
      alt={title} 
      className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
    />
    <div className="relative z-20 p-6">
      <div className="bg-mars/90 text-white text-sm font-medium py-1 px-3 rounded-full inline-block mb-4">
        {year}
      </div>
      <h3 className="text-xl font-bold mb-2 font-technospace">{title}</h3>
      <p className="text-white/70 mb-4">{description}</p>
      <Button variant="ghost" className="text-cosmic group-hover:text-cosmic group-hover:underline p-0 h-auto">
        Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  </div>
);

const ProjectsSection = () => {
  const projects = [
    {
      title: "Rover Alpha",
      description: "Our first prototype rover capable of basic movement and object detection.",
      image: "https://via.placeholder.com/600x400?text=Rover+Alpha",
      year: "2016"
    },
    {
      title: "Rover Beta",
      description: "Second generation rover with improved navigation and sample collection systems.",
      image: "https://via.placeholder.com/600x400?text=Rover+Beta",
      year: "2018"
    },
    {
      title: "Rover Gamma",
      description: "Advanced rover with autonomous navigation and scientific instruments.",
      image: "https://via.placeholder.com/600x400?text=Rover+Gamma",
      year: "2020"
    },
    {
      title: "Rover Delta",
      description: "Latest generation rover with AI-powered systems and extended range capabilities.",
      image: "https://via.placeholder.com/600x400?text=Rover+Delta",
      year: "2022"
    }
  ];

  return (
    <section id="projects" className="section-padding bg-space relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/3 right-0 w-1/2 h-1/2 bg-mars/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-0 w-1/2 h-1/2 bg-cosmic/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Projects</h2>
          <p className="section-subtitle">
            Explore our journey of rover development through the years, from conception to competition-ready designs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              className={index % 2 === 1 ? "md:mt-12" : ""}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6 font-technospace">Competitions & Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-space-light/30 rounded-xl p-6 border border-mars/20">
              <div className="text-3xl font-bold text-mars mb-2">URC</div>
              <p className="text-white/80">University Rover Challenge Finalists 2022</p>
            </div>
            <div className="bg-space-light/30 rounded-xl p-6 border border-cosmic/20">
              <div className="text-3xl font-bold text-cosmic mb-2">ERC</div>
              <p className="text-white/80">European Rover Challenge 3rd Place 2021</p>
            </div>
            <div className="bg-space-light/30 rounded-xl p-6 border border-mars/20">
              <div className="text-3xl font-bold text-mars mb-2">IRC</div>
              <p className="text-white/80">Indian Rover Challenge Champions 2019-2022</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
