const fs = window.require("fs");
import mockjs from "mockjs";
import users from "@/api/mock/modules/users.json";
import articles from "@/api/mock/modules/articles.json";
import user_artis from "@/api/mock/modules/user_arti.json";

import { User, MockParams, Article } from "@/types/index"; // 数据类型

// 用户登录
const postLoginMOCK = mockjs.mock(
    "/mock/login",
    "post",
    (value: MockParams) => {
        let data: User = JSON.parse(value.body);
        let userId: number = NaN;

        // 判断是否有该用户
        if (users.some((item: User) => item.username === data.username)) {
            // 判断用户密码是否正确
            if (
                users.some((item: User) => {
                    if (
                        item.username === data.username &&
                        item.password === data.password
                    ) {
                        userId = item.id;
                        return true;
                    } else {
                        return false;
                    }
                })
            ) {
                return {
                    code: 200,
                    msg: "Success",
                    data: { userId },
                };
            } else {
                return {
                    code: 404,
                    msg: "Password is wrong",
                    data: null,
                };
            }
        } else {
            return {
                code: 404,
                msg: "User not found",
                data: null,
            };
        }
    }
);

// 获取当前用户
const getUserInfoMock = mockjs.mock(
    "/mock/getUserInfo",
    "get",
    (value: MockParams) => {
        let data: number = JSON.parse(value.body);
        let user: User = users.filter((item: User) => item.id === data)[0];

        // 根据userId查找users数据，返回对应user
        return {
            code: 200,
            msg: "get all user success",
            data: user,
        };
    }
);

// 用户发布文章
const postArtiMock = mockjs.mock(
    "/mock/postArti",
    "post",
    (value: MockParams) => {
        // 1. 准备文章表数据：生成文章id，接收作者id+文章内容
        let ArtID: number = articles.length + 1;
        let data: {
            authorId: number;
            title: string;
            description: string;
            content: string;
        } = JSON.parse(value.body);
        // 1. 准备用户文章表数据
        let isNew: boolean = true;
        let URID: number = user_artis.length + 1;
        for (let item of user_artis) {
            if (item.authorId === data.authorId) {
                isNew = false;
                item.articleIds.push(ArtID);
            }
        }
        if (isNew) {
            user_artis.push({
                id: URID,
                authorId: data.authorId,
                articleIds: [ArtID],
            });
        }

        // 2. 写入数据
        if (data.content) {
            let article: Article = {
                id: ArtID,
                authorId: data.authorId,
                title: data.title,
                description: data.description,
                content: data.content,
                status: 0,
                hot: false,
                visible: false,
                comments: 0,
                likes: 0,
                marks: 0,
            };
            articles.push(article);
            // 文章表
            fs.writeFile(
                "src/api/mock/modules/articles.json",
                JSON.stringify(articles),
                (err: any) => {
                    if (err) {
                        throw err;
                    }
                }
            );
            // 用户文章表
            fs.writeFile(
                "src/api/mock/modules/user_arti.json",
                JSON.stringify(user_artis),
                (err: any) => {
                    if (err) {
                        throw err;
                    }
                }
            );
            return {
                code: 200,
                msg: "post success",
                data: null,
            };
        }
    }
);

// 读取全部文章
const getArtiMock = mockjs.mock("/mock/getArti", "get", () => {
    // 根据userId查找users数据，返回对应user
    return {
        code: 200,
        msg: "get all articles success",
        data: articles,
    };
});

export { postLoginMOCK, getUserInfoMock, postArtiMock, getArtiMock };
