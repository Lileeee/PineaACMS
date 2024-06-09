<template>
    <div id="article-management">
        <Select
            v-model:value="selectKey"
            style="width: 200px; margin-bottom: 10px"
            @change="handleChange(selectKey)"
        >
            <SelectOption value="all">all articles</SelectOption>
            <SelectOptGroup label="Checked">
                <SelectOption value="checkedAll">all checked</SelectOption>
                <SelectOption value="published">published</SelectOption>
                <SelectOption value="backed">backed</SelectOption>
            </SelectOptGroup>
            <SelectOptGroup label="Unchecked">
                <SelectOption value="unchecked">all unchecked</SelectOption>
            </SelectOptGroup>
        </Select>
        <Table :columns="columns" :data-source="articleShow">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'title'">
                    <a>
                        {{ record.title }}
                    </a>
                </template>
                <template v-else-if="column.key === 'tags'">
                    <span>
                        <a-tag
                            v-for="tag in record.tags"
                            :key="tag"
                            :color="
                                tag === 'unchecked'
                                    ? 'volcano'
                                    : tag.length > 6
                                    ? 'green'
                                    : 'geekblue'
                            "
                        >
                            {{ tag }}
                        </a-tag>
                    </span>
                </template>
                <template v-else-if="column.key === 'actions'">
                    <span v-if="record.tags.includes('unchecked')">
                        <a @click="publish(record.key, 1)">publish</a>
                        <a-divider type="vertical" />
                        <a @click="back(record.key, 2)">back</a>
                    </span>
                    <span v-else>
                        <a disabled>no actions</a>
                    </span>
                </template>
            </template>
        </Table>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { Select, SelectOption, SelectOptGroup, Table } from "ant-design-vue";
import { getArti, postArtiStatus } from "@/api";
import { Article, Arti_ant_table } from "@/types";

const selectKey = ref("all");
const handleChange = (value: string) => {
    console.log(value);
};

const columns = [
    {
        title: "Title",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "Author ID",
        dataIndex: "authorid",
        key: "authorid",
    },
    {
        title: "Tags",
        dataIndex: "tags",
        key: "tags",
    },
    {
        title: "Actions",
        dataIndex: "actions",
        key: "actions",
    },
];
const articleList = ref<Article[]>();
const articleHandle = computed(() => {
    let arr: Arti_ant_table[] = [];
    if (articleList.value) {
        articleList.value.forEach((item: Article) => {
            let arrItem: {
                key: number;
                title: string;
                authorid: number;
                tags: string[];
            } = {
                key: 0,
                title: "",
                authorid: 0,
                tags: [""],
            };
            arrItem.key = item.id;
            arrItem.title = item.title;
            arrItem.authorid = item.authorId;
            if (item.status === 0) {
                arrItem.tags = ["unchecked"];
            } else if (item.status === 1) {
                arrItem.tags = ["published"];
            } else {
                arrItem.tags = ["backed"];
            }
            arr.push(arrItem);
        });
    }
    return arr;
});
const articleShow = computed(() => {
    return articleHandle.value.filter((item) => {
        if (selectKey.value === "all") {
            return articleHandle.value;
        } else if (selectKey.value === "checkedAll") {
            return (
                item.tags.includes("published") || item.tags.includes("backed")
            );
        } else {
            return item.tags.includes(selectKey.value);
        }
    });
});

const publish = async (value: number, status: number) => {
    const result = (await postArtiStatus({ id: value, status })).data;
};
const back = async (value: number, status: number) => {
    const result = (await postArtiStatus({ id: value, status })).data;
};

onMounted(async () => {
    const resultArti = (await getArti()).data;
    if (resultArti.code === 200) {
        articleList.value = resultArti.data;
    }
});
</script>
