import axios from "axios";

axios.interceptors.request.use(
  config => {
    config.params = { APPID: process.env.REACT_APP_WEATHER_API_KEY };
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
