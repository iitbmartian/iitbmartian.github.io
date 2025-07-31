'use client'
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Camera, 
  Image as ImageIcon, 
  Filter, 
  ZoomIn, 
  Star, 
  Sparkles, 
  Download, 
  Share2, 
  Heart, 
  Eye, 
  ArrowLeft, 
  ArrowRight, 
  Grid3X3, 
  List, 
  Search, 
  Calendar, 
  MapPin, 
  Award, 
  Users, 
  Rocket, 
  Target, 
  Cpu, 
  Globe 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

// Your existing imports
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredImage, setHoveredImage] = useState(null);
  const [imageLoadStates, setImageLoadStates] = useState({});
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [favoritedImages, setFavoritedImages] = useState(new Set());
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const categories = [
    { 
      name: "All", 
      id: "all", 
      icon: <Globe className="w-5 h-5" />, 
      gradient: "from-mars/40 to-cosmic/40",
      description: "All images"
    },
    { 
      name: "Rovers", 
      id: "rovers", 
      icon: <Rocket className="w-5 h-5" />, 
      gradient: "from-mars/40 to-orange-500/40",
      description: "Our Mars rovers"
    },
    { 
      name: "Competitions", 
      id: "competitions", 
      icon: <Award className="w-5 h-5" />, 
      gradient: "from-cosmic/40 to-blue-500/40",
      description: "Competition moments"
    },
    { 
      name: "Team", 
      id: "team", 
      icon: <Users className="w-5 h-5" />, 
      gradient: "from-purple-500/40 to-pink-500/40",
      description: "Team activities"
    },
    { 
      name: "Workshops", 
      id: "workshops", 
      icon: <Cpu className="w-5 h-5" />, 
      gradient: "from-green-500/40 to-emerald-500/40",
      description: "Learning sessions"
    },
    { 
      name: "Events", 
      id: "events", 
      icon: <Star className="w-5 h-5" />, 
      gradient: "from-yellow-500/40 to-amber-500/40",
      description: "Special events"
    }
  ];

  const galleryImages = [
    {
      src: RoverInLab,
      alt: "Rover in the lab",
      category: "rovers",
      date: "2024-01-15",
      location: "IIT Bombay Lab",
      description: "Our latest rover prototype undergoing final assembly and testing in the lab environment.",
      tags: ["rover", "lab", "assembly", "testing"],
      likes: 128,
      views: 1250
    },
    {
      src: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&h=600&fit=crop",
      alt: "Team at URC competition",
      category: "competitions",
      date: "2023-06-10",
      location: "Utah, USA",
      description: "Team MRT at the University Rover Challenge showcasing our capabilities.",
      tags: ["competition", "URC", "team", "achievement"],
      likes: 95,
      views: 890
    },
    {
      src: TeamPhoto2023,
      alt: "Team photo 2023",
      category: "team",
      date: "2023-08-20",
      location: "IIT Bombay",
      description: "Annual team photo with all subsystem members and mentors.",
      tags: ["team", "group", "annual", "members"],
      likes: 156,
      views: 2100
    },
    {
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
      alt: "Robotics workshop",
      category: "workshops",
      date: "2023-09-05",
      location: "Workshop Hall",
      description: "Interactive robotics workshop for new team members and enthusiasts.",
      tags: ["workshop", "learning", "robotics", "education"],
      likes: 73,
      views: 650
    },
    {
      src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      alt: "Tech exhibition",
      category: "events",
      date: "2023-10-15",
      location: "Tech Fest",
      description: "Showcasing our rover technology at the annual tech exhibition.",
      tags: ["exhibition", "showcase", "technology", "public"],
      likes: 87,
      views: 945
    },
    {
      src: RoverT,
      alt: "Rover in action",
      category: "rovers",
      date: "2024-02-20",
      location: "Test Field",
      description: "Dynamic testing of rover mobility and navigation systems.",
      tags: ["rover", "testing", "mobility", "navigation"],
      likes: 142,
      views: 1680
    },
    {
      src: RoverField,
      alt: "Rover field testing",
      category: "rovers",
      date: "2024-01-30",
      location: "Outdoor Test Site",
      description: "Field testing rover performance in simulated Mars terrain conditions.",
      tags: ["field", "testing", "terrain", "simulation"],
      likes: 165,
      views: 1890
    },
    {
      src: Roverwork,
      alt: "Rover assembly work",
      category: "rovers",
      date: "2023-12-10",
      location: "Workshop",
      description: "Team members working on rover subsystem integration.",
      tags: ["assembly", "work", "integration", "development"],
      likes: 98,
      views: 1120
    },
    {
      src: roverFull,
      alt: "Complete rover view",
      category: "rovers",
      date: "2024-03-01",
      location: "Display Area",
      description: "Complete assembled rover ready for mission deployment.",
      tags: ["complete", "assembled", "mission", "ready"],
      likes: 201,
      views: 2450
    },
    {
      src: roverLook,
      alt: "Rover arm mechanism",
      category: "rovers",
      date: "2024-01-25",
      location: "Lab Testing",
      description: "Detailed view of rover arm mechanism and control systems.",
      tags: ["arm", "mechanism", "control", "precision"],
      likes: 134,
      views: 1560
    },
    {
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
      alt: "Subsystem team meeting",
      category: "team",
      date: "2023-11-12",
      location: "Conference Room",
      description: "Weekly subsystem coordination meeting and progress review.",
      tags: ["meeting", "coordination", "progress", "teamwork"],
      likes: 67,
      views: 780
    },
    {
      src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      alt: "Electronics workshop",
      category: "workshops",
      date: "2023-09-20",
      location: "Electronics Lab",
      description: "Hands-on electronics workshop covering PCB design and components.",
      tags: ["electronics", "PCB", "components", "hands-on"],
      likes: 89,
      views: 1045
    },
    {
      src: RoverArnmCloseUp,
      alt: "Rover arm close-up",
      category: "rovers",
      date: "2024-02-05",
      location: "Detail Studio",
      description: "Close-up detail of rover arm joint mechanisms and sensors.",
      tags: ["closeup", "arm", "joints", "sensors"],
      likes: 176,
      views: 1970
    },
    {
      src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
      alt: "IRC competition",
      category: "competitions",
      date: "2023-04-18",
      location: "Delhi",
      description: "Team performance at the International Rover Challenge competition.",
      tags: ["IRC", "competition", "performance", "challenge"],
      likes: 112,
      views: 1340
    },
    {
      src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
      alt: "Team celebration",
      category: "team",
      date: "2023-07-22",
      location: "Campus",
      description: "Team celebrating successful rover testing milestone achievement.",
      tags: ["celebration", "milestone", "success", "achievement"],
      likes: 198,
      views: 2280
    },
    {
      src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
      alt: "Award ceremony",
      category: "events",
      date: "2023-08-30",
      location: "Auditorium",
      description: "Recognition ceremony for outstanding team performance and innovation.",
      tags: ["award", "ceremony", "recognition", "innovation"],
      likes: 145,
      views: 1650
    },
    {
      src: RoverFieldTesting,
      alt: "Rover outdoor testing",
      category: "rovers",
      date: "2024-02-28",
      location: "Desert Simulation",
      description: "Comprehensive outdoor testing in Mars-like desert conditions.",
      tags: ["outdoor", "desert", "simulation", "comprehensive"],
      likes: 187,
      views: 2140
    },
    {
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      alt: "Software workshop",
      category: "workshops",
      date: "2023-10-08",
      location: "Computer Lab",
      description: "Advanced software development workshop for rover control systems.",
      tags: ["software", "development", "control", "advanced"],
      likes: 94,
      views: 1125
    }
  ];

  // Update category counts
  const categoriesWithCounts = categories.map(cat => ({
    ...cat,
    count: cat.id === "all" ? galleryImages.length : galleryImages.filter(img => img.category === cat.id).length
  }));

  // Filter images
  const filteredImages = galleryImages.filter(img => {
    const matchesCategory = activeCategory === "all" || img.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      img.alt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleImageLoad = (index) => {
    setImageLoadStates(prev => ({ ...prev, [index]: true }));
  };

  const openLightbox = (imageSrc, index) => {
    setSelectedImage(imageSrc);
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setIsLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navigateLightbox = (direction) => {
    const newIndex = direction === 'next' 
      ? (selectedImageIndex + 1) % filteredImages.length
      : (selectedImageIndex - 1 + filteredImages.length) % filteredImages.length;
    
    setSelectedImageIndex(newIndex);
    setSelectedImage(filteredImages[newIndex].src);
  };

  const toggleFavorite = (index) => {
    setFavoritedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Simplified animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
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

  const gridItemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-dark via-space to-space-dark">
      
      <motion.section 
        ref={sectionRef}
        className="pt-32 pb-24 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Simplified Background Effects */}
        <div className="absolute inset-0">
          {/* Simple gradient orbs - no complex animations */}
          <div
            className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-l from-mars/15 to-orange-500/8 rounded-full blur-3xl opacity-60"
            style={{ transform: `translateY(${backgroundY}px)` }}
          />
          
          <div
            className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-gradient-to-r from-cosmic/15 to-blue-500/8 rounded-full blur-3xl opacity-60"
            style={{ transform: `translateY(${backgroundY}px)` }}
          />

          {/* Static grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 107, 53, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(64, 224, 255, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '120px 120px'
              }}
            />
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Simplified Header */}
          <motion.div
            className="text-center mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold font-orbitron bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent relative mb-6"
              variants={itemVariants}
            >
              Gallery
              <motion.div
                className=""
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed flex items-center justify-center space-x-3"
              variants={itemVariants}
            >
              <Sparkles className="w-6 h-6 text-cosmic" />
              <span>Witness our journey through space robotics, competitions, and innovations</span>
              <Sparkles className="w-6 h-6 text-mars" />
            </motion.p>

            {/* Simplified Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto"
              variants={itemVariants}
            >
              {[
                { label: "Total Images", value: galleryImages.length, icon: <ImageIcon className="w-5 h-5" />, gradient: "from-mars to-orange-500" },
                { label: "Categories", value: categoriesWithCounts.length - 1, icon: <Filter className="w-5 h-5" />, gradient: "from-cosmic to-blue-500" },
                { label: "Total Views", value: "18.5K", icon: <Eye className="w-5 h-5" />, gradient: "from-purple-500 to-pink-500" },
                { label: "Total Likes", value: "2.4K", icon: <Heart className="w-5 h-5" />, gradient: "from-green-500 to-emerald-500" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-space-light/20 to-space-light/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center group hover:border-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
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

          {/* Simplified Search */}
          <motion.div
            className="mb-12"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search images by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 pr-16 bg-space-light/20 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-cosmic/50 focus:ring-2 focus:ring-cosmic/20 transition-all duration-300"
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
              {searchQuery && (
                <motion.button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-4 h-4 text-white/70" />
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Simplified Filter Buttons */}
          <motion.div
            className="mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-6">
              <motion.button
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="p-3 bg-space-light/20 backdrop-blur-sm border border-white/20 rounded-xl text-white/70 hover:text-white hover:border-white/40 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {viewMode === "grid" ? <List className="w-5 h-5" /> : <Grid3X3 className="w-5 h-5" />}
              </motion.button>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {categoriesWithCounts.map((category, index) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "py-4 px-6 rounded-2xl flex items-center space-x-3 transition-all duration-300 border backdrop-blur-sm",
                    activeCategory === category.id 
                      ? "bg-gradient-to-r from-mars/20 to-cosmic/20 text-white border-white/30 shadow-lg" 
                      : "bg-space-light/20 text-white/70 hover:text-white border-white/10 hover:border-white/30"
                  )}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {category.icon}
                  <div>
                    <span className="font-medium">{category.name}</span>
                    <div className="text-xs text-white/50 group-hover:text-white/70">
                      {category.count} images
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          {/* Simplified Gallery Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${searchQuery}`}
              className={cn(
                "gap-6",
                viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
                  : "flex flex-col space-y-6"
              )}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={`${activeCategory}-${searchQuery}-${index}`}
                  variants={gridItemVariants}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl bg-gradient-to-br from-space-light/30 to-space-light/10 cursor-pointer border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-300",
                    viewMode === "list" && "flex items-center space-x-6 p-6"
                  )}
                  onClick={() => openLightbox(image.src, index)}
                  onMouseEnter={() => setHoveredImage(index)}
                  onMouseLeave={() => setHoveredImage(null)}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image Container */}
                  <div className={cn(
                    "relative overflow-hidden",
                    viewMode === "grid" ? "aspect-square" : "w-32 h-32 flex-shrink-0 rounded-xl"
                  )}>
                    {/* Loading Placeholder */}
                    {!imageLoadStates[index] && (
                      <div className="absolute inset-0 bg-gradient-to-br from-mars/20 to-cosmic/20 flex items-center justify-center">
                        <Camera className="w-8 h-8 text-white/40" />
                      </div>
                    )}
                    
                    {/* Main Image */}
                    <motion.img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-full object-cover"
                      onLoad={() => handleImageLoad(index)}
                      animate={{
                        scale: hoveredImage === index ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Gradient Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-space/90 via-space/20 to-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredImage === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Action Buttons */}
                    <motion.div
                      className="absolute top-4 right-4 flex space-x-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: hoveredImage === index ? 1 : 0,
                        scale: hoveredImage === index ? 1 : 0.8
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(index);
                        }}
                        className={cn(
                          "p-2 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300",
                          favoritedImages.has(index) 
                            ? "bg-red-500/80 text-white" 
                            : "bg-space-dark/80 text-white/70 hover:text-white"
                        )}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Heart className={cn("w-4 h-4", favoritedImages.has(index) && "fill-current")} />
                      </motion.button>
                      
                      <motion.button
                        className="p-2 bg-space-dark/80 rounded-full backdrop-blur-sm border border-white/20 text-white/70 hover:text-white transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ZoomIn className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                    
                    {/* Stats Overlay */}
                    <motion.div
                      className="absolute bottom-4 left-4 flex items-center space-x-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: hoveredImage === index ? 1 : 0,
                        y: hoveredImage === index ? 0 : 10
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center space-x-1 px-3 py-1 bg-space-dark/80 rounded-full backdrop-blur-sm">
                        <Eye className="w-3 h-3 text-white/70" />
                        <span className="text-xs text-white/70">{image.views}</span>
                      </div>
                      <div className="flex items-center space-x-1 px-3 py-1 bg-space-dark/80 rounded-full backdrop-blur-sm">
                        <Heart className="w-3 h-3 text-white/70" />
                        <span className="text-xs text-white/70">{image.likes}</span>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Content Section */}
                  {(viewMode === "list" || hoveredImage === index) && (
                    <motion.div
                      className={cn(
                        "relative z-10",
                        viewMode === "list" ? "flex-1" : "absolute bottom-0 left-0 right-0 p-6"
                      )}
                      initial={{ opacity: 0, y: viewMode === "grid" ? 10 : 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-white font-semibold text-lg mb-2">{image.alt}</h3>
                      <p className="text-white/70 text-sm mb-3 line-clamp-2">{image.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-white/50">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(image.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{image.location}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          {image.tags.slice(0, 2).map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className="px-2 py-1 bg-mars/20 text-mars text-xs rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {/* Empty State */}
          {filteredImages.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-flex p-8 bg-space-light/20 rounded-2xl mb-6 backdrop-blur-sm border border-white/10"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <ImageIcon className="w-16 h-16 text-white/40" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-white mb-2">No Images Found</h3>
              <p className="text-white/70 text-lg mb-6">
                {searchQuery 
                  ? `No images match "${searchQuery}" in the ${activeCategory === "all" ? "gallery" : activeCategory + " category"}.`
                  : `No images found in the ${activeCategory} category.`
                }
              </p>
              {searchQuery && (
                <motion.button
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-3 bg-gradient-to-r from-mars to-cosmic rounded-xl text-white font-medium hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear Search
                </motion.button>
              )}
            </motion.div>
          )}
        </div>
      </motion.section>
      
      {/* Simplified Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && selectedImage && (
          <motion.div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <motion.button 
              className="absolute top-8 right-8 text-white p-4 rounded-full bg-space-dark/80 hover:bg-space-dark backdrop-blur-sm border border-white/20 z-60 group"
              onClick={closeLightbox}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="h-6 w-6 group-hover:text-mars transition-colors duration-300" />
            </motion.button>
            
            {/* Navigation Buttons */}
            {filteredImages.length > 1 && (
              <>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox('prev');
                  }}
                  className="absolute left-8 top-1/2 transform -translate-y-1/2 p-4 bg-space-dark/80 hover:bg-space-dark rounded-full backdrop-blur-sm border border-white/20 text-white z-60 group"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-6 h-6 group-hover:text-cosmic transition-colors duration-300" />
                </motion.button>
                
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox('next');
                  }}
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 p-4 bg-space-dark/80 hover:bg-space-dark rounded-full backdrop-blur-sm border border-white/20 text-white z-60 group"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowRight className="w-6 h-6 group-hover:text-cosmic transition-colors duration-300" />
                </motion.button>
              </>
            )}
            
            {/* Image Container */}
            <motion.div
              className="relative max-w-[90vw] max-h-[80vh] mx-auto"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Enlarged view" 
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              />
              
              {/* Simple Image Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-cosmic/40" />
              
              {/* Image Info Panel */}
              {filteredImages[selectedImageIndex] && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-space/95 to-transparent backdrop-blur-sm p-6 rounded-b-2xl"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <h3 className="text-white text-xl font-semibold mb-2">
                    {filteredImages[selectedImageIndex].alt}
                  </h3>
                  <p className="text-white/80 text-sm mb-4">
                    {filteredImages[selectedImageIndex].description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm text-white/60">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(filteredImages[selectedImageIndex].date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{filteredImages[selectedImageIndex].location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>{filteredImages[selectedImageIndex].views} views</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <motion.button
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Download className="w-5 h-5 text-white" />
                      </motion.button>
                      <motion.button
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Share2 className="w-5 h-5 text-white" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default GalleryPage;
