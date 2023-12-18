<template>
    <header class="app-header">
        <app-container class="app-header__container">
            <router-link to="/" class="logo">URFU Course Work</router-link>
            <app-user-bar/>
        </app-container>
    </header>
</template>

<script setup>
import AppContainer from "@/shared/components/app-container.vue";
import AppUserBar from "@/widgets/app-user-bar/app-user-bar.vue";
</script>

<style lang="scss" scoped>
.app-header {
  height: 56px;
  display: flex;
  align-items: center;
  background: #020409;
  border-bottom: 1px solid #22262C;

  .logo {
    font-size: 25px;
    font-weight: 700;
    cursor: pointer;
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;

  }

}
</style>
