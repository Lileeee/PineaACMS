<template>
    <div id="my-infomation">
        <div style="margin: 20px 0px 20px 10px">
            <span>{{ useUser.username }}</span>
            <Button @click="logOut" style="margin-left: 100px">log out</Button>
        </div>

        <a-divider />

        <a-form
            ref="formName"
            style="margin: 50px"
            :model="nameState"
            v-bind="layout"
            @finish="upName"
        >
            <a-form-item><h3>modify your username</h3></a-form-item>
            <a-form-item has-feedback label="Username" name="username">
                <a-input
                    v-model:value="nameState.username"
                    type="username"
                    autocomplete="off"
                />
            </a-form-item>
            <a-form-item has-feedback label="Password" name="password">
                <a-input
                    v-model:value="nameState.password"
                    type="password"
                    autocomplete="off"
                />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" html-type="submit">Submit</a-button>
                <a-button style="margin-left: 10px" @click="resetName"
                    >Reset</a-button
                >
            </a-form-item>
        </a-form>

        <a-divider />
        <a-form
            ref="formPass"
            style="margin: 50px"
            :model="passState"
            v-bind="layout"
            @finish="upPass"
        >
            <a-form-item><h3>modify your password</h3></a-form-item>
            <a-form-item has-feedback label="Old Pass" name="password">
                <a-input
                    v-model:value="passState.password"
                    type="password"
                    autocomplete="off"
                />
            </a-form-item>
            <a-form-item has-feedback label="new Pass" name="checkPass">
                <a-input
                    v-model:value="passState.checkPass"
                    type="password"
                    autocomplete="off"
                />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" html-type="submit">Submit</a-button>
                <a-button style="margin-left: 10px" @click="resetPass"
                    >Reset</a-button
                >
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup lang="ts">
import { Button, notification } from "ant-design-vue";
import { reactive, ref } from "vue";
import type { FormInstance } from "ant-design-vue";
import useStore from "@/store";
import { postPassword, postUserName } from "@/api";
import { FormStateName, FormStatePass } from "@/types";

// 用户登录 信息
const { useActive, useUser } = useStore();
const logOut = () => {
    useActive.setUserId(NaN);
};

// 表单布局样式
const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 14 },
};

// 表单1：修改用户名 数据
const formName = ref<FormInstance>();
const nameState = reactive<FormStateName>({
    username: "",
    password: "",
});
const upName = async (values: FormStateName) => {
    console.log(values, nameState);
    // 发请求 更改用户名
    const result = (
        await postUserName({ formdata: values, userId: useUser.id })
    ).data;

    if (result.code === 200) {
        logOut();
    } else {
        notification["warning"]({
            message: "Warning",
            description: result.msg,
            placement: "bottomRight",
        });
    }
};
const resetName = () => {
    if (formName.value) formName.value.resetFields();
};

// 表单2：修改密码 数据
const formPass = ref<FormInstance>();
const passState = reactive<FormStatePass>({
    password: "",
    checkPass: "",
});
const upPass = async (values: FormStatePass) => {
    console.log(values, passState);
    // 发请求 更改密码
    const result = (
        await postPassword({ formdata: values, userId: useUser.id })
    ).data;

    if (result.code === 200) {
        logOut();
    } else {
        notification["warning"]({
            message: "Warning",
            description: result.msg,
            placement: "bottomRight",
        });
    }
};
const resetPass = () => {
    if (formPass.value) formPass.value.resetFields();
};
</script>

<style scoped lang="less"></style>
