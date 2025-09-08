"use client";
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
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
  Calendar,
  ChevronUp,
  Zap,
  Target,
  Shield,
  Code,
  Cpu,
  Satellite,
  Radio
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import RoverIcon from './icons/RoverIcon';
const Footer = () => {
  const footerRef = useRef(null);
  const brandRef = useRef(null);
  const contactRef = useRef(null);
  
  const [hoveredSection, setHoveredSection] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredContact, setHoveredContact] = useState(null);
  
  // Enhanced useInView for different sections
  const brandInView = useInView(brandRef, { 
    once: false, 
    margin: "-10% 0px -10% 0px",
    amount: 0.3
  });



  const contactInView = useInView(contactRef, { 
    once: false, 
    margin: "-15% 0px -15% 0px",
    amount: 0.3
  });

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  // Optimized transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.8]);

  // Memoized data
  const socialLinks = useMemo(() => [
    {
      name: "Instagram", 
      icon: <Instagram className="h-5 w-5" />,
      gradient: "from-pink-500 via-purple-500 to-indigo-600",
      hoverColor: "hover:shadow-pink-500/30",
      href: "https://www.instagram.com/iitb.marsroverteam?igsh=MWozeDZ2Z25tdjJmNA==",
      description: "Behind the scenes"
    },
    {
      name: "Github",
      icon: <Github className="h-5 w-5" />,
      gradient: "from-gray-600 via-gray-700 to-gray-900",
      hoverColor: "hover:shadow-gray-600/30",
      href: "https://github.com/iitbmartian",
      description: "Open source projects"
    },
    {
      name: "Youtube",
      icon: <Youtube className="h-5 w-5" />,
      gradient: "from-red-500 via-red-600 to-red-700",
      hoverColor: "hover:shadow-red-500/30",
      href: "https://www.youtube.com/@marsroverteamiitbombay2940",
      description: "Video content"
    }
  ], []);

  const navigationSections = useMemo(() => [
    {
      title: "Navigation",
      icon: <Globe className="w-5 h-5" />,
      links: [
        { name: "Home", href: "/", icon: <RoverIcon className="w-3 h-3" /> },
        { name: "Updates", href: "/updates", icon: <Zap className="w-3 h-3" /> },
        { name: "Rover", href: "/rover", icon: <Target className="w-3 h-3" /> },
        { name: "Subsystems", href: "/subsystems", icon: <Cpu className="w-3 h-3" /> }
      ]
    },
    {
      title: "Explore",
      icon: <Award className="w-5 h-5" />,
      links: [
        { name: "Records", href: "/competitions", icon: <Shield className="w-3 h-3" /> },
        { name: "Team", href: "/team", icon: <Users className="w-3 h-3" /> },
        { name: "Gallery", href: "/gallery", icon: <Star className="w-3 h-3" /> },
        { name: "Contact", href: "/#contact", icon: <Mail className="w-3 h-3" /> }
      ]
    },
    {
      title: "Resources",
      icon: <Star className="w-5 h-5" />,
      links: [
        { name: "Documentation", href: "/docs", icon: <Code className="w-3 h-3" /> },
        { name: "Publications", href: "/publications", icon: <Satellite className="w-3 h-3" /> },
        { name: "Blog", href: "/blog", icon: <Radio className="w-3 h-3" /> },
        { name: "Press Kit", href: "/press", icon: <ExternalLink className="w-3 h-3" /> }
      ]
    }
  ], []);

  const contactInfo = useMemo(() => [
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Location",
      text: "IIT Bombay, Powai, Mumbai",
      gradient: "from-mars/20 via-orange-500/20 to-red-500/20",
      action: () => window.open("https://maps.google.com/?q=IIT+Bombay+Powai+Mumbai", "_blank")
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      text: "iitbmartian@gmail.com",
      gradient: "from-cosmic/20 via-blue-500/20 to-indigo-500/20",
      action: () => window.open("mailto:iitbmartian@gmail.com", "_blank")
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      text: "+91 98765 43210",
      gradient: "from-mars/20 via-red-500/20 to-pink-500/20",
      action: () => window.open("tel:+919876543210", "_blank")
    }
  ], []);




  // Enhanced animation variants
  const footerVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      y: 30,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  }), []);

  const statVariants = useMemo(() => (index) => ({
    hidden: { opacity: 0, y: 40, scale: 0.8, rotateX: 15 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      rotateX: -10,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  }), []);

  const sectionVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      y: -15,
      transition: {
        duration: 0.4
      }
    }
  }), []);

  // Optimized event handlers
  const handleEmailSubmit = useCallback((e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  }, [email]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleStatHover = useCallback((index) => {
    setHoveredStat(index);
  }, []);

  const handleStatLeave = useCallback(() => {
    setHoveredStat(null);
  }, []);

  const handleSocialHover = useCallback((index) => {
    setHoveredSocial(index);
  }, []);

  const handleSocialLeave = useCallback(() => {
    setHoveredSocial(null);
  }, []);

  const handleContactHover = useCallback((index) => {
    setHoveredContact(index);
  }, []);

  const handleContactLeave = useCallback(() => {
    setHoveredContact(null);
  }, []);

  return (
    <motion.footer 
      ref={footerRef}
      className="relative bg-gradient-to-br from-space-dark via-space to-space-dark overflow-hidden"
      style={{ y: backgroundY }}
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-10%" }}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Enhanced gradient orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-mars/10 via-cosmic/15 to-purple-500/10 rounded-full blur-3xl"
          style={{ opacity: orbOpacity }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 60, repeat: Infinity, ease: "linear" }
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-cosmic/15 to-blue-500/10 rounded-full blur-2xl"
          style={{ opacity: orbOpacity }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [360, 270, 180, 90, 0],
          }}
          transition={{
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 45, repeat: Infinity, ease: "linear" }
          }}
        />

        {/* Enhanced grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <motion.div 
            className="absolute inset-0"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,100,100,0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(100,100,255,0.2) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }}
          />
        </div>

        {/* Enhanced floating particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-mars/20 to-cosmic/20"
            style={{
              width: 3,
              height: 3,
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6 py-16">
          


          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            
            {/* Enhanced Brand Section */}
            <motion.div
              ref={brandRef}
              className="lg:col-span-2"
              variants={sectionVariants}
              initial="hidden"
              animate={brandInView ? "visible" : "exit"}
            >
              {/* Enhanced Logo */}
              <motion.div
                className="flex items-center space-x-4 mb-6"

                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="relative w-14 h-14 bg-gradient-to-br from-mars via-orange-500 to-cosmic rounded-2xl flex items-center justify-center group"

                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-mars to-cosmic rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
                  <motion.div
                  >
                    <RoverIcon className="w-7 h-7 text-white relative z-10" />
                  </motion.div>
                </motion.div>
                <div>
                  <motion.h3 
                    className="text-2xl font-bold font-orbitron bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent"
                  >
                    MRT - IITB
                  </motion.h3>
                  <p className="text-white/70 text-sm font-medium">Mars Rover Team</p>
                </div>
              </motion.div>

              {/* Enhanced Description */}
              <motion.p 
                className="text-white/80 text-base leading-relaxed mb-8 font-light"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                Pioneering the future of planetary exploration through innovative rover design, 
                cutting-edge space robotics technology, and unwavering dedication to pushing 
                the boundaries of what's possible.
              </motion.p>

              {/* Enhanced Newsletter Signup */}
              <motion.div
                className="mb-8"
                variants={sectionVariants}
              >
                <motion.h4 
                  className="text-white font-semibold mb-4 text-base flex items-center space-x-2"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4 text-cosmic" />
                  </motion.div>
                  <span>Stay Updated</span>
                </motion.h4>
                <form onSubmit={handleEmailSubmit} className="relative">
                  <div className="flex space-x-3">
                    <motion.input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 px-4 py-3 bg-space-dark/60 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-mars/50 focus:ring-2 focus:ring-mars/20 transition-all duration-300"
                      whileFocus={{ scale: 1.01 }}
                    />
                    <motion.button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-mars to-cosmic rounded-xl text-white font-medium transition-all duration-300 disabled:opacity-50 hover:scale-105"
                      whileTap={{ scale: 0.95 }}
                      disabled={isSubscribed}
                    >
                      {isSubscribed ? (
                        <motion.div 
                          className="flex items-center space-x-2"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.5 }}
                          >
                            ✓
                          </motion.span>
                          <span>Subscribed!</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          transition={{ duration: 0.2 }}
                        >
                          <Send className="w-5 h-5" />
                        </motion.div>
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>

              {/* Enhanced Social Links */}
              <div>
                <motion.h4 
                  className="text-white font-semibold mb-4 text-base flex items-center space-x-2"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  >
                    <Globe className="w-4 h-4 text-cosmic" />
                  </motion.div>
                  <span>Connect With Us</span>
                </motion.h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative p-3 rounded-xl backdrop-blur-md border border-white/20 transition-all duration-300 group overflow-hidden hover:border-white/40"
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={brandInView ? { 
                        opacity: 1, 
                        y: 0, 
                        scale: 1 
                      } : { 
                        opacity: 0, 
                        y: 20, 
                        scale: 0.8 
                      }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.5 + index * 0.05,
                        type: "spring",
                        stiffness: 150
                      }}

                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={() => handleSocialHover(index)}
                      onMouseLeave={handleSocialLeave}
                    >
                      {/* Enhanced Background */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${social.gradient}`}
                        animate={{ opacity: hoveredSocial === index ? 0.4 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Enhanced Icon */}
                      <motion.div 
                        className="relative z-10 text-white/80 group-hover:text-white transition-colors duration-300"
                      >
                        {social.icon}
                      </motion.div>

                      {/* Enhanced Tooltip */}
                      <motion.div
                        className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-space-dark/90 backdrop-blur-sm px-3 py-2 rounded-lg text-xs text-white border border-white/20 pointer-events-none"
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={hoveredSocial === index ? { 
                          opacity: 1, 
                          y: 0, 
                          scale: 1 
                        } : { 
                          opacity: 0, 
                          y: 10, 
                          scale: 0.8 
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="font-medium">{social.name}</div>
                        <div className="text-white/60 text-xs">{social.description}</div>
                        <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-space-dark/90 rotate-45 border-r border-b border-white/20"></div>
                      </motion.div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Enhanced Navigation Sections */}
            {navigationSections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-10%" }}
              >
                <motion.h4 
                  className="text-white font-semibold mb-6 flex items-center space-x-3 text-base"

                >
                  <motion.div 
                    className="text-cosmic p-1 rounded-lg bg-cosmic/20 border border-cosmic/30"

                  >
                    {section.icon}
                  </motion.div>
                  <span>{section.title}</span>
                </motion.h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={linkIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 0.1 + linkIndex * 0.02 
                      }}
                      viewport={{ once: false }}
                    >
                      <Link href={link.href}>
                        <motion.div
                          className="text-white/80 hover:text-white transition-all duration-300 flex items-center space-x-3 group relative text-sm py-1"
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div 
                            className="w-6 h-6 bg-gradient-to-br from-mars/20 to-cosmic/20 rounded-lg flex items-center justify-center border border-white/10 group-hover:border-mars/40 transition-all duration-300"
                            transition={{ duration: 0.5 }}
                          >
                            <div className="text-mars group-hover:text-white text-xs">
                              {link.icon}
                            </div>
                          </motion.div>
                          <span className="group-hover:text-mars transition-colors duration-300 font-medium">
                            {link.name}
                          </span>
                          <motion.div 
                            className="opacity-0 group-hover:opacity-100 text-cosmic transition-opacity duration-300"
                          >
                          </motion.div>
                        </motion.div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Contact Section */}
          <motion.div
            ref={contactRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            variants={sectionVariants}
            initial="hidden"
            animate={contactInView ? "visible" : "exit"}
          >
            {contactInfo.map((contact, index) => (
              <motion.div
                key={index}
                className="relative group cursor-pointer perspective-1000"
                initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
                animate={contactInView ? { 
                  opacity: 1, 
                  scale: 1, 
                  rotateX: 0 
                } : { 
                  opacity: 0, 
                  scale: 0.9, 
                  rotateX: 15 
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1 + index * 0.1,
                  type: "spring",
                  stiffness: 120
                }}

                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => handleContactHover(index)}
                onMouseLeave={handleContactLeave}
                onClick={contact.action}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className={`flex items-center space-x-4 p-6 bg-gradient-to-br ${contact.gradient} backdrop-blur-md border border-white/20 rounded-2xl group-hover:border-white/40 transition-all duration-300 relative overflow-hidden`}>
                  
                  {/* Enhanced background effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${contact.gradient}`}
                    animate={{ opacity: hoveredContact === index ? 0.3 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div 
                    className="p-4 bg-gradient-to-br from-space-dark/80 to-space/60 rounded-xl border border-white/20 flex-shrink-0 group-hover:border-white/40 transition-all duration-300 relative z-10"
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-mars group-hover:text-white transition-colors duration-300">
                      {contact.icon}
                    </div>
                  </motion.div>
                  
                  <div className="relative z-10">
                    <motion.h5 
                      className="text-white font-semibold text-base mb-2 group-hover:text-white transition-colors duration-300 flex items-center"
                    >
                      {contact.title}
                      <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.h5>
                    <motion.p 
                      className="text-white/80 text-sm leading-relaxed whitespace-pre-line group-hover:text-white transition-colors duration-300"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {contact.text}
                    </motion.p>
                  </div>

                  {/* Enhanced glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-mars/5 to-cosmic/5 rounded-2xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredContact === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Footer Bottom */}
        <motion.div
          className="border-t border-white/20 backdrop-blur-sm py-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible" 
          viewport={{ once: false, margin: "-10%" }}
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <motion.div 
                className="text-white/60 text-sm flex items-center space-x-2"
              >
                <span>© {new Date().getFullYear()} Mars Rover Team IIT Bombay. All rights reserved.</span>
              </motion.div>
               
              <div className="flex items-center space-x-6">
                <Link target='_blank' href={'https://eshway.com/'} 
                  className="text-white/60 text-sm flex items-center space-x-2"
                >
                  <span>Developed and Maintained</span>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.3, 1],
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Heart className="w-4 h-4 text-red-500" />
                  </motion.div>
                  <span>by</span>
                  <motion.span 
                    className="font-semibold bg-gradient-to-r from-mars to-cosmic bg-clip-text text-transparent"
                  >
                    Eshway
                  </motion.span>
                </Link>

                {/* Enhanced Scroll to Top */}
                <motion.button
                  onClick={scrollToTop}
                  className="relative p-3 bg-gradient-to-r from-mars/20 to-cosmic/20 rounded-xl border border-white/20 text-white/80 hover:text-white hover:border-mars/40 transition-all duration-300 group overflow-hidden"

                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: false }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-mars to-cosmic opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                  />
                  <motion.div 
                    className="relative z-10"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronUp className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced decorative elements */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: false }}
        animate={{ rotate: [0, 360] }}
        style={{ transition: { rotate: { duration: 30, repeat: Infinity, ease: "linear" } } }}
      >
        <Sparkles className="w-6 h-6 text-cosmic/40" />
      </motion.div>

      <motion.div 
        className="absolute top-10 right-10 opacity-20"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity 
        }}
      >
        <Star className="w-4 h-4 text-cosmic" />
      </motion.div>

      <motion.div 
        className="absolute bottom-20 left-10 opacity-20"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 15, -15, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity 
        }}
      >
        <RoverIcon className="w-5 h-5 text-mars" />
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
