import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { User } from '../constants/user.types';

const API_URL = 'http://192.168.100.168:8080/api/user/preferences';

export const fetchUserPreferences = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');

    const jwtToken = await user.getIdToken();
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const responseData = response.data as User;
    console.log('Datos del usuario:', responseData);
    return responseData;
  } catch (error: any) {
    console.error('⛔ Error en la solicitud:', error.message);
    if (error.response) {
      console.error('🔴 Código de error HTTP:', error.response.status);
      console.error('🔴 Respuesta del servidor:', error.response.data);
    }
    return null;
  }
};
