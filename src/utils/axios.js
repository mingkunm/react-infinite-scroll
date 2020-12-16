import axios from "axios";
import { token } from "../config";

const auth = axios.create({
  baseURL: "https://api.github.com/",
});

if (token) {
  auth.defaults.headers.common["Authorization"] = token;
}

export default auth;
