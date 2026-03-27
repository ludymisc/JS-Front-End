import bcrypt from "bcrypt"
import sql from "../db/supabase.js"
import crypto from 'crypto'

async function createAdmin() {
  const uuid = "79d78042-5914-4779-888c-d7ce51eda8e6"
  const username = "a@a.com"
  const password = "radatuli"
  const id = uuid
  const baseSlug = username
    .toLocaleLowerCase()
    .trim()
    .replace(/\s+/g,"-")
    .replace(/[^\w\-]+/g,"")

  const uniqueId = crypto.randomBytes(3).toString("hex")
  const slug = `${baseSlug}-${uniqueId}`

  const hash = await bcrypt.hash(password, 10)

  await sql`
    INSERT INTO admins (id, username, slug, password_hash)
    VALUES (${id}, ${username}, ${slug}, ${hash})
  `

  console.log("Admin created")
  process.exit()
}

createAdmin()