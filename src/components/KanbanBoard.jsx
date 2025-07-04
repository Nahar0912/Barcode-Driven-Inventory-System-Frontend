import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const KanbanBoard = ({ products, categories, onCategoryChange, onDeleteProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState({});
  const productsPerPage = 5;

  const getFilteredProductsByCategory = (category) => {
    return products.filter(product =>
      product.category === category &&
      (product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const getCurrentPageProducts = (category) => {
    const filtered = getFilteredProductsByCategory(category);
    const page = currentPage[category] || 1;
    const startIndex = (page - 1) * productsPerPage;
    return filtered.slice(startIndex, startIndex + productsPerPage);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const productId = result.draggableId;
    const newCategory = result.destination.droppableId;

    onCategoryChange(productId, newCategory);
  };

  const handlePageChange = (category, newPage) => {
    setCurrentPage(prev => ({ ...prev, [category]: newPage }));
  };

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by product name or category"
          className="input input-bordered w-80"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="overflow-x-auto">
          <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${categories.length}, minmax(250px, 1fr))` }}
          >
            {/* Table Headers */}
            {categories.map(category => (
              <div
                key={category}
                className="text-center font-bold text-lg p-4 border border-gray-300 bg-gray-100"
              >
                {category}
              </div>
            ))}

            {/* Table Body */}
            {categories.map(category => {
              const filteredProducts = getFilteredProductsByCategory(category);
              const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
              const page = currentPage[category] || 1;

              return (
                <Droppable droppableId={category} key={category}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="min-h-[400px] p-2 border border-gray-300"
                    >
                      {getCurrentPageProducts(category).map((product, index) => (
                        <Draggable key={product._id} draggableId={product._id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-3 rounded shadow mb-3 cursor-move"
                            >
                              <h4 className="font-medium">{product.description}</h4>
                              <p className="text-sm text-gray-600">Material: {product.material}</p>
                              <p className="text-xs text-gray-400">Barcode: {product.barcode}</p>
                              <button
                                className="btn btn-error btn-xs mt-2"
                                onClick={() => onDeleteProduct(product._id)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}

                      {/* Numbered Pagination */}
                      {totalPages > 1 && (
                        <div className="flex justify-center mt-4 gap-2 flex-wrap">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                            <button
                              key={pageNumber}
                              className={`btn btn-sm ${pageNumber === page ? 'btn-primary' : 'btn-ghost'}`}
                              onClick={() => handlePageChange(category, pageNumber)}
                            >
                              {pageNumber}
                            </button>
                          ))}

                          <button
                            className="btn btn-sm"
                            disabled={page === totalPages}
                            onClick={() => handlePageChange(category, page + 1)}
                          >
                            Next
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
