import store from "../store";
import axios from "axios";

const http = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  // baseURL: "https://my-json-server.typicode.com/alexandreangeli/solluti",
});

http.interceptors.request.use(
  function (config) {
    store.commit("setLoading", true);
    return config;
  },
  function (error) {
    store.commit("setLoading", false);
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    store.commit("setLoading", false);
    return response;
  },
  function (error) {
    store.commit("setLoading", false);
    return Promise.reject(error);
  }
);

export default http;