import { defineStore } from "pinia";
import { User } from "@/types";
/**
 * 当前登录用户信息
 */

export default defineStore("useUser", {
    state: (): User => ({
        sudo: undefined,
        id: NaN,
        username: "",
        password: "",
    }),
    actions: {
        setUsername(value: User["username"]) {
            this.username = value;
        },
        setPassword(value: User["password"]) {
            this.password = value;
        },
        setUser(value: User) {
            this.sudo = value?.sudo;
            this.id = value.id;
            this.username = value.username;
            this.password = value.password;
        },
    },
    getters: {
        user(state) {
            return {
                sudo: state.sudo,
                id: state.id,
                username: state.username,
                password: state.password,
            };
        },
    },
    persist: {
        storage: sessionStorage,
    },
});
