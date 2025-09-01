<template>
<div class="main display-center">
  <div class="windows">
        <RouterView />
  </div>
</div>
    
</template>

<style scoped>
  .main {
    width: 100vw;
    height: 100vh;
  }
  .windows {
    width: 600px;
    height: 400px;
    background: rgb(235.9, 245.3, 255);
    border: 2px solid var(--el-border-color);
    box-shadow: var(--el-box-shadow);
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
</style>