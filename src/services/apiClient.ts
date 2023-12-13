import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3333",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export { apiClient };
