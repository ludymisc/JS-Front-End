import { useState, useEffect } from "react"
import UploadModal from "../components/uploadModal"
import { createClient } from '@supabase/supabase-js'
import Loading from "../components/loading"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProduct()
  }, [])

  async function fetchProduct() {
    setLoading(true)

    const { data, error } = await supabase
    .from("items")
    .select("*")

    if (error) {
        console.error(error)
    }
    setItems(data)
    setLoading(false)
  }

  const filteredProducts = items.filter((item) => 
    item.nama.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Panel</h1>


      <button onClick={() => setIsOpen(true)}>
        + Add Product
      </button>

      {isOpen && (
        <UploadModal 
          setIsOpen={setIsOpen} 
          refreshProduct={fetchProduct}
        />
        )}

      <hr />

      <h2>Product List</h2>
        {loading ? (
          <Loading text="fetching products..."/>
          ) : (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 border border-black">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow rounded-lg p-4 border w-full"
          >
            <img
            // src="https://csjpyparbnsjjqkhdewq.supabase.co/storage/v1/object/public/producta/619cf185-16c1-4b3a-b02f-ab1a9b546116.PNG"
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
                  <p className="text-gray-500 line-through">
                    Rp. {item.harga_normal.toLocaleString()}
                  </p>
                  <p className="text-red-600 font-bold">
                    Rp. {item.harga_diskon.toLocaleString()}
                  </p>
                </>
              ) : (
                <p className="text-black font-bold">
                  Rp. {item.harga_normal.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
          )}
    </div>
  )
}