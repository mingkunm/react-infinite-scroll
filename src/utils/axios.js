import axios from "axios";
try {
  import { token } from "../config";
} catch (err) {
  token = process.env.token;
}

const auth = axios.create({
  baseURL: "https://api.github.com/",
});

if (token) {
  auth.defaults.headers.common["Authorization"] = token;
}

export default auth;
