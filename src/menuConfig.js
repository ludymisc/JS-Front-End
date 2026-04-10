import { MdOutlineDashboard } from "react-icons/md";

export const MENU_CONFIG = {
  admin: [
    { label: "Dashboard", path: "/admin",},
    { label: "Kelola Produk", path: "/admin/products",  },
    { label: "Riwayat Transaksi", path: "/admin/transactions",  },
    { label: "Settings", path: "/admin/settings", },
  ],
  user: [
    { label: "Menu", path: "/restaurant/menu",  },
    { label: "Cart", path: "/restaurant/cart", },
  ],
};