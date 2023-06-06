import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import {
  Button,
  Steps,
  Checkbox,
  Divider,
  Select,
  Popover,
} from "ant-design-vue";
Amplify.configure(awsExports);

const app = createApp(App);

app.use(router);
app.use(Button);
app.use(Steps);
app.use(Checkbox);
app.use(Divider);
app.use(Select);
app.use(Popover);

app.mount("#app");
