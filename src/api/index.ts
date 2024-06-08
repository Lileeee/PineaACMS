import axios from "axios";
import { FormStateName, FormStatePass, User } from "@/types/index"; // 数据类型

// 用户登录
const postLogin = (value: User) => {
    return axios("/mock/login", {
        method: "POST",
        data: value,
    });
};

// 获取用户登录信息
const getUserInfo = (value: number) => {
    return axios("/mock/getUserInfo", {
        method: "GET",
        data: value,
    });
};

// 用户发布文章
const postArti = (value: {
    authorId: number;
    title: string;
    description: string;
    content: string;
}) => {
    return axios("/mock/postArti", {
        method: "POST",
        data: value,
    });
};

// 读取全部文章
const getArti = () => {
    return axios("/mock/getArti", {
        method: "GET",
    });
};

// 点赞文章
const postLike = (value: { userId: number; articleId: number }) => {
    return axios("/mock/postLike", {
        method: "post",
        data: value,
    });
};

// 读取用户点赞表
const getLike = (value: number) => {
    return axios("/mock/getLike", {
        method: "GET",
        data: value,
    });
};

// 收藏文章
const postMark = (value: { userId: number; articleId: number }) => {
    return axios("/mock/postMark", {
        method: "post",
        data: value,
    });
};

// 读取文章收藏表
const getMark = (value: number) => {
    return axios("/mock/getMark", {
        method: "GET",
        data: value,
    });
};

// 读取用户文章表
const getUserArti = (value: number) => {
    return axios("/mock/getUserArti", {
        method: "GET",
        data: value,
    });
};

// 设置文章状态
const postArtiStatus = (value: { id: number; status: number }) => {
    return axios("/mock/postArtiStatus", {
        method: "POST",
        data: value,
    });
};

// 读取全部用户
const getAllUser = () => {
    return axios("/mock/getAllUser", {
        method: "GET",
    });
};

// 修改用户名
const postUserName = (value: { formdata: FormStateName; userId: number }) => {
    return axios("/mock/postUserName", {
        method: "POST",
        data: value,
    });
};

// 修改用户密码
const postPassword = (value: { formdata: FormStatePass; userId: number }) => {
    return axios("/mock/postPassword", {
        method: "POST",
        data: value,
    });
};

// 对外暴露接口
export {
    postLogin,
    getUserInfo,
    postArti,
    getArti,
    postLike,
    getLike,
    postMark,
    getMark,
    getUserArti,
    postArtiStatus,
    getAllUser,
    postUserName,
    postPassword,
};
