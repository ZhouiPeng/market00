<template>
  <div class="asideListFrame">
        <ul class="asideList">
            <li class="asideEntry" v-for="(friend,index) in dialogList" :key="index">
            <div class="asideEntryAvator"><el-avatar size="default" :src="friend.picture_narrow"/></div>
            <div class="asideEntryName">{{ friend.username }}</div>
            <div class="asidEntryButton"></div>
            </li>
        </ul>
  </div>
</template>
<script>
import { users } from '@/test';
export default{
  data() {
    return {
      dialogList: users
    }
  }
}
</script>
<style scoped>
  .asideListFrame {
    height:90%;
    width: 100%;
  }
  .asideFooter {
    width: 100%;
    height: 10%;
  }
  .asideList {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
  .asideEntry {
    height: 12%;
    width: 100%;
    list-style-type: none;
    display: flex;
    background-color:   #F2F6FC;
  }
  .asideEntry:hover {
    cursor: pointer;
    background-color: rgb(197.7, 225.9, 255);
  }
  .asideEntryAvator {
    width:30%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .asideEntryName {
    width: 50%;
    display: flex;
    align-items: center;
  }
  .asideEntryButton {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>