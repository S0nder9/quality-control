import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5079/",
    //   timeout: 1000,
    headers: { "X-Custom-Header": "foobar" },
    withCredentials: true
});