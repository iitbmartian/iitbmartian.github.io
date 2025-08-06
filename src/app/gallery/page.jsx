"use client";

import React, { useState, useRef, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { X, Camera, Image as ImageIcon, ArrowLeft, ArrowRight, Calendar, MapPin, Eye, Download, Share2, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// All actual image imports (keeping your existing imports)
import RoverInLab from "@/../public/mrt/RoverInLab.png";
import TeamPhoto2023 from "@/../public/mrt/TeamPhoto.png";
import RoverFieldTesting from "@/../public/mrt/RoverFieldTesting.png";
import RoverField from "@/../public/mrt/RoverField.png";
import RoverArmCloseUp from "@/../public/mrt/RoverArmCloseUp.png";
import Roverwork from '@/../public/mrt/DSCN9715.png';
import RoverT from '@/../public/mrt/DSCN9799.png';
import roverFull from '@/../public/mrt/DSCN9731.png';
import roverLook from '@/../public/mrt/RoverArm.png';

// Enhanced Image Card Component with bottom-to-top animation
const ImageCard = ({ image, index, viewMode, hoveredImage, setHoveredImage, openLightbox, favoritedImages, toggleFavorite, imageLoadStates, handleImageLoad }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  
  // More sensitive viewport detection for smoother animations
  const isInView = useInView(cardRef, { 
    once: false, 
    margin: "-20% 0px -20% 0px", 
    amount: 0.2 
  });
  
  const imageInView = useInView(imageRef, { 
    once: false, 
    margin: "-15% 0px -15% 0px", 
    amount: 0.3 
  });

  // Enhanced animation variants with stronger bottom-to-top effect
  const cardVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 100,  // Increased from 40 to 100 for more dramatic effect
      scale: 0.8, 
      rotateX: 20  // Increased rotation for more 3D effect
    },
    visible: {
      opacity: 1, 
      y: 0, 
      scale: 1, 
      rotateX: 0,
      transition: {
        duration: 0.9,  // Increased duration for smoother animation
        delay: (index % 12) * 0.08,  // Slightly longer stagger
        type: "spring",
        stiffness: 100,  // Reduced stiffness for smoother movement
        damping: 25
      }
    },
    exit: {
      opacity: 0, 
      y: -40, 
      scale: 0.9, 
      rotateX: -15,
      transition: { 
        duration: 0.5, 
        ease: "easeInOut" 
      }
    }
  }), [index]);

  // Separate animation variants for the image container
  const imageContainerVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 80,  // Strong bottom-to-top movement
      scale: 0.85,
      rotateY: 10  // Slight Y-axis rotation for 3D effect
    },
    visible: {
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1.0,
        delay: (index % 12) * 0.1 + 0.3,  // Delayed after card animation
        type: "spring",
        stiffness: 110,
        damping: 22,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }), [index]);

  // Image loading animation
  const imageVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      scale: 1.1,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1, 
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  }), []);

  const isHovered = hoveredImage === index;

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-gradient-to-br from-space-light/30 to-space-light/10 cursor-pointer border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-300 perspective-1000",
        viewMode === "list" && "flex items-center space-x-6 p-6"
      )}

      whileTap={{ scale: 0.98 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Enhanced Image Container with bottom-to-top animation */}
      <motion.div 
        ref={imageRef}
        className={cn(
          "relative overflow-hidden",
          viewMode === "grid" ? "aspect-square" : "w-32 h-32 flex-shrink-0 rounded-xl"
        )}
        variants={imageContainerVariants}
        initial="hidden"
        animate={imageInView ? "visible" : "hidden"}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Enhanced Loading Placeholder */}
        {!imageLoadStates[index] && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-mars/20 to-cosmic/20 flex items-center justify-center"
            animate={{ 
              backgroundPosition: ["0% 0%", "100% 100%"],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              <Camera className="w-8 h-8 text-white/40" />
            </motion.div>
          </motion.div>
        )}

        {/* Enhanced Main Image with Next.js Image */}
        <motion.div 
          className="w-full h-full relative"
          variants={imageVariants}
          initial="hidden"
          animate={imageLoadStates[index] ? "visible" : "hidden"}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover object-center"
            onLoad={() => handleImageLoad(index)}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            style={{ objectFit: 'cover' }}
          />
        </motion.div>

        {/* Enhanced Gradient Overlay with smoother animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-space/90 via-space/20 to-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {/* Enhanced animated border effect */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{
            background: isHovered
              ? [
                  "linear-gradient(0deg, transparent, rgba(255, 107, 53, 0.4), transparent)",
                  "linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.4), transparent)",
                  "linear-gradient(180deg, transparent, rgba(255, 107, 53, 0.4), transparent)",
                  "linear-gradient(270deg, transparent, rgba(0, 217, 255, 0.4), transparent)",
                  "linear-gradient(360deg, transparent, rgba(255, 107, 53, 0.4), transparent)"
                ]
              : "linear-gradient(0deg, transparent, transparent, transparent)",
            scale: isHovered ? 1.02 : 1
          }}
          transition={{ 
            duration: 2.5, 
            repeat: isHovered ? Infinity : 0,
            ease: "linear"
          }}
        />

        {/* Category badge with enhanced animation */}
        <motion.div
          className="absolute top-3 left-3 z-20"
          initial={{ opacity: 0, x: -20, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : -20,
            scale: isHovered ? 1 : 0.8
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <span className="px-3 py-1 bg-mars/80 text-white text-xs font-semibold rounded-full backdrop-blur-sm border border-white/20">
            {image.category}
          </span>
        </motion.div>

        {/* View icon with enhanced animation */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.5,
            rotate: isHovered ? 0 : -180
          }}
          transition={{ duration: 0.4, ease: "backOut" }}
        >
          <div className="bg-white/20 backdrop-blur-md rounded-full p-4 border border-white/30">
            <Eye className="w-6 h-6 text-white" />
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced Content Section */}
      <AnimatePresence>
        {(viewMode === "list" || isHovered) && (
          <motion.div
            className={cn(
              "relative z-10",
              viewMode === "list" ? "flex-1" : "absolute bottom-0 left-0 right-0 p-6"
            )}
            initial={{ 
              opacity: 0, 
              y: viewMode === "grid" ? 30 : 0,
              scale: 0.95
            }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: 1
            }}
            exit={{ 
              opacity: 0, 
              y: viewMode === "grid" ? 30 : 0,
              scale: 0.95
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.h3 
              className="text-white font-semibold text-lg mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {image.alt}
            </motion.h3>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-mars/8 to-cosmic/8 rounded-2xl pointer-events-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.02 : 0.9
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

const GalleryPage = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [imageLoadStates, setImageLoadStates] = useState({});
  const [viewMode, setViewMode] = useState("grid");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [favoritedImages, setFavoritedImages] = useState(new Set());

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const headerInView = useInView(headerRef, { once: false, margin: "-10% 0px -10% 0px", amount: 0.3 });

  // Optimized transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.8, 0.3]);

  // Gallery images - all images shown without filtering
  const galleryImages = useMemo(() => [
    {
      src: RoverInLab,
      alt: "Rover in the lab",
      category: "rovers",
    },
    {
      src: TeamPhoto2023,
      alt: "Team photo 2023",
      category: "team",
    },
    {
      src: RoverFieldTesting,
      alt: "Rover field testing",
      category: "rovers",
    },
    {
      src: RoverField,
      alt: "Rover testing",
      category: "rovers",
    },
    {
      src: RoverArmCloseUp,
      alt: "Rover arm close-up",
      category: "rovers",
    },
    {
      src: Roverwork,
      alt: "Rover in action",
      category: "rovers",
    },
    {
      src: RoverT,
      alt: "Rover in action",
      category: "rovers",
    },
    {
      src: roverFull,
      alt: "Rover full view",
      category: "rovers",
    },
    {
      src: roverLook,
      alt: "Rover testing",
      category: "rovers",
    }
  ], []);

  // Optimized event handlers
  const handleImageLoad = useCallback((index) => {
    setImageLoadStates(prev => ({ ...prev, [index]: true }));
  }, []);

  const openLightbox = useCallback((imageSrc, index) => {
    setSelectedImage(imageSrc);
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    setIsLightboxOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  const navigateLightbox = useCallback((direction) => {
    const newIndex = direction === 'next'
      ? (selectedImageIndex + 1) % galleryImages.length
      : (selectedImageIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImageIndex(newIndex);
    setSelectedImage(galleryImages[newIndex].src);
  }, [selectedImageIndex, galleryImages]);

  const toggleFavorite = useCallback((index) => {
    setFavoritedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  // Enhanced animation variants
  const headerVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    },
    exit: {
      opacity: 0, y: -40, scale: 1.05,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: 40, opacity: 0, scale: 0.9 },
    visible: {
      y: 0, opacity: 1, scale: 1,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-dark via-space to-space-dark">
      <motion.section
        ref={sectionRef}
        className="pt-32 pb-24 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-l from-mars/15 to-orange-500/8 rounded-full blur-3xl"
            style={{ y: backgroundY, opacity: orbOpacity }}
          />
          <motion.div
            className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-gradient-to-r from-cosmic/15 to-blue-500/8 rounded-full blur-3xl"
            style={{ y: backgroundY, opacity: orbOpacity }}
          />

          {/* Enhanced grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <motion.div
              className="absolute inset-0"
              animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 107, 53, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(64, 224, 255, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '120px 120px'
              }}
            />
          </div>

          {/* Floating gallery icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.1, 0.4, 0.1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 15 + i * 3,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${15 + Math.random() * 70}%`,
                  top: `${15 + Math.random() * 70}%`,
                }}
              >
                <Camera className="w-4 h-4 text-white/20" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Enhanced Header */}
          <motion.div
            ref={headerRef}
            className="text-center mb-20"
            variants={headerVariants}
            initial="hidden"
            animate={headerInView ? "visible" : "exit"}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold font-orbitron bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent relative mb-6"
              variants={itemVariants}
            >
              Gallery
            </motion.h1>
            <motion.p
              className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed flex items-center justify-center space-x-3"
              variants={itemVariants}
            >
              <Sparkles className="w-6 h-6 text-cosmic" />
              <span>Witness our journey through space robotics, competitions, and innovations</span>
              <Sparkles className="w-6 h-6 text-mars" />
            </motion.p>
          </motion.div>

          {/* Enhanced Gallery Grid with bottom-to-top animations */}
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              className={cn(
                "gap-6",
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  : "flex flex-col space-y-6"
              )}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.6,
                staggerChildren: 0.1,
                delayChildren: 0.2
              }}
            >
              {galleryImages.map((image, index) => (
                <ImageCard
                  key={`${viewMode}-${index}`}
                  image={image}
                  index={index}
                  viewMode={viewMode}
                  hoveredImage={hoveredImage}
                  setHoveredImage={setHoveredImage}
                  openLightbox={openLightbox}
                  favoritedImages={favoritedImages}
                  toggleFavorite={toggleFavorite}
                  imageLoadStates={imageLoadStates}
                  handleImageLoad={handleImageLoad}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.section>
    </div>
  );
};

export default GalleryPage;
