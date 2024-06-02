import { createApp } from "vue";
import { nextTick } from "@vue/runtime-core";
import App from "@/App.vue";

import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";

import antd from "ant-design-vue";
import * as Icons from "@ant-design/icons-vue";
import "ant-design-vue/dist/reset.css";

import "@/api/mock/index.js";
import "./style.less";

const pinia = createPinia();
pinia.use(piniaPersist);
const app = createApp(App);
app.use(antd).use(pinia).mount("#app");

// 下方有注入自定义属性$icons，so提前声明api，防止ts检查报错
declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $icons: any;
    }
}

nextTick(() => {
    // 配置全局对象
    // 向所有组件实例注入自定义属性
    app.config.globalProperties.$icons = Icons;
    // Antd 注入全部图标
    for (const key in Icons) {
        //@ts-ignore
        app.component(key, Icons[key]);
    }
});
