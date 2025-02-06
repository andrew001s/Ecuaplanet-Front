import axios from 'axios';

const API_URL = 'http://192.168.3.205:8080/api/';


export const sendRequest = async (jwtToken: string) => {
    try {
        const response = await axios.get(API_URL + 'user', {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        return response.data;
        console.log(response.data);
    } catch (error) {
        console.log(error);
        return null;
    }

}

