import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getCollaborators } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Collaborator {
  id: number;
  title: string;
  description: string | null;
  image: string | null;
  link: string | null;
  order_number: number;
}

const CollaboratorsPage = () => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const data = await getCollaborators();
        setCollaborators(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load collaborators');
        setLoading(false);
      }
    };

    fetchCollaborators();
  }, []);

  // Separate investors and collaborators
  const investors = collaborators.filter(c => c.description?.toLowerCase().includes('investor'));
  const otherCollaborators = collaborators.filter(c => !c.description?.toLowerCase().includes('investor'));

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-32 pb-16">
        <div className="container mx-auto px-4" ref={ref}>
          <motion.div 
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-6">Our <span className="text-gradient">Collaborators</span> & <span className="text-gradient">Investors</span></h1>
            <div className="w-20 h-1 bg-primary-600 mx-auto mb-8"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              We collaborate with leading organizations and are backed by strategic investors who share our vision for innovation in biotechnology.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">{error}</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Investors Section - Left Side */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-bold text-primary-600 mb-6">Our Investors</h3>
                <div className="grid grid-cols-1 gap-8">
                  {investors.map((investor, index) => (
                    <motion.div 
                      key={investor.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
                    >
                      {investor.image && (
                        <div className="h-64 w-full overflow-hidden bg-gray-100">
                          <img 
                            src={`/${investor.image}`} 
                            alt={investor.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/assets/facilities/facility.jpeg';
                            }}
                          />
                        </div>
                      )}
                      <div className="p-8">
                        <h3 className="font-bold text-2xl mb-3">{investor.title}</h3>
                        {investor.description && (
                          <p className="text-gray-700 mb-4">{investor.description}</p>
                        )}
                        {investor.link && (
                          <a 
                            href={investor.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                          >
                            Visit Website
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Collaborators Section - Right Side */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-bold text-primary-600 mb-6">Our Collaborators</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {otherCollaborators.map((collaborator, index) => (
                    <motion.div 
                      key={collaborator.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
                    >
                      {collaborator.image && (
                        <div className="h-40 w-full overflow-hidden bg-gray-100">
                          <img 
                            src={`/${collaborator.image}`} 
                            alt={collaborator.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/assets/facilities/facility.jpeg';
                            }}
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2">{collaborator.title}</h3>
                        {collaborator.description && (
                          <p className="text-gray-700 text-sm mb-3 line-clamp-2">{collaborator.description}</p>
                        )}
                        {collaborator.link && (
                          <a 
                            href={collaborator.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                          >
                            Learn More →
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {!loading && !error && collaborators.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg text-gray-600">No collaborators found.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CollaboratorsPage; 