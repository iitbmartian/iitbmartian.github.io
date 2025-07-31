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
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1 
      } : { 
        opacity: 0, 
        y: 60, 
        scale: 0.9 
      }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -12,
        scale: 1.03,
        rotateY: 3
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={`bg-gradient-to-br from-space-light/30 to-space-light/10 rounded-2xl overflow-hidden border ${priorityColors[priority].border} backdrop-blur-sm relative h-full`}
        whileHover={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated Background Gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${priorityColors[priority].gradient} opacity-0`}
          animate={{ 
            opacity: isHovered ? 0.15 : 0,
            scale: isHovered ? 1 : 0.9
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Image Container */}
        {image && (
          <div className="relative h-48 overflow-hidden">
            {/* Image Placeholder with Enhanced Gradient */}
            <motion.div
              className={`w-full h-full bg-gradient-to-br ${priorityColors[priority].gradient} opacity-80 relative overflow-hidden`}
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.6 }}
            >
              {/* Animated Tech Pattern */}
              <motion.div
                className="absolute inset-0 opacity-20"
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

              {/* News Icon */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: isHovered ? 1.3 : 1,
                  rotate: isHovered ? [0, 10, -10, 0] : 0,
                }}
                transition={{ 
                  duration: isHovered ? 2 : 0.3,
                  repeat: isHovered ? Infinity : 0,
                }}
              >
                <Newspaper className="w-16 h-16 text-white/90" />
              </motion.div>

              {/* Floating Particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/40 rounded-full"
                    animate={{
                      x: [0, 40, 0],
                      y: [0, -30, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2.5 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeInOut",
                    }}
                    style={{
                      left: `${25 + i * 25}%`,
                      top: `${30 + i * 20}%`,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-space/90 via-space/30 to-transparent" />
            
            {/* Priority Badge */}
            <motion.div
              className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r ${priorityColors[priority].badge} backdrop-blur-sm`}
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.1, rotate: 360 }}
            >
              <span className="text-xs text-white font-medium capitalize">{priority}</span>
            </motion.div>

            {/* Category Badge */}
            <motion.div
              className="absolute top-4 left-4 px-3 py-1 rounded-full bg-space-dark/80 backdrop-blur-sm border border-white/20"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-xs text-white/90 font-medium">{category}</span>
            </motion.div>
          </div>
        )}

        {/* Content Section */}
        <motion.div
          className="p-6 relative z-10"
          animate={{
            y: isHovered ? -3 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Date */}
          <motion.div
            className="flex items-center mb-4 group/date"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="p-1 bg-gradient-to-r from-cosmic/20 to-blue-500/20 rounded-full mr-3"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Calendar className="h-4 w-4 text-cosmic" />
            </motion.div>
            <motion.span
              className="text-white/70 text-sm group-hover/date:text-white/90 transition-colors duration-300"
              animate={{
                color: isHovered ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.7)",
              }}
              transition={{ duration: 0.3 }}
            >
              {date}
            </motion.span>
          </motion.div>

          {/* Title */}
          <motion.h3
            className="text-xl font-bold mb-4 font-technospace relative leading-tight"
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

          {/* Content */}
          <motion.p
            className="text-white/80 mb-6 leading-relaxed"
            animate={{
              color: isHovered ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.8)",
            }}
            transition={{ duration: 0.3 }}
          >
            {content}
          </motion.p>

          {/* Link */}
          {link && (
            <motion.a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cosmic hover:text-cyan-300 flex items-center space-x-2 group/link relative overflow-hidden"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cosmic/10 to-transparent rounded"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              
              <div className="relative z-10 flex items-center space-x-2">
                <Newspaper className="h-4 w-4" />
                <span className="font-medium">Read full article</span>
                <motion.div
                  animate={{ x: isHovered ? [0, 3, 0] : 0 }}
                  transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
                >
                  <ExternalLink className="h-3 w-3" />
                </motion.div>
              </div>
            </motion.a>
          )}
        </motion.div>

        {/* Hover Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent"
          animate={{
            borderColor: isHovered ? "rgba(0, 217, 255, 0.4)" : "transparent",
          }}
          transition={{ duration: 0.3 }}
        />

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
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

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
    <div className="min-h-screen bg-gradient-to-br from-space via-space-dark to-space">
      <Navbar />
      
      <section 
        ref={sectionRef}
        className="pt-28 pb-20 bg-gradient-to-br from-space-dark via-space to-space-dark relative overflow-hidden"
      >
        {/* Enhanced Background Effects */}
        <motion.div
          className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-l from-mars/10 to-orange-500/5 rounded-full blur-3xl"
          style={{ 
            y: backgroundY,
            scale: backgroundScale 
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            rotate: { duration: 90, repeat: Infinity, ease: "linear" },
            scale: { duration: 30, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-gradient-to-r from-cosmic/10 to-blue-500/5 rounded-full blur-3xl"
          style={{ 
            y: backgroundY,
            scale: backgroundScale 
          }}
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            rotate: { duration: 85, repeat: Infinity, ease: "linear" },
            scale: { duration: 25, repeat: Infinity, ease: "easeInOut", delay: 8 }
          }}
        />

        {/* Floating News Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                y: [0, -35, 0],
                rotate: [0, 360],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 18 + i * 2,
                repeat: Infinity,
                delay: i * 1.8,
                ease: "easeInOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <TrendingUp className="w-4 h-4 text-white/10" />
            </motion.div>
          ))}
        </div>

        {/* News Pattern Lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-5">
            <defs>
              <linearGradient id="newsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6b35" />
                <stop offset="50%" stopColor="#00d9ff" />
                <stop offset="100%" stopColor="#ff6b35" />
              </linearGradient>
            </defs>
            {[...Array(6)].map((_, i) => (
              <motion.line
                key={i}
                x1={`${5 + i * 18}%`}
                y1="10%"
                x2={`${15 + i * 18}%`}
                y2="90%"
                stroke="url(#newsGradient)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: [0, 0.4, 0],
                }}
                transition={{
                  pathLength: { duration: 4, delay: i * 0.5 },
                  opacity: { duration: 4, delay: i * 0.5, repeat: Infinity, repeatDelay: 6 }
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
            <motion.h1 
              className="section-title relative inline-block"
              variants={itemVariants}
            >
              <span className="relative">
                Updates & Media
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-mars via-orange-500 to-cosmic rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              </span>
            </motion.h1>
            
            <motion.p 
              className="section-subtitle flex items-center justify-center space-x-2"
              variants={itemVariants}
            >
              <Star className="w-5 h-5 text-cosmic" />
              <span>Stay up to date with the latest news, achievements, and events from our team.</span>
            </motion.p>

            {/* Update Stats */}
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
                  {updates.length}+
                </motion.div>
                <div className="text-white/60 text-sm">Latest Updates</div>
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
                  2023
                </motion.div>
                <div className="text-white/60 text-sm">Current Year</div>
              </motion.div>
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
