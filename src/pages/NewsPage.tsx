import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, User, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getNews } from '../services/api';

// Define TypeScript interface for news item
interface NewsItem {
  id: number;
  title: string;
  preview?: string;
  content: string;
  image?: string;
  date?: string;
  author?: string;
  category?: string;
}

const NewsPage: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Function to strip HTML tags and get plain text for previews
  const stripHtml = (html: string): string => {
    // Create a temporary div element
    const tempDiv = document.createElement('div');
    // Set the HTML content
    tempDiv.innerHTML = html;
    // Get the text content
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    // Trim and return
    return textContent.trim();
  };

  // Function to create a clean preview from HTML content
  const createPreview = (content: string, length: number = 120): string => {
    // Strip HTML tags
    const plainText = stripHtml(content);
    // Truncate to desired length
    return plainText.length > length 
      ? plainText.substring(0, length) + '...' 
      : plainText;
  };

  // Function to get image URL with fallback
  const getImageUrl = (imagePath?: string): string => {
    if (!imagePath) return '/assets/facilities/facility.jpeg';
    
    // Check if it's an absolute URL
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Otherwise, prepend the base URL if needed
    return imagePath.startsWith('/') 
      ? imagePath 
      : `/${imagePath}`;
  };

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        setLoading(true);
        // Get all news items (or limit to a reasonable number like 20)
        const data = await getNews(20, 1);
        setNewsItems(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load news data');
        setLoading(false);
        console.error('Error fetching news data:', err);
      }
    };

    fetchNewsData();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="section-padding bg-background">
        <div className="container-custom" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="heading-md mb-6 mt-10">
              News & <span className="text-gradient">Publications</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Stay updated with the latest news, research publications, and developments from East Ocyon Bio.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
            </div>
          ) : newsItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-600">No news articles available at this time.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={getImageUrl(item.image)} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = '/assets/facilities/facility.jpeg';
                      }}
                    />
                    {item.category && (
                      <div className="absolute top-4 left-4">
                        <span className="inline-block bg-white text-primary-600 px-3 py-1 rounded-full text-xs font-medium">
                          {item.category}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-xl mb-3 group-hover:text-primary-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                      {item.preview || createPreview(item.content, 150)}
                    </p>
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      {item.date && (
                        <div className="flex items-center mr-4">
                          <Calendar size={14} className="mr-1" />
                          <span>{formatDate(item.date)}</span>
                        </div>
                      )}
                      {item.author && (
                        <div className="flex items-center">
                          <User size={14} className="mr-1" />
                          <span>{item.author}</span>
                        </div>
                      )}
                    </div>
                    <Link 
                      to={`/news/${item.id}`} 
                      className="inline-flex items-center text-primary-600 font-medium text-sm hover:text-primary-700"
                    >
                      Read More
                      <ExternalLink size={14} className="ml-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default NewsPage; 