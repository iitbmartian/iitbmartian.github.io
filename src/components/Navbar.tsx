"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Rocket } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.98]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Handle contact section scrolling with hash routing
  const handleContactClick = () => {
    if (pathname === '/') {
      // If already on home page, scroll to contact section
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setIsMobileMenuOpen(false);
  };

  // Check for contact hash and scroll
  useEffect(() => {
    if (window.location.hash === '#contact') {
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Updates', href: '/updates', icon: '📰' },
    { name: 'Rover', href: '/rover', icon: '🤖' },
    { name: 'Subsystems', href: '/subsystems', icon: '⚙️' },
    { name: 'Records', href: '/competitions', icon: '🏆' },
    { name: 'Team', href: '/team', icon: '👥' },
    { name: 'Gallery', href: '/gallery', icon: '📸' },
    { name: 'Contact', href: '/#contact', icon: '📞' }, // Using hash routing
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '/#contact') {
      if (typeof window !== 'undefined') {
        return window.location.hash === '#contact';
      }
      return false;
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.nav
      style={{ opacity: headerOpacity, scale: headerScale }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
        isScrolled 
          ? 'bg-gradient-to-r from-space/95 via-space-dark/95 to-space/95 backdrop-blur-xl shadow-2xl py-1' 
          : 'bg-transparent py-2'
      )}
    >
      {/* Animated border gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-0"
        animate={{ opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-blue-400/30 rounded-full"
            animate={{
              x: [0, 60, 0],
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.6,
            }}
            style={{
              left: `${15 + i * 20}%`,
              top: '50%',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-2 sm:px-4 relative">
        <div className="flex items-center justify-between">
          {/* Logo with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center space-x-2 group cursor-pointer flex-shrink-0"
          >
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative"
              >
                <Rocket className="w-5 h-5 text-blue-400" />
                <motion.div
                  className="absolute inset-0 bg-blue-400/20 rounded-full blur-sm"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                />
              </motion.div>
              
              <motion.div
                className="relative overflow-hidden"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-lg sm:text-xl font-technospace font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent whitespace-nowrap">
                  MRT - IITB
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-cyan-400/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Menu with enhanced animations */}
          <motion.div 
            className="hidden xl:flex items-center space-x-0.5"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative"
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <button
                  onClick={() => {
                    if (link.href === '/#contact') {
                      handleContactClick();
                      router.push('/#contact');
                    } else {
                      router.push(link.href);
                    }
                  }}
                >
                  <motion.div
                    className={cn(
                      'relative px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 whitespace-nowrap',
                      isActiveLink(link.href) 
                        ? 'text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20' 
                        : 'text-white/80 hover:text-white',
                      'before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/10 before:to-purple-500/10',
                      'before:rounded-lg before:opacity-0 before:transition-opacity before:duration-300',
                      'hover:before:opacity-100'
                    )}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="relative z-10 flex items-center space-x-1.5">
                      <span className="text-sm">{link.icon}</span>
                      <span>{link.name}</span>
                    </span>
                    
                    {/* Hover effect background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ 
                        opacity: hoveredLink === link.name ? 1 : 0,
                        scale: hoveredLink === link.name ? 1 : 0.9
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    {/* Active indicator */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ 
                        scaleX: isActiveLink(link.href) || hoveredLink === link.name ? 1 : 0 
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Menu Button with enhanced animation */}
          <motion.button 
            className="xl:hidden relative p-1.5 text-white group flex-shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={isMobileMenuOpen ? 'close' : 'open'}
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </AnimatePresence>
            
            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 bg-white/10 rounded-lg"
              initial={{ scale: 0, opacity: 0 }}
              whileTap={{ scale: 1.3, opacity: 0.3 }}
              transition={{ duration: 0.15 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="xl:hidden overflow-hidden"
          >
            <motion.div 
              className="bg-gradient-to-br from-space-dark/95 via-space/95 to-space-dark/95 backdrop-blur-xl border-t border-white/10"
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <div className="container mx-auto px-4 py-3">
                <motion.div 
                  className="grid grid-cols-2 sm:grid-cols-4 gap-2"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                    },
                    closed: {
                      transition: { staggerChildren: 0.03, staggerDirection: -1 }
                    }
                  }}
                  initial="closed"
                  animate="open"
                >
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      variants={{
                        open: { y: 0, opacity: 1 },
                        closed: { y: 10, opacity: 0 }
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          if (link.href === '/#contact') {
                            handleContactClick();
                          }
                        }}
                      >
                        <motion.div
                          className={cn(
                            "w-full text-center p-3 rounded-lg border border-white/5 transition-all duration-200",
                            isActiveLink(link.href)
                              ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white"
                              : "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20"
                          )}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="flex flex-col items-center space-y-1">
                            <span className="text-lg">{link.icon}</span>
                            <span className="font-medium text-xs whitespace-nowrap">{link.name}</span>
                          </span>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
