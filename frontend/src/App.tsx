import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const styles = {
    container: { minHeight: '100vh', backgroundColor: '#1e293b', color: '#f1f5f9', padding: '20px' },
    header: { textAlign: 'center' as const, marginBottom: '40px' },
    title: { fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' },
    subtitle: { fontSize: '18px', color: '#cbd5e1' },
    section: { marginBottom: '40px' },
    sectionTitle: { fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', color: '#60a5fa' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' },
    card: { backgroundColor: '#334155', padding: '20px', borderRadius: '8px', border: '1px solid #475569' },
    cardLabel: { fontSize: '14px', color: '#94a3b8', marginBottom: '8px' },
    cardValue: { fontSize: '32px', fontWeight: 'bold', color: '#38bdf8' },
    bar: { width: '100%', height: '8px', backgroundColor: '#475569', borderRadius: '4px', marginTop: '8px', overflow: 'hidden' },
    barFill: (percent: number) => ({ width: `${percent}%`, height: '100%', backgroundColor: '#10b981', transition: 'width 0.3s' }),
    featureList: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' },
    featureItem: { backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', border: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '10px' },
    checkmark: { color: '#10b981', fontSize: '20px', fontWeight: 'bold' },
  }

  return (
    <Router basename="/smart-personal-assistant">
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>🚀 Smart Personal Assistant</h1>
          <p style={styles.subtitle}>AI-Powered Finance & Health Dashboard</p>
        </div>

        <Routes>
          <Route path="/" element={
            <div>
              {/* Finance Section */}
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>💰 Finance Dashboard</h2>
                <div style={styles.grid}>
                  <div style={styles.card}>
                    <div style={styles.cardLabel}>Total Expenses</div>
                    <div style={styles.cardValue}>$15,420</div>
                  </div>
                  <div style={styles.card}>
                    <div style={styles.cardLabel}>This Month</div>
                    <div style={styles.cardValue}>$4,230</div>
                  </div>
                  <div style={styles.card}>
                    <div style={styles.cardLabel}>Budget Remaining</div>
                    <div style={styles.cardValue}>$770</div>
                  </div>
                </div>

                <h3 style={{...styles.sectionTitle, fontSize: '20px'}}>Expense Categories</h3>
                <div style={{backgroundColor: '#334155', padding: '20px', borderRadius: '8px'}}>
                  {[
                    {name: 'Food', value: 2100, max: 4230, color: '#3b82f6'},
                    {name: 'Transport', value: 1200, max: 4230, color: '#10b981'},
                    {name: 'Entertainment', value: 930, max: 4230, color: '#f59e0b'},
                    {name: 'Utilities', value: 450, max: 4230, color: '#ef4444'},
                    {name: 'Other', value: 520, max: 4230, color: '#8b5cf6'},
                  ].map((cat, i) => (
                    <div key={i} style={{marginBottom: '20px'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                        <span>{cat.name}</span>
                        <span style={{color: '#cbd5e1'}}>${cat.value}</span>
                      </div>
                      <div style={styles.bar}>
                        <div style={{...styles.barFill((cat.value / cat.max) * 100), backgroundColor: cat.color}}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Health Section */}
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>❤️ Health Monitoring</h2>
                <div style={styles.grid}>
                  <div style={styles.card}>
                    <div style={styles.cardLabel}>BMI</div>
                    <div style={styles.cardValue}>23.5</div>
                    <div style={{fontSize: '12px', color: '#10b981', marginTop: '10px'}}>✓ Normal Range</div>
                  </div>
                  <div style={styles.card}>
                    <div style={styles.cardLabel}>Steps Today</div>
                    <div style={styles.cardValue}>8,420</div>
                    <div style={{fontSize: '12px', color: '#cbd5e1', marginTop: '10px'}}>Goal: 10,000</div>
                  </div>
                  <div style={styles.card}>
                    <div style={styles.cardLabel}>Sleep Hours</div>
                    <div style={styles.cardValue}>7.5h</div>
                    <div style={{fontSize: '12px', color: '#10b981', marginTop: '10px'}}>✓ Healthy</div>
                  </div>
                  <div style={styles.card}>
                    <div style={styles.cardLabel}>Heart Rate</div>
                    <div style={styles.cardValue}>72 bpm</div>
                    <div style={{fontSize: '12px', color: '#cbd5e1', marginTop: '10px'}}>Resting</div>
                  </div>
                  <div style={styles.card}>
                    <div style={styles.cardLabel}>Water Intake</div>
                    <div style={styles.cardValue}>2.1L</div>
                    <div style={{fontSize: '12px', color: '#cbd5e1', marginTop: '10px'}}>Goal: 2.5L</div>
                  </div>
                  <div style={styles.card}>
                    <div style={styles.cardLabel}>Health Status</div>
                    <div style={styles.cardValue} style={{fontSize: '24px', color: '#10b981'}}>Low Risk</div>
                    <div style={{fontSize: '12px', color: '#10b981', marginTop: '10px'}}>✓ Good</div>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>✨ Active Features</h2>
                <div style={styles.featureList}>
                  {[
                    'Intelligent Finance Management',
                    'Real-time Health Monitoring',
                    'AI-Powered Predictions',
                    'Secure JWT Authentication',
                    'Interactive Dashboards',
                    'Expense Category Tracking'
                  ].map((feature, i) => (
                    <div key={i} style={styles.featureItem}>
                      <div style={styles.checkmark}>✓</div>
                      <div>{feature}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Summary */}
              <div style={{...styles.section, backgroundColor: '#334155', padding: '30px', borderRadius: '8px', textAlign: 'center' as const}}>
                <h3 style={{fontSize: '24px', marginBottom: '20px'}}>📊 Summary</h3>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px'}}>
                  <div>
                    <div style={{fontSize: '14px', color: '#94a3b8'}}>Average Daily Spending</div>
                    <div style={{fontSize: '28px', fontWeight: 'bold', color: '#f59e0b'}}>$140.83</div>
                  </div>
                  <div>
                    <div style={{fontSize: '14px', color: '#94a3b8'}}>Monthly Savings Rate</div>
                    <div style={{fontSize: '28px', fontWeight: 'bold', color: '#10b981'}}>18.2%</div>
                  </div>
                  <div>
                    <div style={{fontSize: '14px', color: '#94a3b8'}}>Health Score</div>
                    <div style={{fontSize: '28px', fontWeight: 'bold', color: '#60a5fa'}}>8.5/10</div>
                  </div>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
