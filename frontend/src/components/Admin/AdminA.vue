<template>
  <div class="Admin">
    <h1>管理员界面</h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="下架商品" name="soldOutProduct">
        <el-input v-model="productSearchText" placeholder="输入商品ID" @keyup.enter="soldOutProduct" />
        <el-button @click="soldOutProduct">下架</el-button>
      </el-tab-pane>
      <el-tab-pane label="警告用户" name="warnUser">
        <el-input v-model="userSearchText" placeholder="输入用户ID" @keyup.enter="warnUser" />
        <el-input v-model="warnReason" placeholder="输入警告原因" />
        <el-button @click="warnUser">警告</el-button>
      </el-tab-pane>
      <el-tab-pane label="封禁用户" name="banUser">
        <el-input v-model="userSearchText" placeholder="输入用户ID" @keyup.enter="banUser" />
        <el-input v-model="banReason" placeholder="输入封禁原因" />
        <el-input v-model="banUntil" placeholder="输入封禁截止时间" />
        <el-button @click="banUser">封禁</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

const activeName = ref('soldOutProduct')
const productSearchText = ref('')
const userSearchText = ref('')
const warnReason = ref('')
const banReason = ref('')
const banUntil = ref('')
const adminId = 1
const soldOutProduct = async () => {
  try {
    await axios.post(global.serverUrl + `/api/admins/${adminId.value}/sold-out/${productSearchText.value}`)
    ElMessage.success('商品已下架')
  } catch (error) {
    ElMessage.error('下架商品失败')
  }
}

const warnUser = async () => {
  try {
    await axios.post(global.serverUrl + `/api/admins/${adminId.value}/warn-user/${userSearchText.value}`, { reason: warnReason.value })
    ElMessage.success('用户已警告')
  } catch (error) {
    ElMessage.error('警告用户失败')
  }
}

const banUser = async () => {
  try {
    await axios.post(global.serverUrl + `/api/admins/${adminId.value}/ban-user/${userSearchText.value}`, { reason: banReason.value, banUntil: banUntil.value })
    ElMessage.success('用户已封禁')
  } catch (error) {
    ElMessage.error('封禁用户失败')
  }
}
</script>

<style scoped>
.Admin {
  padding: 20px;
}
.el-input {
  width: 300px;
}
.el-button {
  margin-left: 10px;
}
.el-table {
  margin-top: 20px;
}
</style>