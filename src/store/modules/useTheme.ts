import { defineStore } from "pinia";
import { theme } from "ant-design-vue";

/**
 * 明暗主题色 持久化配置
 */
interface themeType {
    /**
     * 明暗模式
     */
    mode: string;
}
export default defineStore("useTheme", {
    state: (): themeType => ({
        mode: "light",
    }),
    getters: {
        themeConfig: (state) => {
            document.documentElement.setAttribute("data-mode", state.mode);
            if (state.mode === "light") {
                return {
                    components: {
                        Layout: {
                            colorBgHeader: "#f5f5f5",
                        },
                    },
                    algorithm: theme.defaultAlgorithm,
                };
            } else
                return {
                    token: {
                        colorPrimary: "#929292",
                    },
                    components: {
                        Layout: {
                            colorBgHeader: "#000000",
                        },
                    },
                    algorithm: theme.darkAlgorithm,
                };
        },
    },
    actions: {
        toggleMode() {
            this.mode = this.mode === "light" ? "dark" : "light";
        },
    },
});
