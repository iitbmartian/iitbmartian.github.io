'use client';
import React, { useRef, useState, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Rocket, 
  Star, 
  Calendar, 
  Award, 
  Zap, 
  Target, 
  ArrowRight, 
  ChevronDown,
  Cpu,
  Camera,
  Cog,
  MapPin,
  TrendingUp
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import RoverTimeline from '@/components/rover/RoverTimeline';
import { cn } from '@/lib/utils';

// Optimized Stats Component with scroll-based animations
const StatCard = ({ icon: Icon, number, label, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false, 
    margin: "-20% 0px -20% 0px",
    amount: 0.5
  });

  // Memoized animation variants
  const cardVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 40, 
      scale: 0.8,
      rotateY: -15
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        delay: delay / 1000,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.9,
      rotateY: 10,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  }), [delay]);

  // Optimized counter effect
  React.useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        let start = 0;
        const end = parseInt(number);
        const duration = 1200;
        const increment = end / (duration / 16);
        
        const counter = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(counter);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        
        return () => clearInterval(counter);
      }, delay);
      
      return () => clearTimeout(timer);
    } else {
      setCount(0); // Reset when out of view
    }
  }, [isInView, number, delay]);

  return (
    <motion.div
      ref={ref}
      className="bg-gradient-to-br from-space-dark/80 to-space/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-mars/40 transition-all duration-300 group perspective-1000"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      whileHover={{ 
        scale: 1.05, 
        y: -5,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div 
        className="w-12 h-12 bg-gradient-to-r from-mars to-cosmic rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <Icon className="w-6 h-6 text-white" />
      </motion.div>
      
      <motion.div 
        className="text-3xl font-bold text-white mb-2 font-orbitron"
        animate={{ scale: isInView ? 1 : 0.8 }}
        transition={{ duration: 0.3, delay: (delay / 1000) + 0.2 }}
      >
        {count}+
      </motion.div>
      
      <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors duration-300">
        {label}
      </p>
    </motion.div>
  );
};

// Enhanced Rover Card Component with bidirectional animations
const RoverCard = ({ rover, index, isActive, onClick }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { 
    once: false, 
    margin: "-15% 0px -15% 0px",
    amount: 0.3
  });

  // Memoized animation variants for better performance
  const cardVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.9,
      rotateX: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.08,
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.95,
      rotateX: -15,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  }), [index]);
  
  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer group perspective-1000",
        isActive 
          ? "bg-gradient-to-br from-mars/20 to-cosmic/20 border-mars/60 shadow-lg shadow-mars/20" 
          : "bg-gradient-to-br from-space-dark/60 to-space/60 border-white/10 hover:border-mars/30"
      )}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      onClick={onClick}
      whileHover={{ 
        scale: 1.03, 
        y: -8,
        rotateY: 3,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.97 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Enhanced background pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: isActive ? ["0% 0%", "100% 100%"] : ["0% 0%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
               backgroundSize: '20px 20px'
             }} 
        />
      </motion.div>

      <div className="relative p-6 backdrop-blur-sm">
        {/* Year Badge with enhanced animation */}
        <motion.div 
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
        >
          <motion.div 
            className="bg-gradient-to-r from-mars/30 to-cosmic/30 text-white text-sm font-medium py-2 px-4 rounded-full border border-mars/40 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <span className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{rover.year}</span>
            </span>
          </motion.div>
          <motion.div 
            className={cn(
              "text-sm font-medium transition-opacity duration-300",
              isActive ? "text-white" : "text-white/40"
            )}
            animate={{ opacity: isActive ? 1 : 0.4 }}
          >
            Gen {index + 1}
          </motion.div>
        </motion.div>

        {/* Enhanced Rover Visual */}
        <motion.div 
          className="relative h-48 mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-mars/20 to-cosmic/20 border border-white/10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, delay: 0.3 + index * 0.05 }}
        >
          {/* Animated tech grid */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 12px)`,
            }}
          />

          {/* Rover Icon with enhanced interaction */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: isActive ? 1.15 : 1,
                rotate: isActive ? [0, 5, -5, 0] : 0,
              }}
              transition={{ 
                duration: isActive ? 2 : 0.3,
                repeat: isActive ? Infinity : 0
              }}
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              <Rocket className="w-16 h-16 text-white/80" />
            </motion.div>
          </div>

          {/* Animated glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-mars/10 to-cosmic/10 rounded-xl"
            animate={{
              opacity: isActive ? [0.3, 0.6, 0.3] : 0,
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Title with staggered animation */}
        <motion.h3 
          className="text-xl font-bold mb-3 font-orbitron text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
        >
          {rover.title}
        </motion.h3>

        {/* Description with smooth reveal */}
        <motion.p 
          className="text-white/70 text-sm mb-4 line-clamp-3"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
        >
          {rover.description}
        </motion.p>

        {/* Achievement Count with micro-interactions */}
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
        >
          <motion.div 
            className="flex items-center space-x-2 text-cosmic"
            whileHover={{ x: 3 }}
          >
            <Award className="w-4 h-4" />
            <span className="text-sm font-medium">{rover.achievements.length} Achievements</span>
          </motion.div>
          <motion.div
            className="text-white/40 group-hover:text-white/80 transition-colors duration-300"
            whileHover={{ x: 5, scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced hover effect */}
      <motion.div 
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-mars/5 to-cosmic/5 pointer-events-none"
        )}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// Enhanced Rover Detail Panel
const RoverDetailPanel = ({ rover, index }) => {
  const panelRef = useRef(null);
  const isInView = useInView(panelRef, { 
    once: false, 
    margin: "-10% 0px -10% 0px",
    amount: 0.3
  });

  const panelVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 40, 
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 1.02,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  }), []);

  if (!rover) return null;

  return (
    <motion.div
      ref={panelRef}
      className="bg-gradient-to-br from-space-dark/90 to-space/90 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-xl"
      variants={panelVariants}
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
    >
      {/* Header with enhanced animations */}
      <motion.div 
        className="flex items-center justify-between mb-8"
        variants={itemVariants}
      >
        <div>
          <motion.h2 
            className="text-4xl font-bold text-white mb-2 font-orbitron"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {rover.title}
          </motion.h2>
          <motion.div 
            className="flex items-center space-x-3 text-cosmic"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-lg font-medium">{rover.year}</span>
            <span className="text-white/40">•</span>
            <span className="text-white/60">Generation {index + 1}</span>
          </motion.div>
        </div>
        <motion.div
          className="w-20 h-20 bg-gradient-to-r from-mars to-cosmic rounded-2xl flex items-center justify-center"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={isInView ? { 
            opacity: 1, 
            scale: 1, 
            rotate: 0 
          } : { 
            opacity: 0, 
            scale: 0, 
            rotate: -180 
          }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
          whileHover={{ scale: 1.1, rotate: 10 }}
        >
          <Rocket className="w-10 h-10 text-white" />
        </motion.div>
      </motion.div>

      {/* Description */}
      <motion.div 
        className="mb-8"
        variants={itemVariants}
      >
        <motion.p 
          className="text-white/80 text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {rover.description}
        </motion.p>
      </motion.div>

      {/* Achievements */}
      <motion.div variants={itemVariants}>
        <motion.h3 
          className="text-2xl font-bold text-white mb-6 font-orbitron flex items-center space-x-3"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Award className="w-6 h-6 text-cosmic" />
          <span>Key Achievements</span>
        </motion.h3>
        
        <div className="grid gap-4">
          {rover.achievements.map((achievement, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-r from-mars/10 to-cosmic/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-mars/30 transition-all duration-300 group"
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={isInView ? { 
                opacity: 1, 
                x: 0, 
                scale: 1 
              } : { 
                opacity: 0, 
                x: -20, 
                scale: 0.95 
              }}
              transition={{ 
                duration: 0.5, 
                delay: 0.6 + i * 0.1,
                type: "spring",
                stiffness: 150
              }}
              whileHover={{ x: 5, scale: 1.02 }}
            >
              <div className="flex items-start space-x-4">
                <motion.div 
                  className="p-2 bg-gradient-to-r from-cosmic/20 to-blue-500/20 rounded-lg flex-shrink-0 mt-1"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Star className="w-4 h-4 text-cosmic" />
                </motion.div>
                <p className="text-white/80 group-hover:text-white transition-colors duration-300">
                  {achievement}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const RoverPage = () => {
  const [activeRover, setActiveRover] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroInView = useInView(heroRef, { 
    once: false, 
    margin: "-10% 0px -10% 0px",
    amount: 0.3
  });

  // Optimized transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // Memoized data
  const rovers = useMemo(() => [
    {
      year: "2015",
      title: "Akrula 1.0",
      description: "Akrula 1.0 was the first-ever prototype developed by the IITB Mars Rover Team, launched in 2015. Equipped with advanced sensors, powerful computing systems, and robust mobility features, Akrula 1.0 was designed to navigate the harsh terrains of Mars with ease.",
      achievements: [
        "Enhanced suspension system for improved terrain handling",
        "Implemented first-generation robotic arm with 3 degrees of freedom",
        "Ranked in top 10 at IRC 2019"
      ]
    },
    {
      year: "2016",
      title: "Agathsya 1.0",
      description: "Agathsya 1.0, the second Mars rover prototype by the IITB Mars Rover Team, was built in 2016. It features advanced navigational systems, data-gathering cameras, and a powerful AI capable of real-time object detection and data analysis.",
      achievements: [
        "Enhanced suspension system for improved terrain handling",
        "Implemented first-generation robotic arm with 3 degrees of freedom",
        "Ranked in top 10 at IRC 2019"
      ]
    },
    {
      year: "2017",
      title: "Agathsya 2.0",
      description: "Agathsya 2.0, the third Mars rover prototype developed in 2017, pushed the boundaries of exploration on the Red Planet. With advanced camera and sensor technology, it could explore farther and faster than its predecessors.",
      achievements: [
        "Developed custom PCBs for improved system integration",
        "Implemented basic autonomous navigation features",
        "Enhanced robotic arm with 5 degrees of freedom and precision grippers"
      ]
    },
    {
      year: "2018",
      title: "Hemant 1.0",
      description: "Hemant 1.0, the fourth Mars rover prototype built in 2018, combined cutting-edge AI with an innovative design, enabling it to navigate even the harshest Martian terrain",
      achievements: [
        "Designed and implemented a rocker-bogie suspension system",
        "Advanced computer vision system for obstacle detection",
        "Qualified for University Rover Challenge for the first time"
      ]
    },
    {
      year: "2019-20",
      title: "Agruni 1.0",
      description: "Agruni 1.0, the fifth Mars rover prototype developed by the IITB Mars Rover Team, also proudly represented India at the University Rover Challenge.",
      achievements: [
        "Integrated soil analysis and life detection capabilities",
        "Implemented neural network-based terrain classification",
        "Secured Excellence Award at ERC 2022 in Navigation Task"
      ]
    },
    {
      year: "2020-21",
      title: "Yash",
      description: "Yash is equipped with LiDAR and autonomous mapping capabilities, enabling it to navigate complex obstacle courses by autonomously following directional arrows.",
      achievements: [
        "Advanced autonomous navigation with SLAM and path planning",
        "High-precision sample collection and analysis system",
        "Secured top Indian team position at URC 2023"
      ]
    },
    {
      year: "2022-23",
      title: "Tezant",
      description: "Tezant, the eighth Mars rover prototype developed in 2022-23, features a new 6-DOF robotic arm with full 360° base rotation for enhanced versatility.",
      achievements: [
        "Integrated soil analysis and life detection capabilities",
        "Implemented neural network-based terrain classification",
        "Secured Excellence Award at ERC 2022 in Navigation Task"
      ]
    },
    {
      year: "2024",
      title: "Amaran",
      description: "Amaran is the ninth-generation Mars rover prototype developed by the IITB Mars Rover Team in 2024. Featuring a modular design with rugged all-terrain mobility, it combines precise robotic manipulation with advanced vision-based navigation for autonomous operation in challenging environments.",
      achievements: [
        "Integrated soil analysis and life detection capabilities",
        "Implemented neural network-based terrain classification",
        "Secured Excellence Award at ERC 2022 in Navigation Task"
      ]
    }
  ], []);

  const timelineEvents = useMemo(() => [
    {
      date: "September 2012",
      title: "MRT Foundation",
      description: "The IITB Mars Rover Team was established in 2012, and since then, the team has been excelling and achieving milestones in the field of interplanetary exploration.",
      image: "/lovable-uploads/33691edf-a52b-4cda-b3c4-bda5c7ee3051.png"
    },
    {
      date: "May 2015",
      title: "Arjuna 1.0",
      description: "Arjuna 1.0 was the first prototype ever created by IITB MRT, completed in May 2015.",
      image: "https://via.placeholder.com/600x400?text=Arjuna+1.0"
    },
    {
      date: "June 2016",
      title: "Arjuna 1.5",
      description: "The second Mars rover prototype, Arjuna 1.5, was built in 2016.",
      image: "https://via.placeholder.com/600x400?text=Arjuna+1.5"
    },
    {
      date: "April 2017",
      title: "Arjuna 2.0",
      description: "Arjuna 2.0, the third version of the Mars rovers created in 2017, is revolutionizing our understanding of the Red Planet.",
      image: "https://via.placeholder.com/600x400?text=Arjuna+2.0"
    }
  ], []);

  // Optimized rover cycling with useCallback
  const handleRoverChange = useCallback((index) => {
    setActiveRover(index);
  }, []);

  // Auto-cycle through rovers (optimized)
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveRover((prev) => (prev + 1) % rovers.length);
    }, 12000); // Slower cycling for better UX
    return () => clearInterval(timer);
  }, [rovers.length]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollIndicator(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced animation variants
  const heroVariants = useMemo(() => ({
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
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 1.05,
      transition: {
        duration: 0.6,
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
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-dark via-space to-space-dark">
      
      {/* Enhanced Hero Section */}
      <section 
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Optimized Background Effects */}
        <motion.div
          className="absolute inset-0"
          style={{ y: backgroundY, opacity, scale }}
        >
          <div className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-l from-mars/15 to-orange-500/8 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-gradient-to-r from-cosmic/15 to-blue-500/8 rounded-full blur-3xl opacity-60" />
        </motion.div>

        {/* Optimized grid background */}
        <div className="absolute inset-0 opacity-5">
          <motion.div 
            className="absolute inset-0" 
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }} 
          />
        </div>

        {/* Optimized floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                y: [0, -40, 0],
                opacity: [0.1, 0.4, 0.1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                delay: i * 3,
                ease: "easeInOut",
              }}
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
            >
              <Rocket className="w-4 h-4 text-white/20" />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          {/* Main Title with scroll-based animations */}
          <motion.div
            className="mb-12"
            variants={heroVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "exit"}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6 font-orbitron relative"
              variants={itemVariants}
            >
              <span className="bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent">
                Our Rovers
              </span>
              <motion.div
                className=""
                initial={{ width: 0, opacity: 0 }}
                animate={heroInView ? { 
                  width: "60%", 
                  opacity: 1 
                } : { 
                  width: 0, 
                  opacity: 0 
                }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Journey through a decade of innovation, from our first prototype to cutting-edge 
              competition-ready designs that push the boundaries of planetary exploration.
            </motion.p>
          </motion.div>

          {/* Enhanced Stats Section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            variants={itemVariants}
          >
            <StatCard icon={Rocket} number="9" label="Rover Generations" delay={0} />
            <StatCard icon={Award} number="12" label="Competition Wins" delay={100} />
            <StatCard icon={Target} number="25" label="Mission Success" delay={200} />
            <StatCard icon={TrendingUp} number="8" label="Years of Innovation" delay={300} />
          </motion.div>

          {/* Enhanced Scroll Indicator */}
          {showScrollIndicator && (
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              transition={{ duration: 2.5, repeat: Infinity }}
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
            >
              <motion.div 
                className="flex flex-col items-center space-y-2"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-white/60 text-sm">Explore Our Journey</span>
                <ChevronDown className="w-6 h-6 text-mars" />
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Enhanced Rovers Grid Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, margin: "-10%" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-orbitron">
              <span className="bg-gradient-to-r from-mars to-cosmic bg-clip-text text-transparent">
                Evolution Timeline
              </span>
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Each generation represents a leap forward in technology, design, and capability.
            </p>
          </motion.div>

          {/* Rovers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {rovers.map((rover, index) => (
              <RoverCard
                key={index}
                rover={rover}
                index={index}
                isActive={activeRover === index}
                onClick={() => handleRoverChange(index)}
              />
            ))}
          </div>

          {/* Active Rover Detail */}
          <RoverDetailPanel rover={rovers[activeRover]} index={activeRover} />
        </div>
      </section>

      {/* Enhanced Innovation Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            className="bg-gradient-to-br from-space-dark/60 to-space/60 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, margin: "-10%" }}
          >
            <motion.div
              className="w-20 h-20 bg-gradient-to-r from-mars to-cosmic rounded-2xl flex items-center justify-center mx-auto mb-8"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Zap className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-4xl font-bold mb-6 font-orbitron text-white">
              The Future of Exploration
            </h2>
            
            <p className="text-white/80 max-w-4xl mx-auto mb-8 text-lg leading-relaxed">
              As we continue to innovate and push the boundaries of what's possible, 
              our next generation of rovers will feature swarm robotics, AI-powered decision making, 
              and advanced materials designed specifically for the harsh conditions of Mars.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-gradient-to-r from-mars via-orange-500 to-cosmic hover:from-mars-dark hover:via-orange-600 hover:to-cosmic-dark text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-lg font-semibold">
                <span className="flex items-center space-x-3">
                  <Rocket className="w-6 h-6" />
                  <span>Join Our Mission</span>
                  <ArrowRight className="w-6 h-6" />
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <RoverTimeline events={timelineEvents} />
      
    </div>
  );
};

export default RoverPage;
