import { useQuery } from '@tanstack/react-query'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const Dashboard = () => {
  const { data: financeData } = useQuery({
    queryKey: ['finance-summary'],
    queryFn: async () => ({
      totalExpense: 15420,
      thisMonth: 4230,
      categories: [
        { name: 'Food', value: 2100, color: '#3b82f6' },
        { name: 'Transport', value: 1200, color: '#10b981' },
        { name: 'Entertainment', value: 930, color: '#f59e0b' },
      ],
    }),
  })

  const { data: healthData } = useQuery({
    queryKey: ['health-summary'],
    queryFn: async () => ({
      bmi: 23.5,
      steps: 8420,
      sleepHours: 7.5,
      riskLevel: 'Low',
    }),
  })

  const monthlyData = [
    { month: 'Jan', expense: 3200 },
    { month: 'Feb', expense: 3800 },
    { month: 'Mar', expense: 4200 },
    { month: 'Apr', expense: 4230 },
  ]

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <p className="text-slate-400 text-sm">Total Expense</p>
          <p className="text-2xl font-bold text-blue-400">₹{financeData?.totalExpense || 0}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <p className="text-slate-400 text-sm">This Month</p>
          <p className="text-2xl font-bold text-green-400">₹{financeData?.thisMonth || 0}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <p className="text-slate-400 text-sm">Health Status</p>
          <p className="text-2xl font-bold text-emerald-400">{healthData?.riskLevel || 'Good'}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <p className="text-slate-400 text-sm">Steps Today</p>
          <p className="text-2xl font-bold text-orange-400">{healthData?.steps || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h2 className="text-lg font-semibold mb-4">Monthly Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
              <Bar dataKey="expense" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h2 className="text-lg font-semibold mb-4">Expense Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={financeData?.categories || []} cx="50%" cy="50%" labelLine={false} label><Cell fill="#3b82f6" /></Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
