
import React from 'react';
import { Cog, Code, Beaker, Presentation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface SubsystemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const Subsystem = ({ title, description, icon, color }: SubsystemProps) => (
  <div className="bg-space-light/30 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors">
    <div className={`inline-flex p-3 rounded-lg mb-4 ${color}`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 font-technospace">{title}</h3>
    <p className="text-white/70 mb-4">{description}</p>
  </div>
);

const SubsystemsSection = () => {
  const subsystems = [
    {
      title: "Mechanical",
      description: "Designing and fabricating the structure, mobility systems, and robotic arms of our rovers.",
      icon: <Cog className="h-6 w-6 text-white" />,
      color: "bg-mars/30"
    },
    {
      title: "Electronics & Control",
      description: "Creating circuits, sensors, and control systems that give our rovers their functionality.",
      icon: <Cog className="h-6 w-6 text-white" />,
      color: "bg-cosmic/30"
    },
    {
      title: "Software & Automation",
      description: "Developing algorithms for autonomous navigation, obstacle avoidance, and task execution.",
      icon: <Code className="h-6 w-6 text-white" />,
      color: "bg-mars/30"
    },
    {
      title: "Biosciences",
      description: "Integrating systems for scientific analysis and sample collection on extraterrestrial terrain.",
      icon: <Beaker className="h-6 w-6 text-white" />,
      color: "bg-cosmic/30"
    },
    {
      title: "Media, Design, Marketing & Business",
      description: "Handling the team's outreach, visual identity, sponsorships, and business relations.",
      icon: <Presentation className="h-6 w-6 text-white" />,
      color: "bg-mars/30"
    }
  ];

  return (
    <section id="subsystems" className="section-padding bg-space relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/3 left-0 w-1/2 h-1/3 bg-cosmic/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-0 w-1/3 h-1/2 bg-mars/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">The Stars That Form The Constellation</h2>
          <p className="section-subtitle">
            Our subsystems work in harmony to create rovers that are capable of tackling the challenges of extraterrestrial exploration.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {subsystems.map((subsystem, index) => (
            <Subsystem key={index} {...subsystem} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/subsystems">
            <Button className="bg-gradient-to-r from-mars to-cosmic hover:opacity-90 text-white px-8 py-6">
              Explore Our Subsystems
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SubsystemsSection;
