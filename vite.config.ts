import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
    base: "./", // vite打包时在asset文件前加./ -> web路径转换为本地路径
    plugins: [vue()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"), // 让vite识别@符号
        },
    },
    server: {
        watch: {
            ignored: [path.resolve(__dirname, "./src/api/mock/modules/*")], // vite热更新忽视文件
        },
    },
});
