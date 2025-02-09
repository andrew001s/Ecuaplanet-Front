import axios from 'axios';

const baseURL = 'http://192.168.100.168:8080/api/gemini/';

export async function getCultivo(text) {
  try {
    const response = await axios.post(baseURL + 'cultivo', { text: text });
    const responsebot = response.data.candidates[0].content.parts[0].text;
    return responsebot;
  } catch (error) {
    console.error(error);
  }
}
