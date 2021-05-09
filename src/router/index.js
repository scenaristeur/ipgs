import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "network-view" */ '@/components/network/NetworkVis.vue')  },
    {
      path: '/about',
      name: 'About',
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    },
    {
      path: '/browser',
      name: 'Browser',
      component: () => import(/* webpackChunkName: "browser" */ '@/views/Browser.vue')
    },
    {
      path: '/landing',
      name: 'Landing',
      component: () => import(/* webpackChunkName: "browser" */ '@/views/Landing.vue')
    },
    {
      path: '/history',
      name: 'History',
      component: () => import(/* webpackChunkName: "history" */ '@/views/HistoryView.vue')
    },
    {
      path: '/editor',
      name: 'Editor',
      component: () => import(/* webpackChunkName: "editor" */ '@/views/EditorView.vue')
    },
    {
      path: '/help',
      name: 'Help',
      component: () => import(/* webpackChunkName: "help" */ '@/views/HelpView.vue')
    },
    {
      path: '/agora',
      name: 'Agora',
      component: () => import(/* webpackChunkName: "agora" */ '@/views/AgoraView.vue')
    },
    {
      path: '/suggested',
      name: 'Suggested',
      component: () => import(/* webpackChunkName: "suggested" */ '@/views/SuggestedView.vue')
    },
    {
      path: '/reunion',
      name: 'Reunion',
      component: () => import(/* webpackChunkName: "reunion" */ '@/views/Reunion.vue')
    },
    // {
    //   path: '/ipfs',
    //   name: 'Ipfs',
    //   component: () => import(/* webpackChunkName: "ipfs" */ '@/views/Ipfs.vue')
    // }

  ]

  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })

  export default router
