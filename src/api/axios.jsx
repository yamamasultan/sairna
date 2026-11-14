import axios from 'axios';

const api = axios.create({
    baseURL: 'https://sairna.abdulrahman-hares.com/api/v1/website',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default api;