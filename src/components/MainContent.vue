<template>
    <div id="main-content" v-for="item in mainlist">
        <component
            v-show="useActive.activeLeft === item.id"
            :is="item.component"
        ></component>
    </div>
</template>

<script setup lang="ts">
import Publish from "@/components/MainContent/Publish.vue";
import Library from "@/components/MainContent/Library.vue";
import MyArticles from "@/components/MainContent/MyArticles.vue";
import MyInfomation from "@/components/MainContent/MyInfomation.vue";
import ArticleMane from "@/components/MainContent/ArticleMana.vue";
import UserMana from "@/components/MainContent/UserMana.vue";

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
        component: MyArticles,
    },
    {
        id: "4",
        component: MyInfomation,
    },
    {
        id: "5",
        component: ArticleMane,
    },
    {
        id: "6",
        component: UserMana,
    },
];
</script>

<style lang="less"></style>
