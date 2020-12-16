import axios from "axios";
const envToken;
try {
  import { token } from "../config";
} catch (err) {
  envToken = process.env.token;
}

const auth = axios.create({
  baseURL: "https://api.github.com/",
});

if (token) {
  auth.defaults.headers.common["Authorization"] = token || envToken;
}

export default auth;
