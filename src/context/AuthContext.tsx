import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../constants/user.types'; // Importa la interfaz User

interface AuthContextType {
  isAuthenticated: boolean;
  login: (userData: User) => Promise<void>; // Recibe userData en login
  logout: () => Promise<void>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean; // Agrega isLoading
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Inicializa isLoading en true
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try { // Envuelve en try-catch para manejar errores
        const storedAuth = await AsyncStorage.getItem('isAuthenticated');
        if (storedAuth === 'true') {
          setIsAuthenticated(true);
          const storedUser = await AsyncStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsLoading(false); // Asegura que isLoading se actualice siempre
      }
    };

    checkAuth();
  }, []);

  const login = async (userData: User) => { // Recibe userData
    try {
      setUser(userData); // Guarda el usuario en el contexto
      await AsyncStorage.setItem('user', JSON.stringify(userData)); // Persiste el usuario
      setIsAuthenticated(true);
      await AsyncStorage.setItem('isAuthenticated', 'true');
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = async () => {
    try {
      console.log('Sesión Cerrada');
      setUser(null); // Limpia el usuario del contexto
      await AsyncStorage.removeItem('user'); // Elimina el usuario persistido
      setIsAuthenticated(false);
      setIsLoading(false);
      await AsyncStorage.removeItem('isAuthenticated');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};