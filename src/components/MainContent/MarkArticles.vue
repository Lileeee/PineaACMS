<template>
    <div id="mark-articles">
        <ListMine :status="1" from="userMark"></ListMine>
    </div>
</template>

<script setup>
import ListMine from "@/components/ReUse/ListMine.vue";
</script>
