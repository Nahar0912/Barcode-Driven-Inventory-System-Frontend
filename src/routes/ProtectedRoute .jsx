import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isCheckingAuth } = useAuth();

  if (isCheckingAuth) return <div>Loading...</div>;

  if (!isLoggedIn) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
