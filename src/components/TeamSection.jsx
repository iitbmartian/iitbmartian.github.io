import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Linkedin, Globe, Users, Star, Zap, Award, ArrowRight, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Import all the images (keeping your original imports)
import AnushkaVerma from '@/mrt/Team_Leads/Anushka_Verma.jpg';
import ArinWeling from '@/mrt/Team_Leads/Arin_Weling.jpeg';
import Arkapravo from '@/mrt/Team_Leads/arkapravo_patra.jpg';
import Tarshit from '@/mrt/Team_Leads/Tarshit_Sehgal.jpg';
import Arjoe from '@/mrt/Electrical/Subsystem Lead/Arjoe Basak.jpg'; 
import Bhuvan from '@/mrt/Mechanical/Arm & LDT/Subsystem Lead/Bhuvan Prasad.jpg';
import Ajitesh from '@/mrt/Mechanical/Mobility/Subsystem Lead/Ajitesh Joshi.jpeg';
import Madhav from '@/mrt/Software/Subsystem Lead/Madhav Agrawal.jpg';
import AnvitKhade from '@/mrt/Mechanical/Arm & LDT/Anvit Khade.jpg';
import Rudra from '@/mrt/Mechanical/Arm & LDT/Rudra Khandelwal.jpg';
import Ryan from '@/mrt/Mechanical/Arm & LDT/Ryan D_Souza.jpg';
import Vidit from '@/mrt/Mechanical/Arm & LDT/Vidit Bohra.jpeg';
import Ayush from '@/mrt/Mechanical/Mobility/Ayush Mohapatra.jpg';
import Dev from '@/mrt/Mechanical/Mobility/Dev Suthar.jpg';
import Shashwat from '@/mrt/Mechanical/Mobility/Shashwat Gupta.jpg';
import Jay from '@/mrt/Mechanical/Mobility/JAY MISTRY.jpg';
import Param from '@/mrt/Mechanical/Mobility/Param Aghera.jpg';
import Tanish from '@/mrt/Mechanical/Mobility/Tanish Kharbanda.jpg';
import Harshit from '@/mrt/Electrical/Harshit Somani.jpg';
import Radhika from '@/mrt/Electrical/Radhika agarwal.jpg';
import shawn from '@/mrt/Electrical/Shawn Thomas Koshy.jpg';
import Shridhar from '@/mrt/Electrical/Shridhar Patil.jpeg';
import Siddhant from '@/mrt/Electrical/Siddhant Kaul.jpeg'
import Sudhindra from '@/mrt/Electrical/Sudhindra Sahoo.jpg';
import Tanmay from '@/mrt/Electrical/Tanmay Sinha.jpg';
import Veeresh from '@/mrt/Electrical/Veeresh S K.jpg';
import Dheer from '@/mrt/Software/Dheer Prasad.jpg';
import Gautam from '@/mrt/Software/Gautam Mahale.png';
import Jiya from '@/mrt/Software/Jiya Gada.jpeg';
import Rishabh from '@/mrt/Software/Rishabh Parwal.jpg';
import Sairam from '@/mrt/Software/Sairam Chari.jpg';
import Tejas from '@/mrt/Software/Tejas Kulkarni.png';
import Aditi from '@/mrt/MDM/Aditi Singh.jpg';
import Disha from '@/mrt/MDM/Disha Gugale.jpg';
import Rohan from '@/mrt/MDM/Rohan Shukla.jpeg';
import Shreya from '@/mrt/MDM/Shreya Goyal.jpeg';
import Shrishti from '@/mrt/MDM/Srishti Poddar.jpeg';


