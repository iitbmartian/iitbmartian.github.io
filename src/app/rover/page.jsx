'use client';
import React, { useRef, useState, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
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
  TrendingUp,
  X
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import RoverTimeline from '@/components/rover/RoverTimeline';
import { cn } from '@/lib/utils';

// Optimized Stats Component with mobile-first responsive design
const StatCard = ({ icon: Icon, number, label, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false, 
    margin: "-20% 0px -20% 0px",
    amount: 0.5
  });
  const [hoverScale, setHoverScale] = useState(1.02);

  React.useEffect(() => {
    setHoverScale(window.innerWidth >= 768 ? 1.05 : 1.02);
  }, []);

  const cardVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 30, // Reduced for mobile
      scale: 0.85,
      rotateY: -10 // Reduced rotation for mobile
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.5, // Faster for mobile
        delay: delay / 1000,
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      y: -15,
      scale: 0.95,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }), [delay]);

  React.useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        let start = 0;
        const end = parseInt(number);
        const duration = 1000; // Faster animation
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
      setCount(0);
    }
  }, [isInView, number, delay]);

  return (
    <motion.div
      ref={ref}
      className="bg-gradient-to-br from-space-dark/80 to-space/80 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 hover:border-mars/40 transition-all duration-300 group perspective-1000"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "exit"}

      whileTap={{ scale: 0.97 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div 
        className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-mars to-cosmic rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300"
        transition={{ duration: 0.6 }}
      >
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
      </motion.div>
      
      <motion.div 
        className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2 font-orbitron"
        animate={{ scale: isInView ? 1 : 0.8 }}
        transition={{ duration: 0.3, delay: (delay / 1000) + 0.2 }}
      >
        {count}+
      </motion.div>
      
      <p className="text-white/70 text-xs sm:text-sm group-hover:text-white/90 transition-colors duration-300 leading-tight">
        {label}
      </p>
    </motion.div>
  );
};

