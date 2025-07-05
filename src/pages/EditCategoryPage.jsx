import React, { useEffect, useState } from 'react';
import { fetchCategories, addCategory, deleteCategory,} from '../services/categoryService';

const EditCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');

  const loadCategories = async () => {
    try {
      const res = await fetchCategories();
      setCategories(res.data.map(cat => cat.name));
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await addCategory(name.trim());
      setName('');
      loadCategories();
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  };

  const handleDeleteCategory = async (categoryName) => {
    try {
      await deleteCategory(categoryName);
      loadCategories();
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Categories</h2>

      <form onSubmit={handleAddCategory} className="mb-6 flex gap-2 max-w-md mx-auto">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add new category"
          className="input input-bordered flex-grow"
        />
        <button type="submit" className="btn btn-primary">Add</button>
      </form>

      <div className="max-w-md mx-auto">
        {categories &&
          categories.map(
            (category) =>
              category !== 'Uncategorized' && (
                <div
                  key={category}
                  className="flex items-center justify-between mb-2 p-2 bg-gray-100 rounded"
                >
                  <span className="text-base">{category}</span>
                  <button
                    className="btn btn-error btn-xs"
                    onClick={() => handleDeleteCategory(category)}
                  >
                    Delete
                  </button>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default EditCategoryPage;
