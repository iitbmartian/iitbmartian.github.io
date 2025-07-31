"use client";
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { ChevronDown, Rocket, Star, Earth, Sparkles, Target } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import MarsRoverLogo from '@/mrt/Logo/mrtLogo.png';
import Image from 'next/image';

const HeroSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Enhanced useInView with bidirectional animations
  const textInView = useInView(textRef, { 
    once: false, 
    margin: "-10% 0px -10% 0px",
    amount: 0.3
  });

  const imageInView = useInView(imageRef, { 
    once: false, 
    margin: "-15% 0px -15% 0px",
    amount: 0.3
  });

  const { scrollY } = useScroll();
  
  // Enhanced parallax effects
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 200]);
  const textY = useTransform(scrollY, [0, 800], [0, -100]);
  const imageY = useTransform(scrollY, [0, 800], [0, -50]);
  const orbsOpacity = useTransform(scrollY, [0, 400], [0.6, 0.2]);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30; // Enhanced intensity
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Enhanced animation variants
  const containerVariants = useMemo(() => ({
    hidden: { 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      y: -30,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  }), []);

  const imageVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      rotateX: 20,
      rotateY: -10
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.5
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      rotateX: -15,
      rotateY: 10,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  }), []);

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-space-dark via-space to-space-dark"
    >
      {/* Enhanced Background Effects */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      />
      
      {/* Enhanced Interactive Background Orbs */}
      <motion.div
        className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-mars/15 to-orange-500/15 rounded-full blur-3xl"
        style={{
          x: mousePosition.x * 0.8,
          y: mousePosition.y * 0.8,
          opacity: orbsOpacity,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-r from-cosmic/15 to-blue-500/15 rounded-full blur-3xl"
        style={{
          x: mousePosition.x * -0.5,
          y: mousePosition.y * -0.5,
          opacity: orbsOpacity,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            animate={{
              y: [0, -80, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 8 + i % 4,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut",
            }}
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
          />
        ))}
      </div>

      {/* Enhanced Animated Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.9, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + (i % 4) * 20}%`,
            }}
          >
            {i % 3 === 0 ? (
              <Star className="w-4 h-4 text-yellow-400/60" />
            ) : i % 3 === 1 ? (
              <Sparkles className="w-3 h-3 text-cosmic/60" />
            ) : (
              <Target className="w-3 h-3 text-mars/60" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Main Container - Full Width Split */}
      <div className="w-full h-screen flex">
        {/* Enhanced Left Half - Text Content */}
        <motion.div 
          ref={textRef}
          className="w-1/2 h-full flex items-center justify-center px-8 lg:px-16"
          style={{ y: textY }}
          variants={containerVariants}
          initial="hidden"
          animate={textInView ? "visible" : "exit"}
        >
          <div className="max-w-2xl">
            <motion.h4
              className="text-mars font-orbitron flex justify-center items-center text-xl mb-4 relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <span className="inline-block text-3xl">IIT BOMBAY</span>
              
              {/* Enhanced glowing line */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-mars to-orange-500"
                initial={{ width: 0, opacity: 0 }}
                animate={textInView ? { 
                  width: "100%", 
                  opacity: 1 
                } : { 
                  width: 0, 
                  opacity: 0 
                }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />
            </motion.h4>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-orbitron mb-6 relative"
              variants={itemVariants}
            >
              <motion.div 
                className="text-white mb-2 flex justify-center items-center text-center"
                whileHover={{ scale: 1.03, y: -3 }}
                transition={{ duration: 0.3 }}
              >
                MARS ROVER
              </motion.div>
              
              <motion.div 
                className="flex justify-center items-center bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent"
                whileHover={{ scale: 1.03, y: -3 }}
                transition={{ duration: 0.3 }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                }}
                style={{
                  transition: {
                    backgroundPosition: {
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }
                }}
              >
                TEAM
              </motion.div>

              {/* Enhanced floating rocket */}
              <motion.div
                className="absolute -right-12 top-4 hidden xl:block"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.2, rotate: 15 }}
              >
                <Rocket className="w-8 h-8 text-mars/60" />
              </motion.div>
            </motion.h1>

            <motion.p
              className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              A unique student-led initiative focused on designing and building advanced rovers 
              capable of extraterrestrial exploration. Our rovers are equipped for autonomous 
              traversal, onboard testing, and tackling challenges in space exploration.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 10px 30px rgba(255, 107, 53, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button className="bg-gradient-to-r from-mars to-orange-600 hover:from-mars-dark hover:to-orange-700 text-white px-8 py-6 rounded-xl w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
                  <span className="flex items-center space-x-2">
                    <span>Explore Projects</span>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Earth className="w-4 h-4" />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 10px 30px rgba(0, 217, 255, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
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

        {/* Enhanced Right Half - Image Section */}
        <motion.div 
          ref={imageRef}
          className="w-1/2 h-full flex items-center justify-center px-8 lg:px-16 perspective-1000"
          style={{ 
            y: imageY,
            transformStyle: "preserve-3d"
          }}
          variants={imageVariants}
          initial="hidden"
          animate={imageInView ? "visible" : "exit"}
        >
          <motion.div
            className="relative w-full max-w-lg"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
              rotateX: -5
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Enhanced background glow */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-mars/10 via-orange-500/10 to-cosmic/10 rounded-full blur-2xl scale-110"
              animate={{
                opacity: [0.4, 0.8, 0.4],
                scale: [1.1, 1.3, 1.1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="relative z-10 rounded-xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
              animate={imageInView ? { 
                scale: 1, 
                opacity: 1, 
                rotateX: 0 
              } : { 
                scale: 0.8, 
                opacity: 0, 
                rotateX: 20 
              }}
              transition={{ 
                duration: 1, 
                delay: 0.4,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              whileHover={{
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)"
              }}
            >
              <Image
                src={MarsRoverLogo}
                alt="Mars Rover"
                width={600}
                height={600}
                className="w-full h-auto"
                priority
                onLoad={() => setIsLoaded(true)}
              />
              
              {/* Image loading overlay */}
              {!isLoaded && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-mars/20 to-cosmic/20 flex items-center justify-center"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Rocket className="w-12 h-12 text-white/40" />
                  </motion.div>
                </motion.div>
              )}
            </motion.div>

            {/* Enhanced Decorative Elements */}
            <motion.div
              className="absolute -top-4 -left-4 w-12 h-12 border-2 border-mars rounded-full opacity-60"
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
            
            <motion.div
              className="absolute -bottom-4 -right-4 w-16 h-16 border-2 border-cosmic rounded-full opacity-60"
              animate={{
                rotate: -360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: {
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }
              }}
            />

            {/* Enhanced floating elements */}
            <motion.div
              className="absolute top-10 right-10 w-6 h-6 bg-mars/30 rounded-full blur-sm"
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.9, 0.3],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <motion.div
              className="absolute bottom-20 left-5 w-4 h-4 bg-cosmic/40 rounded-full blur-sm"
              animate={{
                x: [0, 20, 0],
                opacity: [0.4, 0.9, 0.4],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            />

            {/* New orbital elements */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-32 h-32 border border-white/20 rounded-full"
              style={{
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <motion.div
                className="absolute top-0 left-1/2 w-2 h-2 bg-cosmic rounded-full"
                style={{ x: "-50%", y: "-50%" }}
                animate={{
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 30, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 1, 
          delay: 2,
          type: "spring",
          stiffness: 100
        }}
        whileHover={{ scale: 1.1 }}
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
            y: [0, 12, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.2 }}
        >
          <ChevronDown className="text-white/60 w-6 h-6" />
        </motion.div>
        
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent mt-2"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        />
      </motion.div>

      {/* Additional ambient elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 2
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-cosmic/50 rounded-full"
        animate={{
          scale: [0, 1.5, 0],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
          repeatDelay: 1.5
        }}
      />
    </section>
  );
};

export default HeroSection;
