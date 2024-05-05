import mockjs from "mockjs";
import users from "@/api/mock/modules/users.json"; // 数据
import { User, MockParams } from "@/types/index"; // 数据类型

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
            msg: "hhh",
            data: user,
        };
    }
);
console.log(postLoginMOCK, getUserInfoMock);
