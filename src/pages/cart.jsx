import "../index.css"
import { useContext, useState } from "react";
import { CartContext } from "../components/cartContext";
import { Link } from 'react-router-dom'
import ConfirmModal from "../components/deleteModal";


export default function Cart() {
    //const [isEditing, setIsEditing] = useState(false)
    const { cart, removeFromCart } = useContext(CartContext);
    // Mengambil data cart dan fungsi removeFromCart dari CartContext
    // useContext digunakan untuk mengakses state dan function global
    // yang disediakan oleh CartContext

    // State untuk mengontrol apakah modal / dropdown terbuka
    const [ isOpen, setIsOpen ] = useState(false)
    // State untuk menyimpan ID item yang sedang dipilih
    const [ isSelectedId, setIsSelectedId ] = useState(null)
    
    // Menghitung total keseluruhan harga di dalam cart
    // Dengan menjumlahkan (price × quantity) setiap item
    const grandTotal = cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    return(
    <div className="cart-page px-6 py-8">
      <div className="flex items-center gap-4 mb-6 border border-black">

      <h2 className="text-2xl font-bold text-primary border border-black">Your Cart</h2>
      <div className="flex-1 h-[2px] bg-primary border border-black"></div>

        <Link 
            to="/" 
            className="ml-auto text-md font-semibold text-primary hover:underline" > 
            <span
            className='text-md'
            >Back</span>
        </Link>
      </div>


      {cart.length === 0 ? ( //ini if statement, pokokonya kalo cart array kosong, dia akan return string
        <p>Cart is empty</p>
      ) : (
        <> 
          {cart.map(item => ( //sebaliknya, kalo ada item, maka data item akan di mapping sesuai kebeutuhan
            <div key={item.id} className="cart-item">
              <div>
              <h3>{item.name}</h3>
              <p>Price: Rp {item.price.toLocaleString()}</p>
              <p>Qty: {item.quantity}</p>
              <p>
                Total: Rp {(item.price * item.quantity).toLocaleString()}
              </p>
              </div>
              <div className="flex flex-rows">
              <button className="bg-gray-400 p-2 mr-1 rounded-lg flex">edit</button>
              <button 
              className="bg-primary p-2 ml-1 rounded-lg flex"
              onClick={() => { //kalo di klik, selectedId akan terisi id item yang di klik
              setIsSelectedId(item.id) //dan modal akan terbuka
              setIsOpen(true)}}>
                delete
              </button>
              </div>
            </div>
          ))}

          <h3>
            Grand Total: Rp {grandTotal.toLocaleString()}
          </h3>
        </>
      )}
      <ConfirmModal 
      item={cart.find(i => i.id === isSelectedId)} //nyari item id dari array cart yang sama dengan selectedItem
      isOpen={isOpen} //state harus true agar modal muncul
      onConfirm={() => { //onConfirm ada di file confirm model, cek aja. 
        removeFromCart(isSelectedId) //kalo di klik, remove from cart berjalan, dan state di tutup, selected item di nuke
        setIsOpen(false)
        setIsSelectedId(null)
      }}
      onCancel={() => { //kalo di klik, cuma nutup modal dan nuke selectedId
        setIsOpen(false)
        setIsSelectedId(null)
      }}
    />
    </div>
  );
    
}

