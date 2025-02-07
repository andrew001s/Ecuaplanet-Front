import { useState, useContext } from "react";
import { FIREBASE_AUTH } from "../utils/FirebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext"; 
import { fetchUserPreferences } from "../services/PreferencesServices";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, logout: contextLogout } = useContext(AuthContext);
 
  const auth = FIREBASE_AUTH;

  // Función que maneja el inicio de sesión
  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError('');
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        const userInfo = await fetchUserPreferences();
        console.log('Usuario autenticado:', userInfo);
        if (userInfo) {
            login(userInfo);
            return true;
        } else {
            setError("Error al obtener datos del usuario.");
            return false;
        }
    } catch (error: any) {
    // Manejo de errores de Firebase más específico
      if (error.code === 'auth/invalid-credential') {
        setError("Credenciales incorrectas.");
      } else if (error.code === 'auth/user-not-found') {
        setError("Usuario no encontrado.");
      } else {
        setError("Error en el inicio de sesión."); // Error genérico
      }
      return false;
    } finally {
      setLoading(false);
    }
  };
    // Función para cerrar sesión
    const handleLogout = async () => {
      try {
        setLoading(true);
        await signOut(auth);
        console.log('Sesión cerrada');
        contextLogout();
      } catch (error: any) {
        console.error('Error al cerrar sesión (back):', error.message);
      }
    };

return { loading, error, handleLogin, handleLogout  };
};

export { useAuth };