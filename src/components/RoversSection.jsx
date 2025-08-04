"use client";
import React, { useState, useRef, useMemo, useCallback } from 'react';
import { ArrowRight, Rocket, Calendar, Star, Zap, Target, Award, Settings } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const RoversSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const roversRef = useRef(null);
  const ctaRef = useRef(null);
  
  const [hoveredRover, setHoveredRover] = useState(null);

  // Enhanced useInView with bidirectional animations
  const headerInView = useInView(headerRef, { 
    once: false, 
    margin: "-10% 0px -10% 0px",
    amount: 0.3
  });

  const roversInView = useInView(roversRef, { 
    once: false, 
    margin: "-15% 0px -15% 0px",
    amount: 0.2
  });

  const ctaInView = useInView(ctaRef, { 
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

  // Memoized rovers data
  const rovers = useMemo(() => [
    { 
      name: "Akrula 1.0", 
      year: "2015", 
      description: "Our pioneering rover that started the journey", 
      achievements: "First Mars simulation",
      icon: <Rocket className="w-5 h-5 text-mars" />,
      gradient: "from-mars/20 to-orange-500/10"
    },
    { 
      name: "Agathsya 1.0", 
      year: "2016", 
      description: "Enhanced mobility and terrain handling", 
      achievements: "Terrain mastery",
      icon: <Target className="w-5 h-5 text-cosmic" />,
      gradient: "from-cosmic/20 to-blue-500/10"
    },
    { 
      name: "Agathsya 2.0", 
      year: "2017", 
      description: "Advanced navigation and pathfinding systems", 
      achievements: "Smart navigation",
      icon: <Zap className="w-5 h-5 text-mars" />,
      gradient: "from-mars/20 to-red-500/10"
    },
    { 
      name: "Hemant 1.0", 
      year: "2018", 
      description: "Autonomous capabilities with AI integration", 
      achievements: "AI breakthrough",
      icon: <Settings className="w-5 h-5 text-cosmic" />,
      gradient: "from-cosmic/20 to-purple-500/10"
    },
    { 
      name: "Agruni 1.0", 
      year: "2019-20", 
      description: "Scientific tools and analysis suite", 
      achievements: "Research excellence",
      icon: <Award className="w-5 h-5 text-mars" />,
      gradient: "from-mars/20 to-yellow-500/10"
    },
    { 
      name: "Yash", 
      year: "2020-21", 
      description: "AI-powered exploration with machine learning", 
      achievements: "ML innovation",
      icon: <Star className="w-5 h-5 text-cosmic" />,
      gradient: "from-cosmic/20 to-indigo-500/10"
    },
    { 
      name: "Tezant", 
      year: "2022-23", 
      description: "Next-generation technology platform", 
      achievements: "Global recognition",
      icon: <Target className="w-5 h-5 text-mars" />,
      gradient: "from-mars/20 to-pink-500/10"
    },
    { 
      name: "Amaran", 
      year: "2024", 
      description: "Latest innovation with championship performance", 
      achievements: "Championship winner",
      icon: <Award className="w-5 h-5 text-cosmic" />,
      gradient: "from-cosmic/20 to-emerald-500/10"
    }
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

  const roverVariants = useMemo(() => (index) => ({
    hidden: { 
      opacity: 0, 
      y: 40, 
      scale: 0.8, 
      rotateX: 15 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.05,
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

  const sectionVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
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

  // Optimized event handlers
  const handleRoverHover = useCallback((index) => {
    setHoveredRover(index);
  }, []);

  const handleRoverLeave = useCallback(() => {
    setHoveredRover(null);
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="rovers" 
      className="relative py-16 bg-gradient-to-br from-space-dark via-space to-space-dark overflow-hidden"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-mars/5 to-cosmic/5"
          style={{ opacity: orbOpacity }}
        />

        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-mars/10 to-orange-500/10 rounded-full blur-3xl"
          style={{ 
            y: backgroundY,
            opacity: orbOpacity
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 60, repeat: Infinity, ease: "linear" }
          }}
        />

        <motion.div
          className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-cosmic/10 to-blue-500/10 rounded-full blur-3xl"
          style={{ 
            y: backgroundY,
            opacity: orbOpacity
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 45, repeat: Infinity, ease: "linear" }
          }}
        />

        {/* Enhanced floating rover icons */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
            }}
          >
            {i % 4 === 0 ? (
              <Rocket className="w-4 h-4 text-white/20" />
            ) : i % 4 === 1 ? (
              <Star className="w-3 h-3 text-white/20" />
            ) : i % 4 === 2 ? (
              <Target className="w-4 h-4 text-white/20" />
            ) : (
              <Settings className="w-3 h-3 text-white/20" />
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-12"
          variants={headerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "exit"}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 font-orbitron relative"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent">
              Our Rovers Through The Years
            </span>
            <motion.div
              className=""
              initial={{ width: 0, opacity: 0 }}
              animate={headerInView ? { 
                width: "200px", 
                opacity: 1 
              } : { 
                width: 0, 
                opacity: 0 
              }}
              transition={{ duration: 1.2, delay: 0.3 }}
            />
          </motion.h2>
          
          <motion.p 
            className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            Each rover represents a milestone in our journey of innovation and exploration, 
            pushing the boundaries of autonomous robotics and space technology.
          </motion.p>

          {/* Enhanced Rover Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {[
              { label: "Total Rovers", value: rovers.length, gradient: "from-mars to-orange-500", icon: <Rocket className="w-3 h-3" /> },
              { label: "Years Active", value: "9+", gradient: "from-cosmic to-blue-500", icon: <Calendar className="w-3 h-3" /> },
              { label: "Generations", value: "8", gradient: "from-purple-500 to-pink-500", icon: <Target className="w-3 h-3" /> },
              { label: "Latest", value: "2024", gradient: "from-green-500 to-emerald-500", icon: <Star className="w-3 h-3" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-space-light/20 to-space-light/10 backdrop-blur-sm border border-white/10 rounded-lg p-3 text-center group hover:border-white/30 transition-all duration-300 perspective-1000"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={headerInView ? { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1 
                } : { 
                  opacity: 0, 
                  y: 30, 
                  scale: 0.8 
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.3 + index * 0.05,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  rotateY: 5
                }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex items-center justify-center mb-1">
                  <motion.div 
                    className={`p-1 rounded bg-gradient-to-r ${stat.gradient}/20 mr-1`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.icon}
                    </div>
                  </motion.div>
                  <motion.div 
                    className="text-lg font-bold text-white"
                    initial={{ scale: 0 }}
                    animate={headerInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                </div>
                <div className="text-xs text-white/70 group-hover:text-white/90 transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Rover Cards Grid */}
        <motion.div 
          ref={roversRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
        >
          {rovers.map((rover, index) => (
            <motion.div
              key={index}
              className="relative p-6 rounded-xl bg-gradient-to-br from-space-light/30 to-space-light/10 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 group perspective-1000"
              onMouseEnter={() => handleRoverHover(index)}
              onMouseLeave={handleRoverLeave}
              variants={roverVariants(index)}
              initial="hidden"
              animate={roversInView ? "visible" : "exit"}
              whileHover={{ 
                scale: 1.03, 
                y: -8,
                rotateY: 2
              }}
              whileTap={{ scale: 0.98 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Enhanced background effect */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${rover.gradient} rounded-xl`}
                animate={{ opacity: hoveredRover === index ? 0.3 : 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Enhanced Header with Icon and Year */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <motion.div
                  className="w-10 h-10 bg-gradient-to-r from-mars/30 to-cosmic/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/20"
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.2
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {rover.icon}
                </motion.div>
                <motion.div 
                  className="text-sm text-white/60 flex items-center space-x-1 bg-cosmic/10 px-2 py-1 rounded-full border border-cosmic/20"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Calendar className="w-3 h-3" />
                  </motion.div>
                  <span>{rover.year}</span>
                </motion.div>
              </div>

              {/* Enhanced Content */}
              <div className="relative z-10">
                <motion.h3
                  className="text-lg font-bold font-orbitron mb-3 group-hover:text-cosmic transition-colors duration-300"
                  style={{
                    color: hoveredRover === index ? "#00d9ff" : "#ffffff",
                  }}
                  whileHover={{ x: 3, scale: 1.02 }}
                >
                  {rover.name}
                </motion.h3>
                
                <motion.p 
                  className="text-white/70 text-sm mb-4 leading-relaxed group-hover:text-white/85 transition-colors duration-300"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                >
                  {rover.description}
                </motion.p>
                
                {/* Enhanced Achievement Badge */}
                <motion.div
                  className="flex items-center space-x-2 text-xs text-cosmic bg-cosmic/10 px-3 py-2 rounded-full hover:bg-cosmic/20 transition-colors duration-300 border border-cosmic/20"
                  whileHover={{ scale: 1.05, x: 3 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Star className="w-3 h-3" />
                  </motion.div>
                  <span>{rover.achievements}</span>
                </motion.div>
              </div>



              {/* Enhanced Rover number indicator */}
              <motion.div 
                className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-r from-mars to-cosmic rounded-full flex items-center justify-center text-xs font-bold text-white border border-white/20"
                initial={{ scale: 0, rotate: -180 }}
                animate={roversInView ? { 
                  scale: 1, 
                  rotate: 0 
                } : { 
                  scale: 0, 
                  rotate: -180 
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.2 + index * 0.03,
                  type: "spring"
                }}
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                {index + 1}
              </motion.div>


              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-mars/5 to-cosmic/5 rounded-xl pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredRover === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Call to Action */}
        <motion.div
          ref={ctaRef}
          className="text-center"
          variants={sectionVariants}
          initial="hidden"
          animate={ctaInView ? "visible" : "exit"}
        >
          <Link href="/rover">
            <motion.div 
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 15px 40px rgba(255, 107, 53, 0.3)"
              }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-gradient-to-r from-mars via-orange-500 to-cosmic hover:from-mars-dark hover:via-orange-600 hover:to-cosmic-dark text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg">
                <span className="flex items-center space-x-3">
                  <motion.div
                    animate={{ 
                      y: [0, -3, 0],
                      rotate: [0, 15, -15, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Rocket className="w-5 h-5" />
                  </motion.div>
                  <span>Explore Our Rovers</span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RoversSection;
