import Navbar from "./components/nav"
import Promo from "./components/promoSection"
import Menu from "./components/menuSection"
import { Route, Routes, useLocation } from "react-router-dom"
import { useState } from "react"
import AllMenu from "./pages/menuAll"
import AllPromo from "./pages/promoAll"
import Cart from "./pages/cart"
import UploadTest from "../backend/controller/uploadfrom"
import UploadModal from "./components/adminComponent/uploadModal"
import ProtectedRoute from "./components/adminComponent/adminChecker"
import AdminPanel from "./pages/adminPanel"
import LoginPage from "./pages/loginAdmin"
import Layout from "./pages/layoutTest"
import Sidebar from "./components/sidebar"

export default function App() {
  const [search, setSearch] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isAuthPage = location.pathname === "/login";
  const isDashboard = location.pathname.startsWith("/admin") || 
                      location.pathname === "/layout" || 
                      location.pathname.startsWith("/restaurant");

  // 1. Tentukan role di sini sebagai variabel
  const currentRole = location.pathname.startsWith("/admin") ? "admin" : "user";


  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR: Hanya muncul di rute Dashboard DAN hanya di layar LG (Desktop) */}
      {!isAuthPage && isDashboard && (
        <aside className="hidden lg:block w-64 fixed h-full bg-sub1 z-50">
          <Sidebar role={currentRole} search={search} setSearch={setSearch} />
        </aside>
      )}

      {/* CONTAINER KONTEN UTAMA */}
      <div className={`flex-1 flex flex-col ${!isAuthPage && isDashboard ? "lg:pl-64" : ""}`}>

        {/* NAVBAR: 
            - Muncul jika bukan halaman Auth.
            - Jika di halaman Dashboard, dia HANYA muncul di layar SM/MD (Mobile), 
              karena di LG sudah ada Sidebar. */}
        {!isAuthPage && isDashboard && (
          <div className={isDashboard ? "lg:hidden" : "block"}>
            <Navbar role={currentRole} search={search} setSearch={setSearch} />
          </div>
        )}

        {/* ROUTES: Isi konten dinamis kamu */}
        <main className="p-6">
          <Routes>
            <Route
              path="/restaurant/:slug/:table_num"
              element={
                <>
                  <Promo search={search} limit={5} />
                  <Menu search={search} limit={10} />
                </>
              }
            />
            <Route path="/restaurant/:slug/:table_num/menus" element={<AllMenu search={search} />} />
            <Route path="/restaurant/:slug/:table_num/promos" element={<AllPromo search={search} />} />
            <Route path="/restaurant/:slug/:table_num/cart" element={<Cart />} />
            <Route path="/upload" element={<UploadTest />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/layout' search={search} setSearch={setSearch} element={<Layout />} />
          </Routes>
        </main>
      </div>
    </div>
     
  )
}
