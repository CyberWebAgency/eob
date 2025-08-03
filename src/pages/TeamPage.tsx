import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Linkedin, Mail, Twitter, X } from 'lucide-react';
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

// Popup component for detailed view
const TeamMemberPopup: React.FC<{
  member: TeamMember;
  onClose: () => void;
}> = ({ member, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center px-4 pt-20 pb-4 overflow-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-[70] relative"
          onClick={e => e.stopPropagation()}
        >
          <div className="relative">
            {member.photo && (
              <div className="relative h-80 overflow-hidden">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/facilities/facility.jpeg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent"></div>
              </div>
            )}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
            <p className="text-primary-600 text-lg mb-6">{member.title}</p>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 whitespace-pre-line">{member.bio || 'No biography available'}</p>
            </div>
            <div className="mt-6 flex space-x-4">
              {member.linkedin && (
                <a href={member.linkedin} className="text-primary-600 hover:text-primary-700 transition-colors">
                  <Linkedin size={24} />
                </a>
              )}
              {member.twitter && (
                <a href={member.twitter} className="text-primary-600 hover:text-primary-700 transition-colors">
                  <Twitter size={24} />
                </a>
              )}
              {member.email && (
                <a href={`mailto:${member.email}`} className="text-primary-600 hover:text-primary-700 transition-colors">
                  <Mail size={24} />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Component to render each team member card
const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const [showPopup, setShowPopup] = useState(false);

  // Function to truncate text to approximately 100 characters
  const truncateText = (text: string, maxLength: number = 100) => {
    if (!text) return 'No biography available';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl overflow-hidden shadow-lg group cursor-pointer"
        onClick={() => setShowPopup(true)}
      >
        <div className="relative h-64 overflow-hidden">
          <img 
            src={member.photo ? member.photo : '/assets/facilities/facility.jpeg'} 
            alt={member.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-6">
            <p className="text-white mb-4 text-sm">{truncateText(member.bio || '')}</p>
            <div className="flex space-x-3">
              {member.linkedin && (
                <a 
                  href={member.linkedin} 
                  className="text-white hover:text-primary-200 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Linkedin size={18} />
                </a>
              )}
              {member.twitter && (
                <a 
                  href={member.twitter} 
                  className="text-white hover:text-primary-200 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Twitter size={18} />
                </a>
              )}
              {member.email && (
                <a 
                  href={`mailto:${member.email}`} 
                  className="text-white hover:text-primary-200 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Mail size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-semibold text-lg">{member.name}</h3>
          <p className="text-primary-600">{member.title}</p>
        </div>
      </motion.div>

      {showPopup && (
        <TeamMemberPopup
          member={member}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
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