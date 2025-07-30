import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Rocket, 
  Star, 
  Mail, 
  MapPin, 
  Phone, 
  ExternalLink, 
  Heart, 
  Sparkles,
  Twitter,
  Instagram,
  Facebook,
  Github,
  Youtube
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Footer = () => {
  const footerRef = useRef(null);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  const socialLinks = [
    {
      name: "Twitter",
      icon: <Twitter className="h-6 w-6" />, // Much cleaner!
      gradient: "from-cyan-400/80 to-blue-500/80",
      href: "#"
    },
    {
      name: "Instagram", 
      icon: <Instagram className="h-6 w-6" />,
      gradient: "from-pink-500/80 to-purple-600/80",
      href: "#"
    },
    {
      name: "Facebook",
      icon: <Facebook className="h-6 w-6" />,
      gradient: "from-blue-600/80 to-blue-800/80", 
      href: "#"
    },
    {
      name: "GitHub",
      icon: <Github className="h-6 w-6" />,
      gradient: "from-gray-700/80 to-gray-900/80",
      href: "#"
    },
    {
      name: "YouTube",
      icon: <Youtube className="h-6 w-6" />,
      gradient: "from-red-600/80 to-red-800/80",
      href: "#"
    }
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Rover", href: "/rover" },
    { name: "Subsystems", href: "/subsystems" },
    { name: "Competitions", href: "/competitions" },
    { name: "Team", href: "/team" }
  ];

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5 text-mars" />,
      text: "IITB, Powai, Mumbai, Maharashtra 400076",
      gradient: "from-mars/20 to-orange-500/10"
    },
    {
      icon: <Mail className="h-5 w-5 text-cosmic" />,
      text: "contact@mrtiitb.com",
      gradient: "from-cosmic/20 to-blue-500/10"
    },
    {
      icon: <Phone className="h-5 w-5 text-mars" />,
      text: "+91 98765 43210",
      gradient: "from-mars/20 to-red-500/10"
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
    <motion.footer 
      ref={footerRef}
      className="bg-gradient-to-br from-space-dark via-space to-space-dark py-16 border-t border-white/10 relative overflow-hidden"
      style={{ y: backgroundY }}
    >
      {/* Enhanced Background Effects */}
      <motion.div
        className="absolute top-0 left-0 w-1/3 h-1/2 bg-gradient-to-r from-mars/10 to-orange-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-gradient-to-l from-cosmic/10 to-blue-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + i % 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Constellation Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <defs>
            <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b35" />
              <stop offset="100%" stopColor="#00d9ff" />
            </linearGradient>
          </defs>
          {[...Array(8)].map((_, i) => (
            <motion.circle
              key={i}
              cx={`${20 + i * 12}%`}
              cy={`${30 + (i % 2) * 40}%`}
              r="1"
              fill="url(#footerGradient)"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { 
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              } : {}}
              transition={{
                duration: 3,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Brand Section */}
          <motion.div
            className="md:col-span-1"
            variants={itemVariants}
            onMouseEnter={() => setHoveredSection('brand')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <motion.div
              className="flex items-center space-x-3 mb-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ rotate: hoveredSection === 'brand' ? 360 : 0 }}
                transition={{ duration: 0.8 }}
              >
                <Rocket className="w-8 h-8 text-mars" />
              </motion.div>
              
              <motion.div
                className="text-2xl font-bold font-technospace bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: hoveredSection === 'brand' ? ["0% 50%", "100% 50%"] : "0% 50%",
                }}
                transition={{ duration: 1 }}
              >
                MRT - IITB
              </motion.div>
            </motion.div>
            
            <motion.p
              className="text-white/70 mb-6 max-w-xs leading-relaxed"
              animate={{
                color: hoveredSection === 'brand' ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.7)",
              }}
              transition={{ duration: 0.3 }}
            >
              The Mars Rover Team at IIT Bombay is dedicated to designing and building next-generation rovers for Mars exploration.
            </motion.p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="relative group"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setHoveredSocial(index)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.div
                    className="text-white/70 hover:text-white p-3 rounded-full bg-space-light/20 backdrop-blur-sm border border-white/10 relative overflow-hidden"
                    whileHover={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${social.gradient} opacity-0`}
                      animate={{ opacity: hoveredSocial === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="relative z-10">
                      {social.icon}
                    </div>
                  </motion.div>
                  
                  {/* Tooltip */}
                  <motion.div
                    className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-space-dark/90 text-white text-xs px-2 py-1 rounded backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: hoveredSocial === index ? 1 : 0,
                      scale: hoveredSocial === index ? 1 : 0.8
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {social.name}
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Quick Links Section */}
          <motion.div
            variants={itemVariants}
            onMouseEnter={() => setHoveredSection('links')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <motion.h3
              className="font-bold text-lg mb-6 flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
            >
              <Star className="w-5 h-5 text-cosmic" />
              <span>Quick Links</span>
            </motion.h3>
            
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Link to={link.href}>
                    <motion.div
                      className="text-white/70 hover:text-white transition-colors flex items-center space-x-2 group"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-gradient-to-r from-mars to-cosmic rounded-full opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                      <span>{link.name}</span>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </motion.div>
                    </motion.div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contact Section */}
          <motion.div
            variants={itemVariants}
            onMouseEnter={() => setHoveredSection('contact')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <motion.h3
              className="font-bold text-lg mb-6 flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
            >
              <Mail className="w-5 h-5 text-mars" />
              <span>Contact</span>
            </motion.h3>
            
            <ul className="space-y-4">
              {contactInfo.map((contact, index) => (
                <motion.li
                  key={index}
                  className="flex items-start group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className="p-2 bg-gradient-to-br from-space-light/20 to-space-light/10 rounded-lg mr-3 mt-1 flex-shrink-0 border border-white/10"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} opacity-0 rounded-lg`}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="relative z-10">
                      {contact.icon}
                    </div>
                  </motion.div>
                  
                  <motion.span
                    className="text-white/70 group-hover:text-white/90 transition-colors duration-300 text-sm leading-relaxed"
                    animate={{
                      color: hoveredSection === 'contact' ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.7)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {contact.text}
                  </motion.span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
        
        {/* Footer Bottom */}
        <motion.div
          className="border-t border-white/10 mt-12 pt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p
              className="text-white/50 text-sm flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
            >
              <span>© {new Date().getFullYear()} Mars Rover Team IIT Bombay. All rights reserved.</span>
            </motion.p>
            
            <motion.div
              className="text-white/50 text-sm flex items-center space-x-2"
              whileHover={{ scale: 1.02, color: "rgba(255, 255, 255, 0.7)" }}
              transition={{ duration: 0.3 }}
            >
              <span>Designed and developed with</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Heart className="w-4 h-4 text-red-500" />
              </motion.div>
              <span>by Sunny from ESHWAY</span>
            </motion.div>
          </div>
          
          {/* Sparkle Effect */}
          <motion.div
            className="flex justify-center mt-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="w-6 h-6 text-cosmic/50" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
