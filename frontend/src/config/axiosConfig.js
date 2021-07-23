import axios from "axios"

// eslint-disable-next-line import/prefer-default-export
export const axiosClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://proshop-backed.herokuapp.com"
      : "https://proshop-backed.herokuapp.com" // "http://localhost:5000" cambiar si se usará el backend de local
})
