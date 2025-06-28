import axios from "axios";

export const axiosdistance = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
});