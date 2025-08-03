import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, Microscope, Zap, ExternalLink, Filter } from 'lucide-react';
import { getTechnology } from '../services/api';

// Define TypeScript interface for technology
interface Technology {
  id: number;
  title: string;
  description: string;
  category?: string;
  type?: 'core' | 'future';
  image?: string;
  icon?: string;
  order_number?: number;
  status?: string;
}

// Lazy load the 3D model for better performance

// Loading placeholder for the 3D model

// Popup component for detailed view
const TechnologyPopup: React.FC<{
  technology: Technology;
  onClose: () => void;
}> = ({ technology, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        // z-[60] ensures it appears above the navbar (z-50)
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
            {technology.image && (
              <div className="relative h-64 overflow-hidden">
                <img
                  src={technology.image}
                  alt={technology.title}
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
            <h3 className="text-2xl font-semibold mb-4">{technology.title}</h3>
            {technology.category && (
              <div className="mb-4">
                <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                  {technology.category}
                </span>
              </div>
            )}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 whitespace-pre-line">{technology.description}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 }
  }
};

const Technology: React.FC = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
  // Removed category state: const [category, setCategory] = useState<string>('all');
  const [] = useState(false); // Unused state?

  // Section header ref - set to trigger once so it doesn't disappear
  const [ref] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Tech cards ref - stays visible once shown
  const [] = useInView({ // Unused state?
    triggerOnce: true, // Keep cards visible once they've been shown
    threshold: 0.05, // Lower threshold so they appear earlier
    rootMargin: '0px 0px -10% 0px', // Trigger before they're fully in view
  });

  const [] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Optimize the model loading - only load when section is in view and after a short delay

  // Fallback mock data
  const mockTechnologies: Technology[] = [
    {
      id: 1,
      title: "NK Cell Technology",
      category: "Core Technology",
      type: "core",
      description: "Our proprietary NK cell platform generates highly cytotoxic cells with enhanced tumor-targeting abilities and extended persistence in vivo. This technology is central to our approach for treating solid tumors and hematological malignancies with improved efficacy and reduced side effects.\n\nKey features:\n- Enhanced cytotoxicity\n- Improved tumor targeting\n- Extended persistence\n- Allogeneic compatibility",
      image: "/assets/technology/nk-cells.jpg",
      icon: "microscope"
    },
    {
      id: 2,
      title: "Gamma Delta T Cell Platform",
      category: "Core Technology",
      type: "core",
      description: "Specialized T cells that recognize a broader range of tumor antigens and exhibit potent anti-tumor activity. Our γδ T cell platform offers unique advantages in targeting cancers through non-MHC restricted mechanisms.\n\nKey features:\n- MHC-independent recognition\n- Natural tissue surveillance\n- Reduced risk of GvHD\n- Versatile targeting",
      image: "/assets/technology/gamma-delta.jpg",
      icon: "zap"
    },
    {
      id: 3,
      title: "Gamma Retroviral Vector System",
      category: "Core Technology",
      type: "core",
      description: "Advanced delivery systems for efficient genetic modification of immune cells with high specificity and safety. Our vectors enable precise engineering of therapeutic cells for enhanced functionality.\n\nKey features:\n- High transduction efficiency\n- Improved safety profile\n- Stable gene expression\n- Scalable manufacturing",
      image: "/assets/technology/vector.jpg",
      icon: "vector"
    },
    {
      id: 4,
      title: "CRISPR Gene Editing",
      category: "Future Technology",
      type: "future",
      description: "Next-generation gene editing for precise modification of immune cells with enhanced functionality. This platform allows for targeted genetic modifications that enhance therapeutic potential.\n\nKey features:\n- Precise genomic targeting\n- Multiplexed editing\n- Enhanced cellular function\n- Reduced off-target effects",
      image: "/assets/technology/crispr.jpg"
    },
    {
      id: 5,
      title: "mRNA Delivery Platform",
      category: "Future Technology",
      type: "future",
      description: "Innovative mRNA delivery systems for transient expression of therapeutic proteins in target cells. This approach enables flexible programming of cellular responses without permanent genetic modification.\n\nKey features:\n- Transient protein expression\n- Non-genetic modification\n- Rapid development cycle\n- Versatile applications",
      image: "/assets/technology/mrna.jpg"
    },
    {
      id: 6,
      title: "AI-Driven Target Discovery",
      category: "Future Technology",
      type: "future",
      description: "Harnessing artificial intelligence and machine learning to identify novel therapeutic targets and optimize treatment approaches. This computational platform accelerates development and improves efficacy.\n\nKey features:\n- Advanced target prediction\n- Treatment optimization\n- Biomarker identification\n- Accelerated development",
      image: "/assets/technology/ai-ml.jpg"
    }
  ];

  useEffect(() => {
    const fetchTechnologyData = async () => {
      try {
        setLoading(true);
        // Attempt to fetch real data without category filter
        const data = await getTechnology().catch(() => {
          console.log("Using mock technology data instead");
          // Use all mock data if fetch fails
          return mockTechnologies;
        });

        setTechnologies(data);
        setLoading(false);
      } catch (err) {
        console.log("Using mock technology data due to error");
        // Use all mock data if fetch fails
        setTechnologies(mockTechnologies);
        setLoading(false);
      }
    };

    fetchTechnologyData();
  }, []); // Removed category from dependency array

  // Function to truncate text to approximately 25-30 words
  const truncateText = (text: string, maxWords: number = 30) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };

  // Split into core and future technologies based on type/category
  // This logic now operates on the full 'technologies' array
  const coreTechnologies = technologies.filter(tech =>
    tech.type === 'core' ||
    tech.category === 'Core Technology' ||
    (!tech.type && !tech.category && technologies.indexOf(tech) < 3) // Fallback for mock data without type/category
  );

  const futureTechnologies = technologies.filter(tech =>
    tech.type === 'future' ||
    tech.category === 'Future Technology' ||
    (!tech.type && tech.category !== 'Core Technology' && technologies.indexOf(tech) >= 3) // Fallback for mock data without type/category
  );


  // Icon mapping function
  const getIconComponent = (tech: Technology) => {
    if (tech.title.toLowerCase().includes('nk cell')) {
      return <Microscope className="h-6 w-6 text-primary-600" />;
    } else if (tech.title.toLowerCase().includes('gamma delta')) {
      return <Zap className="h-6 w-6 text-secondary-600" />;
    } else {
      // Keep Filter icon as a generic fallback
      return <Filter className="h-6 w-6 text-tertiary-600" />;
    }
  };

  if (loading) {
    return (
      <section id="technology" className="section-padding bg-background relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="heading-md mb-6">
              Our <span className="text-gradient">Technology</span> Platform
            </h2>
            <div className="flex justify-center mt-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
            <p className="text-gray-600 mt-4">Loading technology information...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error && technologies.length === 0) {
    return (
      <section id="technology" className="section-padding bg-background relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="heading-md mb-6">
              Our <span className="text-gradient">Technology</span> Platform
            </h2>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (technologies.length === 0) {
    return (
      <section id="technology" className="section-padding bg-background relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="heading-md mb-6">
              Our <span className="text-gradient">Technology</span> Platform
            </h2>
            <p className="text-gray-600">No technology information available at this time.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="technology" className="section-padding bg-background relative overflow-hidden">
      {/* Remove the white gradient at the top */}

      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="heading-md mb-6 mt-10">
            Our <span className="text-gradient">Technology</span> Platform
          </h2>
          <p className="text-gray-600 text-lg">
            East Ocyon Bio leverages proprietary technologies in NK cells, Gamma Delta T cells,
            and Gamma Retroviral vectors to develop breakthrough immunotherapies.
          </p>
        </motion.div>

        {/* Overview & Core Technology Platform - Original static content */}
        <div className="flex justify-center mb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              <h3 className="heading-sm mb-4 text-primary-600">Our Core Technology Platform</h3>
              <p className="text-gray-600 mb-6">
                Our integrated platform combines advanced cell engineering and vector technologies
                to develop novel immunotherapies with superior efficacy and safety profiles.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-1 mr-3 mt-1">
                    <div className="bg-primary-500 rounded-full w-2 h-2"></div>
                  </div>
                  <span className="text-gray-600">NK cell engineering and expansion</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-1 mr-3 mt-1">
                    <div className="bg-primary-500 rounded-full w-2 h-2"></div>
                  </div>
                  <span className="text-gray-600">Gamma Delta T cell isolation and activation</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-1 mr-3 mt-1">
                    <div className="bg-primary-500 rounded-full w-2 h-2"></div>
                  </div>
                  <span className="text-gray-600">Gamma Retroviral vector production</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-1 mr-3 mt-1">
                    <div className="bg-primary-500 rounded-full w-2 h-2"></div>
                  </div>
                  <span className="text-gray-600">Advanced molecular engineering</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex justify-center"
            >
              {/* <a href="#products" className="btn btn-primary">
                Explore Our Products
              </a> */}
            </motion.div>
          </div>
        </div>

        {/* Removed Category filter tabs */}
        {/* {technologies.some(tech => tech.category) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex bg-white rounded-full p-1 shadow-sm">
              <button
                onClick={() => setCategory('all')}
                className={`px-5 py-2 text-sm font-medium rounded-full transition ${
                  category === 'all' ? 'bg-primary-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Technologies
              </button>
              <button
                onClick={() => setCategory('Core Technology')}
                className={`px-5 py-2 text-sm font-medium rounded-full transition ${
                  category === 'Core Technology' ? 'bg-primary-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Core Technologies
              </button>
              <button
                onClick={() => setCategory('Future Technology')}
                className={`px-5 py-2 text-sm font-medium rounded-full transition ${
                  category === 'Future Technology' ? 'bg-tertiary-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Future Technologies
              </button>
            </div>
          </motion.div>
        )} */}

        {/* Dynamic Technology Content */}
        <div className="mt-16">
          {/* Removed dynamic heading based on category */}
          {/* <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="heading-sm mb-8 text-primary-600 text-center"
          >
          </motion.h3> */}

          {/* Core Technologies Section - Dynamic content */}
          {coreTechnologies.length > 0 && (
            <div className="mb-16">
               <h3 className="heading-sm mb-8 text-primary-600 text-center">Core Technologies</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coreTechnologies.map((tech, index) => (
              <motion.div
                key={tech.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    onClick={() => setSelectedTech(tech)}
                  >
                    {tech.image ? (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={tech.image}
                          alt={tech.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/assets/facilities/facility.jpeg';
                          }}
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-r from-primary-600 to-primary-400 flex items-center justify-center">
                        <div className="text-white text-center">
                          {getIconComponent(tech)}
                          <h4 className="text-xl font-semibold mt-2">{tech.title}</h4>
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3 text-primary-700">{tech.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {truncateText(tech.description, 30)}
                      </p>
                      <div className="flex justify-end">
                        <button
                          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTech(tech);
                          }}
                        >
                          Learn more
                          <ExternalLink size={16} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Future Technologies Section - 20% */}
        {futureTechnologies.length > 0 && (
          <div className="mb-16">
            <h3 className="heading-sm mb-8 text-tertiary-600 text-center">Future Technologies</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {futureTechnologies.map((tech, index) => (
                <motion.div
                  key={tech.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                  onClick={() => setSelectedTech(tech)}
                >
                  {tech.image ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={tech.image}
                        alt={tech.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/assets/facilities/facility.jpeg';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-r from-tertiary-600 to-tertiary-400 flex items-center justify-center">
                      <div className="text-white text-center">
                        {getIconComponent(tech)}
                        <h4 className="text-xl font-semibold mt-2">{tech.title}</h4>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-tertiary-700">{tech.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {truncateText(tech.description, 30)}
                    </p>
                    <div className="flex justify-end">
                      <button
                        className="inline-flex items-center text-tertiary-600 hover:text-tertiary-700 font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTech(tech);
                        }}
                      >
                        Learn more
                        <ExternalLink size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Technology Detail Popup */}
        {selectedTech && (
          <TechnologyPopup
            technology={selectedTech}
            onClose={() => setSelectedTech(null)}
          />
        )}
      </div>
    </section>
  );
};

export default Technology;