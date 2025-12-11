export default function Dashboard() {
  // Mock Finance Data
  const financeData = {
    totalExpense: 15420,
    thisMonth: 4230,
    categories: [
      { name: 'Food', value: 2100, color: '#3b82f6' },
      { name: 'Transport', value: 1200, color: '#10b981' },
      { name: 'Entertainment', value: 930, color: '#f59e0b' },
      { name: 'Utilities', value: 450, color: '#ef4444' },
      { name: 'Other', value: 520, color: '#8b5cf6' },
    ],
    monthlyData: [
      { month: 'Jan', expense: 3500 },
      { month: 'Feb', expense: 3200 },
      { month: 'Mar', expense: 3800 },
      { month: 'Apr', expense: 4230 },
    ]
  };

  // Mock Health Data
  const healthData = {
    bmi: 23.5,
    steps: 8420,
    sleepHours: 7.5,
    heartRate: 72,
    water: 2.1,
    riskLevel: 'Low',
  };

  return (
    <div className="space-y-6">
      {/* Finance Section */}
      <div>
        <h2 className="text-2xl font-bold text-blue-400 mb-4">💰 Finance Dashboard</h2>
        
        {/* Finance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
            <p className="text-slate-400 text-sm mb-2">Total Expenses</p>
            <p className="text-3xl font-bold text-blue-400">${financeData.totalExpense.toLocaleString()}</p>
          </div>
          <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
            <p className="text-slate-400 text-sm mb-2">This Month</p>
            <p className="text-3xl font-bold text-green-400">${financeData.thisMonth.toLocaleString()}</p>
          </div>
        </div>

        {/* Categories Breakdown */}
        <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Expense Categories</h3>
          <div className="space-y-3">
            {financeData.categories.map((cat, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">{cat.name}</span>
                  <span className="text-slate-400">${cat.value}</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ width: `${(cat.value / financeData.thisMonth) * 100}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Health Section */}
      <div>
        <h2 className="text-2xl font-bold text-green-400 mb-4">❤️ Health Monitoring</h2>
        
        {/* Health Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
            <p className="text-slate-400 text-sm mb-2">BMI</p>
            <p className="text-3xl font-bold text-blue-400">{healthData.bmi}</p>
            <p className="text-xs text-green-400 mt-2">✓ Normal Range</p>
          </div>
          <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
            <p className="text-slate-400 text-sm mb-2">Steps Today</p>
            <p className="text-3xl font-bold text-purple-400">{healthData.steps.toLocaleString()}</p>
            <p className="text-xs text-slate-400 mt-2">Goal: 10,000</p>
          </div>
          <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
            <p className="text-slate-400 text-sm mb-2">Sleep Hours</p>
            <p className="text-3xl font-bold text-indigo-400">{healthData.sleepHours}h</p>
            <p className="text-xs text-green-400 mt-2">✓ Healthy</p>
          </div>
          <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
            <p className="text-slate-400 text-sm mb-2">Heart Rate</p>
            <p className="text-3xl font-bold text-red-400">{healthData.heartRate} bpm</p>
            <p className="text-xs text-slate-400 mt-2">Resting</p>
          </div>
          <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
            <p className="text-slate-400 text-sm mb-2">Water Intake</p>
            <p className="text-3xl font-bold text-cyan-400">{healthData.water}L</p>
            <p className="text-xs text-slate-400 mt-2">Goal: 2.5L</p>
          </div>
          <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
            <p className="text-slate-400 text-sm mb-2">Health Status</p>
            <p className="text-3xl font-bold text-green-400">{healthData.riskLevel}</p>
            <p className="text-xs text-green-400 mt-2">✓ Risk</p>
          </div>
        </div>
      </div>

      {/* Features Overview */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-white mb-4">✨ Active Features</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white">
          <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Intelligent Finance Management</li>
          <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Real-time Health Monitoring</li>
          <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> AI-Powered Predictions</li>
          <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Secure Data Protection</li>
          <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Interactive Dashboards</li>
          <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Expense Tracking</li>
        </ul>
      </div>
    </div>
  );
}
