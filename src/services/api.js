import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:5000/',
  baseURL: 'https://barcode-driven-inventory-system-bac-phi.vercel.app',
  withCredentials: true
});

export default api;
