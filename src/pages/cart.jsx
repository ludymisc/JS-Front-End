import "../index.css"
import { useContext, useState } from "react";
import { CartContext } from "../components/cartContext";
import { Link } from 'react-router-dom'


export default function Cart() {
    //const [isEditing, setIsEditing] = useState(false)
    const { cart, removeFromCart } = useContext(CartContext);
    console.log("Cart sekarang:", cart);

    
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


      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
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
              onClick={() => removeFromCart(item.id)}>
                delete</button>
              </div>
            </div>
          ))}

          <h3>
            Grand Total: Rp {grandTotal.toLocaleString()}
          </h3>
        </>
      )}
    </div>
  );
    
}
