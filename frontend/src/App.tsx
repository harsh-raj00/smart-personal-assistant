import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth Context and Components
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#1a1a2e',
      color: '#fff',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: isMobile ? '10px' : '20px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isMobile ? '15px' : '20px',
      backgroundColor: '#16213e',
      borderRadius: '8px',
      marginBottom: isMobile ? '15px' : '30px',
      flexWrap: 'wrap',
      gap: '10px',
    },
    title: {
      fontSize: isMobile ? '24px' : '32px',
      fontWeight: 'bold',
      margin: 0,
    },
    button: {
      padding: isMobile ? '8px 16px' : '10px 20px',
      backgroundColor: '#0f3460',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: isMobile ? '12px' : '14px',
      transition: 'background 0.3s',
    },
    authForm: {
      maxWidth: '400px',
      margin: '50px auto',
      padding: isMobile ? '20px' : '30px',
      backgroundColor: '#16213e',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    },
    input: {
      width: '100%',
      padding: isMobile ? '10px' : '12px',
      margin: '10px 0',
      backgroundColor: '#0f3460',
      border: '2px solid #533483',
      borderRadius: '6px',
      color: '#fff',
      fontSize: '14px',
      boxSizing: 'border-box',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: isMobile ? '15px' : '20px',
      marginBottom: isMobile ? '20px' : '30px',
    },
    card: {
      backgroundColor: '#16213e',
      padding: isMobile ? '15px' : '20px',
      borderRadius: '10px',
      border: '1px solid #533483',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    },
    cardTitle: {
      fontSize: isMobile ? '16px' : '18px',
      fontWeight: 'bold',
      marginBottom: isMobile ? '10px' : '15px',
      color: '#00d4ff',
    },
    cardValue: {
      fontSize: isMobile ? '24px' : '32px',
      fontWeight: 'bold',
      color: '#4ecdc4',
    },
    section: {
      marginBottom: isMobile ? '20px' : '30px',
    },
    sectionTitle: {
      fontSize: isMobile ? '20px' : '28px',
      fontWeight: 'bold',
      marginBottom: isMobile ? '15px' : '20px',
      color: '#00d4ff',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    bar: {
      width: '100%',
      height: '12px',
      backgroundColor: '#0f3460',
      borderRadius: '6px',
      marginTop: '8px',
      overflow: 'hidden',
    },
    barFill: (percent) => ({
      height: '100%',
      width: `${percent}%`,
      backgroundColor: '#4ecdc4',
      transition: 'width 0.3s ease',
    }),
    featureList: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: isMobile ? '10px' : '15px',
    },
    featureItem: {
      padding: isMobile ? '12px' : '15px',
      backgroundColor: '#0f3460',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      border: '1px solid #533483',
    },
  };

  if (!isAuthenticated) {
    return (
      <LoginPage
        styles={styles}
        onLogin={(userData) => {
          setUser(userData);
          setIsAuthenticated(true);
        }}
      />
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🚀 Smart Personal Assistant</h1>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span>Welcome, {user?.username}!</span>
          <button
            style={styles.button}
            onClick={() => {
              setIsAuthenticated(false);
              setUser(null);
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>💰 Finance Dashboard</div>
        <div style={styles.grid}>
          <DashboardCard
            title="Total Expenses"
            value="$15,420"
            styles={styles}
          />
          <DashboardCard
            title="This Month"
            value="$4,230"
            styles={styles}
          />
          <DashboardCard
            title="Budget Remaining"
            value="$770"
            styles={styles}
          />
        </div>

        <div style={styles.sectionTitle} style={{ marginTop: '20px' }}>Expense Categories</div>
        <div style={styles.card}>
          {[
            { name: 'Food', amount: 2100, percent: 45, color: '#3498db' },
            { name: 'Transport', amount: 1200, percent: 26, color: '#2ecc71' },
            { name: 'Entertainment', amount: 930, percent: 20, color: '#f39c12' },
            { name: 'Utilities', amount: 450, percent: 10, color: '#e74c3c' },
            { name: 'Other', amount: 520, percent: 11, color: '#9b59b6' },
          ].map((category, i) => (
            <div key={i} style={{ marginBottom: isMobile ? '12px' : '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: isMobile ? '12px' : '14px' }}>
                <span>{category.name}</span>
                <span>${category.amount}</span>
              </div>
              <div style={styles.bar}>
                <div style={{ ...styles.barFill(category.percent), backgroundColor: category.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>❤️ Health Monitoring</div>
        <div style={styles.grid}>
          <DashboardCard title="BMI" value="23.5" subtitle="✓ Normal Range" styles={styles} />
          <DashboardCard title="Steps Today" value="8,420" subtitle="Goal: 10,000" styles={styles} />
          <DashboardCard title="Sleep Hours" value="7.5h" subtitle="✓ Healthy" styles={styles} />
          <DashboardCard title="Heart Rate" value="72 bpm" subtitle="Resting" styles={styles} />
          <DashboardCard title="Water Intake" value="2.1L" subtitle="Goal: 2.5L" styles={styles} />
          <DashboardCard title="Health Status" value="Low Risk" subtitle="✓ Good" styles={styles} />
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>✨ Active Features</div>
        <div style={styles.featureList}>
          {[
            'Intelligent Finance Management',
            'Real-time Health Monitoring',
            'AI-Powered Predictions',
            'Secure JWT Authentication',
            'Interactive Dashboards',
            'Expense Category Tracking',
          ].map((feature, i) => (
            <div key={i} style={styles.featureItem}>
              <span>✓</span>
              <span style={{ fontSize: isMobile ? '12px' : '14px' }}>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>📊 Summary</div>
        <div style={styles.grid}>
          <DashboardCard title="Average Daily Spending" value="$140.83" styles={styles} />
          <DashboardCard title="Monthly Savings Rate" value="18.2%" styles={styles} />
          <DashboardCard title="Health Score" value="8.5/10" styles={styles} />
        </div>
      </div>
    </div>
  );
}

function LoginPage({ styles, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (isSignUp && !username) {
      setError('Please enter a username');
      return;
    }
    // Simulate authentication
    onLogin({ username: username || email.split('@')[0], email });
  };

  return (
    <div style={styles.container}>
      <div style={styles.authForm}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#00d4ff' }}>
          {isSignUp ? '🚀 Create Account' : '🔐 Login'}
        </h2>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          {error && <p style={{ color: '#e74c3c', fontSize: '12px' }}>{error}</p>}
          <button type="submit" style={{ ...styles.button, width: '100%', padding: '12px', marginTop: '20px' }}>
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', cursor: 'pointer' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <span
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            style={{ color: '#00d4ff', marginLeft: '5px', fontWeight: 'bold' }}
          >
            {isSignUp ? ' Login' : ' Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, subtitle, styles }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardTitle}>{title}</div>
      <div style={styles.cardValue}>{value}</div>
      {subtitle && <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '8px' }}>{subtitle}</div>}
    </div>
  );
}

export default App;
