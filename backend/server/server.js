import dotenv from "dotenv";
import express from "express";
import productRoutes from '../controller/controller.products.js'

dotenv.config({ path: '../.env' })
 
const app = express();

app.use(express.json())
app.use('/api', productRoutes)

app.listen(3000, () => {
    console.log("server listen on port 3000")
    console.log(process.env.DB_URL)
})

app.get('/test', (req, res) => {
    res.status(200).json({ message: "server running, ready to serve."})
})