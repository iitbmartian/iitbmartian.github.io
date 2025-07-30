
import { CompetitionProps } from './CompetitionCard';
import URClogo from '@/mrt/Logo/Competitions/URC.png'; // <--- Corrected path
import IRClogo from '@/mrt/Logo/Competitions/IRC_1.png'; 
import ERClogo from '@/mrt/Logo/Competitions/ERC.png';

export const competitionsData = [
  {
    title: "University Rover Challenge (URC)",
    location: "Mars Desert Research Station, Utah, USA",
    description: "The University Rover Challenge (URC) is the world's premier robotics competition for university students, challenging teams to design and build the next generation of Mars rovers. The competition takes place at the Mars Desert Research Station in southern Utah, USA, where the terrain closely resembles the Martian landscape.",
    image: URClogo,
    results: [
      {
        year: "2024",
        achievement: "2nd position in India",
        description: "Ranked 2nd in India 22nd internationally at the University Rover Challenge (URC), Utah,USA."
      },
      {
        year: "2024",
        achievement: " 9th position Internationally",
        description: "Ranked 9th internationally in the science mission at the University Rover Challenge(URC), Utah, USA."
      },
      {
        year: "2023",
        achievement: "1st position in India",
        description: "Ranked 1st in India 19th internationally at the University Rover Challenge (URC), Utah,USA ."
      },
      {
        year: "2023",
        achievement: "6th position Internationally",
        description: "Ranked 6th internationally in the science mission at the University Rover Challenge(URC), Utah, USA ."
      },
      {
        year: "2022",
        achievement: "Top 20 Qualification",
        description: "Successfully qualified in the top 20 teams globally after the System Acceptance Review phase."
      },
      {
        year: "2021",
        achievement: "Qualification",
        description: "First-ever qualification for the competition, marking a significant milestone for our team."
      }
    ]
  },
  {
    title: "International Rover Challenge (IRC)",
    location: "Various locations in India",
    description: "The International Rover Challenge is a competition conducted by the Space Robotics Society that tests rovers' capabilities in tasks simulating real Mars mission scenarios. The competition provides a platform for students to develop and showcase innovative rover technologies.",
    image: IRClogo,
    results: [
       {
        year: "2025",
        achievement: "Winner",
        description: "Winners of Best astrobiology Presentation Award at International Rover Challenge (IRC),Goa."
      },
       {
        year: "2025",
        achievement: "9th Position Internationally",
        description: "Ranked 9th internationally at the international rover challenge (IRC), Goa."
      },
      {
        year: "2023",
        achievement: "6th Position Internationally",
        description: "Ranked 6th internationally at the international rover challenge (IRC), Bangalore."
      },
      {
        year: "2023",
        achievement: "5th Position & Excellence Award",
        description: "Secured 5th position out of 18 teams and received Excellence Award in Autonomous category."
      },
      {
        year: "2022",
        achievement: "3rd Position",
        description: "Achieved podium finish with notable performance in navigation and science tasks."
      },
      {
        year: "2021",
        achievement: "2nd Position",
        description: "Runner-up with exceptional scores in mechanical design and autonomous operation."
      },
      {
        year: "2020",
        achievement: "4th Position",
        description: "Strong performance despite challenges in first-generation autonomous systems."
      }
    ]
  },
  {
    title: "European Rover Challenge (ERC)",
    location: "Poland",
    description: "The European Rover Challenge is one of the largest space and robotics events in Europe. It features an international Mars rover competition on one of the largest artificial Martian terrains in the world, where teams must complete various tasks simulating real Martian missions.",
    image: ERClogo,
    results: [
      {
        year: "2025",
        achievement: " 3rd postion",
        description: "2nd runner up in round 1 of european rover challenge (ERC) 2025."
      },
      {
        year: "2022",
        achievement: "Excellence Award in Navigation",
        description: "Received special recognition for our rover's navigation capabilities and innovative pathfinding algorithms."
      },
      {
        year: "2021",
        achievement: "Top 15 Qualification",
        description: "Successfully qualified for the remote competition format among top global teams."
      }
    ]
  }
];

export const timelineData = [
  { year: "2012", event: "Mars Rover Team founded at IIT Bombay" },
  { year: "2014", event: "First rover prototype developed" },
  { year: "2016", event: "First participation in national-level competition" },
  { year: "2018", event: "First international competition participation" },
  { year: "2020", event: "Reached top 5 in IRC" },
  { year: "2021", event: "First qualification for URC" },
  { year: "2022", event: "Excellence Award at ERC" },
  { year: "2023", event: "Top Indian team at URC, 5th position at IRC" },
  { year: "2024", event: "2nd Indian team at URC" },
  { year: "2025", event: " Ranked 9th internationally at IRC,Goa" },
  { year: "2025", event: "Winners of Best astrobiology Presentation Award at IRC,Goa" },
];
