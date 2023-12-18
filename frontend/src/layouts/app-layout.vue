<template>
    <div class="app-layout">
        <app-header/>
        <main class="main">
            <slot/>
        </main>
        <app-footer/>
    </div>
</template>

<script setup>

import AppHeader from "@/widgets/app-header.vue";
import AppFooter from "@/widgets/app-footer.vue";
</script>

<style scoped>
.app-layout {
    display: flex;
    flex-direction: column;
    .main {
        padding-top: 20px;
    }
}
</style>
