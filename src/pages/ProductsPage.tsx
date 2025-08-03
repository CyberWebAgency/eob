import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronRight, Check } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getProducts } from '../services/api';

// Define TypeScript interface for product
interface Product {
  id: number;
  name: string;
  category?: string;
  short_description?: string;
  description: string;
  features?: string;
  image?: string;
  order_number?: number;
  status?: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const productRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  const location = useLocation();
  
  const [ref] = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: "0px 0px -10% 0px"
  });

  // Parse features from a string to an array
  const getFeaturesList = (featuresString?: string): string[] => {
    if (!featuresString) return [];
    return featuresString.split('\n').filter(feature => feature.trim().length > 0);
  };

  // Mock products data as fallback
  const mockProducts: Product[] = useMemo(() => [
    {
      id: 1,
      name: "NK Cell Therapy Platform",
      category: "Cell Therapy",
      description: "Our proprietary NK cell therapy platform leverages enhanced cytotoxicity and tumor-targeting capabilities for solid tumors and hematological malignancies.",
      features: "Improved persistence\nEnhanced tumor recognition\nReduced immunosuppression\nScalable manufacturing",
      image: "/assets/products/nk-cells.jpg"
    },
    {
      id: 2,
      name: "Gamma Delta T Cell Products",
      category: "Cell Therapy",
      description: "Advanced γδ T cell therapies with unique recognition properties that enable activity against a broad range of cancer cells while sparing healthy tissue.",
      features: "MHC-independent recognition\nNatural tissue surveillance\nReduced risk of GvHD\nCombination approaches",
      image: "/assets/products/gamma-delta.jpg"
    },
    {
      id: 3,
      name: "Gamma Retroviral Vector System",
      category: "Vector Technology",
      description: "High-efficiency gene delivery vectors for stable integration of therapeutic genes into target cells with optimized safety profile.",
      features: "Enhanced transduction efficiency\nImproved safety features\nScalable production\nRegulatory support",
      image: "/assets/products/vectors.jpg"
    }
  ], []);

  // Get correct image path for products
  const getImagePath = (imagePath?: string): string => {
    if (!imagePath) return '/assets/facilities/facility.jpeg';
    
    // If it's already a full URL or starts with '/'
    if (imagePath.startsWith('http') || imagePath.startsWith('/')) {
      return imagePath;
    }
    
    // Add leading slash if needed
    return `/${imagePath}`;
  };

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        
        // Validate data structure
        if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
        } else {
          console.log("Invalid data structure or empty data, using mock data");
          setProducts(mockProducts);
        }
        
        setLoading(false);
        
        // After products are loaded, check if there's a hash in the URL
        if (location.hash) {
          // Wait for the component to fully render with the products
          setTimeout(() => {
            const productId = location.hash.substring(1); // Remove # from the hash
            const productElement = productRefs.current[productId];
            
            if (productElement) {
              productElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError('Failed to load products data. Please try again later.');
        setProducts(mockProducts);
        setLoading(false);
      }
    };

    fetchProductsData();
  }, [location, mockProducts]);

  // Split products into first product and the rest
  const firstProduct = products.length > 0 ? products[0] : null;
  const remainingProducts = products.length > 0 ? products.slice(1) : [];

  const renderProduct = (product: Product, index: number, useAnimation: boolean = true) => (
    <motion.div 
      key={product.id}
      ref={el => productRefs.current[product.id.toString()] = el}
      id={`${product.id}`}
      initial={useAnimation ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
      whileInView={useAnimation ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: "-50px" }}
      transition={useAnimation ? { duration: 0.5, delay: 0.05 * index } : { duration: 0 }}
      className="product-container"
    >
      <div className="mb-16 text-center">
        {product.category && (
          <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 ${
            product.category === 'Cell Therapy' 
              ? 'bg-primary-100 text-primary-700'
              : product.category === 'Vector Technology'
                ? 'bg-secondary-100 text-secondary-700'
                : 'bg-tertiary-100 text-tertiary-700'
          }`}>
            {product.category}
          </span>
        )}
        <h2 className="heading-md mb-4">{product.name}</h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          {product.short_description || product.description?.substring(0, 150) + '...'}
        </p>
      </div>
      
      <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
        <div className={`${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
          <div className="rounded-xl overflow-hidden shadow-xl">
            <img 
              src={getImagePath(product.image)} 
              alt={product.name} 
              className="w-full h-[400px] object-cover"
              onError={(e) => {
                // Fallback image if the specified one fails to load
                e.currentTarget.src = '/assets/facilities/facility.jpeg';
              }}
            />
          </div>
        </div>
        
        <div>
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              {product.description || "No detailed description available for this product."}
            </p>
            
            {getFeaturesList(product.features).length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <ul className="grid md:grid-cols-2 gap-x-6 gap-y-3">
                  {getFeaturesList(product.features).map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className={`mr-2 mt-1 ${
                        product.category === 'Cell Therapy' 
                          ? 'text-primary-600'
                          : product.category === 'Vector Technology'
                            ? 'text-secondary-600'
                            : 'text-tertiary-600'
                      }`}>
                        <Check size={16} />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="pt-4">
              <a 
                href="/contact" 
                className={`btn ${
                  product.category === 'Cell Therapy' 
                    ? 'btn-primary'
                    : product.category === 'Vector Technology'
                      ? 'btn-secondary'
                      : 'btn-tertiary'
                } inline-flex items-center`}
              >
                Request Information
                <ChevronRight size={16} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <Navbar />
      <main>
        {/* Hero section */}
        <section className="pt-32 bg-background">
          <div className="container-custom">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="heading-lg mb-4">
                Our <span className="text-gradient">Products</span>
              </h1>
              <p className="text-gray-700 text-lg">
                Innovative solutions driving the future of biotechnology
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* First Product (no scroll animation) */}
        {!loading && !error && firstProduct && (
          <section className="py-16 bg-background">
            <div className="container-custom">
              {renderProduct(firstProduct, 0, false)}
            </div>
          </section>
        )}
        
        {/* Remaining Products (with scroll animations) */}
        <section className="py-16 bg-background" ref={ref}>
          <div className="container-custom">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <p className="text-red-500">{error}</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-600">No products available at this time.</p>
              </div>
            ) : (
              <div className="space-y-32">
                {remainingProducts.map((product, index) => renderProduct(product, index + 1))}
              </div>
            )}
          </div>
        </section>
        
        {/* Call to action section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-md mb-6">Interested in our technologies?</h2>
              <p className="text-gray-700 text-lg mb-8">
                Our team of experts is ready to help you understand how our products and solutions can address your needs. 
                Contact us to discuss potential partnerships or to request more detailed information.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="btn btn-primary">Contact Our Team</a>
                <a href="/publications" className="btn btn-outline">View Research Publications</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProductsPage; 