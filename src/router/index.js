import Vue from 'vue'
import VueRouter from 'vue-router'
import loginView from '../views/loginView.vue'
import friendsView from '../views/friendsView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: loginView
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('../views/demoView.vue')
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    component: () => import('../views/homeView.vue'),
    children: [
      {
        path: 'friends',
        name: 'Friends',
        component: friendsView
      },
      {
        path: '',
        // redirect: 'friends',
        redirect: {
          name: 'Friends'
        }
      },
      {
        path: 'set',
        name: 'Set',
        component: () => import('../views/setView.vue')
      },
      {
        path: 'detail',
        name: 'Detail',
        component: () => import('../views/detailView.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 全局守卫
router.beforeEach(function(to, from, next) {
  if (!localStorage.getItem("token")) {
      if (to.path !== '/login') {
          return next('/login')
      }
  }
  next()
})

export default router
