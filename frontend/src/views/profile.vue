<template>
    <app-container>
        <div class="profile">
            <br>
            <p class="profile-info">Ссылка на гитхаб: <a class="profile-link" :href="userStore.user.html_url">
                {{ userStore.user.login }}
            </a></p>
        </div>
    </app-container>
</template>

<script setup lang="ts">
import AppContainer from "@/shared/components/app-container.vue";
import {useUserStore} from "@/app/store";

const userStore = useUserStore()

</script>

<style scoped lang="scss">
.profile-link {
  color: $color-blue;
  font-size: 24px;
  line-height: 16px;
}

.profile-info {
    font-size: 24px;
}


</style>
