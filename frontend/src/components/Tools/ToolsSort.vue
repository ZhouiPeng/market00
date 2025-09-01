<template>
  <el-menu
    default-active="0"
    mode="horizontal"
    class="nav"
    @select="handleSelect"
  >
    <el-menu-item index="0">推荐</el-menu-item>
    <el-menu-item index="1">教材教辅</el-menu-item>
    <el-menu-item index="2">文具用品</el-menu-item>
    <el-menu-item index="3">宿舍生活</el-menu-item>
    <el-menu-item index="4">服装服饰</el-menu-item>
    <el-menu-item index="5">运动健身</el-menu-item>
    <el-menu-item index="6">电子数码</el-menu-item>
    <el-menu-item index="7">乐器</el-menu-item>
    <el-menu-item index="8">兴趣爱好</el-menu-item>
    <el-menu-item index="9">二次元</el-menu-item>
    <el-menu-item index="10">毕业生专区</el-menu-item>
    <el-menu-item index="11">新生专区</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  emits: ['update'],
  methods: {
    handleSelect(key) {
      this.$emit('update',key)
    }
  }
}
</script>

<style scoped>
@media screen and (min-width: 960px) {
  .nav {
    width: 100%;
    background-color: rgb(197.7, 225.9, 255);
    display: flex;
    border-bottom: none !important;
    box-shadow:var(--el-box-shadow-light)!important;
  }
  :deep(.el-menu-item) {
    width: 300px;
  }
}

</style>