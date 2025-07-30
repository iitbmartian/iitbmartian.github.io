"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
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
  Youtube,
  ArrowUp,
  Send,
  Globe,
  Award,
  Users,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const Footer = () => {
  const footerRef = useRef(null);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  // Smooth spring animation for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const socialLinks = [
    {
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      gradient: "from-cyan-400 to-blue-500",
      hoverColor: "hover:shadow-cyan-400/25",
      href: "#"
    },
    {
      name: "Instagram", 
      icon: <Instagram className="h-5 w-5" />,
      gradient: "from-pink-500 to-purple-600",
      hoverColor: "hover:shadow-pink-500/25",
      href: "#"
    },
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      gradient: "from-blue-600 to-blue-800",
      hoverColor: "hover:shadow-blue-600/25",
      href: "#"
    }
  ];

  const navigationSections = [
    {
      title: "Navigation",
      icon: <Globe className="w-5 h-5" />,
      links: [
        { name: "Home", href: "/" },
        { name: "Rover", href: "/rover" },
        { name: "Subsystems", href: "/subsystems" },
        { name: "Team", href: "/team" }
      ]
    },
    {
      title: "Competitions",
      icon: <Award className="w-5 h-5" />,
      links: [
        { name: "University Rover Challenge", href: "/competitions/urc" },
        { name: "European Rover Challenge", href: "/competitions/erc" },
        { name: "Indian Rover Challenge", href: "/competitions/irc" },
        { name: "Achievements", href: "/achievements" }
      ]
    },
    {
      title: "Resources",
      icon: <Star className="w-5 h-5" />,
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "Gallery", href: "/gallery" },
        { name: "Publications", href: "/publications" },
        { name: "Blog", href: "/blog" }
      ]
    }
  ];

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Address",
      text: "Indian Institute of Technology Bombay\nPowai, Mumbai, Maharashtra 400076",
      gradient: "from-mars/20 to-orange-500/20"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      text: "contact@mrtiitb.com",
      gradient: "from-cosmic/20 to-blue-500/20"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      text: "+91 98765 43210",
      gradient: "from-mars/20 to-red-500/20"
    }
  ];

  const stats = [
    { number: "12", label: "Years Active", icon: <Calendar className="w-5 h-5" /> },
    { number: "150+", label: "Team Members", icon: <Users className="w-5 h-5" /> },
    { number: "25+", label: "Competitions", icon: <Award className="w-5 h-5" /> },
    { number: "9", label: "Rover Generations", icon: <Rocket className="w-5 h-5" /> }
  ];

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer 
      ref={footerRef}
      className="relative bg-gradient-to-br from-space-dark via-space to-space-dark overflow-hidden"
      style={{ 
        y: backgroundY,
        scale: backgroundScale
      }}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-mars/15 to-orange-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-l from-cosmic/15 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.8, 0.4],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />

        {/* Particle Field */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
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

        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full">

        {/* Main Footer Content */}
        <div className="container mx-auto flex justify-center items-center px-4 py-16">
          <div className="flex-col justify-center items-center">
            
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Logo & Brand */}
              <motion.div
                className="flex items-center space-x-4 mb-6"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-mars to-cosmic rounded-xl flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold font-technospace bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent">
                    MRT - IITB
                  </h3>
                  <p className="text-white/60 text-sm">Mars Rover Team</p>
                </div>
              </motion.div>

              {/* Description */}
              <p className="text-white/70 mb-8 leading-relaxed">
                Pioneering the future of planetary exploration through innovative rover design, 
                cutting-edge technology, and relentless pursuit of excellence in space robotics.
              </p>


              {/* Social Links */}
              <div>
                <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className={cn(
                        "relative p-3 rounded-xl backdrop-blur-sm border border-white/10 transition-all duration-300 group overflow-hidden",
                        social.hoverColor
                      )}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      whileHover={{ 
                        scale: 1.1, 
                        y: -2,
                        borderColor: "rgba(255, 255, 255, 0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={() => setHoveredSocial(index)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      {/* Gradient Background */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${social.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Icon */}
                      <div className="relative z-10 text-white/70 group-hover:text-white transition-colors duration-300">
                        {social.icon}
                      </div>

                      {/* Tooltip */}
                      <motion.div
                        className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-space-dark/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-lg border border-white/20"
                        initial={{ opacity: 0, scale: 0.8, y: 5 }}
                        animate={{
                          opacity: hoveredSocial === index ? 1 : 0,
                          scale: hoveredSocial === index ? 1 : 0.8,
                          y: hoveredSocial === index ? 0 : 5
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {social.name}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-space-dark/90" />
                      </motion.div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Navigation Sections */}
            <div className="flex justify-between items-center">
              {navigationSections.map((section, sectionIndex) => (
                <motion.div
                  key={sectionIndex}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, delay: 0.3 + sectionIndex * 0.1 }}
                >
                  <h4 className="text-white font-semibold mb-6 flex items-center space-x-2">
                    <div className="text-cosmic">
                      {section.icon}
                    </div>
                    <span>{section.title}</span>
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <motion.li
                        key={linkIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: 0.4 + sectionIndex * 0.1 + linkIndex * 0.05 }}
                      >
                        <Link href={link.href}>
                          <motion.div
                            className="text-white/70 hover:text-white transition-all duration-300 flex items-center space-x-2 group relative"
                            whileHover={{ x: 8 }}
                          >
                            <motion.div
                              className="w-1 h-1 bg-gradient-to-r from-mars to-cosmic rounded-full opacity-0 group-hover:opacity-100"
                              initial={{ scale: 0 }}
                              whileHover={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            />
                            <span className="group-hover:text-mars transition-colors duration-300">
                              {link.name}
                            </span>
                            <motion.div
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              initial={{ scale: 0.8 }}
                              whileHover={{ scale: 1 }}
                            >
                              <ExternalLink className="w-3 h-3" />
                            </motion.div>
                          </motion.div>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Contact Section */}
            <motion.div
              className="lg:col-span-2 "
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h4 className="text-white font-semibold mb-6 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-mars" />
                <span>Contact</span>
              </h4>
              
              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={index}
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className="p-2 bg-gradient-to-br from-space-dark/80 to-space/60 rounded-lg border border-white/10 flex-shrink-0 group-hover:border-mars/40 transition-colors duration-300"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="text-mars group-hover:text-white transition-colors duration-300">
                          {contact.icon}
                        </div>
                      </motion.div>
                      <div>
                        <h5 className="text-white font-medium mb-1">{contact.title}</h5>
                        <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line group-hover:text-white/90 transition-colors duration-300">
                          {contact.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="border-t border-white/10 py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-white/50 text-sm">
                © {new Date().getFullYear()} Mars Rover Team IIT Bombay. All rights reserved.
              </div>
              
              <div className="flex items-center space-x-6">
                <motion.div
                  className="text-white/50 text-sm flex items-center space-x-2"
                  whileHover={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  <span>Designed with</span>
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

                {/* Scroll to Top Button */}
                <motion.button
                  onClick={scrollToTop}
                  className="p-2 bg-gradient-to-r from-mars/20 to-cosmic/20 rounded-lg border border-white/10 text-white/70 hover:text-white hover:border-mars/40 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <ArrowUp className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="w-6 h-6 text-cosmic/30" />
        </motion.div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
