import axios from "axios";

const http = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  // baseURL: "https://my-json-server.typicode.com/alexandreangeli/solluti",
});
export default http;
