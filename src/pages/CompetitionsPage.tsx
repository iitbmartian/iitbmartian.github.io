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

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Ensure the page scrolls to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-space via-space-dark to-space">
      <Navbar />
      
      <motion.section 
        ref={sectionRef}
        className="pt-28 pb-20 bg-gradient-to-br from-space-dark via-space to-space-dark relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Enhanced Background Effects */}
        <motion.div
          className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-l from-mars/15 to-orange-500/8 rounded-full blur-3xl"
          style={{ 
            y: backgroundY,
            scale: backgroundScale 
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            rotate: { duration: 180, repeat: Infinity, ease: "linear" },
            scale: { duration: 60, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-gradient-to-r from-cosmic/15 to-blue-500/8 rounded-full blur-3xl"
          style={{ 
            y: backgroundY,
            scale: backgroundScale 
          }}
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            rotate: { duration: 170, repeat: Infinity, ease: "linear" },
            scale: { duration: 55, repeat: Infinity, ease: "easeInOut", delay: 15 }
          }}
        />

        {/* Floating Trophy Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                y: [0, -60, 0],
                rotate: [0, 360],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 30 + i * 4,
                repeat: Infinity,
                delay: i * 3,
                ease: "easeInOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <Trophy className="w-5 h-5 text-white/10" />
            </motion.div>
          ))}
        </div>

        {/* Competition Achievement Lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-5">
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
              <motion.path
                key={i}
                d={`M ${i * 20},20 Q ${i * 20 + 40},60 ${i * 20 + 80},20 Q ${i * 20 + 120},60 ${i * 20 + 160},20`}
                fill="none"
                stroke="url(#achievementGradient)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: [0, 0.4, 0],
                }}
                transition={{
                  pathLength: { duration: 6, delay: i * 0.5 },
                  opacity: { duration: 6, delay: i * 0.5, repeat: Infinity, repeatDelay: 10 }
                }}
              />
            ))}
          </svg>
        </div>

        {/* Podium Steps Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${20 + i * 15}%`,
                bottom: `${10 + i * 8}%`,
                width: '60px',
                height: `${20 + i * 10}px`,
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: [0, 0.1, 0],
                y: [50, 0, 50],
              }}
              transition={{
                duration: 8,
                delay: i * 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-full h-full bg-gradient-to-t from-mars/20 to-cosmic/20 rounded-t-lg border-t-2 border-white/5" />
              
              {/* Medal Icons on Podium */}
              <motion.div
                className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              >
                <Award className="w-4 h-4 text-yellow-400/30" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Victory Rays */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 origin-bottom"
              style={{
                width: '2px',
                height: '40%',
                background: 'linear-gradient(to top, transparent, rgba(255, 215, 0, 0.1), transparent)',
                transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                scaleY: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Floating Achievement Badges */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                rotate: [0, 180, 360],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 12 + i * 2,
                repeat: Infinity,
                delay: i * 2,
                ease: "easeInOut",
              }}
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-mars/30 to-cosmic/30 rounded-full flex items-center justify-center border border-white/10">
                  <Star className="w-4 h-4 text-white/40" />
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-mars/20 to-cosmic/20 rounded-full blur-sm"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Competition Sparkles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                delay: Math.random() * 5,
                repeat: Infinity,
                repeatDelay: Math.random() * 3 + 2,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <Zap className="w-3 h-3 text-yellow-400/40" />
            </motion.div>
          ))}
        </div>

        {/* Main Content Container */}
        <motion.div
          className="container mx-auto px-4 md:px-6 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Enhanced Component Wrapper */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <CompetitionsHeader />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <CompetitionsTimeline events={timelineData} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <CompetitionsList />
          </motion.div>
        </motion.div>

        {/* Success Celebration Effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.2, 0],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatDelay: 10,
            ease: "easeInOut"
          }}
        >
          <div className="w-96 h-96 border-4 border-gradient-to-r from-mars via-yellow-400 to-cosmic rounded-full" />
        </motion.div>

        {/* Championship Rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 1.3 }
            }}
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
            }}
          >
            <div className={`w-full h-full rounded-full border border-white/5 ${i === 1 ? 'border-dashed' : ''}`} />
          </motion.div>
        ))}
      </motion.section>
      
      <Footer />
    </div>
  );
};

export default CompetitionsPage;
