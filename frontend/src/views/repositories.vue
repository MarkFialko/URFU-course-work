<template>
    <app-container>
        <div class="repositories">
            <app-input v-model="queryString" label="Введите название репозитория" placeholder="Репозиторий"/>


            <template v-if="repositories.length === 0 && !isLoading && queryString">
                <div class="repositories__empty">
                    <p>По данному запросу ничего не найдено :(</p>
                </div>
            </template>

            <template v-if="isLoading">
                <div class="repositories__loading">
                    <p>Загрузка репозиториев</p>
                    <spinner/>
                </div>
            </template>

            <div v-else class="repositories__content">
                <div
                        class="repository"
                        v-for="repo in repositories"
                        :key="repo.id"
                >

                    <div class="repository-owner">
                        <img class="repository-owner-image" :src="repo.owner.avatar_url" :alt="repo.owner.login">
                        <a class="repository-name" target="_blank" rel="noindex" :href="repo.html_url">{{
                            repo.name
                            }}</a>
                    </div>
                    <app-button v-if="!userStore.isAuth" disabled variant="outline">
                        Авторизутейсь через github
                    </app-button>
                    <template v-else>
                        <app-button :disabled="repo.loading" :loading="repo.loading"
                                    v-if="!userStore.favorites?.includes(repo.id.toString())" @click="sendToFavorite(repo)">
                            Добавить в избранное
                        </app-button>
                        <app-button :disabled="repo.loading" :loading="repo.loading" variant="outline"
                                    v-if="userStore.favorites?.includes(repo.id.toString())" @click="deleteFromFavorite(repo)">
                            Удалить из избранного
                        </app-button>
                    </template>
                </div>
            </div>
        </div>
    </app-container>
</template>

<script setup lang="ts">

import {computed, onBeforeMount, ref, watch} from "vue";
import GithubService from "@/api/github/github.service";
import AppInput from "@/shared/ui/app-input.vue";
import AppContainer from "@/shared/components/app-container.vue";
import debounce from "@/shared/utils/debounce";
import AppButton from "@/shared/ui/app-button.vue";
import Spinner from "@/shared/components/spinner.vue";
import {useUserStore} from "@/app/store";
import {storeToRefs} from "pinia";

const repositories = ref([])
const isLoading = ref(false)
const queryString = ref('')

const userStore = useUserStore()


onBeforeMount(() => {
    getRepositories()
})

watch(queryString, debounce(() => {
    getRepositories()
}, 500))

const getRepositories = async () => {

    if (queryString.value) {
        isLoading.value = true

        const response = await GithubService.getRepos(queryString.value)
        await userStore.getFavorites()
        repositories.value = response.data.items

        isLoading.value = false
    }
}


const sendToFavorite = async (repo: any) => {
    repo.loading = true
    const repoId = repo.id
    await userStore.addToFavorite(repoId)
    await userStore.getFavorites()
    // getRepositories()
    repo.loading = false
}

const deleteFromFavorite = async (repo: any) => {
    repo.loading = true
    const repoId = repo.id

    await userStore.removeFromFavorite(repoId)
    await userStore.getFavorites()
    // getRepositories()
    repo.loading = false
}


</script>

<style scoped lang="scss">
.repositories {

  &__content {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;

    @media (max-width: $lg) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: $md) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  &__loading, &__empty {
    margin-top: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: $color-green;
  }


}

.repository {
  padding: 8px;
  border: 1px solid #22262C;
  border-radius: 6px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  &-owner {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;

    &-image {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }

  &-name {
    transition: color .2s;
    color: $color-blue;
    font-weight: 600;
    font-size: 24px;

    &:hover {
      color: $color-blue-hover;
    }
  }
}

</style>
