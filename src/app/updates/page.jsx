'use client';
import React, { useRef, useState, useMemo } from 'react';
import { Calendar, Newspaper, ExternalLink, Star, Clock, TrendingUp } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

const UpdateCard = ({ title, date, image, content, link, index, category, priority }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  // Optimized useInView with better settings
  const isInView = useInView(cardRef, { 
    once: false, // Allow re-triggering
    margin: "-20% 0px -20% 0px", // Better visibility detection
    amount: 0.3 // Trigger when 30% visible
  });

  // Memoize priority colors to avoid recalculation
  const priorityColors = useMemo(() => ({
    high: {
      gradient: "from-mars/60 to-orange-600/40",
      border: "border-mars/30",
      badge: "from-mars/80 to-orange-500/80"
    },
    medium: {
      gradient: "from-cosmic/60 to-blue-500/40",
      border: "border-cosmic/30", 
      badge: "from-cosmic/80 to-blue-500/80"
    },
    low: {
      gradient: "from-purple-500/60 to-indigo-500/40",
      border: "border-purple-500/30",
      badge: "from-purple-500/80 to-indigo-500/80"
    }
  }), []);

  // Enhanced animation variants for scroll-based animations
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      scale: 0.9,
      rotateX: 15
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing
      }
    },
    exit: {
      opacity: 0,
      y: -40,
      scale: 0.95,
      rotateX: -10,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group overflow-hidden perspective-1000"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "exit"}

      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={`bg-gradient-to-br from-space-light/30 to-space-light/10 rounded-2xl overflow-hidden border ${priorityColors[priority].border} backdrop-blur-sm relative h-full hover:border-white/30 transition-all duration-300`}
        style={{
          transformStyle: "preserve-3d"
        }}
      >
        {/* Optimized Background Gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${priorityColors[priority].gradient}`}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isHovered ? 0.15 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Image Container with better performance */}
        {image && (
          <div className="relative h-48 overflow-hidden">
            <motion.div
              className={`w-full h-full bg-gradient-to-br ${priorityColors[priority].gradient} opacity-80 relative overflow-hidden`}
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Optimized pattern with CSS instead of complex animations */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(255,255,255,0.1) 15px, rgba(255,255,255,0.1) 30px)`,
                }}
              />

              {/* News Icon */}
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{
                  rotate: isHovered ? 5 : 0,
                  scale: isHovered ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                <Newspaper className="w-16 h-16 text-white/90" />
              </motion.div>
            </motion.div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-space/90 via-space/30 to-transparent" />
            
            {/* Priority Badge with better animation */}
            <motion.div
              className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r ${priorityColors[priority].badge} backdrop-blur-sm`}
              initial={{ scale: 0, opacity: 0, x: 20 }}
              animate={isInView ? { 
                scale: 1, 
                opacity: 1, 
                x: 0 
              } : { 
                scale: 0, 
                opacity: 0, 
                x: 20 
              }}
              transition={{ 
                duration: 0.5, 
                delay: 0.2 + index * 0.05,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
              <span className="text-xs text-white font-medium capitalize">{priority}</span>
            </motion.div>

            {/* Category Badge with staggered animation */}
            <motion.div
              className="absolute top-4 left-4 px-3 py-1 rounded-full bg-space-dark/80 backdrop-blur-sm border border-white/20"
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
                delay: 0.3 + index * 0.05,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
              <span className="text-xs text-white/90 font-medium">{category}</span>
            </motion.div>
          </div>
        )}

        {/* Content Section with staggered animations */}
        <motion.div 
          className="p-6 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
        >
          {/* Date with micro-interaction */}
          <motion.div 
            className="flex items-center mb-4 group/date"
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="p-1 bg-gradient-to-r from-cosmic/20 to-blue-500/20 rounded-full mr-3"
              transition={{ duration: 0.5 }}
            >
              <Calendar className="h-4 w-4 text-cosmic" />
            </motion.div>
            <span className="text-white/70 text-sm group-hover/date:text-white/90 transition-colors duration-300">
              {date}
            </span>
          </motion.div>

          {/* Title with enhanced animation */}
          <motion.h3
            className="text-xl font-bold mb-4 font-orbitron relative leading-tight text-white group-hover:text-cosmic transition-colors duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
          >
            {title}
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-mars to-cosmic rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: isHovered ? "100%" : "0%",
                opacity: isHovered ? 1 : 0
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </motion.h3>

          {/* Content */}
          <motion.p 
            className="text-white/80 mb-6 leading-relaxed group-hover:text-white/90 transition-colors duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
          >
            {content}
          </motion.p>

          {/* Link with enhanced hover effect */}
          {link && (
            <motion.a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cosmic hover:text-cyan-300 flex items-center space-x-2 group/link transition-colors duration-300"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Newspaper className="h-4 w-4" />
              <span className="font-medium">Read full article</span>
              <motion.div
                animate={{ x: isHovered ? 3 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ExternalLink className="h-3 w-3" />
              </motion.div>
            </motion.a>
          )}
        </motion.div>

        {/* Reading Time Indicator */}
        <motion.div
          className="absolute bottom-4 right-4 flex items-center space-x-1 text-xs text-white/50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8
          }}
          transition={{ duration: 0.3 }}
        >
          <Clock className="w-3 h-3" />
          <span>2 min read</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const UpdatesPage = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  
  // Optimized scroll tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const headerInView = useInView(headerRef, { 
    once: false, 
    margin: "-10% 0px -10% 0px",
    amount: 0.3
  });

  // Optimized transforms with reduced complexity
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.8, 0.3]);

  // Memoize updates data
  const updates = useMemo(() => [
    {
      title: "MRT secures top Indian team position at URC 2023",
      date: "June 15, 2023",
      image: "https://via.placeholder.com/600x400?text=URC+2023",
      content: "The Mars Rover Team from IIT Bombay secured the first position among all Indian teams at the University Rover Challenge 2023 held in Utah, USA.",
      link: "#",
      category: "Competition",
      priority: "high" 
    },
    {
      title: "New rover prototype unveiled at tech exhibition",
      date: "April 10, 2023", 
      image: "https://via.placeholder.com/600x400?text=New+Prototype",
      content: "MRT unveiled its latest rover prototype at the annual technology exhibition at IIT Bombay, showcasing advanced autonomous navigation capabilities.",
      link: "#",
      category: "Technology",
      priority: "medium" 
    },
    {
      title: "Team secures sponsorship from major tech company",
      date: "March 5, 2023",
      image: "https://via.placeholder.com/600x400?text=Sponsorship",
      content: "The Mars Rover Team has secured a major sponsorship that will help fund the development of next-generation rover systems and competition travel.",
      link: "#",
      category: "Partnership",
      priority: "high" 
    },
    {
      title: "MRT conducts workshop on robotics for high school students",
      date: "February 20, 2023",
      image: "https://via.placeholder.com/600x400?text=Workshop",
      content: "Team members conducted a hands-on workshop introducing high school students to fundamentals of robotics and space exploration technology.",
      link: "#",
      category: "Outreach",
      priority: "low" 
    },
    {
      title: "Excellence Award in Autonomous category at IRC 2023",
      date: "January 12, 2023",
      image: "https://via.placeholder.com/600x400?text=IRC+2023",
      content: "The team's hard work paid off with an Excellence Award in the Autonomous category at the International Rover Challenge 2023.",
      link: "#",
      category: "Achievement", 
      priority: "high" 
    },
    {
      title: "New team members onboarded for the 2023 season",
      date: "December 5, 2022",
      image: "https://via.placeholder.com/600x400?text=New+Members",
      content: "After a rigorous selection process, MRT welcomed 15 new members across various subsystems to strengthen the team for upcoming challenges.",
      link: "#",
      category: "Team",
      priority: "medium" 
    }
  ], []);

  // Optimized header animation variants
  const headerVariants = {
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
  };

  const itemVariants = {
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-dark via-space to-space-dark">
      <section 
        ref={sectionRef}
        className="pt-32 pb-24 relative overflow-hidden"
      >
        {/* Optimized Background Effects */}
        <div className="absolute inset-0">
          {/* Simplified gradient orbs with better performance */}
          <motion.div
            className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-l from-mars/10 to-orange-500/5 rounded-full blur-3xl"
            style={{ 
              y: backgroundY,
              opacity: orbOpacity
            }}
          />
          
          <motion.div
            className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-gradient-to-r from-cosmic/10 to-blue-500/5 rounded-full blur-3xl"
            style={{ 
              y: backgroundY,
              opacity: orbOpacity
            }}
          />

          {/* Optimized floating elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.1, 0.4, 0.1],
                }}
                transition={{
                  duration: 10 + i * 3,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
              >
                <TrendingUp className="w-4 h-4 text-white/20" />
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Header Section with scroll-based animations */}
          <motion.div
            ref={headerRef}
            className="text-center mb-16"
            variants={headerVariants}
            initial="hidden"
            animate={headerInView ? "visible" : "exit"}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold font-orbitron bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent relative mb-6"
              variants={itemVariants}
            >
              Updates & Media
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed flex items-center justify-center space-x-3"
              variants={itemVariants}
            >
              <span>Stay up to date with the latest news, achievements, and events from our team</span>
            </motion.p>

          </motion.div>
          
          {/* Updates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {updates.map((update, index) => (
              <UpdateCard 
                key={index} 
                {...update} 
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpdatesPage;
