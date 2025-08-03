import React from 'react';
import { ChevronRight, ArrowUp } from 'lucide-react';
import Logo from './ui/Logo';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-primary-900 text-white">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Logo scrolled={false} />
            <p className="mt-4 text-primary-100">
              Advancing biotechnology through innovative research and development 
              to address significant healthcare challenges.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="https://www.instagram.com/eastocyonbio/" target="_blank" rel="noopener noreferrer" className="text-primary-200 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://twitter.com/eastocyonbio" target="_blank" rel="noopener noreferrer" className="text-primary-200 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/east-ocyon-bio-private-limited/" target="_blank" rel="noopener noreferrer" className="text-primary-200 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79zM6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 9.94v-8.37H5.5v8.37h2.77z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-primary-100 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={14} className="mr-1" />
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-primary-100 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={14} className="mr-1" />
                  About Us
                </a>
              </li>
              <li>
                <a href="/technology" className="text-primary-100 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={14} className="mr-1" />
                  Technology
                </a>
              </li>
              <li>
                <a href="/products" className="text-primary-100 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={14} className="mr-1" />
                  Products
                </a>
              </li>
              <li>
                <a href="/team" className="text-primary-100 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={14} className="mr-1" />
                  Team
                </a>
              </li>
              <li>
                <a href="/news" className="text-primary-100 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={14} className="mr-1" />
                  News
                </a>
              </li>
              <li>
                <a href="/contact" className="text-primary-100 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={14} className="mr-1" />
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="text-primary-100 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={14} className="mr-1" />
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Research Areas</h3>
            <ul className="space-y-3">
              <li>
                <a href="/technology" className="text-primary-100 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={14} className="mr-1" />
                  Gene Therapy
                </a>
              </li>
              <li>
                <a href="/technology" className="text-primary-100 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={14} className="mr-1" />
                  NK Cells
                </a>
              </li>
              <li>
                <a href="/technology" className="text-primary-100 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={14} className="mr-1" />
                  Gaama Delta T Cells
                </a>
              </li>
              <li>
                <a href="/technology" className="text-primary-100 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={14} className="mr-1" />
                  mRNA
                </a>
              </li>

            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-primary-100 mb-4">
              Subscribe to our newsletter to receive updates on our latest research and developments.
            </p>
            <form className="space-y-3">
              <div>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-primary-800 text-white placeholder-primary-300 border border-primary-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-white text-primary-900 hover:bg-primary-100 transition-colors rounded-lg px-4 py-2 font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="bg-primary-950 py-6 relative"> {/* Added relative for button positioning context */}
        <div className="container-custom flex flex-col items-center text-center space-y-3"> {/* Centered content */}
          {/* Top line: Copyright and Privacy Policy */}
          <div className="text-primary-200 text-sm space-y-2">
            <p>
              &copy; {new Date().getFullYear()} East Ocyon Bio. All rights reserved.
            </p>
            <p>
              <a href="/privacy-policy" className="text-white hover:text-primary-100 transition-colors underline">
                Privacy Policy
              </a>
            </p>
          </div>

          {/* Bottom line: Designed by */}
          <div className="flex items-center justify-center space-x-1 text-primary-200 text-sm"> {/* Centered */}
            <span>Designed and developed by</span>
            <a
              href="https://cyberwebopera.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-medium hover:text-primary-100 transition-colors"
            >
              Cyberweb OPERA
            </a>
          </div>
        </div>

        {/* Scroll to top button - remains fixed */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-10"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;