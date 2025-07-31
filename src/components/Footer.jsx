"use client";
import React, { useRef, useState, useEffect } from 'react';
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

const Footer = () => {
  const footerRef = useRef(null);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredContact, setHoveredContact] = useState(null);
  
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  const socialLinks = [
    {
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      gradient: "from-cyan-400 via-blue-500 to-blue-600",
      hoverColor: "hover:shadow-cyan-400/30",
      href: "#",
      description: "Latest updates"
    },
    {
      name: "Instagram", 
      icon: <Instagram className="h-5 w-5" />,
      gradient: "from-pink-500 via-purple-500 to-indigo-600",
      hoverColor: "hover:shadow-pink-500/30",
      href: "#",
      description: "Behind the scenes"
    },
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      gradient: "from-blue-600 via-blue-700 to-blue-800",
      hoverColor: "hover:shadow-blue-600/30",
      href: "#",
      description: "Community updates"
    },
    {
      name: "Github",
      icon: <Github className="h-5 w-5" />,
      gradient: "from-gray-600 via-gray-700 to-gray-900",
      hoverColor: "hover:shadow-gray-600/30",
      href: "#",
      description: "Open source projects"
    },
    {
      name: "Youtube",
      icon: <Youtube className="h-5 w-5" />,
      gradient: "from-red-500 via-red-600 to-red-700",
      hoverColor: "hover:shadow-red-500/30",
      href: "#",
      description: "Video content"
    }
  ];

  const navigationSections = [
    {
      title: "Navigation",
      icon: <Globe className="w-5 h-5" />,
      links: [
        { name: "Home", href: "/", icon: <Rocket className="w-3 h-3" /> },
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
  ];

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Location",
      text: "IIT Bombay, Powai\nMumbai, Maharashtra",
      gradient: "from-mars/20 via-orange-500/20 to-red-500/20"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      text: "contact@mrtiitb.com",
      gradient: "from-cosmic/20 via-blue-500/20 to-indigo-500/20"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      text: "+91 98765 43210",
      gradient: "from-mars/20 via-red-500/20 to-pink-500/20"
    }
  ];

  const stats = [
    { 
      number: "12+", 
      label: "Years", 
      icon: <Calendar className="w-5 h-5" />,
      gradient: "from-blue-500 to-cyan-500",
      description: "of innovation"
    },
    { 
      number: "150+", 
      label: "Members", 
      icon: <Users className="w-5 h-5" />,
      gradient: "from-purple-500 to-pink-500",
      description: "passionate engineers"
    },
    { 
      number: "25+", 
      label: "Competitions", 
      icon: <Award className="w-5 h-5" />,
      gradient: "from-yellow-500 to-orange-500",
      description: "worldwide"
    },
    { 
      number: "9", 
      label: "Rovers", 
      icon: <Rocket className="w-5 h-5" />,
      gradient: "from-red-500 to-mars",
      description: "built successfully"
    }
  ];

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
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
      style={{ y: backgroundY }}
    >
      {/* Simplified Background Effects */}
      <div className="absolute inset-0">
        {/* Static gradient orbs */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-mars/10 via-cosmic/15 to-purple-500/10 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-cosmic/15 to-blue-500/10 rounded-full blur-2xl opacity-60" />
        
        {/* Simple grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,100,100,0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(100,100,255,0.2) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }}
          />
        </div>

        {/* Simple floating particles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-mars/20 to-cosmic/20"
            style={{
              width: 2,
              height: 2,
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6 py-16">
          
          {/* Simplified Stats Section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                whileHover={{ scale: 1.03, y: -3 }}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <div className={`bg-gradient-to-br ${stat.gradient}/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center transition-all duration-300 hover:border-white/40 relative overflow-hidden`}>
                  
                  {/* Simple background effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.gradient}/10 opacity-0`}
                    animate={{ opacity: hoveredStat === index ? 0.3 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className={`flex items-center justify-center mb-4 text-2xl relative z-10`}>
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient}/20 border border-white/10 group-hover:border-white/30 transition-all duration-300`}>
                      <div className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-3xl font-bold text-white mb-2 relative z-10 font-orbitron">
                    {stat.number}
                  </div>
                  
                  <div className="text-sm text-white/80 group-hover:text-white transition-colors duration-300 relative z-10 font-medium">
                    {stat.label}
                  </div>
                  
                  <motion.div 
                    className="text-xs text-white/60 mt-2 relative z-10"
                    initial={{ opacity: 0, height: 0 }}
                    animate={hoveredStat === index ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {stat.description}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Logo */}
              <motion.div
                className="flex items-center space-x-4 mb-6"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="relative w-14 h-14 bg-gradient-to-br from-mars via-orange-500 to-cosmic rounded-2xl flex items-center justify-center group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-mars to-cosmic rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
                  <Rocket className="w-7 h-7 text-white relative z-10" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold font-orbitron bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent">
                    MRT - IITB
                  </h3>
                  <p className="text-white/70 text-sm font-medium">Mars Rover Team</p>
                </div>
              </motion.div>

              {/* Description */}
              <p className="text-white/80 text-base leading-relaxed mb-8 font-light">
                Pioneering the future of planetary exploration through innovative rover design, 
                cutting-edge space robotics technology, and unwavering dedication to pushing 
                the boundaries of what's possible.
              </p>

              {/* Newsletter Signup */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h4 className="text-white font-semibold mb-4 text-base flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-cosmic" />
                  <span>Stay Updated</span>
                </h4>
                <form onSubmit={handleEmailSubmit} className="relative">
                  <div className="flex space-x-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 px-4 py-3 bg-space-dark/60 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-mars/50 focus:ring-2 focus:ring-mars/20 transition-all duration-300"
                    />
                    <motion.button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-mars to-cosmic rounded-xl text-white font-medium transition-all duration-300 disabled:opacity-50 hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isSubscribed}
                    >
                      {isSubscribed ? (
                        <div className="flex items-center space-x-2">
                          <span>✓</span>
                          <span>Subscribed!</span>
                        </div>
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>

              {/* Social Links */}
              <div>
                <h4 className="text-white font-semibold mb-4 text-base flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-cosmic" />
                  <span>Connect With Us</span>
                </h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="relative p-3 rounded-xl backdrop-blur-md border border-white/20 transition-all duration-300 group overflow-hidden hover:border-white/40"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={() => setHoveredSocial(index)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      {/* Background */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0`}
                        animate={{ opacity: hoveredSocial === index ? 0.3 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Icon */}
                      <div className="relative z-10 text-white/80 group-hover:text-white transition-colors duration-300">
                        {social.icon}
                      </div>

                      {/* Tooltip */}
                      <motion.div
                        className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-space-dark/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs text-white border border-white/20 pointer-events-none"
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={hoveredSocial === index ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="font-medium">{social.name}</div>
                        <div className="text-white/60 text-xs">{social.description}</div>
                      </motion.div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Navigation Sections */}
            {navigationSections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.4 + sectionIndex * 0.05 }}
                onMouseEnter={() => setHoveredSection(sectionIndex)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <motion.h4 
                  className="text-white font-semibold mb-6 flex items-center space-x-3 text-base"
                  whileHover={{ x: 3 }}
                >
                  <div className="text-cosmic p-1 rounded-lg bg-cosmic/20 border border-cosmic/30">
                    {section.icon}
                  </div>
                  <span>{section.title}</span>
                </motion.h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={linkIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: 0.5 + sectionIndex * 0.05 + linkIndex * 0.02 }}
                    >
                      <Link href={link.href}>
                        <motion.div
                          className="text-white/80 hover:text-white transition-all duration-300 flex items-center space-x-3 group relative text-sm py-1"
                          whileHover={{ x: 5, scale: 1.01 }}
                        >
                          <div className="w-6 h-6 bg-gradient-to-br from-mars/20 to-cosmic/20 rounded-lg flex items-center justify-center border border-white/10 group-hover:border-mars/40 transition-all duration-300">
                            <div className="text-mars group-hover:text-white text-xs">
                              {link.icon}
                            </div>
                          </div>
                          <span className="group-hover:text-mars transition-colors duration-300 font-medium">
                            {link.name}
                          </span>
                          <div className="opacity-0 group-hover:opacity-100 text-cosmic transition-opacity duration-300">
                            <ExternalLink className="w-3 h-3" />
                          </div>
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
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {contactInfo.map((contact, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.05 }}
                whileHover={{ scale: 1.02, y: -3 }}
                onMouseEnter={() => setHoveredContact(index)}
                onMouseLeave={() => setHoveredContact(null)}
              >
                <div className={`flex items-center space-x-4 p-6 bg-gradient-to-br ${contact.gradient} backdrop-blur-md border border-white/20 rounded-2xl group-hover:border-white/40 transition-all duration-300 relative overflow-hidden`}>
                  
                  {/* Background effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} opacity-0`}
                    animate={{ opacity: hoveredContact === index ? 0.2 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="p-4 bg-gradient-to-br from-space-dark/80 to-space/60 rounded-xl border border-white/20 flex-shrink-0 group-hover:border-white/40 transition-all duration-300 relative z-10">
                    <div className="text-mars group-hover:text-white transition-colors duration-300">
                      {contact.icon}
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <h5 className="text-white font-semibold text-base mb-2 group-hover:text-white transition-colors duration-300">
                      {contact.title}
                    </h5>
                    <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line group-hover:text-white transition-colors duration-300">
                      {contact.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="border-t border-white/20 backdrop-blur-sm py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="text-white/60 text-sm flex items-center space-x-2">
                <span>© {new Date().getFullYear()} Mars Rover Team IIT Bombay. All rights reserved.</span>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-white/60 text-sm flex items-center space-x-2">
                  <span>Crafted with</span>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
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
                  <span className="font-semibold bg-gradient-to-r from-mars to-cosmic bg-clip-text text-transparent">
                    ESHWAY
                  </span>
                </div>

                {/* Scroll to Top */}
                <motion.button
                  onClick={scrollToTop}
                  className="relative p-3 bg-gradient-to-r from-mars/20 to-cosmic/20 rounded-xl border border-white/20 text-white/80 hover:text-white hover:border-mars/40 transition-all duration-300 group overflow-hidden"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-mars to-cosmic opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                  />
                  <div className="relative z-10">
                    <ChevronUp className="w-5 h-5" />
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Simple decorative elements */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <Sparkles className="w-6 h-6 text-cosmic/40" />
      </motion.div>

      <div className="absolute top-10 right-10 opacity-20">
        <Star className="w-4 h-4 text-cosmic" />
      </div>

      <div className="absolute bottom-20 left-10 opacity-20">
        <Rocket className="w-5 h-5 text-mars" />
      </div>
    </motion.footer>
  );
};

export default Footer;
