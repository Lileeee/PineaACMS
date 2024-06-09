<template>
    <div id="publishT">
        <div id="editorT">
            <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editorRefT"
                :defaultConfig="toolbarConfig"
                :mode="mode"
            />
            <Input
                v-model:value="useActive.activeArti.title"
                :bordered="false"
                placeholder="title"
            />
            <Input
                v-model:value="useActive.activeArti.description"
                :bordered="false"
                placeholder="description"
            />
            <Editor
                style="height: 480px; overflow-y: hidden"
                v-model="useActive.activeArti.content"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="handleCreated"
            />
        </div>
        <Button class="publishT" @click="publish">publish</Button>
    </div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Button, Input } from "ant-design-vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { postArtiModify } from "@/api/index";
import useStore from "@/store";
const { useUser, useActive } = useStore();

const mode = "default";
const editorRefT = shallowRef();
const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };

const handleCreated = (editor) => {
    editorRefT.value = editor;
};
const publish = async () => {
    const result = (
        await postArtiModify({
            id: useActive.activeArti.id,
            title: useActive.activeArti.title,
            description: useActive.activeArti.description,
            content: useActive.activeArti.content,
            status: 0,
        })
    ).data;
    console.log("publish", result);
};

onBeforeUnmount(() => {
    const editor = editorRefT.value;
    if (editor == null) return;
    editor.destroy();
});
</script>

<style scoped lang="less">
#publishT {
    height: 100%;
    .publishT {
        float: right;
        margin-top: 20px;
        margin-right: 40px;
        padding: 0 30px;
    }
}
</style>
