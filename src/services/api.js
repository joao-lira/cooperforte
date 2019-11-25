import { PATH_BASE_URL_API } from "../constants/constants";
import axios from "axios";

const api = axios.create({
  baseURL: PATH_BASE_URL_API
});

export default api;
