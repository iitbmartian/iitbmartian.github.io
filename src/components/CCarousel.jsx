'use client'
import React, { useState, useRef } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FaArrowLeft, FaArrowRight, FaEye } from 'react-icons/fa'
import { BsArrowRight } from 'react-icons/bs'
import { HiSparkles } from 'react-icons/hi'
import { Star, Rocket, Award, Target, Crown, Medal } from 'lucide-react'
import { useRouter } from 'next/navigation'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1280 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1280, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
};

const CCarousel = () => {
  const router = useRouter()
  const [hoveredImage, setHoveredImage] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Generate array of image objects for IIT Bombay images
  const images = Array.from({ length: 13 }, (_, index) => ({
    id: index + 1,
    src: `/iit-bombay-images/${index + 1}.jpg`,
    alt: `IIT Bombay Image ${index + 1}`,
    title: `IIT Bombay Campus ${index + 1}`,
    description: `Explore the architectural excellence and academic atmosphere of IIT Bombay's prestigious campus.`
  }))

  // Custom Arrow Components
  const CustomLeftArrow = ({ onClick, ...rest }) => (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(64, 224, 255, 0.6)" }}
      whileTap={{ scale: 0.9 }}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-space-light/90 backdrop-blur-sm rounded-full shadow-cosmic border border-cosmic/30 flex items-center justify-center text-white hover:text-cosmic hover:border-cosmic transition-all duration-300 group"
    >
      <FaArrowLeft className="group-hover:animate-bounce" />
    </motion.button>
  )

  const CustomRightArrow = ({ onClick, ...rest }) => (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(64, 224, 255, 0.6)" }}
      whileTap={{ scale: 0.9 }}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-space-light/90 backdrop-blur-sm rounded-full shadow-cosmic border border-cosmic/30 flex items-center justify-center text-white hover:text-cosmic hover:border-cosmic transition-all duration-300 group"
    >
      <FaArrowRight className="group-hover:animate-bounce" />
    </motion.button>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-dark via-space to-space-light py-16 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-mars/15 to-stellar/15 rounded-full blur-3xl"
          animate={{
            rotate: [0, 180, 360],
            x: [0, 20, -20, 0],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 15, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        <motion.div
          className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-cosmic/15 to-nebula/15 rounded-full blur-3xl"
          animate={{
            rotate: [360, 180, 0],
            x: [0, -30, 30, 0],
            scale: [1, 0.8, 1.2, 1]
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            x: { duration: 15, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 18, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Stellar accent orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-stellar/10 to-nebula/10 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            scale: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Enhanced floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                y: [0, -40, 0],
                opacity: [0.1, 0.6, 0.1],
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 20 + i * 4,
                repeat: Infinity,
                delay: i * 2.5,
                ease: "easeInOut",
              }}
              style={{
                left: `${5 + Math.random() * 90}%`,
                top: `${5 + Math.random() * 90}%`,
              }}
            >
              {i % 8 === 0 ? (
                <Star className="w-4 h-4 text-stellar/30" />
              ) : i % 8 === 1 ? (
                <Rocket className="w-4 h-4 text-cosmic/30" />
              ) : i % 8 === 2 ? (
                <Award className="w-4 h-4 text-mars/30" />
              ) : i % 8 === 3 ? (
                <Target className="w-4 h-4 text-nebula/30" />
              ) : i % 8 === 4 ? (
                <Crown className="w-3 h-3 text-stellar/30" />
              ) : i % 8 === 5 ? (
                <Medal className="w-3 h-3 text-cosmic/30" />
              ) : i % 8 === 6 ? (
                <div className="w-2 h-2 bg-stellar rounded-full animate-pulse" />
              ) : (
                <div className="w-3 h-3 bg-gradient-to-r from-nebula to-cosmic rounded-full" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative container mx-auto px-4 lg:px-8" ref={ref}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cosmic/20 to-nebula/20 backdrop-blur-sm px-6 py-3 rounded-full border border-stellar/30 mb-6"
          >
            <HiSparkles className="text-stellar animate-pulse" />
            <span className="text-sm font-semibold text-cosmic uppercase tracking-wide">
              Campus Gallery
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-6xl font-black font-orbitron mb-6"
          >
            <span className="bg-gradient-to-r from-stellar via-mars to-cosmic bg-clip-text text-transparent">
              IIT Bombay Campus
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-white/80 mb-8 max-w-2xl mx-auto"
          >
            Explore the beautiful campus and facilities of India's premier technological institute
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 120 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-stellar via-mars to-cosmic mx-auto rounded-full"
          />
        </motion.div>

        {/* Carousel Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            keyBoardControl={true}
            showDots={false}
            customTransition="transform 0.5s ease-in-out"
            transitionDuration={500}
            containerClass="carousel-container"
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            itemClass="px-3"
          >
            {images.map((image, index) => {
              const isHovered = hoveredImage === image.id

              return (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100 
                  }}
                  className="h-full"
                  onMouseEnter={() => setHoveredImage(image.id)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <motion.div
                    whileHover={{ 
                      y: -10,
                      boxShadow: "0 25px 50px rgba(255, 215, 0, 0.15)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group relative bg-gradient-to-br from-space-light/40 via-space-light/20 to-nebula/10 backdrop-blur-sm rounded-3xl shadow-cosmic hover:shadow-glow-cosmic transition-all duration-500 overflow-hidden border border-stellar/20 hover:border-cosmic/40 h-full flex flex-col"
                  >
                    {/* Campus Badge */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="absolute top-4 left-4 z-20 bg-gradient-to-r from-cosmic to-stellar text-space-dark px-4 py-2 rounded-2xl text-sm font-bold shadow-glow-cosmic"
                    >
                      <div className="flex items-center gap-1">
                        IIT Bombay
                      </div>
                    </motion.div>

                    {/* Image Number Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      className="absolute top-4 right-4 z-20 w-8 h-8 bg-gradient-to-r from-mars to-nebula text-white rounded-full flex items-center justify-center text-xs font-bold shadow-glow-mars"
                    >
                      {image.id}
                    </motion.div>

                    {/* Image */}
                    <div className="relative aspect-[4/3] p-6 pb-4">
                      <div className="relative w-full h-full overflow-hidden rounded-2xl bg-gradient-to-br from-space to-space-light">
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cosmic/20 to-stellar/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          className="relative w-full h-full flex items-center justify-center"
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover transition-all duration-500 rounded-xl"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </motion.div>

                        {/* Hover Overlay */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="absolute inset-0 bg-space-dark/60 backdrop-blur-sm flex items-center justify-center rounded-xl"
                            >
                              <motion.button
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 20, opacity: 0 }}
                                transition={{ delay: 0.1 }}
                                className="w-16 h-16 bg-gradient-to-r from-cosmic to-stellar text-space-dark rounded-full flex items-center justify-center shadow-glow-cosmic hover:shadow-glow-stellar transition-all duration-300"
                                onClick={() => {
                                  console.log('View image:', image.src)
                                }}
                              >
                                <FaEye size={20} />
                              </motion.button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Image Info */}
                    <div className="p-6 pt-2 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        {/* Image Title */}
                        <h3 className="text-lg font-bold text-white group-hover:text-cosmic transition-colors duration-300 font-orbitron">
                          {image.title}
                        </h3>

                        {/* Image Description */}
                        <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                          {image.description}
                        </p>

                        {/* Image Meta */}
                        <div className="flex items-center justify-between pt-2">
                          <span className="px-3 py-1 bg-gradient-to-r from-mars/20 to-cosmic/20 text-stellar text-sm font-medium rounded-full border border-stellar/20">
                            Image {image.id} of 13
                          </span>
                          
                          {/* Quality indicator */}
                          <motion.div
                            className="flex items-center gap-1"
                            animate={{
                              scale: [1, 1.05, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.3
                            }}
                          >
                            <div className="w-2 h-2 bg-stellar rounded-full animate-pulse" />
                            <span className="text-xs text-stellar font-medium">HD</span>
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Gradient Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-stellar via-cosmic to-mars transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                    {/* Enhanced glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-stellar/5 to-cosmic/5 rounded-3xl pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </motion.div>
              )
            })}
          </Carousel>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px rgba(255, 215, 0, 0.4)" 
            }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 bg-gradient-to-r from-stellar via-cosmic to-mars text-space-dark font-bold font-orbitron rounded-2xl shadow-glow-stellar hover:shadow-glow-cosmic transition-all duration-300 flex items-center gap-3 mx-auto relative overflow-hidden"
            onClick={() => {
              router.push("/gallery")
            }}
          >
            <span className="relative z-10">View All Campus Images</span>
            <BsArrowRight className="group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-cosmic to-nebula transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          </motion.button>
        </motion.div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .carousel-container .react-multi-carousel-list {
          padding: 20px 0;
        }

        .carousel-container .react-multi-carousel-item {
          height: 100%;
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  )
}

export default CCarousel
