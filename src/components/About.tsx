import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, HeartPulse, ChevronRight, ChevronLeft } from 'lucide-react';

const features = [
  // {
  //   icon: <Shield className="h-6 w-6 text-primary-600" />,
  //   title: 'NK Cell Technology',
  //   description: "Our proprietary technology enhances natural killer cells' ability to search and destroy tumor cells."
  // },
  // {
  //   icon: <Bean className="h-6 w-6 text-secondary-600" />,
  //   title: 'Gamma Delta T Cells',
  //   description: 'Advanced γδ T cell therapies with unique cancer targeting capabilities and reduced risk of side effects.'
  // },
  {
    icon: <Globe className="h-6 w-6 text-tertiary-600" />,
    title: 'Global Access',
    description: 'Committed to bringing curative cell therapies to patients worldwide, including India and ROW.'
  },
  {
    icon: <HeartPulse className="h-6 w-6 text-secondary-600" />,
    title: 'Patient-Focused',
    description: 'Dedicated to ensuring early, affordable, and quality access to curative cell therapies.'
  }
];

// Facility images
const facilityImages = [
  {
    src: "/assets/facilities/facility.jpg",
    alt: "Modern Laboratory Facility",
    caption: "Upcoming GMP Manf facility"
  },
  {
    src: "/assets/facilities/equipments.jpg",
    alt: "Cell Culture Laboratory",
    caption: "Molecular Biology Laboratory"
  },
  {
    src: "/assets/facilities/lab1.jpg",
    alt: "Manufacturing Suite",
    caption: "Analytical Lab"
  },
  {
    src: "/assets/facilities/lab2.jpg",
    alt: "Quality Control Lab",
    caption: "Quality control and testing laboratory"
  },
  {
    src: "/assets/facilities/lab3.jpg",
    alt: "Quality Control Lab",
    caption: "Quality control and testing laboratory"
  },
  {
    src: "/assets/facilities/lab4.jpg",
    alt: "Dedicated BSL2 facility for Viral vectors",
    caption: "Dedicated BSL2 facility for Viral vectors"
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 }
  }
};

const About: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev === facilityImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? facilityImages.length - 1 : prev - 1));
  };

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeIn}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="heading-md mb-2 mt-10 font-bold text-4xl">
            About <span className="text-gradient">Us</span>
          </h1>
          <p className="mb-6 font-semibold text-tertiary-600">
            Pioneering <span className="text-gradient">Cellular Immunotherapy</span>
          </p>
          <p className="text-gray-600 text-lg">
            We are dedicated to developing breakthrough cellular therapies using NK cells and Gamma Delta T cells 
            for cancer and autoimmune. Our proprietary platforms harness these immune cells to locate and eliminate 
            tumor cells with high specificity and safety.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-stretch mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden shadow-xl group h-full"
          >
            <img
              src="/assets/facilities/equipments.jpg"
              alt="Laboratory research"
              className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-700/70 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out">
              <div className="p-8">
                <p className="text-white text-lg font-medium">
                  Advancing cell-based immunotherapies for cancer treatment
                </p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-10 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="heading-sm mb-4 text-primary-600">Our Vision &amp; Mission</h3>
              <p className="text-gray-600 mb-6">
                To bring curative allogenic cell therapies to India &amp; ROW simultaneously with the US &amp; Europe, ensuring early, affordable, and high-quality access for patients in India &amp; ROW.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    transition: { duration: 0.15 }
                  }}
                  className="group bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:bg-white transition-colors duration-200 ease-out flex flex-col items-center text-center"
                >
                  <div className="bg-background rounded-full w-12 h-12 flex items-center justify-center mb-4 transition-colors duration-200 ease-out group-hover:bg-background">
                    {feature.icon}
                  </div>
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Facilities Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="heading-sm mb-4 text-tertiary-600">Our Facilities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              East Ocyon Bio operates cutting-edge research and manufacturing facilities 
              equipped with the latest technologies to develop and produce our cellular immunotherapies.
              Our specialized laboratories include cell culture suites, flow cytometry stations, 
              GMP manufacturing areas, and comprehensive quality control testing facilities.
            </p>
          </div>

          <div className="relative">
            {/* Facility Image Carousel */}
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              {facilityImages.map((image, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Log the error for debugging
                      console.error(`Failed to load image: ${image.src}`);
                      // Fallback image if the specified one fails to load
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-white text-xl font-medium">{image.caption}</p>
                  </div>
                </div>
              ))}

              {/* Navigation Buttons */}
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary-600 rounded-full p-2 z-20 shadow-md transition-all duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary-600 rounded-full p-2 z-20 shadow-md transition-all duration-200"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {facilityImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentImage 
                        ? 'bg-secondary-500 scale-100' 
                        : 'bg-white/50 scale-75 hover:scale-90 hover:bg-white/70'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;