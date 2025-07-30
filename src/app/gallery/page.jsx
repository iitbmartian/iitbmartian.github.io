'use client'
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { X, Camera, Image as ImageIcon, Filter, ZoomIn, Star, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import RoverInLab from "@/mrt/RoverInLab.png";
import TeamPhoto2023 from "@/mrt/TeamPhoto.png";
import RoverFieldTesting from "@/mrt/RoverFieldTesting.png";
import RoverField from "@/mrt/RoverField.png";
import RoverArnmCloseUp from "@/mrt/RoverArmCloseUp.png";
import Roverwork from '@/mrt/DSCN9715.png';
import RoverT from '@/mrt/DSCN9799.png';
import roverFull from '@/mrt/DSCN9731.png';
import roverLook from '@/mrt/RoverArm.png';

const GalleryPage = () => {
  const sectionRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredImage, setHoveredImage] = useState(null);
  const [imageLoadStates, setImageLoadStates] = useState({});
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const categories = [
    { name: "All", id: "all", icon: <ImageIcon className="w-4 h-4" />, gradient: "from-mars/30 to-cosmic/30" },
    { name: "Rovers", id: "rovers", icon: <Camera className="w-4 h-4" />, gradient: "from-mars/30 to-orange-500/30" },
    { name: "Competitions", id: "competitions", icon: <Star className="w-4 h-4" />, gradient: "from-cosmic/30 to-blue-500/30" },
    { name: "Team", id: "team", icon: <Sparkles className="w-4 h-4" />, gradient: "from-purple-500/30 to-pink-500/30" },
    { name: "Workshops", id: "workshops", icon: <Filter className="w-4 h-4" />, gradient: "from-green-500/30 to-emerald-500/30" },
    { name: "Events", id: "events", icon: <ZoomIn className="w-4 h-4" />, gradient: "from-yellow-500/30 to-amber-500/30" }
  ];

  const galleryImages = [
    {
      src: RoverInLab,
      alt: "Rover in the lab",
      category: "rovers"
    },
    {
      src: "https://via.placeholder.com/800x600?text=Competition+1",
      alt: "Team at URC competition",
      category: "competitions"
    },
    {
      src: TeamPhoto2023,
      alt: "Team photo 2023",
      category: "team"
    },
    {
      src: "https://via.placeholder.com/800x600?text=Workshop+1",
      alt: "Robotics workshop",
      category: "workshops"
    },
    {
      src: "https://via.placeholder.com/800x600?text=Event+1",
      alt: "Tech exhibition",
      category: "events"
    },
    {
      src: RoverT,
      alt: "Rover in action",
      category: "rovers"
    },
    {
      src: RoverField,
      alt: "Rover testing",
      category: "rovers"
    },
    {
      src: Roverwork,
      alt: "Rover in action",
      category: "rovers"
    },
    {
      src: roverFull,
      alt: "Rover full view",
      category: "rovers"
    },
    {
      src: roverLook,
      alt: "Rover testing",
      category: "rovers"
    },
    {
      src: "https://via.placeholder.com/800x600?text=Team+Photo+2",
      alt: "Subsystem team",
      category: "team"
    },
    {
      src: "https://via.placeholder.com/800x600?text=Workshop+2",
      alt: "Electronics workshop",
      category: "workshops"
    },
    {
      src: RoverArnmCloseUp,
      alt: "Rover arm close-up",
      category: "rovers"
    },
    {
      src: "https://via.placeholder.com/800x600?text=Competition+3",
      alt: "IRC competition",
      category: "competitions"
    },
    {
      src: "https://via.placeholder.com/800x600?text=Team+Photo+3",
      alt: "Team celebration",
      category: "team"
    },
    {
      src: "https://via.placeholder.com/800x600?text=Event+2",
      alt: "Award ceremony",
      category: "events"
    },
    {
      src: RoverFieldTesting,
      alt: "Rover field testing",
      category: "rovers"
    },
    {
      src: "https://via.placeholder.com/800x600?text=Workshop+3",
      alt: "Software workshop",
      category: "workshops"
    }
  ];

  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const handleImageLoad = (index) => {
    setImageLoadStates(prev => ({ ...prev, [index]: true }));
  };

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

  const gridItemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-space via-space-dark to-space">
      <Navbar />
      
      <motion.section 
        ref={sectionRef}
        className="pt-28 pb-20 bg-gradient-to-br from-space-dark via-space to-space-dark relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Enhanced Background Effects */}
        <motion.div
          className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-l from-mars/15 to-orange-500/8 rounded-full blur-3xl"
          style={{ 
            y: backgroundY,
            scale: backgroundScale 
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            rotate: { duration: 200, repeat: Infinity, ease: "linear" },
            scale: { duration: 70, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-gradient-to-r from-cosmic/15 to-blue-500/8 rounded-full blur-3xl"
          style={{ 
            y: backgroundY,
            scale: backgroundScale 
          }}
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            rotate: { duration: 190, repeat: Infinity, ease: "linear" },
            scale: { duration: 65, repeat: Infinity, ease: "easeInOut", delay: 18 }
          }}
        />

        {/* Floating Camera Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                y: [0, -70, 0],
                rotate: [0, 360],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 35 + i * 5,
                repeat: Infinity,
                delay: i * 4,
                ease: "easeInOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <Camera className="w-5 h-5 text-white/10" />
            </motion.div>
          ))}
        </div>

        {/* Gallery Frame Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-5">
            <defs>
              <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6b35" />
                <stop offset="50%" stopColor="#00d9ff" />
                <stop offset="100%" stopColor="#ff6b35" />
              </linearGradient>
            </defs>
            {[...Array(6)].map((_, i) => (
              <motion.rect
                key={i}
                x={`${i * 18}%`}
                y={`${10 + (i % 2) * 30}%`}
                width="60"
                height="40"
                fill="none"
                stroke="url(#frameGradient)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: [0, 0.4, 0],
                }}
                transition={{
                  pathLength: { duration: 4, delay: i * 0.5 },
                  opacity: { duration: 4, delay: i * 0.5, repeat: Infinity, repeatDelay: 8 }
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
                Gallery
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
              <Camera className="w-5 h-5 text-cosmic" />
              <span>A visual journey through our projects, competitions, and team activities.</span>
            </motion.p>

            {/* Gallery Stats */}
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
                  {galleryImages.length}+
                </motion.div>
                <div className="text-white/60 text-sm">Total Images</div>
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
                  {categories.length - 1}
                </motion.div>
                <div className="text-white/60 text-sm">Categories</div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Filter Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "py-3 px-6 rounded-xl flex items-center space-x-2 transition-all duration-300 relative overflow-hidden border backdrop-blur-sm",
                  activeCategory === category.id 
                    ? "bg-gradient-to-r from-mars to-cosmic text-white border-white/30 shadow-lg" 
                    : "bg-space-light/20 text-white/70 hover:text-white border-white/10 hover:border-white/20"
                )}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {/* Background Gradient Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0`}
                  animate={{ 
                    opacity: activeCategory === category.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div
                  className="relative z-10"
                  animate={{ rotate: activeCategory === category.id ? 360 : 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {category.icon}
                </motion.div>
                <span className="relative z-10 font-medium">{category.name}</span>
                
                {/* Active Indicator */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-mars to-cosmic rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeCategory === category.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </motion.div>
          
          {/* Gallery Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={`${activeCategory}-${index}`}
                  variants={gridItemVariants}
                  className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-space-light/30 to-space-light/10 cursor-pointer border border-white/10 backdrop-blur-sm"
                  onClick={() => setSelectedImage(image.src)}
                  onMouseEnter={() => setHoveredImage(index)}
                  onMouseLeave={() => setHoveredImage(null)}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden">
                    {/* Loading Placeholder */}
                    {!imageLoadStates[index] && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-mars/20 to-cosmic/20 flex items-center justify-center"
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Camera className="w-8 h-8 text-white/40" />
                      </motion.div>
                    )}
                    
                    {/* Main Image */}
                    <motion.img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-full object-cover object-center"
                      onLoad={() => handleImageLoad(index)}
                      animate={{
                        scale: hoveredImage === index ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                    />
                    
                    {/* Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-space/80 via-transparent to-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredImage === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Zoom Icon */}
                    <motion.div
                      className="absolute top-4 right-4 p-2 bg-space-dark/80 rounded-full backdrop-blur-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: hoveredImage === index ? 1 : 0,
                        scale: hoveredImage === index ? 1 : 0.8
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ZoomIn className="w-4 h-4 text-white" />
                    </motion.div>
                    
                    {/* Image Title */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-3"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ 
                        y: hoveredImage === index ? 0 : 20,
                        opacity: hoveredImage === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-white text-sm font-medium">{image.alt}</p>
                    </motion.div>
                  </div>
                  
                  {/* Hover Border Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-transparent"
                    animate={{
                      borderColor: hoveredImage === index ? "rgba(0, 217, 255, 0.4)" : "transparent",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {/* Empty State */}
          {filteredImages.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-flex p-6 bg-space-light/20 rounded-2xl mb-4"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ImageIcon className="w-12 h-12 text-white/40" />
              </motion.div>
              <p className="text-white/70 text-lg">No images found in this category.</p>
            </motion.div>
          )}
        </div>
      </motion.section>
      
      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <motion.button 
              className="absolute top-6 right-6 text-white p-3 rounded-full bg-space-dark/80 hover:bg-space-dark/90 transition-colors backdrop-blur-sm border border-white/10 z-60"
              onClick={() => setSelectedImage(null)}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="h-6 w-6" />
            </motion.button>
            
            {/* Image Container */}
            <motion.div
              className="relative max-w-[90vw] max-h-[90vh]"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Enlarged view" 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
              
              {/* Image Border Glow */}
              <motion.div
                className="absolute inset-0 rounded-lg border-2 border-gradient-to-r from-mars via-cosmic to-mars opacity-50"
                animate={{
                  borderColor: ["rgba(255, 107, 53, 0.5)", "rgba(0, 217, 255, 0.5)", "rgba(255, 107, 53, 0.5)"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
};

export default GalleryPage;
