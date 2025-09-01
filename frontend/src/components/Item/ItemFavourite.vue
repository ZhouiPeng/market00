<template>
  <el-empty v-if="items.length === 0" description="还未收藏商品">
    <el-button type="primary" @click="router.push({name: 'home'})">去浏览</el-button>
  </el-empty>
  <div v-else class="main-container">
    <div class="title">
      <h2 class="first-title-color">收藏的商品 ·{{ total }}</h2>
    </div>
    <div class="page-content display-center">
      <el-space class="page-container" :size="24" wrap>
        <ItemCardWithoutUser v-for="item in items" :key="item" :product="item" :editable="false">

        </ItemCardWithoutUser>
      </el-space>
    </div>
    <paginationCom 
    :currentPage="currentPage" :pageSize="pageSize" :total="total"
    @current-page-change="currentPageChange" @page-size-change="pageSizeChange" @total-change="totalChange"/>
  </div>
</template>

<script>
import router from '@/router';
import { useRoute } from 'vue-router';
import { products1 } from '@/test';
import ItemCardWithoutUser from './ItemCardWithoutUser.vue';
import paginationCom from '../Tools/paginationCom.vue';
import { ElMessage } from 'element-plus';
import http from '../../global/http'
  export default {
    data() {
      return {
        route: useRoute(),
        items: new Array,
        pageSize: 8,
        total: undefined,
        currentPage: 1,
      }
    },
    // 初始化商品
    created() {
      this.load()
      // this.items = products1.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      // this.total = products1.length
    },
    components: {
      ItemCardWithoutUser,
      paginationCom
    },
    watch: {
      currentPage() {
        this.load()
      },
      pageSize() {
        this.load()
      },
      total() {
        this.load()
      }
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
          const itemData = await http.get('/api/products/fav/' + this.route.params.uid,
            {
              params: {
                page: this.currentPage,
                size: this.pageSize
              }
            })
          if(itemData.data.code === 1)
          {
            this.items = itemData.data.data.records
            this.total = itemData.data.data.total
          }
          else
          {
            ElMessage.error(itemData.data.msg)
          }
        } catch(error) {
          ElMessage.error("网络繁忙，请稍后再试")
          console.log(error)
        }
      }
    },
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