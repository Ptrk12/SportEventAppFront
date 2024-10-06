import axios from 'axios';

// Create Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5094',
});

// Define the maximum number of retries
const maxRetries = 3;

// Add an interceptor to retry requests based on the response status
api.interceptors.response.use(
  (response) => {
    // If the response is successful, just return it
    return response;
  },
  async (error) => {
    const config = error.config;

    // If error status is 404 and retries haven't reached the limit, retry the request
    if (error.response && error.response.status === 404) {
      config.__retryCount = config.__retryCount || 0;

      if (config.__retryCount < maxRetries) {
        config.__retryCount += 1;

        // Wait for 2 seconds before retrying the request
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Retry the request with the same config
        return api(config);
      }
    }

    // If retries have exceeded, or it's not a 404 error, reject the promise with the error
    return Promise.reject(error);
  }
);

export default api;
