import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen w-full flex items-center overflow-hidden"
      ref={scrollRef}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <video
          src="/home.mp4"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Dark glow effect for UI distinguishability - replaces the solid overlay */}
        <div 
          className="absolute inset-0" 
          style={{ background: 'radial-gradient(circle at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 70%)' }}
        ></div>
      </div>
      
      {/* Content - Simplified and focused */}
      <div className="container-custom relative z-10 pt-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h5 className="text-white font-medium mb-4">Advanced Immune Cell Therapy</h5>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="heading-lg text-white mb-6">
            Pioneering <span className="text-primary-300">NK Cells</span> & <span className="text-primary-300">Gamma Delta T Cells</span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-white text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              East Ocyon Bio develops breakthrough immunotherapies using proprietary NK cells and 
              Gamma Delta T cells to target and eliminate cancer cells with high specificity and safety.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16 sm:mb-0"
          >
            <a href="#technology" className="btn btn-secondary">
              Our Technology
            </a>
            <a href="#products" className="btn btn-primary">
              Explore Products
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Down Indicator - moved up on mobile, preserved position on desktop */}
      <div className="absolute left-0 right-0 flex justify-center bottom-4 sm:bottom-10">
        <motion.div 
          className="text-white cursor-pointer z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: 0.6,
            y: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
          onClick={handleScroll}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 hidden sm:block">Scroll Down</span>
            <ArrowDown size={20} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;