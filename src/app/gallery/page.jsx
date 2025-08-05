"use client";

import React, { useState, useRef, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { X, Camera, Image as ImageIcon, ArrowLeft, ArrowRight, Calendar, MapPin, Eye, Download, Share2, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// All actual image imports
import RoverInLab from "@/../public/mrt/RoverInLab.png";
import TeamPhoto2023 from "@/../public/mrt/TeamPhoto.png";
import RoverFieldTesting from "@/../public/mrt/RoverFieldTesting.png";
import RoverField from "@/../public/mrt/RoverField.png";
import RoverArmCloseUp from "@/../public/mrt/RoverArmCloseUp.png";
import Roverwork from '@/../public/mrt/DSCN9715.png';
import RoverT from '@/../public/mrt/DSCN9799.png';
import roverFull from '@/../public/mrt/DSCN9731.png';
import roverLook from '@/../public/mrt/RoverArm.png';

// Optimized Image Card Component (unchanged)
const ImageCard = ({ image, index, viewMode, hoveredImage, imageLoadStates, handleImageLoad }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, margin: "-15% 0px -15% 0px", amount: 0.3 });

  // Memoized animation variants
  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 40, scale: 0.9, rotateX: 15 },
    visible: {
      opacity: 1, y: 0, scale: 1, rotateX: 0,
      transition: {
        duration: 0.6,
        delay: (index % 12) * 0.05,
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    },
    exit: {
      opacity: 0, y: -20, scale: 0.95, rotateX: -10,
      transition: { duration: 0.4, ease: "easeInOut" }
    }
  }), [index]);




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
      {/* Image Container */}
      <div className={cn(
        "relative overflow-hidden",
        viewMode === "grid" ? "aspect-square" : "w-32 h-32 flex-shrink-0 rounded-xl"
      )}>
        {/* Loading Placeholder */}
        {!imageLoadStates[index] && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-mars/20 to-cosmic/20 flex items-center justify-center"
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Camera className="w-8 h-8 text-white/40" />
            </motion.div>
          </motion.div>
        )}

        {/* Main Image - Enhanced with Next.js Image */}
        <div className="w-full h-full relative">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover object-center"
            onLoad={() => handleImageLoad(index)}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Enhanced Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-space/90 via-space/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Animated border effect */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{
            background: isHovered
              ? [
                  "linear-gradient(0deg, transparent, rgba(255, 107, 53, 0.3), transparent)",
                  "linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.3), transparent)",
                  "linear-gradient(180deg, transparent, rgba(255, 107, 53, 0.3), transparent)",
                  "linear-gradient(270deg, transparent, rgba(0, 217, 255, 0.3), transparent)",
                  "linear-gradient(360deg, transparent, rgba(255, 107, 53, 0.3), transparent)"
                ]
              : "linear-gradient(0deg, transparent, transparent, transparent)"
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
        />
      </div>

      {/* Enhanced Content Section */}
      <AnimatePresence>
        {(viewMode === "list" || isHovered) && (
          <motion.div
            className={cn(
              "relative z-10",
              viewMode === "list" ? "flex-1" : "absolute bottom-0 left-0 right-0 p-6"
            )}
            initial={{ opacity: 0, y: viewMode === "grid" ? 20 : 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: viewMode === "grid" ? 20 : 0 }}
            transition={{ duration: 0.3 }}
          >
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-mars/5 to-cosmic/5 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
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
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0, y: -30, scale: 1.05,
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0, opacity: 1, scale: 1,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
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

          {/* Enhanced Gallery Grid - All Images */}
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              className={cn(
                "gap-6",
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  : "flex flex-col space-y-6"
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
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
