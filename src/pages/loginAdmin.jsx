import {
    useState,
    useContext
} from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/adminComponent/auth.context';
import { supabase } from '../lib/supabaseClient';

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)

    const handleLogin = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch("http://localhost:3000/api/login", {
                method: 'POST',
                headers: {
                    'Content-Type':"application/json"
                },

                body: JSON.stringify({ username, password })
            })
        
            const data = await response.json()

            localStorage.setItem("token", data.token)

            // set supabase client session with both access and refresh tokens
            await supabase.auth.setSession({
                access_token: data.token,
                refresh_token: data.refresh_token
            })

            if (!response.ok) {
            console.log("LOGIN ERROR:", data.message)
            return
            }

            if (response.ok) {
                // simpan user info di localStorage
                localStorage.setItem('user_id', data.id);
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                console.log('FULL LOGIN RESPONSE:', data);
                login()
                navigate('/admin');
            }
        } catch (err) {
            console.error(err)
            console.log("server error")
        }
    }
    return (
      <div className='border border-black h-screen'>
            <div className='w-screen h-full flex items-center justify-center gap-5'>
                <div className="bg-[#16476A] p-6 rounded-lg shadow-lg w-80">
                    <h2 className="text-2xl font-bold mb-4 text-center text-white">Login</h2>

                    <form onSubmit={handleLogin} className="flex flex-col gap-3">
                    <input
                        className="border p-2 rounded"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <input
                        className="border p-2 rounded"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                    <button className="bg-[#132440] text-white py-2 rounded">
                        login
                    </button>
                    </form>

                    <p className="mt-3 text-sm text-center text-white mx-2">
                        Belum punya akun?
                        <a className="text-[#BF092F] hover:text-red-500 hover:underline" href="/register">Register</a>
                    </p>
                    </div>
            </div>
        </div>
    )
}