'use client';
import React, { useState, useRef, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Cog, Code, Beaker, Presentation, Zap, Star, ArrowRight, Settings, Cpu, FlaskConical, Megaphone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const SubsystemsPage = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [activeSubsystem, setActiveSubsystem] = useState("mechanical");
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const headerInView = useInView(headerRef, { 
    once: false, 
    margin: "-10% 0px -10% 0px",
    amount: 0.3
  });

  // Optimized transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.8, 0.3]);

  // Memoized subsystems data
  const subsystems = useMemo(() => [
    {
      id: "mechanical",
      title: "Mechanical",
      icon: <Settings className="h-6 w-6 text-mars" />,
      color: "text-mars",
      bgColor: "bg-mars/20",
      gradient: "from-mars/30 to-orange-500/20",
      description: "Designing and building the physical structure of the rover",
      content: [
        {
          title: "Robotic Arm",
          description: "We design and build a multi-degree-of-freedom robotic arm capable of lifting and dropping objects up to 5 kg, turning knobs, pushing buttons, opening drawers, and performing other precise movement. Our work focuses on developing robust mechanisms, selecting the right materials, and improving control precision and system reliability."
        },
        {
          title: "Mobility System",
          description: "The rover uses a fully passive rocker-bogie suspension system — a tried and tested design for rough terrains. A novel 4-bar differential mechanism further improves chassis stability, keeping the rover level while traversing uneven ground. The suspension is built to climb over rocks up to 0.5 meters high and handle slopes steeper than 50 degrees. We are also developing an alternative 4-wheel suspension system using differential steering as a backup."
        },
        {
          title: "Bio-Assembly",
          description: "The rover collects soil and rock samples from various locations using a robotic arm with a drill-based method for depths up to 10 cm and a double-scoop mechanism for surface scraping. Samples are distributed to maintain contamination control and functionality standards, while advanced machinery on board enables bioassays to detect signs of life."
        },
        {
          title: "Chassis Design",
          description: "The chassis, made from lightweight hollow aluminium pipes, is robust enough to support the robotic arm, bioassembly, and all electrical components. It is designed to prevent stress accumulation, while the modular structure allows for easy removal and replacement of components."
        },
        {
          title: "Wheels",
          description: "The wheels, designed for Martian-like terrains, are 3d-printed to offer excellent traction while reducing impact transfer to the suspension system. The compact wheel hub efficiently supports load transfer, the motor, and its shaft."
        }
      ]
    },
    {
      id: "electronics",
      title: "Electronics & Control",
      icon: <Cpu className="h-6 w-6 text-cosmic" />,
      color: "text-cosmic",
      bgColor: "bg-cosmic/20",
      gradient: "from-cosmic/30 to-blue-500/20",
      description: "Developing the electrical systems and control mechanisms",
      content: [
        {
          title: "Controls",
          description: "All six wheels are independently driven via GPIO pins on a Raspberry Pi 3 in open loop, while the four steering wheels (front and rear) are steered using closed-loop control. Steering is managed by Roboclaw motor drivers with a Type II control system to track ramp inputs, while Hercules motor drivers control the drive. We are working on deriving a state-space description to enable the use of Inverse Kinematics or LQR control for the robotic arm, utilising the MoveIt! motion planning plugin."
        },
        {
          title: "Power",
          description: "The rover is powered by a custom 24v battery pack consisting of 3.7v LiPo cells. Power distribution is managed through a custom PCB with 24v-12v and 24v-5v DC-DC buck converters for each component. A capacitor bank is included on the PCB to mitigate the effects of back EMF from motors and actuators. Additionally, we are designing a Battery Management System (BMS) for cell balancing and monitoring the health of the LiPo cells during charging and discharging."
        },
        {
          title: "Communications",
          description: "We are using commercial off-the-shelf Poe wireless bridges operating in the 5.6 GHz band, with a maximum EIRP of 36 dBm, compliant with FCC UNII-1 regulations. These bridges have been tested for a 1 km non-LOS range and employ adaptive channel selection to switch to a different channel when interference occurs. The video feed is captured via onboard IP cameras, while telemetry is handled by passing messages between ROS nodes."
        }
      ]
    },
    {
      id: "software",
      title: "Software & Automation",
      icon: <Code className="h-6 w-6 text-mars" />,
      color: "text-mars",
      bgColor: "bg-mars/20",
      gradient: "from-purple-500/30 to-indigo-500/20",
      description: "Creating algorithms and software for autonomous operation",
      content: [
        {
          title: "Autonomation",
          description: "We use SLAM for mapping the environment, utilising high-power LIDAR for accurate visualisation. The system is currently running on Gazebo in a simulated environment, with continuous improvements to the algorithm. Initially, we will implement the algorithm on our smaller rover prototype before transitioning it to the main rover."
        },
        {
          title: "Visualisation",
          description: "We have created a URDF model of the rover to visualise its actions in the field through the GUI and autonomous node. GPS data from the APM module is plotted onto the RViz aerial map display using the mavros library and QT GUI. Additionally, we integrate the IP camera by streaming its RTSP feed through Opencv, converting it into an image message via the ROS-Opencv bridge, and visualising it in the GUI with the Image View widget."
        }
      ]
    },
    {
      id: "biosciences",
      title: "Biosciences",
      icon: <FlaskConical className="h-6 w-6 text-cosmic" />,
      color: "text-cosmic",
      bgColor: "bg-cosmic/20",
      gradient: "from-green-500/30 to-emerald-500/20",
      description: "Preliminary tests for moisture, temperature, and methane content are conducted using integrated sensors. The rover also performs microscopy to detect bacteria using the Gram staining method, with image processing used to quantify the findings. In-situ visible and UV range spectrometry helps identify biomolecules like proteins and ATP in samples. Additionally, new techniques such as microfluidics are being explored for potential on-rover bio-assay methods",
      content: []
    },
    {
      id: "media",
      title: "Media, Design, Marketing & Business",
      icon: <Megaphone className="h-6 w-6 text-mars" />,
      color: "text-mars",
      bgColor: "bg-mars/20",
      gradient: "from-pink-500/30 to-rose-500/20",
      description: "Managing team representation, outreach and sponsorships",
      content: [
        {
          title: "Media",
          description: "A crucial part of the student rover design competitions is making a video which demonstrates the capabilities of the rover design. For this, we need people with good video capturing and editing skills, so that we can showcase the working of the rover in its entirety. The work would typically include coming up with ideas of different ways/shots we can take of the rover, and making a high-quality video for submission purposes."
        },
        {
          title: "Design",
          description: "The design team is responsible for creating visually appealing and user-friendly designs for projects like websites, mobile apps, and marketing materials. They collaborate closely with the development team to ensure that designs are both functional and meet the team's needs. Skilled in design software and tools, the team has a strong grasp of design principles, user experience, and branding. They excel at thinking creatively and finding innovative solutions to design challenges, playing a crucial role in delivering a positive user experience and effectively communicating the team's message."
        },
        {
          title: "Market Outreach",
          description: "We aim to deepen our expertise in robotics while also sharing our knowledge with the broader community to spark greater interest in technology. By participating in exhibitions and conferences, we connect with like-minded individuals and promote knowledge exchange. Members of this subdivision get the opportunity to represent the team, meet new people, and design outreach materials like posters, flyers, and more."
        }
      ]
    }
  ], []);

  const selectedSubsystem = useMemo(() => 
    subsystems.find(sub => sub.id === activeSubsystem), 
    [subsystems, activeSubsystem]
  );

  // Optimized event handlers
  const handleSubsystemChange = useCallback((id) => {
    setActiveSubsystem(id);
  }, []);

  const handleCardHover = useCallback((index) => {
    setHoveredCard(index);
  }, []);

  const handleCardLeave = useCallback(() => {
    setHoveredCard(null);
  }, []);

  // Enhanced animation variants
  const headerVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 1.05,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }), []);

  const cardVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 40, 
      scale: 0.9,
      rotateX: 15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      rotateX: -10,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  }), []);

  const tabVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.9 
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 150,
        damping: 20
      }
    })
  }), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-dark via-space to-space-dark">
      
      <section 
        ref={sectionRef}
        className="pt-32 pb-24 relative overflow-hidden"
      >
        {/* Optimized Background Effects */}
        <div className="absolute inset-0">
          {/* Enhanced gradient orbs with better performance */}
          <motion.div
            className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-l from-mars/15 to-orange-500/8 rounded-full blur-3xl"
            style={{ 
              y: backgroundY,
              opacity: orbOpacity
            }}
          />
          
          <motion.div
            className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-gradient-to-r from-cosmic/15 to-blue-500/8 rounded-full blur-3xl"
            style={{ 
              y: backgroundY,
              opacity: orbOpacity
            }}
          />

          {/* Enhanced tech pattern */}
          <div className="absolute inset-0 opacity-5">
            <motion.svg 
              className="absolute inset-0 w-full h-full"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <defs>
                <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6b35" />
                  <stop offset="50%" stopColor="#00d9ff" />
                  <stop offset="100%" stopColor="#ff6b35" />
                </linearGradient>
              </defs>
              {[...Array(6)].map((_, i) => (
                <motion.path
                  key={i}
                  d={`M ${i * 20},0 L ${i * 20 + 60},60 L ${i * 20 + 120},0 L ${i * 20 + 180},60`}
                  fill="none"
                  stroke="url(#circuitGradient)"
                  strokeWidth="1"
                  opacity="0.3"
                  animate={{
                    pathLength: [0, 1, 0],
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    delay: i * 1,
                  }}
                />
              ))}
            </motion.svg>
          </div>

          {/* Optimized floating elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.1, 0.4, 0.1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 12 + i * 3,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
              >
                <Zap className="w-4 h-4 text-white/20" />
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Enhanced Header Section */}
          <motion.div
            ref={headerRef}
            className="text-center mb-16"
            variants={headerVariants}
            initial="hidden"
            animate={headerInView ? "visible" : "exit"}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold font-orbitron bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent relative mb-6"
              variants={itemVariants}
            >
              Our Subsystems
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed flex items-center justify-center space-x-3"
              variants={itemVariants}
            >
              <Star className="w-6 h-6 text-cosmic" />
              <span>Specialized teams working together to create advanced rovers for extraterrestrial exploration</span>
              <Settings className="w-6 h-6 text-mars" />
            </motion.p>


          </motion.div>
          
          {/* Enhanced Subsystem Tabs */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            viewport={{ once: false, margin: "-10%" }}
          >
            {subsystems.map((subsystem, index) => (
              <motion.button
                key={subsystem.id}
                onClick={() => handleSubsystemChange(subsystem.id)}
                className={cn(
                  "py-4 px-6 rounded-2xl flex items-center space-x-3 transition-all duration-300 border backdrop-blur-sm perspective-1000",
                  activeSubsystem === subsystem.id 
                    ? `${subsystem.bgColor} ${subsystem.color} border-white/30 shadow-lg shadow-mars/20` 
                    : "bg-space-light/20 text-white/70 hover:text-white border-white/10 hover:border-white/30"
                )}
                variants={tabVariants}
                initial="hidden"
                whileInView="visible"
                custom={index}
                viewport={{ once: false, margin: "-10%" }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  rotateY: 3
                }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  animate={{ 
                    rotate: activeSubsystem === subsystem.id ? 360 : 0,
                    scale: activeSubsystem === subsystem.id ? 1.1 : 1
                  }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  {subsystem.icon}
                </motion.div>
                <span className="font-medium whitespace-nowrap">{subsystem.title}</span>
              </motion.button>
            ))}
          </motion.div>
          
          {/* Enhanced Subsystem Content */}
          <AnimatePresence mode="wait">
            {selectedSubsystem && (
              <motion.div
                key={selectedSubsystem.id}
                className="max-w-6xl mx-auto"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 1.02 }}
                transition={{ 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 120,
                  damping: 20
                }}
              >
                {/* Enhanced Subsystem Header */}
                <motion.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <motion.div
                    className={`inline-flex p-6 rounded-2xl ${selectedSubsystem.bgColor} mb-6 relative overflow-hidden`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${selectedSubsystem.gradient} opacity-50`}
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                      transition={{ duration: 10, repeat: Infinity }}
                    />
                    <div className="relative z-10">
                      {selectedSubsystem.icon}
                    </div>
                  </motion.div>
                  
                  <motion.h2 
                    className={`text-4xl font-bold mb-4 font-orbitron ${selectedSubsystem.color}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {selectedSubsystem.title}
                  </motion.h2>
                  
                  <motion.p 
                    className="text-white/80 text-lg max-w-4xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {selectedSubsystem.description}
                  </motion.p>
                </motion.div>
                
                {/* Enhanced Content Cards */}
                {selectedSubsystem.content.length > 0 ? (
                  <motion.div
                    className="grid md:grid-cols-2 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      duration: 0.5,
                      delay: 0.4,
                      staggerChildren: 0.1
                    }}
                  >
                    {selectedSubsystem.content.map((item, index) => (
                      <motion.div
                        key={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ 
                          y: -8, 
                          scale: 1.02,
                          rotateY: 2
                        }}
                        onMouseEnter={() => handleCardHover(index)}
                        onMouseLeave={handleCardLeave}
                        transition={{ duration: 0.3 }}
                        className="perspective-1000"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <Card className="bg-gradient-to-br from-space-light/30 to-space-light/10 border-white/10 backdrop-blur-sm h-full relative overflow-hidden group hover:border-white/30 transition-all duration-300">
                          {/* Enhanced Card Background Effect */}
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-br ${selectedSubsystem.gradient}`}
                            initial={{ opacity: 0 }}
                            animate={{ 
                              opacity: hoveredCard === index ? 0.15 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          />
                          
                          <CardHeader className="relative z-10">
                            <div className="flex items-center space-x-3">
                              <motion.div
                                className={`p-2 rounded-lg ${selectedSubsystem.bgColor}`}
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                transition={{ duration: 0.5 }}
                              >
                                <ArrowRight className={`w-4 h-4 ${selectedSubsystem.color}`} />
                              </motion.div>
                              <CardTitle className="text-white group-hover:text-cyan-300 transition-colors duration-300">
                                {item.title}
                              </CardTitle>
                            </div>
                          </CardHeader>
                          
                          <CardContent className="relative z-10">
                            <CardDescription className="text-white/80 text-base leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                              {item.description}
                            </CardDescription>
                          </CardContent>
                          
                          {/* Enhanced hover indicator */}
                          <motion.div
                            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-mars to-cosmic rounded-full"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ 
                              width: hoveredCard === index ? "100%" : "0%",
                              opacity: hoveredCard === index ? 1 : 0
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                          />

                          {/* Additional glow effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-mars/5 to-cosmic/5 rounded-xl pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.4,
                      type: "spring",
                      stiffness: 150,
                      damping: 20
                    }}
                  >
                    <motion.div
                      className={`inline-flex p-6 rounded-2xl ${selectedSubsystem.bgColor} mb-6`}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {selectedSubsystem.icon}
                    </motion.div>
                    <motion.h3 
                      className="text-2xl font-bold text-white/80 mb-4"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      Comprehensive Overview
                    </motion.h3>
                    <motion.p 
                      className="text-white/60 max-w-2xl mx-auto"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      This subsystem covers all aspects described above in an integrated approach.
                    </motion.p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      
    </div>
  );
};

export default SubsystemsPage;
