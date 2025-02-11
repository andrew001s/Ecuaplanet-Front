// services/fetchGemini.ts

import axios, { AxiosError, AxiosResponse } from 'axios';

//  interfaz para la *respuesta* de Flask (solo la URL)
interface ChartDataResponse {
  imageUrl: string;
}

// URL base del backend Spring Boot (usando variables de entorno)
const baseURL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.100.168:8080/api/gemini/'; //  IP

// URL base del backend Flask (también usando variables de entorno)
const flaskBaseURL = process.env.EXPO_PUBLIC_FLASK_API_URL || 'http://192.168.100.168:5050/api/'; //  IP y puerto

// Función de utilidad para manejar errores de API (centralizada)
const handleApiError = (error: AxiosError) => {
  if (error.response) {
    // El servidor respondió con un código fuera del rango 2xx
    console.error("Server responded with an error:", error.response.status, error.response.data);
    const errorMessage = (error.response.data as any).message || (error.response.data as any).error || 'Server error';
    throw new Error(`API Error: ${error.response.status} - ${errorMessage}`);
  } else if (error.request) {
    // La solicitud se hizo pero no se recibió respuesta
    console.error("No response received from server:", error.request);
    throw new Error("Network Error: Could not connect to the server.");
  } else {
    // Error al configurar la solicitud
    console.error("Error setting up the request:", error.message);
    throw new Error(`Request Error: ${error.message}`);
  }
};

// Función para obtener la respuesta inicial de Gemini (Spring Boot backend)
//  cambios aquí
export async function getCultivo(text: string): Promise<string> {
    try {
      const response: AxiosResponse = await axios.post(`${baseURL}cultivo`, { text: text });

        // Simplifica la validación: solo necesitamos un string
        if (!response.data || !response.data.candidates?.[0]?.content?.parts?.[0]?.text) {
            throw new Error("Invalid API response format from original backend");
        }

      return response.data.candidates[0].content.parts[0].text;

    } catch (error) {
      handleApiError(error as AxiosError); // Aserción de tipo
      throw error; // Propaga el error
    }
  }

// Función para extraer los datos de la gráfica (Flask backend) 
export async function extractChartData(initialResponse: string): Promise<ChartDataResponse> { //  tipo de retorno
  try {
    const response: AxiosResponse<ChartDataResponse> = await axios.post(`${flaskBaseURL}extract_chart_data`, { initialResponse });

    // Validación más simple: solo necesitamos la URL
    if (!response.data || !response.data.imageUrl) {
      throw new Error("Invalid response format from Flask backend.  Missing imageUrl.");
    }
    return response.data; // Devuelve { imageUrl: "..." }

  } catch (error) {
    handleApiError(error as AxiosError);
    throw error;
  }
}