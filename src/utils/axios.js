import axios from "axios";
// import { token } from "../config";

let envToken;
let localToken;
try {
  const { token } = require("../config");
  localToken = token;
} catch (err) {
  envToken = process.env.token;
}

const auth = axios.create({
  baseURL: "https://api.github.com/",
});

auth.defaults.headers.common["Authorization"] = localToken || envToken;

// const auth = axios.create({
//   baseURL: "https://api.github.com/",
// });

// auth.defaults.headers.common["Authorization"] = token;

export default auth;
