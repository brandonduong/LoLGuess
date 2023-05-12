import axios from "axios";
import { useAuthenticator } from "@aws-amplify/ui-vue";

const auth = useAuthenticator();

const api = axios.create({
  baseURL: "https://jrfkpq2wq9.execute-api.us-east-1.amazonaws.com/main",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${auth.user.signInUserSession.idToken.jwtToken}`,
  },
});

const dragon = axios.create({
  baseURL: "https://raw.communitydragon.org/latest",
  headers: {
    "Content-type": "application/json",
  },
});

export default { api, dragon };
