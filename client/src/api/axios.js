import axios from "axios";

const instance = axios.create({
  baseURL: "https://todo-node-l2kkez8h2-idrodrigo.vercel.app/api",
  withCredentials: true,
});

export default instance