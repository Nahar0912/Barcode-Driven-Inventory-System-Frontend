import React, { useEffect, useState } from 'react';
import axios from 'axios';
import KanbanBoard from '../components/KanbanBoard';
import CategoryForm from '../components/CategoryForm';

const KanbanPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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

  const addNewCategory = async (name) => {
    try {
      await axios.post('http://localhost:5000/', { name });
      fetchCategories();
    } catch (error) {
      console.error('Failed to add category:', error);
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

  const handleDeleteCategory = async (categoryName) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${categoryName}`);
      fetchCategories();
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Kanban Board</h2>
      <CategoryForm
        onAddCategory={addNewCategory}
        categories={categories}
        onDeleteCategory={handleDeleteCategory}
      />
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
