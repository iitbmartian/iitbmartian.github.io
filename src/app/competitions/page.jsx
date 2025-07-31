"use client";
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Ensure the page scrolls to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
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
        {/* Simplified Background Effects */}
        <div className="absolute inset-0">
          {/* Simple gradient orbs - no complex animations */}
          <div
            className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-l from-mars/15 to-orange-500/8 rounded-full blur-3xl opacity-60"
            style={{ transform: `translateY(${backgroundY}px)` }}
          />
          
          <div
            className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-gradient-to-r from-cosmic/15 to-blue-500/8 rounded-full blur-3xl opacity-60"
            style={{ transform: `translateY(${backgroundY}px)` }}
          />

          {/* Static achievement pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="achievementGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6b35" />
                  <stop offset="25%" stopColor="#ffd700" />
                  <stop offset="50%" stopColor="#00d9ff" />
                  <stop offset="75%" stopColor="#ff6b35" />
                  <stop offset="100%" stopColor="#ffd700" />
                </linearGradient>
              </defs>
              {[...Array(6)].map((_, i) => (
                <path
                  key={i}
                  d={`M ${i * 20},20 Q ${i * 20 + 40},60 ${i * 20 + 80},20 Q ${i * 20 + 120},60 ${i * 20 + 160},20`}
                  fill="none"
                  stroke="url(#achievementGradient)"
                  strokeWidth="1"
                  opacity="0.3"
                />
              ))}
            </svg>
          </div>

          {/* Simplified podium steps */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute opacity-10"
                style={{
                  left: `${30 + i * 20}%`,
                  bottom: `${15 + i * 10}%`,
                  width: '40px',
                  height: `${30 + i * 15}px`,
                }}
              >
                <div className="w-full h-full bg-gradient-to-t from-mars/30 to-cosmic/30 rounded-t-lg border-t-2 border-white/10" />
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Award className="w-3 h-3 text-yellow-400/50" />
                </div>
              </div>
            ))}
          </div>

          {/* Simple floating elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  delay: i * 1,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
              >
                <div className="w-6 h-6 bg-gradient-to-r from-mars/20 to-cosmic/20 rounded-full flex items-center justify-center border border-white/10">
                  {i % 3 === 0 ? (
                    <Trophy className="w-3 h-3 text-white/30" />
                  ) : i % 3 === 1 ? (
                    <Star className="w-3 h-3 text-white/30" />
                  ) : (
                    <Award className="w-3 h-3 text-white/30" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Simplified victory rays */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-5">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute origin-bottom"
                style={{
                  width: '1px',
                  height: '200px',
                  background: 'linear-gradient(to top, transparent, rgba(255, 215, 0, 0.3), transparent)',
                  transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Main Content Container */}
        <motion.div
          className="container mx-auto px-6 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Enhanced Page Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold font-orbitron bg-gradient-to-r from-mars via-yellow-500 to-cosmic bg-clip-text text-transparent relative mb-6"
              whileHover={{ scale: 1.02 }}
            >
              Competitions
              <motion.div
                className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-mars via-yellow-500 to-cosmic rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed flex items-center justify-center space-x-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span>Showcasing our achievements and victories in Mars rover competitions worldwide</span>
              <Award className="w-6 h-6 text-mars" />
            </motion.p>

            {/* Competition Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {[
                { label: "Competitions", value: "25+", icon: <Target className="w-5 h-5" />, gradient: "from-mars to-orange-500" },
                { label: "Awards Won", value: "15+", icon: <Award className="w-5 h-5" />, gradient: "from-yellow-500 to-amber-500" },
                { label: "Global Rank", value: "Top 10", icon: <Trophy className="w-5 h-5" />, gradient: "from-cosmic to-blue-500" },
                { label: "Team Spirit", value: "100%", icon: <Star className="w-5 h-5" />, gradient: "from-purple-500 to-pink-500" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-space-light/20 to-space-light/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center group hover:border-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.gradient}/20 mb-3`}>
                    <div className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Component Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <CompetitionsHeader />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-16"
          >
            <CompetitionsTimeline events={timelineData} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <CompetitionsList />
          </motion.div>
        </motion.div>

        {/* Simplified celebration effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-5"
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-96 h-96 border-2 border-gradient-to-r from-mars via-yellow-400 to-cosmic rounded-full" />
        </motion.div>

        {/* Simple championship rings */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-5"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 40 + i * 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
            }}
          >
            <div className="w-full h-full rounded-full border border-white/10" />
          </motion.div>
        ))}
      </motion.section>
      
    </div>
  );
};

export default CompetitionsPage;
