import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, User, ExternalLink, MapPin, Clock } from 'lucide-react';
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
  isEvent?: boolean;
  eventDate?: string;
  eventLocation?: string;
  eventTime?: string;
  link?: string;
}

// Helper function to strip HTML tags for preview text
const stripHtmlTags = (html: string): string => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

const News: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        setLoading(true);
        // Try to fetch from API
        let data = await getNews(6, 1).catch(() => null);
        
        // If API fails or returns no data, use mock data
        if (!data || data.length === 0) {
          data = [
            {
              id: 1,
              title: "Enhancing Viral Transduction in Natural Killer (NK) Cells for CAR-NK Cell Therapy",
              preview: "Our team has made significant progress in optimizing viral transduction protocols for NK cells, addressing one of the key challenges in CAR-NK cell therapy development.",
              content: "<p></p> <h3><strong>Enhancing Viral Transduction in Natural Killer (NK) Cells for CAR-NK Cell Therapy</strong></h3> <p>Our team has made significant progress in optimizing viral transduction protocols for NK cells, addressing one of the key challenges in CAR-NK cell therapy development.</p> <p>Natural Killer cells are notoriously difficult to genetically modify, with transduction efficiencies traditionally much lower than those achieved with T cells. Our new approach combines cytokine pre-activation, optimized viral vector design, and novel culture conditions to achieve transduction rates exceeding 70%.</p> <p>This breakthrough will enable more efficient production of CAR-NK cells for our upcoming clinical trials in hematological malignancies.</p>",
              image: "/assets/facilities/facility.jpeg",
              date: "2023-05-28",
              author: "Research Team",
              category: "Research",
              isEvent: false
            },
            {
              id: 2,
              title: "East Ocyon Bio Announces Development of Novel NK Cell Therapy",
              preview: "The company has successfully developed a proprietary NK cell platform with enhanced cytotoxicity and persistence.",
              content: "East Ocyon Bio today announced the successful development of its proprietary NK cell therapy platform, demonstrating enhanced cytotoxicity and improved persistence in preclinical models. This innovative approach could potentially address current limitations in solid tumor treatment.",
              image: "/assets/facilities/facility.jpeg",
              date: "2023-05-01",
              author: "Research Team",
              category: "Research",
              isEvent: false
            },
            {
              id: 3,
              title: "Upcoming Webinar: Advances in Gamma Delta T Cell Therapy",
              preview: "Join our experts to learn about the latest developments in Gamma Delta T cell therapy for cancer treatment.",
              content: "East Ocyon Bio is hosting a webinar featuring leading experts in the field of Gamma Delta T cell immunotherapy. The session will cover recent advances, clinical applications, and future directions.",
              image: "/assets/facilities/facility.jpeg",
              date: "2023-06-15",
              category: "Event",
              isEvent: true,
              eventDate: "2023-06-15",
              eventTime: "2:00 PM - 3:30 PM EST",
              eventLocation: "Virtual Event",
              link: "https://www.eastocyonbio.com/webinar"
            },
            {
              id: 4,
              title: "East Ocyon Bio to Present at Cell Therapy Conference",
              preview: "Our research team will present new data on our Gamma Retroviral Vector technology at the upcoming Cell Therapy Summit.",
              content: "East Ocyon Bio will present promising new data on its Gamma Retroviral Vector technology at the International Cell Therapy Summit. The presentation will highlight improvements in transduction efficiency and safety profile.",
              image: "/assets/facilities/facility.jpeg",
              date: "2023-07-20",
              category: "Conference",
              isEvent: true,
              eventDate: "2023-07-20",
              eventTime: "10:45 AM - 11:30 AM",
              eventLocation: "Boston Convention Center",
              link: "https://www.celltherapysummit.org"
            },
            {
              id: 5,
              title: "New Publication: Enhanced NK Cell Persistence Using Novel Vector",
              preview: "Our research team has published a paper demonstrating significantly improved NK cell persistence using our proprietary vector technology.",
              content: "East Ocyon Bio researchers have published a new paper in the Journal of Immunotherapy demonstrating significantly improved NK cell persistence using the company's proprietary vector technology. The study shows potential for improved clinical outcomes in solid tumor treatments.",
              image: "/assets/facilities/facility.jpeg",
              date: "2023-04-10",
              author: "Research Team",
              category: "Publication",
              isEvent: false
            },
            {
              id: 6,
              title: "East Ocyon Bio Partners with Leading Research Institute",
              preview: "We have established a strategic partnership to accelerate the development of our cellular immunotherapy platforms.",
              content: "East Ocyon Bio has announced a strategic partnership with the International Institute for Cellular Research to accelerate the development of its cellular immunotherapy platforms. This collaboration will combine East Ocyon's proprietary technologies with the Institute's advanced research capabilities.",
              image: "/assets/facilities/facility.jpeg",
              date: "2023-03-15",
              author: "Media Relations",
              category: "Partnership",
              isEvent: false
            }
          ];
        }
        
        setNewsItems(data);
        setLoading(false);
      } catch (err) {
        // Use mock data on error
        const mockData = [
          {
            id: 1,
            title: "Enhancing Viral Transduction in Natural Killer (NK) Cells for CAR-NK Cell Therapy",
            preview: "Our team has made significant progress in optimizing viral transduction protocols for NK cells, addressing one of the key challenges in CAR-NK cell therapy development.",
            content: "<p></p> <h3><strong>Enhancing Viral Transduction in Natural Killer (NK) Cells for CAR-NK Cell Therapy</strong></h3> <p>Our team has made significant progress in optimizing viral transduction protocols for NK cells, addressing one of the key challenges in CAR-NK cell therapy development.</p> <p>Natural Killer cells are notoriously difficult to genetically modify, with transduction efficiencies traditionally much lower than those achieved with T cells. Our new approach combines cytokine pre-activation, optimized viral vector design, and novel culture conditions to achieve transduction rates exceeding 70%.</p> <p>This breakthrough will enable more efficient production of CAR-NK cells for our upcoming clinical trials in hematological malignancies.</p>",
            image: "/assets/facilities/facility.jpeg",
            date: "2023-05-28",
            author: "Research Team",
            category: "Research",
            isEvent: false
          },
          {
            id: 2,
            title: "East Ocyon Bio Announces Development of Novel NK Cell Therapy",
            preview: "The company has successfully developed a proprietary NK cell platform with enhanced cytotoxicity and persistence.",
            content: "East Ocyon Bio today announced the successful development of its proprietary NK cell therapy platform, demonstrating enhanced cytotoxicity and improved persistence in preclinical models. This innovative approach could potentially address current limitations in solid tumor treatment.",
            image: "/assets/facilities/facility.jpeg",
            date: "2023-05-01",
            author: "Research Team",
            category: "Research",
            isEvent: false
          },
          {
            id: 3,
            title: "Upcoming Webinar: Advances in Gamma Delta T Cell Therapy",
            preview: "Join our experts to learn about the latest developments in Gamma Delta T cell therapy for cancer treatment.",
            content: "East Ocyon Bio is hosting a webinar featuring leading experts in the field of Gamma Delta T cell immunotherapy. The session will cover recent advances, clinical applications, and future directions.",
            image: "/assets/facilities/facility.jpeg",
            date: "2023-06-15",
            category: "Event",
            isEvent: true,
            eventDate: "2023-06-15",
            eventTime: "2:00 PM - 3:30 PM EST",
            eventLocation: "Virtual Event",
            link: "https://www.eastocyonbio.com/webinar"
          }
        ];
        
        setNewsItems(mockData);
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  if (loading) {
    return (
      <section id="news" className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="heading-md mb-6">
              News & <span className="text-gradient">Events</span>
            </h2>
            <p className="text-gray-600">Loading news and events...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error && newsItems.length === 0) {
    return (
      <section id="news" className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="heading-md mb-6">
              News & <span className="text-gradient">Events</span>
            </h2>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (newsItems.length === 0) {
    return (
      <section id="news" className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="heading-md mb-6">
              News & <span className="text-gradient">Events</span>
            </h2>
            <p className="text-gray-600">No news or events available at this time.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="section-padding bg-background">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-10"
        >
          <h2 className="heading-md mb-6">
            News & <span className="text-gradient">Events</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Stay updated with the latest news, events, and developments from East Ocyon Bio.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group ${
                item.isEvent ? 'border-l-4 border-secondary-500' : 'border-l-4 border-primary-500'
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image || '/assets/facilities/facility.jpeg'} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback image
                    e.currentTarget.src = '/assets/facilities/facility.jpeg';
                  }}
                />
                {item.category && (
                  <div className="absolute top-4 left-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      item.isEvent 
                        ? 'bg-secondary-100 text-secondary-700' 
                        : 'bg-primary-100 text-primary-700'
                    }`}>
                      {item.category}
                    </span>
                  </div>
                )}
                
                {item.isEvent && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-block bg-white text-secondary-600 px-3 py-1 rounded-full text-xs font-bold">
                      Event
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className={`font-semibold text-xl mb-3 group-hover:text-${item.isEvent ? 'secondary' : 'primary'}-600 transition-colors duration-300`}>
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                  {item.preview || stripHtmlTags(item.content).substring(0, 120) + '...'}
                </p>
                
                {item.isEvent ? (
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    {item.eventDate && (
                      <div className="flex items-center">
                        <Calendar size={14} className="text-secondary-500 mr-2 flex-shrink-0" />
                        <span>{new Date(item.eventDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                    )}
                    {item.eventTime && (
                      <div className="flex items-center">
                        <Clock size={14} className="text-secondary-500 mr-2 flex-shrink-0" />
                        <span>{item.eventTime}</span>
                      </div>
                    )}
                    {item.eventLocation && (
                      <div className="flex items-center">
                        <MapPin size={14} className="text-secondary-500 mr-2 flex-shrink-0" />
                        <span>{item.eventLocation}</span>
                      </div>
                    )}
                  </div>
                ) : (
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  {item.date && (
                    <div className="flex items-center mr-4">
                        <Calendar size={14} className="text-primary-500 mr-1" />
                      <span>{new Date(item.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                  )}
                  {item.author && (
                    <div className="flex items-center">
                        <User size={14} className="text-tertiary-500 mr-1" />
                      <span>{item.author}</span>
                    </div>
                  )}
                </div>
                )}
                
                {item.isEvent && item.link ? (
                  <a 
                    href={item.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-secondary-600 font-medium text-sm hover:text-secondary-700"
                  >
                    Register Now
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                ) : (
                <Link 
                  to={`/news/${item.id}`} 
                  className="inline-flex items-center text-primary-600 font-medium text-sm hover:text-primary-700"
                >
                  Read More
                  <ExternalLink size={14} className="ml-1" />
                </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center flex justify-center gap-4"
        >
          <Link to="/news" className="btn btn-outline">
            View All News
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default News;