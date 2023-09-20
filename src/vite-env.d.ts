/// <reference types="vite/client" />
// 获得vite的类型提示
/// <reference types="vite-svg-loader" />
// 加载svg图像并生成Vue组件，svg图像的类型提示

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  // props、state参数为空对象，emits参数可以发出任何事件
  export default component;
  // 获得组件的类型提示
}
