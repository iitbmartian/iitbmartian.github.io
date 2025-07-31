'use client'
import React, { useRef, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Trophy, 
  Rocket, 
  Settings, 
  Camera, 
  Star, 
  Award,
  Target,
  Zap,
  Medal,
  Crown,
  Sparkles
} from 'lucide-react';

const CompetitionsHeader = () => {
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const statsRef = useRef(null);
  const navigationRef = useRef(null);
  
  // Enhanced useInView with bidirectional animations
  const titleInView = useInView(titleRef, { 
    once: false, 
    margin: "-10% 0px -10% 0px",
    amount: 0.3
  });

  const statsInView = useInView(statsRef, { 
    once: false, 
    margin: "-15% 0px -15% 0px",
    amount: 0.3
  });

  const navigationInView = useInView(navigationRef, { 
    once: false, 
    margin: "-15% 0px -15% 0px",
    amount: 0.3
  });

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"]
  });

  // Optimized transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.8, 0.3]);

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
        ease: "easeOut",
        staggerChildren: 0.1
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

  // Memoized navigation links
  const navigationLinks = useMemo(() => [
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
  ], []);

  return (
    <motion.div 
      ref={headerRef}
      className="text-center mb-20 relative overflow-hidden"
      variants={headerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-10%" }}
    >
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-mars/10 to-cosmic/10 rounded-full blur-3xl"
          style={{ 
            y: backgroundY,
            opacity: orbOpacity
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <motion.div 
          className="absolute top-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-cosmic/15 to-blue-500/10 rounded-full blur-2xl"
          style={{ opacity: orbOpacity }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Enhanced floating elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [0, -25, 0],
              opacity: [0.1, 0.4, 0.1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeInOut",
            }}
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
            }}
          >
            {i % 4 === 0 ? (
              <Trophy className="w-3 h-3 text-white/20" />
            ) : i % 4 === 1 ? (
              <Medal className="w-3 h-3 text-white/20" />
            ) : i % 4 === 2 ? (
              <Crown className="w-3 h-3 text-white/20" />
            ) : (
              <Star className="w-3 h-3 text-white/20" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Enhanced Main Title */}
      <motion.div
        ref={titleRef}
        className="relative inline-block mb-6"
        variants={itemVariants}
        initial="hidden"
        animate={titleInView ? "visible" : "exit"}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold font-orbitron bg-gradient-to-r from-mars via-yellow-500 to-cosmic bg-clip-text text-transparent relative"
          whileHover={{ scale: 1.03, y: -3 }}
          transition={{ duration: 0.3 }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
          }}
          style={{
            transition: {
              backgroundPosition: {
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }
            }
          }}
        >
          Competitive Records
          <motion.div
            className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-mars via-yellow-500 to-cosmic rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={titleInView ? { 
              width: "100%", 
              opacity: 1 
            } : { 
              width: 0, 
              opacity: 0 
            }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />
        </motion.h1>

        {/* Enhanced Decorative elements */}
        <motion.div 
          className="absolute -top-4 -right-4 text-yellow-500/60"
          animate={{ 
            rotate: [0, 15, -15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.3, rotate: 45 }}
        >
          <Trophy className="w-6 h-6" />
        </motion.div>
        
        <motion.div 
          className="absolute -top-2 -left-6 text-cosmic/60"
          animate={{ 
            rotate: [0, -15, 15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          whileHover={{ scale: 1.2, rotate: -45 }}
        >
          <Award className="w-5 h-5" />
        </motion.div>

        <motion.div 
          className="absolute -bottom-3 right-1/4 text-mars/60"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          whileHover={{ scale: 1.2 }}
        >
          <Medal className="w-4 h-4" />
        </motion.div>
      </motion.div>

      {/* Enhanced Subtitle */}
      <motion.p 
        className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-8 flex items-center justify-center space-x-3"
        variants={itemVariants}
        initial="hidden"
        animate={titleInView ? "visible" : "exit"}
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Star className="w-5 h-5 text-cosmic flex-shrink-0" />
        </motion.div>
        <span>Our journey through international rover competitions and the milestones we've achieved</span>
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          <Trophy className="w-5 h-5 text-mars flex-shrink-0" />
        </motion.div>
      </motion.p>

      {/* Enhanced Competition Stats */}
      <motion.div
        ref={statsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto"
        variants={sectionVariants}
        initial="hidden"
        animate={statsInView ? "visible" : "exit"}
      >
        {[
          { label: "Competitions", value: "25+", icon: <Trophy className="w-4 h-4" />, gradient: "from-mars to-orange-500" },
          { label: "Awards Won", value: "15+", icon: <Award className="w-4 h-4" />, gradient: "from-yellow-500 to-amber-500" },
          { label: "Global Rank", value: "Top 10", icon: <Star className="w-4 h-4" />, gradient: "from-cosmic to-blue-500" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-space-light/20 to-space-light/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center group hover:border-white/30 transition-all duration-300 perspective-1000"
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={statsInView ? { 
              opacity: 1, 
              y: 0, 
              scale: 1 
            } : { 
              opacity: 0, 
              y: 30, 
              scale: 0.8 
            }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 120,
              damping: 20
            }}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              rotateY: 5
            }}
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div 
              className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${stat.gradient}/20 mb-2`}
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <div className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.icon}
              </div>
            </motion.div>
            <motion.div 
              className="text-lg font-bold text-white mb-1"
              initial={{ scale: 0 }}
              animate={statsInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              {stat.value}
            </motion.div>
            <div className="text-xs text-white/70 group-hover:text-white/90 transition-colors duration-300">
              {stat.label}
            </div>

            {/* Enhanced glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-mars/5 to-cosmic/5 rounded-xl pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Navigation Buttons */}
      <motion.div 
        ref={navigationRef}
        className="flex flex-wrap justify-center gap-4"
        variants={sectionVariants}
        initial="hidden"
        animate={navigationInView ? "visible" : "exit"}
      >
        {navigationLinks.map((link, index) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={navigationInView ? { 
              opacity: 1, 
              y: 0, 
              scale: 1 
            } : { 
              opacity: 0, 
              y: 30, 
              scale: 0.9 
            }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 120
            }}
            whileHover={{ 
              scale: 1.08, 
              y: -5,
              boxShadow: index === 0 
                ? "0 10px 30px rgba(255, 107, 53, 0.3)"
                : index === 1 
                ? "0 10px 30px rgba(0, 217, 255, 0.3)"
                : "0 10px 30px rgba(255, 255, 255, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={link.href}>
              <Button 
                variant={link.variant}
                className={`${link.className} px-6 py-3 rounded-xl font-medium text-base transition-all duration-300 group relative overflow-hidden`}
              >
                {/* Enhanced Button background effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                
                <span className="relative z-10 flex items-center space-x-2">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {link.icon}
                  </motion.div>
                  <span>{link.label}</span>
                </span>
              </Button>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Quick Info */}
      <motion.div
        className="mt-8 text-center"
        variants={sectionVariants}
        initial="hidden"
        animate={navigationInView ? "visible" : "exit"}
      >
        <motion.p 
          className="text-white/60 text-sm flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-3 h-3" />
          </motion.div>
          <span>Discover our competitive journey spanning over a decade of innovation</span>
          <motion.div
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-3 h-3" />
          </motion.div>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default CompetitionsHeader;
