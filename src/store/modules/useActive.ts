import { defineStore } from "pinia";

/**
 * 选中状态的一些key
 */
interface activeKey {
    /**
     * 用户是否登录态
     */
    userId: number;

    /**
     * 左侧LeftTool选中
     */
    activeLeft: string;
}

export default defineStore("useActive", {
    state: (): activeKey => ({
        activeLeft: "1",
        userId: NaN,
    }),
    actions: {
        setActiveLeft(value: activeKey["activeLeft"]) {
            this.activeLeft = value;
        },
        setUserId(value: activeKey["userId"]) {
            this.userId = value;
        },
    },
    persist: {
        storage: sessionStorage,
    },
});
