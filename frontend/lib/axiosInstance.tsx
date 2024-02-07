import axios from "axios";
import { BACKEND_URL } from "@/lib/config";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

export default axiosInstance;
