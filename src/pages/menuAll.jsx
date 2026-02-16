import '../index.css' 
//Import file CSS global supaya styling (warna, font, dll) bisa dipake di component ini
import items from '../data/items.json' 
// Import data dummy dari file JSON (sementara belum pakai database)
import { // Import hooks React:
  useContext, // - useContext untuk mengakses state global dari Context
  useState } // - useState untuk mengelola state lokal
  from "react"; 

import { CartContext } from '../components/cartContext'; //ngambil fungsi cartContext
import { Link } from 'react-router-dom' //mirip anchor, tapi gak refresh page (preventDefault)


export default function AllMenu({ search }) { //fungsi AllMenu dengan props search untuk fungsionalitas search bar dari navbar
    const [quantity, setQuantity] = useState(1); 
    //state kuantitas item yang akan di tambahkan ke chart. 
    //quantity = jumlah item yang mau dibeli default = 1
    //setQuantity = cara update nilainya
    const [selectedItem, setSelectedItem] = useState(null); 
    //state item yang dipilih. 
    //selectedItem = item yang lagi dipilih
    //default/state awal = null (belum ada yang dipilih)

    const { handleAddToCart } = useContext(CartContext);
    //ini apaan jir
    //Ambil function handleAddToCart dari global cart context.
    let filteredProducts = items.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase()))
    // Loop semua item 
    // Ambil item yang namanya mengandung keyword search
    // Case insensitive (pakai toLowerCase)
    
    return(
    <section className="px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 border border-black">
        <h2 className="text-2xl font-bold text-primary border border-black">
          CHECK OUT ALL OUR MENU
        </h2>

        <div className="flex-1 h-[2px] bg-primary border border-black"></div>

        <Link 
            to="/" 
            className="ml-auto text-sm font-semibold text-primary hover:underline" > 
            <span
            className='text-md'
            >Back</span>
        </Link>

      </div>

      {/* Produk */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 border border-black">
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
            {item.isSale ? ( //kondisional value data
            //kalo isSale true, maka akan begini di card
                <> 
                <p className="text-gray-500 line-through">Rp. {item.price.toLocaleString()}</p>
                <p className="text-red-600 font-boldi">Rp. {item.newPrice.toLocaleString()}</p>
                </>
            ) : (
              //kalo false, begini
                <p className="text-black font-bold">Rp.{item.price.toLocaleString()}</p>
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
        {selectedItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 relative">

            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setSelectedItem(null)}
            >
              ✕
            </button>

            <h3 className="text-lg font-bold mb-4">
              {selectedItem.name}
            </h3>

            {/* Quantity Control */}
            <div className="flex items-center gap-2 mb-4">
              <button
                className="px-3 py-1 border"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              >
                -
              </button>

              <input
                type="number"
                value={quantity}
                min="1"
                className="w-16 text-center border"
                onChange={(e) => setQuantity(Number(e.target.value))}
              />

              <button
                className="px-3 py-1 border"
                onClick={() => setQuantity(prev => prev + 1)}
              >
                +
              </button>
            </div>

            <button
              className="w-full bg-primary text-white py-2 rounded-md"
              onClick={() => {
                handleAddToCart(selectedItem, quantity);
                setSelectedItem(null);
                alert("Berhasil ditambahkan ke cart!");
              }}
            >
              Confirm
            </button>

          </div>
        </div>
      )}
      </div>
    </section>
    )

}