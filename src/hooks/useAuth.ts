import { useState, useContext } from "react";
import { FIREBASE_AUTH } from "../utils/FirebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext"; 
import { fetchUserPreferences } from "../services/PreferencesServices";


const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const { login, logout: contextLogout, user } = useContext(AuthContext);
 
  const auth = FIREBASE_AUTH;

  // Función que maneja el inicio de sesión
  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError('');
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        const userInfo = await fetchUserPreferences();
        const user = {
            uid: userInfo.uid,
            name: userInfo.nombre,
            surname: userInfo.apellido,
            position: userInfo.cargo,
            preferences: userInfo.preferencias,
        };
        console.log("Usuario recibido desde el backend:", user);
        await login(user);
        setIsAuthenticated(true); 

    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

    // Función para cerrar sesión
    const logout = async () => {
        try {
          await signOut(auth);
          console.log('Sesión cerrada');
        } catch (error: any) {
          console.error('Error al cerrar sesión:', error.message);
        }
      };

  return { loading, error, isAuthenticated, handleLogin };
};

export { useAuth };