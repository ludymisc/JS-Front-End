import "../index.css"
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/cartContext";
import { Link } from 'react-router-dom'
import ConfirmModal from "../components/deleteModal";
import EditModal from "../components/editModal";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Cart() {
  const { cart, removeFromCart, updateCartItem } = useContext(CartContext);

  const [modalType, setModalType] = useState(null);
  const [isSelectedId, setIsSelectedId] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct() {
    const { data, error } = await supabase
      .from("items")
      .select("*");

    if (error) {
      console.error(error);
    } else {
      setItems(data);
    }
  }

  // Hitung Grand Total dengan harga asli per item
  const grandTotal = cart.reduce((acc, cartItem) => {
    const product = items.find(p => p.id === cartItem.id);
    if (!product) return acc;

    const price = product.is_diskon
      ? product.hargadiskon
      : product.harga_normal;

    return acc + price * cartItem.quantity;
  }, 0);

  return (
    <div className="cart-page px-6 py-8">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-primary">Your Cart</h2>
        <div className="flex-1 h-[2px] bg-primary"></div>

        <Link 
          to="/" 
          className="ml-auto text-md font-semibold text-primary hover:underline"
        > 
          Back
        </Link>
      </div>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map(cartItem => {
            const product = items.find(p => p.id === cartItem.id);

            if (!product) return null;

              const rawPrice = product.is_diskon
              ? product.harga_diskon
              : product.harga_normal;

              const price = Number(rawPrice) || 0;

            return (
              <div key={cartItem.id} className="cart-item mb-4 border p-4 rounded">
                <div>
                  <h3>{product.nama}</h3>
                  <p>Price: Rp {price.toLocaleString()}</p>
                  <p>Qty: {cartItem.quantity}</p>
                  <p>
                    Total: Rp {(price * cartItem.quantity).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-2 mt-2">
                  <button 
                    className="bg-gray-400 p-2 rounded-lg"
                    onClick={() => {
                      setModalType("edit");
                      setIsSelectedId(cartItem.id);
                    }}
                  >
                    Edit
                  </button>

                  <button 
                    className="bg-primary p-2 rounded-lg text-white"
                    onClick={() => {
                      setIsSelectedId(cartItem.id);
                      setModalType("delete");
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}

          <h3 className="text-xl font-bold mt-6">
            Grand Total: Rp {grandTotal.toLocaleString()}
          </h3>
        </>
      )}

      {modalType === "delete" && (
        <ConfirmModal
          item={cart.find(i => i.id === isSelectedId)}
          onConfirm={() => {
            removeFromCart(isSelectedId);
            setModalType(null);
            setIsSelectedId(null);
          }}
          onCancel={() => {
            setModalType(null);
            setIsSelectedId(null);
          }}
        />
      )}

      {modalType === "edit" && (
        <EditModal
          item={cart.find(i => i.id === isSelectedId)}
          onClose={() => {
            setModalType(null);
            setIsSelectedId(null);
          }}
          onConfirm={(item, qty) => {
            updateCartItem(item.id, qty);
            setModalType(null);
            setIsSelectedId(null);
          }}
        />
      )}
    </div>
  );
}