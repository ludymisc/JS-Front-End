import dotenv from 'dotenv'
import supabase from '../db/storage.js';

dotenv.config({ path : '../../.env' })

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const raw = authHeader?.split(" ")[1];
  let token = raw

  // Defensive: sometimes a session object or JSON string is sent instead of the raw access_token
  if (raw && typeof raw === 'string' && (raw.trim().startsWith('{') || raw.includes('access_token'))) {
    try {
      const parsed = JSON.parse(raw)
      token = parsed?.access_token || parsed?.session?.access_token || token
    } catch (e) {
      // ignore parse error, keep raw
    }
  }

  // Log token diagnostics for easier debugging (trim for safety)
  try {
    const segs = (typeof token === 'string') ? token.split('.') : []
    console.log('AUTH TOKEN DIAG: type=', typeof token, 'segments=', segs.length)
  } catch (e) {
    console.log('AUTH TOKEN DIAG: could not inspect token', e?.message)
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
