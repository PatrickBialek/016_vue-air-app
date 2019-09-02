import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import HomePage from './views/HomePage.vue'
import DetailsPage from './views/DetailsPage.vue'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/details',
      name: 'details',
      component: DetailsPage,
      beforeEnter: (to, from, next) => {
        const chosenCity = store.getters.getCurrentCity;
        if (chosenCity != "") {
          next();
        } else {
          next("/")
        }
      }
    }
  ]
})