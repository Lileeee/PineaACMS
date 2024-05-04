<template>
    <div id="my-infomation">
        <div></div>
        <Button @click="logOut">log out</Button>
    </div>
</template>

<script setup lang="ts">
import { Button } from "ant-design-vue";
import useStore from "@/store";
const { useActive } = useStore();
const logOut = () => {
    useActive.setIsLogin(false);
};
</script>

<style scoped lang="less"></style>
