"use client";
import React, { useRef } from 'react';
import { Award, Flag, Users, Star, Rocket, Sparkles } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const figures = [
    { 
      number: "12+", 
      text: "Years and counting!", 
      icon: <Star className="h-6 w-6 text-cosmic" />,
      gradient: "from-cosmic/20 to-blue-500/20"
    },
    { 
      number: "50+", 
      text: "Active team members", 
      icon: <Users className="h-6 w-6 text-mars" />,
      gradient: "from-mars/20 to-orange-500/20"
    },
    { 
      number: "6", 
      text: "Entirely different rovers", 
      icon: <Rocket className="h-6 w-6 text-cosmic" />,
      gradient: "from-cosmic/20 to-purple-500/20"
    },
    { 
      number: "∞", 
      text: "Uncountable learnings!", 
      icon: <Star className="h-6 w-6 text-mars" />,
      gradient: "from-mars/20 to-pink-500/20"
    }
  ];

  const highlights = [
    "Secured First position among all Indian teams in University Rover Challenge 2023, USA",
    "Secured 6th rank in Bio-sciences task in University Rover Challenge 2023, USA",
    "Achieved Excellence Award in Autonomous category in International Rover Challenge 2023",
    "Secured 5th Position out of 18 teams in International Rover Challenge IRC 2023",
    "Achieved Excellence Award in Navigation Task in European Rover Challenge 2022"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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
      id="about" 
      className="relative py-24 overflow-hidden bg-gradient-to-br from-space via-space-dark to-space"
    >
      {/* Fixed Background Effects - No overlapping */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-mars/15 to-orange-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          style={{ y: backgroundY }}
          className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-cosmic/15 to-blue-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-6 md:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col space-y-20"
        >
          {/* Header Section */}
          <motion.div 
            className="flex flex-col items-center text-center "
            variants={itemVariants}
          >
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-technospace"
              variants={itemVariants}
            >
              <motion.span
                className="bg-gradient-to-r from-mars via-orange-400 to-cosmic bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 100%",
                }}
              >
                About Us
              </motion.span>
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl text-white/80 max-w-4xl leading-relaxed py-6"
              variants={itemVariants}
            >
              Founded in <motion.span 
                className="text-mars font-semibold"
                whileHover={{ scale: 1.1, color: "#f97316" }}
              >
                2012
              </motion.span>, MRT (Mars Rover Team) was established with a vision to make 
              significant strides in space exploration and autonomous robotics. Over the years, 
              our team has fostered an environment of inclusive growth and continuous learning, 
              leading to remarkable progress and consistent success in premier international competitions.
            </motion.p>
          </motion.div>
          
          {/* Vision and Mission Section - Flex Instead of Grid */}
          <motion.div 
            className="flex flex-col lg:flex-row gap-8 lg:gap-12"
            variants={itemVariants}
          >
            {/* Vision */}
            <motion.div
              className="flex-1"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-full">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-mars/10 to-orange-500/10 rounded-2xl blur-lg -z-10"
                  animate={{
                    scale: [1, 1.02, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                <div className="bg-space-light/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10 hover:border-mars/30 transition-all duration-500 h-full">
                  <motion.h3 
                    className="text-2xl lg:text-3xl font-bold mb-6 font-technospace text-mars flex items-center"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Flag className="mr-3 text-mars flex-shrink-0" />
                    Our Vision
                  </motion.h3>
                  
                  <div className="flex flex-col space-y-4">
                    {[
                      "Establish IIT Bombay as a global leader in space robotics",
                      "Innovate in Mars Rover technology",
                      "Nurture sustainable and skilled talent pipeline",
                      "Contribute to advancements in planetary exploration",
                      "Build a legacy of engineering excellence and impactful research"
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-start group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.div
                          whileHover={{ rotate: 180, scale: 1.2 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          <Flag className="h-4 w-4 text-mars mr-3 mt-1" />
                        </motion.div>
                        <span className="text-white/80 group-hover:text-white transition-colors duration-300 text-sm lg:text-base">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              className="flex-1"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-full">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cosmic/10 to-blue-500/10 rounded-2xl blur-lg -z-10"
                  animate={{
                    scale: [1, 1.02, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
                
                <div className="bg-space-light/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10 hover:border-cosmic/30 transition-all duration-500 h-full">
                  <motion.h3 
                    className="text-2xl lg:text-3xl font-bold mb-6 font-technospace text-cosmic flex items-center"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Rocket className="mr-3 text-cosmic flex-shrink-0" />
                    Our Mission
                  </motion.h3>
                  
                  <motion.p 
                    className="text-white/80 leading-relaxed text-sm lg:text-base"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  >
                    To design, develop, and innovate cutting-edge extraterrestrial robotic solutions 
                    while fostering a culture of excellence, collaboration, and technical expertise 
                    among students. Through hands-on learning and global competitions, we aim to push 
                    the boundaries of autonomous robotics and inspire the next generation of engineers.
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Key Figures - Flex Layout */}
          <motion.div 
            className="flex flex-col my-6 py-6"
            variants={itemVariants}
          >
            <motion.h3 
              className="text-2xl lg:text-3xl font-bold text-center font-technospace"
              variants={itemVariants}
            >
              <span className="bg-gradient-to-r from-mars to-cosmic bg-clip-text text-transparent">
                Our Journey in Numbers
              </span>
            </motion.h3>
            
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6 py-6">
              {figures.map((figure, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
                  transition={{ delay: 1.2 + index * 0.15, duration: 0.6 }}
                  className="relative group flex-1 min-w-[140px] max-w-[200px]"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                  }}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${figure.gradient} rounded-2xl blur-md -z-10`}
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5,
                    }}
                  />
                  
                  <div className="bg-space-light/30 backdrop-blur-sm rounded-2xl p-4 lg:p-6 text-center border border-white/10 group-hover:border-mars/30 transition-all duration-500">
                    <motion.div 
                      className="flex justify-center mb-3"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className={`p-2 lg:p-3 bg-gradient-to-br ${figure.gradient} rounded-full`}>
                        {figure.icon}
                      </div>
                    </motion.div>
                    
                    <motion.h4 
                      className="text-2xl lg:text-4xl font-bold mb-2 font-technospace bg-gradient-to-r from-mars to-cosmic bg-clip-text text-transparent"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.8, delay: 1.5 + index * 0.2, type: "spring", stiffness: 200 }}
                    >
                      {figure.number}
                    </motion.h4>
                    
                    <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300 text-xs lg:text-sm">
                      {figure.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Highlights */}
          <motion.div 
            className="flex flex-col space-y-8"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-2xl lg:text-4xl font-bold text-center font-technospace py-6 pt-0"
              variants={itemVariants}
            >
              <span className=" bg-gradient-to-r from-mars to-cosmic bg-clip-text text-transparent">
                When this team thrived globally
              </span>
            </motion.h2>
            
            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cosmic/10 via-mars/10 to-orange-500/10 rounded-2xl blur-lg -z-10"
                animate={{
                  scale: [1, 1.01, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <div className="bg-space-light/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10 hover:border-cosmic/30 transition-all duration-500">
                <div className="flex flex-col space-y-4 lg:space-y-6">
                  {highlights.map((highlight, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start group"
                      initial={{ opacity: 0, x: -30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                      transition={{ duration: 0.6, delay: 2 + index * 0.15 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.3 }}
                        transition={{ duration: 0.5 }}
                        className="flex-shrink-0 mr-4 mt-1"
                      >
                        <Award className="h-5 w-5 lg:h-6 lg:w-6 text-cosmic" />
                      </motion.div>
                      
                      <motion.p 
                        className="text-white/90 group-hover:text-white transition-colors duration-300 leading-relaxed text-sm lg:text-base"
                        whileHover={{ scale: 1.01 }}
                      >
                        {highlight}
                      </motion.p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
