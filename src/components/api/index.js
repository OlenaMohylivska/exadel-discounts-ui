import * as axios from "axios"

const TOKEN_STRING = localStorage.getItem("jwt") || ""



export const axiosInstance = axios.create({
  headers: {Authorization: `Bearer ${TOKEN_STRING}`},
})

