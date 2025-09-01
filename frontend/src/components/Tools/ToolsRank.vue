<template>

  <el-menu
    default-active="0"
    mode="horizontal"
    class="nav"
    @select="handleSelect"
  >
    <el-menu-item index="0">发布从新到旧</el-menu-item>
    <el-menu-item index="1">发布从旧到新</el-menu-item>
    <el-menu-item index="2">价格从低到高</el-menu-item>
    <el-menu-item index="3">价格从高到低</el-menu-item>
  </el-menu>
  <ElDivider class="bottomDivider">
  </ElDivider>
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
    display: flex;
    border-bottom: none !important;
    background-color: aliceblue;
  }
  .bottomDivider {
    margin-top: 0px !important;
  }
}

</style>