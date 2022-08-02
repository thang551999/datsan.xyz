import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/layout/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '',
        name: 'HomeMain',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue')
      },
      {
        path: 'detail/:id',
        name: 'InforDetail',
        component: () => import(/* webpackChunkName: "about" */ '@/views/place/Detail')
      }
    ]
  },
  {
    path: '/news',
    component: Home,
    children: [
      {
        path: '',
        name: 'NewsList',
        component: () => import('@/views/news/List.vue')
      },
      {
        path: 'detail/:id',
        name: 'NewsDetail',
        component: () => import('@/views/news/Detail.vue')
      }
    ]
  },
  {
    path: '/find-opponent',
    component: Home,
    children: [
      {
        path: '',
        name: 'FindOpponent',
        component: () => import('@/views/opponent/List.vue')
      },
      {
        path: 'add',
        name: 'AddNewOpponent',
        component: () => import('@/views/opponent/Add.vue')
      }
    ]
  },

  {
    path: '/charge',
    component: Home,
    children: [
      {
        path: '',
        name: 'Charge',
        component: () => import('@/views/transaction/Charge.vue')
      },
      {
        path: 'history',
        name: 'PaymentHistory',
        component: () => import('@/views/transaction/History.vue')
      },
      {
        path: 'result',
        name: 'PaymentResult',
        component: () => import('@/views/transaction/Result.vue')
      },
      {
        path: 'error',
        name: 'PaymentError',
        component: () => import('@/views/transaction/Error.vue')
      }
    ]
  },
  {
    path: '/register/result',
    component: Home,
    children: [
      {
        path: '',
        name: 'RegisterResult',
        component: () => import('@/views/auth/Result.vue')
      }
    ]
  },
  {
    path: '/user',
    component: Home,
    children: [
      {
        path: '',
        name: 'UserInfor',
        component: () => import('@/views/user/Infor.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/auth/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/auth/Register.vue')
  },
  {
    path: '*',
    redirect: '/home',
    hidden: true
  }
]

const createRouter = () => {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
}

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
