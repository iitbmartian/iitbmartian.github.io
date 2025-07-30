import React, { useEffect, useState } from 'react';
import { ChevronDown, Rocket, Star, Earth } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import MarsRoverLogo from '@/mrt/Logo/mrtLogo.png';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  // Parallax effects
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, -100]);
  const imageY = useTransform(scrollY, [0, 500], [0, -50]);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
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

  const textShimmer = {
    hidden: { backgroundPosition: "-200% 0" },
    visible: {
      backgroundPosition: "200% 0",
      transition: {
        duration: 3,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: 2,
      },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-space via-space-dark to-space">
      {/* Enhanced Background Effects */}
      <motion.div
        className="absolute inset-0 bg-hero-pattern opacity-30"
        style={{ y: backgroundY }}
      />
      
      {/* Interactive Background Orbs */}
      <motion.div
        className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-mars/20 to-orange-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          x: mousePosition.x * 0.02,
          y: mousePosition.y * 0.02,
        }}
      />
      
      <motion.div
        className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-r from-cosmic/20 to-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        style={{
          x: mousePosition.x * -0.03,
          y: mousePosition.y * -0.02,
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + i % 5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Animated Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute"
            animate={{
              rotate: 360,
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
          >
            <Star className="w-4 h-4 text-yellow-400/60" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="flex flex-col sm:flex-row items-center lg:space-x-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0"
            style={{ y: textY }}
          >
            <motion.h4
              className="text-mars font-technospace text-xl mb-3 relative overflow-hidden"
              variants={itemVariants}
            >
              <motion.span
                className="inline-block"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                IIT BOMBAY
              </motion.span>
              
              {/* Glowing line under IIT BOMBAY */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-mars to-orange-500"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 1 }}
              />
            </motion.h4>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-technospace mb-6 relative"
              variants={itemVariants}
            >
              <motion.span 
                className="block relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span
                  className="inline-block"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  MARS ROVER
                </motion.span>
              </motion.span>
              
              <motion.span
                className="text-gradient bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent relative"
                initial={{ backgroundSize: "200% 100%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  className="inline-block"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  TEAM
                </motion.span>
              </motion.span>

              {/* Rocket icon floating beside title */}
              <motion.div
                className="absolute -right-12 top-4 hidden lg:block"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
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
              className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              variants={itemVariants}
            >
              A unique student-led initiative focused on designing and building advanced rovers 
              capable of extraterrestrial exploration. Our rovers are equipped for autonomous 
              traversal, onboard testing, and tackling challenges in space exploration.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button className="bg-gradient-to-r from-mars to-orange-600 hover:from-mars-dark hover:to-orange-700 text-white px-8 py-6 rounded-xl w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Explore Projects</span>
                    <Earth className="w-4 h-4" />
                  </span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button 
                  variant="outline" 
                  className="border-2 border-cosmic text-cosmic hover:bg-gradient-to-r hover:from-cosmic/20 hover:to-blue-500/20 hover:border-cosmic/80 px-8 py-6 rounded-xl w-full sm:w-auto transition-all duration-300 relative overflow-hidden group backdrop-blur-sm"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cosmic/10 to-blue-500/10"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">Meet The Team</span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div 
            className="lg:w-1/2 relative"
            style={{ y: imageY }}
            variants={itemVariants}
          >
            <motion.div
              className="relative"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Enhanced background glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-mars/10 via-orange-500/10 to-cosmic/10 rounded-full blur-2xl scale-110"
                animate={{
                  scale: [1.1, 1.3, 1.1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <motion.img
                src={MarsRoverLogo}
                alt="Mars Rover"
                className="relative z-10 rounded-xl w-full h-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, 1, -1, 0],
                }}
              />
            </motion.div>

            {/* Enhanced Decorative Elements */}
            <motion.div
              className="absolute -top-4 -left-4 w-12 h-12 border-2 border-mars rounded-full"
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            <motion.div
              className="absolute -bottom-4 -right-4 w-16 h-16 border-2 border-cosmic rounded-full"
              animate={{
                rotate: -360,
                scale: [1.2, 1, 1.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Additional floating elements */}
            <motion.div
              className="absolute top-10 right-10 w-6 h-6 bg-mars/30 rounded-full blur-sm"
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            
            <motion.div
              className="absolute bottom-20 left-5 w-4 h-4 bg-cosmic/40 rounded-full blur-sm"
              animate={{
                x: [0, 20, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
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
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="text-white/60 w-6 h-6" />
          </motion.div>
          
          {/* Scroll line indicator */}
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent mt-2"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
