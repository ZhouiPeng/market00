<template>
  <div class="step" style="height: 500px;">
    <el-steps direction="vertical" :active="1">
      <el-step title="Step 1" />
      <el-step title="Step 2" />
      <el-step title="Step 3" />
    </el-steps>
  </div >
  <div v-if="item" class="content">
      <div>
      <h1>当前信息：</h1>
    </div>
    <el-button type="danger" @click="$router.push({ name: 'home'})">返回首页</el-button>
  </div>
</template>

<script setup>

</script>

<style scoped>
.step {
  width: 10%;
  margin-right: 20px;
}
.content {
  width: 90%;
  height: 100%;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}
</style>