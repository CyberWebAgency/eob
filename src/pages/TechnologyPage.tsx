import React from 'react';
import Navbar from '../components/Navbar';
import Technology from '../components/Technology';
import Footer from '../components/Footer';

const TechnologyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Technology />
      </main>
      <Footer />
    </div>
  );
};

export default TechnologyPage;