const TeamMember = ({ name, role, image, linkedin, website, index = 0, isLead = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1 
      } : { 
        opacity: 0, 
        y: 50, 
        scale: 0.9 
      }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -12,
        scale: 1.02
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Member Card */}
      <motion.div
        className="relative overflow-hidden rounded-2xl mb-4 bg-gradient-to-br from-space-light/30 to-space-light/10 backdrop-blur-sm border border-white/10"
        whileHover={{ 
          borderColor: "rgba(255, 255, 255, 0.3)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Leader Badge */}
        {isLead && (
          <motion.div
            className="absolute top-3 right-3 z-30 p-2 bg-gradient-to-r from-mars/90 to-orange-500/90 rounded-full backdrop-blur-sm"
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.1, rotate: 360 }}
          >
            <Award className="w-4 h-4 text-white" />
          </motion.div>
        )}

        {/* Image Loading Placeholder */}
        {!imageLoaded && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-mars/20 to-cosmic/20 flex items-center justify-center aspect-square"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Users className="w-12 h-12 text-white/40" />
          </motion.div>
        )}

        {/* Member Image */}
        <motion.img 
          src={image} 
          alt={name} 
          className="w-full aspect-square object-cover object-center"
          onLoad={() => setImageLoaded(true)}
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-space/90 via-space/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Social Links */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 z-20"
          initial={{ y: "100%" }}
          animate={{ y: isHovered ? 0 : "100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex space-x-3">
            {linkedin && (
              <motion.a 
                href={linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-cosmic/30 hover:bg-cosmic/50 rounded-full text-white transition-colors backdrop-blur-sm border border-white/20"
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={16} />
              </motion.a>
            )}
            {website && (
              <motion.a 
                href={website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-mars/30 hover:bg-mars/50 rounded-full text-white transition-colors backdrop-blur-sm border border-white/20"
                whileHover={{ scale: 1.1, rotate: -10 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe size={16} />
              </motion.a>
            )}
          </div>
        </motion.div>

        {/* Hover Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent"
          animate={{
            borderColor: isHovered ? "rgba(0, 217, 255, 0.4)" : "transparent",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Skill Level Indicator */}
        <motion.div
          className="absolute bottom-2 right-2 flex space-x-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8
          }}
          transition={{ duration: 0.3 }}
        >
          {[...Array(isLead ? 5 : role.includes('Senior') ? 4 : 3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gradient-to-r from-mars to-cosmic rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: i * 0.1 }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Member Info */}
      <motion.div
        className="text-center"
        animate={{
          y: isHovered ? -5 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.h3
          className="text-lg font-bold font-technospace mb-1"
          animate={{
            color: isHovered ? "#00d9ff" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          {name}
        </motion.h3>
        <motion.p
          className="text-white/70 text-sm"
          animate={{
            color: isHovered ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.7)",
          }}
          transition={{ duration: 0.3 }}
        >
          {role}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const TeamSection = () => {
  const sectionRef = useRef(null);
  const [selectedSubTeam, setSelectedSubTeam] = useState(0);
  const [hoveredTeam, setHoveredTeam] = useState(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Your original team data with isLead flag added
  const teamMembers = [
    {
      name: "Anushka Verma",
      role: "Team Lead",
      image: AnushkaVerma,
      linkedin: "https://www.linkedin.com/in/anushka-verma-534084217?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      isLead: true
    },
    {
      name: "Arin Weling",
      role: "Team Lead",
      image: ArinWeling,
      linkedin: "https://www.linkedin.com/in/arin-weling-584a39252?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      isLead: true
    },
    {
      name: "Arkapravo Patra",
      role: "Team Lead",
      image: Arkapravo,
      linkedin: "https://www.linkedin.com/in/arkapravo-patra-2a7819266?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      isLead: true
    },
    {
      name: "Tarshit Sehgal",
      role: "Team Lead",
      image: Tarshit,
      linkedin: "http://www.linkedin.com/in/tarshit-sehgal-a37665253",
      isLead: true
    }
  ];

  const subTeams = [
    {
      name: "Mechanical Team",
      members: [
        {
          name: "Bhuvan Prasad",
          role: "Mechanical Lead (Arm & LDT)",
          image: Bhuvan,
          linkedin: "https://www.linkedin.com/in/bhuvan-k-prasad-62124b297?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          isLead: true
        },
        {
          name: "Ajitesh Joshi",
          role: "Mechanical Lead (Mobility)",
          image: Ajitesh,
          linkedin: "https://www.linkedin.com/in/madhav48/",
          isLead: true
        },
        {
          name: "Anvit",
          role: "Senior Design Engineer (Arm & LDT)",
          image: AnvitKhade,
        },
        {
          name: "Dev",
          role: "Senior Design Engineer (Mobility)",
          image: Dev,
        },
        {
          name: "Param",
          role: "Senior Design Engineer (Mobility)",
          image: Param,
        },
        {
          name: "Rudra Khandelwal",
          role: "Junior Design Engineer (Arm & LDT)",
          image: Rudra,
        },
        {
          name: "Ryan D'Souza",
          role: "Junior Design Engineer (Arm & LDT)",
          image: Ryan,
        },
        {
          name: "Vidit Bohra",
          role: "Junior Design Engineer (Arm & LDT)",
          image: Vidit,
        },
        {
          name: "Ayush Mohapatra",
          role: "Junior Design Engineer (Mobility)",
          image: Ayush,
        },
        {
          name: "Jay Mistry",
          role: "Junior Design Engineer (Mobility)",
          image: Jay,
        },
        {
          name: "Shashwat Singh",
          role: "Junior Design Engineer (Mobility)",
          image: Shashwat,
        },
        {
          name: "Tanish Kharbanda",
          role: "Junior Design Engineer (Mobility)",
          image: Tanish,
        }
      ]
    },
    {
      name: "Electrical Team",
      members: [
        {
          name: "Arjoe Basak",
          role: "Electrical Lead",
          image: Arjoe,
          linkedin: "https://www.linkedin.com/in/arjoe-basak-a49256285",
          isLead: true
        },
        {
          name: "Sudhindra Sahoo",
          role: "Senior Design Engineer",
          image: Sudhindra,
        },
        {
          name: "Harshit Somani",
          role: "Junior Design Engineer",
          image: Harshit,
          linkedin: "#"
        },
        {
          name: "Radhika Agarwal",
          role: "Junior Design Engineer",
          image: Radhika,
        },
        {
          name: "Shawn Thomas Koshy",
          role: "Junior Design Engineer",
          image: shawn,
        },
        {
          name: "Shridhar Patil",
          role: "Junior Design Engineer",
          image: Shridhar,
        },
        {
          name: "Siddhant Kaul",
          role: "Junior Design Engineer",
          image: Siddhant,
        },
        {
          name: "Tanmay Sinha",
          role: "Junior Design Engineer",
          image: Tanmay,
        },
        {
          name: "Veeresh S K",
          role: "Junior Design Engineer",
          image: Veeresh,
        }
      ]
    },
    {
      name: "Software Team",
      members: [
        {
          name: "Madhav Agrawal",
          role: "Software Lead",
          image: Madhav,
          website: "https://www.linkedin.com/in/madhav48/",
          isLead: true
        },
        {
          name: "Dheer Prasad",
          role: "Junior Design Engineer",
          image: Dheer,
        },
        {
          name: "Gautam Mahale",
          role: "Junior Design Engineer",
          image: Gautam,
        },
        {
          name: "Jiya Gada",
          role: "Junior Design Engineer",
          image: Jiya,
        },
        {
          name: "Rishabh Parwal",
          role: "Junior Design Engineer",
          image: Rishabh,
        },
        {
          name: "Sairam Chari",
          role: "Junior Design Engineer",
          image: Sairam,
        },
        {
          name: "Tejas Kulkarni",
          role: "Junior Design Engineer",
          image: Tejas,
        }
      ]
    },
    {
      name: "Media, Design & Marketing Team",
      members: [
        {
          name: "Aditi Singh",
          role: "Team Member",
          image: Aditi,
        },
        {
          name: "Disha Gugale",
          role: "Team Member",
          image: Disha,
        },
        {
          name: "Rohan Shukla",
          role: "Team Member",
          image: Rohan,
        },
        {
          name: "Shreya Goyal",
          role: "Team Member",
          image: Shreya,
        },
        {
          name: "Srishti Poddar",
          role: "Team Member",
          image: Shrishti,
        }
      ]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section 
      ref={sectionRef}
      id="team" 
      className="section-padding bg-gradient-to-br from-space-dark via-space to-space-dark relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Enhanced Background Effects */}
      <motion.div
        className="absolute top-1/4 left-0 w-1/3 h-1/3 bg-gradient-to-r from-cosmic/15 to-blue-500/8 rounded-full blur-3xl"
        style={{ 
          y: backgroundY,
          scale: backgroundScale 
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.3, 1],
        }}
        transition={{
          rotate: { duration: 200, repeat: Infinity, ease: "linear" },
          scale: { duration: 70, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-l from-mars/15 to-orange-500/8 rounded-full blur-3xl"
        style={{ 
          y: backgroundY,
          scale: backgroundScale 
        }}
        animate={{
          rotate: [360, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          rotate: { duration: 190, repeat: Infinity, ease: "linear" },
          scale: { duration: 65, repeat: Infinity, ease: "easeInOut", delay: 20 }
        }}
      />

      {/* Floating Team Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [0, -80, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 40 + i * 5,
              repeat: Infinity,
              delay: i * 4,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Users className="w-5 h-5 text-white/10" />
          </motion.div>
        ))}
      </div>

      {/* Team Connection Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <defs>
            <linearGradient id="teamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b35" />
              <stop offset="50%" stopColor="#00d9ff" />
              <stop offset="100%" stopColor="#ff6b35" />
            </linearGradient>
          </defs>
          {[...Array(8)].map((_, i) => (
            <motion.path
              key={i}
              d={`M ${i * 15},20 Q ${i * 15 + 30},60 ${i * 15 + 60},20 Q ${i * 15 + 90},60 ${i * 15 + 120},20`}
              fill="none"
              stroke="url(#teamGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: [0, 0.4, 0],
              }}
              transition={{
                pathLength: { duration: 5, delay: i * 0.5 },
                opacity: { duration: 5, delay: i * 0.5, repeat: Infinity, repeatDelay: 10 }
              }}
            />
          ))}
        </svg>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="section-title relative inline-block"
            variants={itemVariants}
          >
            <span className="relative">
              Our Team
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-mars via-orange-500 to-cosmic rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </span>
          </motion.h2>
          
          <motion.p 
            className="section-subtitle flex items-center justify-center space-x-2"
            variants={itemVariants}
          >
            <Star className="w-5 h-5 text-cosmic" />
            <span>Meet the brilliant minds behind our Mars rover designs and innovations.</span>
          </motion.p>

          {/* Team Stats */}
          <motion.div
            className="flex items-center justify-center space-x-8 mt-8"
            variants={itemVariants}
          >
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-2xl font-bold text-gradient"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {teamMembers.length + subTeams.reduce((sum, team) => sum + team.members.length, 0)}+
              </motion.div>
              <div className="text-white/60 text-sm">Team Members</div>
            </motion.div>
            
            <div className="w-px h-8 bg-white/20"></div>
            
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-2xl font-bold text-gradient"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                {subTeams.length}
              </motion.div>
              <div className="text-white/60 text-sm">Subsystems</div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Leadership Team */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h3 
            className="text-2xl font-bold mb-8 font-technospace text-center flex items-center justify-center space-x-2"
            variants={itemVariants}
          >
            <Award className="w-6 h-6 text-mars" />
            <span>Leadership Team</span>
          </motion.h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} index={index} />
            ))}
          </div>
        </motion.div>
        
        {/* Sub-Teams Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-2xl font-bold mb-8 font-technospace text-center flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
          >
            <Zap className="w-6 h-6 text-cosmic" />
            <span>Our Sub-Teams</span>
          </motion.h3>
          
          {/* Team Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {subTeams.map((team, idx) => (
              <motion.button
                key={team.name}
                className={cn(
                  "py-3 px-6 rounded-xl border font-semibold transition-all duration-300 relative overflow-hidden backdrop-blur-sm",
                  selectedSubTeam === idx
                    ? "bg-gradient-to-r from-mars to-cosmic text-white border-white/30 shadow-lg"
                    : "bg-space-light/20 text-white/90 border-white/10 hover:border-white/20"
                )}
                onClick={() => setSelectedSubTeam(idx)}
                onMouseEnter={() => setHoveredTeam(idx)}
                onMouseLeave={() => setHoveredTeam(null)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {/* Background Gradient Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cosmic/20 to-mars/20 opacity-0"
                  animate={{ 
                    opacity: hoveredTeam === idx ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <span className="relative z-10">{team.name}</span>
                
                {/* Active Indicator */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-mars to-cosmic rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: selectedSubTeam === idx ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>
          
          {/* Team Members Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSubTeam}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {subTeams[selectedSubTeam].members.map((member, index) => (
                <TeamMember 
                  key={`${selectedSubTeam}-${index}`}
                  {...member} 
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        {/* Join Team Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-2xl font-bold mb-6 font-technospace flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
          >
            <UserPlus className="w-6 h-6 text-mars" />
            <span>Join Our Team</span>
          </motion.h3>
          
          <motion.p
            className="text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Are you passionate about space exploration and rover technology? We're always looking for talented 
            students to join our team and help us build the next generation of Mars rovers.
          </motion.p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-gradient-to-r from-mars via-orange-500 to-cosmic hover:from-mars-dark hover:via-orange-600 hover:to-cosmic-dark text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              
              <span className="relative z-10 flex items-center space-x-2">
                <UserPlus className="w-5 h-5" />
                <span className="font-semibold">Apply Now</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TeamSection;
