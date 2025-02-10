import axios from 'axios';

const baseURL = 'http://192.168.100.176:8080/api/gemini/';

export async function getCultivo(text: string) {
  try {
    const response = await axios.post(baseURL + 'cultivo', { text: text });
    const responsebot = response.data.candidates[0].content.parts[0].text;
    return responsebot;
  } catch (error) {
    console.error(error);
  }
}

export async function getProduccion(text:string){
  try{
    const response = await axios.post(baseURL + 'produccion', { text: text });
    const responsebot = response.data.candidates[0].content.parts[0].text;
    return responsebot;
  }catch(error){
    console.error(error);
  }
}

export async function getVentas(text:string){
  try{
    const response = await axios.post(baseURL + 'ventas', { text: text });
    const responsebot = response.data.candidates[0].content.parts[0].text;
    return responsebot;
  }catch(error){
    console.error(error);
  }
}