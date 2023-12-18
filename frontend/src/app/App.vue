<template>
    <app-layout>
        <router-view/>
    </app-layout>
</template>

<script setup>

import AppLayout from "@/layouts/app-layout.vue";
import { onMounted} from "vue";
import {useUserStore} from "@/app/store";

const userStore = useUserStore()

onMounted(async ()=> {
        await userStore.checkAuth()
        await userStore.getFavorites()
})

</script>

<style lang="scss">
</style>
