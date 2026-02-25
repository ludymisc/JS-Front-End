{/**
 * Product Routes
 * ------------------------------------------------------------
 * Endpoint untuk melakukan operasi CRUD terkait produk.
 *
 * Saat ini tersedia:
 * POST /add-product
 *
 * Endpoint ini:
 * 1. Menerima request multipart/form-data
 * 2. Mengunggah file gambar ke Supabase Storage (bucket: "producta")
 * 3. Mengambil public URL dari file yang diupload
 * 4. Menyimpan data produk (name, price, image_url) ke database
 *
 * Dependencies:
 * - Express Router
 * - Multer (untuk parsing multipart/form-data)
 * - Supabase Storage (penyimpanan file)
 * - SQL client (query database)
 *
 * Expected Request:
 * - Body (form-data):
 *    - name  : string (nama produk)
 *    - price : number (harga produk)
 *    - file  : file (gambar produk)
 *
 * Response:
 * - 200 OK:
 *    {
 *      message: "done",
 *      data: <inserted product row>
 *    }
 *
 * - 400 Bad Request:
 *    Jika file tidak dikirim
 *
 * - 500 Internal Server Error:
 *    Jika gagal upload atau gagal insert database
 *
 * Catatan untuk future me:
 * - Bucket Supabase harus bernama "producta"
 * - Kolom database harus: name, price, image_url
 * - crypto.randomUUID() dipakai untuk menghindari filename collision
 */}
import { Router } from "express";
import sql from '../db/supabase.js'
import multer from 'multer'
import supabase from '../db/storage.js'

const router = Router();
const upload = multer()

router.post('/add-product', upload.single('file'), async (req, res) => {
  try {
    const file = req.file
    const { name, price } = req.body

    if (!file) {
      return res.status(400).json({ message: "File is required" })
    }

    const uploadResult = await supabase.storage
      .from('producta')
      .upload(`public/${crypto.randomUUID()}`, file.buffer)

    if (uploadResult.error) {
      return res.status(500).json(uploadResult.error)
    }

    const { publicUrl } = supabase.storage
      .from('producta')
      .getPublicUrl(uploadResult.data.path).data

    const result = await sql`
      INSERT INTO products (name, price, image_url)
      VALUES (${name}, ${price}, ${publicUrl})
      RETURNING *
    `

    res.status(200).json({ message: "done", data: result })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "cek log" })
  }
})

export default router