import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const KanbanBoard = ({ products, categories, onCategoryChange, onDeleteProduct }) => {
  const getProductsByCategory = (category) =>
    products.filter(product => product.category === category);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const productId = result.draggableId;
    const newCategory = result.destination.droppableId;

    onCategoryChange(productId, newCategory);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="overflow-x-auto">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${categories.length}, minmax(250px, 1fr))`,
            border: '1px solid #ddd'
          }}
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
          {categories.map(category => (
            <Droppable droppableId={category} key={category}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="min-h-[400px] p-2 border border-gray-300"
                >
                  {getProductsByCategory(category).map((product, index) => (
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
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
