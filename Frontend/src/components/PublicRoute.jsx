import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children, user }) => {
  return !user ? children : <Navigate to="/dashboard" replace />;
};

export default PublicRoute;
