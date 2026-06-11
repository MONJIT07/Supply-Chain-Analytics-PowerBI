import React, { useState } from 'react'
import axios from 'axios'

const Cart = () => {
  const [loading, setLoading] = useState(false)

  // Dummy cart items for testing Stripe
  const cartItems = [
    { productId: 1, name: 'Fresh Apples', price: 2.99, quantity: 2 },
    { productId: 2, name: 'Organic Milk', price: 4.49, quantity: 1 }
  ]

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  const handleCheckout = async () => {
    try {
      setLoading(true)
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders/checkout`, {
        items: cartItems,
        userId: userInfo?._id || 1
      })
      
      // Redirect to Stripe checkout
      if (response.data.url) {
        window.location.href = response.data.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Error initiating checkout')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-4 border-b last:border-0">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                <p className="text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-medium">$5.00</span>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between text-gray-900 font-bold text-lg">
                <span>Total</span>
                <span>${(total + 5).toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={loading}
              className="w-full mt-8 bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
