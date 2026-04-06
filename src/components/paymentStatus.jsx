import { useState, useEffect } from "react";

export default function PaymentModal({ onClose }) {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState(null);
    const [errorData, setErrorData] = useState(""); 

    useEffect(() => {
        const processPayment = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1500));

            const isSuccess = Math.random() < 0.5;

            if (isSuccess) {
                setStatus("sukses")
            } else {
                try {
                    const response = await fetch("https://naas.isalman.dev/no");
                    if (!response.ok) throw new Error("API Error");

                    const data = await response.json();
                    console.log(data)
                    
                    setErrorData(data.reason || "Unknown Error"); 
                    setStatus("gagal");
                } catch (err) {
                    setErrorData("999"); 
                    setStatus("gagal");
                }
            }
        };

        processPayment();
    }, []);

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white px-12 pt-4 pb-10 rounded-lg w-80 relative">
                <button
                    className="absolute top-2 right-2"
                    onClick={onClose}>
                    X
                </button>

                {/* 1. Tampilan Loading */}
                {status === null && (
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
                        <p className="font-semibold text-gray-600">Memproses Pembayaran...</p>
                    </div>
                )}

                {/* 2. Tampilan Sukses */}
                {status === "sukses" && (
                    <div className="animate-bounce-in">
                        <div className="text-5xl mb-4"></div>
                        <h3 className="text-3xl text-green-600 font-bold mb-2">
                            pembayaran berhasil!
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">barang siap dikirim.</p>
                        <button 
                            className="bg-green-500 text-white px-6 py-2 rounded-md w-full"
                            onClick={onClose}>
                            Mantap
                        </button>
                    </div>
                )}

                {/* 3. Tampilan Gagal */}
                {status === "gagal" && (
                    <div className="animate-shake">
                        <div className="text-5xl mb-4"></div>
                        <h3 className="text-3xl text-red-600 font-bold mb-2">
                            pembayaran gagal
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">reason : {errorData}</p>
                        <button 
                            className="bg-red-500 text-white px-6 py-2 rounded-md w-full"
                            onClick={onClose}>
                            Coba Lagi
                        </button>
                    </div>
                )}

            </div>

            {isOpen && (
                <PurchaseStatus
                    onClose={() => {
                        setIsOpen(false);
                    }}

                />
            )}
        </div>
    )
}