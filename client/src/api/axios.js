import axios from "axios";

const instance = axios.create({
  baseURL: "https://todo-node-red.vercel.app/",
  withCredentials: true,
});

export default instance