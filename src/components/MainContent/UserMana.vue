<template>
    <div id="user-management">
        <Table :dataSource="dataSource" :columns="columns">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'tags'">
                    <span>
                        <a-tag
                            v-for="tag in record.tags"
                            :key="tag"
                            :color="tag === 'sudo' ? 'green' : 'geekblue'"
                        >
                            {{ tag }}
                        </a-tag>
                    </span>
                </template>
            </template>
        </Table>
    </div>
</template>

<script lang="ts" setup>
import { getAllUser } from "@/api";
import { Table } from "ant-design-vue";
import { computed, onMounted, ref } from "vue";
import { User, User_ant_table } from "@/types";
const columns = [
    {
        title: "ID",
        dataIndex: "key",
        key: "key",
    },
    {
        title: "Username",
        dataIndex: "username",
        key: "username",
    },
    {
        title: "Password",
        dataIndex: "password",
        key: "password",
    },
    {
        title: "Tags",
        dataIndex: "tags",
        key: "tags",
    },
];

const allUser = ref<User[]>();
const dataSource = computed(() => {
    const arr: User_ant_table[] = [];
    if (allUser.value) {
        allUser.value.forEach((item: User) => {
            let newObj = {
                key: item.id,
                username: item.username,
                password: item.password,
                tags: [`${item.sudo ? "sudo" : ""}`],
            };
            arr.push(newObj);
        });
    }
    return arr;
});

onMounted(async () => {
    const resultUser = (await getAllUser()).data;
    if (resultUser.code === 200) {
        allUser.value = resultUser.data;
    }
});
</script>
