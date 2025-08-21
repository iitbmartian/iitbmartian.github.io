"use client";
import React, { useRef, useMemo, useState, useCallback } from 'react';
import { Award, Flag, Users, Star, Rocket, Sparkles, Target, TrendingUp, Zap, Crown, Medal } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import RoverIcon from "@/components/icons/RoverIcon"
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const AboutSection = () => {
  const router = useRouter();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const visionMissionRef = useRef(null);
  const figuresRef = useRef(null);
  const highlightsRef = useRef(null);
  
  // Standardized useInView settings for consistent animations
  const headerInView = useInView(headerRef, { 
    once: false, 
    margin: "-20% 0px -20% 0px",
    amount: 0.2
  });

  const visionMissionInView = useInView(visionMissionRef, { 
    once: false, 
    margin: "-20% 0px -20% 0px",
    amount: 0.2
  });

  const figuresInView = useInView(figuresRef, { 
    once: false, 
    margin: "-20% 0px -20% 0px",
    amount: 0.2
  });

  const highlightsInView = useInView(highlightsRef, { 
    once: false, 
    margin: "-20% 0px -20% 0px",
    amount: 0.2
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Optimized transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.9, 0.3]);

  // Memoized data (unchanged)
  const figures = useMemo(() => [
    { 
      number: "12+", 
      text: "Years and counting!", 
      icon: <Star className="h-6 w-6 text-cosmic" />,
      gradient: "from-cosmic/20 to-blue-500/20",
    },
    { 
      number: "50+", 
      text: "Active team members", 
      icon: <Users className="h-6 w-6 text-mars" />,
      gradient: "from-mars/20 to-orange-500/20",
    },
    { 
      number: "6", 
      text: "Entirely different rovers", 
      icon: <RoverIcon className="h-6 w-6 text-cosmic" />,
      gradient: "from-cosmic/20 to-purple-500/20",
    },
    { 
      number: "∞", 
      text: "Uncountable learnings!", 
      icon: <Sparkles className="h-6 w-6 text-mars" />,
      gradient: "from-mars/20 to-pink-500/20",
    }
  ], []);

  const highlights = useMemo(() => [
    "Secured 1st position among all Indian teams in University Rover Challenge 2023, USA",
    "Secured 6th rank in Bio-sciences task in University Rover Challenge 2023, USA", 
    "Achieved Excellence Award in Autonomous category in International Rover Challenge 2023",
    "Secured 5th Position out of 18 teams in International Rover Challenge IRC 2023",
    "Achieved Excellence Award in Navigation Task in European Rover Challenge 2022"
  ], []);

  const visionPoints = useMemo(() => [
    "Establish IIT Bombay as a global leader in space robotics",
    "Innovate in Mars Rover technology",
    "Nurture sustainable and skilled talent pipeline", 
    "Contribute to advancements in planetary exploration",
    "Build a legacy of engineering excellence and impactful research"
  ], []);

  // Standardized animation variants - consistent bottom-to-top animations
  const standardCardVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 80,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 25
      }
    }
  }), []);

  const standardItemVariants = useMemo(() => (index = 0) => ({
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 25
      }
    }
  }), []);

  const headerVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 80,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }), []);

  const sectionVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  }), []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative py-24 overflow-hidden bg-gradient-to-br from-space-dark via-space to-space-dark"
    >
      {/* Simplified Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-mars/15 to-orange-500/15 rounded-full blur-3xl"
          style={{ 
            y: backgroundY,
            opacity: orbOpacity
          }}
        />
        
        <motion.div
          className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-cosmic/15 to-blue-500/15 rounded-full blur-3xl"
          style={{ 
            y: backgroundY,
            opacity: orbOpacity
          }}
        />

        {/* Simplified floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                delay: i * 2,
                ease: "easeInOut",
              }}
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
            >
              {i % 4 === 0 ? (
                <Star className="w-3 h-3 text-cosmic/20" />
              ) : i % 4 === 1 ? (
                <RoverIcon className="w-3 h-3 text-mars/20" />
              ) : i % 4 === 2 ? (
                <Award className="w-3 h-3 text-cosmic/20" />
              ) : (
                <Target className="w-3 h-3 text-mars/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col space-y-20">
          {/* Standardized Header Section */}
          <motion.div 
            ref={headerRef}
            className="text-center"
            variants={headerVariants}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-bold font-orbitron mb-6"
              variants={standardItemVariants(0)}
            >
              <span className="bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent">
                About Us
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed"
              variants={standardItemVariants(1)}
            >
              Founded in{" "}
              <span className="text-mars font-semibold">2012</span>
              , MRT (Mars Rover Team) was established with a vision to make 
              significant strides in space exploration and autonomous robotics. Over the years, 
              our team has fostered an environment of inclusive growth and continuous learning, 
              leading to remarkable progress and consistent success in premier international competitions.
            </motion.p>
          </motion.div>
          
          {/* Standardized Vision and Mission Section */}
          <motion.div 
            ref={visionMissionRef}
            className="grid lg:grid-cols-2 gap-8 lg:gap-12"
            variants={sectionVariants}
            initial="hidden"
            animate={visionMissionInView ? "visible" : "hidden"}
          >
            {/* Vision Card */}
            <motion.div
              className="bg-gradient-to-br from-space-light/30 to-space-light/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              variants={standardCardVariants}
            >
              <h3 className="text-3xl font-bold mb-6 font-orbitron text-mars flex items-center">
                <Flag className="mr-3 text-mars flex-shrink-0" />
                Our Vision
              </h3>
              
              <div className="space-y-4">
                {visionPoints.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start"
                    variants={standardItemVariants(index)}
                  >
                    <Flag className="h-4 w-4 text-mars mr-3 mt-1 flex-shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              className="bg-gradient-to-br from-space-light/30 to-space-light/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              variants={standardCardVariants}
            >
              <h3 className="text-3xl font-bold mb-6 font-orbitron text-cosmic flex items-center">
                <RoverIcon className="mr-3 h-8 w-8 text-cosmic flex-shrink-0" />
                Our Mission
              </h3>
              
              <p className="text-white/80 leading-relaxed">
                To design, develop, and innovate cutting-edge extraterrestrial robotic solutions 
                while fostering a culture of excellence, collaboration, and technical expertise 
                among students. Through hands-on learning and global competitions, we aim to push 
                the boundaries of autonomous robotics and inspire the next generation of engineers.
              </p>
            </motion.div>
          </motion.div>
          
          {/* Standardized Key Figures */}
          <motion.div 
            ref={figuresRef}
            className="text-center"
            variants={sectionVariants}
            initial="hidden"
            animate={figuresInView ? "visible" : "hidden"}
          >
            <motion.h3 
              className="text-3xl lg:text-4xl font-bold font-orbitron mb-12"
              variants={standardItemVariants(0)}
            >
              <span className="bg-gradient-to-r from-mars to-cosmic bg-clip-text text-transparent">
                Our Journey in Numbers
              </span>
            </motion.h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {figures.map((figure, index) => (
                <motion.div 
                  key={index}
                  className="bg-gradient-to-br from-space-light/30 to-space-light/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                  variants={standardItemVariants(index)}
                >
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 bg-gradient-to-br ${figure.gradient} rounded-full`}>
                      {figure.icon}
                    </div>
                  </div>
                  
                  <h4 className="text-3xl lg:text-4xl font-bold mb-2 font-orbitron bg-gradient-to-r from-mars to-cosmic bg-clip-text text-transparent">
                    {figure.number}
                  </h4>
                  
                  <p className="text-white/70 text-sm">
                    {figure.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Standardized Highlights */}
          <motion.div 
            ref={highlightsRef}
            className="text-center"
            variants={sectionVariants}
            initial="hidden"
            animate={highlightsInView ? "visible" : "hidden"}
          >
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold font-orbitron mb-12"
              variants={standardItemVariants(0)}
            >
              <span className="bg-gradient-to-r from-mars to-cosmic bg-clip-text text-transparent">
                When this team thrived globally
              </span>


            </motion.h2>
<button
  type="button"
  onClick={() => router.push("/competitions")}
  className="
    inline-flex items-center justify-center
    rounded-lg px-4 py-2
    bg-mars text-white font-semibold
    shadow-sm ring-1 ring-inset ring-black/5
    transition-colors duration-200
    hover:bg-mars/90
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-mars
    active:scale-[0.99] mb-3
  "
  aria-label="View Records"
>
  <span>Records</span>
</button>

            <motion.div 
              className="bg-gradient-to-br from-space-light/30 to-space-light/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              variants={standardCardVariants}
            >
              <div className="space-y-6">
                {highlights.map((highlight, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start text-left"
                    variants={standardItemVariants(index)}
                  >
                    <Award className="h-5 w-5 lg:h-6 lg:w-6 text-cosmic flex-shrink-0 mr-4 mt-1" />
                    <p className="text-white/90 leading-relaxed">
                      {highlight}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
