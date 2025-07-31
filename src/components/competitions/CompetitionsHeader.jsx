'use client'
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Trophy, Rocket, Settings, Camera, Star, Award } from 'lucide-react';

const CompetitionsHeader = () => {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });

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

  const navigationLinks = [
    {
      href: "/rover",
      label: "Our Rovers",
      icon: <Rocket className="w-4 h-4" />,
      variant: "default",
      className: "bg-gradient-to-r from-mars to-orange-500 hover:from-mars-dark hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl",
      description: "Explore our rover designs"
    },
    {
      href: "/subsystems",
      label: "Subsystems",
      icon: <Settings className="w-4 h-4" />,
      variant: "outline",
      className: "border-2 border-cosmic text-cosmic hover:bg-cosmic/10 hover:border-cosmic/70 backdrop-blur-sm",
      description: "Technical specifications"
    },
    {
      href: "/gallery",
      label: "Gallery",
      icon: <Camera className="w-4 h-4" />,
      variant: "secondary",
      className: "bg-gradient-to-r from-space-light/40 to-space-light/20 hover:from-space-light/60 hover:to-space-light/40 text-white border border-white/20 backdrop-blur-sm",
      description: "Visual documentation"
    }
  ];

  return (
    <motion.div 
      ref={headerRef}
      className="text-center mb-20 relative"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-mars/10 to-cosmic/10 rounded-full blur-3xl opacity-60" />
      </div>

      {/* Main Title */}
      <motion.div
        className="relative inline-block mb-6"
        variants={itemVariants}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold font-orbitron bg-gradient-to-r from-mars via-yellow-500 to-cosmic bg-clip-text text-transparent relative"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          Competitive Records
          <motion.div
            className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-mars via-yellow-500 to-cosmic rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />
        </motion.h1>

        {/* Decorative elements */}
        <motion.div 
          className="absolute -top-4 -right-4 text-yellow-500/60"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Trophy className="w-6 h-6" />
        </motion.div>
        
        <motion.div 
          className="absolute -top-2 -left-6 text-cosmic/60"
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Award className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Subtitle */}
      <motion.p 
        className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-8 flex items-center justify-center space-x-3"
        variants={itemVariants}
      >
        <Star className="w-5 h-5 text-cosmic flex-shrink-0" />
        <span>Our journey through international rover competitions and the milestones we've achieved</span>
        <Trophy className="w-5 h-5 text-mars flex-shrink-0" />
      </motion.p>

      {/* Competition Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto"
        variants={itemVariants}
      >
        {[
          { label: "Competitions", value: "25+", icon: <Trophy className="w-4 h-4" />, gradient: "from-mars to-orange-500" },
          { label: "Awards Won", value: "15+", icon: <Award className="w-4 h-4" />, gradient: "from-yellow-500 to-amber-500" },
          { label: "Global Rank", value: "Top 10", icon: <Star className="w-4 h-4" />, gradient: "from-cosmic to-blue-500" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-space-light/20 to-space-light/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center group hover:border-white/30 transition-all duration-300"
            whileHover={{ scale: 1.02, y: -2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
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

      {/* Navigation Buttons */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4"
        variants={itemVariants}
      >
        {navigationLinks.map((link, index) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={link.href}>
              <Button 
                variant={link.variant}
                className={`${link.className} px-6 py-3 rounded-xl font-medium text-base transition-all duration-300 group relative overflow-hidden`}
              >
                {/* Button background effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                
                <span className="relative z-10 flex items-center space-x-2">
                  {link.icon}
                  <span>{link.label}</span>
                </span>
              </Button>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Info */}
      <motion.div
        className="mt-8 text-center"
        variants={itemVariants}
      >
        <p className="text-white/60 text-sm">
          Discover our competitive journey spanning over a decade of innovation
        </p>
      </motion.div>
    </motion.div>
  );
};

export default CompetitionsHeader;
