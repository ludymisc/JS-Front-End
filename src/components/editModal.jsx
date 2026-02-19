import { useState } from "react";

export default function EditModal({ item, onClose,onConfirm }) {
    const [ quantity, setQuntity ] = useState(1);

    if (!item) return null;

    return(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-80 relative">

                <button
                className="absolute top-2 right-2 border border-black"
                onClick={onClose}>
                    X
                </button>

                <h3 
                className="text-lg text-black font-bold mb-4 border border-black">
                    {item.name}
                </h3>

                <div 
                className="flex items-center gap-2 mb-4 border border-black">
                    <button
                    className="px-3 py-1 border border border-black"
                    onClick={() => setQuntity(q => Math.max(1, q - 1))}>
                        -
                    </button>

                    <input
                    type="number"
                    value={quantity}
                    min="1"
                    className="w-16 text-center border border border-black"
                    onChange={(e) => setQuntity(Math.max(Number(e.target.value)))}/>

                    <button
                    className="px-3 py-1 border border border-black"
                    onClick={() => setQuntity(q => Math.max(1, q + 1))}>
                        +
                    </button>

                </div>
                     <button
                    className="w-full bg-primary text-white py-2 rounded-md"
                    onClick={() => {
                        onConfirm(item, quantity);
                        onClose();
                        }}>
                    Confirm
                    </button>      
            </div>
        </div>
    )
}