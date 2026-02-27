import bcrypt from "bcrypt"
import sql from "../db/supabase.js"

async function createAdmin() {
  const username = "tony"
  const password = "superrahasia"

  const hash = await bcrypt.hash(password, 10)

  await sql`
    INSERT INTO admins (username, password_hash)
    VALUES (${username}, ${hash})
  `

  console.log("Admin created")
  process.exit()
}

createAdmin()