import axios from "axios";
import { getAuth } from "firebase/auth";
import { User } from "../constants/user.types";

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
    const responseData = response.data as User; // La aserción de tipo es suficiente
    console.log("Datos del usuario:", responseData);
    return responseData; // Retornamos responseData directamente

  } catch (error: any) {
    console.error("⛔ Error en la solicitud:", error.message);
    if (error.response) {
      console.error("🔴 Código de error HTTP:", error.response.status);
      console.error("🔴 Respuesta del servidor:", error.response.data);
    }
    return null;
  }
};
