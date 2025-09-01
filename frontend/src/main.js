import { createApp } from 'vue'
import { createStore } from 'vuex'
import ElementPlus, { ElMessage } from 'element-plus'
import Router from './router'
import 'element-plus/dist/index.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import HomeHeader from './components/Home/HomeHeader.vue'
import 'element-plus/dist/index.css'
import VueCropper from 'vue-cropper'; 
import 'vue-cropper/dist/index.css'
import '../src/global/global.css'
import { users as test_user } from './test'
import http from './global/http'
import { serverUrl } from './global/global'
import router from './router'
window.__VUE_PROD_DEVTOOLS__ = false;
window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;

const store = createStore({
  state() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
    }
  },
  mutations: {
    login (state,user) {
      
      //将数据存在localStorage
      localStorage.setItem('user', JSON.stringify(user))
      //将后端传来的数据付给state
      state.user = user
    },
    logout (state) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      state.user = null
      router.push({name: 'Login'})
    },
    updateUser(state,user){
      // 应使用异步调用
      state.user.email = user.email
      state.user.gender = user.gender
      state.user.prof = user.prof
      localStorage.setItem('user', JSON.stringify(user))
    }, 
    updateUserSecurity(state, user){
      state.user.username = user.username
      state.user.tel = user.tel
      localStorage.setItem('user', JSON.stringify(user))
    }

  },
  actions: {
    async updateUserProfile(context,user) {
      try {
        const result = http.put(serverUrl + '/api/users/prof',JSON.stringify(user), {headers: {"Content-Type":"application/json"}})
        if(result.data.code === 1)
        {
          context.commit('updateUser', user)
          return result.data
        }
        else
          return new Error(result.data.msg)
      } catch(error) {
        return new error
      }
    },
    async updateUserSecurity(context,user) {
      try {
        const result = await http.put(serverUrl + '/api/users',JSON.stringify(user), {headers: {"Content-Type":"application/json"}})
        if(result.data.code === 1)
        {
          context.commit('updateUserSecurity', user)
          return result.data
        }
        else
          return new Error(result.data.msg)
      } catch(error) {
        return new Error(error)
      }
    },
  }
})
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
app.use(store)
app.use(VueCropper)
app.use(router)
app.mount('#app')
app.component('HomeHeader', HomeHeader)