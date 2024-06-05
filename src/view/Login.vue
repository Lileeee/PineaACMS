<template>
    <ConfigProvider :theme="{ token: { colorPrimary: '#000' } }">
        <div id="login">
            <div class="content">
                <div class="top">
                    <div class="logo">Pinea Articleeeeeeeeeeeeeeee</div>
                    <div class="fonts">
                        <span> Your AI Auto-complete Assistant </span>
                    </div>
                </div>
                <div class="main">
                    <Input
                        v-model:value="user.username"
                        :bordered="false"
                        placeholder="username"
                    />
                    <br />
                    <InputPassword
                        v-model:value="user.password"
                        :bordered="false"
                        placeholder="password"
                        @keyup.enter="login"
                    />
                    <div>
                        <div style="display: inline-block; margin-right: 10px">
                            <Button @click="login">login</Button>
                        </div>
                        <div style="display: inline-block">
                            <Button @click="login">register</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ConfigProvider>
</template>

<script setup lang="ts">
import {
    ConfigProvider,
    Input,
    InputPassword,
    Button,
    notification,
} from "ant-design-vue";
import { ref } from "vue";
import { postLogin, getUserInfo } from "@/api/index.ts";
import { User, MockResult } from "@/types/index"; // 数据类型
import useStore from "@/store";
const { useActive, useUser } = useStore();
const user = ref<User>({
    id: NaN,
    username: "",
    password: "",
});

// 登录
const login = async () => {
    // 判空
    if (!(user.value.username && user.value.password)) {
        notification["warning"]({
            message: "Warning",
            description: "Username or password is empty.",
            placement: "bottomRight",
        });
        return;
    }

    // 发请求
    const resultLogin: MockResult = (await postLogin(user.value)).data;
    if (resultLogin.code === 200) {
        // 记录useId
        useActive.setUserId(resultLogin.data.userId);

        // 请求用户信息
        const resultGetUser = (await getUserInfo(useActive.userId)).data;

        // 存储用户信息
        if (resultGetUser.code === 200) {
            useUser.setUser(resultGetUser.data);
        }
        console.log("存储用户", useUser.user, useUser.id);
    } else {
        notification["error"]({
            message: "error",
            description: resultLogin.msg,
            placement: "bottomRight",
        });
    }
};
</script>

<style scoped lang="less">
#login {
    position: relative;
    width: 100%;
    height: 100%;

    .content {
        position: absolute;
        width: 900px;
        height: 600px;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgb(255, 255, 255);
        box-shadow: inset 0 -3em 3em rgba(0, 0, 0, 0.1),
            0.3em 0.3em 1em rgba(0, 0, 0, 0.3);

        .top {
            height: 100px;
            margin-bottom: 150px;
            .logo {
                position: absolute;
                left: 50%;
                width: 100%;
                height: 50px;
                line-height: 50px;
                color: #b3b3b3e0;
                margin: 200px 0;
                font-size: 30px;
                font-weight: 800;
                border-right: 1px solid transparent;
                overflow: hidden;
                word-break: break-all;
                animation: typing 2s steps(42, end);
            }
            /* 打印效果 */
            @keyframes typing {
                from {
                    left: 50%;
                    width: 0;
                    color: rgba(255, 255, 255, 0.736);
                }

                to {
                    width: 100%;
                    border: none !important;
                }
            }

            .fonts {
                span {
                    padding-left: 5px;
                    color: #95959596;
                }
            }
        }

        .main {
            width: fit-content;
            margin: auto;
            input,
            .ant-input-password {
                margin-bottom: 25px;
                width: 700px;
                height: 50px;
                color: rgb(189, 189, 189);
                border-bottom: 1px solid #dadada96;
            }
        }
    }
}
</style>
