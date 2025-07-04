import React, { useState } from 'react';

const CategoryForm = ({ onAddCategory, categories, onDeleteCategory }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddCategory(name.trim());
    setName('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2 max-w-md">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Add new category"
          className="input input-bordered flex-grow"
        />
        <button type="submit" className="btn btn-primary">Add</button>
      </form>

      <div>
        {categories && categories.map(category => (
          category !== 'Uncategorized' && (
            <div key={category} className="flex items-center gap-2 mb-2">
              <span className="text-base">{category}</span>
              <button className="btn btn-error btn-xs" onClick={() => onDeleteCategory(category)}>Delete</button>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default CategoryForm;
