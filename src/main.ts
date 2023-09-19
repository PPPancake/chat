import { createApp } from "vue";
import "./styles/index.less";
import { createPinia } from 'pinia';
import App from "./App.vue";
import { router } from "./router"
import { i18n } from './i18n';

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(i18n)
  .use(router)
  .mount("#app");
