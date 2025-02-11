import axios, { AxiosError, AxiosResponse } from 'axios';

const baseURL = 'http://192.168.100.168:8080/api/gemini/';
const flaskBaseURL = 'http://192.168.100.168:5050/api/';
export async function getCultivo(text: string) {
  try {
    const response = await axios.post(baseURL + 'cultivo', { text: text });
    const responsebot = response.data.candidates[0].content.parts[0].text;
    return responsebot;
  } catch (error) {
    console.error(error);
  }
}

export async function getProduccion(text: string) {
  try {
    const response = await axios.post(baseURL + 'produccion', { text: text });
    const responsebot = response.data.candidates[0].content.parts[0].text;
    return responsebot;
  } catch (error) {
    console.error(error);
  }
}

export async function getVentas(text: string) {
  try {
    const response = await axios.post(baseURL + 'ventas', { text: text });
    const responsebot = response.data.candidates[0].content.parts[0].text;
    return responsebot;
  } catch (error) {
    console.error(error);
  }
}
interface ChartDataResponse {
  imageUrl: string;
}
export async function extractChartData(
  initialResponse: string,
): Promise<ChartDataResponse> {
  //  tipo de retorno
  try {
    const response: AxiosResponse<ChartDataResponse> = await axios.post(
      `${flaskBaseURL}extract_chart_data`,
      { initialResponse },
    );

    // Validación más simple: solo necesitamos la URL
    if (!response.data || !response.data.imageUrl) {
      throw new Error(
        'Invalid response format from Flask backend.  Missing imageUrl.',
      );
    }
    return response.data; // Devuelve { imageUrl: "..." }
  } catch (error) {
    console.log(error as AxiosError);
    throw error;
  }
}
