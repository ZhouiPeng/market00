<template>
  <el-empty v-if="localUser === null" description="用户不存在">
    <el-button type="primary" @click="$router.push({name: 'home'})">查看其他商品</el-button>
  </el-empty>
  <el-space v-else direction="vertical" :fill="true" class="full-width main-container">
    <div>
      <h1><el-text class="mx-1" size="large">基础信息</el-text></h1>
      <el-descriptions
        direction="vertical"
        border
        class="desc"
      >
        <el-descriptions-item
          :rowspan="2"
          :width="140"
          label="Photo"
          align="center"
        >
            <el-image
              class="avatar"
              :src="picture"
              :preview-src-list="[picture]"
            />
          
        </el-descriptions-item>
        <el-descriptions-item label="用户名">{{localUser.username}}</el-descriptions-item> 
        <el-descriptions-item label="性别"><el-tag size="small">{{ localUser.gender }}</el-tag></el-descriptions-item>
        <el-descriptions-item label="手机号">
        <el-tag v-if="!localUser.tel" type="info">空</el-tag>
        <span v-else>{{ localUser.tel }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="邮箱">
          <el-tag v-if="!localUser.email" type="info">空</el-tag>
          <span v-else>{{ localUser.email }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="个人简介">
          <el-tag v-if="!localUser.prof" type="info">空</el-tag>
          <span v-else>{{ localUser.prof }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <div>
      <el-row class="display-center">
        <el-col :span="8">
          <h1><el-text class="mx-1" size="large">发布的商品</el-text></h1>
        </el-col>
        <el-col :span="2" :offset="14" class="button">
          <el-button type="primary" @click="toPublish()">查看更多</el-button>
        </el-col>
      </el-row>
      <el-empty v-if="publishedProducts.length === 0" description="还未发布商品">
      </el-empty>
      <el-space v-else wrap :size="24 * 1.16">
          <ItemCardWithoutUser v-for="product in publishedProducts" :key="product.index" :product="product" @connectFailed="handleError" :editable="true">

          </ItemCardWithoutUser>
        
      </el-space>
    </div>
    <div >
      <el-row class="display-center">
        <el-col :span="8">
          <h1><el-text class="mx-1" size="large">卖出的商品</el-text></h1>
        </el-col>
        <el-col :span="2" :offset="14" class="button">
          <el-button type="primary" @click="toSold()">查看更多</el-button>
        </el-col>
      </el-row>
      <el-empty v-if="soldProducts.length === 0" description="还未卖出商品">
      </el-empty>
      <el-space v-else wrap :size="24 * 1.16">
        <ItemCardWithoutUser v-for="product in soldProducts" :key="product.index" :product="product" @connectFailed="handleError" :editable="false">

        </ItemCardWithoutUser>
      </el-space>
    </div>
  </el-space>
  
</template>

<script>
import { handleError } from 'vue'
import ItemCardWithoutUser from '../Item/ItemCardWithoutUser.vue'
import {useRoute} from 'vue-router'
import { ElMention, ElMessage, ElNotification } from 'element-plus'
import { throttle } from '@/global/global.js'
import http from '../../global/http.js'
import { mapState } from 'vuex'
  export default {
    data() {
      return {
        route: useRoute(),
        // user: null,
        publishedProducts:[],
        soldProducts: [],
        picture: null,
        localUser: new Object,
      }
    },
    async created() {
      try {
        if(this.route.params.uid == this.user.userId)
        {
          this.localUser = { ...this.user }
          this.picture = this.localUser.picture_cache
        }
        else
        {
          const [userData,itemData] = await Promise.all([
            http.get('/api/users/prof/' + this.route.params.uid),
            http.get('/api/products/published/' + this.route.params.uid,
            {
              params: {
                page: 1,
                size: 4
              }
            })
            ])
          if(itemData.data.code === 1)
          {
            this.items = itemData.data.data.records
            this.total = itemData.data.data.total
          }
          else
          {
            ElMessage.error(itemData.data.msg)
          }
          if(userData.data.code === 1)
          {
            this.localUser = { 
              ...userData.data.data,
              picture: '/api/users/icon/' + userData.data.data.userId,
              picture_narrow: '/api/users/icon/' + userData.data.data.userId,
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
      } catch(error) {
        ElMessage.error("网络繁忙，请稍后再试")
        console.log(error)
      }
      // 最多加载4个
      // this.publishedProducts = test_pp.slice(0,4)
      // this.soldProducts = test_sp.slice(0,4)
    },
    components: {
      ItemCardWithoutUser
    },
    methods: {
      toPublish()
      {
        this.router.push({name: 'published'})
      },
      toSold()
      {
        this.router.push({name: 'sold'})
      },
      // 节流显示通知
      handleError:
        throttle(() => {ElNotification({
          title: '网络繁忙',
          message: '网络繁忙，请稍后再试',
          type: 'error',
        })}, 100*1000),
      clickProduct: () => {
        window.open('#','_blank')
      },
    },
    computed: {
      ...mapState(['user'])
    }
  }
</script>

<style scoped>
  @media screen and (min-width: 960px) {
    .main-container {
      padding: 0 var(--wide-slot-width) var(--wide-slot-width) var(--wide-slot-width);
      width: calc(100% - var(--wide-slot-width) * 2);
    }
    h1 {
      width: calc(var(--pc-screen-col-width) * 2 + var(--wide-slot-width))
    }
    .desc {
      margin-top: 20px;
      box-shadow: var(--el-box-shadow-light);
      width: calc(100% - var(--wide-slot-width));
    }
      .avatar {
        width: 100px;
        height: 100px;
      }
    .el-row {
      width: calc(100% - var(--wide-slot-width));
    }
      .button {
        display: flex;
        justify-content: right;
      }
  }
</style>