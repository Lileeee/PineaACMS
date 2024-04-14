import { defineStore } from "pinia";

/**
 * 选中状态的一些key
 */
interface activeKey {
    /**
     * 左侧LeftTool选中
     */
    activeLeft: string;
}
export default defineStore("useActive", {
    state: (): activeKey => ({
        activeLeft: "1",
    }),
    actions: {
        setActiveLeft(value: activeKey["activeLeft"]) {
            console.log(value);
            this.activeLeft = value;
        },
    },
});
