import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
)

export default function UploadTest() {

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    console.log("Uploading:", file.name)

    const { data, error } = await supabase.storage
      .from('producta') // pastikan bucket namanya benar
      .upload(`public/${crypto.randomUUID()}`, file)

    if (error) {
      console.error("Upload error:", error)
      return
    }

    console.log("Success:", data)
  }

  return (
    <div>
      <h1>Upload Debug Page</h1>
      <input type="file" onChange={handleUpload} />
    </div>
  )
}