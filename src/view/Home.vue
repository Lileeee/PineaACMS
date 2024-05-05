<template>
    <ConfigProvider :theme="useTheme.themeConfig">
        <Layout id="home">
            <LayoutSider class="sider">
                <LeftTool></LeftTool>
            </LayoutSider>
            <Layout>
                <LayoutHeader>
                    <Header></Header>
                </LayoutHeader>
                <LayoutContent class="content">
                    <MainContent></MainContent>
                </LayoutContent>
                <LayoutFooter class="footer">
                    <Footer></Footer>
                </LayoutFooter>
            </Layout>
        </Layout>
    </ConfigProvider>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { ConfigProvider, Layout } from "ant-design-vue";
import LeftTool from "@/components/LeftTool.vue";
import Header from "@/components/Header.vue";
import MainContent from "@/components/MainContent.vue";
import Footer from "@/components/Footer.vue";
import { getUserInfo } from "@/api/index.ts";
import useStore from "@/store";
const { useActive, useTheme, useUser } = useStore();

const LayoutSider = Layout.Sider;
const LayoutHeader = Layout.Header;
const LayoutFooter = Layout.Footer;
const LayoutContent = Layout.Content;

onMounted(async () => {
    // 请求用户信息
    const result = (await getUserInfo(useActive.userId)).data;

    // 存储用户信息
    if (result.code === 200) {
        useUser.setUser(result.data);
    }
    console.log("hhh", useUser.user);
});
</script>

<style scoped lang="less">
#home {
    height: 100%;

    .sider {
        height: 100%;
    }
}
</style>
