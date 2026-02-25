import { useState } from "react"

export default function UploadModal({ setIsOpen }) {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [file, setFile] = useState(null)
  const [isDiskon, setIsDiskon] = useState(false)
  const [hargaDiskon, setHargaDiskon] = useState("")

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

    const res = await fetch("http://localhost:3000/api/add-product", {
      method: "POST",
      body: formData
    })

    const result = await res.json()
    console.log(result)


    if (res.ok) {
        setIsOpen(false)
    }
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

        <button type="submit">Upload</button>
        <button onClick={() => setIsOpen(false)}>close</button>
      </form>
    </div>
  )
}