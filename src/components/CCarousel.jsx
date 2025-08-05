'use client'
import React, { useState, useRef } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

// Enhanced responsive configuration
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1920 },
    items: 5,
    slidesToSlide: 2
  },
  desktop: {
    breakpoint: { max: 1920, min: 1280 },
    items: 4,
    slidesToSlide: 2
  },
  tablet: {
    breakpoint: { max: 1280, min: 768 },
    items: 3,
    slidesToSlide: 1
  },
  smallTablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
    slidesToSlide: 1
  },
};

const CCarousel = () => {
  const [hoveredImage, setHoveredImage] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Generate array of image objects for IIT Bombay images
  const images = Array.from({ length: 13 }, (_, index) => ({
    id: index + 1,
    src: `/iit-bombay-images/${index + 1}.jpg`,
    alt: `IIT Bombay Image ${index + 1}`,
  }))

  // Custom Arrow Components - Responsive
  const CustomLeftArrow = ({ onClick }) => (
    <motion.button
      onClick={onClick}
      className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 bg-black/60 backdrop-blur-sm rounded-full shadow-lg border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-all duration-300"
    >
      <FaArrowLeft className="text-xs md:text-base" />
    </motion.button>
  )

  const CustomRightArrow = ({ onClick }) => (
    <motion.button
      onClick={onClick}
      className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 bg-black/60 backdrop-blur-sm rounded-full shadow-lg border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-all duration-300"
    >
      <FaArrowRight className="text-xs md:text-base" />
    </motion.button>
  )

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-4 md:py-8 lg:py-16">
      <div className="relative container mx-auto px-2 sm:px-4 lg:px-8" ref={ref}>
        
        {/* Header Section - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 md:mb-12 lg:mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              IIT Bombay Campus
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm md:text-lg lg:text-xl text-white/80 mb-4 md:mb-8 max-w-2xl mx-auto px-4"
          >
            Explore the beautiful campus and facilities of India's premier technological institute
          </motion.p>
        </motion.div>

        {/* Carousel Section - Responsive */}
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
            removeArrowOnDeviceType={[]}
            itemClass="px-1 sm:px-2 md:px-3"
            partialVisible={false}
            swipeable={true}
            draggable={true}
            minimumTouchDrag={80}
            shouldResetAutoplay={true}
            rewind={false}
            rewindWithAnimation={false}
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

                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group relative bg-white/10 backdrop-blur-sm rounded-lg md:rounded-2xl lg:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 hover:border-white/40 h-full"
                  >
                    {/* Image Container - Responsive aspect ratios */}
                    <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-80 xl:h-96">
                      <div className="relative w-full h-full overflow-hidden rounded-lg md:rounded-2xl lg:rounded-3xl">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          className="relative w-full h-full"
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover transition-all duration-500"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, (max-width: 1920px) 25vw, 20vw"
                            priority={index < 5}
                            quality={85}
                          />
                        </motion.div>


                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </Carousel>
        </motion.div>
      </div>

      {/* Custom Styles for better responsiveness */}
      <style jsx>{`
        .carousel-container .react-multi-carousel-list {
          padding: 10px 0;
        }

        .carousel-container .react-multi-carousel-item {
          height: 100%;
        }

        @media (max-width: 640px) {
          .carousel-container .react-multi-carousel-list {
            padding: 5px 0;
          }
        }

        @media (min-width: 1920px) {
          .carousel-container .react-multi-carousel-list {
            padding: 20px 0;
          }
        }
      `}</style>
    </div>
  )
}

export default CCarousel
