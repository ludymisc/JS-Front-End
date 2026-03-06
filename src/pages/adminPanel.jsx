import { useState, useEffect } from "react"
import UploadModal from '../components/adminComponent/uploadModal'
import { nukeProduct, fetchProducts } from "../service/adminPanelService"
import Loading from "../components/loading"
import { useContext } from "react"
import { AuthContext } from "../components/adminComponent/auth.context"

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const {logout} = useContext(AuthContext)

  const handleLogOut = () => {logout()}

  useEffect(() => {
    fetchProduct()
  }, [])

  async function fetchProduct() {
  setLoading(true)

  try {
    const data = await fetchProducts()
    setItems(data)
  } catch (error) {
    console.error(error)
  }

  setLoading(false)
}

async function nukeTable() {
  try {
    await nukeProduct()
    fetchProduct()
  } catch (error) {
    console.error(error)
  }
}


  const filteredProducts = items.filter((item) => 
    item.nama.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Panel</h1>


      <button onClick={() => setIsOpen(true)}>
        + Add Product
      </button>
      <button onClick={nukeTable} className="mx-4">
        NUKE!
      </button>
      <button onClick={handleLogOut}>
        Log Out
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