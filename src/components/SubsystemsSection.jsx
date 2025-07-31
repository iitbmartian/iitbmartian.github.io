"use client";
import React, { useRef, useState } from 'react';
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
  Award
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1 
      } : { 
        opacity: 0, 
        y: 30, 
        scale: 0.95 
      }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative bg-gradient-to-br from-space-light/30 to-space-light/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 h-full hover:border-white/30 transition-all duration-300"
      >
        {/* Simplified Background Gradient Effect */}
        <motion.div
          className={`absolute inset-0 ${project.gradient} opacity-0`}
          animate={{ 
            opacity: isHovered ? 0.2 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Project Image */}
        <motion.div
          className="relative h-48 overflow-hidden"
          animate={{
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-mars/30 to-cosmic/30 opacity-60" />
          
          <div className="relative z-10 h-full flex items-center justify-center">
            <motion.div
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <project.icon className="w-16 h-16 text-white/90" />
            </motion.div>
          </div>

          {/* Status Badge */}
          <motion.div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-white/20 ${project.statusBg}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: isInView ? 1 : 0,
              opacity: isInView ? 1 : 0
            }}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
          >
            {project.status}
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="p-6 relative z-10">
          <motion.h3 
            className="text-xl font-bold text-white mb-3 font-orbitron group-hover:text-mars transition-colors duration-300"
          >
            {project.title}
          </motion.h3>
          
          <p className="text-white/70 mb-4 leading-relaxed text-sm group-hover:text-white/85 transition-colors duration-300">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, i) => (
              <motion.span
                key={i}
                className="px-2 py-1 bg-gradient-to-r from-cosmic/20 to-blue-500/20 rounded-lg text-xs text-cosmic border border-cosmic/30 hover:bg-cosmic/10 transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Project Stats */}
          <div className="flex items-center justify-between mb-4 text-sm text-white/60">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{project.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{project.teamSize}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-white/10 to-white/5 rounded-xl border border-white/20 text-white/80 hover:text-white hover:border-white/30 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github className="w-4 h-4" />
              <span className="text-sm">Code</span>
            </motion.a>
            
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-mars to-orange-600 rounded-xl text-white hover:from-mars-dark hover:to-orange-700 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm">Live</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const projects = [
    {
      title: "Autonomous Navigation System",
      description: "Advanced AI-powered navigation system capable of real-time obstacle detection and path optimization for Mars terrain.",
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
      statusBg: "bg-blue-500/80 text-white",
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
  ];

  // Simplified animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="py-24 bg-gradient-to-br from-space-dark via-space to-space-dark relative overflow-hidden"
    >
      {/* Simplified Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          style={{ transform: `translateY(${backgroundY}px)` }}
          className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-gradient-to-r from-mars/10 to-orange-500/5 rounded-full blur-3xl opacity-60"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-bold font-orbitron mb-6 relative inline-block"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent">
              Our Projects
            </span>
            <motion.div
              className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-mars via-orange-500 to-cosmic rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Discover our innovative rover technologies and systems currently in development
          </motion.p>

          {/* Project Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            {[
              { label: "Active Projects", value: projects.length, icon: <Rocket className="w-4 h-4" />, gradient: "from-mars to-orange-500" },
              { label: "Team Members", value: "18+", icon: <Users className="w-4 h-4" />, gradient: "from-cosmic to-blue-500" },
              { label: "Technologies", value: "15+", icon: <Cpu className="w-4 h-4" />, gradient: "from-purple-500 to-pink-500" },
              { label: "Completion", value: "75%", icon: <Award className="w-4 h-4" />, gradient: "from-green-500 to-emerald-500" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-space-light/20 to-space-light/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center group hover:border-white/30 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${stat.gradient}/20 mb-2`}>
                  <div className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="text-lg font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-white/70 group-hover:text-white/90 transition-colors duration-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              index={index}
            />
          ))}
        </div>

        {/* View All Projects CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button className="bg-gradient-to-r from-cosmic via-blue-500 to-blue-600 hover:from-cosmic-dark hover:via-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg">
              <span className="flex items-center space-x-3">
                <span>View All Projects</span>
                <ArrowRight className="w-5 h-5" />
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
