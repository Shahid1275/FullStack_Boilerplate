import { FaUsers, FaBox, FaShoppingCart, FaDollarSign } from 'react-icons/fa'
import StatCard from '../components/admin/StatCard'
import RecentOrders from '../components/admin/RecentOrders'
import SalesChart from '../components/admin/SalesChart'

export default function Dashboard() {
  const stats = [
    { title: 'Total Users', value: '2,543', icon: FaUsers, color: 'bg-blue-500', change: '+12%' },
    { title: 'Products', value: '1,234', icon: FaBox, color: 'bg-green-500', change: '+5%' },
    { title: 'Orders', value: '543', icon: FaShoppingCart, color: 'bg-yellow-500', change: '+18%' },
    { title: 'Revenue', value: '$45,234', icon: FaDollarSign, color: 'bg-purple-500', change: '+23%' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <RecentOrders />
      </div>
    </div>
  )
}
