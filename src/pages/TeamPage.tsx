import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Linkedin, Mail } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getTeamMembers } from '../services/api';

// Define TypeScript interface for team member
interface TeamMember {
  id: number;
  name: string;
  title: string;
  bio?: string;
  photo?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  member_type: string;
}

// Component to render each team member card
const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="relative h-60 overflow-hidden">
        <img 
          src={member.photo ? member.photo : '/assets/facilities/facility.jpeg'} 
          alt={member.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-primary-900/80 p-2 flex justify-end">
          <div className="flex space-x-2">
            {member.linkedin && (
              <a href={member.linkedin} className="text-white hover:text-primary-200 transition-colors p-1">
                <Linkedin size={16} />
              </a>
            )}
            {member.email && (
              <a href={`mailto:${member.email}`} className="text-white hover:text-primary-200 transition-colors p-1">
                <Mail size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900">{member.name}</h3>
        <p className="text-primary-600 text-sm">{member.title}</p>
      </div>
    </motion.div>
  );
};

const TeamPage: React.FC = () => {
  const [leadershipTeam, setLeadershipTeam] = useState<TeamMember[]>([]);
  const [advisoryTeam, setAdvisoryTeam] = useState<TeamMember[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        
        // Fetch leadership team
        const leadershipData = await getTeamMembers('Leadership');
        setLeadershipTeam(leadershipData);
        
        // Fetch advisory board
        const advisoryData = await getTeamMembers('Scientific Advisory Board');
        setAdvisoryTeam(advisoryData);
        
        // Fetch regular team members
        const membersData = await getTeamMembers('Team Members');
        setTeamMembers(membersData);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load team data');
        setLoading(false);
        console.error('Error fetching team data:', err);
      }
    };

    fetchTeamData();
  }, []);

  return (
    <>
      <Navbar />
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl font-bold mb-6">Visit <span className="text-gradient">Our Team</span></h1>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg">
              East Ocyon Bio brings together world-class expertise in biotechnology, 
              medicine, research, and business to drive innovation in healthcare.
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-600">Loading team members...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <div ref={ref}>
              {/* Leadership Team */}
              {leadershipTeam.length > 0 && (
                <div className="mb-16">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-bold mb-8 pb-2 border-b border-gray-200"
                  >
                    Leadership Team
                  </motion.h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {leadershipTeam.map((member) => (
                      <TeamMemberCard key={member.id} member={member} />
                    ))}
                  </div>
                </div>
              )}

              {/* Scientific Advisory Board */}
              {advisoryTeam.length > 0 && (
                <div className="mb-16">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-2xl font-bold mb-8 pb-2 border-b border-gray-200"
                  >
                    Scientific Advisory Board
                  </motion.h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {advisoryTeam.map((member) => (
                      <TeamMemberCard key={member.id} member={member} />
                    ))}
                  </div>
                </div>
              )}

              {/* Team Members */}
              {teamMembers.length > 0 && (
                <div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-2xl font-bold mb-8 pb-2 border-b border-gray-200"
                  >
                    Team Members
                  </motion.h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {teamMembers.map((member) => (
                      <TeamMemberCard key={member.id} member={member} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TeamPage; 