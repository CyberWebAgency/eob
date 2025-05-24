import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Technology from './components/Technology';
import Products from './components/Products';
import Team from './components/Team';
import News from './components/News';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Collaborators from './components/Collaborators';
import NewsArticle from './pages/NewsArticle';
import NewsPage from './pages/NewsPage';
import TeamPage from './pages/TeamPage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import TechnologyPage from './pages/TechnologyPage';
import ContactPage from './pages/ContactPage';
import CollaboratorsPage from './pages/CollaboratorsPage';

// Preloader component
const Preloader = () => (
  <div className="fixed inset-0 bg-primary-900 z-50 flex items-center justify-center">
    <div className="text-center">
      <div className="relative h-24 w-24 mx-auto mb-6">
        <div className="absolute animate-ping h-full w-full rounded-full bg-white/30 opacity-75"></div>
        <div className="relative animate-pulse rounded-full h-full w-full bg-white/50 flex items-center justify-center">
          <div className="text-white text-2xl font-bold">EOB</div>
        </div>
      </div>
      <p className="text-white text-lg">East Ocyon Bio</p>
    </div>
  </div>
);

// HomePage component to render the main landing page
const HomePage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Technology />
        <Products />
        <Team />
        <Collaborators />
        <News />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Allow browser to render initial UI, then simulate preloading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Preloader />}
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/collaborators" element={<CollaboratorsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:id" element={<NewsArticle />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;