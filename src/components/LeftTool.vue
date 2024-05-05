<template>
    <Menu
        id="left-tool"
        v-model:selectedKeys="selectedKeys"
        :select="useActive.setActiveLeft(selectedKeys[0])"
        mode="inline"
    >
        <div class="logo">Pinea Article</div>
        <MenuItem key="1">
            <pie-chart-outlined />
            <span>publish</span>
        </MenuItem>
        <MenuItem key="2">
            <desktop-outlined />
            <span>library</span>
        </MenuItem>
        <SubMenu key="sub1">
            <template #title>
                <span>
                    <team-outlined />
                    <span>personal center</span>
                </span>
            </template>
            <MenuItem key="3">my articles</MenuItem>
            <MenuItem key="4">my infomation</MenuItem>
        </SubMenu>
        <SubMenu key="sub2" v-if="useUser.sudo">
            <template #title>
                <span>
                    <team-outlined />
                    <span>System Control</span>
                </span>
            </template>
            <MenuItem key="5">Article Management</MenuItem>
            <MenuItem key="6">User Management</MenuItem>
        </SubMenu>
    </Menu>
</template>

<script setup lang="ts">
import {
    PieChartOutlined,
    DesktopOutlined,
    TeamOutlined,
} from "@ant-design/icons-vue";
import { Menu, MenuItem, SubMenu } from "ant-design-vue";
import { ref } from "vue";
import useStore from "@/store";
const { useActive, useUser } = useStore();
const selectedKeys = ref<string[]>([""]);
</script>

<style scoped lang="less">
#left-tool {
    height: 100%;
    .logo {
        width: 100%;
        height: 30px;
        line-height: 30px;
        padding-left: 40px;
        margin: 15px 0;
        font-size: 18px;
        font-weight: 800;
        border-right: 1px solid transparent;
        overflow: hidden;
        word-break: break-all;
        animation: typing 2s steps(42, end);
    }
    /* 打印效果 */
    @keyframes typing {
        from {
            width: 0;
            color: aliceblue;
        }

        to {
            width: 100%;
            border: none !important;
        }
    }
}
</style>
