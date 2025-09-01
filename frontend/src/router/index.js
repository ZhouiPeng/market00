import { createRouter, createWebHistory,createMemoryHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import UserHome from '@/views/UserHome.vue'
import ItemDetail from '@/views//ItemDetail.vue'

import ChatHome from '@/views/ChatHome.vue'
import SetA from '@/components/Set/SetA.vue'
import UserEdit from '@/components/User/UserEdit.vue'
import Feedback from '@/components/FeedBack/FeedBackA.vue'
import SearchResult from '@/views/SearchResult.vue'
import Admin from '@/components/Admin/AdminA.vue'
import PayPage from '@/views/PayPage.vue'
import TradeCheck from '@/components/Trade/TradeCheck.vue'
import UserDetail from '@/components/User/UserDetail.vue'
import UserFollowed from '@/components/User/UserFollowed.vue'
import FollowMe from '@/components/User/FollowMe.vue'
import ItemPublished from '@/components/Item/ItemPublished.vue'
import OrderBought from '@/components/Order/OrderBought.vue'
import OrderSold from '@/components/Order/OrderSold.vue'
import OrderDetail from '@/components/Order/OrderDetail.vue'
import ItemFavourite from '@/components/Item/ItemFavourite.vue'
import ItemAdd from '@/components/Item/ItemAdd.vue'
import PayDemo from '@/components/Trade/PayDemo.vue'
import UserSecurity from '@/components/User/UserSecurity.vue'
import LoginPage from '@/views/LoginPage.vue'
import UserLoginCom from '@/components/User/UserLoginCom.vue'
import UserRegisCom from '@/components/User/UserRegisCom.vue'
// import TradePay from '@/components/Trade/TradePay.vue' // Uncomment if you have this component
import { user_menu_name } from '@/global/global'
const routes = [
  { 
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/search/:key',
    name: 'Search',
    component: SearchResult
  },
  {
    path: '/enter',
    component: LoginPage,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: UserLoginCom
      },
      {
        path: 'regis',
        name: 'Regis',
        component: UserRegisCom
      }
    ]
  },
  {
    path: '/userhome/:uid',
    component: UserHome,
    children: [
      {
        path: 'userDetail',
        name: user_menu_name[0],
        component: UserDetail,
      },
      {
        path: 'editDetail',
        name: user_menu_name[1],
        component: UserEdit,
      },
      {
        path: 'userFollowed',
        name: user_menu_name[2],
        component: UserFollowed,
      },
      {
        path: 'fans',
        name: user_menu_name[3],
        component: FollowMe,
      },
      {
        path: 'published',
        name: user_menu_name[4],
        component: ItemPublished,
      },
      {
        path: 'bought',
        name: user_menu_name[5],
        component: OrderBought,
      },
      {
        path: 'sold',
        name: user_menu_name[6],
        component: OrderSold,
      },
      {
        path: 'favourite',
        name: user_menu_name[7],
        component: ItemFavourite,
      },
      {
        path: 'add',
        name: user_menu_name[8],
        component: ItemAdd,
      },
      {
        path: 'security',
        name: user_menu_name[9],
        component: UserSecurity,
      }
    ]
  },
  {
    path: '/itemDetail/:itemid',
    name: 'ItemDetail',
    component: ItemDetail
  },
  {
    path: '/orderDetail/:orderid',
    name: 'OrderDetail',
    component: OrderDetail
  },

  { 
    path: '/chat/:uid',
    name: 'ChatHome',
    component: ChatHome
  },
  { 
    path: '/userhome/settings',
    name: 'Settings',
    component: SetA
  },
  { 
    path: '/feedback',
    name: 'Feedback',
    component: Feedback
  },
  { 
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/Trade/:orderid',
    name: 'Trade',
    component: PayPage,
    children:[
      { 
        path: '',
          name: 'TradeCheck',
          component: TradeCheck
      },
      
      
    ]
  },
  { 
    path: '/Pay/:orderid',
    name: 'TradePay',
    component: PayDemo
  },
]

const history = typeof window !== 'undefined'
  ? createWebHistory()
  : createMemoryHistory()

const router = createRouter({
  history,
  routes
})
router.beforeEach((to, from) => {
  const token = localStorage.getItem('token')
  const whiteList = ['Login', 'Regis']

  if (!token && !whiteList.includes(to.name)) {
    return { name: 'Login' }
  }
})
export default router