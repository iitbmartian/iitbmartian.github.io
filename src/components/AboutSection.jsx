import React, { useRef } from 'react';
import { Award, Flag, Users, Star, Rocket, Target, Lightbulb } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const figures = [
    { 
      number: "12+", 
      text: "Years and counting!", 
      icon: <Star className="h-6 w-6 text-cosmic" />,
      color: "from-cosmic/20 to-blue-500/20"
    },
    { 
      number: "50+", 
      text: "Active team members", 
      icon: <Users className="h-6 w-6 text-mars" />,
      color: "from-mars/20 to-orange-500/20"
    },
    { 
      number: "6", 
      text: "Entirely different rovers", 
      icon: <Rocket className="h-6 w-6 text-cosmic" />,
      color: "from-cosmic/20 to-purple-500/20"
    },
    { 
      number: "∞", 
      text: "Uncountable learnings!", 
      icon: <Star className="h-6 w-6 text-mars" />,
      color: "from-mars/20 to-yellow-500/20"
    }
  ];

  const highlights = [
    "Secured First position among all Indian teams in University Rover Challenge 2023, USA",
    "Secured 6th rank in Bio-sciences task in University Rover Challenge 2023, USA",
    "Achieved Excellence Award in Autonomous category in International Rover Challenge 2023",
    "Secured 5th Position out of 18 teams in International Rover Challenge IRC 2023",
    "Achieved Excellence Award in Navigation Task in European Rover Challenge 2022"
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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

  const CounterAnimation = ({ number, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
      <motion.h4
        ref={ref}
        className="text-4xl font-bold text-gradient mb-2 font-technospace"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ 
          duration: 0.6, 
          delay,
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
      >
        {number}
      </motion.h4>
    );
  };

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="section-padding bg-gradient-to-br from-space-dark via-space to-space-dark relative overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <motion.div
        className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-l from-mars/10 to-orange-500/5 rounded-full blur-3xl"
        style={{ 
          y: backgroundY,
          scale: backgroundScale 
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      <motion.div
        className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-r from-cosmic/10 to-blue-500/5 rounded-full blur-3xl"
        style={{ 
          y: backgroundY,
          scale: backgroundScale 
        }}
        animate={{
          rotate: [360, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6 + i % 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
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
            About Us
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-mars via-orange-500 to-cosmic rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.h2>
          
          <motion.p 
            className="section-subtitle max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Founded in 2012, MRT (Mars Rover Team) was established with a vision to make 
            significant strides in space exploration and autonomous robotics. Over the years, 
            our team has fostered an environment of inclusive growth and continuous learning, 
            leading to remarkable progress and consistent success in premier international competitions.
          </motion.p>
        </motion.div>
        
        {/* Vision and Mission Section */}
        <motion.div
          className="grid md:grid-cols-2 gap-10 items-start mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Vision */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <motion.div
              className="bg-gradient-to-br from-space-light/20 to-mars/5 rounded-2xl p-8 border border-white/10 relative overflow-hidden backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-mars/20 to-transparent rounded-full blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <div className="flex items-center mb-6">
                <motion.div
                  className="p-3 bg-gradient-to-br from-mars/20 to-orange-500/20 rounded-xl mr-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Target className="h-6 w-6 text-mars" />
                </motion.div>
                <h3 className="text-3xl font-bold font-technospace">Our Vision</h3>
              </div>
              
              <ul className="space-y-4 text-white/80">
                {[
                  "Establish IIT Bombay as a global leader in space robotics",
                  "Innovate in Mars Rover technology",
                  "Nurture sustainable and skilled talent pipeline",
                  "Contribute to advancements in planetary exploration",
                  "Build a legacy of engineering excellence and impactful research"
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start group"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="p-1 rounded-full bg-gradient-to-r from-mars/20 to-orange-500/20 mr-3 mt-1 flex-shrink-0"
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Flag className="h-4 w-4 text-mars" />
                    </motion.div>
                    <span className="group-hover:text-white transition-colors duration-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Mission */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <motion.div
              className="bg-gradient-to-br from-space-light/20 to-cosmic/5 rounded-2xl p-8 border border-white/10 relative overflow-hidden backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cosmic/20 to-transparent rounded-full blur-xl"
                animate={{
                  scale: [1.3, 1, 1.3],
                  opacity: [0.6, 0.3, 0.6],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
              
              <div className="flex items-center mb-6">
                <motion.div
                  className="p-3 bg-gradient-to-br from-cosmic/20 to-blue-500/20 rounded-xl mr-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Lightbulb className="h-6 w-6 text-cosmic" />
                </motion.div>
                <h3 className="text-3xl font-bold font-technospace">Our Mission</h3>
              </div>
              
              <motion.p
                className="text-white/80 leading-relaxed hover:text-white/90 transition-colors duration-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                To design, develop, and innovate cutting-edge extraterrestrial robotic solutions 
                while fostering a culture of excellence, collaboration, and technical expertise 
                among students. Through hands-on learning and global competitions, we aim to push 
                the boundaries of autonomous robotics and inspire the next generation of engineers.
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Key Figures Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {figures.map((figure, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-gradient-to-br from-space-light/30 to-space-light/10 rounded-2xl p-6 text-center border border-white/10 backdrop-blur-sm relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${figure.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative z-10">
                  <motion.div
                    className="flex justify-center mb-4"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className={`p-3 bg-gradient-to-br ${figure.color} rounded-full relative`}>
                      {figure.icon}
                      <motion.div
                        className="absolute inset-0 bg-white/10 rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0, 0.3, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.5,
                        }}
                      />
                    </div>
                  </motion.div>
                  
                  <CounterAnimation number={figure.number} delay={index * 0.2} />
                  
                  <motion.p
                    className="text-white/70 group-hover:text-white/90 transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {figure.text}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Highlights Section */}
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl font-bold mb-8 text-center font-technospace relative"
            variants={itemVariants}
          >
            When this team thrived globally
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-cosmic to-transparent rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "60%" }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.h2>
          
          <motion.div
            className="bg-gradient-to-br from-space-light/30 to-space-light/10 rounded-2xl p-8 border border-white/10 backdrop-blur-sm relative overflow-hidden"
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background decoration */}
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cosmic/10 to-transparent rounded-full blur-2xl"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.3, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            <ul className="space-y-6 relative z-10">
              {highlights.map((highlight, index) => (
                <motion.li
                  key={index}
                  className="flex items-start group"
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 8 }}
                >
                  <motion.div
                    className="p-2 bg-gradient-to-br from-cosmic/20 to-blue-500/20 rounded-xl mr-4 mt-1 flex-shrink-0"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Award className="h-5 w-5 text-cosmic" />
                  </motion.div>
                  <motion.p
                    className="text-white/90 group-hover:text-white transition-colors duration-300 leading-relaxed"
                  >
                    {highlight}
                  </motion.p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
