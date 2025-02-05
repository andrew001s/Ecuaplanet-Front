import axios from "axios";
import { getAuth } from "firebase/auth";

interface User {
  uid: string;
  nombre: string;
  apellido: string;
  cargo: string;
  preferencias: number[];
}

const API_URL = "http://192.168.3.205:8080/api/user/preferences"; // Ruta en el backend

export const fetchUserPreferences = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("Usuario no autenticado");

    const jwtToken = await user.getIdToken(); // Obtener el JWT del usuario autenticado
    console.log("Enviando solicitud al backend con token:", jwtToken); 

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Enviar el JWT en el header
      },
    });
    console.log("Respuesta cruda del servidor:", response.data);

    // Validamos y mapeamos los datos de forma segura
    if (response.data && typeof response.data === "object") {
      const rawData = response.data as Record<string, unknown>; // Trata la respuesta como un objeto dinámico

      const mappedUser: User = {
        uid: String(rawData.uid ?? ""), // Asegura que sea un string
        nombre: String(rawData.name ?? ""),
        apellido: String(rawData.surname ?? ""),
        cargo: String(rawData.position ?? ""),
        preferencias: Array.isArray(rawData.preferences) ? rawData.preferences.map(Number) : [], // Convierte a números si es un array
      };

      return mappedUser;

    } else {
      console.error("Respuesta del servidor no válida:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Error obteniendo preferencias:", error);
    return null;
  }
};
