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
    <section id="rovers" className="relative py-16 bg-gradient-to-br from-space-dark via-space to-space-dark">
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-mars/5 to-cosmic/5 opacity-60" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2 className="text-4xl md:text-5xl font-bold mb-4 font-orbitron relative">
            <span className="bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent">
              Our Rovers Through The Years
            </span>
            <motion.div
              className=""
              initial={{ width: 0 }}
              whileInView={{ width: "200px" }}
              transition={{ duration: 1.2, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </motion.h2>
          <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
            Each rover represents a milestone in our journey of innovation and exploration.
          </p>

          {/* Rover Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {[
              { label: "Total Rovers", value: rovers.length, gradient: "from-mars to-orange-500" },
              { label: "Years Active", value: "9+", gradient: "from-cosmic to-blue-500" },
              { label: "Generations", value: "8", gradient: "from-purple-500 to-pink-500" },
              { label: "Latest", value: "2024", gradient: "from-green-500 to-emerald-500" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-space-light/20 to-space-light/10 backdrop-blur-sm border border-white/10 rounded-lg p-3 text-center group hover:border-white/30 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -1 }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="text-lg font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-white/70 group-hover:text-white/90 transition-colors duration-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Optimized Rover Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {rovers.map((rover, index) => (
            <motion.div
              key={index}
              className="relative p-6 rounded-xl bg-gradient-to-br from-space-light/30 to-space-light/10 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 group"
              onMouseEnter={() => setHoveredRover(index)}
              onMouseLeave={() => setHoveredRover(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -3 }}
            >
              {/* Header with Icon and Year */}
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className="w-10 h-10 bg-gradient-to-r from-mars/30 to-cosmic/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                >
                  <Rocket className="w-5 h-5 text-mars" />
                </motion.div>
                <div className="text-sm text-white/60 flex items-center space-x-1 bg-cosmic/10 px-2 py-1 rounded-full">
                  <Calendar className="w-3 h-3" />
                  <span>{rover.year}</span>
                </div>
              </div>

              {/* Content */}
              <div>
                <motion.h3
                  className="text-lg font-bold font-orbitron mb-3 group-hover:text-cosmic transition-colors duration-300"
                  style={{
                    color: hoveredRover === index ? "#00d9ff" : "#ffffff",
                  }}
                >
                  {rover.name}
                </motion.h3>
                
                <p className="text-white/70 text-sm mb-4 leading-relaxed group-hover:text-white/85 transition-colors duration-300">
                  {rover.description}
                </p>
                
                {/* Achievement Badge */}
                <motion.div
                  className="flex items-center space-x-2 text-xs text-cosmic bg-cosmic/10 px-3 py-2 rounded-full hover:bg-cosmic/20 transition-colors duration-300"
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
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                style={{ transformOrigin: 'left' }}
              />

              {/* Rover number indicator */}
              <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-r from-mars to-cosmic rounded-full flex items-center justify-center text-xs font-bold text-white opacity-60">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link href="/rover">
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button className="bg-gradient-to-r from-mars via-orange-500 to-cosmic hover:from-mars-dark hover:via-orange-600 hover:to-cosmic-dark text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg">
                <span className="flex items-center space-x-3">
                  <Rocket className="w-5 h-5" />
                  <span>Explore Our Rovers</span>
                  <ArrowRight className="w-5 h-5" />
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
