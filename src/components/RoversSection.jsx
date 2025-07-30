"use client";
import React, { useState } from 'react';
import { ArrowRight, Rocket, Calendar, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const RoversSection = () => {
  const [hoveredRover, setHoveredRover] = useState(null);

  const rovers = [
    { name: "Akrula 1.0", year: "2015", description: "Our pioneering rover", achievements: "First Mars simulation" },
    { name: "Agathsya 1.0", year: "2016", description: "Enhanced mobility", achievements: "Terrain handling" },
    { name: "Agathsya 2.0", year: "2017", description: "Advanced navigation", achievements: "Pathfinding" },
    { name: "Hemant 1.0", year: "2018", description: "Autonomous capabilities", achievements: "AI integration" },
    { name: "Agruni 1.0", year: "2019-20", description: "Scientific tools", achievements: "Analysis suite" },
    { name: "Yash", year: "2020-21", description: "AI-powered exploration", achievements: "Machine learning" },
    { name: "Tezant", year: "2022-23", description: "Next-gen tech", achievements: "Global recognition" },
    { name: "Amaran", year: "2024", description: "Latest innovation", achievements: "Championship" }
  ];

  return (
    <section id="rovers" className="relative py-12 bg-gradient-to-br from-space via-space-dark to-space">
      {/* Minimal Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-mars/5 to-cosmic/5" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        {/* Compact Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-3 font-technospace">
            <span className="bg-gradient-to-r from-mars via-orange-400 to-cosmic bg-clip-text text-transparent">
              Our Rovers Through The Years
            </span>
          </motion.h2>
          <p className="text-white/70 text-sm max-w-2xl mx-auto">
            Each rover represents a milestone in our journey of innovation.
          </p>
        </motion.div>

        {/* Flexbox Rover Cards - 4-5 per row */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {rovers.map((rover, index) => (
            <motion.div
              key={index}
              className="flex-1 min-w-[200px] max-w-[240px] p-4 rounded-xl bg-space-light/20 backdrop-blur-sm border border-white/10 hover:border-mars/30 transition-all duration-300 group"
              onMouseEnter={() => setHoveredRover(index)}
              onMouseLeave={() => setHoveredRover(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -2 }}
            >
              {/* Header with Icon and Year */}
              <div className="flex items-center justify-between mb-3">
                <motion.div
                  className="w-8 h-8 bg-gradient-to-r from-mars/30 to-cosmic/30 rounded-lg flex items-center justify-center"
                  animate={{
                    rotate: hoveredRover === index ? 180 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Rocket className="w-4 h-4 text-mars" />
                </motion.div>
                <div className="text-xs text-white/60 flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{rover.year}</span>
                </div>
              </div>

              {/* Content */}
              <div>
                <motion.h3
                  className="text-lg font-bold font-technospace mb-2"
                  animate={{
                    color: hoveredRover === index ? "#00d9ff" : "#ffffff",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {rover.name}
                </motion.h3>
                
                <p className="text-white/70 text-sm mb-2 leading-relaxed">
                  {rover.description}
                </p>
                
                {/* Achievement Badge */}
                <motion.div
                  className="flex items-center space-x-1 text-xs text-cosmic bg-cosmic/10 px-2 py-1 rounded-full"
                  animate={{
                    backgroundColor: hoveredRover === index ? "rgba(0, 217, 255, 0.2)" : "rgba(0, 217, 255, 0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Star className="w-3 h-3" />
                  <span>{rover.achievements}</span>
                </motion.div>
              </div>

              {/* Progress Indicator */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-mars to-cosmic rounded-b-xl"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.div>
          ))}
        </div>

        {/* Compact Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link href="/rover">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-mars to-cosmic hover:from-mars-dark hover:to-cosmic-dark text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10 flex items-center space-x-2">
                  <Rocket className="w-4 h-4" />
                  <span className="font-semibold">Explore Our Rovers</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RoversSection;
