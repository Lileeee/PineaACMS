<template>
    <div id="publish">
        <div id="editor">
            <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                :mode="mode"
            />
            <Input
                v-model:value="title"
                :bordered="false"
                placeholder="title"
            />
            <Input
                v-model:value="description"
                :bordered="false"
                placeholder="description"
            />
            <Editor
                style="height: 480px; overflow-y: hidden"
                v-model="valueHtml"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="handleCreated"
            />
        </div>
        <Button class="publish" @click="publish">publish</Button>
    </div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Button, Input } from "ant-design-vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { postArti } from "@/api/index";
import useStore from "@/store";
const { useUser } = useStore();

const mode = "default";
const editorRef = shallowRef();
const title = ref("");
const description = ref("");
const valueHtml = ref("<p>hello</p>");
const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };

const handleCreated = (editor) => {
    editorRef.value = editor;
};
const publish = async () => {
    await postArti({
        authorId: useUser.id,
        title: title.value,
        description: description.value,
        content: valueHtml.value,
    });
};

onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
});
</script>

<style scoped lang="less">
#publish {
    height: 100%;
    .publish {
        float: right;
        margin-top: 20px;
        margin-right: 40px;
        padding: 0 30px;
    }
}
</style>
