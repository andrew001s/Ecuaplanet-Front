// services/fetchGemini.js
import axios from 'axios';

// URL base de tu backend Spring boot
const baseURL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.7:8080/api/gemini/';

// URL base del NUEVO backend Flask 
const flaskBaseURL = process.env.EXPO_PUBLIC_FLASK_API_URL || 'http://192.168.1.7:5000/api/'; 

// Función de utilidad para manejar errores de API (centralizada)
const handleApiError = (error) => {
  if (error.response) {
    // El servidor respondió con un código de estado fuera del rango 2xx
    console.error("Server responded with an error:", error.response.status, error.response.data);
    throw new Error(`API Error: ${error.response.status} - ${error.response.data.message || 'Server error'}`);
  } else if (error.request) {
    // La solicitud se hizo pero no se recibió respuesta
    console.error("No response received from server:", error.request);
    throw new Error("Network Error: Could not connect to the server.");s
  } else {
    // Algo sucedió al configurar la solicitud que desencadenó un error
    console.error("Error setting up the request:", error.message);
    throw new Error(`Request Error: ${error.message}`);
  }
};

// Función para obtener la respuesta inicial del bot (interactúa con tu backend spring boot)
export async function getCultivo(text) {
  try {
    const response = await axios.post(`${baseURL}cultivo`, { text: text });

    // Validación exhaustiva de la respuesta 
    if (!response.data || !response.data.candidates || !Array.isArray(response.data.candidates) || response.data.candidates.length === 0 ||
        !response.data.candidates[0].content || !response.data.candidates[0].content.parts || !Array.isArray(response.data.candidates[0].content.parts) ||
        response.data.candidates[0].content.parts.length === 0 || typeof response.data.candidates[0].content.parts[0].text !== 'string') {
      throw new Error("Invalid API response format from original backend");
    }

    const initialResponse = response.data.candidates[0].content.parts[0].text;
    return initialResponse; // Devuelve SOLO la respuesta inicial

  } catch (error) {
    handleApiError(error); // Usa la función de utilidad para manejar errores
  }
}

// NUEVA función para extraer los datos de la gráfica (interactúa con el backend Flask)
export async function extractChartData(initialResponse) {
  try {
    const response = await axios.post(`${flaskBaseURL}extract_chart_data`, { initialResponse });

    // Validación exhaustiva de la respuesta del backend Flask
    if (!response.data || typeof response.data !== 'object' || !response.data.labels || !Array.isArray(response.data.labels) || !response.data.values || !Array.isArray(response.data.values)) {
      throw new Error("Invalid response format from Flask backend");
    }

    return response.data; // Devuelve los datos de la gráfica (ya en formato JSON)

  } catch (error) {
    handleApiError(error); // Usa la función de utilidad para manejar errores
  }
}