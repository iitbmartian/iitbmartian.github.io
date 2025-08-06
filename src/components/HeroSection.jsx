"use client";
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { ChevronDown, Star, Earth, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import MarsRoverLogo from '@/../public/mrt/Logo/mrtLogo.png';
import Image from 'next/image';
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import RoverIcon from '@/components/icons/RoverIcon'

const HeroSection = () => {
  const router = useRouter()
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  
  // Check for reduced motion preference
  const shouldReduceMotion = useReducedMotion();
  
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
  
  // Responsive parallax effects
  const backgroundY = useTransform(scrollY, [0, 1000], [0, shouldReduceMotion || isMobile ? 0 : 50]);
  const textY = useTransform(scrollY, [0, 800], [0, shouldReduceMotion || isMobile ? 0 : -25]);
  const imageY = useTransform(scrollY, [0, 800], [0, shouldReduceMotion || isMobile ? 0 : -15]);
  const orbsOpacity = useTransform(scrollY, [0, 400], [0.4, 0.1]);

  useEffect(() => {
    setHasMounted(true);
    setIsLoaded(true);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    let ticking = false;
    const handleMouseMove = (e) => {
      if (ticking || shouldReduceMotion || window.innerWidth < 768) return;

      ticking = true;
      requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        setMousePosition({ x, y });
        ticking = false;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [shouldReduceMotion]);

  // Optimized animation variants with mobile considerations
  const containerVariants = useMemo(() => ({
    hidden: { 
      opacity: 0,
      scale: 0.98
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion || isMobile ? 0.2 : 0.5,
        ease: "easeOut",
        staggerChildren: shouldReduceMotion || isMobile ? 0 : 0.1,
        delayChildren: shouldReduceMotion || isMobile ? 0 : 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }), [shouldReduceMotion, isMobile]);

  const itemVariants = useMemo(() => ({
    hidden: { y: shouldReduceMotion || isMobile ? 0 : 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion || isMobile ? 0.2 : 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      y: shouldReduceMotion || isMobile ? 0 : -15,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }), [shouldReduceMotion, isMobile]);

  const imageVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      scale: shouldReduceMotion || isMobile ? 1 : 0.95
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion || isMobile ? 0.2 : 0.6,
        ease: "easeOut",
        delay: shouldReduceMotion || isMobile ? 0 : 0.2
      },
    },
    exit: {
      opacity: 0,
      scale: shouldReduceMotion || isMobile ? 1 : 0.98,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  }), [shouldReduceMotion, isMobile]);

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden bg-gradient-to-br from-space-dark via-space to-space-dark"
    >
      {/* Simplified Background Effects */}
      <motion.div
        className="absolute inset-0 opacity-20 md:opacity-30"
        style={{ y: backgroundY }}
      />
      
      {/* Optimized Interactive Background Orbs - Desktop only */}
      {hasMounted && !shouldReduceMotion && !isMobile && (
        <>
          <motion.div
            className="absolute top-20 right-10 w-60 h-60 lg:w-80 lg:h-80 bg-gradient-to-r from-mars/8 to-orange-500/8 rounded-full blur-3xl"
            style={{
              x: mousePosition.x * 0.3,
              y: mousePosition.y * 0.3,
              opacity: orbsOpacity,
              willChange: "transform"
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute bottom-20 left-10 w-48 h-48 lg:w-60 lg:h-60 bg-gradient-to-r from-cosmic/8 to-blue-500/8 rounded-full blur-3xl"
            style={{
              x: mousePosition.x * -0.2,
              y: mousePosition.y * -0.2,
              opacity: orbsOpacity,
              willChange: "transform"
            }}
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </>
      )}

      {/* Reduced Floating Particles - Desktop only */}
      {hasMounted && !shouldReduceMotion && !isMobile && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full"
              animate={{
                y: [0, -40, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "easeInOut",
              }}
              style={{
                left: `${30 + Math.random() * 40}%`,
                top: `${30 + Math.random() * 40}%`,
                willChange: "transform"
              }}
            />
          ))}
        </div>
      )}

      {/* Reduced Animated Stars - Desktop only */}
      {hasMounted && !shouldReduceMotion && !isMobile && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8,
              }}
              style={{
                left: `${30 + i * 25}%`,
                top: `${25 + (i % 2) * 35}%`,
                willChange: "transform"
              }}
            >
              {i % 2 === 0 ? (
                <Star className="w-3 h-3 text-yellow-400/40" />
              ) : (
                <Sparkles className="w-3 h-3 text-cosmic/40" />
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Main Container - Responsive Layout */}
      <div className="w-full min-h-screen flex flex-col md:flex-row">
        {/* Text Content - Full width on mobile, half on desktop */}
        <motion.div 
          ref={textRef}
          className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 py-8 md:py-0 order-2 md:order-1"
          style={{ 
            y: textY,
            willChange: "transform"
          }}
          variants={containerVariants}
          initial="hidden"
          animate={textInView ? "visible" : "exit"}
        >
          <div className="max-w-2xl w-full text-center">
            <motion.h4
              className="text-mars font-orbitron text-lg sm:text-xl md:text-2xl mb-3 md:mb-4 relative overflow-hidden"
              variants={itemVariants}
              whileHover={shouldReduceMotion || isMobile ? {} : { scale: 1.02 }}
              style={{ willChange: "transform" }}
            >
              <span className="inline-block">IIT BOMBAY</span>
              
              {/* Optimized glowing line - Desktop only */}
              {hasMounted && !shouldReduceMotion && !isMobile && (
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-mars to-orange-500"
                  initial={{ width: 0, opacity: 0 }}
                  animate={textInView ? { 
                    width: "60%", 
                    opacity: 1 
                  } : { 
                    width: 0, 
                    opacity: 0 
                  }}
                  transition={{ duration: 1, delay: 0.5 }}
                  style={{ willChange: "width, opacity" }}
                />
              )}
            </motion.h4>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-orbitron mb-4 md:mb-6 relative"
              variants={itemVariants}
            >
              <motion.div 
                className="text-white mb-1 md:mb-2"
                whileHover={shouldReduceMotion || isMobile ? {} : { scale: 1.02 }}
                transition={{ duration: 0.2 }}
                style={{ willChange: "transform" }}
              >
                MARS ROVER
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent"
                whileHover={shouldReduceMotion || isMobile ? {} : { scale: 1.02 }}
                transition={{ duration: 0.2 }}
                style={{ willChange: "transform" }}
              >
                TEAM
              </motion.div>

              {/* Simplified floating rocket - Desktop only */}
              {hasMounted && !shouldReduceMotion && !isMobile && (
                <motion.div
                  className="absolute -right-8 lg:-right-12 top-2 lg:top-4 hidden lg:block"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.1 }}
                  style={{ willChange: "transform" }}
                >
                  <RoverIcon className="w-6 h-6 lg:w-8 lg:h-8 text-mars/60" />
                </motion.div>
              )}
            </motion.h1>

            <motion.p
              className="text-white/80 text-base sm:text-lg md:text-xl mb-6 md:mb-8 leading-relaxed px-2 sm:px-0"
              variants={itemVariants}
              whileHover={shouldReduceMotion || isMobile ? {} : { scale: 1.005 }}
              transition={{ duration: 0.2 }}
              style={{ willChange: "transform" }}
            >
              A unique student-led initiative focused on designing and building advanced rovers 
              capable of extraterrestrial exploration. Our rovers are equipped for autonomous 
              traversal, onboard testing, and tackling challenges in space exploration.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 px-4 sm:px-0"
              variants={itemVariants}
            >
              <motion.div
                whileHover={shouldReduceMotion || isMobile ? {} : { 
                  scale: 1.03, 
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
                style={{ willChange: "transform" }}
              >
                <Button className="bg-gradient-to-r from-mars to-orange-600 hover:from-mars-dark hover:to-orange-700 text-white px-6 md:px-8 py-4 md:py-6 rounded-xl w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-sm md:text-base">
                  <span className="flex items-center justify-center space-x-2">
                    <Link href="#projects" >Explore Projects</Link>
                    {hasMounted && !shouldReduceMotion && !isMobile && (
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        style={{ willChange: "transform" }}
                      >
                        <Earth className="w-4 h-4" />
                      </motion.div>
                    )}
                    {hasMounted && (shouldReduceMotion || isMobile) && <Earth className="w-4 h-4" />}
                  </span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={shouldReduceMotion || isMobile ? {} : { 
                  scale: 1.03, 
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
                style={{ willChange: "transform" }}
              >
                <Button 
                onClick={()=>{
                  router.push("/team")
                }}
                  variant="outline" 
                  className="border-2 border-cosmic text-cosmic hover:bg-cosmic/10 hover:border-cosmic/80 px-6 md:px-8 py-4 md:py-6 rounded-xl w-full sm:w-auto transition-all duration-300 backdrop-blur-sm font-semibold text-sm md:text-base"
                >
                  Meet The Team
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Image Section - Full width on mobile, half on desktop */}
        <motion.div 
          ref={imageRef}
          className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 py-8 md:py-0 order-1 md:order-2"
          style={{ 
            y: imageY,
            willChange: "transform"
          }}
          variants={imageVariants}
          initial="hidden"
          animate={imageInView ? "visible" : "exit"}
        >
          <motion.div
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg"
            animate={shouldReduceMotion || isMobile ? {} : {
              y: [0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={shouldReduceMotion || isMobile ? {} : { 
              scale: 1.03
            }}
            style={{ willChange: "transform" }}
          >
            {/* Simplified background glow - Desktop only */}
            {hasMounted && !shouldReduceMotion && !isMobile && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-mars/6 via-orange-500/6 to-cosmic/6 rounded-full blur-2xl scale-110"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ willChange: "opacity" }}
              />
            )}
            
            <motion.div
              className="relative z-10 rounded-xl overflow-hidden shadow-2xl mx-auto"
              initial={{ scale: shouldReduceMotion || isMobile ? 1 : 0.9, opacity: 0 }}
              animate={imageInView ? { 
                scale: 1, 
                opacity: 1
              } : { 
                scale: shouldReduceMotion || isMobile ? 1 : 0.9, 
                opacity: 0
              }}
              transition={{ 
                duration: shouldReduceMotion || isMobile ? 0.2 : 0.8, 
                delay: shouldReduceMotion || isMobile ? 0 : 0.2
              }}
              style={{ willChange: "transform, opacity" }}
            >
              <Image
                src={MarsRoverLogo}
                alt="Mars Rover"
                width={600}
                height={600}
                className="w-full h-auto invert"
                priority
                onLoad={() => setIsLoaded(true)}
              />
              
              {/* Simplified loading overlay */}
              {hasMounted && !isLoaded && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-mars/20 to-cosmic/20 flex items-center justify-center"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <RoverIcon className="w-8 h-8 md:w-12 md:h-12 text-white/40" />
                </motion.div>
              )}
            </motion.div>

            {/* Simplified Decorative Elements - Desktop only */}
            {hasMounted && !shouldReduceMotion && !isMobile && (
              <>
                <motion.div
                  className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-8 h-8 md:w-12 md:h-12 border-2 border-mars/60 rounded-full"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ willChange: "transform" }}
                />
                
                <motion.div
                  className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-10 h-10 md:w-16 md:h-16 border-2 border-cosmic/60 rounded-full"
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ willChange: "transform" }}
                />
              </>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Optimized Scroll Indicator */}
      <motion.div
        className="absolute top-80 md:top-[90%] sm:left-[50%] left-[37%] transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: shouldReduceMotion || isMobile ? 0 : 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: shouldReduceMotion || isMobile ? 0.2 : 0.6, 
          delay: shouldReduceMotion || isMobile ? 0 : 1.5
        }}
        whileHover={shouldReduceMotion || isMobile ? {} : { scale: 1.05 }}
        style={{ willChange: "transform" }}
      >
        <motion.span
          className="text-white/60 text-xs md:text-sm mb-2 font-medium text-center"
          animate={shouldReduceMotion || isMobile ? {} : {
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
          animate={shouldReduceMotion || isMobile ? {} : {
            y: [0, 6, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={shouldReduceMotion || isMobile ? {} : { scale: 1.1 }}
          style={{ willChange: "transform" }}
        >
          <ChevronDown className="text-white/60 w-5 h-5 md:w-6 md:h-6" />
        </motion.div>
        
        <motion.div
          className="w-px h-8 md:h-12 bg-gradient-to-b from-white/40 to-transparent mt-2"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: shouldReduceMotion || isMobile ? 0.2 : 0.8, delay: shouldReduceMotion || isMobile ? 0 : 2 }}
          style={{ willChange: "transform, opacity" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
