import axios from "axios";

const instance = axios.create({
  baseURL: "https://todo-node-psi.vercel.app/api",
  withCredentials: true,
});

export default instance