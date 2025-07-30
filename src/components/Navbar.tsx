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
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleContactClick = () => {
    if (pathname === '/') {
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setIsMobileMenuOpen(false);
  };

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
    { name: 'Contact', href: '/#contact', icon: '📞' },
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
    <>
      <motion.nav
        style={{ opacity: headerOpacity, scale: headerScale }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
          isScrolled 
            ? 'bg-gradient-to-r from-space/90 via-space-dark/90 to-space/90 backdrop-blur-2xl shadow-xl py-2 border-b border-mars/20' 
            : 'bg-transparent py-3'
        )}
      >
        {/* Compact animated border gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-mars/10 via-cosmic/10 to-mars/10"
          animate={{ 
            opacity: isScrolled ? 1 : 0,
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{ 
            opacity: { duration: 0.5 },
            backgroundPosition: { duration: 6, repeat: Infinity, ease: "linear" }
          }}
          style={{ backgroundSize: '200% 100%' }}
        />

        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between">
            {/* Compact Logo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center space-x-2 group cursor-pointer flex-shrink-0"
            >
              <Link href="/" className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ 
                    rotate: 360, 
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="relative"
                >
                  <Rocket className="w-5 h-5 text-mars" />
                  <motion.div
                    className="absolute inset-0 bg-mars/30 rounded-full blur-sm"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0.7, 0.4] 
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
                  <span className="text-lg font-bold bg-gradient-to-r from-mars via-orange-400 to-cosmic bg-clip-text text-transparent whitespace-nowrap">
                    MRT - IITB
                  </span>
                </motion.div>
              </Link>
            </motion.div>

            {/* Compact Desktop Menu */}
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
                        'relative px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 whitespace-nowrap',
                        isActiveLink(link.href) 
                          ? 'text-white bg-gradient-to-r from-mars/30 to-cosmic/30 border border-mars/40' 
                          : 'text-white/90 hover:text-white border border-transparent hover:border-mars/30',
                        'backdrop-blur-sm'
                      )}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -1
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="relative z-10 flex items-center space-x-1.5">
                        <motion.span 
                          className="text-sm"
                          animate={hoveredLink === link.name ? { 
                            scale: [1, 1.2, 1]
                          } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          {link.icon}
                        </motion.span>
                        <span>{link.name}</span>
                      </span>
                      
                      {/* Compact hover effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-mars/20 to-cosmic/20 rounded-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ 
                          opacity: hoveredLink === link.name ? 1 : 0,
                          scale: hoveredLink === link.name ? 1 : 0.9
                        }}
                        transition={{ duration: 0.2 }}
                      />
                      
                      {/* Compact active indicator */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-mars to-cosmic rounded-full"
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

            {/* Compact Mobile Menu Button */}
            <motion.button 
              className="xl:hidden relative p-1.5 text-white group flex-shrink-0 border border-mars/30 rounded-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-mars/20 to-cosmic/20 rounded-md"
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
                  {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Compact Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-12 left-0 right-0 xl:hidden overflow-hidden z-40"
          >
            <motion.div 
              className="bg-gradient-to-br from-space-dark/95 via-space/95 to-space-dark/95 backdrop-blur-2xl border-b border-mars/20"
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <div className="container mx-auto px-4 py-4">
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
                            "w-full text-center p-2.5 rounded-lg border transition-all duration-200",
                            isActiveLink(link.href)
                              ? "bg-gradient-to-r from-mars/30 to-cosmic/30 border-mars/50 text-white"
                              : "bg-gradient-to-r from-mars/10 to-cosmic/10 border-mars/20 text-white/90 hover:text-white hover:border-mars/40"
                          )}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="flex flex-col items-center space-y-1">
                            <span className="text-base">{link.icon}</span>
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
    </>
  );
};

export default Navbar;
