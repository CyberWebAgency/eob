import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCollaborators } from '../services/api';

interface Collaborator {
  id: number;
  title: string;
  description: string | null;
  image: string | null;
  link: string | null;
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

  return (
    <section id="collaborators" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Collaborators & Investors</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Partnering with leading organizations and backed by visionary investors
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              {collaborators.slice(0, 6).map((collaborator) => (
                <div 
                  key={collaborator.id} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
                >
                  {collaborator.image && (
                    <div className="h-48 w-full overflow-hidden bg-gray-100">
                      <img 
                        src={`/${collaborator.image}`} 
                        alt={collaborator.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{collaborator.title}</h3>
                    {collaborator.description && (
                      <p className="text-gray-700 mb-4 line-clamp-2">{collaborator.description}</p>
                    )}
                    {collaborator.link && (
                      <a 
                        href={collaborator.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Learn More →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {collaborators.length > 6 && (
              <div className="text-center mt-10">
                <Link 
                  to="/collaborators" 
                  className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
                >
                  View All Collaborators
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Collaborators; 