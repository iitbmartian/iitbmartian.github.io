import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Home, AlertTriangle, Rocket, Star, ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const controls = useAnimation();
  const rocketRef = useRef(null);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Start the animation sequence
    controls.start("visible");
  }, [location.pathname, controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    hidden: { y: 0 },
    visible: {
      y: [-20, 20, -20],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-space via-space-dark to-space relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <motion.div
        className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-l from-mars/15 to-orange-500/8 rounded-full blur-3xl"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.3, 1],
        }}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-gradient-to-r from-cosmic/15 to-blue-500/8 rounded-full blur-3xl"
        animate={{
          rotate: [360, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }
        }}
      />

      {/* Floating Space Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [0, -100, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Star className="w-4 h-4 text-white/20" />
          </motion.div>
        ))}
      </div>

      {/* Lost Signal Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <defs>
            <linearGradient id="signalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b35" />
              <stop offset="50%" stopColor="#00d9ff" />
              <stop offset="100%" stopColor="#ff6b35" />
            </linearGradient>
          </defs>
          {[...Array(6)].map((_, i) => (
            <motion.circle
              key={i}
              cx="50%"
              cy="50%"
              r={`${20 + i * 15}%`}
              fill="none"
              stroke="url(#signalGradient)"
              strokeWidth="1"
              strokeDasharray="10,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: [0, 0.3, 0],
                rotate: 360
              }}
              transition={{
                pathLength: { duration: 3, delay: i * 0.5 },
                opacity: { duration: 3, delay: i * 0.5, repeat: Infinity, repeatDelay: 5 },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" }
              }}
            />
          ))}
        </svg>
      </div>

      {/* Main Content */}
      <motion.div
        className="text-center relative z-10 max-w-2xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* 404 Animation */}
        <motion.div
          className="relative mb-8"
          variants={itemVariants}
        >
          {/* Large 404 */}
          <motion.h1
            className="text-8xl md:text-9xl font-bold font-technospace bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent relative"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            404
            
            {/* Glitch Effect */}
            <motion.div
              className="absolute inset-0 text-8xl md:text-9xl font-bold font-technospace text-red-500/30"
              animate={{
                x: [0, -2, 2, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
            >
              404
            </motion.div>
          </motion.h1>

          {/* Signal Lost Indicator */}
          <motion.div
            className="absolute -top-4 -right-4"
            variants={floatingVariants}
            animate="visible"
          >
            <div className="p-3 bg-red-500/20 rounded-full border border-red-500/30 backdrop-blur-sm">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
          </motion.div>
        </motion.div>

        {/* Lost in Space Message */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center justify-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <Search className="w-8 h-8 text-cosmic" />
            <span>Lost in Space</span>
          </motion.h2>
          
          <motion.p
            className="text-lg text-white/80 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Oops! The page you're looking for seems to have drifted into the void.
          </motion.p>
          
          <motion.p
            className="text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            Even our rover couldn't find this destination.
          </motion.p>
        </motion.div>

        {/* Floating Rover */}
        <motion.div
          className="mb-12 flex justify-center"
          variants={itemVariants}
        >
          <motion.div
            ref={rocketRef}
            className="relative"
            variants={floatingVariants}
            animate="visible"
          >
            <motion.div
              className="p-6 bg-gradient-to-br from-mars/30 to-cosmic/30 rounded-2xl border border-white/20 backdrop-blur-sm"
              whileHover={{ 
                scale: 1.05,
                rotate: [0, -5, 5, 0]
              }}
              transition={{ duration: 0.5 }}
            >
              <Rocket className="w-16 h-16 text-white/90" />
            </motion.div>
            
            {/* Thruster Effect */}
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-gradient-to-t from-orange-500/60 to-transparent rounded-full blur-sm"
              animate={{
                scaleY: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>

        {/* Navigation Options */}
        <motion.div
          className="space-y-4"
          variants={itemVariants}
        >
          {/* Return Home Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/">
              <motion.button
                className="bg-gradient-to-r from-mars via-orange-500 to-cosmic hover:from-mars-dark hover:via-orange-600 hover:to-cosmic-dark text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group font-medium"
                whileHover={{ y: -2 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                
                <span className="relative z-10 flex items-center space-x-2">
                  <Home className="w-5 h-5" />
                  <span>Return to Mission Control</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </motion.div>
                </span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Alternative Navigation */}
          <motion.div
            className="flex justify-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <Link to="/rover" className="text-cosmic hover:text-cyan-300 transition-colors duration-300 flex items-center space-x-1">
              <Rocket className="w-4 h-4" />
              <span>Rovers</span>
            </Link>
            <span className="text-white/30">•</span>
            <Link to="/team" className="text-cosmic hover:text-cyan-300 transition-colors duration-300 flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>Team</span>
            </Link>
            <span className="text-white/30">•</span>
            <Link to="/gallery" className="text-cosmic hover:text-cyan-300 transition-colors duration-300 flex items-center space-x-1">
              <Search className="w-4 h-4" />
              <span>Gallery</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Error Details */}
        <motion.div
          className="mt-12 p-4 bg-space-light/20 rounded-lg border border-white/10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <p className="text-white/60 text-sm">
            <span className="font-medium text-red-400">Path not found:</span> {location.pathname}
          </p>
        </motion.div>
      </motion.div>

      {/* Emergency Signal */}
      <motion.div
        className="absolute top-8 right-8"
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="flex items-center space-x-2 px-3 py-2 bg-red-500/20 rounded-full border border-red-500/30 backdrop-blur-sm">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-red-400 text-sm font-medium">SIGNAL LOST</span>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
