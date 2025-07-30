"use client";
import React, { useRef, useState } from 'react';
import { Award, Globe, MapPin, Trophy, Target, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';

const competitions = [
  {
    title: "European Rover Challenge",
    location: "Kielce, Poland",
    icon: <Globe className="h-8 w-8 text-white" />,
    description: "The European Rover Challenge is an international space and robotics competition held in Poland. It is one of the largest events of its kind in the world, bringing together teams of students, researchers, and professionals from various countries.",
    date: "September 2023",
    accolades: ["Ranked 1st in Asia", "World Rank 11th"],
    image: "/mrt/DSCN9685.png"
  },
  {
    title: "International Rover Challenge",
    location: "Bangalore, India",
    icon: <Trophy className="h-8 w-8 text-white" />,
    description: "The International Rover Challenge is an annual robotics and space exploration competition held in India. It is organized by the Space Robotics Society and is one of the most prestigious events of its kind in Asia.",
    date: "January 2023",
    accolades: ["Ranked 1st in India", "World Rank 4th"],
    image: "/mrt/DSCN9715.png"
  },
  {
    title: "University Rover Challenge",
    location: "Utah, USA",
    icon: <MapPin className="h-8 w-8 text-white" />,
    description: "The University Rover Challenge is a premier robotics competition for college students held annually in the desert of southern Utah in the United States. It is organized by the Mars Society and challenges teams to design and build the next generation of Mars rovers.",
    date: "June 2022",
    accolades: ["Qualified for finals"],
    image: "/mrt/DSCN9743.png"
  }
];

const CompetitionCard = ({ competition, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-gray-700 hover:shadow-cyan-400/20 transition-all duration-300 group"
    >
      <div className="relative h-56">
        <img src={competition.image} alt={competition.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute top-4 left-4 bg-cyan-500/20 text-white p-3 rounded-full backdrop-blur-sm border border-cyan-500/30">
          {competition.icon}
        </div>
        <div className="absolute bottom-4 left-4">
          <h3 className="text-2xl font-bold text-white">{competition.title}</h3>
          <p className="text-sm text-gray-300 flex items-center"><MapPin className="h-4 w-4 mr-1" />{competition.location}</p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-400 mb-4 text-sm leading-relaxed">{competition.description}</p>
        <div className="mb-4">
          {competition.accolades.map((accolade, i) => (
            <div key={i} className="flex items-center text-cyan-400 mb-2">
              <Award className="h-5 w-5 mr-2" />
              <span className="font-semibold">{accolade}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{competition.date}</span>
          <Button variant="link" className="text-cyan-400 group-hover:text-white transition-colors duration-300">
            Learn More <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const CompetitionsSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <div ref={ref} className="relative bg-black text-white py-20 sm:py-32 overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0 opacity-10"
      >
        <div className="absolute inset-0 bg-grid-cyan-500/20"></div>
      </motion.div>

      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500">
              Pushing the Boundaries
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-400">
            Our team thrives on challenges, consistently proving our mettle in prestigious international competitions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {competitions.map((comp, index) => (
            <CompetitionCard key={index} competition={comp} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold group">
            Explore All Competitions
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default CompetitionsSection;
