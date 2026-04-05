import '../index.css'
import { Link, useParams } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import QuantityModal from './quantityModal'
import { CartContext } from './cartContext'
import { supabase } from '../lib/supabaseClient'

export default function Promo({ search, limit }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([])
  const { handleAddToCart } = useContext(CartContext);
  const { slug, table_num } = useParams()

  useEffect(() => {
    fetchProduct()
  }, [ slug ])

    async function fetchProduct() {
    //   console.log("SLUG:", slug)
    //   const { data, error } = await supabase
    //   .from("items")
    //   .select("*, admins!inner(slug)") // join ke admins
    //   .eq("admins.slug", slug) 

    //   {error && (console.error(error))}
    //   setItems(data)
    // }

  const { data: admin } = await supabase
  .from("admins")
  .select("id")
  .eq("slug", slug)
  .single()

  const { data: items } = await supabase
  .from("items")
  .select("*")
  .eq("admins_id", admin.id) 
  setItems(items)}
  
  let filteredProducts = items.filter((item) =>
      item.is_diskon && item.nama.toLowerCase().includes(search.toLowerCase()))

  // if (limit) {
  //     filteredProducts = filteredProducts.slice(0, limit)
  // }

  {limit && (filteredProducts = filteredProducts.slice(0, limit))} //it is the same as if statement

  return (
    <section className="px-6 py-8">

      {/* Header */}
      <div className="flex items-center gap-4 mb-6  ">
        <h2 className="text-2xl font-bold text-primary  ">
          HOT PROMO
        </h2>

        <div className="flex-1 h-[2px] bg-primary  "></div>

        <Link 
            to={`/restaurant/${slug}/${table_num}/promos`}
            className="ml-auto text-sm font-semibold text-primary hover:underline" > 
            <span
            className='text-md'
            >View All</span>
        </Link>

      </div>

      {/* Produk */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2  ">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow rounded-lg p-4 border w-full"
          >
            <img
              src={item.image_url}
              alt={item.nama}
              className="w-full h-40 object-cover rounded-md mb-4"
            />

            <h3 className="text-lg font-semibold mb-1">
              {item.nama}
            </h3>

            <div className="flex items-center gap-2 mb-2">
            {item.is_diskon ? (
                <>
                <p className="text-gray-500 line-through">Rp. {item.harga_normal.toLocaleString()}</p>
                <p className="text-red-600 font-boldi">Rp. {item.harga_diskon.toLocaleString()}</p>
                </>
            ) : (
                <p className="text-black font-bold">Rp.{item.harga_normal.toLocaleString()}</p>
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
