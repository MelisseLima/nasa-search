import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://images-api.nasa.gov'
});

export const searchItems = (query: any, params = {}) => {
    const searchEndpoint = '/search';
    const searchParams = { q: query, ...params };
    return getItems(searchEndpoint, searchParams);
};

export const getItems = (endpoint: string, params = {}) => {
    return api.get(endpoint, { params })
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching items from the NASA Images API:', error);
        throw error;
      });
  };
