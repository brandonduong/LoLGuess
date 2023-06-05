import axios from "axios";

const api = axios.create({
  baseURL: "https://jrfkpq2wq9.execute-api.us-east-1.amazonaws.com/main",
});

const dragon = axios.create({
  baseURL: "https://raw.communitydragon.org/latest",
  headers: {
    "Content-type": "application/json",
  },
});

export default { api, dragon };
