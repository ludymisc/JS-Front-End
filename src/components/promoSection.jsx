import '../index.css'
import items from '../data/items.json'

export default function Promo({ search, limit }) {
    let filteredProducts = items.filter((item) =>
        item.isSale && item.name.toLowerCase().includes(search.toLowerCase())
)
    if (limit) {
        filteredProducts = filteredProducts.slice(0, limit)
    }

  return (
    <section className="px-6 py-8">

      {/* Header */}
      <div className="flex items-center gap-4 mb-6 border border-black">
        <h2 className="text-2xl font-bold text-primary border border-black">
          HOT PROMO
        </h2>

        <div className="flex-1 h-[2px] bg-primary border border-black"></div>

        <a 
            href="/itemsOnPromo" 
            className="ml-auto text-sm font-semibold text-primary hover:underline" > 
            <span
            className='text-md'
            >View All</span>
        </a>

      </div>

      {/* Produk */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 border border-black">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow rounded-lg p-4 border w-full"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />

            <h3 className="text-lg font-semibold mb-1">
              {item.name}
            </h3>

            <p className="text-gray-500 mb-2">
              {item.category}
            </p>

            <div className="flex items-center gap-2 mb-2">
            {item.isSale ? (
                <>
                <p className="text-gray-500 line-through">Rp. {item.price.toLocaleString()}</p>
                <p className="text-red-600 font-boldi">Rp. {item.newPrice.toLocaleString()}</p>
                </>
            ) : (
                <p className="text-black font-bold">Rp.{item.price.toLocaleString()}</p>
            )}
            </div>

            <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

    </section>
  )
}
