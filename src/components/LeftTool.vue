<template>
    <Menu id="left-tool" v-model:selectedKeys="selectedKeys" mode="inline">
        <div class="logo">Pinea Article</div>
        <MenuItem key="publish">
            <pie-chart-outlined />
            <span>publish</span>
        </MenuItem>
        <MenuItem key="browse">
            <desktop-outlined />
            <span>library</span>
        </MenuItem>
        <SubMenu key="sub2">
            <template #title>
                <span>
                    <team-outlined />
                    <span>personal center</span>
                </span>
            </template>
            <MenuItem key="6">my articles</MenuItem>
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
const selectedKeys = ref<string[]>(["1"]);
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
