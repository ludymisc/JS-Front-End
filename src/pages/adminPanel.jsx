import { useState, useEffect } from "react"
import UploadModal from "../components/uploadModal"

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/api/items")
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Panel</h1>

      <button onClick={() => setIsOpen(true)}>
        + Add Product
      </button>

      {isOpen && <UploadModal setIsOpen={setIsOpen} />}

      <hr />

      <h2>Product List</h2>

      {items.map(item => (
        <div key={item.id} style={{ marginBottom: 10 }}>
          <img src={item.image_url} width={80} />
          <div>{item.name}</div>
          <div>Rp {item.harga_normal}</div>
        </div>
      ))}
    </div>
  )
}