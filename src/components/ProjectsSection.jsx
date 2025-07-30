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
        "group relative overflow-hidden rounded-2xl bg-gradient-to-br from-space-light/30 to-space-light/10 backdrop-blur-sm border border-white/10",
        className
      )}
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0 
      } : { 
        opacity: 0, 
        y: 60, 
        rotateX: 15 
      }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -12,
        scale: 1.02,
        rotateY: 3
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-mars/10 to-cosmic/10 opacity-0"
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.9
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        {/* Image Placeholder with Tech Pattern */}
        <motion.div
          className="w-full h-full bg-gradient-to-br from-mars/60 to-cosmic/40 relative overflow-hidden"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated Tech Grid */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 22px),
                               repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 22px)`,
            }}
            animate={{
              backgroundPosition: isHovered ? ["0px 0px", "20px 20px"] : "0px 0px",
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: "linear",
            }}
          />

          {/* Rover Icon */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: isHovered ? 1.3 : 1,
              rotate: isHovered ? [0, 5, -5, 0] : 0,
            }}
            transition={{ 
              duration: isHovered ? 2 : 0.3,
              repeat: isHovered ? Infinity : 0,
            }}
          >
            <Rocket className="w-16 h-16 text-white/90" />
          </motion.div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/40 rounded-full"
                animate={{
                  x: [0, 50, 0],
                  y: [0, -40, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${30 + i * 15}%`,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-space/90 via-space/50 to-transparent" />
        
        {/* Year Badge */}
        <motion.div
          className="absolute top-4 right-4 bg-gradient-to-r from-mars/90 to-orange-500/90 text-white text-sm font-medium py-2 px-4 rounded-full backdrop-blur-sm border border-white/20"
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
          whileHover={{ scale: 1.1, rotate: 360 }}
        >
          {year}
        </motion.div>

        {/* Project Number */}
        <motion.div
          className="absolute top-4 left-4 w-10 h-10 bg-gradient-to-r from-cosmic/90 to-blue-500/90 rounded-full flex items-center justify-center text-white font-bold backdrop-blur-sm"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
          whileHover={{ scale: 1.2, rotate: 180 }}
        >
          {index + 1}
        </motion.div>
      </div>

      {/* Content Section */}
      <motion.div
        className="relative z-20 p-6"
        animate={{
          y: isHovered ? -5 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.h3
          className="text-xl font-bold mb-3 font-technospace relative"
          animate={{
            color: isHovered ? "#00d9ff" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          {title}
          <motion.div
            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-mars to-cosmic rounded-full"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.4 }}
          />
        </motion.h3>
        
        <motion.p
          className="text-white/70 mb-6 leading-relaxed"
          animate={{
            color: isHovered ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0.7)",
          }}
          transition={{ duration: 0.3 }}
        >
          {description}
        </motion.p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="ghost" 
            className="text-cosmic hover:text-cyan-300 p-0 h-auto group/btn relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cosmic/10 to-transparent rounded"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            
            <span className="relative z-10 flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span className="font-medium">Learn more</span>
              <motion.div
                animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Hover Border Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-transparent"
        animate={{
          borderColor: isHovered ? "rgba(0, 217, 255, 0.4)" : "transparent",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

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

  // Animation variants
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="section-padding bg-gradient-to-br from-space via-space-dark to-space relative overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <motion.div
        className="absolute top-1/3 right-0 w-1/2 h-1/2 bg-gradient-to-l from-mars/10 to-orange-500/5 rounded-full blur-3xl"
        style={{ 
          y: backgroundY,
          scale: backgroundScale 
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 80, repeat: Infinity, ease: "linear" },
          scale: { duration: 25, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 left-0 w-1/2 h-1/2 bg-gradient-to-r from-cosmic/10 to-blue-500/5 rounded-full blur-3xl"
        style={{ 
          y: backgroundY,
          scale: backgroundScale 
        }}
        animate={{
          rotate: [360, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          rotate: { duration: 75, repeat: Infinity, ease: "linear" },
          scale: { duration: 20, repeat: Infinity, ease: "easeInOut", delay: 7 }
        }}
      />

      {/* Floating Project Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Rocket className="w-4 h-4 text-white/10" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="section-title relative inline-block"
            variants={itemVariants}
          >
            <span className="relative">
              Our Projects
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-mars via-orange-500 to-cosmic rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </span>
          </motion.h2>
          
          <motion.p 
            className="section-subtitle flex items-center justify-center space-x-2"
            variants={itemVariants}
          >
            <Star className="w-5 h-5 text-cosmic" />
            <span>Explore our journey of rover development through the years, from conception to competition-ready designs.</span>
          </motion.p>
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
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h3 
            className="text-2xl font-bold mb-8 font-technospace flex items-center justify-center space-x-2"
            variants={itemVariants}
          >
            <Trophy className="w-6 h-6 text-mars" />
            <span>Competitions & Achievements</span>
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br from-space-light/30 to-space-light/10 rounded-2xl p-6 border backdrop-blur-sm relative overflow-hidden ${achievement.borderColor}`}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  rotateY: 5
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Background Gradient Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-0`}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
                
                <div className="relative z-10">
                  <motion.div
                    className="flex justify-center mb-4"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {achievement.icon}
                  </motion.div>
                  
                  <motion.div
                    className="text-3xl font-bold mb-2"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {achievement.title}
                  </motion.div>
                  
                  <p className="text-white/80">{achievement.description}</p>
                </div>

                {/* Achievement Badge */}
                <motion.div
                  className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-r from-mars to-cosmic rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
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
