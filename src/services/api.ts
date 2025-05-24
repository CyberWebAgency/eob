// API base URL - localhost
// const API_BASE_URL = 'http://localhost/EOB/api';

// API base URL - production
const API_BASE_URL = 'https://eob.cyberwebopera.com/api';

// Default fetch timeout (5 seconds)
const DEFAULT_TIMEOUT = 5000;

// Common API error class
class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number = 500) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Timeout promise
const timeoutPromise = (ms: number): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new ApiError(`Request timed out after ${ms}ms`, 408));
    }, ms);
  });
};

// Generic fetch function with error handling and timeout
const fetchData = async (endpoint: string, timeout: number = DEFAULT_TIMEOUT) => {
  try {
    // Race between fetch and timeout
    const response = await Promise.race([
      fetch(`${API_BASE_URL}/${endpoint}`),
      timeoutPromise(timeout)
    ]) as Response;
    
    // Check if response is ok
    if (!response.ok) {
      throw new ApiError(`HTTP error: ${response.status} ${response.statusText}`, response.status);
    }
    
    const data = await response.json();
    
    // Validate API response format
    if (typeof data !== 'object' || data === null) {
      throw new ApiError('Invalid API response format');
    }
    
    // Check API status code in response
    if (data.status !== 200) {
      throw new ApiError(data.message || 'Something went wrong', data.status || 500);
    }
    
    // Validate that data exists in the response
    if (!('data' in data)) {
      throw new ApiError('Missing data in API response');
    }
    
    return data.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    
    // Rethrow ApiErrors
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Convert other errors to ApiError
    throw new ApiError((error as Error).message || 'Unknown error occurred');
  }
};

// API services for each data type
export const getTeamMembers = async (type?: string) => {
  try {
    const endpoint = type ? `team.php?type=${encodeURIComponent(type)}` : 'team.php';
    return await fetchData(endpoint);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
};

export const getNews = async (limit = 10, page = 1) => {
  try {
    return await fetchData(`news.php?limit=${limit}&page=${page}`);
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

export const getProducts = async () => {
  try {
    return await fetchData('products.php');
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getTechnology = async () => {
  try {
    return await fetchData('technology.php');
  } catch (error) {
    console.error('Error fetching technology:', error);
    return [];
  }
};

export const getCollaborators = async () => {
  try {
    return await fetchData('collaborators.php');
  } catch (error) {
    console.error('Error fetching collaborators:', error);
    return [];
  }
};

export default {
  getTeamMembers,
  getNews,
  getProducts,
  getTechnology,
  getCollaborators
}; 