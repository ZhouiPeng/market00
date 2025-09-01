<template>
  <div class="App">
      <div class="header-nav">
        <HomeHeader>

        </HomeHeader>
      </div>
      <div class="sidebar">
        <ChatList>

        </ChatList>
      </div>
      <div class="main-page">
        <ChatWindow>

        </ChatWindow>
      </div>
  </div>

</template>

<script>
import { useRoute } from 'vue-router';
import HomeHeader from '@/components/Home/HomeHeader.vue';
import ChatList from '@/components/Chat/ChatList.vue';
import ChatWindow from '@/components/Chat/ChatWindow.vue';
export default {
  data(){
    return {
      route: useRoute(),
    }
  },
  components: 
  {
    HomeHeader,
    ChatList,
    ChatWindow
  }
}
</script>

<style scoped>
/* 小屏电脑样式 */
@media screen and (min-width: 960px) {
  /* 左侧导航栏样式 */
  /* 主页面样式 */
  .main-page {
    padding-left: calc(var(--sidebar-width-unfold) + var(--wide-slot-width));
    height: 100%;
    width: calc(var(--pc-screen-content-width) - var(--wide-slot-width))
  }
}
</style>