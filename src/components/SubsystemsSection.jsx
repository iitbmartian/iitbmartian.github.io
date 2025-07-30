"use client";
import React, { useState } from 'react';
import { Cog, Code, Beaker, Presentation, ArrowRight, Zap, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const SubsystemsSection = () => {
  const [hoveredSubsystem, setHoveredSubsystem] = useState(null);

  const subsystems = [
    {
      title: "Mechanical",
      description: "Structure, mobility, and robotic arms",
      icon: <Cog className="h-5 w-5 text-mars" />,
      achievements: "Robust design"
    },
    {
      title: "Electronics & Control",
      description: "Circuits, sensors, and control systems",
      icon: <Zap className="h-5 w-5 text-cosmic" />,
      achievements: "Smart control"
    },
    {
      title: "Software & Automation",
      description: "Autonomous navigation and algorithms",
      icon: <Code className="h-5 w-5 text-purple-400" />,
      achievements: "AI navigation"
    },
    {
      title: "Biosciences",
      description: "Scientific analysis and sample collection",
      icon: <Beaker className="h-5 w-5 text-green-400" />,
      achievements: "Research tools"
    },
    {
      title: "Media & Business",
      description: "Outreach, design, and partnerships",
      icon: <Presentation className="h-5 w-5 text-pink-400" />,
      achievements: "Brand strategy"
    }
  ];

  return (
    <section id="subsystems" className="relative py-12 bg-gradient-to-br from-space via-space-dark to-space">
      {/* Minimal Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-mars/5 to-cosmic/5" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
        {/* Compact Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-4 font-technospace">
            <span className="bg-gradient-to-r from-mars via-orange-400 to-cosmic bg-clip-text text-transparent">
              The Stars That Form The Constellation
            </span>
          </motion.h2>
          <p className="text-white/70 max-w-2xl mx-auto text-sm">
            Our subsystems work in harmony to create rovers capable of extraterrestrial exploration.
          </p>
        </motion.div>

        {/* Subsystems Flex Layout - Compact Cards */}
        <div className="flex flex-wrap gap-4 mb-10 justify-center">
          {subsystems.map((subsystem, index) => (
            <motion.div
              key={index}
              className="flex-1 min-w-[200px] max-w-[220px] p-4 rounded-xl bg-space-light/20 backdrop-blur-sm border border-white/10 hover:border-mars/30 transition-all duration-300 group"
              onMouseEnter={() => setHoveredSubsystem(index)}
              onMouseLeave={() => setHoveredSubsystem(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -3 }}
            >
              {/* Icon and Title */}
              <div className="flex items-center space-x-3 mb-3">
                <motion.div
                  className="w-10 h-10 bg-gradient-to-r from-mars/20 to-cosmic/20 rounded-lg flex items-center justify-center"
                  animate={{
                    rotate: hoveredSubsystem === index ? 180 : 0,
                    backgroundColor: hoveredSubsystem === index ? "rgba(255, 107, 53, 0.3)" : "rgba(255, 107, 53, 0.2)",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {subsystem.icon}
                </motion.div>
                
                <motion.h3
                  className="text-lg font-bold font-technospace flex-1"
                  animate={{
                    color: hoveredSubsystem === index ? "#00d9ff" : "#ffffff",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {subsystem.title}
                </motion.h3>
              </div>
              
              {/* Description */}
              <p className="text-white/70 text-sm mb-3 leading-relaxed">
                {subsystem.description}
              </p>
              
              {/* Achievement Badge */}
              <motion.div
                className="flex items-center space-x-1 text-xs text-cosmic bg-cosmic/10 px-2 py-1 rounded-full"
                animate={{
                  backgroundColor: hoveredSubsystem === index ? "rgba(0, 217, 255, 0.2)" : "rgba(0, 217, 255, 0.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <Star className="w-3 h-3" />
                <span>{subsystem.achievements}</span>
              </motion.div>

              {/* Progress Bar */}
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
          <Link href="/subsystems">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-mars to-cosmic hover:from-mars-dark hover:to-cosmic-dark text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10 flex items-center space-x-2">
                  <Star className="w-4 h-4" />
                  <span className="font-semibold">Explore Our Subsystems</span>
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

export default SubsystemsSection;
