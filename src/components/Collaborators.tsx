import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCollaborators } from '../services/api';

interface Collaborator {
  id: number;
  title: string;
  description: string | null;
  image: string | null;
  link: string | null;
  order_number: number;
}

const Collaborators = () => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const data = await getCollaborators();
        setCollaborators(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching collaborators:', err);
        setLoading(false);
      }
    };

    fetchCollaborators();
  }, []);

  // Separate investors and collaborators
  const investors = collaborators.filter(c => c.description?.toLowerCase().includes('investor'));
  const otherCollaborators = collaborators.filter(c => !c.description?.toLowerCase().includes('investor'));

  return (
    <section id="collaborators" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Collaborators & Investors</h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Partnering with leading organizations and backed by visionary investors
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Investors Section - Left Side */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-primary-600 mb-6">Our Investors</h3>
              <div className="grid grid-cols-1 gap-8">
                {investors.map((investor) => (
                  <div 
                    key={investor.id} 
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
                  </div>
                ))}
              </div>
            </div>

            {/* Collaborators Section - Right Side */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-primary-600 mb-6">Our Collaborators</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {otherCollaborators.map((collaborator) => (
                  <div 
                    key={collaborator.id} 
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Collaborators; 