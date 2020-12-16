import axios from "axios";
import { token } from "../env";
// const envToken;
// try {
//   import { token } from "../config";
// } catch (err) {
//   envToken = process.env.token;
// }

// const auth = axios.create({
//   baseURL: "https://api.github.com/",
// });

// if (token) {
//   auth.defaults.headers.common["Authorization"] = token || envToken;
// }

const auth = axios.create({
  baseURL: "https://api.github.com/",
});

auth.defaults.headers.common["Authorization"] = token;

export default auth;
