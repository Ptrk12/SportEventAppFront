import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5094',
});

const maxRetries = 3;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error.config;

    if (error.response && error.response.status === 404) {
      config.__retryCount = config.__retryCount || 0;

      if (config.__retryCount < maxRetries) {
        config.__retryCount += 1;

        await new Promise((resolve) => setTimeout(resolve, 2000));

        return api(config);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
