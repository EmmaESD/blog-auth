import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <div>Chargement...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
