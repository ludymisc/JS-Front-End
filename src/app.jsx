import Navbar from "./components/nav"
import Promo from "./components/promoSection"
import Menu from "./components/menuSection"
import { Route, Routes } from "react-router-dom"
import { useState } from "react"
import AllMenu from "./pages/menuAll"
import AllPromo from "./pages/promoAll"
import Cart from "./pages/cart"

export default function App() {
    const [search, setSearch] = useState("")
  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
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
         
      </Routes>
    </>
  )
}
