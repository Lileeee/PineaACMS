<template>
    <div id="my-infomation">
        <div>{{ useUser.username }}</div>
        <Button @click="logOut">log out</Button>
    </div>
</template>

<script setup lang="ts">
import { Button } from "ant-design-vue";
import useStore from "@/store";
const { useActive, useUser } = useStore();
const logOut = () => {
    useActive.setUserId(NaN);
};
</script>

<style scoped lang="less"></style>
