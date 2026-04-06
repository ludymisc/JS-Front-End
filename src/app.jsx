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

export default function App() {
    const [search, setSearch] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()

    const hideNavbar = location.pathname === "/login" || "/layout"
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
          path="/restaurant/:slug/:table_num" 
          element={
            <>
              <Promo search={search} limit={5}/>
              <Menu search={search} limit={10}/>
            </>
          } 
        />
         <Route path="/restaurant/:slug/:table_num/menus" element={<AllMenu search={search}/>} />
         <Route path="/restaurant/:slug/:table_num/promos" element={<AllPromo search={search}/>} />
         <Route path="/restaurant/:slug/:table_num/cart" element={<Cart />} />
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
        <Route path='/layout' search={search} setSearch={setSearch} element={<Layout/>}/>
      </Routes>
    </>
  )
}
