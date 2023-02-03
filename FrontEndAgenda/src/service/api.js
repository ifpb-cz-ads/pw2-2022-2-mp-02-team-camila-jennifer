import axios from "axios";

const api = axios.create({
    baseURL: "https://agendaapi-h2mo.onrender.com",
});

export default api;