<template>
  <el-empty v-if="users.length === 0" description="还未有用户关注">
  </el-empty>
  <div v-else class="main-container">
    <div class="title">
      <h2 class="first-title-color"> 粉丝数 ·{{ total }}</h2>
    </div>
    <div class="page-content display-center">
      <el-space class="page-container" :size="24" wrap>
        <UserCard v-for="user in users" :key="user" :user="user">

        </UserCard>
      </el-space>
    </div>
    <paginationCom 
    :currentPage="currentPage" :pageSize="pageSize" :total="total"
    @current-page-change="currentPageChange" @page-size-change="pageSizeChange" @total-change="totalChange"/>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import UserCard from './UserCard.vue';
import PaginationCom from '../Tools/paginationCom.vue';
import { throttle } from '@/global/global';
import http from '../../global/http'
import { mapState } from 'vuex';
  export default {
    data() {
      return {
        route: useRoute(),
        users: [],
        pageSize: 8,
        total: undefined,
        currentPage: 1,
        localUser: new Object,
      }
    },
    // 初始化商品
    created() {
      this.load()
    },
    watch: {
      currentPage() {
        this.items = users.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      },
      pageSize() {
        this.items = users.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      },
    },
    methods: {
      currentPageChange(newValue) {
        this.currentPage = newValue
      },
      pageSizeChange(newValue) {
        this.pageSize = newValue
      },
      totalChange(newValue) {
        this.total = newValue
      },
      async load() {
        try {
          if(this.route.params.uid === this.user.userId)
          {
            this.localUser = { ...this.user }
          }
          else
          {
            const [userData] = await Promise.all([
              http.get('/api/users/prof/' + this.route.params.uid),
              ])
            
            if(userData.data.code === 1)
            {
              this.localUser = { 
                ...userData.data.data,
                picture: '/api/users/icon/' + userData.data.data.userId,
                picture_narrow: '/api/users/icon/' + userData.data.data.userId
              }
              const avatarData = await http.get(this.localUser.picture, { responseType: "blob"})
              if(avatarData.data !== null)
              {
                this.picture = URL.createObjectURL(avatarData.data)
              }
              else
              {
                  return null
              }
            }
            else
            {
              ElMessage.error(userData.data.msg)
            }
          }
          const result = await http.get('/api/users/fans/' + this.localUser.userId,{params: {
            page: this.currentPage,
            size: this.pageSize,
            }})
          if(result.data.data.records === null)
          {
            this.comeToEnd = true
            return
          }
          this.total = result.data.data.total
          for(let i = 0; i < result.data.data.records.length; i++)
          {
            const userData = await http.get('/api/users/prof/' + result.data.data.records[i].userId)
            if(userData.data.code === 1)
            {
              this.users.push({
                ...userData.data.data,
                picture: '/api/users/icon/' + userData.data.data.userId,
                picture_narrow: '/api/users/icon/' + userData.data.data.userId
              })
            }
          }
        } catch(error) {
          throttle(() => {ElNotification({
            title: '网络繁忙',
            message: '网络繁忙，请稍后再试',
            type: 'error',
          })}, 100*1000)
          console.log(error)
        }
      }
    },
    components: {
      UserCard,
      PaginationCom
    },
    computed: {
      ...mapState(['user'])
    }
  }
</script>

<style scoped>
  @media screen and (min-width: 1200px) {
    .page-content {
      justify-content: left;
      width: 100%;
    }
    .main-container {
      margin-top: var(--wide-slot-width);
    }
    .title {
      padding-left: var(--wide-slot-width);
    }
    .page-container {
      display: flex;
      padding-left: var(--wide-slot-width);
    }
    .pagination {
      margin-top: var(--wide-slot-width);
      padding-bottom: var(--wide-slot-width);
    }
    :deep(.el-pagination.is-background .btn-next) {
      background-color: white;
    }
    :deep(.el-pagination.is-background .btn-prev) {
      background-color: white;
    }
    :deep(.el-pagination.is-background .el-pager li) {
      background-color: white;
    }
  }
</style>