import { useState, useEffect } from 'react';
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

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-6">Our <span className="text-gradient">Collaborators</span> & <span className="text-gradient">Investors</span></h1>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              We collaborate with leading organizations and are backed by strategic investors who share our vision for innovation in biotechnology.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collaborators.map((collaborator) => (
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
                      <p className="text-gray-700 mb-4">{collaborator.description}</p>
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