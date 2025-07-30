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
  Calendar,
  ChevronUp
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

  const backgroundY = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
  const isInView = useInView(footerRef, { once: true, margin: "-30px" });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const socialLinks = [
    {
      name: "Twitter",
      icon: <Twitter className="h-4 w-4" />,
      gradient: "from-cyan-400 to-blue-500",
      hoverColor: "hover:shadow-cyan-400/25",
      href: "#"
    },
    {
      name: "Instagram", 
      icon: <Instagram className="h-4 w-4" />,
      gradient: "from-pink-500 to-purple-600",
      hoverColor: "hover:shadow-pink-500/25",
      href: "#"
    },
    {
      name: "Facebook",
      icon: <Facebook className="h-4 w-4" />,
      gradient: "from-blue-600 to-blue-800",
      hoverColor: "hover:shadow-blue-600/25",
      href: "#"
    },
    {
      name: "Github",
      icon: <Github className="h-4 w-4" />,
      gradient: "from-gray-600 to-gray-800",
      hoverColor: "hover:shadow-gray-600/25",
      href: "#"
    },
    {
      name: "Youtube",
      icon: <Youtube className="h-4 w-4" />,
      gradient: "from-red-500 to-red-700",
      hoverColor: "hover:shadow-red-500/25",
      href: "#"
    }
  ];

  const navigationSections = [
    {
      title: "Navigation",
      icon: <Globe className="w-4 h-4" />,
      links: [
        { name: "Home", href: "/" },
        { name: "Updates", href: "/updates" },
        { name: "Rover", href: "/rover" },
        { name: "Subsystems", href: "/subsystems" }
      ]
    },
    {
      title: "Explore",
      icon: <Award className="w-4 h-4" />,
      links: [
        { name: "Records", href: "/competitions" },
        { name: "Team", href: "/team" },
        { name: "Gallery", href: "/gallery" },
        { name: "Contact", href: "/#contact" }
      ]
    },
    {
      title: "Resources",
      icon: <Star className="w-4 h-4" />,
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "Publications", href: "/publications" },
        { name: "Blog", href: "/blog" },
        { name: "Press Kit", href: "/press" }
      ]
    }
  ];

  const contactInfo = [
    {
      icon: <MapPin className="h-4 w-4" />,
      title: "Location",
      text: "IIT Bombay, Powai\nMumbai, Maharashtra",
      gradient: "from-mars/20 to-orange-500/20"
    },
    {
      icon: <Mail className="h-4 w-4" />,
      title: "Email",
      text: "contact@mrtiitb.com",
      gradient: "from-cosmic/20 to-blue-500/20"
    },
    {
      icon: <Phone className="h-4 w-4" />,
      title: "Phone",
      text: "+91 98765 43210",
      gradient: "from-mars/20 to-red-500/20"
    }
  ];

  const stats = [
    { number: "12+", label: "Years", icon: <Calendar className="w-4 h-4" /> },
    { number: "150+", label: "Members", icon: <Users className="w-4 h-4" /> },
    { number: "25+", label: "Competitions", icon: <Award className="w-4 h-4" /> },
    { number: "9", label: "Rovers", icon: <Rocket className="w-4 h-4" /> }
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
      {/* Simplified Background Effects */}
      <div className="absolute inset-0">
        {/* Main gradient orb */}
        <motion.div
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-mars/10 to-cosmic/10 rounded-full blur-3xl"
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
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 py-12">
          
          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-r from-mars/10 to-cosmic/10 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center group hover:border-mars/30 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="flex items-center justify-center mb-2 text-mars group-hover:text-cosmic transition-colors duration-300">
                  {stat.icon}
                </div>
                <div className="text-xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-xs text-white/70 group-hover:text-white/90 transition-colors duration-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Compact Logo */}
              <motion.div
                className="flex items-center space-x-3 mb-4"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="w-10 h-10 bg-gradient-to-r from-mars to-cosmic rounded-lg flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Rocket className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold font-technospace bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent">
                    MRT - IITB
                  </h3>
                  <p className="text-white/60 text-sm">Mars Rover Team</p>
                </div>
              </motion.div>

              {/* Compact description */}
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Pioneering planetary exploration through innovative rover design and cutting-edge space robotics technology.
              </p>

              {/* Newsletter Signup */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h4 className="text-white font-medium mb-3 text-sm">Stay Updated</h4>
                <form onSubmit={handleEmailSubmit} className="flex space-x-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-space-dark/50 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:border-mars/50 transition-colors duration-300"
                  />
                  <motion.button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-mars to-cosmic rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSubscribed}
                  >
                    {isSubscribed ? '✓' : <Send className="w-4 h-4" />}
                  </motion.button>
                </form>
              </motion.div>

              {/* Compact Social Links */}
              <div>
                <h4 className="text-white font-medium mb-3 text-sm">Follow Us</h4>
                <div className="flex space-x-2">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className={cn(
                        "relative p-2 rounded-lg backdrop-blur-sm border border-white/10 transition-all duration-300 group overflow-hidden",
                        social.hoverColor
                      )}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      whileHover={{ 
                        scale: 1.1, 
                        y: -2
                      }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={() => setHoveredSocial(index)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${social.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      <div className="relative z-10 text-white/70 group-hover:text-white transition-colors duration-300">
                        {social.icon}
                      </div>
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
                transition={{ duration: 0.6, delay: 0.3 + sectionIndex * 0.1 }}
              >
                <h4 className="text-white font-medium mb-4 flex items-center space-x-2 text-sm">
                  <div className="text-cosmic">
                    {section.icon}
                  </div>
                  <span>{section.title}</span>
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={linkIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: 0.4 + sectionIndex * 0.1 + linkIndex * 0.05 }}
                    >
                      <Link href={link.href}>
                        <motion.div
                          className="text-white/70 hover:text-white transition-all duration-300 flex items-center space-x-2 group relative text-sm"
                          whileHover={{ x: 4 }}
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
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {contactInfo.map((contact, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3 p-3 bg-gradient-to-r from-mars/5 to-cosmic/5 backdrop-blur-sm border border-white/10 rounded-lg group hover:border-mars/30 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -1 }}
              >
                <div className="p-2 bg-gradient-to-br from-space-dark/80 to-space/60 rounded-lg border border-white/10 flex-shrink-0 group-hover:border-mars/40 transition-colors duration-300">
                  <div className="text-mars group-hover:text-white transition-colors duration-300">
                    {contact.icon}
                  </div>
                </div>
                <div>
                  <h5 className="text-white font-medium text-sm mb-1">{contact.title}</h5>
                  <p className="text-white/70 text-xs leading-relaxed whitespace-pre-line group-hover:text-white/90 transition-colors duration-300">
                    {contact.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Compact Footer Bottom */}
        <motion.div
          className="border-t border-white/10 py-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
              <div className="text-white/50 text-xs">
                © {new Date().getFullYear()} Mars Rover Team IIT Bombay. All rights reserved.
              </div>
              
              <div className="flex items-center space-x-4">
                <motion.div
                  className="text-white/50 text-xs flex items-center space-x-2"
                  whileHover={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  <span>Made with</span>
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
                    <Heart className="w-3 h-3 text-red-500" />
                  </motion.div>
                  <span>by ESHWAY</span>
                </motion.div>

                {/* Compact Scroll to Top */}
                <motion.button
                  onClick={scrollToTop}
                  className="p-2 bg-gradient-to-r from-mars/20 to-cosmic/20 rounded-lg border border-white/10 text-white/70 hover:text-white hover:border-mars/40 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <ChevronUp className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle decorative element */}
      <motion.div
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Sparkles className="w-4 h-4 text-cosmic/20" />
        </motion.div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
