"use client";
import React, { useRef, useState } from 'react';
import { Mail, MapPin, Phone, Send, MessageCircle, Users, Globe, Star } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const ContactSection = () => {
  const sectionRef = useRef(null);
  const [hoveredContact, setHoveredContact] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5 text-mars" />,
      title: "Address",
      content: "IIT Bombay, Powai, Mumbai, Maharashtra 400076, India",
      gradient: "from-mars/30 to-orange-500/20",
      bgColor: "bg-mars/20"
    },
    {
      icon: <Mail className="h-5 w-5 text-cosmic" />,
      title: "Email",
      content: "marsrover@iitb.ac.in",
      gradient: "from-cosmic/30 to-blue-500/20",
      bgColor: "bg-cosmic/20"
    },
    {
      icon: <Phone className="h-5 w-5 text-mars" />,
      title: "Phone",
      content: "+91 (22) 2576 7890",
      gradient: "from-mars/30 to-red-500/20",
      bgColor: "bg-mars/20"
    }
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: (
        <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
        </svg>
      ),
      gradient: "from-blue-600/80 to-blue-800/80"
    },
    {
      name: "Twitter",
      icon: (
        <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
        </svg>
      ),
      gradient: "from-cyan-400/80 to-blue-500/80"
    },
    {
      name: "Instagram",
      icon: (
        <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
        </svg>
      ),
      gradient: "from-pink-500/80 to-purple-600/80"
    },
    {
      name: "GitHub",
      icon: (
        <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
        </svg>
      ),
      gradient: "from-gray-700/80 to-gray-900/80"
    },
    {
      name: "YouTube",
      icon: (
        <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
        </svg>
      ),
      gradient: "from-red-600/80 to-red-800/80"
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
    <section 
      ref={sectionRef}
      id="contact" 
      className="section-padding bg-gradient-to-br from-space via-space-dark to-space relative overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <motion.div
        className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-l from-cosmic/10 to-blue-500/5 rounded-full blur-3xl"
        style={{ 
          y: backgroundY,
          scale: backgroundScale 
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 70, repeat: Infinity, ease: "linear" },
          scale: { duration: 20, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      <motion.div
        className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-r from-mars/10 to-orange-500/5 rounded-full blur-3xl"
        style={{ 
          y: backgroundY,
          scale: backgroundScale 
        }}
        animate={{
          rotate: [360, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          rotate: { duration: 65, repeat: Infinity, ease: "linear" },
          scale: { duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }
        }}
      />

      {/* Floating Message Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [0, -25, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 12 + i * 1.5,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <MessageCircle className="w-4 h-4 text-white/10" />
          </motion.div>
        ))}
      </div>

      {/* Communication Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <defs>
            <linearGradient id="communicationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b35" />
              <stop offset="50%" stopColor="#00d9ff" />
              <stop offset="100%" stopColor="#ff6b35" />
            </linearGradient>
          </defs>
          {[...Array(4)].map((_, i) => (
            <motion.line
              key={i}
              x1={`${10 + i * 25}%`}
              y1="20%"
              x2={`${20 + i * 25}%`}
              y2="80%"
              stroke="url(#communicationGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: [0, 0.4, 0],
              }}
              transition={{
                pathLength: { duration: 3, delay: i * 0.5 },
                opacity: { duration: 3, delay: i * 0.5, repeat: Infinity, repeatDelay: 4 }
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
            <span className="relative text-gradient">
              Contact Us
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
            <Users className="w-5 h-5 text-cosmic" />
            <span>Have questions or want to learn more about our team? Get in touch with us.</span>
          </motion.p>
        </motion.div>
        
        <motion.div
          className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="text-2xl font-bold mb-8 font-technospace flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
            >
              <Globe className="w-6 h-6 text-cosmic" />
              <span>Get In Touch</span>
            </motion.h3>
            
            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4 group"
                  variants={itemVariants}
                  whileHover={{ x: 8, scale: 1.02 }}
                  onMouseEnter={() => setHoveredContact(index)}
                  onMouseLeave={() => setHoveredContact(null)}
                >
                  <motion.div
                    className={`${contact.bgColor} p-3 rounded-xl relative overflow-hidden`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} opacity-0`}
                      animate={{ 
                        opacity: hoveredContact === index ? 1 : 0,
                        scale: hoveredContact === index ? 1 : 0.8
                      }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="relative z-10">
                      {contact.icon}
                    </div>
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.h4
                      className="font-semibold text-white mb-1"
                      animate={{
                        color: hoveredContact === index ? "#00d9ff" : "#ffffff",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {contact.title}
                    </motion.h4>
                    <motion.p
                      className="text-white/70 group-hover:text-white/90 transition-colors duration-300"
                      animate={{
                        color: hoveredContact === index ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.7)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {contact.content}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Social Media Section */}
            <motion.div
              className="mt-12"
              variants={itemVariants}
            >
              <motion.h3 
                className="text-xl font-bold mb-6 font-technospace flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
              >
                <Star className="w-5 h-5 text-mars" />
                <span>Follow Us</span>
              </motion.h3>
              
              <div className="flex space-x-4 flex-wrap gap-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="relative group overflow-hidden"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <motion.div
                      className="bg-space-light/50 p-3 rounded-full backdrop-blur-sm border border-white/10 relative overflow-hidden"
                      whileHover={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
                    >
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${social.gradient} opacity-0`}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="relative z-10">
                        {social.icon}
                      </div>
                    </motion.div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            className="relative"
            variants={itemVariants}
          >
            <motion.div
              className="bg-gradient-to-br from-space-light/30 to-space-light/10 p-8 rounded-2xl border border-white/10 backdrop-blur-sm relative overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              {/* Form Background Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cosmic/5 to-mars/5 opacity-0"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <motion.h3 
                className="text-2xl font-bold mb-8 font-technospace flex items-center space-x-2 relative z-10"
                whileHover={{ scale: 1.02 }}
              >
                <Send className="w-6 h-6 text-cosmic " />
                <span>Send us a message</span>
              </motion.h3>
              
              <form className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                      Name
                    </label>
                    <motion.div
                      className="relative"
                      animate={{
                        scale: focusedField === 'name' ? 1.02 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Input 
                        id="name" 
                        type="text" 
                        placeholder="Your name" 
                        className="bg-space-light/50 text-black border-white/10 focus:border-cosmic/50 transition-all duration-300"
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-md border-2 border-cosmic/30 opacity-0 pointer-events-none"
                        animate={{ opacity: focusedField === 'name' ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                      Email
                    </label>
                    <motion.div
                      className="relative"
                      animate={{
                        scale: focusedField === 'email' ? 1.02 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Your email" 
                        className="bg-space-light/50 border-white/10 text-black focus:border-cosmic/50 transition-all duration-300"
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-md border-2 border-cosmic/30 opacity-0 pointer-events-none"
                        animate={{ opacity: focusedField === 'email' ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                  </motion.div>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="subject" className="block text-sm font-medium text-white/80 mb-2">
                    Subject
                  </label>
                  <motion.div
                    className="relative"
                    animate={{
                      scale: focusedField === 'subject' ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Input 
                      id="subject" 
                      type="text" 
                      placeholder="Subject" 
                      className="bg-space-light/50 border-white/10 text-black focus:border-cosmic/50 transition-all duration-300"
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-md border-2 border-cosmic/30 opacity-0 pointer-events-none"
                      animate={{ opacity: focusedField === 'subject' ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                    Message
                  </label>
                  <motion.div
                    className="relative"
                    animate={{
                      scale: focusedField === 'message' ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <textarea 
                      id="message" 
                      rows={4} 
                      placeholder="Your message" 
                      className="w-full bg-space-light/50 border border-white/10 rounded-md px-3 py-2 text-black focus:outline-none focus:border-cosmic/50 resize-none transition-all duration-300"
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-md border-2 border-cosmic/30 opacity-0 pointer-events-none"
                      animate={{ opacity: focusedField === 'message' ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="w-full bg-gradient-to-r from-mars via-orange-500 to-cosmic hover:from-mars-dark hover:via-orange-600 hover:to-cosmic-dark text-white py-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span className="font-semibold">Send Message</span>
                    </span>
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
