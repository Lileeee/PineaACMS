<template>
    <div id="published-articles">
        <ListMine :status="1" from="userPub"></ListMine>
    </div>
</template>

<script setup>
import ListMine from "@/components/ReUse/ListMine.vue";
</script>
