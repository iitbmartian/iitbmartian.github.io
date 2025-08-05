"use client";
import React, { useRef, useMemo, useState, useCallback } from 'react';
import { Award, Flag, Users, Star, Rocket, Sparkles, Target, TrendingUp, Zap, Crown, Medal } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

const AboutSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const visionMissionRef = useRef(null);
  const figuresRef = useRef(null);
  const highlightsRef = useRef(null);
  
  // Enhanced useInView with bidirectional animations for different sections
  const headerInView = useInView(headerRef, { 
    once: false, 
    margin: "-10% 0px -10% 0px",
    amount: 0.3
  });

  const visionMissionInView = useInView(visionMissionRef, { 
    once: false, 
    margin: "-15% 0px -15% 0px",
    amount: 0.3
  });

  const figuresInView = useInView(figuresRef, { 
    once: false, 
    margin: "-15% 0px -15% 0px",
    amount: 0.3
  });

  const highlightsInView = useInView(highlightsRef, { 
    once: false, 
    margin: "-15% 0px -15% 0px",
    amount: 0.3
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Enhanced optimized transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.9, 0.3]);
  const floatingScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  // Enhanced memoized data
  const figures = useMemo(() => [
    { 
      number: "12+", 
      text: "Years and counting!", 
      icon: <Star className="h-6 w-6 text-cosmic" />,
      gradient: "from-cosmic/20 to-blue-500/20",
      shadowColor: "rgba(0, 217, 255, 0.3)"
    },
    { 
      number: "50+", 
      text: "Active team members", 
      icon: <Users className="h-6 w-6 text-mars" />,
      gradient: "from-mars/20 to-orange-500/20",
      shadowColor: "rgba(255, 107, 53, 0.3)"
    },
    { 
      number: "6", 
      text: "Entirely different rovers", 
      icon: <Rocket className="h-6 w-6 text-cosmic" />,
      gradient: "from-cosmic/20 to-purple-500/20",
      shadowColor: "rgba(147, 51, 234, 0.3)"
    },
    { 
      number: "∞", 
      text: "Uncountable learnings!", 
      icon: <Sparkles className="h-6 w-6 text-mars" />,
      gradient: "from-mars/20 to-pink-500/20",
      shadowColor: "rgba(236, 72, 153, 0.3)"
    }
  ], []);

  const highlights = useMemo(() => [
    "Secured First position among all Indian teams in University Rover Challenge 2023, USA",
    "Secured 6th rank in Bio-sciences task in University Rover Challenge 2023, USA", 
    "Achieved Excellence Award in Autonomous category in International Rover Challenge 2023",
    "Secured 5th Position out of 18 teams in International Rover Challenge IRC 2023",
    "Achieved Excellence Award in Navigation Task in European Rover Challenge 2022"
  ], []);

  const visionPoints = useMemo(() => [
    "Establish IIT Bombay as a global leader in space robotics",
    "Innovate in Mars Rover technology",
    "Nurture sustainable and skilled talent pipeline", 
    "Contribute to advancements in planetary exploration",
    "Build a legacy of engineering excellence and impactful research"
  ], []);

  // Enhanced animation variants
  const headerVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      y: -40,
      scale: 1.05,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: 40, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }), []);

  const sectionVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.12
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.6,
        staggerChildren: 0.05
      }
    }
  }), []);

  const figureVariants = useMemo(() => (index) => ({
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.8, 
      rotateX: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        delay: index * 0.15,
        type: "spring",
        stiffness: 120,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.9,
      rotateX: -15,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  }), []);

  const highlightVariants = useMemo(() => (index) => ({
    hidden: { 
      opacity: 0, 
      x: -40, 
      scale: 0.95 
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 130,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      x: -20,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  }), []);

  // Optimized event handlers
  const handleCardHover = useCallback((index) => setHoveredCard(index), []);
  const handleCardLeave = useCallback(() => setHoveredCard(null), []);

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
            opacity: orbOpacity,
            scale: floatingScale
          }}
          animate={{
            rotate: [0, 180, 360],
            x: [0, 20, -20, 0]
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            x: { duration: 20, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        <motion.div
          className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-cosmic/15 to-blue-500/15 rounded-full blur-3xl"
          style={{ 
            y: backgroundY,
            opacity: orbOpacity,
            scale: floatingScale
          }}
          animate={{
            rotate: [360, 180, 0],
            x: [0, -30, 30, 0]
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            x: { duration: 15, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Enhanced floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                y: [0, -40, 0],
                opacity: [0.1, 0.4, 0.1],
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 20 + i * 4,
                repeat: Infinity,
                delay: i * 2.5,
                ease: "easeInOut",
              }}
              style={{
                left: `${5 + Math.random() * 90}%`,
                top: `${5 + Math.random() * 90}%`,
              }}
            >
              {i % 6 === 0 ? (
                <Star className="w-4 h-4 text-cosmic/20" />
              ) : i % 6 === 1 ? (
                <Rocket className="w-4 h-4 text-mars/20" />
              ) : i % 6 === 2 ? (
                <Award className="w-4 h-4 text-cosmic/20" />
              ) : i % 6 === 3 ? (
                <Target className="w-4 h-4 text-mars/20" />
              ) : i % 6 === 4 ? (
                <Crown className="w-3 h-3 text-cosmic/20" />
              ) : (
                <Medal className="w-3 h-3 text-mars/20" />
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
              animate={{
                backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
              }}
              transition={{
                backgroundPosition: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              <span className="bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent">
                About Us
              </span>
            </motion.h2>
            
            <motion.div
              className="pb-6"
              initial={{ width: 0, opacity: 0 }}
              animate={headerInView ? { 
                width: "200px", 
                opacity: 1 
              } : { 
                width: 0, 
                opacity: 0 
              }}
              transition={{ duration: 1.8, delay: 0.5 }}
            />
            
            <motion.p 
              className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Founded in{" "}
              <motion.span 
                className="text-mars font-semibold"

              >
                2012
              </motion.span>
              , MRT (Mars Rover Team) was established with a vision to make 
              significant strides in space exploration and autonomous robotics. Over the years, 
              our team has fostered an environment of inclusive growth and continuous learning, 
              leading to remarkable progress and consistent success in premier international competitions.
            </motion.p>
          </motion.div>
          
          {/* Enhanced Vision and Mission Section */}
          <motion.div 
            ref={visionMissionRef}
            className="grid lg:grid-cols-2 gap-8 lg:gap-12"
            variants={sectionVariants}
            initial="hidden"
            animate={visionMissionInView ? "visible" : "exit"}
          >
            {/* Enhanced Vision */}
            <motion.div
              className="bg-gradient-to-br from-space-light/30 to-space-light/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-mars/30 transition-all duration-300 group perspective-1000 relative"
              variants={itemVariants}

              onMouseEnter={() => handleCardHover('vision')}
              onMouseLeave={handleCardLeave}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.h3 
                className="text-3xl font-bold mb-6 font-orbitron text-mars flex items-center"
              >
                <motion.div

                  animate={{
                    boxShadow: hoveredCard === 'vision' ? [
                      "0 0 0 rgba(255, 107, 53, 0)",
                      "0 0 20px rgba(255, 107, 53, 0.6)",
                      "0 0 0 rgba(255, 107, 53, 0)"
                    ] : []
                  }}
                  style={{
                    transition: hoveredCard === 'vision' ? {
                      boxShadow: { duration: 1.5, repeat: Infinity }
                    } : {}
                  }}
                >
                  <Flag className="mr-3 text-mars flex-shrink-0" />
                </motion.div>
                Our Vision
              </motion.h3>
              
              <div className="space-y-4">
                {visionPoints.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start group/item"
                    initial={{ opacity: 0, x: -25 }}
                    animate={visionMissionInView ? { 
                      opacity: 1, 
                      x: 0 
                    } : { 
                      opacity: 0, 
                      x: -25 
                    }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.3 + index * 0.1,
                      type: "spring",
                      stiffness: 120
                    }}
                  >
                    <motion.div

                      transition={{ duration: 0.6 }}
                      animate={{
                        rotate: [0, 10, -10, 0]
                      }}
                      style={{
                        transition: {
                          rotate: { duration: 4, repeat: Infinity, delay: index * 0.5 }
                        }
                      }}
                    >
                      <Flag className="h-4 w-4 text-mars mr-3 mt-1 flex-shrink-0" />
                    </motion.div>
                    <motion.span 
                      className="text-white/80 group-hover/item:text-white transition-colors duration-300"
                    >
                      {item}
                    </motion.span>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-mars/5 to-orange-500/5 rounded-2xl pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredCard === 'vision' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Enhanced Mission */}
            <motion.div
              className="bg-gradient-to-br from-space-light/30 to-space-light/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cosmic/30 transition-all duration-300 group perspective-1000 relative"
              variants={itemVariants}

              onMouseEnter={() => handleCardHover('mission')}
              onMouseLeave={handleCardLeave}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.h3 
                className="text-3xl font-bold mb-6 font-orbitron text-cosmic flex items-center"
              >
                <motion.div

                  transition={{ duration: 0.8 }}
                  animate={{
                    y: [0, -5, 0],
                    boxShadow: hoveredCard === 'mission' ? [
                      "0 0 0 rgba(0, 217, 255, 0)",
                      "0 0 20px rgba(0, 217, 255, 0.6)",
                      "0 0 0 rgba(0, 217, 255, 0)"
                    ] : []
                  }}
                  style={{
                    transition: {
                      y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                      boxShadow: hoveredCard === 'mission' ? {
                        duration: 1.5, 
                        repeat: Infinity 
                      } : {}
                    }
                  }}
                >
                  <Rocket className="mr-3 text-cosmic flex-shrink-0" />
                </motion.div>
                Our Mission
              </motion.h3>
              
              <motion.p 
                className="text-white/80 leading-relaxed group-hover:text-white/90 transition-colors duration-300"
                initial={{ opacity: 0.8 }}
                animate={visionMissionInView ? { opacity: 0.8 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
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
                animate={{ opacity: hoveredCard === 'mission' ? 1 : 0 }}
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
            animate={figuresInView ? "visible" : "exit"}
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
                  className="bg-gradient-to-br from-space-light/30 to-space-light/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 group perspective-1000 relative"
                  variants={figureVariants(index)}
                  initial="hidden"
                  animate={figuresInView ? "visible" : "exit"}

                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => handleCardHover(index)}
                  onMouseLeave={handleCardLeave}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="flex justify-center mb-4">
                    <motion.div 
                      className={`p-3 bg-gradient-to-br ${figure.gradient} rounded-full group-hover:scale-110 transition-transform duration-300`}
                      transition={{ duration: 0.8 }}
                      animate={{
                        boxShadow: hoveredCard === index ? [
                          "0 0 0 rgba(255, 255, 255, 0)",
                          `0 0 25px ${figure.shadowColor}`,
                          "0 0 0 rgba(255, 255, 255, 0)"
                        ] : [],
                        y: [0, -3, 0]
                      }}
                      style={{
                        transition: {
                          boxShadow: hoveredCard === index ? {
                            duration: 1.5,
                            repeat: Infinity
                          } : {},
                          y: {
                            duration: 2 + index * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                        }
                      }}
                    >
                      {figure.icon}
                    </motion.div>
                  </div>
                  
                  <motion.h4 
                    className="text-3xl lg:text-4xl font-bold mb-2 font-orbitron bg-gradient-to-r from-mars to-cosmic bg-clip-text text-transparent"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={figuresInView ? { 
                      scale: 1, 
                      rotate: 0 
                    } : { 
                      scale: 0, 
                      rotate: -180 
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.4 + index * 0.15,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    {figure.number}
                  </motion.h4>
                  
                  <motion.p 
                    className="text-white/70 group-hover:text-white/90 transition-colors duration-300 text-sm"
                  >
                    {figure.text}
                  </motion.p>

                  {/* Enhanced glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-mars/5 to-cosmic/5 rounded-2xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />


                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Enhanced Highlights */}
          <motion.div 
            ref={highlightsRef}
            className="text-center"
            variants={sectionVariants}
            initial="hidden"
            animate={highlightsInView ? "visible" : "exit"}
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
              className="bg-gradient-to-br from-space-light/30 to-space-light/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cosmic/30 transition-all duration-300 relative"
              variants={itemVariants}
              onMouseEnter={() => handleCardHover('highlights')}
              onMouseLeave={handleCardLeave}
            >
              <div className="space-y-6">
                {highlights.map((highlight, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start group text-left perspective-1000"
                    variants={highlightVariants(index)}
                    initial="hidden"
                    animate={highlightsInView ? "visible" : "exit"}

                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <motion.div 
                      className="flex-shrink-0 mr-4 mt-1"

                      transition={{ duration: 0.6 }}
                      animate={{
                        rotate: [0, 15, -15, 0],
                        boxShadow: [
                          "0 0 0 rgba(0, 217, 255, 0)",
                          "0 0 15px rgba(0, 217, 255, 0.4)",
                          "0 0 0 rgba(0, 217, 255, 0)"
                        ]
                      }}
                      style={{
                        transition: {
                          rotate: { 
                            duration: 4, 
                            repeat: Infinity, 
                            delay: index * 0.3 
                          },
                          boxShadow: { 
                            duration: 3, 
                            repeat: Infinity, 
                            delay: index * 0.5 
                          }
                        }
                      }}
                    >
                      <Award className="h-5 w-5 lg:h-6 lg:w-6 text-cosmic" />
                    </motion.div>
                    
                    <motion.p 
                      className="text-white/90 group-hover:text-white transition-colors duration-300 leading-relaxed"
                      initial={{ opacity: 0.9 }}
                    >
                      {highlight}
                    </motion.p>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cosmic/5 to-blue-500/5 rounded-2xl pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredCard === 'highlights' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />


            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
