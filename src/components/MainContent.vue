<template>
    <div>
        <Button @click="useTheme.toggleMode">切换模式</Button>
        <Select v-model:value="useTheme.mode">
            <SelectOption value="dark"></SelectOption>
            <SelectOption value="light"></SelectOption>
        </Select>

        <!-- <Editor /> -->
    </div>
</template>

<script setup lang="ts">
import { Select, SelectOption, Button } from "ant-design-vue";
// import { Editor } from "novel-vue";
// import "novel-vue/dist/style.css";
import useStore from "@/store";
const { useTheme } = useStore();
</script>

<style lang="less"></style>
