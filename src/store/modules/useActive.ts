import { defineStore } from "pinia";

/**
 * 选中状态的一些key
 */
interface activeKey {
    /**
     * 用户是否登录态
     */
    isLogin: boolean;
    /**
     * 左侧LeftTool选中
     */
    activeLeft: string;
}
export default defineStore("useActive", {
    state: (): activeKey => ({
        activeLeft: "1",
        isLogin: false,
    }),
    actions: {
        setActiveLeft(value: activeKey["activeLeft"]) {
            console.log(value);
            this.activeLeft = value;
        },
        setIsLogin(value: activeKey["isLogin"]) {
            console.log(value);
            this.isLogin = value;
        },
    },
    persist: {
        storage: sessionStorage,
    },
});
