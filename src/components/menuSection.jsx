import '../index.css'
import items from '../data/items.json'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import QuantityModal from './quantityModal'
import { CartContext } from './cartContext'

export default function Menu({ search, limit }) {
  const [selectedItem, setSelectedItem] = useState(null); 
  //state item yang dipilih. 
  //selectedItem = item yang lagi dipilih
  //default/state awal = null (belum ada yang dipilih)
  const { handleAddToCart } = useContext(CartContext);
  //ini apaan jir
  //Ambil function handleAddToCart dari global cart context.
  let filteredProducts = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )
  if (limit) {
    filteredProducts = filteredProducts.slice(0, limit)
  }
  return (
    <section className="px-6 py-8">

      {/* Header */}
      <div className="flex items-center gap-4 mb-6 border border-black">
        <h2 className="text-2xl font-bold text-primary border border-black">
          MENU
        </h2>

        <div className="flex-1 h-[2px] bg-primary border border-black"></div>

        <Link 
            to="/Menus" 
            className="ml-auto text-sm font-semibold text-primary hover:underline" > 
            <span
            className='text-md'
            >View All</span>
        </Link>

      </div>

      {/* Produk */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 border border-black">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow rounded-lg p-4 border w-full"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />

            <h3 className="text-lg font-semibold mb-1">
              {item.name}
            </h3>

            <p className="text-gray-500 mb-2">
              {item.category}
            </p>

            <div className="flex items-center gap-2 mb-2">
            {item.isSale ? (
                <>
                <p className="text-gray-500 line-through">Rp. {item.price.toLocaleString()}</p>
                <p className="text-red-600 font-boldi">Rp. {item.newPrice.toLocaleString()}</p>
                </>
            ) : (
                <p className="text-black font-bold">Rp.{item.price.toLocaleString()}</p>
            )}
            </div>

            <button 
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80"
            onClick={() => setSelectedItem(item)}>
              Add to Cart
            </button>
          </div>
        ))}
        <QuantityModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onConfirm={(item, qty) => handleAddToCart(item, qty)} />
      </div>

    </section>
  )
}
