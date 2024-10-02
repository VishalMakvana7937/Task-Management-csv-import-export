import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />; // Redirect if role doesn't match
  }

  return children; // Render the child components if authenticated
};

export default ProtectedRoute;
