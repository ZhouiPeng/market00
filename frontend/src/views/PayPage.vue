<template>
<div class="App">
    <div class="header header-nav">
      <HomeHeader>

      </HomeHeader>
    </div>
    <div class="main-page frame">
      <TradeCheck :productid="itemid">
      </TradeCheck>
    </div>
  </div>
</template>

<script>import { useRoute } from 'vue-router';
import HomeHeader from '../components/Home/HomeHeader.vue'
  import TradeCheck from '@/components/Trade/TradeCheck.vue';
  export default {
    data() {
      return {
        route: useRoute(),
        orderid: undefined,
      }
    },
    created() {
      //根据订单号获取商品信息
      this.itemid = this.route.params.orderid
    },
    components: {
      HomeHeader,
      TradeCheck,
    }
  }
</script>

<style>
</style>