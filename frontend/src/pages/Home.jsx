import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ShoppingCart } from 'lucide-react'

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products`)
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-green-50 rounded-2xl p-8 mb-12 flex items-center justify-between">
        <div className="max-w-xl">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Fresh Groceries <br />
            <span className="text-green-600">Delivered to your Door</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Get fresh produce, dairy, meats and more delivered right to your doorstep in minutes.
          </p>
          <button className="mt-8 bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl">
            Shop Now
          </button>
        </div>
      </div>

      {/* Live Products Catalog */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Our Products</h2>
        {products.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No products available yet. Add some in the Admin panel!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                  <img src={product.image} alt={product.name} className="max-h-full object-contain mix-blend-multiply" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">{product.category}</div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-extrabold text-gray-900">${product.price.toFixed(2)}</span>
                    <button className="bg-green-50 text-green-600 p-2 rounded-full hover:bg-green-100 transition-colors">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
