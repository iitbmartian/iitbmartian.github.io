"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue, useAnimationControls } from 'framer-motion';
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredContact, setHoveredContact] = useState(null);
  
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const backgroundRotate = useTransform(scrollYProgress, [0, 1], [2, 0]);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 40,
    restDelta: 0.001
  });

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    const footer = footerRef.current;
    if (footer) {
      footer.addEventListener('mousemove', handleMouseMove);
      return () => footer.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

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
      gradient: "from-mars/20 via-orange-500/20 to-red-500/20",
      delay: 0.1
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      text: "contact@mrtiitb.com",
      gradient: "from-cosmic/20 via-blue-500/20 to-indigo-500/20",
      delay: 0.2
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      text: "+91 98765 43210",
      gradient: "from-mars/20 via-red-500/20 to-pink-500/20",
      delay: 0.3
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

  // Floating particles animation
  const FloatingParticle = ({ delay = 0, size = 2, duration = 8 }) => (
    <motion.div
      className="absolute rounded-full bg-gradient-to-r from-mars/30 to-cosmic/30"
      style={{
        width: size,
        height: size,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [-20, -100, -20],
        opacity: [0, 1, 0],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );

  return (
    <motion.footer 
      ref={footerRef}
      className="relative bg-gradient-to-br from-space-dark via-space to-space-dark overflow-hidden"
      style={{ 
        y: backgroundY,
        scale: backgroundScale,
        rotateX: backgroundRotate
      }}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-mars/15 via-cosmic/20 to-purple-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-cosmic/20 to-blue-500/15 rounded-full blur-2xl"
          animate={{
            scale: [0.8, 1.1, 0.8],
            opacity: [0.2, 0.5, 0.2],
            x: [-20, 20, -20],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Interactive mouse follower */}
        <motion.div
          className="absolute w-32 h-32 bg-gradient-to-r from-mars/10 to-cosmic/10 rounded-full blur-xl pointer-events-none"
          animate={{
            x: mousePosition.x + '%',
            y: mousePosition.y + '%',
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 30,
          }}
          style={{
            transform: 'translate(-50%, -50%)',
          }}
        />
        
        {/* Enhanced grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,100,100,0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(100,100,255,0.2) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '80px 80px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.5}
            size={Math.random() * 3 + 1}
            duration={Math.random() * 5 + 6}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6 py-16">
          
          {/* Enhanced Stats Section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.8, rotateY: -90 }}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.08, y: -8 }}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <motion.div
                  className={`bg-gradient-to-br ${stat.gradient}/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center transition-all duration-500 group-hover:border-white/40 relative overflow-hidden`}
                  whileHover={{ 
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.1)" 
                  }}
                >
                  {/* Animated background effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.gradient}/20 opacity-0 group-hover:opacity-100`}
                    initial={{ scale: 0, rotate: 0 }}
                    whileHover={{ scale: 1, rotate: 180 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  <motion.div 
                    className={`flex items-center justify-center mb-4 text-2xl relative z-10`}
                    animate={hoveredStat === index ? { 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient}/20 border border-white/10 group-hover:border-white/30`}>
                      <div className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                        {stat.icon}
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="text-3xl font-bold text-white mb-2 relative z-10"
                    animate={hoveredStat === index ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    {stat.number}
                  </motion.div>
                  
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
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            
            {/* Enhanced Brand Section */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Enhanced Logo */}
              <motion.div
                className="flex items-center space-x-4 mb-6"
                whileHover={{ scale: 1.03 }}
              >
                <motion.div
                  className="relative w-14 h-14 bg-gradient-to-br from-mars via-orange-500 to-cosmic rounded-2xl flex items-center justify-center group"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8, type: "spring" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-mars to-cosmic rounded-2xl blur-lg opacity-50 group-hover:opacity-100"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Rocket className="w-7 h-7 text-white relative z-10" />
                </motion.div>
                <div>
                  <motion.h3 
                    className="text-2xl font-bold font-technospace bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                  >
                    MRT - IITB
                  </motion.h3>
                  <p className="text-white/70 text-sm font-medium">Mars Rover Team</p>
                </div>
              </motion.div>

              {/* Enhanced description */}
              <motion.p 
                className="text-white/80 text-base leading-relaxed mb-8 font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Pioneering the future of planetary exploration through innovative rover design, 
                cutting-edge space robotics technology, and unwavering dedication to pushing 
                the boundaries of what's possible.
              </motion.p>

              {/* Enhanced Newsletter Signup */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h4 className="text-white font-semibold mb-4 text-base flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-cosmic" />
                  <span>Stay Updated</span>
                </h4>
                <form onSubmit={handleEmailSubmit} className="relative">
                  <div className="flex space-x-3">
                    <motion.input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 px-4 py-3 bg-space-dark/60 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-mars/50 focus:ring-2 focus:ring-mars/20 transition-all duration-300"
                      whileFocus={{ scale: 1.02 }}
                    />
                    <motion.button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-mars to-cosmic rounded-xl text-white font-medium transition-all duration-300 disabled:opacity-50"
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isSubscribed}
                    >
                      {isSubscribed ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center space-x-2"
                        >
                          <span>✓</span>
                          <span>Subscribed!</span>
                        </motion.div>
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>

              {/* Enhanced Social Links */}
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
                      className={cn(
                        "relative p-3 rounded-xl backdrop-blur-md border border-white/20 transition-all duration-500 group overflow-hidden",
                        social.hoverColor
                      )}
                      initial={{ opacity: 0, y: 30, rotateX: -90 }}
                      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: -90 }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                      whileHover={{ 
                        scale: 1.15, 
                        y: -5,
                        rotateY: 15
                      }}
                      whileTap={{ scale: 0.9 }}
                      onMouseEnter={() => setHoveredSocial(index)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      {/* Animated background */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0 group-hover:opacity-100`}
                        initial={{ scale: 0, rotate: 0 }}
                        whileHover={{ scale: 1, rotate: 180 }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      {/* Icon */}
                      <motion.div
                        className="relative z-10 text-white/80 group-hover:text-white transition-colors duration-300"
                        animate={hoveredSocial === index ? { 
                          rotate: [0, -10, 10, 0],
                          scale: [1, 1.1, 1]
                        } : {}}
                        transition={{ duration: 0.4 }}
                      >
                        {social.icon}
                      </motion.div>

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

            {/* Enhanced Navigation Sections */}
            {navigationSections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.4 + sectionIndex * 0.1 }}
                onMouseEnter={() => setHoveredSection(sectionIndex)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <motion.h4 
                  className="text-white font-semibold mb-6 flex items-center space-x-3 text-base"
                  whileHover={{ x: 5 }}
                >
                  <motion.div 
                    className="text-cosmic p-1 rounded-lg bg-cosmic/20 border border-cosmic/30"
                    animate={hoveredSection === sectionIndex ? { rotate: 360, scale: 1.1 } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    {section.icon}
                  </motion.div>
                  <span>{section.title}</span>
                </motion.h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={linkIndex}
                      initial={{ opacity: 0, x: -30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                      transition={{ duration: 0.6, delay: 0.5 + sectionIndex * 0.1 + linkIndex * 0.05 }}
                    >
                      <Link href={link.href}>
                        <motion.div
                          className="text-white/80 hover:text-white transition-all duration-300 flex items-center space-x-3 group relative text-sm py-1"
                          whileHover={{ x: 8, scale: 1.02 }}
                        >
                          <motion.div
                            className="w-6 h-6 bg-gradient-to-br from-mars/20 to-cosmic/20 rounded-lg flex items-center justify-center border border-white/10 group-hover:border-mars/40 transition-all duration-300"
                            whileHover={{ rotate: 180, scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="text-mars group-hover:text-white text-xs">
                              {link.icon}
                            </div>
                          </motion.div>
                          <span className="group-hover:text-mars transition-colors duration-300 font-medium">
                            {link.name}
                          </span>
                          <motion.div
                            className="opacity-0 group-hover:opacity-100 text-cosmic"
                            initial={{ x: -10 }}
                            whileHover={{ x: 0 }}
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
            ))}
          </div>

          {/* Enhanced Contact Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {contactInfo.map((contact, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, scale: 0.9, rotateY: -45 }}
                animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.9, rotateY: -45 }}
                transition={{ duration: 0.7, delay: 0.8 + contact.delay }}
                whileHover={{ scale: 1.05, y: -5 }}
                onMouseEnter={() => setHoveredContact(index)}
                onMouseLeave={() => setHoveredContact(null)}
              >
                <motion.div
                  className={`flex items-center space-x-4 p-6 bg-gradient-to-br ${contact.gradient} backdrop-blur-md border border-white/20 rounded-2xl group-hover:border-white/40 transition-all duration-500 relative overflow-hidden`}
                  whileHover={{ 
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.1)" 
                  }}
                >
                  {/* Animated background effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} opacity-0 group-hover:opacity-30`}
                    initial={{ scale: 0, rotate: 0 }}
                    animate={hoveredContact === index ? { scale: 1, rotate: 180 } : {}}
                    transition={{ duration: 0.6 }}
                  />
                  
                  <motion.div 
                    className="p-4 bg-gradient-to-br from-space-dark/80 to-space/60 rounded-xl border border-white/20 flex-shrink-0 group-hover:border-white/40 transition-all duration-300 relative z-10"
                    animate={hoveredContact === index ? { 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-mars group-hover:text-white transition-colors duration-300">
                      {contact.icon}
                    </div>
                  </motion.div>
                  
                  <div className="relative z-10">
                    <h5 className="text-white font-semibold text-base mb-2 group-hover:text-white transition-colors duration-300">
                      {contact.title}
                    </h5>
                    <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line group-hover:text-white transition-colors duration-300">
                      {contact.text}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Footer Bottom */}
        <motion.div
          className="border-t border-white/20 backdrop-blur-sm py-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <motion.div 
                className="text-white/60 text-sm flex items-center space-x-2"
                whileHover={{ color: "rgba(255, 255, 255, 0.8)" }}
              >
                <span>© {new Date().getFullYear()} Mars Rover Team IIT Bombay. All rights reserved.</span>
              </motion.div>
              
              <div className="flex items-center space-x-6">
                <motion.div
                  className="text-white/60 text-sm flex items-center space-x-2"
                  whileHover={{ color: "rgba(255, 255, 255, 0.8)" }}
                >
                  <span>Crafted with</span>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.3, 1],
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
                  <span>by</span>
                  <motion.span 
                    className="font-semibold bg-gradient-to-r from-mars to-cosmic bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                  >
                    ESHWAY
                  </motion.span>
                </motion.div>

                {/* Enhanced Scroll to Top */}
                <motion.button
                  onClick={scrollToTop}
                  className="relative p-3 bg-gradient-to-r from-mars/20 to-cosmic/20 rounded-xl border border-white/20 text-white/80 hover:text-white hover:border-mars/40 transition-all duration-300 group overflow-hidden"
                  whileHover={{ 
                    scale: 1.15, 
                    y: -3,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-mars to-cosmic opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="relative z-10"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
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
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Sparkles className="w-6 h-6 text-cosmic/40" />
        </motion.div>
      </motion.div>

      {/* Additional floating elements */}
      <div className="absolute top-10 right-10 opacity-20">
        <motion.div
          animate={{
            rotate: [0, 360],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Star className="w-4 h-4 text-cosmic" />
        </motion.div>
      </div>

      <div className="absolute bottom-20 left-10 opacity-20">
        <motion.div
          animate={{
            rotate: [360, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Rocket className="w-5 h-5 text-mars" />
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
