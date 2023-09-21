import 'element-plus/theme-chalk/dark/css-vars.css';
import "./styles/index.less";

import { createApp } from "vue";
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
