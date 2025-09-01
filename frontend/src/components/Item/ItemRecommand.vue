<template>
  <div class="main-content">
      <el-row class="display-center">
        <el-col :span="4">
          <h1 class="first-title-color">相似推荐</h1>
        </el-col>
        <el-col :span="2" :offset="18" class="option">
          <el-button type="primary" @click="clickChange()">换一批</el-button>
        </el-col>
      </el-row>
      
      <el-space wrap :size="20" v-if="recoProducts != null">
        <ItemCardWithoutUser v-for="product in recoProducts" :key="product.index" :product="product" @connectFailed="handleError" :editable="false">

        </ItemCardWithoutUser>
      </el-space>
      <el-empty v-else description="暂无相似商品" />
    </div>
</template>
<script>
import ItemCardWithoutUser from './ItemCardWithoutUser.vue';
  export default {
    data() {
      return {
        user: null,
        recoProducts: null,

      }
    },
    props:['productId'],
    created(){
      // 根据productId查询商品种类和相似商品
      
    },
    methods: {
      clickChange() {
        console.log("clickChange")
      }
    },
    components: {
      ItemCardWithoutUser
    }
  }
</script>
<style scoped>
@media screen and (min-width: 1200px) {
  .main-content {
    width: var(--large-pc-screen-content-width);
    margin-left: calc(var(--sidebar-width-unfold) / 2);
    padding: 0%;
  }
  .option {
    display: flex;
    justify-content: right !important;
  }
}
</style>