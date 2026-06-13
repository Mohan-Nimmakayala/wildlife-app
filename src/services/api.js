import axios from "axios";

const api = axios.create({
    baseURL: "https://wildlife-backend-7brl.onrender.com",
});

export default api;
