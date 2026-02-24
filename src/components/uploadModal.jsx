import { useState } from "react"

export default function UploadModal({ setIsOpen }) {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [file, setFile] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", name)
    formData.append("price", price)
    formData.append("file", file)

    const res = await fetch("http://localhost:3000/api/add-product", {
      method: "POST",
      body: formData
    })

    const result = await res.json()
    console.log(result)

    const text = await res.text()
    console.log(text)

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

        <button type="submit">Upload</button>
        <button onClick={() => setIsOpen(false)}>close</button>
      </form>
    </div>
  )
}