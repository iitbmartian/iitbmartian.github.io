"use client";
import React, { useRef, useState, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Rocket, 
  Cpu, 
  Camera, 
  Zap, 
  ArrowRight, 
  Github, 
  ExternalLink,
  Calendar,
  Users,
  Award,
  Star,
  Target,
  Settings,
  Code
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {useRouter} from 'next/navigation'

// Enhanced ProjectCard Component
const ProjectCard = ({ project, index }) => {
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
      className="relative group perspective-1000"
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
      <motion.div
        className="relative bg-gradient-to-br from-space-light/30 to-space-light/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 h-full hover:border-white/30 transition-all duration-300"
      >
        {/* Enhanced Background Gradient Effect */}
        <motion.div
          className={`absolute inset-0 ${project.gradient}`}
          animate={{ 
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Enhanced Project Image */}
        <motion.div
          className="relative h-48 overflow-hidden"
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-mars/30 to-cosmic/30 opacity-60" />
          
          {/* Animated tech pattern */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(255,255,255,0.1) 15px, rgba(255,255,255,0.1) 30px)`,
            }}
          />
          
          <div className="relative z-10 h-full flex items-center justify-center">
            <motion.div
              animate={{
                scale: isHovered ? 1.2 : 1,
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                scale: { duration: 0.3 },
                rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <project.icon className="w-16 h-16 text-white/90" />
            </motion.div>
          </div>

          {/* Enhanced Status Badge */}
          <motion.div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-white/20 ${project.statusBg}`}
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
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            {project.status}
          </motion.div>

          {/* Progress indicator */}
          <motion.div
            className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-cosmic/80 to-blue-500/80 rounded-full backdrop-blur-sm border border-white/20"
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
              delay: 0.2 + index * 0.05
            }}
          >
            <span className="text-xs text-white font-medium">#{index + 1}</span>
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

        {/* Enhanced Content */}
        <motion.div 
          className="p-6 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
        >
          <motion.h3 
            className="text-xl font-bold text-white mb-3 font-orbitron group-hover:text-mars transition-colors duration-300 relative"
          >
            {project.title}

          </motion.h3>
          
          <motion.p 
            className="text-white/70 mb-4 leading-relaxed text-sm group-hover:text-white/85 transition-colors duration-300"
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1 }}
          >
            {project.description}
          </motion.p>

          {/* Enhanced Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, i) => (
              <motion.span
                key={i}
                className="px-2 py-1 bg-gradient-to-r from-cosmic/20 to-blue-500/20 rounded-lg text-xs text-cosmic border border-cosmic/30 hover:bg-cosmic/10 transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={isInView ? { 
                  opacity: 1, 
                  scale: 1, 
                  x: 0 
                } : { 
                  opacity: 0, 
                  scale: 0.8, 
                  x: -10 
                }}
                transition={{ 
                  delay: 0.6 + i * 0.05, 
                  duration: 0.3,
                  type: "spring",
                  stiffness: 150
                }}
                whileHover={{ scale: 1.08, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Enhanced Project Stats */}
          <motion.div 
            className="flex items-center justify-between mb-4 text-sm text-white/60"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.7 + index * 0.05 }}
          >
            <motion.div 
              className="flex items-center space-x-1"
              whileHover={{ scale: 1.05, x: 3 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Calendar className="w-4 h-4" />
              </motion.div>
              <span>{project.duration}</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-1"
              whileHover={{ scale: 1.05, x: -3 }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Users className="w-4 h-4" />
              </motion.div>
              <span>{project.teamSize}</span>
            </motion.div>
          </motion.div>

          {/* Enhanced Action Buttons */}
          <motion.div 
            className="flex space-x-3"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.05 }}
          >
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-white/10 to-white/5 rounded-xl border border-white/20 text-white/80 hover:text-white hover:border-white/30 transition-all duration-300"
              whileHover={{ 
                scale: 1.03, 
                y: -2,
                boxShadow: "0 5px 15px rgba(255, 255, 255, 0.1)"
              }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Github className="w-4 h-4" />
              </motion.div>
              <span className="text-sm">Code</span>
            </motion.a>
            
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-mars to-orange-600 rounded-xl text-white hover:from-mars-dark hover:to-orange-700 transition-all duration-300"
              whileHover={{ 
                scale: 1.03, 
                y: -2,
                boxShadow: "0 5px 15px rgba(255, 107, 53, 0.3)"
              }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.div>
              <span className="text-sm">Live</span>
            </motion.a>
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
    </motion.div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const projectsRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Enhanced useInView for different sections
  const headerInView = useInView(headerRef, { 
    once: false, 
    margin: "-10% 0px -10% 0px",
    amount: 0.3
  });

  const projectsInView = useInView(projectsRef, { 
    once: false, 
    margin: "-15% 0px -15% 0px",
    amount: 0.2
  });

  const ctaInView = useInView(ctaRef, { 
    once: false, 
    margin: "-15% 0px -15% 0px",
    amount: 0.3
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const router = useRouter()

  // Optimized transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.8, 0.3]);

  // Memoized projects data
  const projects = useMemo(() => [
    {
      title: "Autonomous Navigation System",
      description: "Advanced AI-powered navigation system capable of real-time obstacle detection and path optimization for Mars terrain exploration.",
      icon: Rocket,
      status: "Completed",
      statusBg: "bg-green-500/80 text-white",
      duration: "8 months",
      teamSize: "6 members",
      technologies: ["Python", "OpenCV", "ROS", "Machine Learning"],
      gradient: "bg-gradient-to-br from-blue-500/20 to-cyan-500/10",
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      title: "Rover Communication Hub",
      description: "Long-range communication system with data compression and real-time telemetry for reliable Mars-Earth communication.",
      icon: Cpu,
      status: "In Progress",
      statusBg: "bg-yellow-500/80 text-white",
      duration: "6 months",
      teamSize: "4 members",
      technologies: ["C++", "RF Systems", "Protocol Design", "Embedded"],
      gradient: "bg-gradient-to-br from-green-500/20 to-emerald-500/10",
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      title: "Environmental Analysis Module",
      description: "Multi-sensor array for atmospheric monitoring, soil analysis, and environmental data collection on Mars surface.",
      icon: Camera,
      status: "Testing",
      Bg: "bg-blue-500/80 text-white",
      duration: "4 months",
      teamSize: "5 members",
      technologies: ["IoT", "Sensors", "Data Analytics", "Python"],
      gradient: "bg-gradient-to-br from-purple-500/20 to-indigo-500/10",
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      title: "Power Management System",
      description: "Intelligent power distribution and battery optimization system for extended mission operations in harsh conditions.",
      icon: Zap,
      status: "Planning",
      statusBg: "bg-purple-500/80 text-white",
      duration: "TBD",
      teamSize: "3 members",
      technologies: ["Electronics", "Battery Tech", "Solar", "Optimization"],
      gradient: "bg-gradient-to-br from-yellow-500/20 to-amber-500/10",
      githubUrl: "#",
      liveUrl: "#"
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
        ease: "easeOut"
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
          className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-gradient-to-r from-mars/10 to-orange-500/5 rounded-full blur-3xl"
          style={{ 
            y: backgroundY,
            opacity: orbOpacity
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-r from-cosmic/10 to-blue-500/5 rounded-full blur-3xl"
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
              <Code className="w-3 h-3 text-white/20" />
            ) : i % 4 === 2 ? (
              <Settings className="w-4 h-4 text-white/20" />
            ) : (
              <Target className="w-3 h-3 text-white/20" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Header */}
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
            <span id='projects' className="bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent">
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
            className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            Discover our innovative rover technologies and systems currently revolutionizing 
            space exploration and autonomous robotics
          </motion.p>


        </motion.div>

        {/* Enhanced Projects Grid */}
        <motion.div 
          ref={projectsRef}
          className="grid md:grid-cols-2 gap-8 mb-16"
          
        >
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              index={index}
              
            />
          ))}
        </motion.div>

        {/* Enhanced View All Projects CTA */}
        <motion.div
          ref={ctaRef}
          className="text-center"
          variants={sectionVariants}
          initial="hidden"
          animate={ctaInView ? "visible" : "exit"}
          transition={{duration:0.7}}
          
        >
          <div
          >
            <Button onClick={()=>{router.push("#projects")}}   className="bg-gradient-to-r from-cosmic via-blue-500 to-blue-600 hover:from-cosmic-dark hover:via-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg">
              <span className="flex items-center space-x-3">
                <span>View All Projects</span>
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
