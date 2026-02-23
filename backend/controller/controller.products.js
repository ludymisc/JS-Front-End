// import pool from "../db/supabase.js";
import { Router } from "express";
import sql from '../db/supabase.js'
import multer from 'multer'
import supabase from '../db/storage.js'

const router = Router();
const upload = multer()

router.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file

  const { data, error } = await supabase.storage
    .from('producta')
    .upload(`public/${file.originalname}`, file.buffer)

  if (error) return res.status(500).json(error)

  res.json({ success: true })
})

router.post('/add-product', async (req, res) => {
    
    try{
        const {name, price} = req.body

        const result = await sql`
      INSERT INTO products (name, price)
      VALUES (${name}, ${price})
      RETURNING *
    `
        

        res.status(200).json({ message: "done", data: result })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "cek log" })
    }
})

export default router