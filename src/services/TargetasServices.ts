import axios from 'axios';
import { Card } from '../constants/card.types';

const API_URL = "http://192.168.100.35:8080/api/ingresos/max-venta";

export const fetchCardInfo = async () => {
    try{
        console.log("Llamado a la API...");
        const response = await axios.get<Card[]>(API_URL);
        console.log("Datos recibidos: ",response.data);
        return response.data;
    }catch(error: unknown){
        if(error instanceof Error){
            console.error("Error al obtener datos",error.message);
        }else{
            console.error("Error desconocido: ",error)
        }
        return []
    }
};
