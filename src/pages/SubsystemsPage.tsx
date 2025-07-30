
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Cog, Code, Beaker, Presentation } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Description } from '@radix-ui/react-toast';

const SubsystemsPage = () => {
  const subsystems = [
    {
      id: "mechanical",
      title: "Mechanical",
      icon: <Cog className="h-6 w-6 text-mars" />,
      color: "text-mars",
      bgColor: "bg-mars/20",
      description: "Designing and building the physical structure of the rover",
      content: [
        {
          title: "Robotic Arm",
          description: "We design and build a multi-degree-of-freedom robotic arm capable of lifting and dropping objects up to 5 kg, turning knobs, pushing buttons, opening drawers, and performing other precise movement. Our work focuses on developing robust mechanisms, selecting the right materials, and improving control precision and system reliability."
        },
        {
          title: "Mobility System",
          description: "The rover uses a fully passive rocker-bogie suspension system — a tried and tested design for rough terrains.A novel 4-bar differential mechanism further improves chassis stability, keeping the rover level while traversing uneven ground.The suspension is built to climb over rocks up to 0.5 meters high and handle slopes steeper than 50 degrees.We are also developing an alternative 4-wheel suspension system using differential steering as a backup."
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
      icon: <Cog className="h-6 w-6 text-cosmic" />,
      color: "text-cosmic",
      bgColor: "bg-cosmic/20",
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
      icon: <Beaker className="h-6 w-6 text-cosmic" />,
      color: "text-cosmic",
      bgColor: "bg-cosmic/20",
      description: "Preliminary tests for moisture, temperature, and methane content are conducted using integrated sensors. The rover also performs microscopy to detect bacteria using the Gram staining method, with image processing used to quantify the findings. In-situ visible and UV range spectrometry helps identify biomolecules like proteins and ATP in samples. Additionally, new techniques such as microfluidics are being explored for potential on-rover bio-assay methods",
      content: [
        
      ]
    },
    {
      id: "media",
      title: "Media, Design, Marketing & Business",
      icon: <Presentation className="h-6 w-6 text-mars" />,
      color: "text-mars",
      bgColor: "bg-mars/20",
      description: "Managing team representation, outreach and sponsorships",
      content: [
        {
          title: "Media",
          description:"A crucial part of the student rover design competitions is making a video which demonstrates the capabilities of the rover design. For this, we need people with good video capturing and editing skills, so that we can showcase the working of the rover in its entirety. The work would typically include coming up with ideas of different ways/shots we can take of the rover, and making a high-quality video for submission purposes."
        },
        {
          title: "Design",
          description:"The design team is responsible for creating visually appealing and user-friendly designs for projects like websites, mobile apps, and marketing materials. They collaborate closely with the development team to ensure that designs are both functional and meet the team's needs. Skilled in design software and tools, the team has a strong grasp of design principles, user experience, and branding. They excel at thinking creatively and finding innovative solutions to design challenges, playing a crucial role in delivering a positive user experience and effectively communicating the team’s message."
        },
        {
          title: "Market Outreach",
          description: "We aim to deepen our expertise in robotics while also sharing our knowledge with the broader community to spark greater interest in technology. By participating in exhibitions and conferences, we connect with like-minded individuals and promote knowledge exchange. Members of this subdivision get the opportunity to represent the team, meet new people, and design outreach materials like posters, flyers, and more."
        }
      ]
    }
  ];

  const [activeSubsystem, setActiveSubsystem] = useState(subsystems[0].id);

  const selectedSubsystem = subsystems.find(sub => sub.id === activeSubsystem);

  return (
    <div className="min-h-screen bg-space">
      <Navbar />
      
      <section className="pt-28 pb-20 bg-space-dark relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-mars/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-cosmic/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="section-title">Our Subsystems</h1>
            <p className="section-subtitle">
              Specialized teams working together to create advanced rovers for extraterrestrial exploration.
            </p>
          </div>
          
          {/* Subsystem tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {subsystems.map((subsystem) => (
              <button
                key={subsystem.id}
                onClick={() => setActiveSubsystem(subsystem.id)}
                className={`py-3 px-5 rounded-xl flex items-center space-x-2 transition-colors ${
                  activeSubsystem === subsystem.id 
                    ? `${subsystem.bgColor} ${subsystem.color} border border-white/20` 
                    : "bg-space-light/30 text-white/70 hover:text-white"
                }`}
              >
                {subsystem.icon}
                <span>{subsystem.title}</span>
              </button>
            ))}
          </div>
          
          {/* Subsystem content */}
          {selectedSubsystem && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className={`inline-flex p-4 rounded-full ${selectedSubsystem.bgColor} mb-6`}>
                  {selectedSubsystem.icon}
                </div>
                <h2 className={`text-3xl font-bold mb-4 font-technospace ${selectedSubsystem.color}`}>
                  {selectedSubsystem.title}
                </h2>
                <p className="text-white/80 text-lg">
                  {selectedSubsystem.description}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {selectedSubsystem.content.map((item, index) => (
                  <Card key={index} className="bg-space-light/30 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-white/80 text-base">
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SubsystemsPage;
