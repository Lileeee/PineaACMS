<template>
    <div id="main-content" v-for="item in mainlist">
        <component
            v-show="useActive.activeLeft === item.id"
            :is="item.component"
        ></component>
    </div>
</template>

<script setup lang="ts">
import Library from "@/components/MainContent/Library.vue";
import MyArticle from "@/components/MainContent/MyArticle.vue";
import Publish from "@/components/MainContent/Publish.vue";

import useStore from "@/store";
const { useActive } = useStore();
const mainlist = [
    {
        id: "1",
        component: Publish,
    },
    {
        id: "2",
        component: Library,
    },
    {
        id: "3",
        component: MyArticle,
    },
];
</script>

<style lang="less"></style>
