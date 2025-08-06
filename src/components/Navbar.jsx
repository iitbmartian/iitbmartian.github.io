"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import RoverIcon from "./icons/RoverIcon";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleContactClick = () => {
    if (pathname === "/") {
      setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (window.location.hash === "#contact") {
      setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/"},
    { name: "Updates", href: "/updates" },
    { name: "Rover", href: "/rover" },
    { name: "Subsystems", href: "/subsystems"},
    { name: "Records", href: "/competitions" },
    { name: "Team", href: "/team"},
    { name: "Gallery", href: "/gallery"},
    { name: "Contact", href: "/#contact"},
  ];

  const isActiveLink = (href) => {
    if (href === "/") return pathname === "/";
    if (href === "/#contact") {
      if (typeof window !== "undefined") {
        return window.location.hash === "#contact";
      }
      return false;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.nav
        style={{ opacity: headerOpacity }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
          isScrolled
            ? "bg-gradient-to-r from-space/90 via-space-dark/90 to-space/90 backdrop-blur-xl shadow-lg py-2 border-b border-mars/20"
            : "bg-transparent py-3"
        )}
      >
        {/* Simplified animated border gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-mars/10 via-cosmic/10 to-mars/10"
          animate={{
            opacity: isScrolled ? 0.3 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between">
            {/* Enhanced Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex items-center space-x-3 group cursor-pointer flex-shrink-0"
            >
              <button
                onClick={() => {
                  router.push("/");
                }}
                className="flex items-center space-x-3"
              >
                <motion.div

                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="relative w-8 h-8 bg-gradient-to-r from-mars/20 to-cosmic/20 rounded-lg flex items-center justify-center border border-mars/30"
                >
                  <RoverIcon className="w-5 h-5 text-mars" />
                  <div className="absolute inset-0 bg-mars/20 rounded-lg blur-sm opacity-60" />
                </motion.div>

                <motion.div
                  className="relative overflow-hidden"
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xl font-bold font-orbitron bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent whitespace-nowrap">
                    MRT - IITB
                  </span>
                  <div className="text-xs text-white/60 font-medium -mt-1">
                    Mars Rover Team
                  </div>
                </motion.div>
              </button>
            </motion.div>

            {/* Enhanced Desktop Menu */}
            <motion.div
              className="hidden xl:flex items-center space-x-1"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className="relative"
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <button
                    onClick={() => {
                      if (link.href === "/#contact") {
                        handleContactClick();
                        router.push("/#contact");
                      } else {
                        router.push(link.href);
                      }
                    }}
                  >
                    <motion.div
                      className={cn(
                        "relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 whitespace-nowrap border",
                        isActiveLink(link.href)
                          ? "text-white bg-gradient-to-r from-mars/30 to-cosmic/30 border-mars/40 shadow-lg"
                          : "text-white/90 hover:text-white border-transparent hover:border-mars/30 hover:bg-gradient-to-r hover:from-mars/10 hover:to-cosmic/10",
                        "backdrop-blur-sm"
                      )}
                      whileHover={{
                        scale: 1.05,
                        y: -2,
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="relative z-10 flex items-center space-x-2">
                                                <span>{link.name}</span>
                      </span>

                      {/* Simplified hover effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-mars/20 to-cosmic/20 rounded-xl opacity-0"
                        animate={{
                          opacity: hoveredLink === link.name ? 1 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      />


                    </motion.div>
                  </button>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Mobile Menu Button */}
            <motion.button
              className="xl:hidden relative p-2 text-white group flex-shrink-0 border border-mars/30 rounded-lg bg-gradient-to-r from-mars/10 to-cosmic/10 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-mars/20 to-cosmic/20 rounded-lg opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? "close" : "open"}
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-16 left-0 right-0 xl:hidden overflow-hidden z-40"
          >
            <motion.div
              className="bg-gradient-to-br from-space-dark/95 via-space/95 to-space-dark/95 backdrop-blur-xl border-b border-mars/20 shadow-2xl"
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <div className="container mx-auto px-4 py-6">
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.03, delayChildren: 0.1 },
                    },
                    closed: {
                      transition: {
                        staggerChildren: 0.02,
                        staggerDirection: -1,
                      },
                    },
                  }}
                  initial="closed"
                  animate="open"
                >
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      variants={{
                        open: { y: 0, opacity: 1 },
                        closed: { y: 10, opacity: 0 },
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          if (link.href === "/#contact") {
                            handleContactClick();
                          } else {
                            router.push(link.href);
                          }
                        }}
                      >
                        <motion.div
                          className={cn(
                            "w-full text-center p-3 rounded-xl border transition-all duration-300 backdrop-blur-sm",
                            isActiveLink(link.href)
                              ? "bg-gradient-to-r from-mars/30 to-cosmic/30 border-mars/50 text-white shadow-lg"
                              : "bg-gradient-to-r from-mars/10 to-cosmic/10 border-mars/20 text-white/90 hover:text-white hover:border-mars/40 hover:shadow-lg"
                          )}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="flex flex-col items-center space-y-2">
                                                        <span className="font-medium text-sm whitespace-nowrap">
                              {link.name}
                            </span>
                          </span>
                        </motion.div>
                      </button>
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
