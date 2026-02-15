import "../index.css"
import { useContext } from "react";
import { CartContext } from "../components/cartContext";


export default function Cart() {
    const { cart } = useContext(CartContext);
    console.log("Cart sekarang:", cart);

    
    const grandTotal = cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    return(
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>Price: Rp {item.price.toLocaleString()}</p>
              <p>Qty: {item.quantity}</p>
              <p>
                Total: Rp {(item.price * item.quantity).toLocaleString()}
              </p>
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
