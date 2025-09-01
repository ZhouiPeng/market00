<template>
  <el-empty v-if="item === null" description="商品不存在">
    <el-button type="primary" @click="router.push({name: 'home'})">查看其他商品</el-button>
  </el-empty>
  <div class="App" v-else>
    <div class="header-nav">
      <HomeHeader>

      </HomeHeader>
    </div>
    <div class="main-page frame display-center">
      <item-desc :productId="item.id">

      </item-desc>
    </div>
    <!-- 若是自己的商品不用推荐其他 -->
    <!-- <div class="footer" v-if="user.userId !== item.userId">
        <item-recommand>

        </item-recommand>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router';
import { allProducts } from '../test';
import { ref } from 'vue';
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';
import ItemDesc from '@/components/Item/ItemDesc.vue';
// import ItemRecommand from '@/components/Item/ItemRecommand.vue';
import { mapState } from 'vuex';
  export default {
    data() {
      return {
        route: useRoute(),
        router: useRouter(),
        item: null,
      }
    },
    created() {
      // 获取商品数据
      this.item = allProducts[this.route.params.itemid]
    },
    components: {
      ItemDesc,
      // ItemRecommand,
    },
    computed: {
      ...mapState(['user'])
    }
  }
</script>

<style scoped>
  @media screen and (min-width: 960px) {
    .main-page {
      margin-top: 2%;
      width: var(--large-pc-screen-content-width);
      margin-left: calc(var(--sidebar-width-unfold) / 2 + var(--wide-slot-width));
    }
    .el-carousel__item h3 {
      color: #475669;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
      text-align: center;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
    .carousel-img {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }
  @media screen and (min-width: 1200px) {
    .main-page {
      margin-top: 2%;
      width: var(--large-pc-screen-content-width);
      margin-left: calc(var(--sidebar-width-unfold) / 2);
      min-height: auto;
    }
    .el-carousel__item h3 {
      color: #475669;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
      text-align: center;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
    .carousel-img {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }
</style>