import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KanbanBoard from '../components/KanbanBoard';
import { fetchProducts, updateProductCategory, deleteProduct,} from '../services/productService';
import { fetchCategories } from '../services/categoryService';

const KanbanPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const loadProducts = async () => {
    try {
      const res = await fetchProducts();
      setProducts(res.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await fetchCategories();
      setCategories(['Uncategorized', ...res.data.map(cat => cat.name)]);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const handleCategoryChange = async (productId, newCategory) => {
    try {
      await updateProductCategory(productId, newCategory);
      loadProducts();
    } catch (error) {
      console.error('Failed to update product category:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      loadProducts();
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
