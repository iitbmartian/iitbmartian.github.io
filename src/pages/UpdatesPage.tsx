
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Newspaper } from 'lucide-react';

const UpdateCard = ({ title, date, image, content, link }: { 
  title: string; 
  date: string; 
  image?: string; 
  content: string;
  link?: string;
}) => (
  <div className="bg-space-light/30 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300">
    {image && (
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
        />
      </div>
    )}
    <div className="p-6">
      <div className="flex items-center mb-3">
        <Calendar className="h-4 w-4 text-cosmic mr-2" />
        <span className="text-white/70 text-sm">{date}</span>
      </div>
      <h3 className="text-xl font-bold mb-3 font-technospace">{title}</h3>
      <p className="text-white/80 mb-4">{content}</p>
      {link && (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-cosmic hover:text-cosmic-light flex items-center"
        >
          <Newspaper className="h-4 w-4 mr-2" />
          Read full article
        </a>
      )}
    </div>
  </div>
);

const UpdatesPage = () => {
  const updates = [
    {
      title: "MRT secures top Indian team position at URC 2023",
      date: "June 15, 2023",
      image: "https://via.placeholder.com/600x400?text=URC+2023",
      content: "The Mars Rover Team from IIT Bombay secured the first position among all Indian teams at the University Rover Challenge 2023 held in Utah, USA.",
      link: "#"
    },
    {
      title: "New rover prototype unveiled at tech exhibition",
      date: "April 10, 2023",
      image: "https://via.placeholder.com/600x400?text=New+Prototype",
      content: "MRT unveiled its latest rover prototype at the annual technology exhibition at IIT Bombay, showcasing advanced autonomous navigation capabilities.",
      link: "#"
    },
    {
      title: "Team secures sponsorship from major tech company",
      date: "March 5, 2023",
      image: "https://via.placeholder.com/600x400?text=Sponsorship",
      content: "The Mars Rover Team has secured a major sponsorship that will help fund the development of next-generation rover systems and competition travel.",
      link: "#"
    },
    {
      title: "MRT conducts workshop on robotics for high school students",
      date: "February 20, 2023",
      image: "https://via.placeholder.com/600x400?text=Workshop",
      content: "Team members conducted a hands-on workshop introducing high school students to fundamentals of robotics and space exploration technology.",
      link: "#"
    },
    {
      title: "Excellence Award in Autonomous category at IRC 2023",
      date: "January 12, 2023",
      image: "https://via.placeholder.com/600x400?text=IRC+2023",
      content: "The team's hard work paid off with an Excellence Award in the Autonomous category at the International Rover Challenge 2023.",
      link: "#"
    },
    {
      title: "New team members onboarded for the 2023 season",
      date: "December 5, 2022",
      image: "https://via.placeholder.com/600x400?text=New+Members",
      content: "After a rigorous selection process, MRT welcomed 15 new members across various subsystems to strengthen the team for upcoming challenges.",
      link: "#"
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
            <h1 className="section-title">Updates & Media</h1>
            <p className="section-subtitle">
              Stay up to date with the latest news, achievements, and events from our team.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {updates.map((update, index) => (
              <UpdateCard key={index} {...update} />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default UpdatesPage;
