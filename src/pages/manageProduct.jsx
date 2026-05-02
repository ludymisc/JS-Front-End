import { useState } from "react"
import Loading from "../components/loading"
import { supabase } from "../lib/supabaseClient"

export default function awikwok({ setIsOpen, refreshProduct}) {
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


    if (res.ok) {
        await refreshProduct()
        setIsOpen(false)
    }

    setLoading(false)
  }

  return (
    <div style={{ padding: 20, border: "1px solid #ccc" }}>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <br />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br />

        <label>
          <input
            type="checkbox"
            checked={isDiskon}
            onChange={(e) => {
            setIsDiskon(e.target.checked)
            if (!e.target.checked) {
              setHargaDiskon("")
            }
          }}
          />
          Diskon?
        </label>

        <br />

        {isDiskon && (
          <input
            type="number"
            value={hargaDiskon}
            placeholder="harga after diskon"
            onChange={(e) => setHargaDiskon(e.target.value)}
            required
          />
        )}

        <br />
        {loading && <Loading text="Uploading product..." />}

        <button type="submit">Upload</button>
        <button onClick={() => setIsOpen(false)}>close</button>
      </form>
    </div>
  )
}