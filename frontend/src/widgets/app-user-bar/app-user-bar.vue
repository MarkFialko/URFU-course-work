<template>
    <div ref="target" class="app-user-bar">
        <spinner v-if="userStore.isLoading"/>
        <button v-else @click="isMenuBarOpen = !isMenuBarOpen" class="app-user-bar__round">
            <img v-if="userStore.user.avatar_url" class="app-user-image" :src="userStore.user.avatar_url"
                 :alt="userStore.user.login">
        </button>
        <ul class="app-user-bar__menu app-bar-menu" :class="{open: isMenuBarOpen}">
            <li class="app-bar-profile profile-bar">
                <button @click="isMenuBarOpen = !isMenuBarOpen" class="app-user-bar__round">

                </button>
                <div class="profile-bar__text">
                    <p class="profile-bar__title">{{ userStore.user?.login }}</p>
<!--                    <p class="profile-bar__subtitle">{{ userStore.user }}</p>-->
                </div>
            </li>
            <li v-if="!userStore.user?.login" @click="githubAuthorization" class="app-bar-menu__item">
                Войти
            </li>
            <li v-if="userStore.user && userStore.isAuth" class="app-bar-menu__item">
                <router-link class="app-bar-link" to="profile">
                    Профиль
                </router-link>
            </li>
            <li v-if="userStore.user && userStore.isAuth" @click="logout" class="app-bar-menu__item">
                Выйти
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {GITHUB_OAUTH_URL} from "@/api/github/github.constants";
import GithubService from "@/api/github/github.service";
import {useUserStore} from "@/app/store";
import Spinner from "@/shared/components/spinner.vue";
import {useRouter} from "vue-router";

const router = useRouter()

const target = ref(null)

const userStore = useUserStore()

const isMenuBarOpen = ref(false)

const githubAuthorization = () => {
    window.location.assign(GITHUB_OAUTH_URL)
    isMenuBarOpen.value = false
}

const logout = async () => {
    await GithubService.logout()
    isMenuBarOpen.value = false
    router.push('/')
}


const clickOutside = (e: any) => {
    if (!(e === target.value || target.value?.contains(e.target))) {
        isMenuBarOpen.value = false
    }
}

watch(isMenuBarOpen, () => {
    if (isMenuBarOpen.value) {
        document.addEventListener('click', clickOutside)
    } else {

        document.removeEventListener('click', clickOutside)
    }

})

</script>

<style scoped lang="scss">
.app-user-bar {
  position: relative;

  &__round {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid #22262C;
    color: $text-color;
    background: $color-green;
    transition: background .2s;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 100%;

    .app-user-image {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }


    &:hover, &:focus {
      outline: none;
      background: $color-green-hover;
    }
  }

  &__menu {
    background: #020409;
    transform: scale(0);
    transition: transform .2s;
    min-width: 280px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    position: absolute;
    right: 0;
    top: calc(100% + 20px);
    padding: 16px 10px;
    border-radius: 10px;
    border: 1px solid #22262C;

    &.open {
      transform: scale(1);
    }

    @media (max-width: $sm) {
      width: calc(100vw - 40px);
    }

  }
}


.app-bar-menu {
  background: #171B21;

  .app-bar-link {
    width: 100%;
    height: 100%;
    display: flex;

  }

  &__item {
    cursor: pointer;
    font-size: 14px;
    padding: 8px 10px;
    border: 1px solid #22262C;
    background: #22262C;
    transition: background .2s;
    border-radius: 6px;

    &:hover, &:focus {
      background: #272c33;
    }
  }
}


.profile-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 16px;
  border-bottom: 1px solid #22262C;

  &__title {

  }

  &__subtitle {
    opacity: 0.6;
  }

  &__text {
    font-size: 13px;
    display: flex;
    flex-direction: column;
    line-height: 100%;
    gap: 4px;
  }
}

</style>
