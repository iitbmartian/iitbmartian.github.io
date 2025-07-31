"use client";
import React, { useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Trophy, Target, Award, Star, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CompetitionsHeader from '@/components/competitions/CompetitionsHeader';
import CompetitionsTimeline from '@/components/competitions/CompetitionsTimeline';
import CompetitionsList from '@/components/competitions/CompetitionsList';
import { timelineData } from '@/components/competitions/CompetitionsData';
import { cn } from '@/lib/utils';

const CompetitionsPage = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const headerInView = useInView(headerRef, { 
    once: false, 
    margin: "-10% 0px -10% 0px",
    amount: 0.3
  });

  // Optimized transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.8, 0.3]);
  const ringsRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Ensure the page scrolls to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const floatingElements = useMemo(() => {
    return [...Array(6)].map(() => ({
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 80}%`,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-dark via-space to-space-dark">
      
      <motion.section 
        ref={sectionRef}
        className="pt-32 pb-24 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0">
          {/* Optimized gradient orbs */}
          <motion.div
            className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-l from-mars/15 to-orange-500/8 rounded-full blur-3xl"
            style={{ 
              y: backgroundY,
              opacity: orbOpacity
            }}
          />
          
          <motion.div
            className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-gradient-to-r from-cosmic/15 to-blue-500/8 rounded-full blur-3xl"
            style={{ 
              y: backgroundY,
              opacity: orbOpacity
            }}
          />

          {/* Enhanced achievement pattern */}
          <div className="absolute inset-0 opacity-5">
            <motion.svg 
              className="absolute inset-0 w-full h-full"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 120,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <defs>
                <linearGradient id="achievementGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6b35" />
                  <stop offset="25%" stopColor="#ffd700" />
                  <stop offset="50%" stopColor="#00d9ff" />
                  <stop offset="75%" stopColor="#ff6b35" />
                  <stop offset="100%" stopColor="#ffd700" />
                </linearGradient>
              </defs>
              {[...Array(5)].map((_, i) => (
                <motion.path
                  key={i}
                  d={`M ${i * 25},30 Q ${i * 25 + 50},80 ${i * 25 + 100},30 Q ${i * 25 + 150},80 ${i * 25 + 200},30`}
                  fill="none"
                  stroke="url(#achievementGradient)"
                  strokeWidth="1"
                  opacity="0.4"
                  animate={{
                    pathLength: [0, 1, 0],
                  }}
                  transition={{
                    duration: 12 + i * 3,
                    repeat: Infinity,
                    delay: i * 2,
                  }}
                />
              ))}
            </motion.svg>
          </div>

          {/* Enhanced podium steps */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute opacity-10"
                style={{
                  left: `${30 + i * 20}%`,
                  bottom: `${15 + i * 10}%`,
                  width: '40px',
                  height: `${30 + i * 15}px`,
                }}
                animate={{
                  y: [0, -5, 0],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                <div className="w-full h-full bg-gradient-to-t from-mars/30 to-cosmic/30 rounded-t-lg border-t-2 border-white/10" />
                <motion.div 
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                >
                  <Award className="w-3 h-3 text-yellow-400/50" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced floating elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {floatingElements.map((style, i) => (
              <motion.div
                key={i}
                className="absolute"
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.5, 0.2],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 12 + i * 3,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "easeInOut",
                }}
                style={style}
              >
                <motion.div 
                  className="w-6 h-6 bg-gradient-to-r from-mars/20 to-cosmic/20 rounded-full flex items-center justify-center border border-white/10"
                  whileHover={{ scale: 1.2 }}
                >
                  {i % 3 === 0 ? (
                    <Trophy className="w-3 h-3 text-white/30" />
                  ) : i % 3 === 1 ? (
                    <Star className="w-3 h-3 text-white/30" />
                  ) : (
                    <Award className="w-3 h-3 text-white/30" />
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced victory rays */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-5"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute origin-bottom"
                style={{
                  width: '1px',
                  height: '200px',
                  background: 'linear-gradient(to top, transparent, rgba(255, 215, 0, 0.3), transparent)',
                  transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>

          {/* Enhanced championship rings */}
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-5"
              style={{
                width: `${300 + i * 100}px`,
                height: `${300 + i * 100}px`,
                rotate: ringsRotation,
              }}
            >
              <motion.div 
                className="w-full h-full rounded-full border border-white/10"
                animate={{
                  borderColor: [
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(255, 107, 53, 0.2)",
                    "rgba(0, 217, 255, 0.2)",
                    "rgba(255, 255, 255, 0.1)"
                  ]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: i * 2
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Enhanced Main Content Container */}
        <div className="container mx-auto px-6 relative z-10">
          {/* Enhanced Page Header with scroll-based animations */}
          <motion.div
            ref={headerRef}
            className="text-center mb-16"
            variants={headerVariants}
            initial="hidden"
            animate={headerInView ? "visible" : "exit"}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold font-orbitron bg-gradient-to-r from-mars via-yellow-500 to-cosmic bg-clip-text text-transparent relative mb-6"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              Competitions
              <motion.div
                className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-mars via-yellow-500 to-cosmic rounded-full"
                initial={{ width: 0, opacity: 0 }}
                animate={headerInView ? { 
                  width: "100%", 
                  opacity: 1 
                } : { 
                  width: 0, 
                  opacity: 0 
                }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </motion.h1>
            
            <motion.div 
              className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed flex items-center justify-center space-x-3"
              variants={itemVariants}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Trophy className="w-6 h-6 text-yellow-500" />
              </motion.div>
              <span>Showcasing our achievements and victories in Mars rover competitions worldwide</span>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Award className="w-6 h-6 text-mars" />
              </motion.div>
            </motion.div>

            {/* Enhanced Competition Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto"
              variants={itemVariants}
            >
              {[
                { label: "Competitions", value: "25+", icon: <Target className="w-5 h-5" />, gradient: "from-mars to-orange-500" },
                { label: "Awards Won", value: "15+", icon: <Award className="w-5 h-5" />, gradient: "from-yellow-500 to-amber-500" },
                { label: "Global Rank", value: "Top 10", icon: <Trophy className="w-5 h-5" />, gradient: "from-cosmic to-blue-500" },
                { label: "Team Spirit", value: "100%", icon: <Star className="w-5 h-5" />, gradient: "from-purple-500 to-pink-500" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-space-light/20 to-space-light/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center group hover:border-white/30 transition-all duration-300 perspective-1000"
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
                    delay: 0.4 + index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -8,
                    rotateY: 5
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div 
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.gradient}/20 mb-3`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.icon}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="text-2xl font-bold text-white mb-1"
                    initial={{ scale: 0 }}
                    animate={headerInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.6 + index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  
                  <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">
                    {stat.label}
                  </div>

                  {/* Enhanced glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-mars/5 to-cosmic/5 rounded-2xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Component Sections with scroll-based animations */}
          <motion.div
            className="mb-16"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10%" }}
          >
            <CompetitionsHeader />
          </motion.div>
          
          <motion.div
            className="mb-16"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10%" }}
            transition={{ delay: 0.2 }}
          >
            <CompetitionsTimeline events={timelineData} />
          </motion.div>
          
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10%" }}
            transition={{ delay: 0.4 }}
          >
            <CompetitionsList />
          </motion.div>
        </div>

        {/* Enhanced celebration effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-5"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.05, 1]
          }}
          transition={{
            rotate: {
              duration: 100,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <div className="w-96 h-96 border-2 border-gradient-to-r from-mars via-yellow-400 to-cosmic rounded-full" />
        </motion.div>
      </motion.section>
      
    </div>
  );
};

export default CompetitionsPage;
