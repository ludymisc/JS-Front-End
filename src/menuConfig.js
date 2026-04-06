import { MdDashboard, MdRestaurantMenu, MdHistory, MdSettings, MdShoppingBag, MdLocalOffer } from "react-icons/md";

export const MENU_CONFIG = {
  admin: [
    { label: "Dashboard", path: "/admin", icon: <MdDashboard /> },
    { label: "Kelola Produk", path: "/admin/products", icon: <MdRestaurantMenu /> },
    { label: "Riwayat Transaksi", path: "/admin/transactions", icon: <MdHistory /> },
    { label: "Settings", path: "/admin/settings", icon: <MdSettings /> },
  ],
  user: [
    { label: "Daftar Menu", path: "/restaurant/menu", icon: <MdRestaurantMenu /> },
    { label: "Pesanan Saya", path: "/restaurant/cart", icon: <MdShoppingBag /> },
    { label: "Promo", path: "/restaurant/promos", icon: <MdLocalOffer /> },
  ],
};