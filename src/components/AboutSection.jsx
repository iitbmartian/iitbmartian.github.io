"use client";
import React, { useRef } from 'react';
import { Award, Flag, Users, Star, Rocket, Sparkles } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const figures = [
    { 
      number: "12+", 
      text: "Years and counting!", 
      icon: <Star className="h-6 w-6 text-cosmic" />,
      gradient: "from-cosmic/20 to-blue-500/20"
    },
    { 
      number: "50+", 
      text: "Active team members", 
      icon: <Users className="h-6 w-6 text-mars" />,
      gradient: "from-mars/20 to-orange-500/20"
    },
    { 
      number: "6", 
      text: "Entirely different rovers", 
      icon: <Rocket className="h-6 w-6 text-cosmic" />,
      gradient: "from-cosmic/20 to-purple-500/20"
    },
    { 
      number: "∞", 
      text: "Uncountable learnings!", 
      icon: <Star className="h-6 w-6 text-mars" />,
      gradient: "from-mars/20 to-pink-500/20"
    }
  ];

  const highlights = [
    "Secured First position among all Indian teams in University Rover Challenge 2023, USA",
    "Secured 6th rank in Bio-sciences task in University Rover Challenge 2023, USA",
    "Achieved Excellence Award in Autonomous category in International Rover Challenge 2023",
    "Secured 5th Position out of 18 teams in International Rover Challenge IRC 2023",
    "Achieved Excellence Award in Navigation Task in European Rover Challenge 2022"
  ];

  // Simplified animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative py-24 overflow-hidden bg-gradient-to-br from-space-dark via-space to-space-dark"
    >
      {/* Simplified Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          style={{ transform: `translateY(${backgroundY}px)` }}
          className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-mars/15 to-orange-500/15 rounded-full blur-3xl opacity-60"
        />
        
        <div
          style={{ transform: `translateY(${backgroundY}px)` }}
          className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-cosmic/15 to-blue-500/15 rounded-full blur-3xl opacity-60"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col space-y-20"
        >
          {/* Header Section */}
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-bold font-orbitron mb-6"
              variants={itemVariants}
            >
              <span className="bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent">
                About Us
              </span>
            </motion.h2>
            
            <motion.div
              className=""
              initial={{ width: 0 }}
              animate={isInView ? { width: "200px" } : { width: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            
            <motion.p 
              className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mt-8"
              variants={itemVariants}
            >
              Founded in <span className="text-mars font-semibold">2012</span>, MRT (Mars Rover Team) was established with a vision to make 
              significant strides in space exploration and autonomous robotics. Over the years, 
              our team has fostered an environment of inclusive growth and continuous learning, 
              leading to remarkable progress and consistent success in premier international competitions.
            </motion.p>
          </motion.div>
          
          {/* Vision and Mission Section */}
          <motion.div 
            className="grid lg:grid-cols-2 gap-8 lg:gap-12"
            variants={itemVariants}
          >
            {/* Vision */}
            <motion.div
              className="bg-gradient-to-br from-space-light/30 to-space-light/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-mars/30 transition-all duration-300 group"
              variants={itemVariants}
              whileHover={{ scale: 1.01, y: -3 }}
            >
              <h3 className="text-3xl font-bold mb-6 font-orbitron text-mars flex items-center">
                <Flag className="mr-3 text-mars flex-shrink-0" />
                Our Vision
              </h3>
              
              <div className="space-y-4">
                {[
                  "Establish IIT Bombay as a global leader in space robotics",
                  "Innovate in Mars Rover technology",
                  "Nurture sustainable and skilled talent pipeline",
                  "Contribute to advancements in planetary exploration",
                  "Build a legacy of engineering excellence and impactful research"
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start group/item"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                    whileHover={{ x: 3 }}
                  >
                    <Flag className="h-4 w-4 text-mars mr-3 mt-1 flex-shrink-0" />
                    <span className="text-white/80 group-hover/item:text-white transition-colors duration-300">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              className="bg-gradient-to-br from-space-light/30 to-space-light/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cosmic/30 transition-all duration-300 group"
              variants={itemVariants}
              whileHover={{ scale: 1.01, y: -3 }}
            >
              <h3 className="text-3xl font-bold mb-6 font-orbitron text-cosmic flex items-center">
                <Rocket className="mr-3 text-cosmic flex-shrink-0" />
                Our Mission
              </h3>
              
              <p className="text-white/80 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                To design, develop, and innovate cutting-edge extraterrestrial robotic solutions 
                while fostering a culture of excellence, collaboration, and technical expertise 
                among students. Through hands-on learning and global competitions, we aim to push 
                the boundaries of autonomous robotics and inspire the next generation of engineers.
              </p>
            </motion.div>
          </motion.div>
          
          {/* Key Figures */}
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <motion.h3 
              className="text-3xl lg:text-4xl font-bold font-orbitron mb-12"
              variants={itemVariants}
            >
              <span className="bg-gradient-to-r from-mars to-cosmic bg-clip-text text-transparent">
                Our Journey in Numbers
              </span>
            </motion.h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {figures.map((figure, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="bg-gradient-to-br from-space-light/30 to-space-light/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 group"
                  whileHover={{ scale: 1.02, y: -3 }}
                >
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 bg-gradient-to-br ${figure.gradient} rounded-full group-hover:scale-110 transition-transform duration-300`}>
                      {figure.icon}
                    </div>
                  </div>
                  
                  <h4 className="text-3xl lg:text-4xl font-bold mb-2 font-orbitron bg-gradient-to-r from-mars to-cosmic bg-clip-text text-transparent">
                    {figure.number}
                  </h4>
                  
                  <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300 text-sm">
                    {figure.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Highlights */}
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold font-orbitron mb-12"
              variants={itemVariants}
            >
              <span className="bg-gradient-to-r from-mars to-cosmic bg-clip-text text-transparent">
                When this team thrived globally
              </span>
            </motion.h2>
            
            <motion.div 
              className="bg-gradient-to-br from-space-light/30 to-space-light/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cosmic/30 transition-all duration-300"
              variants={itemVariants}
            >
              <div className="space-y-6">
                {highlights.map((highlight, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start group text-left"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 3 }}
                  >
                    <div className="flex-shrink-0 mr-4 mt-1">
                      <Award className="h-5 w-5 lg:h-6 lg:w-6 text-cosmic" />
                    </div>
                    
                    <p className="text-white/90 group-hover:text-white transition-colors duration-300 leading-relaxed">
                      {highlight}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
