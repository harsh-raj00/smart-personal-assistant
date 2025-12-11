import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-50">
        <nav className="bg-slate-800 border-b border-slate-700 p-4">
          <h1 className="text-2xl font-bold">Smart Personal Assistant</h1>
        </nav>
        <main className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
        </main>
      </div>
    </Router>
  )
}

export default App
