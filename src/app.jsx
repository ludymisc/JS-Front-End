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

export default function App() {
    const [search, setSearch] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()

    const hideNavbar = location.pathname === "/login"
  return (
    <>
      {!hideNavbar && (
        <>
          <Navbar 
            search={search} 
            setSearch={setSearch}
            setIsOpen={setIsOpen} 
          />
          {isOpen && <UploadModal setIsOpen={setIsOpen}/>}
        </>
      )}
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Promo search={search} limit={5}/>
              <Menu search={search} limit={10}/>
            </>
          } 
        />
         <Route path="/Menus" element={<AllMenu search={search}/>} />
         <Route path="/itemsOnPromo" element={<AllPromo search={search}/>} />
         <Route path="/cart" element={<Cart />} />
         <Route path="/upload" element={<UploadTest/>} />
         <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route path='/login' element={<LoginPage/>} />
      </Routes>
    </>
  )
}
