import {type RouteRecordRaw} from 'vue-router'

export const routes: RouteRecordRaw[] = [
    {
      path: '/',
        redirect: '/repositories'
    },
    {
        path: '/profile',
        meta: {
            authRequired: true
        },
        component: () => import('@/views/profile.vue')
    },
    {
        path: '/repositories',
        component: () => import('@/views/repositories.vue')
    },
]
