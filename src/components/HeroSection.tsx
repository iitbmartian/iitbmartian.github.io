
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MarsRoverLogo from '@/mrt/Logo/mrtLogo.png';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-space">
      {/* Background effects */}
      <div className="absolute inset-0 bg-hero-pattern opacity-50"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-mars/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-cosmic/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:space-x-12">
          <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
            <h4 className="text-mars font-technospace text-xl mb-3 animate-pulse-slow">
              IIT BOMBAY
            </h4>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-technospace mb-6">
              <span className="block">MARS ROVER</span>
              <span className="text-gradient">TEAM</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto lg:mx-0">
              A unique student-led initiative focused on designing and building advanced rovers 
              capable of extraterrestrial exploration. Our rovers are equipped for autonomous 
              traversal, onboard testing, and tackling challenges in space exploration.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-mars hover:bg-mars-dark text-white px-8 py-6 rounded-md w-full sm:w-auto">
                Explore Projects
              </Button>
              <Button variant="outline" className="border-cosmic text-cosmic hover:bg-cosmic/10 px-8 py-6 rounded-md w-full sm:w-auto">
                Meet The Team
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-r from-mars/5 to-cosmic/5 rounded-full blur-xl"></div>
              <img 
                src= {MarsRoverLogo} 
                alt="Mars Rover" 
                className="relative z-2rounded-xl"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-2 border-mars rounded-full"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-2 border-cosmic rounded-full"></div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-white/60 text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="text-white/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
