import api from './api';

export const fetchProducts = () => api.get('/api/products');

export const updateProductCategory = (productId, category) =>
  api.put(`/api/products/${productId}`, { category });

export const deleteProduct = (productId) =>
  api.delete(`/api/products/${productId}`);

export const scanBarcode = (barcode) =>
  api.post('/api/products/scan', { barcode });
