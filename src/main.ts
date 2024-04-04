import { createApp } from "vue";
import { createPinia } from "pinia";
import antd from "ant-design-vue";
import App from "@/App.vue";
import "ant-design-vue/dist/reset.css";
import "./style.less";

const pinia = createPinia();
const app = createApp(App);

app.use(antd).use(pinia).mount("#app");
