// const fs = window.require("fs");
const fs = window.WindowAPI.fs;
import mockjs from "mockjs";
import users from "@/api/mock/modules/users.json";
import articles from "@/api/mock/modules/articles.json";
import user_artis from "@/api/mock/modules/user_arti.json";
import arti_likes from "@/api/mock/modules/arti_like.json";
import arti_marks from "@/api/mock/modules/arti_mark.json";
// import arti_coms from "@/api/mock/modules/arti_com.json";

import {
    User,
    MockParams,
    Article,
    // Arti_Com,
    Arti_Like,
    Arti_Mark,
    User_Arti,
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
                "E:\\testCE\\PineaACMS\\src\\api\\mock\\modules\\articles.json",
                JSON.stringify(articles),
                (err: any) => {
                    if (err) {
                        throw err;
                    }
                }
            );
            // 用户文章表
            fs.writeFile(
                "E:\\testCE\\PineaACMS\\src\\api\\mock\\modules\\user_arti.json",
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

        // 返回用户点赞表对应行数据
        const arti_like_one = arti_likes.find((item: Arti_Like) => {
            if (item.userId === data.userId) {
                return true;
            }
        });
        // 返回被点赞文章数据
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
                    id: arti_likes.length + 1,
                    userId: data.userId,
                    articleIds: [data.articleId],
                });
                article.likes++;
            }
        }

        fs.writeFile(
            "E:\\testCE\\PineaACMS\\src\\api\\mock\\modules\\arti_like.json",
            JSON.stringify(arti_likes),
            (err: any) => {
                if (err) {
                    throw err;
                }
            }
        );
        fs.writeFile(
            "E:\\testCE\\PineaACMS\\src\\api\\mock\\modules\\articles.json",
            JSON.stringify(articles),
            (err: any) => {
                if (err) {
                    throw err;
                }
            }
        );

        return {
            code: 200,
            msg: "like success",
            data: arti_like_one,
        };
    }
);

// 读取文章点赞表
const getLikeMock = mockjs.mock("/mock/getLike", "get", (value: MockParams) => {
    let data = JSON.parse(value.body);
    // 寻找该用户点赞文章列表
    const arti_like_one = arti_likes.find((item: Arti_Like) => {
        if (item.userId === data) {
            return true;
        }
    });
    if (arti_like_one) {
        // 如果有数据
        return {
            code: 200,
            msg: "get all likesinfo success",
            data: arti_like_one,
        };
    } else {
        // 如果没数据，创建数据
        const new_arti_like_one = {
            id: arti_likes.length + 1,
            userId: data,
            articleIds: [],
        };
        arti_likes.push(new_arti_like_one);
        fs.writeFile(
            "E:\\testCE\\PineaACMS\\src\\api\\mock\\modules\\arti_like.json",
            JSON.stringify(arti_likes),
            (err: any) => {
                if (err) {
                    throw err;
                }
            }
        );
        return {
            code: 200,
            msg: "get all likesinfo success",
            data: new_arti_like_one,
        };
    }
});

// 收藏文章
// 逻辑：查找用户收藏表数据，根据用户是否收藏，更改两表收藏量+1/-1
const postMarkMock = mockjs.mock(
    "/mock/postMark",
    "post",
    (value: MockParams) => {
        let data: { userId: number; articleId: number } = JSON.parse(
            value.body
        );

        // 返回用户收藏表对应行数据
        const arti_mark_one = arti_marks.find((item: Arti_Mark) => {
            if (item.userId === data.userId) {
                return true;
            }
        });
        // 返回被点赞文章数据
        const article = articles.find((item: Article) => {
            if (item.id === data.articleId) {
                return true;
            }
        });

        if (article) {
            if (arti_mark_one) {
                // 如果有该用户收藏信息
                let index = arti_mark_one.articleIds.indexOf(data.articleId);
                if (index !== -1) {
                    arti_mark_one.articleIds.splice(index, 1);
                    article.marks = article.marks === 0 ? 0 : article.marks - 1;
                } else {
                    // 点赞文章列表没有该articleId
                    arti_mark_one.articleIds.push(data.articleId);
                    article.marks++;
                }
            } else {
                // 如果没有该用户点赞信息 增加
                arti_marks.push({
                    id: arti_marks.length + 1,
                    userId: data.userId,
                    articleIds: [data.articleId],
                });
                article.marks++;
            }
        }

        fs.writeFile(
            "E:\\testCE\\PineaACMS\\src\\api\\mock\\modules\\arti_mark.json",
            JSON.stringify(arti_marks),
            (err: any) => {
                if (err) {
                    throw err;
                }
            }
        );
        fs.writeFile(
            "E:\\testCE\\PineaACMS\\src\\api\\mock\\modules\\articles.json",
            JSON.stringify(articles),
            (err: any) => {
                if (err) {
                    throw err;
                }
            }
        );

        return {
            code: 200,
            msg: "mark success",
            data: arti_mark_one,
        };
    }
);

