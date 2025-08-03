import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import { updateSEO, defaultSEOData } from './utils/seo';

// SEO Wrapper Component to handle dynamic SEO updates
const SEOWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Update SEO based on current route
    const path = location.pathname;
    let seoData;

    switch (path) {
      case '/':
        seoData = defaultSEOData.home;
        break;
      case '/about':
        seoData = defaultSEOData.about;
        break;
      case '/technology':
        seoData = defaultSEOData.technology;
        break;
      case '/products':
        seoData = defaultSEOData.products;
        break;
      case '/team':
        seoData = defaultSEOData.team;
        break;
      case '/collaborators':
        seoData = defaultSEOData.collaborators;
        break;
      case '/news':
        seoData = defaultSEOData.news;
        break;
      case '/contact':
        seoData = defaultSEOData.contact;
        break;
      case '/privacy-policy':
        seoData = defaultSEOData.privacyPolicy;
        break;
      default:
        // For dynamic routes like /news/:id
        if (path.startsWith('/news/')) {
          seoData = {
            ...defaultSEOData.news,
            title: 'News Article | East Ocyon Bio',
            canonical: `https://eastocyonbio.com${path}`
          };
        } else {
          seoData = defaultSEOData.home;
        }
    }

    updateSEO(seoData);
  }, [location]);

  return <>{children}</>;
};

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
        <SEOWrapper>
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
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            </Routes>
          </div>
        </SEOWrapper>
      </Router>
    </>
  );
}

export default App;