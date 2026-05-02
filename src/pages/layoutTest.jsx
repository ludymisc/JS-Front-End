import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Loading from "../components/loading";
import Sidebar from "../components/sidebar";

export default function ManageProduct() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [file, setFile] = useState(null)
    const [isDiskon, setIsDiskon] = useState(false)
    const [hargaDiskon, setHargaDiskon] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (isDiskon && !hargaDiskon) {
    alert("Harga diskon wajib diisi")
    return}

    const formData = new FormData()
    formData.append("name", name)
    formData.append("price", price)
    formData.append("file", file)
    formData.append("is_diskon", isDiskon)
    formData.append("harga_diskon", hargaDiskon)

    setLoading(true)

    // get current supabase session and access token
    // 🔑 1. Ambil "Kunci Akses" (Session) yang sedang aktif di browser saat ini.
    // Kita butuh Access Token asli dari Supabase supaya Server percaya dan 
    // mengizinkan kita upload gambar ke Storage.
    const { data } = await supabase.auth.getSession()
    const token = data?.session?.access_token

    // 🚫 2. Pengecekan Keamanan: Jika kuncinya tidak ada (null/undefined), 
    // kita hentikan prosesnya di sini sebelum membuang-buang resource server.
    if (!token) {
        // Matikan loading supaya tombol 'Upload' bisa diklik lagi setelah User baca alert.
        setLoading(false)
        alert("Not authenticated. Please sign in as admin before uploading.")
        return
    }

    const res = await fetch("http://localhost:3000/api/add-product", {
        method: "POST",
        headers: {
        Authorization: `Bearer ${token}`
    },
        body: formData
    })

    const result = await res.json()
    console.log(result)

    setLoading(false)
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Panggil Komponen Sidebar */}
            <Sidebar />

            {/* Area Konten Utama */}
            <main className="flex-1 lg: p-8">
            <form onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold">Tambahkan Produk</h1>
                <p className="text-gray-600 mt-2">Ini adalah page untuk menambahkan produk.</p>
                
                {/* Contoh Card Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="">
                        <div className="bg-white shadow rounded-lg border border-primary pl-2 px-6">
                            <p className="text-xl font-bold">
                                Nama Produk
                            </p>
                            <input 
                            type="text"
                            placeholder="Masukkan Nama Produk"
                            className="my-2 border border-gray-400 rounded-md"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="bg-white shadow rounded-lg border border-primary pl-2 px-6 mt-6">
                            <p className="text-xl font-bold">
                                Harga Produk
                            </p>
                            <input 
                            type="number"
                            placeholder="Masukkan Harga Produk"
                            className="my-2 border border-gray-400 rounded-md"
                            onChange={(e) => setPrice(e.target.value)}
                            />
                            <label>

                            <br />
                            <p className="text-gray-700 mb-2">
                                set Status Harga Barang
                            </p>
                            <input
                                type="checkbox"
                                checked={isDiskon}
                                onChange={ (e) =>{
                                    !(e.target.checked)?
                                    setHargaDiskon(""):setIsDiskon(e.target.checked)
                                }
                                }
                            />
                            Diskon?
                            </label>

                            {isDiskon && (
                            <input
                                type="number"
                                value={hargaDiskon}
                                placeholder="harga after diskon"
                                onChange={(e) => setHargaDiskon(e.target.value)}
                                required
                            />
                            )}
                    </div>
                        

                    </div>
                    <div>
                        <div className="bg-white pl-2 px-6 shadow rounded-lg border border-primary">
                            <p className="font-bold text-xl mx">
                                Gambar Produk
                            </p>
                            <input
                                type="file"
                                className="my-2"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                        {loading && <Loading text="Uploading product..." />}
                        <div className="bg-white mt-9">
                            <button 
                            className="bg-primary rounded-lg text-white p-2"
                            type="submit">
                                Submit
                            </button>
                            <button className="bg-gray-500 rounded-lg text-white p-2 mx-5">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            </main>
        </div>
    );
}