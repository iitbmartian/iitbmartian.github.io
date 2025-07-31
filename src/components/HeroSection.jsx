"use client";
import React, { useEffect, useState } from 'react';
import { ChevronDown, Rocket, Star, Earth } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import MarsRoverLogo from '@/mrt/Logo/mrtLogo.png';
import Image from 'next/image';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  // Simplified parallax effects
  const backgroundY = useTransform(scrollY, [0, 500], [0, 100]);
  const textY = useTransform(scrollY, [0, 500], [0, -50]);
  const imageY = useTransform(scrollY, [0, 500], [0, -25]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 20; // Reduced intensity
      const y = (e.clientY / window.innerHeight) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-space-dark via-space to-space-dark">
      {/* Simplified Background Effects */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      />
      
      {/* Simple Interactive Background Orbs */}
      <motion.div
        className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-mars/15 to-orange-500/15 rounded-full blur-3xl opacity-60"
        style={{
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5,
        }}
      />
      
      <motion.div
        className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-r from-cosmic/15 to-blue-500/15 rounded-full blur-3xl opacity-60"
        style={{
          x: mousePosition.x * -0.3,
          y: mousePosition.y * -0.3,
        }}
      />

      {/* Simplified Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6 + i % 3,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
            }}
          />
        ))}
      </div>

      {/* Simplified Animated Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          >
            <Star className="w-4 h-4 text-yellow-400/60" />
          </motion.div>
        ))}
      </div>

      {/* Main Container - Full Width Split */}
      <div className="w-full h-screen flex">
        {/* Left Half - Text Content */}
        <motion.div 
          className="w-1/2 h-full flex items-center justify-center px-8 lg:px-16"
          style={{ y: textY }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div  className="max-w-2xl">
            <motion.h4
              className="text-mars font-orbitron flex justify-center items-center text-xl mb-4 relative overflow-hidden"
              variants={itemVariants}
            >
              <span className="inline-block text-3xl">IIT BOMBAY</span>
              
              {/* Simple glowing line */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-mars to-orange-500 "
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />
            </motion.h4>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-orbitron mb-6 relative "
              variants={itemVariants}
            >
              <motion.div 
                className="text-white mb-2 flex justify-center items-center text-center"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                MARS ROVER
              </motion.div>
              
              <motion.div 
                className="flex justify-center items-center bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent "
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                TEAM
              </motion.div>

              {/* Simple floating rocket */}
              <motion.div
                className="absolute -right-12 top-4 hidden xl:block"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Rocket className="w-8 h-8 text-mars/60" />
              </motion.div>
            </motion.h1>

            <motion.p
              className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed text-center"
              variants={itemVariants}
            >
              A unique student-led initiative focused on designing and building advanced rovers 
              capable of extraterrestrial exploration. Our rovers are equipped for autonomous 
              traversal, onboard testing, and tackling challenges in space exploration.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto"
              >
                <Button className="bg-gradient-to-r from-mars to-orange-600 hover:from-mars-dark hover:to-orange-700 text-white px-8 py-6 rounded-xl w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
                  <span className="flex items-center space-x-2">
                    <span>Explore Projects</span>
                    <Earth className="w-4 h-4" />
                  </span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto"
              >
                <Button 
                  variant="outline" 
                  className="border-2 border-cosmic text-cosmic hover:bg-cosmic/10 hover:border-cosmic/80 px-8 py-6 rounded-xl w-full sm:w-auto transition-all duration-300 backdrop-blur-sm font-semibold"
                >
                  Meet The Team
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Half - Image Section */}
        <motion.div 
          className="w-1/2 h-full flex items-center justify-center px-8 lg:px-16"
          style={{ y: imageY }}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="relative w-full max-w-lg"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.03 }}
          >
            {/* Simplified background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-mars/10 via-orange-500/10 to-cosmic/10 rounded-full blur-2xl scale-110 opacity-60" />
            
            <motion.div
              className="relative z-10 rounded-xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Image
                src={MarsRoverLogo}
                alt="Mars Rover"
                width={600}
                height={600}
                className="w-full h-auto"
                priority
              />
            </motion.div>

            {/* Simplified Decorative Elements */}
            <motion.div
              className="absolute -top-4 -left-4 w-12 h-12 border-2 border-mars rounded-full opacity-60"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            <motion.div
              className="absolute -bottom-4 -right-4 w-16 h-16 border-2 border-cosmic rounded-full opacity-60"
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Simple floating elements */}
            <motion.div
              className="absolute top-10 right-10 w-6 h-6 bg-mars/30 rounded-full blur-sm"
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <motion.div
              className="absolute bottom-20 left-5 w-4 h-4 bg-cosmic/40 rounded-full blur-sm"
              animate={{
                x: [0, 15, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Simplified Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.span
          className="text-white/60 text-sm mb-2 font-medium"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Scroll to explore
        </motion.span>
        
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="text-white/60 w-6 h-6" />
        </motion.div>
        
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent mt-2"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 2 }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
