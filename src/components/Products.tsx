import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
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

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('all');

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: "0px 0px -10% 0px"
  });

  // Mock products data representing the chart categories
  const mockProducts: Product[] = [
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
    },
    {
      id: 4,
      name: "CRISPR Gene Editing Services",
      category: "Emerging Technology",
      description: "Precision gene editing technology services for targeted modification of immune cells to enhance therapeutic potential.",
      features: "Custom targeting design\nHigh efficiency editing\nMultiplex capabilities\nComprehensive validation",
      image: "/assets/products/crispr.jpg"
    },
    {
      id: 5,
      name: "mRNA Delivery Platform",
      category: "Emerging Technology",
      description: "Innovative mRNA delivery system for transient expression of therapeutic proteins in target cells.",
      features: "Enhanced cellular uptake\nImproved stability\nTargeted delivery\nReduced immunogenicity",
      image: "/assets/products/mrna.jpg"
    }
  ];

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        setLoading(true);
        // Attempt to fetch real data
        const data = await getProducts().catch(() => {
          console.log("Using mock product data instead");
          return mockProducts;
        });
        
        // Validate the data structure
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          console.log("Invalid data structure or empty data, using mock data");
          setProducts(mockProducts);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setProducts(mockProducts);
        setLoading(false);
      }
    };

    fetchProductsData();
  }, []);

  // Parse features from a string to an array - limit to 3 features for homepage
  const getFeaturesList = (featuresString?: string): string[] => {
    if (!featuresString) return [];
    return featuresString.split('\n')
      .filter(feature => feature.trim().length > 0)
      .slice(0, 3); // Limit to 3 features for homepage
  };

  // Show a brief version of the description for homepage
  const getBriefDescription = (description: string): string => {
    if (!description) return '';
    if (description.length <= 150) return description;
    return description.substring(0, 150) + '...';
  };

  // Extract available categories from products
  const availableCategories = useMemo(() => {
    const categories = products
      .map(product => product.category)
      .filter((category): category is string => !!category);
    
    // Return unique categories
    return [...new Set(categories)];
  }, [products]);

  // Filter products by category
  const filteredProducts = useMemo(() => 
    category === 'all' 
      ? products 
      : products.filter(product => product.category === category),
    [products, category]
  );

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

  if (loading) {
    return (
      <section id="products" className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="heading-md mb-6">
              Our <span className="text-gradient">Products</span> & Solutions
            </h2>
            <div className="flex justify-center">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error && products.length === 0) {
    return (
      <section id="products" className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="heading-md mb-6">
              Our <span className="text-gradient">Products</span> & Solutions
            </h2>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section id="products" className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="heading-md mb-6">
              Our <span className="text-gradient">Products</span> & Solutions
            </h2>
            <p className="text-gray-600">No products available at this time.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="section-padding bg-background">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-10"
        >
          <h2 className="heading-md mb-6">
            Our <span className="text-gradient">Products</span> & Solutions
          </h2>
          <p className="text-gray-600 text-lg">
            East Ocyon Bio offers a range of innovative products and technologies focusing on
            NK cells, Gamma Delta T cells, and Gamma Retroviral vectors.
          </p>
        </motion.div>

        {/* Category Tabs - Only render if we have multiple categories */}
        {availableCategories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex bg-white rounded-full p-1 shadow-sm overflow-x-auto max-w-full">
              <button
                onClick={() => setCategory('all')}
                className={`px-5 py-2 text-sm font-medium rounded-full transition ${
                  category === 'all' ? 'bg-primary-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Products
              </button>
              
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-5 py-2 text-sm font-medium rounded-full transition whitespace-nowrap ${
                    category === cat 
                      ? cat === 'Cell Therapy' 
                        ? 'bg-primary-500 text-white'
                        : cat === 'Vector Technology'
                          ? 'bg-secondary-500 text-white'
                          : 'bg-tertiary-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Product Cards Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              className={`bg-white rounded-xl shadow-md overflow-hidden ${
                product.category === 'Emerging Technology' ? 'opacity-90' : ''
              }`}
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={getImagePath(product.image)}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback image if the specified one fails to load
                    e.currentTarget.src = '/assets/facilities/facility.jpeg';
                  }}
                />
                {product.category === 'Cell Therapy' && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                      <Star size={12} className="mr-1" /> FLAGSHIP
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                {product.category && (
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                    product.category === 'Cell Therapy' 
                      ? 'bg-primary-100 text-primary-700'
                      : product.category === 'Vector Technology'
                        ? 'bg-secondary-100 text-secondary-700'
                        : 'bg-tertiary-100 text-tertiary-700'
                  }`}>
                    {product.category}
                  </span>
                )}
                
                <h3 className={`text-xl font-semibold mb-3 ${
                  product.category === 'Cell Therapy' 
                    ? 'text-primary-700'
                    : product.category === 'Vector Technology'
                      ? 'text-secondary-700'
                      : 'text-tertiary-700'
                }`}>{product.name}</h3>
                
                <p className="text-gray-600 mb-4 text-sm">
                  {product.short_description ? product.short_description : getBriefDescription(product.description)}
                </p>
                
                {getFeaturesList(product.features).length > 0 && (
                  <div className="mb-5">
                    <ul className="space-y-1">
                      {getFeaturesList(product.features).map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <div className="flex-shrink-0 mt-1">
                            <div className={`w-2 h-2 rounded-full ${
                              product.category === 'Cell Therapy' 
                                ? 'bg-primary-500'
                                : product.category === 'Vector Technology'
                                  ? 'bg-secondary-500'
                                  : 'bg-tertiary-500'
                            }`}></div>
                          </div>
                          <span className="ml-2 text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex justify-end">
                  <Link
                    to={`/products#${product.id}`}
                    className={`text-sm font-medium flex items-center ${
                      product.category === 'Cell Therapy' 
                        ? 'text-primary-600 hover:text-primary-700'
                        : product.category === 'Vector Technology'
                          ? 'text-secondary-600 hover:text-secondary-700'
                          : 'text-tertiary-600 hover:text-tertiary-700'
                    }`}
                  >
                    Learn more
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/products" className="btn btn-primary">
            View All Products & Technologies
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;