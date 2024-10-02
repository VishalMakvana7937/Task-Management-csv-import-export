import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard'; // Import your new Dashboard component
import AdminDashboard from './components/AdminDashboard';  
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />  {/* Changed Home to Dashboard */}
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/unauthorized" element={<div>Unauthorized</div>} />
      </Routes>
    </Router>
  );
};

export default App;
