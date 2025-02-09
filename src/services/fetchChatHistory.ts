// services/fetchChatHistory.ts
import axios, { AxiosError, AxiosResponse } from 'axios';

export interface ChatMessage {
  id: string;        // Assuming you have an ID
  message: string;
  sender: 'user' | 'bot'; // Use a union type for sender
  timestamp: string;      // ISO string is a good choice
  imageUrl?: string;     // Optional image URL
}


const baseURL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.7:8080/chat/'; // Use environment variable

// Centralized error handling (similar to what we did with fetchGemini)
const handleApiError = (error: AxiosError) => {
  if (error.response) {
    // The server responded with a status code outside the 2xx range
    console.error("Server responded with an error:", error.response.status, error.response.data);
    const errorMessage = (error.response.data as any)?.message || (error.response.data as any)?.error || 'Server error';
    throw new Error(`API Error: ${error.response.status} - ${errorMessage}`);
  } else if (error.request) {
    // The request was made but no response was received
    console.error("No response received from server:", error.request);
    throw new Error("Network Error: Could not connect to the server.");
  } else {
    // Something happened in setting up the request
    console.error("Error setting up the request:", error.message);
    throw new Error(`Request Error: ${error.message}`);
  }
};

// Get chat history
export async function getChat(userId: string): Promise<ChatMessage[]> {
  try {
    const response: AxiosResponse<ChatMessage[]> = await axios.get(`${baseURL}history?key=chat:history:${userId}`);
    return response.data; // Return the data directly
  } catch (error) {
    handleApiError(error as AxiosError); // Use the centralized error handler
    return []; // Return an empty array on error (or throw the error, depending on your needs)
  }
}

// Post a new chat message
export async function postChat(chat: ChatMessage): Promise<void> {
  try {
    await axios.post(`${baseURL}send`, chat);
  } catch (error) {
    handleApiError(error as AxiosError); // Use the centralized error handler
    // Don't throw here, because we're using optimistic updates.  Log the error instead.
  }
}