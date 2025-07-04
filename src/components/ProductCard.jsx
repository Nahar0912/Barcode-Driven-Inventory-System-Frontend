import { useDrag } from 'react-dnd'

function ProductCard({ product }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PRODUCT',
    item: { ...product },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  return (
    <div
      ref={drag}
      className={`p-3 mb-2 border rounded bg-gray-50 cursor-move ${isDragging ? 'opacity-50' : ''}`}
    >
      <h4 className="font-semibold">{product.product_name}</h4>
      <p className="text-sm">Price: {product.price}</p>
      {product.image_url && <img src={product.image_url} alt={product.product_name} className="w-20 h-20 object-cover mt-2" />}
    </div>
  )
}

export default ProductCard
