"use client";
import React, { useRef, useMemo, useCallback } from 'react';
import { Award, Flag, Users, Star, Rocket, Sparkles, Target, TrendingUp } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const figuresRef = useRef(null);
  
  // Enhanced useInView with bidirectional animations
  const headerInView = useInView(headerRef, { 
    once: false, 
    margin: "-10% 0px -10% 0px",
    amount: 0.3
  });

  const figuresInView = useInView(figuresRef, { 
    once: false, 
    margin: "-15% 0px -15% 0px",
    amount: 0.3
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Optimized transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.8, 0.3]);

  // Memoized data
  const figures = useMemo(() => [
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
      icon: <Sparkles className="h-6 w-6 text-mars" />,
      gradient: "from-mars/20 to-pink-500/20"
    }
  ], []);

  const highlights = useMemo(() => [
    "Secured First position among all Indian teams in University Rover Challenge 2023, USA",
    "Secured 6th rank in Bio-sciences task in University Rover Challenge 2023, USA",
    "Achieved Excellence Award in Autonomous category in International Rover Challenge 2023",
    "Secured 5th Position out of 18 teams in International Rover Challenge IRC 2023",
    "Achieved Excellence Award in Navigation Task in European Rover Challenge 2022"
  ], []);

  // Enhanced animation variants
  const headerVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 1.05,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }), []);

  const sectionVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5
      }
    }
  }), []);

  const figureVariants = useMemo(() => (index) => ({
    hidden: { opacity: 0, y: 40, scale: 0.8, rotateX: 15 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      rotateX: -10,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  }), []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative py-24 overflow-hidden bg-gradient-to-br from-space-dark via-space to-space-dark"
    >
      {/* Enhanced Background Effects */}
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

        {/* Enhanced floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 15 + i * 3,
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
                <Star className="w-4 h-4 text-cosmic/20" />
              ) : i % 4 === 1 ? (
                <Rocket className="w-4 h-4 text-mars/20" />
              ) : i % 4 === 2 ? (
                <Award className="w-4 h-4 text-cosmic/20" />
              ) : (
                <Target className="w-4 h-4 text-mars/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col space-y-20">
          {/* Enhanced Header Section */}
          <motion.div 
            ref={headerRef}
            className="text-center"
            variants={headerVariants}
            initial="hidden"
            animate={headerInView ? "visible" : "exit"}
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
              className="w-48 h-1 mx-auto bg-gradient-to-r from-mars via-orange-500 to-cosmic rounded-full mb-8"
              initial={{ width: 0, opacity: 0 }}
              animate={headerInView ? { 
                width: "200px", 
                opacity: 1 
              } : { 
                width: 0, 
                opacity: 0 
              }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            
            <motion.p 
              className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Founded in <motion.span 
                className="text-mars font-semibold"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                2012
              </motion.span>, MRT (Mars Rover Team) was established with a vision to make 
              significant strides in space exploration and autonomous robotics. Over the years, 
              our team has fostered an environment of inclusive growth and continuous learning, 
              leading to remarkable progress and consistent success in premier international competitions.
            </motion.p>
          </motion.div>
          
          {/* Enhanced Vision and Mission Section */}
          <motion.div 
            className="grid lg:grid-cols-2 gap-8 lg:gap-12"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10%" }}
          >
            {/* Enhanced Vision */}
            <motion.div
              className="bg-gradient-to-br from-space-light/30 to-space-light/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-mars/30 transition-all duration-300 group perspective-1000"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02, 
                y: -8,
                rotateY: 2
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.h3 
                className="text-3xl font-bold mb-6 font-orbitron text-mars flex items-center"
                whileHover={{ x: 3 }}
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Flag className="mr-3 text-mars flex-shrink-0" />
                </motion.div>
                Our Vision
              </motion.h3>
              
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
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: false }}
                    whileHover={{ x: 5, scale: 1.02 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Flag className="h-4 w-4 text-mars mr-3 mt-1 flex-shrink-0" />
                    </motion.div>
                    <span className="text-white/80 group-hover/item:text-white transition-colors duration-300">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-mars/5 to-orange-500/5 rounded-2xl pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Enhanced Mission */}
            <motion.div
              className="bg-gradient-to-br from-space-light/30 to-space-light/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cosmic/30 transition-all duration-300 group perspective-1000"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02, 
                y: -8,
                rotateY: -2
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.h3 
                className="text-3xl font-bold mb-6 font-orbitron text-cosmic flex items-center"
                whileHover={{ x: 3 }}
              >
                <motion.div
                  whileHover={{ 
                    rotate: [0, 15, -15, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <Rocket className="mr-3 text-cosmic flex-shrink-0" />
                </motion.div>
                Our Mission
              </motion.h3>
              
              <motion.p 
                className="text-white/80 leading-relaxed group-hover:text-white/90 transition-colors duration-300"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                To design, develop, and innovate cutting-edge extraterrestrial robotic solutions 
                while fostering a culture of excellence, collaboration, and technical expertise 
                among students. Through hands-on learning and global competitions, we aim to push 
                the boundaries of autonomous robotics and inspire the next generation of engineers.
              </motion.p>

              {/* Enhanced glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cosmic/5 to-blue-500/5 rounded-2xl pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
          
          {/* Enhanced Key Figures */}
          <motion.div 
            ref={figuresRef}
            className="text-center"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10%" }}
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
                  className="bg-gradient-to-br from-space-light/30 to-space-light/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 group perspective-1000"
                  variants={figureVariants(index)}
                  initial="hidden"
                  animate={figuresInView ? "visible" : "exit"}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -8,
                    rotateY: 5
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="flex justify-center mb-4">
                    <motion.div 
                      className={`p-3 bg-gradient-to-br ${figure.gradient} rounded-full group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ 
                        rotate: 360,
                        scale: 1.2
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {figure.icon}
                    </motion.div>
                  </div>
                  
                  <motion.h4 
                    className="text-3xl lg:text-4xl font-bold mb-2 font-orbitron bg-gradient-to-r from-mars to-cosmic bg-clip-text text-transparent"
                    initial={{ scale: 0 }}
                    animate={figuresInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.3 + index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    {figure.number}
                  </motion.h4>
                  
                  <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300 text-sm">
                    {figure.text}
                  </p>

                  {/* Enhanced glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-mars/5 to-cosmic/5 rounded-2xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Enhanced Highlights */}
          <motion.div 
            className="text-center"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10%" }}
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
              whileHover={{ scale: 1.01, y: -3 }}
            >
              <div className="space-y-6">
                {highlights.map((highlight, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start group text-left"
                    initial={{ opacity: 0, x: -30, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 120
                    }}
                    viewport={{ once: false, margin: "-10%" }}
                    whileHover={{ x: 8, scale: 1.02 }}
                  >
                    <motion.div 
                      className="flex-shrink-0 mr-4 mt-1"
                      whileHover={{ 
                        rotate: 360,
                        scale: 1.2
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Award className="h-5 w-5 lg:h-6 lg:w-6 text-cosmic" />
                    </motion.div>
                    
                    <motion.p 
                      className="text-white/90 group-hover:text-white transition-colors duration-300 leading-relaxed"
                      initial={{ opacity: 0.9 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {highlight}
                    </motion.p>
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
