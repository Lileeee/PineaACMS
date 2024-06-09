import { Article } from "@/types";
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

    /**
     * 当前用户浏览文章
     */
    activeArti: Article;
}
export default defineStore("useActive", {
    state: (): activeKey => ({
        activeLeft: "1",
        userId: NaN,
        activeArti: {
            id: 0,
            authorId: 0,
            title: "",
            description: "",
            content: "",
            status: 0,
            hot: false,
            visible: true,
            comments: 0,
            likes: 0,
            marks: 0,
        },
    }),
    actions: {
        setActiveLeft(value: activeKey["activeLeft"]) {
            this.activeLeft = value;
        },
        setUserId(value: activeKey["userId"]) {
            this.userId = value;
        },
        setActiveArti(value: activeKey["activeArti"]) {
            this.activeArti = value;
        },
    },
    persist: {
        storage: sessionStorage,
    },
});
