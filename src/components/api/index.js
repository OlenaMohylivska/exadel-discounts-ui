import * as axios from "axios"

const jwt = localStorage.getItem("jwt") || ""
const headers = { Authorization: "Bearer " + jwt }

export const axiosInstance = axios.create({
  headers: headers,
})
