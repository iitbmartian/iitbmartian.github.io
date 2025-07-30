
import React , { useState }from 'react';
import { Linkedin, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnushkaVerma from '@/mrt/Team_Leads/Anushka_Verma.jpg';
import ArinWeling from '@/mrt/Team_Leads/Arin_Weling.jpeg';
import Arkapravo from '@/mrt/Team_Leads/arkapravo_patra.jpg';
import Tarshit from '@/mrt/Team_Leads/Tarshit_Sehgal.jpg';
import Arjoe from '@/mrt/Electrical/Subsystem Lead/Arjoe Basak.jpg'; 
import Bhuvan from '@/mrt/Mechanical/Arm & LDT/Subsystem Lead/Bhuvan Prasad.jpg';
import Ajitesh from '@/mrt/Mechanical/Mobility/Subsystem Lead/Ajitesh Joshi.jpeg';
import Madhav from '@/mrt/Software/Subsystem Lead/Madhav Agrawal.jpg';
import { Sub } from '@radix-ui/react-context-menu';
import { sub } from 'date-fns';
import AnvitKhade from '@/mrt/Mechanical/Arm & LDT/Anvit Khade.jpg';
import Rudra from '@/mrt/Mechanical/Arm & LDT/Rudra Khandelwal.jpg';
import Ryan from '@/mrt/Mechanical/Arm & LDT/Ryan D_Souza.jpg';
import Vidit from '@/mrt/Mechanical/Arm & LDT/Vidit Bohra.jpeg';
import Ayush from '@/mrt/Mechanical/Mobility/Ayush Mohapatra.jpg';
import Dev from '@/mrt/Mechanical/Mobility/Dev Suthar.jpg';
import Shashwat from '@/mrt/Mechanical/Mobility/Shashwat Gupta.jpg';
import Jay from '@/mrt/Mechanical/Mobility/JAY MISTRY.jpg';
import Param from '@/mrt/Mechanical/Mobility/Param Aghera.jpg';
import Tanish from '@/mrt/Mechanical/Mobility/Tanish Kharbanda.jpg';
import Harshit from '@/mrt/Electrical/Harshit Somani.jpg';
import Radhika  from '@/mrt/Electrical/Radhika agarwal.jpg';
import shawn from '@/mrt/Electrical/Shawn Thomas Koshy.jpg';
import Shridhar from '@/mrt/Electrical/Shridhar Patil.jpeg';
import Siddhant from '@/mrt/Electrical/Siddhant Kaul.jpeg'
import  Sudhindra from '@/mrt/Electrical/Sudhindra Sahoo.jpg';
import Tanmay from '@/mrt/Electrical/Tanmay Sinha.jpg';
import Veeresh from '@/mrt/Electrical/Veeresh S K.jpg';
import Dheer from '@/mrt/Software/Dheer Prasad.jpg';
import Gautam from '@/mrt/Software/Gautam Mahale.png';
import Jiya from '@/mrt/Software/Jiya Gada.jpeg';
import Rishabh from '@/mrt/Software/Rishabh Parwal.jpg';
import Sairam from '@/mrt/Software/Sairam Chari.jpg';
import Tejas from '@/mrt/Software/Tejas Kulkarni.png';
import Aditi from '@/mrt/MDM/Aditi Singh.jpg';
import Disha from '@/mrt/MDM/Disha Gugale.jpg';
import Rohan from '@/mrt/MDM/Rohan Shukla.jpeg';
import Shreya from '@/mrt/MDM/Shreya Goyal.jpeg';
import Shrishti from '@/mrt/MDM/Srishti Poddar.jpeg';


interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  website?: string;
}
interface SubTeam {
  name: string;
  members: Member[];
}

