<template>
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
                            @click="mark(userMark.userId, item.id)"
                            :is="
                                userMark.articleIds.includes(item.id)
                                    ? $icons['StarFilled']
                                    : $icons['StarTwoTone']
                            "
                            :style="{ color: '#4290f7' }"
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
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { List, ListItem, ListItemMeta } from "ant-design-vue";
import { Arti_Like, Arti_Mark, Article } from "@/types/index";
import { getArti, postLike, getLike, postMark, getMark } from "@/api/index";
import useStore from "@/store";
const { useUser } = useStore();

interface PropsType {
    from: string;
    status: number;
}
const props = defineProps<PropsType>();

const listData = ref<Article[]>([]);
const showLists = computed(() => {
    let arr = [];
    switch (props.from) {
        case "library":
            for (const item of listData.value) {
                if (item.status === props.status) {
                    arr.push(item);
                }
            }
            break;
        case "userPub":
            break;
        case "userLike":
            break;
        case "userMark":
            break;
        case "userBack":
            break;
        default:
            break;
    }
    return arr;
});
// const showLists = computed(() => {
//     let arr = [];
//     for (const item of listData.value) {
//         if (item.status === props.status) {
//             arr.push(item);
//         }
//     }
//     return arr;
// });
const userLike = ref<Arti_Like>({
    id: 0,
    userId: useUser.id,
    articleIds: [],
});
const userMark = ref<Arti_Mark>({
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
        console.log("点赞成功", result.data);
    }
};
// 收藏文章
const mark = async (userId: number, articleId: number) => {
    console.log("mark", userId, articleId, userMark);

    // 收藏
    const result = (await postMark({ userId, articleId })).data;
    console.log(result);
    // 收藏成功则重新获取数据
    if (result.code === 200) {
        listData.value = (await getArti()).data.data; // 新列表数据 -> 显示文章点赞量
        userMark.value = result.data; // 用户点赞列表数据 -> 显示该文章是否被该用户点赞
        console.log("收藏成功", result.data);
    }
};

const comment = () => {
    console.log("comment");
};

onMounted(async () => {
    console.log("ListMine", useUser.user, useUser.id);

    const resultArti = (await getArti()).data;
    const resultLike = (await getLike(useUser.id)).data;
    const resultMark = (await getMark(useUser.id)).data;

    if (resultArti.code === 200) {
        listData.value = resultArti.data;
    }
    if (resultLike.code === 200) {
        userLike.value = resultLike.data;
    }
    if (resultMark.code === 200) {
        userMark.value = resultMark.data;
        console.log("resultMark", resultMark.data);
    }
});
</script>
