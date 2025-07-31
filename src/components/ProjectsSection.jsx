import React, { useRef, useState, useMemo, useCallback } from 'react';
import { ArrowRight, Zap, Trophy, Target, Award, Rocket, Star, ExternalLink, Calendar } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Enhanced ProjectCard Component
const ProjectCard = ({ title, description, image, year, className, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  // Enhanced useInView with bidirectional animations
  const isInView = useInView(cardRef, { 
    once: false, 
    margin: "-15% 0px -15% 0px",
    amount: 0.3
  });

  // Memoized animation variants
  const cardVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.9,
      rotateX: 15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        delay: index * 0.1,
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.95,
      rotateX: -10,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  }), [index]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-gradient-to-br from-space-light/30 to-space-light/10 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 perspective-1000",
        className
      )}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      whileHover={{ 
        y: -12,
        scale: 1.03,
        rotateY: 2
      }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Enhanced Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-mars/10 to-cosmic/10"
        animate={{ 
          opacity: isHovered ? 0.4 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Enhanced Image Container */}
      <div className="relative h-64 overflow-hidden">
        {/* Enhanced Image Placeholder */}
        <motion.div
          className="w-full h-full bg-gradient-to-br from-mars/60 to-cosmic/40 relative overflow-hidden"
          animate={{
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Enhanced tech grid pattern */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 22px),
                               repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 22px)`,
            }}
          />

          {/* Enhanced Rover Icon */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ 
              rotate: {
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              },
              scale: {
                duration: 0.3
              }
            }}
          >
            <Rocket className="w-16 h-16 text-white/90" />
          </motion.div>

          {/* Animated glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-space/90 via-space/50 to-transparent" />
        
        {/* Enhanced Year Badge */}
        <motion.div
          className="absolute top-4 right-4 bg-gradient-to-r from-mars/90 to-orange-500/90 text-white text-sm font-medium py-2 px-4 rounded-full backdrop-blur-sm border border-white/20"
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={isInView ? { 
            scale: 1, 
            opacity: 1, 
            rotate: 0 
          } : { 
            scale: 0, 
            opacity: 0, 
            rotate: -180 
          }}
          transition={{ 
            duration: 0.5, 
            delay: 0.3 + index * 0.05,
            type: "spring"
          }}
          whileHover={{ scale: 1.08, rotate: 5 }}
        >
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{year}</span>
          </div>
        </motion.div>

        {/* Enhanced Project Number */}
        <motion.div
          className="absolute top-4 left-4 w-10 h-10 bg-gradient-to-r from-cosmic/90 to-blue-500/90 rounded-full flex items-center justify-center text-white font-bold backdrop-blur-sm border border-white/20"
          initial={{ scale: 0, opacity: 0, x: -20 }}
          animate={isInView ? { 
            scale: 1, 
            opacity: 1, 
            x: 0 
          } : { 
            scale: 0, 
            opacity: 0, 
            x: -20 
          }}
          transition={{ 
            duration: 0.5, 
            delay: 0.2 + index * 0.05,
            type: "spring"
          }}
          whileHover={{ scale: 1.15, rotate: 10 }}
        >
          {index + 1}
        </motion.div>

        {/* Status indicator */}
        <motion.div
          className="absolute bottom-4 right-4 px-3 py-1 bg-gradient-to-r from-green-500/80 to-emerald-500/80 rounded-full backdrop-blur-sm border border-white/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
        >
          <span className="text-xs text-white font-medium">Completed</span>
        </motion.div>
      </div>

      {/* Enhanced Content Section */}
      <motion.div 
        className="relative z-20 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
      >
        <motion.h3
          className="text-xl font-bold mb-3 font-orbitron relative text-white group-hover:text-cosmic transition-colors duration-300"
          whileHover={{ x: 3 }}
        >
          {title}
          <motion.div
            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-mars to-cosmic rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
              width: isHovered ? "100%" : "0%",
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.h3>
        
        <motion.p 
          className="text-white/70 mb-6 leading-relaxed group-hover:text-white/85 transition-colors duration-300"
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
        >
          {description}
        </motion.p>
        
        <motion.div
          whileHover={{ scale: 1.03, x: 3 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button 
            variant="ghost" 
            className="text-cosmic hover:text-cyan-300 p-0 h-auto group/btn transition-colors duration-300"
          >
            <span className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Zap className="w-4 h-4" />
              </motion.div>
              <span className="font-medium">Learn more</span>
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </motion.div>
            </span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Enhanced border effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-transparent pointer-events-none"
        animate={{
          borderColor: isHovered 
            ? ["rgba(0, 217, 255, 0.4)", "rgba(255, 107, 53, 0.4)", "rgba(0, 217, 255, 0.4)"]
            : "transparent"
        }}
        transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-mars/5 to-cosmic/5 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const achievementsRef = useRef(null);
  
  // Enhanced useInView for different sections
  const headerInView = useInView(headerRef, { 
    once: false, 
    margin: "-10% 0px -10% 0px",
    amount: 0.3
  });

  const achievementsInView = useInView(achievementsRef, { 
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

  // Memoized projects data
  const projects = useMemo(() => [
    {
      title: "Rover Alpha",
      description: "Our first prototype rover capable of basic movement and object detection with advanced sensor integration.",
      image: "https://via.placeholder.com/600x400?text=Rover+Alpha",
      year: "2016"
    },
    {
      title: "Rover Beta", 
      description: "Second generation rover with improved navigation and sample collection systems for enhanced field operations.",
      image: "https://via.placeholder.com/600x400?text=Rover+Beta",
      year: "2018"
    },
    {
      title: "Rover Gamma",
      description: "Advanced rover with autonomous navigation and scientific instruments designed for competition excellence.",
      image: "https://via.placeholder.com/600x400?text=Rover+Gamma", 
      year: "2020"
    },
    {
      title: "Rover Delta",
      description: "Latest generation rover with AI-powered systems and extended range capabilities for Mars simulation.",
      image: "https://via.placeholder.com/600x400?text=Rover+Delta",
      year: "2022"
    }
  ], []);

  const achievements = useMemo(() => [
    {
      title: "URC",
      description: "University Rover Challenge Finalists 2022",
      icon: <Trophy className="w-8 h-8 text-mars" />,
      gradient: "from-mars/20 to-orange-500/10",
      borderColor: "border-mars/30"
    },
    {
      title: "ERC", 
      description: "European Rover Challenge 3rd Place 2021",
      icon: <Award className="w-8 h-8 text-cosmic" />,
      gradient: "from-cosmic/20 to-blue-500/10",
      borderColor: "border-cosmic/30"
    },
    {
      title: "IRC",
      description: "Indian Rover Challenge Champions 2019-2022",
      icon: <Target className="w-8 h-8 text-mars" />,
      gradient: "from-mars/20 to-red-500/10", 
      borderColor: "border-mars/30"
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

  const sectionVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1
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

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="py-24 bg-gradient-to-br from-space-dark via-space to-space-dark relative overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 right-0 w-1/2 h-1/2 bg-gradient-to-l from-mars/10 to-orange-500/5 rounded-full blur-3xl"
          style={{ 
            y: backgroundY,
            opacity: orbOpacity
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 left-0 w-1/2 h-1/2 bg-gradient-to-r from-cosmic/10 to-blue-500/5 rounded-full blur-3xl"
          style={{ 
            y: backgroundY,
            opacity: orbOpacity
          }}
        />

        {/* Enhanced floating project icons */}
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
              <Trophy className="w-4 h-4 text-white/20" />
            ) : (
              <Target className="w-3 h-3 text-white/20" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Header Section */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "exit"}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-bold font-orbitron mb-6 relative inline-block"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent">
              Our Projects
            </span>
            <motion.div
              className=""
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
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed flex items-center justify-center space-x-3"
            variants={itemVariants}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Star className="w-6 h-6 text-cosmic flex-shrink-0" />
            </motion.div>
            <span>Explore our journey of rover development through the years, from conception to competition-ready designs</span>
            <motion.div
              animate={{ 
                y: [0, -3, 0],
                rotate: [0, 15, -15, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Rocket className="w-6 h-6 text-mars flex-shrink-0" />
            </motion.div>
          </motion.p>

          {/* Enhanced Project Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            {[
              { label: "Projects", value: projects.length, icon: <Rocket className="w-4 h-4" />, gradient: "from-mars to-orange-500" },
              { label: "Years Active", value: "8+", icon: <Star className="w-4 h-4" />, gradient: "from-cosmic to-blue-500" },
              { label: "Competitions", value: "15+", icon: <Trophy className="w-4 h-4" />, gradient: "from-purple-500 to-pink-500" },
              { label: "Awards Won", value: "12+", icon: <Award className="w-4 h-4" />, gradient: "from-green-500 to-emerald-500" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-space-light/20 to-space-light/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center group hover:border-white/30 transition-all duration-300 perspective-1000"
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
                  delay: 0.3 + index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  rotateY: 5
                }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div 
                  className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${stat.gradient}/20 mb-2`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.icon}
                  </div>
                </motion.div>
                <motion.div 
                  className="text-lg font-bold text-white mb-1"
                  initial={{ scale: 0 }}
                  animate={headerInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-white/70 group-hover:text-white/90 transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Enhanced Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              index={index}
              className={index % 2 === 1 ? "md:mt-12" : ""}
            />
          ))}
        </div>
        
        {/* Enhanced Achievements Section */}
        <motion.div
          ref={achievementsRef}
          className="mt-16 text-center"
          variants={sectionVariants}
          initial="hidden"
          animate={achievementsInView ? "visible" : "exit"}
        >
          <motion.h3 
            className="text-3xl md:text-4xl font-bold mb-12 font-orbitron flex items-center justify-center space-x-3"
            variants={itemVariants}
          >
            <motion.div
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Trophy className="w-7 h-7 text-mars" />
            </motion.div>
            <span className="bg-gradient-to-r from-mars to-cosmic bg-clip-text text-transparent">
              Competitions & Achievements
            </span>
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br from-space-light/30 to-space-light/10 rounded-2xl p-8 border backdrop-blur-sm relative overflow-hidden hover:border-white/30 transition-all duration-300 group perspective-1000 ${achievement.borderColor}`}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  rotateY: 3
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Enhanced Background Gradient Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient}`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <motion.div
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 360 
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {achievement.icon}
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="text-3xl font-bold mb-3 font-orbitron text-white"
                    whileHover={{ scale: 1.05 }}
                  >
                    {achievement.title}
                  </motion.div>
                  
                  <motion.p 
                    className="text-white/80 group-hover:text-white/90 transition-colors duration-300"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {achievement.description}
                  </motion.p>
                </div>

                {/* Enhanced achievement indicator */}
                <motion.div 
                  className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-mars to-cosmic rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-mars/5 to-cosmic/5 rounded-2xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
