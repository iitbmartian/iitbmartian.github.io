import React, { useRef, useState } from 'react';
import { Cog, Code, Beaker, Presentation, ArrowRight, Zap, Star } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';



const Subsystem = ({ title, description, icon, color, gradient, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      className="relative group overflow-hidden"
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0 
      } : { 
        opacity: 0, 
        y: 50, 
        rotateX: 15 
      }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -10,
        scale: 1.02,
        rotateY: 5
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="bg-gradient-to-br from-space-light/30 to-space-light/10 rounded-2xl p-6 border border-white/10 backdrop-blur-sm relative overflow-hidden h-full"
        whileHover={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated Background Gradient */}
        <motion.div
          className={`absolute inset-0 ${gradient} opacity-0`}
          animate={{ 
            opacity: isHovered ? 0.1 : 0,
            scale: isHovered ? 1 : 0.8
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut",
              }}
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
              }}
            />
          ))}
        </div>

        {/* Icon Container */}
        <motion.div
          className={`inline-flex p-4 rounded-xl mb-6 ${color} relative overflow-hidden`}
          whileHover={{ 
            scale: 1.1,
            rotate: [0, -5, 5, 0]
          }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="absolute inset-0 bg-white/10 rounded-xl"
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              opacity: isHovered ? [0.3, 0.6, 0.3] : 0.3,
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          
          <motion.div
            className="relative z-10"
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.8 }}
          >
            {icon}
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
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
            className="text-white/70 leading-relaxed"
            animate={{
              color: isHovered ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.7)",
            }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>
        </div>

        {/* Corner Decorations */}
        <motion.div
          className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-mars to-cosmic rounded-full"
          animate={{
            scale: isHovered ? [1, 1.5, 1] : 1,
            opacity: isHovered ? [0.5, 1, 0.5] : 0.5,
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-2 left-2 w-1 h-8 bg-gradient-to-t from-cosmic to-transparent rounded-full"
          initial={{ height: 0 }}
          animate={{ height: isInView ? "32px" : 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
        />

        {/* Hover Effect Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

const SubsystemsSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const subsystems = [
    {
      title: "Mechanical",
      description: "Designing and fabricating the structure, mobility systems, and robotic arms of our rovers.",
      icon: <Cog className="h-6 w-6 text-white" />,
      color: "bg-gradient-to-br from-mars/40 to-orange-500/30",
      gradient: "bg-gradient-to-br from-mars/20 to-orange-500/10"
    },
    {
      title: "Electronics & Control",
      description: "Creating circuits, sensors, and control systems that give our rovers their functionality.",
      icon: <Zap className="h-6 w-6 text-white" />,
      color: "bg-gradient-to-br from-cosmic/40 to-blue-500/30",
      gradient: "bg-gradient-to-br from-cosmic/20 to-blue-500/10"
    },
    {
      title: "Software & Automation",
      description: "Developing algorithms for autonomous navigation, obstacle avoidance, and task execution.",
      icon: <Code className="h-6 w-6 text-white" />,
      color: "bg-gradient-to-br from-purple-500/40 to-indigo-500/30",
      gradient: "bg-gradient-to-br from-purple-500/20 to-indigo-500/10"
    },
    {
      title: "Biosciences",
      description: "Integrating systems for scientific analysis and sample collection on extraterrestrial terrain.",
      icon: <Beaker className="h-6 w-6 text-white" />,
      color: "bg-gradient-to-br from-green-500/40 to-emerald-500/30",
      gradient: "bg-gradient-to-br from-green-500/20 to-emerald-500/10"
    },
    {
      title: "Media, Design, Marketing & Business",
      description: "Handling the team's outreach, visual identity, sponsorships, and business relations.",
      icon: <Presentation className="h-6 w-6 text-white" />,
      color: "bg-gradient-to-br from-pink-500/40 to-rose-500/30",
      gradient: "bg-gradient-to-br from-pink-500/20 to-rose-500/10"
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
      id="subsystems" 
      className="section-padding bg-gradient-to-br from-space via-space-dark to-space relative overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <motion.div
        className="absolute top-1/3 left-0 w-1/2 h-1/3 bg-gradient-to-r from-cosmic/10 to-blue-500/5 rounded-full blur-3xl"
        style={{ 
          y: backgroundY,
          scale: backgroundScale 
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 45, repeat: Infinity, ease: "linear" },
          scale: { duration: 12, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 right-0 w-1/3 h-1/2 bg-gradient-to-l from-mars/10 to-orange-500/5 rounded-full blur-3xl"
        style={{ 
          y: backgroundY,
          scale: backgroundScale 
        }}
        animate={{
          rotate: [360, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          rotate: { duration: 40, repeat: Infinity, ease: "linear" },
          scale: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }
        }}
      />

      {/* Constellation Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b35" />
              <stop offset="100%" stopColor="#00d9ff" />
            </linearGradient>
          </defs>
          {[...Array(8)].map((_, i) => (
            <motion.line
              key={i}
              x1={`${Math.random() * 100}%`}
              y1={`${Math.random() * 100}%`}
              x2={`${Math.random() * 100}%`}
              y2={`${Math.random() * 100}%`}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: [0, 0.3, 0],
              }}
              transition={{
                pathLength: { duration: 3, delay: i * 0.5 },
                opacity: { duration: 3, delay: i * 0.5 }
              }}
            />
          ))}
        </svg>
      </div>

      {/* Floating Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 6 + i % 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Star className="w-3 h-3 text-white/20" />
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
              The Stars That Form The Constellation
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
            <span>Our subsystems work in harmony to create rovers that are capable of tackling the challenges of extraterrestrial exploration.</span>
          </motion.p>
        </motion.div>
        
        {/* Subsystems Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {subsystems.map((subsystem, index) => (
            <Subsystem 
              key={index} 
              {...subsystem} 
              index={index}
            />
          ))}
        </div>
        
        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Link to="/subsystems">
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
                  <Star className="w-5 h-5" />
                  <span className="font-semibold">Explore Our Subsystems</span>
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

export default SubsystemsSection;
