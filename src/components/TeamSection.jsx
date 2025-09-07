"use client";

import React, { useState, useRef, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Linkedin, Globe, Users, Star, Zap, Award, ArrowRight, UserPlus, Mail, Code, Wrench, Rocket, Search, Trophy, GitBranch, Layers, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import RoverIcon from './icons/RoverIcon';

// All image imports (keeping your existing imports)
import AnushkaVerma from '@/../public/mrt/Team_Leads/Anushka_Verma.jpg';
import ArinWeling from '@/../public/mrt/Team_Leads/Arin_Weling.jpeg';
import Arkapravo from '@/../public/mrt/Team_Leads/arkapravo_patra.jpg';
import Tarshit from '@/../public/mrt/Team_Leads/Tarshit_Sehgal.jpg';
import Arjoe from '@/../public/mrt/Electrical/Subsystem Lead/Arjoe Basak.jpg';
import Bhuvan from '@/../public/mrt/Mechanical/Arm & LDT/Subsystem Lead/Bhuvan Prasad.jpg';
import Ajitesh from '@/../public/mrt/Mechanical/Mobility/Subsystem Lead/Ajitesh Joshi.jpeg';
import Madhav from '@/../public/mrt/Software/Subsystem Lead/Madhav Agrawal.jpg';
import AnvitKhade from '@/../public/mrt/Mechanical/Arm & LDT/Anvit Khade.jpg';
import Rudra from '@/../public/mrt/Mechanical/Arm & LDT/Rudra Khandelwal.jpg';
import Ryan from '@/../public/mrt/Mechanical/Arm & LDT/Ryan D_Souza.jpg';
import Vidit from '@/../public/mrt/Mechanical/Arm & LDT/Vidit Bohra.jpeg';
import Ayush from '@/../public/mrt/Mechanical/Mobility/Ayush Mohapatra.jpg';
import Dev from '@/../public/mrt/Mechanical/Mobility/Dev Suthar.jpg';
import Shashwat from '@/../public/mrt/Mechanical/Mobility/Shashwat Gupta.jpg';
import Jay from '@/../public/mrt/Mechanical/Mobility/JAY MISTRY.jpg';
import Param from '@/../public/mrt/Mechanical/Mobility/Param Aghera.jpg';
// NOTE: Avoid importing this image to prevent EXIF orientation parsing error during build
const Tanish = '/mrt/Mechanical/Mobility/Tanish Kharbanda.jpg';
import Harshit from '@/../public/mrt/Electrical/Harshit Somani.jpg';
import Radhika from '@/../public/mrt/Electrical/Radhika agarwal.jpg';
import shawn from '@/../public/mrt/Electrical/Shawn Thomas Koshy.jpg';
import Shridhar from '@/../public/mrt/Electrical/Shridhar Patil.jpeg';
import Siddhant from '@/../public/mrt/Electrical/Siddhant Kaul.jpeg';
import Sudhindra from '@/../public/mrt/Electrical/Sudhindra Sahoo.jpg';
import Tanmay from '@/../public/mrt/Electrical/Tanmay Sinha.jpg';
import Veeresh from '@/../public/mrt/Electrical/Veeresh S K.jpg';
import Dheer from '@/../public/mrt/Software/Dheer Prasad.jpg';
import Gautam from '@/../public/mrt/Software/Gautam Mahale.png';
import Jiya from '@/../public/mrt/Software/Jiya Gada.jpeg';
import Rishabh from '@/../public/mrt/Software/Rishabh Parwal.jpg';
import Sairam from '@/../public/mrt/Software/Sairam Chari.jpg';
import Tejas from '@/../public/mrt/Software/Tejas Kulkarni.png';
import Aditi from '@/../public/mrt/MDM/Aditi Singh.jpg';
import Disha from '@/../public/mrt/MDM/Disha Gugale.jpg';
import Rohan from '@/../public/mrt/MDM/Rohan Shukla.jpeg';
import Shreya from '@/../public/mrt/MDM/Shreya Goyal.jpeg';
import Shrishti from '@/../public/mrt/MDM/Srishti Poddar.jpeg';
import Anshul from '@/../public/mrt/MDM/Anshul Choudhary.jpg'

// Enhanced TeamMember Component with bottom-to-top animation
const TeamMember = ({ name, role, image, linkedin, index = 0 }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
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
    margin: "-10% 0px -10% 0px", 
    amount: 0.3 
  });

  const handleImageLoad = useCallback(() => setImageLoaded(true), []);

  // Enhanced card animation variants with stronger bottom-to-top effect
  const cardVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 80,  // Increased from 50 to 80 for more dramatic effect
      scale: 0.9 
    },
    visible: {
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.8,  // Slightly longer duration
        delay: (index % 20) * 0.08,  // Slightly longer stagger
        type: "spring",
        stiffness: 100,  // Slightly less stiff for smoother animation
        damping: 25
      }
    }
  }), [index]);

  // Separate animation for the image container with bottom-to-top effect
  const imageVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 60,  // Strong bottom-to-top movement
      scale: 0.8,
      rotateX: 15  // Slight 3D tilt effect
    },
    visible: {
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.9,
        delay: (index % 20) * 0.1 + 0.2,  // Delayed after card animation
        type: "spring",
        stiffness: 120,
        damping: 20,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }), [index]);

  // Text animation variants
  const textVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: (index % 20) * 0.1 + 0.4,  // Delayed after image
        ease: "easeOut"
      }
    }
  }), [index]);

  return (
    <motion.div
      ref={cardRef}
      className="flex flex-col items-center text-center space-y-3"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Enhanced Member Image with bottom-to-top animation */}
      <motion.div
        ref={imageRef}
        className="relative w-60 h-60 rounded-lg overflow-hidden bg-gradient-to-br from-space-light/30 to-space-light/10 border border-white/10"
        variants={imageVariants}
        initial="hidden"
        animate={imageInView ? "visible" : "hidden"}
        whileHover={{ 
          scale: 1.05, 
          y: -10,  // Slight lift on hover
          transition: { duration: 0.3 } 
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {!imageLoaded && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-mars/20 to-cosmic/20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Users className="w-8 h-8 text-white/40" />
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: imageLoaded ? 1 : 0, 
            scale: imageLoaded ? 1 : 1.1 
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-center"
            onLoad={handleImageLoad}
            sizes="240px"
            style={{ objectFit: 'cover' }}
          />
        </motion.div>
      </motion.div>

      {/* Enhanced Member Name with staggered animation */}
      <motion.h4 
        className="text-white font-semibold text-lg font-orbitron"
        variants={textVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {name}
      </motion.h4>

      {/* Enhanced Member Role and LinkedIn with staggered animation */}
      <motion.div 
        className='flex justify-center items-center gap-4'
        variants={textVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <p className="text-white/80 text-sm">
          {role}
        </p>
        {/* LinkedIn Link */}
        {linkedin && (
          <motion.a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-cosmic/20 hover:bg-cosmic/40 rounded-full text-white transition-colors duration-300 border border-white/20"
            whileHover={{ 
              scale: 1.1, 
              y: -2,
              transition: { duration: 0.2 } 
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin size={16} />
          </motion.a>
        )}
      </motion.div>
    </motion.div>
  );
};

const TeamSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [selectedSubTeam, setSelectedSubTeam] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const headerInView = useInView(headerRef, { once: false, margin: "-10% 0px -10% 0px", amount: 0.3 });

  // Optimized transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.8, 0.3]);

  // Your existing team members data...
  const teamMembers = useMemo(() => [
    {
      name: "Anushka Verma",
      role: "Team Lead",
      image: AnushkaVerma,
      linkedin: "https://www.linkedin.com/in/anushka-verma-534084217?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      isLead: true,
      department: "Leadership",
    },
    {
      name: "Arin Weling",
      role: "Team Lead",
      image: ArinWeling,
      linkedin: "https://www.linkedin.com/in/arin-weling-584a39252?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      isLead: true,
      department: "Leadership",
    },
    {
      name: "Arkapravo Patra",
      role: "Team Lead",
      image: Arkapravo,
      linkedin: "https://www.linkedin.com/in/arkapravo-patra-2a7819266?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      isLead: true,
      department: "Leadership",
    },
    {
      name: "Tarshit Sehgal",
      role: "Team Lead",
      image: Tarshit,
      linkedin: "http://www.linkedin.com/in/tarshit-sehgal-a37665253",
      isLead: true,
      department: "Leadership",
    }
  ], []);

  // Your existing sub-teams data...
  const subTeams = useMemo(() => [
    {
      name: "Mechanical Team",
      icon: <Wrench className="w-5 h-5" />,
      gradient: "from-mars/40 to-orange-500/40",
      description: "Designing and building rover chassis, mobility, and manipulation systems",
      members: [
        {
          name: "Bhuvan Prasad",
          role: "Mechanical Lead (Arm & LDT)",
          image: Bhuvan,
          linkedin: "https://www.linkedin.com/in/bhuvan-k-prasad-62124b297?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          isLead: true,
          department: "Mechanical",
        },
        // ... rest of your mechanical team members
        {
          name: "Ajitesh Joshi",
          role: "Mechanical Lead (Mobility)",
          image: Ajitesh,
          linkedin: "https://www.linkedin.com/in/madhav48/",
          isLead: true,
          department: "Mechanical",
        },
        {
          name: "Anvit Khade",
          role: "Senior Design Engineer (Arm & LDT)",
          image: AnvitKhade,
          department: "Mechanical",
        },
        {
          name: "Dev Suthar",
          role: "Senior Design Engineer (Mobility)",
          image: Dev,
          department: "Mechanical",
        },
        {
          name: "Param Aghera",
          role: "Senior Design Engineer (Mobility)",
          image: Param,
          department: "Mechanical",
        },
        {
          name: "Rudra Khandelwal",
          role: "Junior Design Engineer (Arm & LDT)",
          image: Rudra,
          department: "Mechanical",
        },
        {
          name: "Ryan D'Souza",
          role: "Junior Design Engineer (Arm & LDT)",
          image: Ryan,
          department: "Mechanical",
        },
        {
          name: "Vidit Bohra",
          role: "Junior Design Engineer (Arm & LDT)",
          image: Vidit,
          department: "Mechanical",
        },
        {
          name: "Ayush Mohapatra",
          role: "Junior Design Engineer (Mobility)",
          image: Ayush,
          department: "Mechanical",
        },
        {
          name: "Jay Mistry",
          role: "Junior Design Engineer (Mobility)",
          image: Jay,
          department: "Mechanical",
        },
        {
          name: "Shashwat Singh",
          role: "Junior Design Engineer (Mobility)",
          image: Shashwat,
          department: "Mechanical",
        },
        {
          name: "Tanish Kharbanda",
          role: "Junior Design Engineer (Mobility)",
          image: Tanish,
          department: "Mechanical",
        }
      ]
    },
    {
      name: "Electrical Team",
      icon: <Zap className="w-5 h-5" />,
      gradient: "from-cosmic/40 to-blue-500/40",
      description: "Developing power systems, control circuits, and sensor integration",
      members: [
        {
          name: "Arjoe Basak",
          role: "Electrical Lead",
          image: Arjoe,
          linkedin: "https://www.linkedin.com/in/arjoe-basak-a49256285",
          isLead: true,
          department: "Electrical",
        },
        {
          name: "Sudhindra Sahoo",
          role: "Senior Design Engineer",
          image: Sudhindra,
          department: "Electrical",
        },
                {
          name: "Veeresh S K",
          role: "Senior Design Engineer",
          image: Veeresh,
          department: "Electrical",
        },
        {
          name: "Harshit Somani",
          role: "Junior Design Engineer",
          image: Harshit,
          linkedin: "#",
          department: "Electrical",
        },
        {
          name: "Radhika Agarwal",
          role: "Junior Design Engineer",
          image: Radhika,
          department: "Electrical",
        },
        {
          name: "Shawn Thomas Koshy",
          role: "Junior Design Engineer",
          image: shawn,
          department: "Electrical",
        },
        {
          name: "Shridhar Patil",
          role: "Junior Design Engineer",
          image: Shridhar,
          department: "Electrical",
        },
        {
          name: "Siddhant Kaul",
          role: "Junior Design Engineer",
          image: Siddhant,
          department: "Electrical",
        },
        {
          name: "Tanmay Sinha",
          role: "Junior Design Engineer",
          image: Tanmay,
          department: "Electrical",
        },

      ]
    },
    {
      name: "Software Team",
      icon: <Code className="w-5 h-5" />,
      gradient: "from-purple-500/40 to-pink-500/40",
      description: "Creating autonomous navigation, AI systems, and rover control software",
      members: [
        {
          name: "Madhav Agrawal",
          role: "Software Lead",
          image: Madhav,
          website: "https://www.linkedin.com/in/madhav48/",
          isLead: true,
          department: "Software",
        },
        {
          name: "Dheer Prasad",
          role: "Junior Design Engineer",
          image: Dheer,
          department: "Software",
        },
        {
          name: "Gautam Mahale",
          role: "Junior Design Engineer",
          image: Gautam,
          department: "Software",
        },
        {
          name: "Jiya Gada",
          role: "Junior Design Engineer",
          image: Jiya,
          department: "Software",
        },
        {
          name: "Rishabh Parwal",
          role: "Junior Design Engineer",
          image: Rishabh,
          department: "Software",
        },
        {
          name: "Sairam Chari",
          role: "Junior Design Engineer",
          image: Sairam,
          department: "Software",
        },
        {
          name: "Tejas Kulkarni",
          role: "Junior Design Engineer",
          image: Tejas,
          department: "Software",
        }
      ]
    },
    {
      name: "Media, Design & Marketing",
      icon: <Sparkles className="w-5 h-5" />,
      gradient: "from-green-500/40 to-emerald-500/40",
      description: "Managing communications, design, and outreach activities",
      members: [
        {
          name: "Aditi Singh",
          role: "Team Member",
          image: Aditi,
          department: "MDM",
        },
        {
          name: "Disha Gugale",
          role: "Team Member",
          image: Disha,
          department: "MDM",
        },
        {
          name: "Rohan Shukla",
          role: "Team Member",
          image: Rohan,
          department: "MDM",
        },
        {
          name: "Shreya Goyal",
          role: "Team Member",
          image: Shreya,
          department: "MDM",
        },
        {
          name: "Srishti Poddar",
          role: "Team Member",
          image: Shrishti,
          department: "MDM",
        },
        {
          name: "Anshul Choudhary",
          role: "Team Member",
          image: Anshul,
          department: "MDM",
        }
      ]
    }
  ], []);

  // Optimized filter function
  const filteredMembers = useCallback((members) => {
    if (!searchQuery) return members;
    return members.filter(member =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.skills && member.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())))
    );
  }, [searchQuery]);

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
    <motion.section
      ref={sectionRef}
      id="team"
      className="pt-32 pb-24 bg-gradient-to-br from-space-dark via-space to-space-dark relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-0 w-1/3 h-1/3 bg-gradient-to-r from-cosmic/15 to-blue-500/8 rounded-full blur-3xl"
          style={{ y: backgroundY, opacity: orbOpacity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-l from-mars/15 to-orange-500/8 rounded-full blur-3xl"
          style={{ y: backgroundY, opacity: orbOpacity }}
        />

        {/* Enhanced grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            className="absolute inset-0"
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 107, 53, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(64, 224, 255, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px'
            }}
          />
        </div>

        {/* Floating team icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                y: [0, -40, 0],
                opacity: [0.1, 0.4, 0.1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 18 + i * 3,
                repeat: Infinity,
                delay: i * 3,
                ease: "easeInOut",
              }}
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${15 + Math.random() * 70}%`,
              }}
            >
              <Users className="w-5 h-5 text-white/20" />
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
          <motion.h2
            className="text-5xl md:text-7xl font-bold font-orbitron bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent relative mb-6"
            variants={itemVariants}
          >
            Our Team
          </motion.h2>
          <motion.p
            className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed flex items-center justify-center space-x-3"
            variants={itemVariants}
          >
            <Star className="w-6 h-6 text-cosmic" />
            <span>Meet the brilliant minds behind our Mars rover designs and innovations</span>
            <RoverIcon className="w-6 h-6 text-mars" />
          </motion.p>
        </motion.div>

        {/* Enhanced Leadership Team */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, margin: "-10%" }}
        >
          <motion.h3
            className="text-3xl font-bold mb-12 font-orbitron text-center flex items-center justify-center space-x-3"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <Award className="w-8 h-8 text-mars" />
            <span className="bg-gradient-to-r from-mars to-cosmic bg-clip-text text-transparent">Leadership Team</span>
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {filteredMembers(teamMembers).map((member, index) => (
              <TeamMember key={index} {...member} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Enhanced Sub-Teams Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, margin: "-10%" }}
        >
          <motion.h3
            className="text-3xl font-bold mb-12 font-orbitron text-center flex items-center justify-center space-x-3"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <GitBranch className="w-8 h-8 text-cosmic" />
            <span className="bg-gradient-to-r from-cosmic to-mars bg-clip-text text-transparent">Our Sub-Teams</span>
          </motion.h3>

          {/* Enhanced Team Filter Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.05 }}
            viewport={{ once: false }}
          >
            {subTeams.map((team, idx) => (
              <motion.button
                key={team.name}
                className={cn(
                  "py-4 px-8 rounded-2xl border font-semibold transition-all duration-300 backdrop-blur-sm perspective-1000",
                  selectedSubTeam === idx
                    ? "bg-gradient-to-r from-mars/20 to-cosmic/20 text-white border-white/40 shadow-lg shadow-mars/20"
                    : "bg-space-light/20 text-white/90 border-white/10 hover:border-white/30"
                )}
                onClick={() => setSelectedSubTeam(idx)}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: false }}
                whileTap={{ scale: 0.97 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: selectedSubTeam === idx ? 360 : 0, scale: selectedSubTeam === idx ? 1.1 : 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {team.icon}
                  </motion.div>
                  <span>{team.name}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Enhanced Team Description */}
          <motion.div
            className="text-center mb-12"
            key={selectedSubTeam}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-white/80 max-w-3xl mx-auto text-lg">
              {subTeams[selectedSubTeam].description}
            </p>
          </motion.div>

          {/* Enhanced Team Members Grid with bottom-to-top animations */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSubTeam}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 max-w-7xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ 
                duration: 0.6,
                staggerChildren: 0.1,
                delayChildren: 0.1
              }}
            >
              {filteredMembers(subTeams[selectedSubTeam].members).map((member, index) => (
                <TeamMember key={`${selectedSubTeam}-${index}`} {...member} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TeamSection;
