import { useAuth } from "@/context/AuthContext";
import { Navigate } from 'react-router-dom';

type AuthProviderProps = {
    children: React.ReactNode;
}

export const RequireAuth = ({ children }: AuthProviderProps ) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate replace to="/login" />;
  }

  return children;
};