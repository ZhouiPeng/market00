<template>
  <el-card class="product" @click="onClick">
    <template #header>
      <el-row>
        <el-col :span="21">
          <el-text>{{user.username}}</el-text>
        </el-col>
      </el-row>
    </template>
    <div class="display-center">
      <el-image class="img" :src="picUrl" fit="cover" />
    </div>
    
    <template #footer>
      <el-row>
        <el-col :span="8">
          <el-tag><el-text>{{ "粉丝数：" + user.fans }}</el-text></el-tag>
        </el-col>
        <el-col :span="8" :offset="6">
          <el-tag><el-text>{{ "关注数：" + user.follow }}</el-text></el-tag>
        </el-col>
      </el-row>
    </template>
  </el-card>
  
</template>
<script>
import global from '../../global/global'
import router from '@/router'
import http from '../../global/http'
import { ElMessage } from 'element-plus'
  export default {
    data() {
      return {
        global,
        picUrl: '',
      }
    },
    props: ['user'],
    async created() {
      try{
        const result = await http.get('/api/users/icon/' + this.user.userId, { responseType: "blob"})
        if(result.data != null)
          this.picUrl = URL.createObjectURL(result.data)
        else
          return null
      } catch(error) {
        this.$emit('connectFailed',error)
      }
    },
    emits:['connectFailed'],
    methods: {
      onClick(){
        const href = router.resolve({name: 'userDetail', params: {uid: this.user.userId}}).href
        window.open(href, '_blank')
      },
    }
  }
</script>
<style scoped>
  @media screen and (min-width: 960px) {
    .product {
      width: 259px;
    }
    .product:hover {
      cursor: pointer !important;
      transform: scale(1.02);
    }
      .dropdown-container {
        display: flex !important;
        justify-content: center;
        align-items: center;
      }
      .dropdown {
        cursor: pointer;
        color: var(--el-color-primary);
        display: flex !important;
        justify-content: center;
        align-items: center;
        transition: all 0.3s linear; 
      }
      .dropdown:hover{    
        transform: scale(1.5);
      }
      .img {
        width: 200px;
        height: 200px;
      }
    :focus-visible {
        outline: none !important;
      }
    :deep(.el-tag .el-icon){
      cursor: default !important;
    }
  }
</style>