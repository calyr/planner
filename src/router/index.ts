import HomeScreen from "../components/HomeScreen.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
    { path:'/path', component: HomeScreen},
    { path:'/', redirect: '/path'},
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
