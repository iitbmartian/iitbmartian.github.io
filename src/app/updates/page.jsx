'use client';
import React, { useRef, useState } from 'react';
import { Calendar, Newspaper, ExternalLink, Star, Clock, TrendingUp } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

const UpdateCard = ({ title, date, image, content, link, index, category, priority }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const priorityColors = {
    high: {
      gradient: "from-mars/60 to-orange-600/40",
      border: "border-mars/30",
      badge: "from-mars/80 to-orange-500/80"
    },
    medium: {
      gradient: "from-cosmic/60 to-blue-500/40",
      border: "border-cosmic/30", 
      badge: "from-cosmic/80 to-blue-500/80"
    },
    low: {
      gradient: "from-purple-500/60 to-indigo-500/40",
      border: "border-purple-500/30",
      badge: "from-purple-500/80 to-indigo-500/80"
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group overflow-hidden"
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1 
      } : { 
        opacity: 0, 
        y: 30, 
        scale: 0.98 
      }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.05,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -6,
        scale: 1.02
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={`bg-gradient-to-br from-space-light/30 to-space-light/10 rounded-2xl overflow-hidden border ${priorityColors[priority].border} backdrop-blur-sm relative h-full hover:border-white/30 transition-all duration-300`}
      >
        {/* Simplified Background Gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${priorityColors[priority].gradient} opacity-0`}
          animate={{ 
            opacity: isHovered ? 0.1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Image Container */}
        {image && (
          <div className="relative h-48 overflow-hidden">
            {/* Simplified Image Placeholder */}
            <motion.div
              className={`w-full h-full bg-gradient-to-br ${priorityColors[priority].gradient} opacity-80 relative overflow-hidden`}
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Simple tech pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(255,255,255,0.1) 15px, rgba(255,255,255,0.1) 30px)`,
                }}
              />

              {/* News Icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Newspaper className="w-16 h-16 text-white/90" />
              </div>
            </motion.div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-space/90 via-space/30 to-transparent" />
            
            {/* Priority Badge */}
            <motion.div
              className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r ${priorityColors[priority].badge} backdrop-blur-sm`}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
            >
              <span className="text-xs text-white font-medium capitalize">{priority}</span>
            </motion.div>

            {/* Category Badge */}
            <motion.div
              className="absolute top-4 left-4 px-3 py-1 rounded-full bg-space-dark/80 backdrop-blur-sm border border-white/20"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + index * 0.05 }}
            >
              <span className="text-xs text-white/90 font-medium">{category}</span>
            </motion.div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-6 relative z-10">
          {/* Date */}
          <div className="flex items-center mb-4 group/date">
            <div className="p-1 bg-gradient-to-r from-cosmic/20 to-blue-500/20 rounded-full mr-3">
              <Calendar className="h-4 w-4 text-cosmic" />
            </div>
            <span className="text-white/70 text-sm group-hover/date:text-white/90 transition-colors duration-300">
              {date}
            </span>
          </div>

          {/* Title */}
          <motion.h3
            className="text-xl font-bold mb-4 font-orbitron relative leading-tight text-white group-hover:text-cosmic transition-colors duration-300"
          >
            {title}
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-mars to-cosmic rounded-full"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? "100%" : "0%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.h3>

          {/* Content */}
          <p className="text-white/80 mb-6 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
            {content}
          </p>

          {/* Link */}
          {link && (
            <motion.a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cosmic hover:text-cyan-300 flex items-center space-x-2 group/link transition-colors duration-300"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              <Newspaper className="h-4 w-4" />
              <span className="font-medium">Read full article</span>
              <ExternalLink className="h-3 w-3" />
            </motion.a>
          )}
        </div>

        {/* Reading Time Indicator */}
        <motion.div
          className="absolute bottom-4 right-4 flex items-center space-x-1 text-xs text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Clock className="w-3 h-3" />
          <span>2 min read</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const UpdatesPage = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const updates = [
    {
      title: "MRT secures top Indian team position at URC 2023",
      date: "June 15, 2023",
      image: "https://via.placeholder.com/600x400?text=URC+2023",
      content: "The Mars Rover Team from IIT Bombay secured the first position among all Indian teams at the University Rover Challenge 2023 held in Utah, USA.",
      link: "#",
      category: "Competition",
      priority: "high" 
    },
    {
      title: "New rover prototype unveiled at tech exhibition",
      date: "April 10, 2023", 
      image: "https://via.placeholder.com/600x400?text=New+Prototype",
      content: "MRT unveiled its latest rover prototype at the annual technology exhibition at IIT Bombay, showcasing advanced autonomous navigation capabilities.",
      link: "#",
      category: "Technology",
      priority: "medium" 
    },
    {
      title: "Team secures sponsorship from major tech company",
      date: "March 5, 2023",
      image: "https://via.placeholder.com/600x400?text=Sponsorship",
      content: "The Mars Rover Team has secured a major sponsorship that will help fund the development of next-generation rover systems and competition travel.",
      link: "#",
      category: "Partnership",
      priority: "high" 
    },
    {
      title: "MRT conducts workshop on robotics for high school students",
      date: "February 20, 2023",
      image: "https://via.placeholder.com/600x400?text=Workshop",
      content: "Team members conducted a hands-on workshop introducing high school students to fundamentals of robotics and space exploration technology.",
      link: "#",
      category: "Outreach",
      priority: "low" 
    },
    {
      title: "Excellence Award in Autonomous category at IRC 2023",
      date: "January 12, 2023",
      image: "https://via.placeholder.com/600x400?text=IRC+2023",
      content: "The team's hard work paid off with an Excellence Award in the Autonomous category at the International Rover Challenge 2023.",
      link: "#",
      category: "Achievement", 
      priority: "high" 
    },
    {
      title: "New team members onboarded for the 2023 season",
      date: "December 5, 2022",
      image: "https://via.placeholder.com/600x400?text=New+Members",
      content: "After a rigorous selection process, MRT welcomed 15 new members across various subsystems to strengthen the team for upcoming challenges.",
      link: "#",
      category: "Team",
      priority: "medium" 
    }
  ];

  // Simplified animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
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
    <div className="min-h-screen bg-gradient-to-br from-space-dark via-space to-space-dark">
      
      <section 
        ref={sectionRef}
        className="pt-32 pb-24 relative overflow-hidden"
      >
        {/* Simplified Background Effects */}
        <div className="absolute inset-0">
          {/* Simple gradient orbs - no complex animations */}
          <div
            className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-l from-mars/10 to-orange-500/5 rounded-full blur-3xl opacity-60"
            style={{ transform: `translateY(${backgroundY}px)` }}
          />
          
          <div
            className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-gradient-to-r from-cosmic/10 to-blue-500/5 rounded-full blur-3xl opacity-60"
            style={{ transform: `translateY(${backgroundY}px)` }}
          />

          {/* Static news pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="newsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6b35" />
                  <stop offset="50%" stopColor="#00d9ff" />
                  <stop offset="100%" stopColor="#ff6b35" />
                </linearGradient>
              </defs>
              {[...Array(6)].map((_, i) => (
                <line
                  key={i}
                  x1={`${5 + i * 18}%`}
                  y1="10%"
                  x2={`${15 + i * 18}%`}
                  y2="90%"
                  stroke="url(#newsGradient)"
                  strokeWidth="1"
                  opacity="0.3"
                />
              ))}
            </svg>
          </div>

          {/* Simple floating news icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
                <TrendingUp className="w-4 h-4 text-white/20" />
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Header Section */}
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold font-orbitron bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent relative mb-6"
              variants={itemVariants}
            >
              Updates & Media
              <motion.div
                className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-mars via-orange-500 to-cosmic rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed flex items-center justify-center space-x-3"
              variants={itemVariants}
            >
              <Star className="w-6 h-6 text-cosmic" />
              <span>Stay up to date with the latest news, achievements, and events from our team</span>
              <Newspaper className="w-6 h-6 text-mars" />
            </motion.p>

            {/* Update Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto"
              variants={itemVariants}
            >
              {[
                { label: "Latest Updates", value: updates.length, icon: <Newspaper className="w-5 h-5" />, gradient: "from-mars to-orange-500" },
                { label: "Categories", value: "6", icon: <Star className="w-5 h-5" />, gradient: "from-cosmic to-blue-500" },
                { label: "This Year", value: "2023", icon: <Calendar className="w-5 h-5" />, gradient: "from-purple-500 to-pink-500" },
                { label: "Read Time", value: "2 min", icon: <Clock className="w-5 h-5" />, gradient: "from-green-500 to-emerald-500" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-space-light/20 to-space-light/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center group hover:border-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.gradient}/20 mb-3`}>
                    <div className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Updates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {updates.map((update, index) => (
              <UpdateCard 
                key={index} 
                {...update} 
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default UpdatesPage;
