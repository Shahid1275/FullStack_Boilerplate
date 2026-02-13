const orders = [
  { id: '#1234', customer: 'John Doe', product: 'Laptop', amount: '$1,299', status: 'Completed' },
  { id: '#1235', customer: 'Jane Smith', product: 'Phone', amount: '$899', status: 'Pending' },
  { id: '#1236', customer: 'Bob Johnson', product: 'Tablet', amount: '$599', status: 'Completed' },
  { id: '#1237', customer: 'Alice Brown', product: 'Monitor', amount: '$399', status: 'Processing' },
  { id: '#1238', customer: 'Charlie Wilson', product: 'Keyboard', amount: '$149', status: 'Completed' },
]

export default function RecentOrders() {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Processing':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Order ID</th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Customer</th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Product</th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Amount</th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-2 text-sm font-medium text-gray-900">{order.id}</td>
                <td className="py-3 px-2 text-sm text-gray-700">{order.customer}</td>
                <td className="py-3 px-2 text-sm text-gray-700">{order.product}</td>
                <td className="py-3 px-2 text-sm font-medium text-gray-900">{order.amount}</td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
