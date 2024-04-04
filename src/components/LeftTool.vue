<template>
    <Menu v-model:selectedKeys="selectedKeys" mode="inline">
        <MenuItem key="1">
            <pie-chart-outlined />
            <span>Option 1</span>
        </MenuItem>
        <MenuItem key="2">
            <desktop-outlined />
            <span>Option 2</span>
        </MenuItem>
        <SubMenu key="sub1">
            <template #title>
                <span>
                    <user-outlined />
                    <span>User</span>
                </span>
            </template>
            <MenuItem key="3">Tom</MenuItem>
            <MenuItem key="4">Bill</MenuItem>
            <MenuItem key="5">Alex</MenuItem>
        </SubMenu>
        <SubMenu key="sub2">
            <template #title>
                <span>
                    <team-outlined />
                    <span>Team</span>
                </span>
            </template>
            <MenuItem key="6">Team 1</MenuItem>
            <MenuItem key="8">Team 2</MenuItem>
        </SubMenu>
        <MenuItem key="9">
            <file-outlined />
            <span>File</span>
        </MenuItem>
    </Menu>
</template>

<script setup lang="ts">
import {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
} from "@ant-design/icons-vue";
import { Menu, MenuItem, SubMenu } from "ant-design-vue";
import { ref } from "vue";
const selectedKeys = ref<string[]>(["1"]);
</script>

<style scoped lang="less">
.ant-menu {
    height: 98%;
}
</style>
