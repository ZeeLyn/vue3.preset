import { createApp } from "vue";
import App from "./App.vue";
import http from "@zeelyn/http";
import { createPinia } from "pinia";
import VueUI from "@zeelyn/vue-ui";
import "@zeelyn/vue-ui/dist/index.css";

const app = createApp(App);
app.use(createPinia());
app.config.globalProperties.$http = http;
app.use(VueUI, {
    theme: "dark", //or light
    minWidth: 100,
    maxWidth: 300,
});
app.use(router).mount("#app");
