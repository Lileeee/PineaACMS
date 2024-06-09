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
// import LibraryT from "@/components/MainContent/LibraryT.vue";
import PubArticles from "@/components/MainContent/PubArticles.vue";
import LikeArticles from "@/components/MainContent/LikeArticles.vue";
import MarkArticles from "@/components/MainContent/MarkArticles.vue";
import BackArticles from "@/components/MainContent/BackArticles.vue";
import MyInfomation from "@/components/MainContent/MyInfomation.vue";
import ArticleMana from "@/components/MainContent/ArticleMana.vue";
import ArticleContent from "@/components/MainContent/ArticleContent.vue";
import UserMana from "@/components/MainContent/UserMana.vue";
import SysNotifi from "@/components/MainContent/SysNotifi.vue";

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
        component: PubArticles,
    },
    {
        id: "4",
        component: LikeArticles,
    },
    {
        id: "5",
        component: MarkArticles,
    },
    {
        id: "6",
        component: BackArticles,
    },
    {
        id: "7",
        component: MyInfomation,
    },
    {
        id: "8",
        component: ArticleMana,
    },
    {
        id: "9",
        component: UserMana,
    },
    {
        id: "10",
        component: SysNotifi,
    },
    {
        id: "11",
        component: ArticleContent,
    },
];
</script>

<style lang="less"></style>
