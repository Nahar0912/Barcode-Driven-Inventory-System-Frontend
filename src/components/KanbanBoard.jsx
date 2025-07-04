import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import KanbanCard from './KanbanCard';

const KanbanBoard = ({ products, categories, onCategoryChange, onDeleteProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState({});
  const productsPerPage = 7;

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
    <div className="p-2">
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by product name or category"
          className="input input-bordered w-64 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="overflow-x-auto">
          <div className="flex min-w-fit border border-gray-300">

            {categories.map(category => {
              const filteredProducts = getFilteredProductsByCategory(category);
              const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
              const page = currentPage[category] || 1;

              const columnWidth = categories.length > 4 ? 'w-64' : 'flex-1';

              return (
                <div key={category} className={`flex flex-col border-l border-gray-300 ${columnWidth}`}>
                  <div className="text-center font-bold text-blue-800 py-2 border-b border-gray-300 bg-gray-100 text-lg">
                    {category} <span className="ml-1 text-gray-500">({filteredProducts.length})</span>
                  </div>

                  <Droppable droppableId={category}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="min-h-[300px] flex flex-col"
                      >
                        {getCurrentPageProducts(category).map((product, index) => (
                          <Draggable key={product._id} draggableId={product._id} index={index}>
                            {(provided) => (
                              <KanbanCard
                                product={product}
                                provided={provided}
                                onDeleteProduct={onDeleteProduct}
                              />
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}

                        {totalPages > 1 && (
                          <div className="flex justify-center mt-2 gap-1 flex-wrap p-2 border-t border-gray-300">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                              <button
                                key={pageNumber}
                                className={`btn btn-xs ${pageNumber === page ? 'btn-primary' : 'btn-ghost'}`}
                                onClick={() => handlePageChange(category, pageNumber)}
                              >
                                {pageNumber}
                              </button>
                            ))}
                            <button
                              className="btn btn-xs"
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
                </div>
              );
            })}

          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
