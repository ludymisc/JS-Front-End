import dotenv from 'dotenv'
import postgres from 'postgres'

dotenv.config({ path:"../../.env"})

const sql = postgres(process.env.DATABASE_URL)

export default sql