
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { X } from 'lucide-react';
import RoverInLab from "../mrt/RoverInLab.png";
import TeamPhoto2023 from "../mrt/TeamPhoto.png"; 
import RoverFieldTesting from "../mrt/RoverFieldTesting.png"; 
import RoverField from "../mrt/RoverField.png"; 
import RoverArnmCloseUp from "../mrt/RoverArmCloseUp.png";
import Roverwork from '@/mrt/DSCN9715.png';
import RoverT from '@/mrt/DSCN9799.png';
import roverFull from '@/mrt/DSCN9731.png';
import roverLook from '@/mrt/RoverArm.png';
 
const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = [
    { name: "All", id: "all" },
    { name: "Rovers", id: "rovers" },
    { name: "Competitions", id: "competitions" },
    { name: "Team", id: "team" },
    { name: "Workshops", id: "workshops" },
    { name: "Events", id: "events" }
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
    }, {
      src: roverLook,
      alt: "Rover teating",
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

  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-space">
      <Navbar />
      
      <section className="pt-28 pb-20 bg-space-dark relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-mars/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-cosmic/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="section-title">Gallery</h1>
            <p className="section-subtitle">
              A visual journey through our projects, competitions, and team activities.
            </p>
          </div>
          
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`py-2 px-4 rounded-full transition-colors ${
                  activeCategory === category.id 
                    ? "bg-gradient-to-r from-mars to-cosmic text-white" 
                    : "bg-space-light/30 text-white/70 hover:text-white hover:bg-space-light/50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Gallery grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <div 
                key={index} 
                className="overflow-hidden rounded-xl bg-space-light/30 cursor-pointer"
                onClick={() => setSelectedImage(image.src)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full aspect-square object-cover object-center hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
          
          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/70 text-lg">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-space-light/30 hover:bg-space-light/50 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6" />
          </button>
          <img 
            src={selectedImage} 
            alt="Enlarged view" 
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default GalleryPage;
