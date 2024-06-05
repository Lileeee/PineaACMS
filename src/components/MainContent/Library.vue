<template>
    <div id="library">
        <List
            item-layout="vertical"
            size="large"
            :pagination="{
                pageSize: 3,
            }"
            :data-source="showLists"
        >
            <template #renderItem="{ item }">
                <ListItem key="item.title">
                    <template #actions>
                        <span>
                            <component
                                @click="mark"
                                :is="$icons['StarTwoTone']"
                                style="margin-right: 8px"
                            />
                            {{ item.marks }}
                        </span>
                        <span>
                            <component
                                @click="like(userLike.userId, item.id)"
                                :is="
                                    userLike.articleIds.includes(item.id)
                                        ? $icons['HeartFilled']
                                        : $icons['HeartTwoTone']
                                "
                                :style="{ color: 'hotpink' }"
                                two-tone-color="hotpink"
                                style="margin-right: 8px"
                            />
                            {{ item.likes }}
                        </span>
                        <span>
                            <component
                                @click="comment"
                                :is="$icons['MessageTwoTone']"
                                two-tone-color="#52c41a"
                                style="margin-right: 8px"
                            />
                            {{ item.comments }}
                        </span>
                    </template>
                    <template #extra>
                        <img
                            width="272"
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                    </template>
                    <ListItemMeta :description="item.description">
                        <template #title>
                            <a href="#">{{ item.title }}</a>
                        </template>
                        <template #avatar
                            ><a-avatar src="https://joeschmoe.io/api/v1/random"
                        /></template>
                    </ListItemMeta>
                    {{ item.content }}
                </ListItem>
            </template>
        </List>
    </div>
</template>
<script lang="ts" setup>
// import {
//     StarTwoTone,
//     StarFilled,
//     HeartFilled,
//     HeartTwoTone,
//     MessageTwoTone,
//     MessageFilled,
// } from "@ant-design/icons-vue";
import { computed, onMounted, ref } from "vue";
import { List, ListItem, ListItemMeta } from "ant-design-vue";
import { Arti_Like, Article } from "@/types/index";
import { getArti, postLike, getLike } from "@/api/index";

import useStore from "@/store";
const { useUser } = useStore();

const listData = ref<Article[]>([]);
const showLists = computed(() => {
    let arr = [];
    for (const item of listData.value) {
        if (item.status === 1) {
            arr.push(item);
        }
    }
    return arr;
});
const userLike = ref<Arti_Like>({
    id: 0,
    userId: useUser.id,
    articleIds: [],
});

// 点赞文章
const like = async (userId: number, articleId: number) => {
    console.log("like", userId, articleId);
    // 点赞
    const result = (await postLike({ userId, articleId })).data;
    // 点赞成功则重新获取数据
    if (result.code === 200) {
        listData.value = (await getArti()).data.data; // 新列表数据 -> 显示文章点赞量
        userLike.value = result.data; // 用户点赞列表数据 -> 显示该文章是否被该用户点赞
    }
};

const mark = () => {
    console.log("mark");
};

const comment = () => {
    console.log("comment");
};

onMounted(async () => {
    const resultArti = (await getArti()).data;
    console.log("Library加载 用户数据", useUser.user, useUser.id);
    const resultLike = (await getLike(useUser.user.id)).data;
    if (resultArti.code === 200) {
        listData.value = resultArti.data;
    }
    if (resultLike.code === 200) {
        userLike.value = resultLike.data;
    }
});
</script>
