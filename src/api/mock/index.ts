const fs = window.require("fs");
import mockjs from "mockjs";
import users from "@/api/mock/modules/users.json";
import articles from "@/api/mock/modules/articles.json";
import user_artis from "@/api/mock/modules/user_arti.json";
import arti_likes from "@/api/mock/modules/arti_like.json";
// import arti_marks from "@/api/mock/modules/arti_mark.json";
// import arti_coms from "@/api/mock/modules/arti_com.json";

import {
    User,
    MockParams,
    Article,
    // Arti_Com,
    Arti_Like,
    // Arti_Mark,
} from "@/types/index"; // 数据类型

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

// 点赞文章
// 逻辑：查找用户点赞表数据，根据用户是否点赞，更改两表点赞量+1/-1
const postLikeMock = mockjs.mock(
    "/mock/postLike",
    "post",
    (value: MockParams) => {
        let data: { userId: number; articleId: number } = JSON.parse(
            value.body
        );
        console.log("点赞解析请求", data);

        // 返回用户点赞表对应行数据
        const arti_like_one = arti_likes.find((item: Arti_Like) => {
            if (item.userId === data.userId) {
                return true;
            }
        });
        const article = articles.find((item: Article) => {
            if (item.id === data.articleId) {
                return true;
            }
        });
        if (article) {
            if (arti_like_one) {
                // 如果有该用户点赞信息
                let index = arti_like_one.articleIds.indexOf(data.articleId);
                if (index !== -1) {
                    arti_like_one.articleIds.splice(index, 1);
                    article.likes = article.likes === 0 ? 0 : article.likes - 1;
                } else {
                    // 点赞文章列表没有该articleId
                    arti_like_one.articleIds.push(data.articleId);
                    article.likes++;
                }
            } else {
                // 如果没有该用户点赞信息 增加
                arti_likes.push({
                    id: arti_likes.length,
                    userId: data.userId,
                    articleIds: [data.articleId],
                });
                article.likes++;
            }
        }

        fs.writeFile(
            "src/api/mock/modules/arti_like.json",
            JSON.stringify(arti_likes),
            (err: any) => {
                if (err) {
                    throw err;
                }
            }
        );
        fs.writeFile(
            "src/api/mock/modules/articles.json",
            JSON.stringify(articles),
            (err: any) => {
                if (err) {
                    throw err;
                }
            }
        );
        console.log(arti_like_one, article);

        return {
            code: 200,
            msg: "like success",
            data: arti_like_one,
        };
    }
);

// 读取文章点赞表
const getLikeMock = mockjs.mock("/mock/getLike", "get", (value: MockParams) => {
    const arti_like_one = arti_likes.find((item: Arti_Like) => {
        let data = JSON.parse(value.body);
        if (item.userId === data) {
            return true;
        }
    });
    if (arti_like_one) {
        return {
            code: 200,
            msg: "get all articles success",
            data: arti_like_one,
        };
    }
});

export {
    postLoginMOCK,
    getUserInfoMock,
    postArtiMock,
    getArtiMock,
    postLikeMock,
    getLikeMock,
};
