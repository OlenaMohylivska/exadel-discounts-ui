import * as axios from "axios"
export const API_URL = "https://sandbox-team5.herokuapp.com"

const axiosInstance = axios.create({
  baseURL: API_URL,
  Origin: "sandbox-team5.herokuapp.com",
})

export default axiosInstance
