import axios from 'axios';

// CHANGEME FOR WORK/DESKTOP (localhost/mooseden)
const host = 'localhost';

// Create an axios configuration which has our baseURL
export const apiClient = axios.create(
    {
        baseURL: "http://" + host + ":9000"
    }
)