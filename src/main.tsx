import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';  // Regular import instead of lazy loading

// Create a simple loading component

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
    <App />  // Remove Suspense wrapper since we're not lazy loading
  );
}

// Add performance monitoring
if (process.env.NODE_ENV === 'production') {
  // Report web vitals
  const reportWebVitals = () => {
    import('web-vitals').then(({ onCLS, onFCP, onLCP }) => {
      onCLS(console.log); // Cumulative Layout Shift
      onFCP(console.log); // First Contentful Paint
      onLCP(console.log); // Largest Contentful Paint
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
function getTTFB(_log: { (...data: any[]): void; (message?: any, ...optionalParams: any[]): void; }) {
  throw new Error('Function not implemented.');
}

