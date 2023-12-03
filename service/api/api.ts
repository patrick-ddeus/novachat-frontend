import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { Accept: 'application/json' },
});

export default apiInstance;
