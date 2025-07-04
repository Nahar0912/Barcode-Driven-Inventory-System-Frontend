// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isCheckingAuth } = useAuth();

  if (isCheckingAuth) return <div className="text-center mt-10">Loading...</div>;

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
