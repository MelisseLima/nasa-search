import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://images-api.nasa.gov'
});
