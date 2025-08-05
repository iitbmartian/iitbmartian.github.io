"use client";
import React, { useRef, useState } from 'react';
import { Award, Globe, MapPin, Trophy, Target, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {useRouter} from 'next/navigation'


const Competition = ({ title, description, location, image, index, gradient }) => {
  const router = useRouter()

  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      className="relative group overflow-hidden"
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
        duration: 0.5, 
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
        className="bg-gradient-to-br from-space-light/30 to-space-light/10 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm relative h-full hover:border-white/30 transition-all duration-300"
      >
        {/* Simplified Background Gradient */}
        <motion.div
          className={`absolute inset-0 ${gradient} opacity-0`}
          animate={{ 
            opacity: isHovered ? 0.1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          {/* Simplified Image Placeholder */}
          <motion.div
            className={`w-full h-full ${gradient} opacity-70 relative overflow-hidden`}
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Simple tech pattern */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(255,255,255,0.1) 15px, rgba(255,255,255,0.1) 30px)`,
              }}
            />

            {/* Competition Icon */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Trophy className="w-16 h-16 text-white/80" />
            </div>
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-space/90 via-space/30 to-transparent" />
          
          {/* Achievement Badge */}
          <motion.div
            className="absolute top-4 right-4 p-2 bg-gradient-to-r from-mars/80 to-orange-500/80 rounded-full backdrop-blur-sm"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
          >
            <Award className="w-5 h-5 text-white" />
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-6 relative z-10">
          {/* Location */}
          <div className="flex items-center mb-3 group/location">
            <div className="p-1 bg-gradient-to-r from-mars/20 to-orange-500/20 rounded-full mr-3">
              <MapPin className="h-4 w-4 text-mars" />
            </div>
            <span className="text-white/70 text-sm group-hover/location:text-white/90 transition-colors duration-300">
              {location}
            </span>
          </div>

          {/* Title */}
          <motion.h3
            className="text-xl font-bold mb-3 relative text-white group-hover:text-cosmic transition-colors duration-300 font-orbitron"
          >
            {title}

          </motion.h3>

          {/* Description */}
          <p className="text-white/70 leading-relaxed group-hover:text-white/85 transition-colors duration-300 mb-4">
            {description}
          </p>

          {/* Competition Ranking Indicator */}
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Target className="w-4 h-4 text-cosmic" />
            <span className="text-xs text-cosmic font-medium">Global Competition</span>
          </motion.div>
        </div>

      </motion.div>
    </motion.div>
  );
};

const CompetitionsSection = () => {
  const router = useRouter()

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const competitions = [
    {
      title: "University Rover Challenge (URC)",
      description: "The world's premier robotics competition for university students, held annually in the desert of southern Utah, USA.",
      location: "Mars Desert Research Station, Utah, USA",
      image: "https://via.placeholder.com/600x400?text=URC",
      gradient: "bg-gradient-to-br from-mars/60 to-orange-600/40"
    },
    {
      title: "International Rover Challenge (IRC)",
      description: "A competition that tests rovers' capabilities in various challenges simulating real Mars mission scenarios.",
      location: "India",
      image: "https://via.placeholder.com/600x400?text=IRC",
      gradient: "bg-gradient-to-br from-cosmic/60 to-blue-500/40"
    },
    {
      title: "European Rover Challenge (ERC)",
      description: "One of the largest space and robotics events in Europe, featuring simulated Martian terrain challenges.",
      location: "Poland",
      image: "https://via.placeholder.com/600x400?text=ERC",
      gradient: "bg-gradient-to-br from-purple-500/60 to-indigo-500/40"
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
      id="competitions" 
      className="py-24 bg-gradient-to-br from-space-dark via-space to-space-dark relative overflow-hidden"
    >
      {/* Simplified Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          style={{ transform: `translateY(${backgroundY}px)` }}
          className="absolute top-1/3 right-0 w-1/3 h-1/3 bg-gradient-to-l from-mars/10 to-orange-500/5 rounded-full blur-3xl opacity-60"
        />
        
        <div
          style={{ transform: `translateY(${backgroundY}px)` }}
          className="absolute bottom-1/3 left-0 w-1/3 h-1/3 bg-gradient-to-r from-cosmic/10 to-blue-500/5 rounded-full blur-3xl opacity-60"
        />

        {/* Simple floating trophies */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [0, -15, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + i * 1.5,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeInOut",
            }}
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
            }}
          >
            <Trophy className="w-4 h-4 text-white/20" />
          </motion.div>
        ))}

        {/* Static achievement pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="achievementGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6b35" />
                <stop offset="50%" stopColor="#ffd700" />
                <stop offset="100%" stopColor="#00d9ff" />
              </linearGradient>
            </defs>
            {[...Array(6)].map((_, i) => (
              <path
                key={i}
                d={`M ${i * 20},0 Q ${i * 20 + 50},50 ${i * 20 + 100},100`}
                fill="none"
                stroke="url(#achievementGradient)"
                strokeWidth="2"
                opacity="0.3"
              />
            ))}
          </svg>
        </div>
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
              Proving Grounds
            </span>
            <motion.div
              className=""
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed flex items-center justify-center space-x-3"
            variants={itemVariants}
          >
            <Globe className="w-6 h-6 text-cosmic flex-shrink-0" />
            <span>We test our rovers' capabilities and our team's skills in premier international competitions</span>
            <Trophy className="w-6 h-6 text-mars flex-shrink-0" />
          </motion.p>


        </motion.div>
        
        {/* Competitions Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
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
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link href="/competitions">
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button onClick={()=>{
                    router.push("/records")
                  }} className="bg-gradient-to-r from-mars via-orange-500 to-cosmic hover:from-mars-dark hover:via-orange-600 hover:to-cosmic-dark text-white group px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg">
                <span className="flex items-center space-x-3">
                  <Trophy className="w-5 h-5" />
                  <span >View Our Competitive Records
                  </span>
                  <ArrowRight className="w-5 h-5" />
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
