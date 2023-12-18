import {createApp} from 'vue'
import App from './app/App.vue'
import '@/shared/styles/styles.scss'
import router from "@/app/router";
import {createPinia} from 'pinia'

const pinia = createPinia()

const app = createApp(App).use(createPinia())

app
    .use(router)
    .use(pinia)
    .mount('#app')
