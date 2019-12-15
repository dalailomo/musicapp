import Vue from 'vue'
import Router from 'vue-router'
import Fretboard from './components/Fretboard.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Fretboard
    },
  ]
})
