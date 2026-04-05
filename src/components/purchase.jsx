import { useState } from "react";
import PaymentModal from "./paymentStatus";

export default function PurchaseModal({ onClose, onConfirm }) {
    const [isPurchase, setIsPurchase] = useState(false);

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white px-12 pt-4 pb-10 rounded-lg w-80 relative">
                <button
                    className="absolute top-2 right-2"
                    onClick={onClose}>
                    X
                </button>

                <h3 className="text-lg text-black font-bold">
                    Total harga : harga barang
                </h3>

                <button
                    className="bg-primary absolute bottom-2 mx-auto p-2 rounded-md "
                    onClick={() => {
                        setIsPurchase(true)
                    }}>
                    bayar
                </button>
            </div>

            {isPurchase && (
                <PaymentModal
                    onClose={() => {
                        setIsPurchase(false);
                    }}
                    onConfirm={() => {
                        setIsPurchase(false);
                        onConfirm();
                    }}

                />
            )}
        </div>
    )
}