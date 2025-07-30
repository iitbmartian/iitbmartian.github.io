import React, { useRef, useState } from 'react';
import { Award, Globe, MapPin, Trophy, Target, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';



const Competition = ({ title, description, location, image, index, gradient }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      className="relative group overflow-hidden"
      initial={{ opacity: 0, y: 60, rotateX: 20 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0 
      } : { 
        opacity: 0, 
        y: 60, 
        rotateX: 20 
      }}
      transition={{ 
        duration: 0.9, 
        delay: index * 0.2,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -15,
        scale: 1.03,
        rotateY: 5
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="bg-gradient-to-br from-space-light/30 to-space-light/10 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm relative h-full"
        whileHover={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated Background Gradient */}
        <motion.div
          className={`absolute inset-0 ${gradient} opacity-0`}
          animate={{ 
            opacity: isHovered ? 0.15 : 0,
            scale: isHovered ? 1 : 0.9
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          {/* Image Placeholder with Enhanced Gradient */}
          <motion.div
            className={`w-full h-full ${gradient} opacity-70 relative overflow-hidden`}
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.6 }}
          >
            {/* Animated Tech Pattern */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(255,255,255,0.1) 15px, rgba(255,255,255,0.1) 30px)`,
              }}
              animate={{
                backgroundPosition: isHovered ? ["0px 0px", "30px 30px"] : "0px 0px",
              }}
              transition={{
                duration: 3,
                repeat: isHovered ? Infinity : 0,
                ease: "linear",
              }}
            />

            {/* Competition Icon */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: isHovered ? 1.3 : 1,
                rotate: isHovered ? 360 : 0,
              }}
              transition={{ 
                duration: isHovered ? 2 : 0.3,
                repeat: isHovered ? Infinity : 0,
                ease: "linear"
              }}
            >
              <Trophy className="w-16 h-16 text-white/80" />
            </motion.div>

            {/* Floating Particles */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/40 rounded-full"
                animate={{
                  x: [0, 40, 0],
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${30 + i * 15}%`,
                }}
              />
            ))}
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-space-dark/90 via-space-dark/30 to-transparent" />
          
          {/* Achievement Badge */}
          <motion.div
            className="absolute top-4 right-4 p-2 bg-gradient-to-r from-mars/80 to-orange-500/80 rounded-full backdrop-blur-sm"
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
            whileHover={{ scale: 1.1, rotate: 360 }}
          >
            <Award className="w-5 h-5 text-white" />
          </motion.div>
        </div>

        {/* Content Section */}
        <motion.div
          className="p-6 relative z-10"
          animate={{
            y: isHovered ? -5 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Location */}
          <motion.div
            className="flex items-center mb-3 group"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="p-1 bg-gradient-to-r from-mars/20 to-orange-500/20 rounded-full mr-3"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <MapPin className="h-4 w-4 text-mars" />
            </motion.div>
            <motion.span
              className="text-white/70 text-sm group-hover:text-white/90 transition-colors duration-300"
              animate={{
                color: isHovered ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.7)",
              }}
              transition={{ duration: 0.3 }}
            >
              {location}
            </motion.span>
          </motion.div>

          {/* Title */}
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

          {/* Description */}
          <motion.p
            className="text-white/70 leading-relaxed"
            animate={{
              color: isHovered ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0.7)",
            }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>

          {/* Competition Ranking Indicator */}
          <motion.div
            className="mt-4 flex items-center space-x-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <Target className="w-4 h-4 text-cosmic" />
            <span className="text-xs text-cosmic font-medium">Global Competition</span>
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

        {/* Progress Line */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-mars to-cosmic rounded-full"
          initial={{ width: 0 }}
          animate={{ width: isInView ? "100%" : 0 }}
          transition={{ duration: 1, delay: 0.3 + index * 0.2 }}
        />
      </motion.div>
    </motion.div>
  );
};

const CompetitionsSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const competitions = [
    {
      title: "University Rover Challenge (URC)",
      description: "The world's premier robotics competition for university students, held annually in the desert of southern Utah, USA.",
      location: "Mars Desert Research Station, Utah, USA",
      image: "https://via.placeholder.com/600x400?text=URC",
      gradient: "bg-gradient-to-br from-red-500/60 to-orange-600/40"
    },
    {
      title: "International Rover Challenge (IRC)",
      description: "A competition that tests rovers' capabilities in various challenges simulating real Mars mission scenarios.",
      location: "India",
      image: "https://via.placeholder.com/600x400?text=IRC",
      gradient: "bg-gradient-to-br from-blue-500/60 to-cyan-500/40"
    },
    {
      title: "European Rover Challenge (ERC)",
      description: "One of the largest space and robotics events in Europe, featuring simulated Martian terrain challenges.",
      location: "Poland",
      image: "https://via.placeholder.com/600x400?text=ERC",
      gradient: "bg-gradient-to-br from-purple-500/60 to-indigo-500/40"
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
      id="competitions" 
      className="section-padding bg-gradient-to-br from-space-dark via-space to-space-dark relative overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <motion.div
        className="absolute top-1/3 right-0 w-1/3 h-1/3 bg-gradient-to-l from-mars/10 to-orange-500/5 rounded-full blur-3xl"
        style={{ 
          y: backgroundY,
          scale: backgroundScale 
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.3, 1],
        }}
        transition={{
          rotate: { duration: 50, repeat: Infinity, ease: "linear" },
          scale: { duration: 15, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 left-0 w-1/3 h-1/3 bg-gradient-to-r from-cosmic/10 to-blue-500/5 rounded-full blur-3xl"
        style={{ 
          y: backgroundY,
          scale: backgroundScale 
        }}
        animate={{
          rotate: [360, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          rotate: { duration: 45, repeat: Infinity, ease: "linear" },
          scale: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }
        }}
      />

      {/* Floating Trophy Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [0, -25, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Trophy className="w-4 h-4 text-white/10" />
          </motion.div>
        ))}
      </div>

      {/* Achievement Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <defs>
            <linearGradient id="achievementGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b35" />
              <stop offset="50%" stopColor="#ffd700" />
              <stop offset="100%" stopColor="#00d9ff" />
            </linearGradient>
          </defs>
          {[...Array(6)].map((_, i) => (
            <motion.path
              key={i}
              d={`M ${i * 20},0 Q ${i * 20 + 50},50 ${i * 20 + 100},100`}
              fill="none"
              stroke="url(#achievementGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: [0, 0.3, 0],
              }}
              transition={{
                pathLength: { duration: 4, delay: i * 0.5 },
                opacity: { duration: 4, delay: i * 0.5 }
              }}
            />
          ))}
        </svg>
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
            <span className="relative text-gradient">
              Proving Grounds For Our Capabilities
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
            <Globe className="w-5 h-5 text-cosmic" />
            <span>We test our rovers' capabilities and our team's skills in premier international competitions.</span>
          </motion.p>
        </motion.div>
        
        {/* Competitions Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {competitions.map((competition, index) => (
            <Competition 
              key={index} 
              {...competition} 
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
          <Link to="/competitions">
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
                  <Trophy className="w-5 h-5" />
                  <span className="font-semibold">View Our Competitive Records</span>
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

export default CompetitionsSection;
