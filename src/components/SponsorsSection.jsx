"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ExternalLink, Heart, Handshake, Star, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import Ansys from '@/mrt/sponsors/Ansys.png';
import Ruckus from '@/mrt/sponsors/Ruckus.png';
import SolidWorks from '@/mrt/sponsors/Solidworks.png';
import Servocity from '@/mrt/sponsors/servocity.png';
import Robu from '@/mrt/sponsors/Robu.in.png';
import SBGSystems from '@/mrt/sponsors/SBG_Systems.png';
import IITBombay from '@/mrt/sponsors/IIT_BOMBAY.png';

const SponsorCard = ({ name, logo, url, index, category, gradient }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      className="relative group w-full"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1 
      } : { 
        opacity: 0, 
        y: 40, 
        scale: 0.9 
      }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -8,
        scale: 1.05,
        rotateY: 5
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border border-white/20 w-full aspect-[4/3] group transition-all duration-300"
        whileTap={{ scale: 0.95 }}
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

        {/* Floating Sparkles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                x: [0, 20, 0],
                y: [0, -15, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
              style={{
                left: `${20 + i * 30}%`,
                top: `${20 + i * 25}%`,
              }}
            >
              <Sparkles className="w-2 h-2 text-cosmic/40" />
            </motion.div>
          ))}
        </div>

        {/* Logo Container with Fixed Dimensions */}
        <div className="relative z-10 h-full flex items-center justify-center p-6">
          <div className="w-full h-full flex items-center justify-center">
            <motion.img
              src={logo}
              alt={name}
              className="max-w-full max-h-full object-contain filter transition-all duration-500"
              style={{
                maxWidth: '120px',
                maxHeight: '60px',
                width: 'auto',
                height: 'auto'
              }}
              animate={{
                filter: isHovered 
                  ? "grayscale(0%) brightness(1.1) saturate(1.2)" 
                  : "grayscale(30%) brightness(0.9) saturate(0.8)",
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Category Badge */}
        <motion.div
          className="absolute top-3 right-3 px-2 py-1 rounded-full bg-gradient-to-r from-cosmic/80 to-blue-500/80 backdrop-blur-sm"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-xs text-white font-medium">{category}</span>
        </motion.div>

        {/* External Link Icon */}
        <motion.div
          className="absolute bottom-3 right-3 p-1.5 rounded-full bg-gradient-to-r from-mars/80 to-orange-500/80 backdrop-blur-sm"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
            rotate: isHovered ? 360 : 0
          }}
          transition={{ duration: 0.4 }}
        >
          <ExternalLink className="w-3 h-3 text-white" />
        </motion.div>

        {/* Hover Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent"
          animate={{
            borderColor: isHovered ? "rgba(0, 217, 255, 0.4)" : "transparent",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Partnership Level Indicator */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-mars to-cosmic rounded-full"
          initial={{ width: 0 }}
          animate={{ width: isInView ? "100%" : 0 }}
          transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
        />

        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "200%" : "-100%" }}
          transition={{ duration: 0.8 }}
        />
      </motion.a>
    </motion.div>
  );
};

const SponsorsSection = () => {
  const sectionRef = useRef(null);
  const [floatingIcons, setFloatingIcons] = useState([]);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const newIcons = Array.from({ length: 6 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setFloatingIcons(newIcons);
  }, []);

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const sponsors = [
    {
      name: "Ansys",
      logo: Ansys,
      url: "#",
      category: "Software",
      gradient: "bg-gradient-to-br from-red-500/20 to-orange-500/10"
    },
    {
      name: "Ruckus",
      logo: Ruckus,
      url: "#",
      category: "Networking",
      gradient: "bg-gradient-to-br from-green-500/20 to-emerald-500/10"
    },
    {
      name: "SolidWorks",
      logo: SolidWorks,
      url: "#",
      category: "Design",
      gradient: "bg-gradient-to-br from-blue-500/20 to-cyan-500/10"
    },
    {
      name: "Servocity",
      logo: Servocity,
      url: "#",
      category: "Hardware",
      gradient: "bg-gradient-to-br from-purple-500/20 to-indigo-500/10"
    },
    {
      name: "Robu",
      logo: Robu,
      url: "#",
      category: "Electronics",
      gradient: "bg-gradient-to-br from-yellow-500/20 to-amber-500/10"
    },
    {
      name: "SBG Systems",
      logo: SBGSystems,
      url: "#",
      category: "Navigation",
      gradient: "bg-gradient-to-br from-teal-500/20 to-cyan-500/10"
    },
    {
      name: "IIT Bombay",
      logo: IITBombay,
      url: "#",
      category: "Institution",
      gradient: "bg-gradient-to-br from-mars/20 to-orange-500/10"
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
      id="sponsors" 
      className="section-padding bg-gradient-to-br from-space-dark via-space to-space-dark relative overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <motion.div
        className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-l from-cosmic/10 to-blue-500/5 rounded-full blur-3xl"
        style={{ 
          y: backgroundY,
          scale: backgroundScale 
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 60, repeat: Infinity, ease: "linear" },
          scale: { duration: 18, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-gradient-to-r from-mars/10 to-orange-500/5 rounded-full blur-3xl"
        style={{ 
          y: backgroundY,
          scale: backgroundScale 
        }}
        animate={{
          rotate: [360, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          rotate: { duration: 55, repeat: Infinity, ease: "linear" },
          scale: { duration: 15, repeat: Infinity, ease: "easeInOut", delay: 5 }
        }}
      />

      {/* Floating Partnership Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((icon, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
            style={{
              left: icon.left,
              top: icon.top,
            }}
          >
            <Handshake className="w-5 h-5 text-white/10" />
          </motion.div>
        ))}
      </div>

      {/* Partnership Constellation Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <defs>
            <linearGradient id="partnershipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b35" />
              <stop offset="50%" stopColor="#ffd700" />
              <stop offset="100%" stopColor="#00d9ff" />
            </linearGradient>
          </defs>
          {[...Array(5)].map((_, i) => (
            <motion.circle
              key={i}
              cx={`${20 + i * 20}%`}
              cy={`${30 + (i % 2) * 40}%`}
              r="2"
              fill="url(#partnershipGradient)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                repeatDelay: 2
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
              Our Sponsors
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
            <Heart className="w-5 h-5 text-mars animate-pulse" />
            <span>We are grateful for the support of our sponsors who make our projects possible.</span>
          </motion.p>

          {/* Partnership Stats */}
          <motion.div
            className="flex items-center justify-center space-x-8 mt-8"
            variants={itemVariants}
          >
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-2xl font-bold text-gradient"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {sponsors.length}+
              </motion.div>
              <div className="text-white/60 text-sm">Partners</div>
            </motion.div>
            
            <div className="w-px h-8 bg-white/20"></div>
            
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-2xl font-bold text-gradient"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                5+
              </motion.div>
              <div className="text-white/60 text-sm">Categories</div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Sponsors Grid with Uniform Sizing */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {sponsors.map((sponsor, index) => (
            <SponsorCard 
              key={index} 
              {...sponsor} 
              index={index}
            />
          ))}
        </motion.div>

        {/* Partnership Message */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-space-light/20 to-space-light/10 rounded-full border border-white/10 backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Star className="w-5 h-5 text-cosmic" />
            <span className="text-white/80 font-medium">
              Interested in partnering with us? 
            </span>
            <motion.span
              className="text-cosmic cursor-pointer hover:text-cyan-300 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Get in touch
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsSection;
