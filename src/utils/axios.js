import axios from "axios";
import { token } from "../config";

const auth = axios.create({
  baseURL: "https://api.github.com/",
});

auth.defaults.headers.common["Authorization"] = token;

export default auth;
