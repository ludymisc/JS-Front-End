import '../index.css' 
//Import file CSS global supaya styling (warna, font, dll) bisa dipake di component ini
import { // Import hooks React:
  useContext, useEffect, // - useContext untuk mengakses state global dari Context
  useState } // - useState untuk mengelola state lokal
  from "react"; 
import QuantityModal from '../components/quantityModal';
import { CartContext } from '../components/cartContext'; //ngambil fungsi cartContext
import { Link, useNavigate, useParams } from 'react-router-dom' //mirip anchor, tapi gak refresh page (preventDefault)
import { supabase } from '../lib/supabaseClient'

export default function AllMenu({ search }) { //fungsi AllMenu dengan props search untuk fungsionalitas search bar dari navbar
    const [quantity, setQuantity] = useState(1); 
    //state kuantitas item yang akan di tambahkan ke chart. 
    //quantity = jumlah item yang mau dibeli default = 1
    //setQuantity = cara update nilainya
    const [selectedItem, setSelectedItem] = useState(null); 
    //state item yang dipilih. 
    //selectedItem = item yang lagi dipilih
    //default/state awal = null (belum ada yang dipilih)
    const [items, setItems] = useState([])
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      fetchProduct()
    }, [ slug ])

    async function fetchProduct() {
      console.log("SLUG:", slug)
      const { data, error } = await supabase
      .from("items")
      .select("*, admins!inner(slug)") // join ke admins
      .eq("admins.slug", slug) 

      {error && (console.error(error))}
      setItems(data)
    }

    const { handleAddToCart } = useContext(CartContext);
    //ini apaan jir
    //Ambil function handleAddToCart dari global cart context.
    const filteredProducts = items.filter((item) =>
            item.nama.toLowerCase().includes(search.toLowerCase()))
    // Loop semua item 
    // Ambil item yang namanya mengandung keyword search
    // Case insensitive (pakai toLowerCase)
    
    return(
    <section className="px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6   ">
        <h2 className="text-2xl font-bold text-primary   ">
          CHECK OUT ALL OUR MENU
        </h2>

        <div className="flex-1 h-[2px] bg-primary   "></div>

        <button 
            onClick={() => navigate(-1)}
            className="ml-auto text-sm font-semibold text-primary hover:underline" > 
            <span
            className='text-md'
            >Back</span>
        </button>

      </div>

      {/* Produk */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2   ">
        {filteredProducts.map((item) => ( 
          //mapping item (dari dumy data) berdasarkan identitas
          // Ambil array filteredProducts
          // Loop satu per satu
          // Return JSX untuk tiap item
          // React render jadi list kartu produk
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
            {item.is_diskon ? ( //kondisional value data
            //kalo isSale true, maka akan begini di card
                <> 
                <p className="text-gray-500 line-through">Rp. {item.harga_normal.toLocaleString()}</p>
                <p className="text-red-600 font-boldi">Rp. {item.harga_diskon.toLocaleString()}</p>
                </>
            ) : (
              //kalo false, begini
                <p className="text-black font-bold">Rp.{item.harga_normal.toLocaleString()}</p>
            )}
            </div>

            <button 
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80"
            onClick={() => { //trigger saat tombol di klik
              setSelectedItem(item); //set item yang di pilih
              setQuantity(1); //buat nambahin/ngurangin item yang akan ditambahkan ke cart
            }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      <QuantityModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onConfirm={(item, qty) => handleAddToCart(item, qty)}
      />
      </div>
    </section>
    )

}