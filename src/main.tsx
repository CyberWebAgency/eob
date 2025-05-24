import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Lazy load the main app component
const App = lazy(() => import('./App.tsx'));

// Create a simple loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
  </div>
);

// Add error tracking function
function logError(error: Error) {
  console.error('Application error:', error);
  // Here you would normally send to your error tracking service
}

// Get the root element
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  
  // Use error boundary and suspense for better UX
  root.render(
    <Suspense fallback={<LoadingFallback />}>
      <App />
    </Suspense>
  );
}

// Add performance monitoring
if (process.env.NODE_ENV === 'production') {
  // Report web vitals
  const reportWebVitals = () => {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log); // Cumulative Layout Shift
      getFID(console.log); // First Input Delay
      getFCP(console.log); // First Contentful Paint
      getLCP(console.log); // Largest Contentful Paint
      getTTFB(console.log); // Time to First Byte
    });
  };
  
  // Only load in production
  reportWebVitals();
}

// Add global error handling
window.addEventListener('error', (event) => {
  logError(event.error);
});
