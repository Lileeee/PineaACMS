import axios from "axios";
import { User } from "@/types/index"; // 数据类型

// 用户登录
const postLogin = (value: User) => {
    return axios("/mock/login", {
        method: "POST",
        data: value,
    });
};

// 获取用户登录信息

// 对外暴露接口
export { postLogin };
