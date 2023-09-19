import { createApp } from "vue";
import "./styles/index.less";
import { createPinia } from 'pinia';
import App from "./App.vue";
import { router } from "./router"

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .mount("#app");
