<template>
    <div class="HomeHeader">
      <a @click="$router.push({name: 'home'})">
        <img id="HomePic" src="../../assets/Alice魔法集市.png">
      </a>
      <div class="Search">
        <el-input
          v-model="searchText"
          @keyup.enter="clickSearch()"
          placeholder="搜索更多心仪商品"
          class="Search-input"
          size="large"
        >
        <template #append>
          <el-button class="EnterSearch" @click="clickSearch()">
            <el-icon><Search /></el-icon>
          </el-button>
        </template>
        </el-input>
      </div>
      <div class="Operation">
        <el-button @click="loginDiaVisable = true" v-if="!token">
          登录
          <el-icon><User /></el-icon>
        </el-button>

        
        <el-dropdown v-if="token" >
          <el-link underline="never" @click="clickMenu(0)">
          <el-avatar :size="40" :src="picture"/>
          <!-- 鼠标悬浮方法图片 -->
        </el-link>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item 
              @click="clickMenu(0)">
                个人信息
              </el-dropdown-item>
              
              <el-dropdown-item 
              @click="clickMenu(1)">
                修改个人简介
              </el-dropdown-item>
              <el-dropdown-item 
              @click="clickMenu(9)">
                账户安全
              </el-dropdown-item>
              <el-dropdown-item 
              @click="clickMenu(2)">
                我关注的
              </el-dropdown-item>
              <el-dropdown-item 
              @click="clickMenu(3)">
                我的粉丝
              </el-dropdown-item>
              <el-dropdown-item 
              @click="clickMenu(4)">
                我发布的
              </el-dropdown-item>
              <el-dropdown-item 
              @click="clickMenu(5)">
                我购买的
              </el-dropdown-item>
              <el-dropdown-item 
              @click="clickMenu(6)">
                我卖出的
              </el-dropdown-item>
              <el-dropdown-item 
              @click="clickMenu(7)">
                我收藏的
              </el-dropdown-item>
              <el-dropdown-item 
              @click="clickMenu(8)">
                发布商品
              </el-dropdown-item>
              <el-dropdown-item 
              @click="logout">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-link underline="never" v-if="token" @click="toChat">
          消息
          <el-icon><ChatDotRound /></el-icon>
        </el-link>

        <el-link underline="never" v-if="token" @click="$router.push({name: 'Feedback'})">
          反馈
          <el-icon><Service /></el-icon>
        </el-link >

      </div>
      
      <UserLogin :loginDiaVisable="loginDiaVisable" @loginDialogClose="loginDiaVisable=false">
      </UserLogin>
    </div>
</template>

<script>
import UserLogin from '../User/UserLogin.vue'
import { ElDivider, ElMessage } from 'element-plus'  
import router from '@/router'
import { useRoute } from 'vue-router'
import { user_menu_name } from '@/global/global'
import http from '../../global/http'
import { mapState } from 'vuex'
  export default {
    components: {
      UserLogin
    },
    data() {
      return {
        picture: null,
        
        loginDiaVisable: false,
        route: useRoute(),
        token: localStorage.getItem('token'),
        searchText: '',
      }
    },
    async created(){
      try {
        this.searchText = this.route.params.key
        const result = await http.get(this.user.picture, { responseType: "blob"})
        if(result.data != null)
          this.picture = URL.createObjectURL(result.data)
        else
          return null
      } catch(error) {
          console.log(error)
          ElMessage.error("网络繁忙，请稍后再试")
      }
    },
    methods: {
      clickSearch() {
        if (this.searchText.trim() === "") {
          ElMessage.error('请输入要搜索的商品名称')
        }
        else
        {
          const href = router.resolve({name: 'Search', params: {key: this.searchText}}).href
          window.open(href, '_blank')
        }
      },
      clickMenu(index){
        const href = router.resolve({name: user_menu_name[index], params: {uid: this.$store.state.user.userId}}).href
        window.open(href, '_blank')
      },
      logout() {
        this.$store.commit('logout')
      },
      toChat() {
        const href = router.resolve({name: 'ChatHome', params: {uid: this.$store.state.user.userId}}).href
        window.open(href, '_blank')
      },
      
    },
    computed:
    {
      ...mapState(['user'])
    }
  }
</script>

<style scoped>
  @media screen and (min-width: 770px) {
    .HomeHeader {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      min-width: 0;
      box-shadow: var(--el-box-shadow-light) !important;
      background-color: rgb(121.3, 187.1, 255);
    }
    .HomeHeader > a {
      display: flex;
      margin-left: 10%;
      height: 100%;
      width: auto;
      align-items: center;
      min-width: 0;
      cursor: pointer
    }
    #HomePic {
      min-width: 100px;
      height: 100px;
      width: 100px;
    }
    .Search {
      margin-left: 6%;
      width: 50%;
    }
    .Search-input .el-input__inner {
      border-radius: 50px !important;
    }
    .Operation {
      margin-left: 4%;
      flex-grow: 1;
      display: flex;
      align-items: center;
    }
    .el-link {
      margin-left: 10%;
      font-size: 1.15rem;
    }
  }
  @media screen and (min-width: 960px) {
    .HomeHeader {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      min-width: 0;
      box-shadow: var(--el-box-shadow-light) !important;
      background-color: rgb(121.3, 187.1, 255);
    }
    .HomeHeader > a {
      display: flex;
      margin-left: 10%;
      height: 100%;
      width: auto;
      align-items: center;
      min-width: 0;
      cursor: pointer
    }
    #HomePic {
      min-width: 100px;
      height: 100px;
      width: 100px;
    }
    .Search {
      margin-left: 6%;
      width: 50%;
    }
    .Search-input .el-input__inner {
      border-radius: 50px !important;
    }
    .Operation {
      margin-left: 4%;
      flex-grow: 1;
      display: flex;
      align-items: center;
    }
    .el-link {
      margin-left: 10%;
      font-size: 1.15rem;
    }
  }

</style>