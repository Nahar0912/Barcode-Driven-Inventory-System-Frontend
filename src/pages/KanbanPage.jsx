import React, { useEffect, useState } from 'react';
import axios from 'axios';
import KanbanBoard from '../components/KanbanBoard';
import { useNavigate } from 'react-router-dom';

const KanbanPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(['Uncategorized', ...res.data.map(cat => cat.name)]);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleCategoryChange = async (productId, newCategory) => {
    try {
      await axios.put(`http://localhost:5000/api/products/${productId}`, { category: newCategory });
      fetchProducts();
    } catch (error) {
      console.error('Failed to update product category:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-center">Kanban Board</h2>
        <button
          onClick={() => navigate('/edit-categories')}
          className="btn btn-outline btn-primary"
        >
          Manage Categories
        </button>
      </div>

      <KanbanBoard
        products={products}
        categories={categories}
        onCategoryChange={handleCategoryChange}
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
};

export default KanbanPage;
