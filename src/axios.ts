import axios, { AxiosInstance } from "axios";

const token = JSON.parse(localStorage.getItem("user_data") as string)?.userTocken;

const Axios: AxiosInstance = axios.create({
  baseURL: "https://backend-k2d1.onrender.com/api/", //http://localhost:3000/api/
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
  withCredentials: false,
});

export default Axios;
