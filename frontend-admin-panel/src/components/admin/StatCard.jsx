export default function StatCard({ title, value, icon: Icon, color, change }) {
  const isPositive = change.startsWith('+')

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
          <p className={`text-sm mt-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {change} from last month
          </p>
        </div>
        <div className={`${color} p-4 rounded-full text-white`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  )
}
