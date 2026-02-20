// import pool from "../db/supabase.js";
import { Router } from "express";
import sql from '../db/supabase.js'


const router = Router();
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