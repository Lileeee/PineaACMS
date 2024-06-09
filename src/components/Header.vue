<template>
    <div id="header">
        <div class="title">
            Welcome your personal Article Lib
            <div style="float: right">
                <Button @click="useTheme.toggleMode">切换模式</Button>
                <Select v-model:value="useTheme.mode">
                    <SelectOption value="dark"></SelectOption>
                    <SelectOption value="light"></SelectOption>
                </Select>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Select, SelectOption, Button } from "ant-design-vue";
import useStore from "@/store";
const { useTheme } = useStore();
</script>

<style scoped lang="less">
#header {
    width: 100%;
    height: 60px;
    .title {
        width: 100%;
        height: 100%;
        font-weight: 800;
        word-break: keep-all;
        white-space: nowrap;
    }
}
</style>
