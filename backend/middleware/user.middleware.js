import dotenv from 'dotenv'
import supabase from '../db/storage.js';

dotenv.config({ path : '../../.env' })

async function authMiddleware(req, res, next) {
// 1. Ambil isi "surat izin" (header) yang bernama 'authorization' dari kiriman client
const authHeader = req.headers.authorization;

// 2. Gunakan teknik 'split' untuk membuang kata "Bearer" dan mengambil kode rahasianya saja.
// Simbol ?. (Optional Chaining) menjaga agar aplikasi tidak crash jika header-nya kosong.
const raw = authHeader?.split(" ")[1];

// 3. Simpan kode rahasia yang sudah bersih tadi ke dalam variabel 'token' 
// agar siap digunakan untuk proses verifikasi identitas.
let token = raw;

// Defensive: sometimes a session object or JSON string is sent instead of the raw access_token
// 🔍 Pengecekan Keamanan: Kadang Frontend salah kirim "Bungkusan" (Objek JSON) 
// bukannya langsung "Kunci" (String Token).
if (raw && typeof raw === 'string' && (raw.trim().startsWith('{') || raw.includes('access_token'))) {
  try {
    // 📦 Jika isinya ternyata bungkusan JSON, kita bongkar dulu (Parse)
    const parsed = JSON.parse(raw);
    
    // 🔑 Kita cari letak kuncinya di berbagai kemungkinan tempat (Nested Object)
    // Bisa di 'access_token' langsung, atau di dalam 'session.access_token'
    token = parsed?.access_token || parsed?.session?.access_token || token;
  } catch (e) {
    // 🤫 Kalau gagal bongkar, ya sudah, kita tetap pakai data aslinya (raw)
  }
}

  // Log token diagnostics for easier debugging (trim for safety)
  // 🔍 Fitur Diagnostik: Untuk bantu ngecek token kalau ada error (tanpa ngebocorin isinya)
  try {
    // 🧩 Sebuah JWT (Token) yang sehat HARUS punya 3 bagian yang dipisah oleh titik (.)
    // Contoh: Header.Payload.Signature
    const segs = (typeof token === 'string') ? token.split('.') : [];
  
    // 📢 Tampilkan info di console: Apa tipe datanya? Dan ada berapa bagian (segments)?
    // Kalau segments = 3, berarti formatnya beneran JWT. Kalau cuma 1 atau 0, berarti bukan token.
    console.log('AUTH TOKEN DIAG: type=', typeof token, 'segments=', segs.length);
  } catch (e) {
    // 🤫 Kalau pengecekan ini gagal, jangan bikin aplikasi mati, cukup lapor aja
    console.log('AUTH TOKEN DIAG: could not inspect token', e?.message);
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      console.log("VERIFY ERROR:", error?.message, 'token=', typeof token === 'string' ? token.slice(0,60) : token)
      return res.status(401).json({ message: "Token tidak valid atau session berakhir" });
    }
  req.user = user; 
  next();
} catch (err) {
  console.error("MIDDLEWARE INTERNAL ERROR:", err);
  return res.status(401).json({ message: "Token tidak valid atau expired" })
}
} export default authMiddleware
