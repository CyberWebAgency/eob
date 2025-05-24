import React from 'react';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* <section className="pt-32 pb-16 bg-gradient-to-b from-primary-50 to-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h1 className="heading-lg mb-4">
                Contact <span className="text-gradient">Us</span>
              </h1>
              <p className="text-gray-700 text-lg">
                Get in touch with our team to learn more about our solutions
              </p>
            </div>
          </div>
        </section> */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;