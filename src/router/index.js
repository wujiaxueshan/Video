import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias: '',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: 'home',
        alias: '',
        name: 'Home',
        component: () => import('../views/Home.vue'),
      },
      {
        path: 'notes',
        name: 'Notes',
        component: () => import('../views/Notes.vue'),
        children: [
          
        ]
      },
      {
        path: 'shopbag',
        name: 'Shopbag',
        component: () => import('../views/Shopbag.vue'),
      },
      {
        path: 'detailPage',
        name: 'DetailPage',
        component: () => import('../views/DetailPage.vue'),
      }
    ]
  },
  {
    path: '/search/',
    name: 'Search',
    component: () => import('../views/Search.vue'),
  },
  {
    path: '/searchone/',
    name: 'Searchone',
    component: () => import('../views/Searchone.vue'),
  },
  {
    path: '/user/:pid',
    name: 'User',
    component: () => import('../views/User.vue'),
  },
  {
    path: '/prodetail/:id',
    name: 'Prodetail',
    component: () => import('../views/Prodetail.vue'),
  },
  {
    path: '/attention/:id',
    name: 'Attention',
    component: () => import('../views/Attention.vue'),
  },
  {
    path: '/fans/:id',
    name: 'Fans',
    component: () => import('../views/Fans.vue'),
  },
  {
    path: '/classificationContent/:id',
    name: 'ClassificationContent',
    component: () => import('../views/ClassificationContent.vue'),
  },
  {
    path: '/video/:id',
    name: 'Video',
    component: () => import('../views/Video.vue'),
  }
]

const router = new VueRouter({
  routes
})

export default router
