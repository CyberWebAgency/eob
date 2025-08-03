import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Linkedin, Twitter, Mail, X } from 'lucide-react';
import { Link } from 'react-router-dom';
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

const Team: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        // Fetch only leadership team for the homepage
        const data = await getTeamMembers('Leadership');
        // Limit to 8 team members for the homepage
        const limitedMembers = data.slice(0, 8);
        setTeamMembers(limitedMembers);
        setLoading(false);
      } catch (err) {
        setError('Failed to load team data');
        setLoading(false);
        console.error('Error fetching team data:', err);
      }
    };

    fetchTeamData();
  }, []);

  // Function to truncate text to approximately 100 characters
  const truncateText = (text: string, maxLength: number = 100) => {
    if (!text) return 'No biography available';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <section id="team" className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="heading-md mb-6">
              Our <span className="text-gradient">Team</span>
            </h2>
            <p className="text-gray-600">Loading team members...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="team" className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="heading-md mb-6">
              Our <span className="text-gradient">Team</span>
            </h2>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="section-padding bg-background">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="heading-md mb-6">
            Our <span className="text-gradient">Team</span>
          </h2>
          <p className="text-gray-600 text-lg">
            East Ocyon Bio is led by a team of experienced scientists, researchers, 
            and business leaders united by a shared mission to transform healthcare through 
            innovative biotechnology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg group cursor-pointer"
              onClick={() => setSelectedMember(member)}
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
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link to="/team" className="btn btn-outline inline-flex items-center">
            View All Team
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="ml-2"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </motion.div>
      </div>

      {selectedMember && (
        <TeamMemberPopup
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </section>
  );
};

export default Team;