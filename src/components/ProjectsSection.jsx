import React, { useRef, useState } from 'react';
import { ArrowRight, Zap, Trophy, Target, Award, Rocket, Star } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ProjectCard = ({ title, description, image, year, className, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-gradient-to-br from-space-light/30 to-space-light/10 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300",
        className
      )}
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
      {/* Simplified Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-mars/10 to-cosmic/10 opacity-0"
        animate={{ 
          opacity: isHovered ? 0.3 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        {/* Simplified Image Placeholder */}
        <motion.div
          className="w-full h-full bg-gradient-to-br from-mars/60 to-cosmic/40 relative overflow-hidden"
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Simple tech grid pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 22px),
                               repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 22px)`,
            }}
          />

          {/* Rover Icon */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Rocket className="w-16 h-16 text-white/90" />
          </div>
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-space/90 via-space/50 to-transparent" />
        
        {/* Year Badge */}
        <motion.div
          className="absolute top-4 right-4 bg-gradient-to-r from-mars/90 to-orange-500/90 text-white text-sm font-medium py-2 px-4 rounded-full backdrop-blur-sm border border-white/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
          whileHover={{ scale: 1.05 }}
        >
          {year}
        </motion.div>

        {/* Project Number */}
        <motion.div
          className="absolute top-4 left-4 w-10 h-10 bg-gradient-to-r from-cosmic/90 to-blue-500/90 rounded-full flex items-center justify-center text-white font-bold backdrop-blur-sm"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.25 + index * 0.05 }}
          whileHover={{ scale: 1.1 }}
        >
          {index + 1}
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="relative z-20 p-6">
        <motion.h3
          className="text-xl font-bold mb-3 font-orbitron relative text-white group-hover:text-cosmic transition-colors duration-300"
        >
          {title}
          <motion.div
            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-mars to-cosmic rounded-full"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.h3>
        
        <p className="text-white/70 mb-6 leading-relaxed group-hover:text-white/85 transition-colors duration-300">
          {description}
        </p>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            variant="ghost" 
            className="text-cosmic hover:text-cyan-300 p-0 h-auto group/btn transition-colors duration-300"
          >
            <span className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span className="font-medium">Learn more</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
        </motion.div>
      </div>
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
      title: "Rover Alpha",
      description: "Our first prototype rover capable of basic movement and object detection.",
      image: "https://via.placeholder.com/600x400?text=Rover+Alpha",
      year: "2016"
    },
    {
      title: "Rover Beta", 
      description: "Second generation rover with improved navigation and sample collection systems.",
      image: "https://via.placeholder.com/600x400?text=Rover+Beta",
      year: "2018"
    },
    {
      title: "Rover Gamma",
      description: "Advanced rover with autonomous navigation and scientific instruments.",
      image: "https://via.placeholder.com/600x400?text=Rover+Gamma", 
      year: "2020"
    },
    {
      title: "Rover Delta",
      description: "Latest generation rover with AI-powered systems and extended range capabilities.",
      image: "https://via.placeholder.com/600x400?text=Rover+Delta",
      year: "2022"
    }
  ];

  const achievements = [
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
          className="absolute top-1/3 right-0 w-1/2 h-1/2 bg-gradient-to-l from-mars/10 to-orange-500/5 rounded-full blur-3xl opacity-60"
        />
        
        <div
          style={{ transform: `translateY(${backgroundY}px)` }}
          className="absolute bottom-1/3 left-0 w-1/2 h-1/2 bg-gradient-to-r from-cosmic/10 to-blue-500/5 rounded-full blur-3xl opacity-60"
        />

        {/* Simple floating project icons */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
            }}
          >
            <Rocket className="w-4 h-4 text-white/20" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
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
            className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed flex items-center justify-center space-x-3"
            variants={itemVariants}
          >
            <Star className="w-6 h-6 text-cosmic flex-shrink-0" />
            <span>Explore our journey of rover development through the years, from conception to competition-ready designs</span>
            <Rocket className="w-6 h-6 text-mars flex-shrink-0" />
          </motion.p>

          {/* Project Stats */}
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
        
        {/* Achievements Section */}
        <motion.div
          className="mt-16 text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h3 
            className="text-3xl md:text-4xl font-bold mb-12 font-orbitron flex items-center justify-center space-x-3"
            variants={itemVariants}
          >
            <Trophy className="w-7 h-7 text-mars" />
            <span className="bg-gradient-to-r from-mars to-cosmic bg-clip-text text-transparent">
              Competitions & Achievements
            </span>
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br from-space-light/30 to-space-light/10 rounded-2xl p-8 border backdrop-blur-sm relative overflow-hidden hover:border-white/30 transition-all duration-300 ${achievement.borderColor}`}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Background Gradient Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                
                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {achievement.icon}
                    </motion.div>
                  </div>
                  
                  <div className="text-3xl font-bold mb-3 font-orbitron text-white">
                    {achievement.title}
                  </div>
                  
                  <p className="text-white/80 group-hover:text-white/90 transition-colors duration-300">
                    {achievement.description}
                  </p>
                </div>

                {/* Simple achievement indicator */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-mars to-cosmic rounded-full opacity-60" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