// 读取文章收藏表
const getMarkMock = mockjs.mock("/mock/getMark", "get", (value: MockParams) => {
    let data = JSON.parse(value.body);
    // 寻找该用户点赞文章列表
    const arti_mark_one = arti_marks.find((item: Arti_Mark) => {
        if (item.userId === data) {
            return true;
        }
    });
    if (arti_mark_one) {
        // 如果有数据
        return {
            code: 200,
            msg: "get all marksinfo success",
            data: arti_mark_one,
        };
    } else {
        // 如果没数据，创建数据
        const new_arti_mark_one = {
            id: arti_marks.length + 1,
            userId: data,
            articleIds: [],
        };
        arti_marks.push(new_arti_mark_one);
        fs.writeFile(
            "E:\\testCE\\PineaACMS\\src\\api\\mock\\modules\\arti_mark.json",
            JSON.stringify(arti_marks),
            (err: any) => {
                if (err) {
                    throw err;
                }
            }
        );
        return {
            code: 200,
            msg: "get all likesinfo success",
            data: new_arti_mark_one,
        };
    }
});

// 读取用户文章表
const getUserArtiMock = mockjs.mock(
    "/mock/getUserArti",
    "get",
    (value: MockParams) => {
        let data = JSON.parse(value.body);
        const user_arti = user_artis.find((item: User_Arti) => {
            if (item.authorId === data) {
                return true;
            }
        });
        if (user_arti) {
            return {
                code: 200,
                msg: "get user arti info success",
                data: user_arti,
            };
        } else {
            return {
                code: 404,
                msg: "the user no arti",
            };
        }
    }
);

// 设置文章状态
const postArtiStatusMock = mockjs.mock(
    "/mock/postArtiStatus",
    "post",
    (value: MockParams) => {
        let data = JSON.parse(value.body);
        articles.forEach((item: Article) => {
            if (item.id === data.id) {
                item.status = data.status;
            }
        });
        fs.writeFile(
            "E:\\testCE\\PineaACMS\\src\\api\\mock\\modules\\articles.json",
            JSON.stringify(articles),
            (err: any) => {
                if (err) {
                    throw err;
                }
            }
        );
        return {
            code: 200,
            msg: "set success",
            data: data,
        };
    }
);

// 读取全部用户
const getAllUserMock = mockjs.mock("/mock/getAllUser", "get", () => {
    return {
        code: 200,
        msg: "get all user success",
        data: users,
    };
});

// 修改用户名
const postUserNameMock = mockjs.mock(
    "/mock/postUserName",
    "post",
    (value: MockParams) => {
        let data = JSON.parse(value.body);
        const user = users.find((item: User) => {
            if (item.id === data.userId) {
                return true;
            }
        });
        if (data.formdata.password && data.formdata.username && user) {
            if (user.password === data.formdata.password) {
                user.username = data.formdata.username;
                fs.writeFile(
                    "E:\\testCE\\PineaACMS\\src\\api\\mock\\modules\\users.json",
                    JSON.stringify(users),
                    (err: any) => {
                        if (err) {
                            throw err;
                        }
                    }
                );
                return {
                    code: 200,
                    msg: "set success",
                };
            } else
                return {
                    code: 404,
                    msg: "password is wrong",
                };
        } else
            return {
                code: 404,
                msg: "username or password is empty",
            };
    }
);

// 修改密码
const postPasswordMock = mockjs.mock(
    "/mock/postPassword",
    "post",
    (value: MockParams) => {
        let data = JSON.parse(value.body);
        const user = users.find((item: User) => {
            if (item.id === data.userId) {
                return true;
            }
        });
        if (data.formdata.password && data.formdata.checkPass && user) {
            if (user.password === data.formdata.password) {
                user.password = data.formdata.checkPass;
                fs.writeFile(
                    "E:\\testCE\\PineaACMS\\src\\api\\mock\\modules\\users.json",
                    JSON.stringify(users),
                    (err: any) => {
                        if (err) {
                            throw err;
                        }
                    }
                );
                return {
                    code: 200,
                    msg: "set success",
                };
            } else
                return {
                    code: 404,
                    msg: "password is wrong",
                };
        } else
            return {
                code: 404,
                msg: "input is empty",
            };
    }
);

// 更改文章数据
const postArtiModifyMock = mockjs.mock(
    "/mock/postArtiModify",
    "post",
    (value: MockParams) => {
        let data = JSON.parse(value.body);
        const article = articles.find((item: Article) => {
            if (item.id === data.id) {
                return true;
            }
        });
        if (article) {
            article.content = data.content;
            article.title = data.title;
            article.description = data.description;
            article.status = data.status;
            fs.writeFile(
                "E:\\testCE\\PineaACMS\\src\\api\\mock\\modules\\articles.json",
                JSON.stringify(articles),
                (err: any) => {
                    if (err) {
                        throw err;
                    }
                }
            );
            return {
                code: 200,
                data: article,
            };
        } else
            return {
                code: 404,
                data: null,
            };
    }
);

export {
    postLoginMOCK,
    getUserInfoMock,
    postArtiMock,
    getArtiMock,
    postLikeMock,
    getLikeMock,
    postMarkMock,
    getMarkMock,
    getUserArtiMock,
    postArtiStatusMock,
    getAllUserMock,
    postUserNameMock,
    postPasswordMock,
    postArtiModifyMock,
};
