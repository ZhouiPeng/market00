<template>
<div class="App">
    <div class="header header-nav">
      <HomeHeader>

      </HomeHeader>
    </div>
    <div class="head-nav" >
      <ToolsSort @update="selectIndex">

      </ToolsSort>
    </div>
    <div class="main-page">
      <HomeMain :index="index">
          
      </HomeMain>
    </div>
  </div>
</template>

<script>
  import HomeHeader from '../components/Home/HomeHeader.vue'
  import HomeMain from '@/components/Home/HomeMain.vue';
  import ToolsSort from '@/components/Tools/ToolsSort.vue';
  export default {
    data(){
      return {
        index: 0,
      }
    },
    components: {
      HomeHeader,
      HomeMain,
      ToolsSort,
    },
    methods: {
      selectIndex(activeIndex) {
        this.index = activeIndex
      }
    }
  }
</script>

<style>
.main-page {
  max-height: 80%;
}
</style>