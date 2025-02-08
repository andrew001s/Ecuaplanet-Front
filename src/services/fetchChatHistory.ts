import axios from 'axios';

const baseURL = 'http://192.168.100.168:8080/chat/history';

export async function getChat(text: string):Promise<ChatMessage[]> {
  try {
    const response = await axios.get(baseURL + '?key=chat:history:' + text);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
