import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { MapPin, Package, CheckCircle } from 'lucide-react'

const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000')

function App() {
  const [orders, setOrders] = useState([
    { id: '1', status: 'pending', destination: '123 Main St' }
  ])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true))
    socket.on('disconnect', () => setIsConnected(false))

    // Listen for live updates
    socket.on('orderStatusUpdated', (data) => {
      setOrders(prevOrders => {
        const existing = prevOrders.find(o => o.id === data.orderId)
        if (existing) {
          return prevOrders.map(o => o.id === data.orderId ? { ...o, status: data.status } : o)
        }
        return [...prevOrders, { id: data.orderId, status: data.status, destination: 'New Address' }]
      })
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('orderStatusUpdated')
    }
  }, [])

  // Simulate updating an order (would normally happen from the Admin dashboard)
  const simulateUpdate = (orderId) => {
    socket.emit('updateOrderStatus', { orderId, status: 'out_for_delivery' })
  }

  return (
    <div className="min-h-screen bg-blue-50 text-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Delivery Dashboard</h1>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm font-medium">{isConnected ? 'Live' : 'Disconnected'}</span>
          </div>
        </div>

        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Order #{order.id}</h3>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {order.destination}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                  ${order.status === 'out_for_delivery' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}
                `}>
                  {order.status.replace('_', ' ')}
                </span>

                {order.status === 'pending' && (
                  <button 
                    onClick={() => simulateUpdate(order.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Accept Delivery
                  </button>
                )}
                
                {order.status === 'out_for_delivery' && (
                  <button className="flex items-center space-x-1 text-green-600 font-bold hover:text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    <span>Complete</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
