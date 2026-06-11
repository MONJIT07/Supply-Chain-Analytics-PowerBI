import React from 'react'

const Dashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Revenue', value: '$12,426', color: 'bg-green-50 text-green-600' },
          { label: 'Active Orders', value: '45', color: 'bg-blue-50 text-blue-600' },
          { label: 'Total Customers', value: '1,204', color: 'bg-purple-50 text-purple-600' },
          { label: 'Products', value: '142', color: 'bg-orange-50 text-orange-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-2">{stat.label}</h3>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h2>
        <p className="text-gray-500">Order table will go here...</p>
      </div>
    </div>
  )
}

export default Dashboard
