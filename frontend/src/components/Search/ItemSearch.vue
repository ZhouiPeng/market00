<template>
  <div v-loading="!items" class="HomeMain single-main-width" infinite-scroll-delay="30*1000" v-infinite-scroll="load" :infinite-scroll-disabled="comeToEnd">
    <el-space v-if="loadingSucess" wrap :size="30" class="display-center item-container" >
      <ItemCardWithUser v-for="item in items" :key="item" :product="item" :editable="false">

      </ItemCardWithUser>
    </el-space>
    <el-result
        v-else
        icon="error"
        title="获取商品失败"
        sub-title="请检查你的网络连接"
      >
    </el-result>
  </div>
  <el-text v-if="comeToEnd" class="display-center" type="info" size="large">
    已经到底了
  </el-text>
</template>

<script>
import ItemCardWithUser from '../Item/ItemCardWithUser.vue';
import http from '../../global/http'
import { ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';
export default{
  data() {
    return {
      route: useRoute(),
      items: new Array,
      sort: 0,
      comeToEnd: false,
      currentPage: 1,
      pageSize: 16,
      total: 0,
      loadingSucess: true
    }
  },
  components: {
    ItemCardWithUser,
  },
  props:['index','priceSort','timeSort'],
  created() {
    this.getItem()
  },
  watch: {
    index() {
      this.getItem()
    },
    priceSort() {
      this.getItem()
    },
    timeSort() {
      this.getItem()
    },
  },
  methods: {
    load() {
      this.currentPage++
      this.getItem()
    },
    async getItem() {
      try {
        const result = await http.get('/api/products/lists',{params: {
          page: this.currentPage,
          size: this.pageSize,
          category: this.index,
          keyword: this.route.params.key,
          priceSort: this.priceSort,
          timeSort: this.timeSort
          }})
        if(result.data.data.records.length === 0)
        {
          this.comeToEnd = true
          return
        }
        this.items = this.items.concat(result.data.data.records)
        this.total = result.data.data.total
      } catch(error) {
        ElMessage.error("网络繁忙，请稍后再试")
        console.log(error)
      }
    }
  }
}
</script>

<style>
@media screen and (min-width: 770px) {
  .HomeMain {
    margin-top: var(--wide-slot-width);
    margin-bottom: var(--wide-slot-width);
    background-color: rgb(217, 236, 255) !important;
    border-radius: 4px
  }
  .item-container {
    padding-top: var(--wide-slot-width);
    padding-bottom: var(--wide-slot-width);
    box-shadow: var(--el-box-shadow-lighter);
    border-radius: 4px;
    max-height: 80%
  }
}
@media screen and (min-width: 960px) {
  .HomeMain {
    margin-top: var(--wide-slot-width);
    margin-bottom: var(--wide-slot-width);
    background-color: rgb(217, 236, 255) !important;
    border-radius: 4px
  }
  .item-container {
    padding-top: var(--wide-slot-width);
    padding-bottom: var(--wide-slot-width);
    box-shadow: var(--el-box-shadow-lighter);
    border-radius: 4px
  }
}

</style>