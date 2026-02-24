// import pool from "../db/supabase.js";
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