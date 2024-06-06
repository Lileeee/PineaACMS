<template>
    <div id="like-articles">
        <ListMine :status="1" from="userLike"></ListMine>
    </div>
</template>

<script setup>
import ListMine from "@/components/ReUse/ListMine.vue";
</script>
