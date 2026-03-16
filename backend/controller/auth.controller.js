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
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config({ path: "../../.env"  })

const router = Router();
const upload = multer()

router.post('/login', async(req, res) => {
  try{
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "semua field wajib diisi" })
    }

    const result = await sql 
    `SELECT id, username, password_hash
    FROM admins WHERE username=${username}`
    

    if (result.length === 0) {
      return res.status(400).json({ message: "user tidak dapat ditemukan" })
    }

    const admin = result[0]
    const isPasswordTrue = await bcrypt.compare(password, admin.password_hash)

    if (!isPasswordTrue) {
      return res.status(400).json({ message: "password tidak cocok" })
    } 

    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username
      },
      process.env.JWT_SECRET,
      {
        expiresIn:"1h"
      }
    )
    
    res.status(200).json({ 
      message: "admin datank",
      id: admin.id,
      username: admin.username,
      token: token,
      admin: true })
  } catch (error) {
    res.status(500).json({ message: "server error" })
  }
})

router.post('/add-product', upload.single('file'), async (req, res) => {
  try {
    const file = req.file
    const admin_id = req.body.admin_id
    const { name, price, is_diskon, harga_diskon } = req.body

    if (!file) {
      return res.status(400).json({ message: "File is required" })
    } else if(!admin_id) {
      return res.status(400).json({ message: "kamu admin mana? kok idnya gaada"})
    }
    const fileExt = file.originalname.split('.').pop()
    const fileName = `${crypto.randomUUID()}.${fileExt}`

    const parsedPrice = Number(price)
    const isDiskonBool = is_diskon === "true"
    const parsedHargaDiskon = isDiskonBool ? Number(harga_diskon) : null

    const uploadResult = await supabase.storage
    .from('producta')
    .upload(fileName, file.buffer, {
      contentType: file.mimetype
    })

    if (uploadResult.error) {
      return res.status(500).json(uploadResult.error)
    }

    const { publicUrl } = supabase.storage
      .from('producta')
      .getPublicUrl(uploadResult.data.path).data

    if (isDiskonBool && !harga_diskon) {
      return res.status(400).json({ message: "Harga diskon wajib diisi" })
    }

    const result = await sql`
      INSERT INTO items (nama, harga_normal, image_url, is_diskon, harga_diskon, updated_at, created_at)
      VALUES (${name}, ${parsedPrice}, ${publicUrl}, ${isDiskonBool}, ${parsedHargaDiskon}, NOW(), NOW())
      RETURNING *
    `

    res.status(200).json({ message: "done", data: result })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "cek log" })
  }
})


export default router