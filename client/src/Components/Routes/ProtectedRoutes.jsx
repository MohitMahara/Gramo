import { Navigate } from 'react-router-dom';
import { UseAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { userInfo } = UseAuth();
    const user = userInfo?.user;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