// Enhanced Rover Card Component with full mobile responsiveness
const RoverCard = ({ rover, index, onClick }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { 
    once: false, 
    margin: "-15% 0px -15% 0px",
    amount: 0.3
  });

  const cardVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 40, // Reduced for mobile
      scale: 0.95,
      rotateX: 15 // Reduced rotation
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.5, // Faster for mobile
        delay: index * 0.06, // Reduced delay
        type: "spring",
        stiffness: 140,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.98,
      rotateX: -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }), [index]);
  
  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden rounded-xl sm:rounded-2xl border bg-gradient-to-br from-space-dark/60 to-space/60 border-white/10 hover:border-mars/30 transition-all duration-300 cursor-pointer group perspective-1000"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      onClick={onClick}

      whileTap={{ scale: 0.98 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Background pattern - simplified for mobile */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
               backgroundSize: '15px 15px' // Smaller pattern for mobile
             }} 
        />
      </motion.div>

      <div className="relative p-4 sm:p-5 lg:p-6 backdrop-blur-sm">
        {/* Year Badge - responsive sizing */}
        <motion.div 
          className="flex items-center justify-between mb-3 sm:mb-4"
          initial={{ opacity: 0, x: -15 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
          transition={{ duration: 0.4, delay: 0.1 + index * 0.03 }}
        >
          <motion.div 
            className="bg-gradient-to-r from-mars/30 to-cosmic/30 text-white text-xs sm:text-sm font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-full border border-mars/40 backdrop-blur-sm"
          >
            <span className="flex items-center space-x-1.5 sm:space-x-2">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{rover.year}</span>
            </span>
          </motion.div>
          <motion.div 
            className="text-xs sm:text-sm font-medium text-white/90 transition-opacity duration-300"
            animate={{ opacity: 0.8 }}
          >
            Gen {index + 1}
          </motion.div>
        </motion.div>

        {/* Rover Visual - responsive height */}
        <motion.div 
          className="relative h-32 sm:h-40 lg:h-48 mb-4 sm:mb-5 lg:mb-6 rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-mars/20 to-cosmic/20 border border-white/10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.03 }}
        >
          {/* Simplified animated tech grid for mobile */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.1) 8px, rgba(255,255,255,0.1) 10px)`,
            }}
          />

          {/* Rover Icon - responsive sizing */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{ 
                duration: 0.3,
              }}
            >
              <Rocket className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white/80" />
            </motion.div>
          </div>

          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-mars/10 to-cosmic/10 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-30"
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Title - responsive font sizes */}
        <motion.h3 
          className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 font-orbitron text-white leading-tight"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.4, delay: 0.3 + index * 0.03 }}
        >
          {rover.title}
        </motion.h3>

        {/* Description - responsive line clamping */}
        <motion.p 
          className="text-white/70 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 leading-relaxed"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.4, delay: 0.4 + index * 0.03 }}
        >
          {rover.description}
        </motion.p>

        {/* Click indicator - responsive */}
        <motion.div 
          className="flex items-center justify-center py-1.5 sm:py-2 text-mars text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span className="flex items-center space-x-1.5 sm:space-x-2">
            <span>Click to explore</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </span>
        </motion.div>
      </div>

      {/* Hover effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-mars/5 to-cosmic/5 pointer-events-none opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// Enhanced Modal with mobile-first responsive design
const RoverDetailModal = ({ rover, index, isOpen, onClose }) => {
  const modalRef = useRef(null);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.85,
      y: 30
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.85,
      y: 30,
      transition: {
        duration: 0.25,
        ease: "easeInOut"
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  if (!rover) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-start sm:items-center justify-center p-2 sm:p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          >
            {/* Modal Content - Full responsive */}
            <motion.div
              ref={modalRef}
              className="mt-14  lg:mt-12 bg-gradient-to-br from-space-dark/95 to-space/95 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl w-full max-w-xs sm:max-w-2xl lg:max-w-4xl max-h-[95vh] sm:max-h-[85vh] lg:max-h-[85vh] overflow-y-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - responsive positioning */}
              <motion.button
                className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-mars/20 to-cosmic/20 border border-white/20 rounded-full flex items-center justify-center hover:border-mars/40 transition-colors duration-300 z-10"
                onClick={onClose}
                whileTap={{ scale: 0.92 }}
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </motion.button>

              {/* Header - full responsive layout */}
              <motion.div 
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 pr-10 sm:pr-12"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="mb-4 sm:mb-0">
                  <motion.h2 
                    className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 font-orbitron leading-tight"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {rover.title}
                  </motion.h2>
                  <motion.div 
                    className="flex flex-wrap items-center gap-2 sm:gap-3 text-cosmic"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-base sm:text-lg font-medium">{rover.year}</span>
                    <span className="text-white/40 hidden sm:inline">•</span>
                    <span className="text-white/60 text-sm sm:text-base">Generation {index + 1}</span>
                  </motion.div>
                </div>
                <motion.div
                  className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-mars to-cosmic rounded-xl sm:rounded-2xl flex items-center justify-center self-start sm:self-auto"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
                >
                  <Rocket className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
                </motion.div>
              </motion.div>

              {/* Description - responsive text */}
              <motion.div 
                className="mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.p 
                  className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {rover.description}
                </motion.p>
              </motion.div>

              {/* Achievements - responsive grid */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <motion.h3 
                  className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 font-orbitron flex items-center space-x-2 sm:space-x-3"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-cosmic" />
                  <span>Key Achievements</span>
                </motion.h3>
                
                <div className="space-y-3 sm:space-y-4">
                  {rover.achievements.map((achievement, i) => (
                    <motion.div
                      key={i}
                      className="bg-gradient-to-r from-mars/10 to-cosmic/10 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-mars/30 transition-all duration-300 group"
                      initial={{ opacity: 0, x: -15, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 0.9 + i * 0.08,
                        type: "spring",
                        stiffness: 150
                      }}
                    >
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <motion.div 
                          className="p-1.5 sm:p-2 bg-gradient-to-r from-cosmic/20 to-blue-500/20 rounded-md sm:rounded-lg flex-shrink-0 mt-0.5 sm:mt-1"
                          transition={{ duration: 0.4 }}
                        >
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-cosmic" />
                        </motion.div>
                        <p className="text-white/80 group-hover:text-white transition-colors duration-300 text-sm sm:text-base leading-relaxed">
                          {achievement}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const RoverPage = () => {
  const [selectedRover, setSelectedRover] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // Responsive transforms - reduced motion on mobile
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]); // Reduced
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.98]); // Minimal scale

  // Rover data (same as before)
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
      description: "Agathsya 1.0, the second Mars rover prototype by the IITB Mars Rover Team, was built in 0. It features advanced navigational systems, data-gathering cameras, and a powerful AI capable of real-time object detection and data analysis.",
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

  const handleRoverClick = useCallback((rover, index) => {
    setSelectedRover({ ...rover, index });
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedRover(null), 300);
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollIndicator(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  // Mobile-optimized animation variants
  const heroVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 30, // Reduced for mobile
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8, // Faster for mobile
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.15,
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
    hidden: { y: 20, opacity: 0, scale: 0.95 }, // Reduced movement
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6, // Faster
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    }
  }), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-dark via-space to-space-dark">
      
      {/* Enhanced Hero Section - Fully Responsive */}
      <section 
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6"
      >
        {/* Optimized Background Effects - Reduced for mobile */}
        <motion.div
          className="absolute inset-0"
          style={{ y: backgroundY, opacity, scale }}
        >
          <div className="absolute top-1/4 right-0 w-1/2 sm:w-1/3 h-1/3 bg-gradient-to-l from-mars/10 sm:from-mars/15 to-orange-500/5 sm:to-orange-500/8 rounded-full blur-2xl sm:blur-3xl opacity-40 sm:opacity-60" />
          <div className="absolute bottom-1/4 left-0 w-1/2 sm:w-1/3 h-1/3 bg-gradient-to-r from-cosmic/10 sm:from-cosmic/15 to-blue-500/5 sm:to-blue-500/8 rounded-full blur-2xl sm:blur-3xl opacity-40 sm:opacity-60" />
        </motion.div>

        {/* Simplified grid background for mobile */}
        <div className="absolute inset-0 opacity-3 sm:opacity-5">
          <motion.div 
            className="absolute inset-0" 
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '30px 30px' // Smaller grid on mobile
            }} 
          />
        </div>

        {/* Floating elements - fewer on mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(2)].map((_, i) => ( // Reduced from 4 to 2 for mobile
            <motion.div
              key={i}
              className="absolute hidden sm:block" // Hide on mobile
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 12 + i * 2,
                repeat: Infinity,
                delay: i * 2,
                ease: "easeInOut",
              }}
              style={{
                left: `${30 + Math.random() * 40}%`,
                top: `${30 + Math.random() * 40}%`,
              }}
            >
              <Rocket className="w-3 h-3 sm:w-4 sm:h-4 text-white/20" />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
          {/* Main Title - Full responsive */}
          <motion.div
            className="mb-8 sm:mb-10 lg:mb-12"
            variants={heroVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "exit"}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 font-orbitron relative leading-tight"
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
                transition={{ duration: 1.2, delay: 0.6 }}
              />
            </motion.h1>
            
            <motion.p 
              className="text-base sm:text-lg lg:text-xl text-white/80 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2"
              variants={itemVariants}
            >
              Journey through a decade of innovation, from our first prototype to cutting-edge 
              competition-ready designs that push the boundaries of planetary exploration.
            </motion.p>
          </motion.div>

          {/* Stats Section - Responsive grid */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 lg:mb-12"
            variants={itemVariants}
          >
            <StatCard icon={Rocket} number="9" label="Rover Generations" delay={0} />
            <StatCard icon={Award} number="12" label="Competition Wins" delay={100} />
            <StatCard icon={Target} number="25" label="Mission Success" delay={200} />
            <StatCard icon={TrendingUp} number="8" label="Years of Innovation" delay={300} />
          </motion.div>

          {/* Scroll Indicator - Mobile optimized */}
          {showScrollIndicator && (
            <motion.div
              className="absolute bottom-8 sm:top-[100%] lg:top-[110%] left-1/2 transform -translate-x-1/2"
              transition={{ duration: 2.5, repeat: Infinity }}
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
            >
              <motion.div 
                className="flex flex-col items-center space-y-1 sm:space-y-2"
              >
                <span className="text-white/60 text-xs sm:text-sm">Explore Our Journey</span>
                <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-mars" />
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Rovers Grid Section - Fully Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, margin: "-10%" }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 font-orbitron">
              <span className="bg-gradient-to-r from-mars to-cosmic bg-clip-text text-transparent">
                Evolution Timeline
              </span>
            </h2>
            <p className="text-white/70 text-sm sm:text-base lg:text-lg max-w-xs sm:max-w-xl lg:max-w-2xl mx-auto px-4">
              Each generation represents a leap forward in technology, design, and capability. **Click on any rover to explore its details.**
            </p>
          </motion.div>

          {/* Responsive Rovers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {rovers.map((rover, index) => (
              <RoverCard
                key={index}
                rover={rover}
                index={index}
                onClick={() => handleRoverClick(rover, index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Rover Detail Modal */}
      <RoverDetailModal 
        rover={selectedRover}
        index={selectedRover?.index}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />

      
      {/* Timeline Section */}
      <RoverTimeline events={timelineEvents} />
      
    </div>
  );
};

export default RoverPage;
