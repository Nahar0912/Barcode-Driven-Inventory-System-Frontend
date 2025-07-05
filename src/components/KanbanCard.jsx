import React from 'react';

const KanbanCard = React.memo(({ product, provided, onDeleteProduct }) => (
  <div
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    className="border-b border-gray-300 p-2 hover:bg-gray-50 transition-all duration-200 ease-in-out cursor-move text-sm"
  >
    <h4 className="font-bold mb-1 truncate">{product.description}</h4>
    <p className="text-gray-600 truncate">Material: {product.material}</p>
    <p className="text-gray-400 truncate">Barcode: {product.barcode}</p>
    <button
      className="btn btn-error btn-xs mt-1 btn-outline"
      onClick={() => onDeleteProduct(product._id)}
    >
      Delete
    </button>
  </div>
));

export default KanbanCard;
