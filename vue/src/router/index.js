import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import PageTwo from '@/components/PageTwo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/page2',
      name: 'Page 2',
      component: PageTwo
    }
  ]
})
