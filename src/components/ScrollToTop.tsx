import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    // Store the current scroll position with the current URL in session storage when user navigates away
    const handleBeforeUnload = () => {
      sessionStorage.setItem(
        'scrollPosition', 
        JSON.stringify({
          pathname: window.location.pathname,
          position: window.scrollY
        })
      );
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    // Check if we're navigating back (popstate event)
    const handlePopState = () => {
      const savedPosition = sessionStorage.getItem('scrollPosition');
      
      if (savedPosition) {
        const { pathname: savedPath, position } = JSON.parse(savedPosition);
        
        // If we're going back to the same page, restore scroll position
        if (savedPath === window.location.pathname) {
          setTimeout(() => {
            window.scrollTo(0, parseInt(position, 10));
          }, 0);
        }
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    // When navigating to a new page (not back/forward navigation)
    if (!window.performance?.getEntriesByType('navigation')[0]?.name?.includes('back_forward')) {
      // If there's a hash in the URL, let the browser handle the scroll
      if (!hash) {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;