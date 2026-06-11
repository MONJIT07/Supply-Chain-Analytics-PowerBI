import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Plus, Trash2 } from 'lucide-react'

const Products = () => {
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products`)
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products`, formData)
      setShowForm(false)
      setFormData({ name: '', description: '', price: '', category: '', image: '' })
      fetchProducts()
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products/${id}`)
      fetchProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
          <h2 className="text-lg font-bold mb-4">Add New Product</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="name" placeholder="Product Name" required value={formData.name} onChange={handleInputChange} className="border p-2 rounded" />
            <input type="number" name="price" placeholder="Price ($)" step="0.01" required value={formData.price} onChange={handleInputChange} className="border p-2 rounded" />
            <input type="text" name="category" placeholder="Category" required value={formData.category} onChange={handleInputChange} className="border p-2 rounded" />
            <input type="url" name="image" placeholder="Image URL" value={formData.image} onChange={handleInputChange} className="border p-2 rounded" />
            <textarea name="description" placeholder="Description" required value={formData.description} onChange={handleInputChange} className="border p-2 rounded md:col-span-2" />
            <button type="submit" className="bg-green-600 text-white py-2 rounded font-medium hover:bg-green-700 md:col-span-2">
              Save Product
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm border-b">
              <th className="p-4">Product Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900">{product.name}</td>
                <td className="p-4 text-gray-500">{product.category}</td>
                <td className="p-4 font-bold text-green-600">${product.price.toFixed(2)}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:bg-red-50 p-2 rounded">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">No products found. Add one!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Products
