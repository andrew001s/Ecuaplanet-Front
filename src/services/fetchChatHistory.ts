import axios from 'axios';

const baseURL = 'http://192.168.100.168:8080/chat/';

export async function getChat(text: string,category:string):Promise<ChatMessage[]> {
  try {
    const response = await axios.get(baseURL + 'history?key=chat:history:'+category+":" + text);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function postChat(chat: ChatMessage):Promise<void> {
  try {
    await axios.post(baseURL + 'send',  chat );
  } catch (error) {
    console.error(error);
  }
}
