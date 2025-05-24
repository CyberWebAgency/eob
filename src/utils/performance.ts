import { useEffect, DependencyList } from 'react';

// Function to delay non-essential operations
export const useNonEssentialEffect = (
  callback: () => void | (() => void),
  deps: DependencyList,
  delay: number = 1000
) => {
  useEffect(() => {
    // Delay execution to prioritize initial rendering
    const timeoutId = setTimeout(callback, delay);
    return () => clearTimeout(timeoutId);
  }, deps);
};

// Function to optimize image loading
export const getOptimizedImageUrl = (
  url: string,
  width?: number,
  quality: number = 80
): string => {
  // For real implementation, you would use an image CDN or service
  // This is a simple placeholder that adds dimensions to the URL
  if (!url) return url;
  
  const hasParams = url.includes('?');
  const separator = hasParams ? '&' : '?';
  
  let optimizedUrl = url;
  if (width) {
    optimizedUrl += `${separator}w=${width}`;
  }
  
  return optimizedUrl;
};

// Lazy loading utility for components
export const lazyLoadImages = () => {
  useEffect(() => {
    // Check if browser supports IntersectionObserver
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img[data-src]');
      
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const image = entry.target as HTMLImageElement;
            image.src = image.dataset.src || '';
            image.removeAttribute('data-src');
            imageObserver.unobserve(image);
          }
        });
      });
      
      lazyImages.forEach((img) => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers without IntersectionObserver support
      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach((img) => {
        const image = img as HTMLImageElement;
        image.src = image.dataset.src || '';
        image.removeAttribute('data-src');
      });
    }
  }, []);
};

// Function to debounce expensive operations (like resize handlers)
export function debounce<T extends (...args: any[]) => any>(
  func: T, 
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

// Optimize framer-motion animations
export const reduceMotion = typeof window !== 'undefined' && 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const optimizedAnimationSettings = {
  initial: reduceMotion ? {} : { opacity: 0, y: 20 },
  animate: reduceMotion ? {} : { opacity: 1, y: 0 },
  transition: reduceMotion ? {} : { 
    duration: 0.5,
    ease: [0.25, 0.1, 0.25, 1.0],
  }
}; 