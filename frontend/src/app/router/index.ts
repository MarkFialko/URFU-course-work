import {createRouter, createWebHistory} from 'vue-router'
import {routes} from '@/app/router/routes'
import {useUserStore} from "@/app/store";


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})



router.beforeEach((to, from, next) => {

    if (to.matched.some((record) => record.meta.authRequired)) {
        // auth required method
    }

    next()
})


export default router
