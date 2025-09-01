<template>
  <el-empty v-if="items?.length === 0" description="还未发布商品">
    <el-button type="primary" @click="this.$router.push({name: 'add'})" 
                v-if="route.params.uid === $store.state.user.userId"
    >
    去发布
    </el-button>
  </el-empty>
  <div v-else class="main-container">
    <div class="title">
      <h2 class="first-title-color">发布的商品 ·{{ total }}</h2>
    </div>
    <div v-loading="!items" class="page-content display-center">
      <el-space  class="page-container" :size="24" wrap>
        <ItemCardWithoutUser v-for="item in items" :key="item" :product="item" :editable="true">

        </ItemCardWithoutUser>
      </el-space>
    </div>
    <paginationCom 
    :currentPage="currentPage" :pageSize="pageSize" :total="total"
    @current-page-change="currentPageChange" @page-size-change="pageSizeChange" @total-change="totalChange"/>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import ItemCardWithoutUser from './ItemCardWithoutUser.vue';
import PaginationCom from '../Tools/paginationCom.vue';
import http from '../../global/http'
import { ElMessage } from 'element-plus';
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
    async created() {
      this.load()
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
          const itemData = await http.get('/api/products/published/' + this.route.params.uid,
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
          ElMessage.error(error)
          console.log(error)
        }
      }
    },
    components: {
      ItemCardWithoutUser,
      PaginationCom
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