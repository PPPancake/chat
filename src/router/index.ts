import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AppLayout from "../components/layout/app/index.vue"
import { ViewKey } from "../constants";

const APP_ROUTES: RouteRecordRaw = {
  path: '/app', // 所有的地址都以app为根目录
  component: AppLayout, // 根目录布局
  children: [{ // 聊天界面
    path: 'chat',
    name: ViewKey.Chat,
    component: () => import("../views/chat/index.vue")
  }]
}

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: { name: ViewKey.Chat }}, // ‘/’重定向到chat路由
    APP_ROUTES,
  ],
});