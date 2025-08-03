import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Clock, Tag, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getNews } from '../services/api';

const API_BASE_URL = 'http://localhost/EOB';

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
  status?: string;
}

// Add custom styles for TinyMCE content
const tinyMceStyles = `
  .article-content h1, .article-content h2, .article-content h3, 
  .article-content h4, .article-content h5, .article-content h6 {
    font-weight: 600;
    line-height: 1.3;
    color: #1e3a8a;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }
  
  .article-content h1 { font-size: 2rem; }
  .article-content h2 { font-size: 1.75rem; }
  .article-content h3 { font-size: 1.5rem; }
  .article-content h4 { font-size: 1.25rem; }
  .article-content h5 { font-size: 1.125rem; }
  .article-content h6 { font-size: 1rem; }
  
  .article-content p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  .article-content ul, .article-content ol {
    padding-left: 2rem;
    margin-bottom: 1rem;
  }
  
  .article-content ul { list-style-type: disc; }
  .article-content ol { list-style-type: decimal; }
  
  .article-content a {
    color: #18849c;
    text-decoration: underline;
    transition: color 0.2s;
  }
  
  .article-content a:hover {
    color: #125868;
  }
  
  .article-content blockquote {
    border-left: 4px solid #e5e7eb;
    padding-left: 1rem;
    font-style: italic;
    margin: 1rem 0;
  }
  
  .article-content img {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin: 1rem 0;
  }
  
  .article-content table {
    border-collapse: collapse;
    width: 100%;
    margin: 1rem 0;
  }
  
  .article-content th,
  .article-content td {
    border: 1px solid #e5e7eb;
    padding: 0.75rem;
    text-align: left;
  }
  
  .article-content th {
    background-color: #f9fafb;
    font-weight: 600;
  }
  
  .article-content pre {
    background-color: #f1f5f9;
    border-radius: 0.375rem;
    padding: 1rem;
    overflow-x: auto;
    margin: 1rem 0;
  }
  
  .article-content code {
    font-family: monospace;
    background-color: #f1f5f9;
    padding: 0.2em 0.4em;
    border-radius: 0.25rem;
    font-size: 0.875em;
  }
`;

const NewsArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Add TinyMCE content styles to the document
    const styleElement = document.createElement('style');
    styleElement.textContent = tinyMceStyles;
    document.head.appendChild(styleElement);

    // Cleanup function to remove styles when component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setError('Invalid article ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // We need to fetch all articles and then find the specific one by ID
        // In a real API, you would have an endpoint like /api/news/{id}
        const allNews = await getNews(50, 1); // Fetch a large number to increase chances of finding the article
        const articleId = parseInt(id, 10);
        const foundArticle = allNews.find((item: NewsItem) => item.id === articleId);
        
        if (foundArticle) {
          setArticle(foundArticle);
          
          // Find related articles (same category or by date)
          const related = allNews
            .filter((item: NewsItem) => 
              item.id !== articleId && 
              (item.category === foundArticle.category || 
               Math.abs(new Date(item.date || '').getTime() - new Date(foundArticle.date || '').getTime()) < 30 * 24 * 60 * 60 * 1000)
            )
            .slice(0, 3);
          
          setRelatedArticles(related);
        } else {
          setError('Article not found');
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load the article');
        setLoading(false);
        console.error('Error fetching article:', err);
      }
    };

    fetchArticle();
  }, [id]);

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

  // Function to get image URL with fallback
  const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return '/assets/facilities/facility.jpeg';
    
    // Check if it's an absolute URL
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Otherwise, prepend the base URL
    return imagePath.startsWith('/') 
      ? `${window.location.origin}${imagePath}`
      : `${window.location.origin}/${imagePath}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container-custom content-container py-32 flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container-custom content-container py-32 text-center">
          <h2 className="heading-md mb-6">Article Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "The article you're looking for does not exist or has been removed."}</p>
          <Link to="/news" className="btn btn-primary">
            Back to News
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <article className="content-container">
        {/* Hero section with image */}
        {article.image && (
          <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
            <img 
              src={getImageUrl(article.image)}
              alt={article.title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/assets/facilities/facility.jpeg';
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 z-20 container-custom pb-8 text-white">
              <div className="max-w-3xl">
                {article.category && (
                  <span className="inline-block bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {article.category}
                  </span>
                )}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{article.title}</h1>
                
                <div className="flex flex-wrap items-center text-gray-200 text-sm">
                  {article.date && (
                    <div className="flex items-center mr-6 mb-2">
                      <Calendar size={16} className="mr-1" />
                      <span>{formatDate(article.date)}</span>
                    </div>
                  )}
                  {article.author && (
                    <div className="flex items-center mb-2">
                      <User size={16} className="mr-1" />
                      <span>{article.author}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-3/4">
              {/* Article content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-md p-6 md:p-8 lg:p-10"
              >
                {/* Show title again if there's no feature image */}
                {!article.image && (
                  <div className="mb-8">
                    {article.category && (
                      <span className="inline-block bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                        {article.category}
                      </span>
                    )}
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
                    
                    <div className="flex flex-wrap items-center text-gray-500 text-sm mb-6">
                      {article.date && (
                        <div className="flex items-center mr-6 mb-2">
                          <Calendar size={16} className="mr-1" />
                          <span>{formatDate(article.date)}</span>
                        </div>
                      )}
                      {article.author && (
                        <div className="flex items-center mb-2">
                          <User size={16} className="mr-1" />
                          <span>{article.author}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Enhanced content rendering with custom styling */}
                <div 
                  className="article-content text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
                
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <Link to="/news" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to News
                  </Link>
                </div>
              </motion.div>
            </div>
            
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <div className="sticky top-24">
                {/* Related articles */}
                {relatedArticles.length > 0 && (
                  <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedArticles.map(item => (
                        <Link 
                          key={item.id} 
                          to={`/news/${item.id}`}
                          className="block group"
                        >
                          <div className="flex items-start">
                            {item.image && (
                              <div className="w-16 h-16 flex-shrink-0 mr-3 overflow-hidden rounded">
                                <img 
                                  src={getImageUrl(item.image)} 
                                  alt={item.title} 
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src = '/assets/facilities/facility.jpeg';
                                  }}
                                />
                              </div>
                            )}
                            <div>
                              <h4 className="text-sm font-medium group-hover:text-primary-600 transition-colors">
                                {item.title}
                              </h4>
                              {item.date && (
                                <p className="text-xs text-gray-500 mt-1">
                                  {formatDate(item.date)}
                                </p>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Categories widget */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    <Link to="/news" className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-600 hover:bg-primary-200 transition-colors">
                      <Tag size={14} className="mr-1" />
                      All News
                    </Link>
                    {article.category && (
                      <Link to="/news" className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-600 hover:bg-primary-200 transition-colors">
                        <Tag size={14} className="mr-1" />
                        {article.category}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      
      <Footer />
    </div>
  );
};

export default NewsArticle;