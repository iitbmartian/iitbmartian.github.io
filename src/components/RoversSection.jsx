import React, { useRef, useState } from 'react';
import { ArrowRight, Rocket, Calendar, Zap } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const RoversSection = () => {
  const sectionRef = useRef(null);
  const [hoveredRover, setHoveredRover] = useState(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const rovers = [
    {
      name: "Akrula 1.0",
      year: "2015",
      image: "https://via.placeholder.com/600x400?text=Rover+Alpha",
      description: "Our pioneering rover",
      color: "from-red-500/20 to-orange-500/20"
    },
    {
      name: "Agathsya 1.0",
      year: "2016",
      image: "https://via.placeholder.com/600x400?text=Rover+Beta",
      description: "Enhanced mobility systems",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      name: "Agathsya 2.0",
      year: "2017",
      image: "https://via.placeholder.com/600x400?text=Rover+Gamma",
      description: "Advanced navigation",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      name: "Hemant 1.0",
      year: "2018",
      image: "https://via.placeholder.com/600x400?text=Rover+Delta",
      description: "Autonomous capabilities",
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      name: "Agruni 1.0",
      year: "2019-20",
      image: "https://via.placeholder.com/600x400?text=Rover+Epsilon",
      description: "Scientific instrumentation",
      color: "from-yellow-500/20 to-amber-500/20"
    },
    {
      name: "Yash",
      year: "2020-21",
      image: "https://via.placeholder.com/600x400?text=Rover+Zeta",
      description: "AI-powered exploration",
      color: "from-indigo-500/20 to-blue-500/20"
    },
    {
      name: "Tezant",
      year: "2022-23",
      image: "https://via.placeholder.com/600x400?text=Rover+Zeta",
      description: "Next-gen technology",
      color: "from-teal-500/20 to-cyan-500/20"
    }, 
    {
      name: "Amaran",
      year: "2024",
      image: "https://via.placeholder.com/600x400?text=Rover+Zeta",
      description: "Latest innovation",
      color: "from-mars/20 to-cosmic/20"
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
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const roverCardVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      rotateX: 15
    },
    visible: (index) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.1,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section 
      ref={sectionRef}
      id="rovers" 
      className="section-padding bg-gradient-to-br from-space via-space-dark to-space relative overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <motion.div
        className="absolute top-1/3 left-0 w-1/2 h-1/3 bg-gradient-to-r from-mars/10 to-orange-500/5 rounded-full blur-3xl"
        style={{ 
          y: backgroundY,
          scale: backgroundScale 
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.3, 1],
        }}
        transition={{
          rotate: { duration: 40, repeat: Infinity, ease: "linear" },
          scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 right-0 w-1/3 h-1/2 bg-gradient-to-l from-cosmic/10 to-blue-500/5 rounded-full blur-3xl"
        style={{ 
          y: backgroundY,
          scale: backgroundScale 
        }}
        animate={{
          rotate: [360, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          rotate: { duration: 35, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }
        }}
      />

      {/* Floating Rover Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          >
            <Rocket className="w-6 h-6 text-white/10" />
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
              Our Rovers Through The Years
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
            <Zap className="w-5 h-5 text-cosmic" />
            <span>Each rover represents a milestone in our journey, incorporating innovations and lessons from previous designs.</span>
          </motion.p>
        </motion.div>
        
        {/* Rovers Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {rovers.map((rover, index) => (
            <motion.div
              key={index}
              variants={roverCardVariants}
              custom={index}
              className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-space-light/20 to-space-light/5 border border-white/10 backdrop-blur-sm"
              onMouseEnter={() => setHoveredRover(index)}
              onMouseLeave={() => setHoveredRover(null)}
              whileHover={{ 
                y: -10,
                scale: 1.05,
                rotateY: 5
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Image Placeholder with Enhanced Gradient */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${rover.color} opacity-60`}
                  animate={{
                    scale: hoveredRover === index ? 1.1 : 1,
                    opacity: hoveredRover === index ? 0.8 : 0.6,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Animated Tech Pattern */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`,
                  }}
                  animate={{
                    backgroundPosition: hoveredRover === index ? ["0px 0px", "20px 20px"] : "0px 0px",
                  }}
                  transition={{
                    duration: 2,
                    repeat: hoveredRover === index ? Infinity : 0,
                    ease: "linear",
                  }}
                />
                
                {/* Rover Icon */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    scale: hoveredRover === index ? 1.2 : 1,
                    rotate: hoveredRover === index ? 360 : 0,
                  }}
                  transition={{ 
                    duration: hoveredRover === index ? 2 : 0.3,
                    repeat: hoveredRover === index ? Infinity : 0,
                    ease: "linear"
                  }}
                >
                  <Rocket className="w-12 h-12 text-white/80" />
                </motion.div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-space-dark/90 via-space-dark/50 to-transparent" />
              </div>
              
              {/* Content */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-4 z-20"
                initial={{ y: 20 }}
                animate={{ y: hoveredRover === index ? 0 : 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <motion.h3
                    className="text-white font-bold font-technospace text-sm sm:text-base"
                    animate={{
                      color: hoveredRover === index ? "#00d9ff" : "#ffffff",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {rover.name}
                  </motion.h3>
                  
                  <motion.div
                    className="flex items-center space-x-1 text-xs text-white/70"
                    animate={{
                      opacity: hoveredRover === index ? 1 : 0.7,
                      x: hoveredRover === index ? 0 : 10,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Calendar className="w-3 h-3" />
                    <span>{rover.year}</span>
                  </motion.div>
                </div>
                
                {/* Description - Only visible on hover */}
                <motion.p
                  className="text-white/80 text-xs leading-relaxed"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: hoveredRover === index ? 1 : 0,
                    height: hoveredRover === index ? "auto" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {rover.description}
                </motion.p>
              </motion.div>

              {/* Hover Effect Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-transparent"
                animate={{
                  borderColor: hoveredRover === index ? "rgba(0, 217, 255, 0.5)" : "transparent",
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Progress Indicator */}
              <motion.div
                className="absolute top-2 left-2 w-1 bg-gradient-to-b from-mars to-cosmic rounded-full"
                initial={{ height: 0 }}
                animate={{ 
                  height: hoveredRover === index ? "30px" : `${(index + 1) * 4}px`
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Link to="/rover">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-gradient-to-r from-mars via-orange-500 to-cosmic hover:from-mars-dark hover:via-orange-600 hover:to-cosmic-dark text-white group px-8 py-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                
                <span className="relative z-10 flex items-center space-x-2">
                  <Rocket className="w-5 h-5" />
                  <span className="font-semibold">Explore Our Rovers</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RoversSection;
