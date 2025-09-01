<template>
<div class="App">
    <div class="header header-nav">
      <SearchHeader />
    </div>
    <div class="head-nav" >
      <ToolsSort @update="selectIndex">

      </ToolsSort>
    </div>
    <div class="RankContainer" >
      <ToolsRank @update="selectRank">

      </ToolsRank>
    </div>
    <div class="main-page">
      <ItemSearch :index="index" :priceSort="priceRank" :timeSort="timeRank">
          
      </ItemSearch>
    </div>
  </div>
</template>

<script>
  import SearchHeader from '@/components/Search/SearchHeader.vue';
  import ItemSearch from '@/components/Search/ItemSearch.vue';
  import ToolsSort from '@/components/Tools/ToolsSort.vue';
  import ToolsRank from '@/components/Tools/ToolsRank.vue';
  export default {
    data(){
      return {
        index: 0,
        priceRank: -1,
        timeRank: -1,

      }
    },
    components: {
      SearchHeader,
      ItemSearch,
      ToolsSort,
      ToolsRank
    },
    methods: {
      selectIndex(activeIndex) {
        this.index = activeIndex
      },
      selectRank(activeIndex) {
        switch(activeIndex) {
          case "0":
            this.timeRank = 1
            this.priceRank = undefined
            break;
          case "1":
            this.timeRank = -1
            this.priceRank = undefined
            break;
          case "2":
            this.timeRank = undefined
            this.priceRank = 1
            break;
          case "3":
            this.timeRank = undefined
            this.priceRank = -1
            break;
        }
      }
    }
  }
</script>

<style>
/* 小屏电脑样式 */
@media screen and (min-width: 960px) {
  /* 头部导航栏样式 */
  .head-nav {
    top: var(--header-height);
    position: sticky;
    z-index: 3;
  }
}
</style>