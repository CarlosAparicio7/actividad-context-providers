import { createContext, useContext, useState } from 'react';

//Configuración de tipos y constantes
const AUTH_KEY = "app_auth";
type User = { name: string };

interface AuthContextType {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
}

//Creación del contexto
const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
    children: React.ReactNode;
}

//Proveedor del contexto
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(() => {
        const stored = window.localStorage.getItem(AUTH_KEY);
        // Intentamos parsear el JSON, si falla o no existe, devolvemos null
        try {
        return stored ? JSON.parse(stored) : null;
        } catch {
        return null;
        }
    });

  const login = (name: string) => {
    const newUser = { name };
    setUser(newUser);
    window.localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//Hook personalizado useAuth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};