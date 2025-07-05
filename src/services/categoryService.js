import api from './api';

export const fetchCategories = () => api.get('/api/categories');

export const addCategory = (name) =>
  api.post('/api/categories', { name });

export const deleteCategory = (categoryName) =>
  api.delete(`/api/categories/${categoryName}`);
