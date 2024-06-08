<template>
    <div id="article-management">
        <Menu
            v-model:selectedKeys="selectedKeys"
            :select="change(selectedKeys[0])"
        >
            <MenuItem key="unchecked">
                <a-icon type="info-circle" />
                <info-circle-outlined />
                <span>unchecked</span>
            </MenuItem>
            <MenuItem key="checked">
                <check-circle-outlined />
                <span>checked</span>
            </MenuItem>
        </Menu>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Menu, MenuItem } from "ant-design-vue";
import { InfoCircleOutlined, CheckCircleOutlined } from "@ant-design/icons-vue";

const selectedKeys = ref<string[]>([""]);
const change = (key: string) => {
    console.log(key);
};
</script>
