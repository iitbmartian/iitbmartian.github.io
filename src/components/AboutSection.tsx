
import React from 'react';
import { Award, Flag, Users, Star, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

const AboutSection = () => {
  const figures = [
    { 
      number: "12+", 
      text: "Years and counting!", 
      icon: <Star className="h-6 w-6 text-cosmic" />
    },
    { 
      number: "50+", 
      text: "Active team members", 
      icon: <Users className="h-6 w-6 text-mars" />
    },
    { 
      number: "6", 
      text: "Entirely different rovers", 
      icon: <Rocket className="h-6 w-6 text-cosmic" />
    },
    { 
      number: "∞", 
      text: "Uncountable learnings!", 
      icon: <Star className="h-6 w-6 text-mars" />
    }
  ];

  const highlights = [
    "Secured First position among all Indian teams in University Rover Challenge 2023, USA",
    "Secured 6th rank in Bio-sciences task in University Rover Challenge 2023, USA",
    "Achieved Excellence Award in Autonomous category in International Rover Challenge 2023",
    "Secured 5th Position out of 18 teams in International Rover Challenge IRC 2023",
    "Achieved Excellence Award in Navigation Task in European Rover Challenge 2022"
  ];

  return (
    <section id="about" className="section-padding bg-space-dark relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-mars/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-cosmic/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">About Us</h2>
          <p className="section-subtitle max-w-4xl mx-auto">
            Founded in 2012, MRT (Mars Rover Team) was established with a vision to make 
            significant strides in space exploration and autonomous robotics. Over the years, 
            our team has fostered an environment of inclusive growth and continuous learning, 
            leading to remarkable progress and consistent success in premier international competitions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold mb-6 font-technospace">Our Vision</h3>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start">
                <Flag className="h-5 w-5 text-mars mr-3 mt-1 flex-shrink-0" />
                <span>Establish IIT Bombay as a global leader in space robotics</span>
              </li>
              <li className="flex items-start">
                <Flag className="h-5 w-5 text-mars mr-3 mt-1 flex-shrink-0" />
                <span>Innovate in Mars Rover technology</span>
              </li>
              <li className="flex items-start">
                <Flag className="h-5 w-5 text-mars mr-3 mt-1 flex-shrink-0" />
                <span>Nurture sustainable and skilled talent pipeline</span>
              </li>
              <li className="flex items-start">
                <Flag className="h-5 w-5 text-mars mr-3 mt-1 flex-shrink-0" />
                <span>Contribute to advancements in planetary exploration</span>
              </li>
              <li className="flex items-start">
                <Flag className="h-5 w-5 text-mars mr-3 mt-1 flex-shrink-0" />
                <span>Build a legacy of engineering excellence and impactful research</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-6 font-technospace">Our Mission</h3>
            <p className="text-white/80">
              To design, develop, and innovate cutting-edge extraterrestrial robotic solutions 
              while fostering a culture of excellence, collaboration, and technical expertise 
              among students. Through hands-on learning and global competitions, we aim to push 
              the boundaries of autonomous robotics and inspire the next generation of engineers.
            </p>
          </div>
        </div>
        
        {/* Key figures */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {figures.map((figure, index) => (
            <div key={index} className="bg-space-light/30 rounded-xl p-6 text-center transform hover:-translate-y-2 transition-transform duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-mars/20 to-cosmic/20 rounded-full">
                  {figure.icon}
                </div>
              </div>
              <h4 className="text-4xl font-bold text-gradient mb-2 font-technospace">{figure.number}</h4>
              <p className="text-white/70">{figure.text}</p>
            </div>
          ))}
        </div>
        
        {/* Highlights */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center font-technospace">When this team thrived globally</h2>
          <div className="bg-space-light/30 rounded-xl p-8 border border-white/10">
            <ul className="space-y-5">
              {highlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <Award className="h-6 w-6 text-cosmic mr-4 mt-1 flex-shrink-0" />
                  <p className="text-white/90">{highlight}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