const TeamMember = ({ name, role, image, linkedin, website }: TeamMemberProps) => (
  <div className="group">
    <div className="relative overflow-hidden rounded-xl mb-4 bg-space-light/20">
      <div className="absolute inset-0 bg-gradient-to-t from-space via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
      <img 
        src={image} 
        alt={name} 
        className="w-full aspect-square object-cover object-center group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex space-x-2">
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-cosmic/20 hover:bg-cosmic/40 rounded-full text-white transition-colors">
              <Linkedin size={16} />
            </a>
          )}
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer" className="p-2 bg-mars/20 hover:bg-mars/40 rounded-full text-white transition-colors">
              <Globe size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
    <h3 className="text-lg font-bold font-technospace">{name}</h3>
    <p className="text-white/70 text-sm">{role}</p>
  </div>
);
const SubTeamMember = ({ name, role, image, linkedin, website }: TeamMemberProps) => (
  <div className="group">
    <div className="relative overflow-hidden rounded-xl mb-4 bg-space-light/20">
      <div className="absolute inset-0 bg-gradient-to-t from-space via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
      <img 
        src={image} 
        alt={name} 
        className="w-full aspect-square object-cover object-center group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex space-x-2">
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-cosmic/20 hover:bg-cosmic/40 rounded-full text-white transition-colors">
              <Linkedin size={16} />
            </a>
          )}
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer" className="p-2 bg-mars/20 hover:bg-mars/40 rounded-full text-white transition-colors">
              <Globe size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
    <h3 className="text-lg font-bold font-technospace">{name}</h3>
    <p className="text-white/70 text-sm">{role}</p>
  </div>
);

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Aunshka Verma",
      role: "Team Lead",
      image: AnushkaVerma,
      linkedin: "https://www.linkedin.com/in/anushka-verma-534084217?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
     
    },
    {
      name: "Arin Weling",
      role: "Team Lead",
      image: ArinWeling,
      linkedin: "https://www.linkedin.com/in/arin-weling-584a39252?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
     
    },
    {
      name: "Arkapravo Patra",
      role: "Team Lead",
      image: Arkapravo,
      linkedin: "https://www.linkedin.com/in/arkapravo-patra-2a7819266?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      
    },
    {
      name: "Tarshit Sehgal",
      role: "Team Lead",
      image: Tarshit,
      linkedin: "http://www.linkedin.com/in/tarshit-sehgal-a37665253",
      
    }
  ];

  const subTeams: SubTeam[] = [
  {
    name: "Mechanical Team",
    members: [
       {
      name: "Bhuvan Prasad",
      role: "Mechenical Lead (Arm & LDT)",
      image: Bhuvan,
      linkedin: "https://www.linkedin.com/in/bhuvan-k-prasad-62124b297?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      
    },
    {
      name: "Ajitesh Joshi",
      role: " Mechenical Lead (Mobility)",
      image: Ajitesh,
      linkedin: "https://www.linkedin.com/in/madhav48/"
    },
      {
        name: "Anvit",
        role: "Senior Design Engineer (Arm & LDT)",
        image: AnvitKhade,
      //  website: "#"
      },
       {
        name: "Dev ",
        role: "Senior Design Engineer (Mobility)",
        image: Dev,
       // linkedin: "#"
      },
      {
        name: "Param ",
        role: "Senior Design Engineer(Mobility)",
        image: Param,
        //linkedin: "#"
      },
      {
        name: "Rudra Khandelwal",
        role: "Junior Design Engineer (Arm & LDT)",
        image: Rudra,
      //  linkedin: "#"
      }
      ,
      {
        name: "Ryan D'Souza",
        role: "Junior Design Engineer (Arm & LDT)",
        image: Ryan,
       // linkedin: "#"
      },
      {
        name: "Vidit Bohra",
        role: "Junior Design Engineer (Arm & LDT)",
        image: Vidit,
      //  linkedin: "#"
      },
  
      {
        name: "Ayush Mohapatra",
        role: "Junior Design Engineer (Mobility)",
        image: Ayush,
        //linkedin: "#"
      },
 
      {
        name: "Jay Mistry",
        role: "Junior Design Engineer (Mobility)",
        image: Jay,
       // linkedin: "#"
      },
    
      {
        name: "Shashwat Singh",
        role: "Junior Design Engineer (Mobility)",
        image: Shashwat,
       // linkedin: "#"
      },
      {
        name: "Tanish Kharbanda",
        role: "Junior Design Engineer (Mobility)",
        image: Tanish,
        //linkedin: "#"
      }
    ]
  },
   {
    name: "Electrical Team",
    members: [
       {
      name: "Arjoe Basak",
      role: "Electrical Lead",
      image: Arjoe,
      linkedin: "https://www.linkedin.com/in/arjoe-basak-a49256285"
      },
       {
        name: "Sudhindra Sahoo",
        role: "Senior Design Engineer",
        image: Sudhindra,
        //linkedin: "#"
      },
      {
        name: "Harshit Somani",
        role: "Junior Design Engineer",
        image: Harshit,
        linkedin: "#"
      },
      {
        name: "Radhika Agarwal",
        role: "Junior Design Engineer",
        image: Radhika,
        //linkedin: "#"
      },
      {
        name: "Shawn Thomas Koshy",
        role: "Junior Design Engineer",
        image: shawn,
       // linkedin: "#"
      },
      {
        name: "Shridhar Patil",
        role: "Junior Design Engineer",
        image: Shridhar,
       // linkedin: "#"
      },
      {
        name: "Siddhant Kaul",
        role: "Junior Design Engineer",
        image: Siddhant,
       // linkedin: "#"
      },
  
      {
        name: "Tanmay Sinha",
        role: "Junior Design Engineer",
        image: Tanmay,
       // linkedin: "#"
      },
      {
        name: "Veeresh S K",
        role: "Junior Design Engineer",
        image: Veeresh,
       // linkedin: "#"
      }
     
     
    ]
  },
   {
    name: "Software Team",
    members: [
    
      {
      name: "Madhav Agrawal",
      role: "Software Lead",
      image: Madhav,
      website: "https://www.linkedin.com/in/madhav48/"
    },
      {
        name: "Dheer Prasad",
        role: "Junior Design Engineer",
        image: Dheer,
       // linkedin: "#"
      },
      {
        name: "Gautam Mahale",
        role: "Junior Design Engineer",
        image: Gautam,
        //linkedin: "#"
      },
      {
        name: "Jiya Gada",
        role: "Junior Design Engineer",
        image: Jiya,
        //linkedin: "#"
      },
      {
        name: "Rishabh Parwal",
        role: "Junior Design Engineer",
        image: Rishabh,
       // linkedin: "#"
      },
      {
        name: "Sairam Chari",
        role: "Junior Design Engineer",
        image: Sairam,
       // linkedin: "#"
      },
      {
        name: "Tejas Kulkarni",
        role: "Junior Design Engineer",
        image: Tejas,
       // linkedin: "#"
      }
    ]
  },
   {
    name: "Media, Design & Marketing Team",
    members: [
      
      {
        name: "Aditi Singh",
        role: "Team Member",
        image: Aditi,
       // linkedin: "#"
      },
      {
        name: "Disha Gugale",
        role: "Team Member",
        image: Disha,
        //linkedin: "#"
      },
      {
        name: "Rohan Shukla",
        role: "Team Member",
        image: Rohan,
       // linkedin: "#"
      },
      {
        name: "Shreya Goyal",
        role: "Team Member",
        image: Shreya,
        //linkedin: "#"
      },
      {
        name: "Srishti Poddar",
        role: "Team Member",
        image: Shrishti,
       // linkedin: "#"
      }
      
    ]
  },
    ];
    const [selectedSubTeam, setSelectedSubTeam] = useState(0);

  return (
    <section id="team" className="section-padding bg-space-dark relative overflow-hidden">
      {/* Background decoration 
      <div className="absolute top-1/4 left-0 w-1/3 h-1/3 bg-cosmic/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-1/3 h-1/3 bg-mars/5 rounded-full blur-3xl"></div>*/}
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Team</h2>
          <p className="section-subtitle">
            Meet the brilliant minds behind our Mars rover designs and innovations.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6 font-technospace">Our Sub-Teams</h3>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {subTeams.map((team, idx) => (
            <button
              key={team.name}
              className={`py-2 px-4 rounded-full border font-semibold transition-colors ${
                selectedSubTeam === idx
                  ? "bg-cosmic/80 text-white"
                  : "bg-space-light/30 text-white/90 border-white/10"
              }`}
              onClick={() => setSelectedSubTeam(idx)}
            >
              {team.name}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-6xl mx-auto">
          {subTeams[selectedSubTeam].members.map((member, index) => (
            <div
              key={index}
              className="flex-1 min-w-[180px] max-w-[250px] basis-[22%] flex-grow-0 flex-shrink-0"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <TeamMember {...member} />
            </div>
          ))}
        </div>
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6 font-technospace">Join Our Team</h3>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Are you passionate about space exploration and rover technology? We're always looking for talented 
            students to join our team and help us build the next generation of Mars rovers.
          </p>
          <Button className="bg-gradient-to-r from-mars to-cosmic hover:opacity-90 text-white px-8 py-6">
            Apply Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
