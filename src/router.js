import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'film-list',
      component: () => import(/* webpackChunkName: "about" */ './views/FilmList.vue')
    },    
    {
      path: '/films/:id',
      name: 'film',      
      component: () => import(/* webpackChunkName: "about" */ './views/Film.vue')
    },
    {
      path: '/people/:id',
      name: 'character',     
      component: () => import(/* webpackChunkName: "about" */ './views/Character.vue')
    },
    {
      path: '/species/:id',
      name: 'species',     
      component: () => import(/* webpackChunkName: "about" */ './views/Species.vue')
    },
  ]
})
