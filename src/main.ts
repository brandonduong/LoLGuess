import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { Button, Steps, Checkbox, Divider } from "ant-design-vue";
Amplify.configure(awsExports);

const app = createApp(App);

app.use(router);
app.use(Button);
app.use(Steps);
app.use(Checkbox);
app.use(Divider);

app.mount("#app");
