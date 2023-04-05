// routes.js
import {createWebHistory,createRouter} from 'vue-router'
import Home from "./components/Home.vue";
import SearchPage from "./components/SearchPage.vue"
import Restaurant from './components/Restaurant.vue'
const routes = [
  { path: '/', component: Home,name:"home" },
  { path: '/search/:id', component: SearchPage },
  { path: '/restaurant/:id', component: Restaurant },

];

const router = createRouter({
  history:createWebHistory(),
  routes
})

export default router;