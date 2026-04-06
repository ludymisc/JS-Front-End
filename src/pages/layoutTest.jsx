import Sidebar from "../components/sidebar";

export default function DashboardPage() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Panggil Komponen Sidebar */}
            <Sidebar />

            {/* Area Konten Utama */}
            <main className="flex-1 lg:pl-64 p-8">
                <h1 className="text-2xl font-bold">Selamat Datang di Dashboard</h1>
                <p className="text-gray-600 mt-2">Ini adalah area konten utama restoranmu.</p>
                
                {/* Contoh Card Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white p-6 shadow rounded-lg">Card Kiri</div>
                    <div className="bg-white p-6 shadow rounded-lg">Card Kanan</div>
                </div>
            </main>
        </div>
    );
}