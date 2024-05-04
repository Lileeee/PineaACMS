import mockjs from "mockjs";
import users from "@/api/mock/modules/users.json"; // 数据
import { User, MockParams } from "@/types/index"; // 数据类型

// 用户登录
const loginMOCK = mockjs.mock("/mock/login", "post", (value: MockParams) => {
    let data: User = JSON.parse(value.body);

    // 判断是否有该用户 有-> 判断密码 | 无-> 报错
    if (users.some((item: User) => item.username === data.username)) {
        if (
            users.some(
                (item: User) =>
                    item.username === data.username &&
                    item.password === data.password
            )
        ) {
            return {
                code: 200,
                msg: "Success",
                data: null,
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
});
console.log(loginMOCK);
