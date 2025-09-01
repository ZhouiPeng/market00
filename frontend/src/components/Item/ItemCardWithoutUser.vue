<template>
  <el-card class="product" @click="onClick" v-if="picUrl != null">
    <template #header>
      <el-row>
        <el-col :span="21">
          <el-text>{{product.name}}</el-text>
        </el-col>
        <!-- 自己商品的操作 -->
        <!-- <el-col :span="3" class="dropdown-container" v-if="editable">
          <el-dropdown trigger="hover" class="dropdown"  size="large">
              <el-icon size="large">
                <More />
              </el-icon>
            <template #dropdown>
              <el-dropdown-menu :show-timeout="50">
                <el-dropdown-item @click="clickEdit">编辑</el-dropdown-item>
                <el-dropdown-item divided @click="clickOff" :disabled="product.state === 2">下架</el-dropdown-item>
                <el-dropdown-item divided @click="clickDelete">删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
        <el-col v-else :span="2" class="dropdown-container">
          <el-button type="primary">收藏</el-button>
        </el-col> -->
      </el-row>
    </template>
    <div class="display-center" >
      <el-image class="img" :src="picUrl" fit="cover">
        <template #error>
          <div class="image-slot display-center" style="width: 100%;height: 100%;">
            <el-icon><Picture /></el-icon>
          </div>
        </template>
      </el-image>
    </div>
    
    <template #footer>
      <el-row>
        <el-col :span="8">
          <el-text class="mx-1" type="warning"><el-tag type="warning" effect="dark">{{ "￥" + product.price }}</el-tag></el-text>
        </el-col>
        <el-col :span="7" :offset="4">
          <el-tag :type="state_color[product.state]" style="width: 90%;">{{ state_text[product.state] }}</el-tag>
        </el-col>
        <el-col :span="5">
          <el-tag type="success" class="full-width"><el-icon><Star /></el-icon><el-text type="success">{{ product.want }}</el-text></el-tag>
        </el-col>
        </el-row>
    </template>
  </el-card>
  <!-- <ItemEdit :productid="product.id" :itemEditDialogVisable="itemEditDialogVisable" @itemEditDialogClose="itemEditDialogVisable = false">

  </ItemEdit> -->
</template>
<script>
import http from '../../global/http'
import { ElMessage, ElMessageBox } from 'element-plus'
import { state_text, state_color} from '../../global/global'
import router from '@/router'
import ItemEdit from './ItemEdit.vue'
  export default {
    data() {
      return {
        picId: undefined,
        stateType: 'primary',
        state_text,
        state_color,
        picUrl: '',
        itemEditDialogVisable: false,
      }
    },
    props: ['product','editable']
      //需要 商品名，商品图片(实际是商品id)，商品价格，商品状态,收藏数量
    ,
    emits:['connectFailed'],
    async created() {
      this.stateType = this.product.state === 1? 'danger':'primary'
      try{
        const result = await http.get('/api/products/pics/' + this.product.id)
        if(result.data.code === 1)
        {
          for(let i = 0; i < result.data.data.length; i++)
          {
            if(result.data.data[i].kind == 1)
            {
              this.picId = result.data.data[i].id
              break
            }
          }
          const picData = await http.get('/api/products/' + this.picId,{ responseType: 'blob' })
          if(picData.data != null)
          {
            this.picUrl = URL.createObjectURL(picData.data)
          }
        }
        else
        {
          ElMessage.error(result.data.msg)
        }
      }
      catch(error){
        //连接出错时抛出异常
        this.$emit('connectFailed',error)
      }
    },
    methods: {
      onClick(){
        const href = router.resolve({name: 'ItemDetail', params: {itemid: this.product.id}}).href
        window.open(href, '_blank')
      },
      clickEdit(){
        this.itemEditDialogVisable = true
      },
      clickOff(){
        ElMessageBox.confirm(
          '确定下架该商品吗？',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
        )
          .then(() => {
            ElMessage({
              type: 'success',
              message: 'Delete completed',
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: 'Delete canceled',
            })
          })
      },
      clickDelete() {
        ElMessageBox.confirm(
          '删除后商品将不再展示，继续吗？',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error',
          }
        )
          .then(() => {
            ElMessage({
              type: 'success',
              message: 'Delete completed',
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: 'Delete canceled',
            })
          })
      }
    },
    // components: {
    //   ItemEdit
    // }
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