import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.REACT_APP_ENV === "production"
      ? "http://chat.dz8545.xyz/api"
      : "http://localhost:3001/api",
  timeout: 5000,
});

instance.interceptors.request.use((config) => {
  return config;
});
instance.interceptors.response.use();

export default instance;
