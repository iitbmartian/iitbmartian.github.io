
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import RoverTimeline from '@/components/rover/RoverTimeline';

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  image: string;
  isRight?: boolean;
}

const TimelineItem = ({ year, title, description,   isRight = false }: TimelineItemProps) => (
  <div className={`flex flex-col ${isRight ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 mb-16`}>
    <div className="md:w-1/2">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-mars/20 to-cosmic/20 rounded-xl blur-lg"></div>
        
      </div>
    </div>
    <div className="md:w-1/2">
      <div className="bg-mars/20 text-white text-lg font-medium py-1 px-4 rounded-full inline-block mb-4">
        {year}
      </div>
      <h2 className="text-3xl font-bold mb-4 font-technospace">{title}</h2>
      <p className="text-white/80 mb-6">{description}</p>
    </div>
  </div>
);

const RoverPage = () => {
  const rovers = [
    {
      year: "2015",
      title: "Akrula 1.0",
      description: " Akrula 1.0 was the first-ever prototype developed by the IITB Mars Rover Team, launched in 2015. Equipped with advanced sensors, powerful computing systems, and robust mobility features, Akrula 1.0 was designed to navigate the harsh terrains of Mars with ease.",
      image: "https://via.placeholder.com/600x400?text=Rover+Alpha",
      achievements: [
        "Enhanced suspension system for improved terrain handling",
        "Implemented first-generation robotic arm with 3 degrees of freedom",
        "Ranked in top 10 at IRC 2019"
      ]
    },
    {
      year: "2016",
      title: "Agathsya 1.0",
      description: "Agathsya 1.0, the second Mars rover prototype by the IITB Mars Rover Team, was built in 2016. It features advanced navigational systems, data-gathering cameras, and a powerful AI capable of real-time object detection and data analysis.",
      image: "https://via.placeholder.com/600x400?text=Rover+Beta",
      achievements: [
        "Enhanced suspension system for improved terrain handling",
        "Implemented first-generation robotic arm with 3 degrees of freedom",
        "Ranked in top 10 at IRC 2019"
      ]
    },
    {
      year: "2017",
      title: "Agathsya 2.0",
      description: "Agathsya 2.0, the third Mars rover prototype developed in 2017, pushed the boundaries of exploration on the Red Planet. With advanced camera and sensor technology, it could explore farther and faster than its predecessors.",
      image: "https://via.placeholder.com/600x400?text=Rover+Gamma",
      achievements: [
        "Developed custom PCBs for improved system integration",
        "Implemented basic autonomous navigation features",
        "Enhanced robotic arm with 5 degrees of freedom and precision grippers"
      ]
    },
    {
      year: "2018",
      title: "Hemant 1.0",
      description: "Hemant 1.0, the fourth Mars rover prototype built in 2018, combined cutting-edge AI with an innovative design, enabling it to navigate even the harshest Martian terrain",
      image: "https://via.placeholder.com/600x400?text=Rover+Delta",
      achievements: [
        "Designed and implemented a rocker-bogie suspension system",
        "Advanced computer vision system for obstacle detection",
        "Qualified for University Rover Challenge for the first time"
      ]
    },
    {
      year: "2019-20",
      title: "Agruni 1.0",
      description: "Agruni 1.0, the fifth Mars rover prototype developed by the IITB Mars Rover Team, also proudly represented India at the University Rover Challenge.",
      image: "https://via.placeholder.com/600x400?text=Rover+Epsilon",
      achievements: [
        "Integrated soil analysis and life detection capabilities",
        "Implemented neural network-based terrain classification",
        "Secured Excellence Award at ERC 2022 in Navigation Task"
      ]
    },
    {
      year: "2020-21",
      title: "Yash",
      description: "Yash is equipped with LiDAR and autonomous mapping capabilities, enabling it to navigate complex obstacle courses by autonomously following directional arrows.",
      image: "https://via.placeholder.com/600x400?text=Rover+Zeta",
      achievements: [
        "Advanced autonomous navigation with SLAM and path planning",
        "High-precision sample collection and analysis system",
        "Secured top Indian team position at URC 2023"
      ]
    },
    {
      year: "2022-23",
      title: "Tezant",
      description: "Tezant, the eighth Mars rover prototype developed in 2022-23, features a new 6-DOF robotic arm with full 360° base rotation for enhanced versatility.",
      image: "https://via.placeholder.com/600x400?text=Rover+Epsilon",
      achievements: [
        "Integrated soil analysis and life detection capabilities",
        "Implemented neural network-based terrain classification",
        "Secured Excellence Award at ERC 2022 in Navigation Task"
      ]
    },
     {
      year: "2024",
      title: "Amaran",
      description: "Amaran is the ninth-generation Mars rover prototype developed by the IITB Mars Rover Team in 2024. Featuring a modular design with rugged all-terrain mobility, it combines precise robotic manipulation with advanced vision-based navigation for autonomous operation in challenging environments. Built with a focus on reliability, flexibility, and performance, Amaran continues the team’s legacy of innovation in planetary exploration robotics.",
      image: "https://via.placeholder.com/600x400?text=Rover+Epsilon",
      achievements: [
        "Integrated soil analysis and life detection capabilities",
        "Implemented neural network-based terrain classification",
        "Secured Excellence Award at ERC 2022 in Navigation Task"
      ]
    }
  ];
  
  const timelineEvents = [
    {
      date: "September 2012",
      title: "MRT Foundation",
      description: "The IITB Mars Rover Team was established in 2012, and since then, the team has been excelling and achieving milestones in the field of interplanetary exploration. Over the past eight years, the team has grown from a small group of students to a vibrant organization with several members.",
      image: "/lovable-uploads/33691edf-a52b-4cda-b3c4-bda5c7ee3051.png"
    },
    {
      date: "May 2015",
      title: "Arjuna 1.0",
      description: "Arjuna 1.0 was the first prototype ever created by IITB MRT, completed in May 2015. With its advanced sensors, powerful computing systems and robust mobility, Arjuna 1.0 is capable of traversing through the harsh terrain of Mars with ease.",
      image: "https://via.placeholder.com/600x400?text=Arjuna+1.0"
    },
    {
      date: "June 2016",
      title: "Arjuna 1.5",
      description: "The second Mars rover prototype, Arjuna 1.5, was built in 2016. Arjuna 1.5 had sophisticated mechanical systems and dedicated computing resources. It was equipped with sensors and a powerful AI that can detect things in real-time and evaluate data.",
      image: "https://via.placeholder.com/600x400?text=Arjuna+1.5"
    },
    {
      date: "April 2017",
      title: "Arjuna 2.0",
      description: "Arjuna 2.0, the third version of the Mars rovers created in 2017, is revolutionizing our understanding of the Red Planet. Equipped with autonomous navigation systems and advanced sensors, Arjuna 2.0 is able to explore even further and faster than any previous Mars rover.",
      image: "https://via.placeholder.com/600x400?text=Arjuna+2.0"
    }
  ];

  return (
    <div className="min-h-screen bg-space">
      <Navbar />
      
      <section className="pt-28 pb-20 bg-space-dark relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-mars/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-cosmic/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="section-title">Rovers Through The Years</h1>
            <p className="section-subtitle">
              Explore our journey of rover development, from our first prototype to our current competition-ready designs.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-mars via-cosmic to-mars hidden md:block"></div>
            
            {/* Timeline items */}
            <div className="relative z-10">
              {rovers.map((rover, index) => (
                <TimelineItem 
                  key={index} 
                  {...rover} 
                  isRight={index % 2 === 1}
                />
              ))}
            </div>
          </div>
          
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold mb-6 font-technospace">The Future of Our Rovers</h2>
            <p className="text-white/80 max-w-3xl mx-auto mb-8">
              As we continue to innovate and push the boundaries of what's possible, 
              our next generation of rovers will feature even more advanced technologies, 
              including swarm robotics, AI-powered decision making, and advanced materials 
              designed specifically for the harsh conditions of Mars.
            </p>
            <Button className="bg-gradient-to-r from-mars to-cosmic hover:opacity-90 text-white px-8 py-6">
              Join Us for the Journey
            </Button>
          </div>
        </div>
      </section>
      
      {/* Adding the new timeline section */}
      <RoverTimeline events={timelineEvents} />
      
      <Footer />
    </div>
  );
};

export default RoverPage;
