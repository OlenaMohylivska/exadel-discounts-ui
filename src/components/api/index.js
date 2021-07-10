import * as axios from "axios"
export const API_URL = "https://sandbox-team5.herokuapp.com"
const TOKEN_STRING = localStorage.getItem("jwt") || null

const axiosInstance = axios.create({
  baseURL: API_URL,
  Origin: "sandbox-team5.herokuapp.com",
})

axiosInstance.interceptors.request.use((config) => {
  TOKEN_STRING ? (config.headers.Authorization = TOKEN_STRING) : config
  return config
})

export default axiosInstance
