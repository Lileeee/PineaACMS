<template>
    <div id="article-content">
        <Button
            @click="useActive.setActiveLeft('2')"
            style="margin-top: 20px; margin-left: 20px"
        >
            <LeftCircleTwoTone></LeftCircleTwoTone> go back
        </Button>

        <a-divider></a-divider>

        <div>
            <Editor
                style="height: 480px; overflow-y: hidden"
                v-model="valueHtml"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="handleCreated"
            />
        </div>
    </div>
</template>
<script setup>
import { ref, shallowRef } from "vue";
import { Button } from "ant-design-vue";
import { LeftCircleTwoTone } from "@ant-design/icons-vue";
import { Editor } from "@wangeditor/editor-for-vue";
import useStore from "@/store";
const { useActive } = useStore();

const mode = "default";
const editorRef = shallowRef();
const valueHtml = ref("<p>hello</p>");
const editorConfig = { placeholder: "请输入内容...", readOnly: true };
const handleCreated = (editor) => {
    editorRef.value = editor;
};
</script>
