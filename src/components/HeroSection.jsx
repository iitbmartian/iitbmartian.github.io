"use client";
import React, { useEffect, useState } from 'react';
import { ChevronDown, Rocket, Star, Earth, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import MarsRoverLogo from '@/mrt/Logo/mrtLogo.png'
import Image from 'next/image';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  
  // Enhanced parallax effects
  const backgroundY = useTransform(scrollY, [0, 800], [0, 200]);
  const textY = useTransform(scrollY, [0, 800], [0, -150]);
  const imageY = useTransform(scrollY, [0, 800], [0, -80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Mouse tracking for enhanced interactive effects
  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Generate enhanced particles
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      y: 60, 
      opacity: 0,
      scale: 0.9,
      rotateX: -15
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Dynamic Gradient Background */}
      <motion.div
        className="absolute inset-0"
        style={{ 
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(220, 38, 127, 0.15) 0%, 
            rgba(139, 69, 19, 0.1) 25%, 
            rgba(15, 23, 42, 0.95) 50%, 
            rgba(2, 6, 23, 1) 100%)`,
          y: backgroundY 
        }}
      />

      {/* Animated Grid Background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ 
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          y: backgroundY
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Enhanced Interactive Background Orbs */}
      <motion.div
        className="absolute top-20 right-10 w-[400px] h-[400px]"
        style={{
          background: 'radial-gradient(circle, rgba(220, 38, 127, 0.3) 0%, rgba(239, 68, 68, 0.2) 30%, rgba(249, 115, 22, 0.1) 70%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          x: mousePosition.x * 0.03,
          y: mousePosition.y * 0.03,
        }}
        animate={{
          scale: [1, 1.3, 1.1, 1],
          opacity: [0.3, 0.7, 0.5, 0.3],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-20 left-10 w-[350px] h-[350px]"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(147, 51, 234, 0.3) 40%, rgba(168, 85, 247, 0.2) 70%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          x: mousePosition.x * -0.04,
          y: mousePosition.y * -0.03,
        }}
        animate={{
          scale: [1.2, 1, 1.4, 1.2],
          opacity: [0.4, 0.8, 0.6, 0.4],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-white/30 to-blue-300/20"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              x: [0, 150, -100, 0],
              y: [0, -200, -100, 0],
              opacity: [0, 1, 0.5, 0],
              scale: [0, 1, 0.5, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Enhanced Animated Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute"
            animate={{
              rotate: 360,
              scale: [0.5, 1.5, 0.8, 1.2, 0.5],
              opacity: [0.2, 1, 0.6, 0.9, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            style={{
              left: `${8 + i * 8}%`,
              top: `${10 + (i % 4) * 20}%`,
            }}
          >
            <Sparkles className="w-3 h-3 text-yellow-300/60" />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="container mx-auto px-4 md:px-6 relative z-10"
        style={{ opacity }}
      >
        <motion.div
          className="flex flex-col lg:flex-row items-center lg:space-x-12"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Enhanced Text Content */}
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0"
            style={{ y: textY }}
          >
            <motion.h4
              className="text-orange-400 font-bold text-xl mb-4 relative overflow-hidden"
              variants={itemVariants}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-transparent blur-lg"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.span
                className="relative z-10 inline-block"
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                IIT BOMBAY
              </motion.span>
            </motion.h4>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 relative"
              variants={titleVariants}
            >
              <motion.div className="overflow-hidden">
                {"MARS ROVER".split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    className="inline-block text-white"
                    variants={letterVariants}
                    whileHover={{ 
                      scale: 1.1, 
                      color: "#f97316",
                      textShadow: "0 0 20px rgba(249, 115, 22, 0.8)"
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </motion.div>
              
              <motion.div className="overflow-hidden">
                {"TEAM".split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    className="inline-block bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent"
                    variants={letterVariants}
                    whileHover={{ 
                      scale: 1.15,
                      filter: "brightness(1.5)"
                    }}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      backgroundSize: "200% 100%",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>

              {/* Enhanced floating rocket */}
              <motion.div
                className="absolute -right-16 top-6 hidden lg:block"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.2 }}
                >
                  <Rocket className="w-10 h-10 text-orange-400/80" />
                  <motion.div
                    className="absolute inset-0 bg-orange-400/20 rounded-full blur-xl scale-150"
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.h1>

            <motion.p
              className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              variants={itemVariants}
            >
              A unique student-led initiative focused on designing and building advanced rovers 
              capable of extraterrestrial exploration. Our rovers are equipped for autonomous 
              traversal, onboard testing, and tackling challenges in space exploration.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-10 py-6 rounded-2xl w-full sm:w-auto shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 relative overflow-hidden group border border-orange-400/30">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  />
                  <span className="relative z-10 flex items-center space-x-3 font-semibold">
                    <span>Explore Projects</span>
                    <Earth className="w-5 h-5" />
                  </span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button 
                  variant="outline" 
                  className="border-2 border-blue-400/50 text-blue-300 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 hover:border-blue-400 px-10 py-6 rounded-2xl w-full sm:w-auto transition-all duration-300 relative overflow-hidden group backdrop-blur-sm shadow-lg hover:shadow-blue-500/25"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <span className="relative z-10 font-semibold">Meet The Team</span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced Image Section */}
          <motion.div 
            className="lg:w-1/2 relative"
            style={{ y: imageY }}
            variants={itemVariants}
          >
            <motion.div
              className="relative"
              animate={{
                y: [0, -25, 0],
                rotateY: [0, 5, -5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Enhanced multi-layer glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-red-500/15 to-pink-500/10 rounded-3xl blur-3xl scale-110"
                animate={{
                  scale: [1.1, 1.4, 1.2, 1.1],
                  opacity: [0.3, 0.7, 0.5, 0.3],
                  rotate: [0, 90, 180, 270, 360],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-400/15 to-purple-500/10 rounded-3xl blur-2xl scale-105"
                animate={{
                  scale: [1.05, 1.25, 1.15, 1.05],
                  opacity: [0.4, 0.8, 0.6, 0.4],
                  rotate: [360, 270, 180, 90, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
              
              <motion.div
                className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-sm"
                whileHover={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                }}
              >
                <Image
                  src={MarsRoverLogo}
                  height={500}
                  width={500}
                  alt="Mars Rover"
                  className="w-full h-auto"
                />
              </motion.div>
            </motion.div>

            {/* Enhanced decorative elements */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-${3 + i % 3} h-${3 + i % 3} border-2 rounded-full`}
                style={{
                  borderColor: i % 2 === 0 ? '#f97316' : '#3b82f6',
                  top: `${10 + i * 15}%`,
                  left: i % 2 === 0 ? '-5%' : '95%',
                }}
                animate={{
                  rotate: i % 2 === 0 ? 360 : -360,
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.5,
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
        >
          <motion.span
            className="text-gray-400 text-sm mb-3 font-medium tracking-wider"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            SCROLL TO EXPLORE
          </motion.span>
          
          <motion.div
            className="relative"
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="text-gray-400 w-6 h-6" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-orange-400/30 to-transparent rounded-full blur-lg"
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
          
          <motion.div
            className="w-px h-16 bg-gradient-to-b from-gray-400/60 via-orange-400/40 to-transparent mt-3"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, delay: 3.5 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
