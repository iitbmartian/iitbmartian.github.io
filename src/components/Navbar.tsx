
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to the top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const scrollToContact = () => {
    if (location.pathname === '/') {
      // If already on home page, scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If not on home page, navigate to home page with contact hash
      navigate('/', { state: { scrollToContact: true } });
    }
    setIsMobileMenuOpen(false);
  };

  // Check for scrollToContact state when component mounts
  useEffect(() => {
    if (location.state?.scrollToContact) {
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        // Clear the state
        window.history.replaceState({}, document.title);
      }, 100); // Small delay to ensure the DOM is ready
    }
  }, [location.state]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Updates & Media', href: '/updates' },
    { name: 'Rover', href: '/rover' },
    { name: 'Our Subsystems', href: '/subsystems' },
    { name: 'Competitive Records', href: '/competitions' },
    { name: 'Know the Team', href: '/team' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '#', action: scrollToContact },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-space/90 backdrop-blur-lg shadow-md py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-technospace font-bold text-gradient">
              MRT - IITB
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => {
              if (link.action) {
                return (
                  <button
                    key={link.name}
                    onClick={link.action}
                    className="text-white/80 hover:text-white transition-colors font-medium text-sm whitespace-nowrap"
                  >
                    {link.name}
                  </button>
                );
              } else if (link.href.startsWith('#')) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors font-medium text-sm whitespace-nowrap"
                  >
                    {link.name}
                  </a>
                );
              } else {
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-white/80 hover:text-white transition-colors font-medium text-sm whitespace-nowrap"
                  >
                    {link.name}
                  </Link>
                );
              }
            })}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-space-dark border-t border-white/10 py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                if (link.action) {
                  return (
                    <button
                      key={link.name}
                      onClick={link.action}
                      className="text-white/80 hover:text-white transition-colors font-medium py-2"
                    >
                      {link.name}
                    </button>
                  );
                } else if (link.href.startsWith('#')) {
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors font-medium py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  );
                } else {
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-white/80 hover:text-white transition-colors font-medium py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
