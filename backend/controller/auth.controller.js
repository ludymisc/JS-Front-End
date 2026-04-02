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
 **/}
import { Router } from "express";
import sql from '../db/supabase.js'
import multer from 'multer'
import supabase from '../db/storage.js'
import bcrypt from 'bcrypt'
import authMiddleware from '../middleware/user.middleware.js'
import crypto from 'crypto'

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

    //ini untuk sign in supabase account email yang sudah di daftarkan sebagai authenticator
    const {data, error} = await supabase.auth.signInWithPassword({
    email: username,
    password: password
    })
    console.log(error)
    console.log("USER:", data)
    
    res.status(200).json({ 
      //data di parse dari hasil auth supabase
      message: "Login Berhasil",
      id: data.user.id, 
      username: data.user.email,
      token: data.session.access_token, // access token untuk Authorization header
      refresh_token: data.session.refresh_token, // return refresh token so frontend can set session
      admin: true 
    });
  } catch (error) {
    res.status(500).json({ message: "server error" })
  }
})

router.post('/add-product', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    //kalo headersnya "authorization", maka akan di split menjadi judul header dan isi header yang dipisah dengan space
    const token = req.headers.authorization?.split(" ")[1] 
    const { data: { user } } = await supabase.auth.getUser(token);
    const file = req.file

    // Map Supabase auth user to local admins table to get the correct admin id
    // variabel adminRows berisi query manual sql untuk mendapatkan id user dari tabel admins
    const adminRows = await sql`
      SELECT id, slug FROM admins 
      WHERE username=${user?.email}`

    //admin_id di dapatkan dari adminRows dengan length minimal 1, di ambil index row pertama (index 0)
    //jika length 0 maka return null
    const admins_id = adminRows?.length ? adminRows[0].id : null
    const slug = adminRows?.length ? adminRows[0].slug : null

    //variabel name, price, is_diskon, dan harga_diskon didapatkan dari input user pada body request
    const { name, price, is_diskon, harga_diskon } = req.body

    if (!file) {
      return res.status(400).json({ message: "File is required" })
    } else if(!admins_id) {
      return res.status(400).json({ message: "kamu admin mana? kok idnya gaada"})
    }
    const fileExt = file.originalname.split('.').pop()
    const fileName = `${crypto.randomUUID()}.${fileExt}`
    const parsedPrice = Number(price)
    const isDiskonBool = is_diskon === "true"
    const parsedHargaDiskon = isDiskonBool ? Number(harga_diskon) : null

    //variabel uploadResult isinya mengirim input gambar dari user ke storage
    const uploadResult = await supabase.storage
      .from('producta')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false
      });

    if (uploadResult.error) {
      return res.status(500).json(uploadResult.error)
    }

    // use the uploaded filename to build/get the public url
    // Kenapa pakai { data: urlData }? 
    // Karena nama variabel "data" sudah dipakai di baris atas untuk proses upload.
    // Jadi kita "alias-kan" atau ganti nama simpanannya menjadi "urlData" agar tidak bentrok.
    const { data: urlData } = supabase.storage
      .from('producta')
      .getPublicUrl(fileName);
    const publicUrl = urlData.publicUrl;

    if (isDiskonBool && !harga_diskon) {
      return res.status(400).json({ message: "Harga diskon wajib diisi" })
    }

    const result = await sql`
      INSERT INTO items (nama, harga_normal, image_url, is_diskon, harga_diskon, admins_id, updated_at, created_at)
      VALUES (${name}, ${parsedPrice}, ${publicUrl}, ${isDiskonBool}, ${parsedHargaDiskon}, ${admins_id}, NOW(), NOW())
      RETURNING *
    `

    res.status(200).json({ message: "done", data: result })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "cek log" })
  }
})

router.post('/restaurant/:slug/:table_num', async(req, res) => {
  const { slug, table_num } = req.params
  try {
    const fetchItems = await sql`
        select i.*
        from items as i
        join admins as a on a.id = i.admins_id
        where a.slug = ${slug}; `
    
    if (!slug) {
      res.status(404).json({ message: "resto tidak ditemukan, periksa slug" })
    }

    res.status(200).json({ table: table_num, items: fetchItems})
  } catch (err) {
    res.status(500).json({ messsage: "server error, cek log" })
    console.error(err)
  }
})


export default router