<template>
    <Login v-if="!useActive.userId"></Login>
    <Home v-else></Home>
</template>

<script setup lang="ts">
import Home from "@/view/Home.vue";
import Login from "@/view/Login.vue";

import useStore from "@/store";
const { useActive } = useStore();
</script>

<style scoped></style>
