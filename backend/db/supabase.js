import dotenv from 'dotenv'
import pg from 'pg'
import postgres from 'postgres'

dotenv.config({ path: '../.env' })

const connectionString = process.env.DATABASE_URL
const sql = postgres(connectionString)


export default sql
