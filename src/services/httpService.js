import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

toast.configure();

api.interceptors.response.use(null, (error) => {
  if (error.response && error.response.status !== 404) {
    toast.error("Unexpected error occured");
  }

  return Promise.reject(error);
});

export default {
  get: api.get,
  put: api.put,
  post: api.post,
  delete: api.delete,
};
