import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/';

interface User {
    nombre: string;
    usuario: string;
    contrasena: string;
};

export const login = async (usuario: string, contrasena: string) => {
    const response = await axios.post(API_URL + 'login', {
        usuario,
        contrasena,
    });
    return response.data;
}

