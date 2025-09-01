<template>
  <div class="frame">
    <el-form :model="item" label-width="20%" :rules="rules" class="form" size="large">
      <!-- 商品名可以进一步限制，必须包含汉字或字母 -->
      <el-form-item label="商品名:"  prop="name" >
        <el-input v-model="item.name" placeholder="请输入商品名"/>
      </el-form-item>
      <el-form-item label="价格:">
        <el-input-number v-model="item.price" :precision="2" :step="0.01" :min="0.01" :max="10000.00" class="price-length">
          <template #prefix>
            <span>￥</span>
          </template>
        </el-input-number>
      </el-form-item>
      <el-form-item label="库存:">
        <el-input-number v-model="item.amount" :min="1" :max="10000" class="price-length"/>
      </el-form-item>
      <el-form-item label="标签:">
        <el-select v-model="item.type" placeholder="请选择商品标签" style="width: 240px">
          <el-option
            v-for="(type, index) in first_type"
            :key="index"
            :label="type"
            :value="index"
          />
        </el-select>
      </el-form-item>
      
      <el-form-item label="图片:">
        <!-- 上传商品图片 -->
        <el-upload
          v-model:file-list="pics"
          class="upload-demo full-class"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :auto-upload="false"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          list-type="picture"
          :limit="5"
          accept=".png"
        >
          <el-button type="primary">Click to upload</el-button>
          <template #tip>
            <div class="el-upload__tip">
              单个jpg/png 文件大小不超过 1024 kb
            </div>
          </template>
        </el-upload>
      </el-form-item>
        <el-form-item label="描述:" prop="prof">
          <el-input v-model="item.prof" type="textarea" :autosize="{minRows: 6, maxRows: 14}" placeholder="请输入商品描述" :maxlength="500" :show-word-limit="true" resize="none"/>
        </el-form-item>
      <el-row>
      <ElDivider />
      <div class="full-width display-center">
        <el-button type="primary" @click="clickAdd">保存</el-button>
        <el-button @click="clickClear">清空</el-button>
      </div>
      </el-row>
    </el-form>
  </div>

</template>

<script>
import { ElMessage } from "element-plus"
import http from "../../global/http"
import { first_type, throttle } from "@/global/global"
export default {
  data(){
    return {
      //用户模型
      pics: [],
      first_type,
      item: {
        name: '',
        price: 2.00,
        amount: 1,
        type: undefined,
        prof: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名', trigger: 'blur'},
          { min: 2, max: 50, message: '商品名长度为 2 到50 个字符', trigger: 'blur'}
        ],
        prof: [
          { required: true, message: '请输入商品描述', trigger: 'blur'},
          { min: 10, max: 500, message: '商品描述长度为 10 到 500 个字符', trigger: 'blur'}
        ],
        type: [
          { required: true, message: '请选择商品标签', trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
    handlePreview(){
      console.log("clickPreview")
    },
    handleRemove(){
      console.log("clickRemove")
    },
    clickAdd()
    {
      // 创建formdata向后端发送数据
      
      if(this.item.price.toString().split('.').length === 1)
      {
        this.item.price = this.item.price.toString().padEnd(this.item.price.toString().length + 3,'.00')
      }
      else
      {
        let num = this.item.price.toString().split('.').pop().length
        let end = ''
        for(let i = num; i < 2; i++)
        {
          end += '0'
        }
        this.item.price = this.item.price.toString().padEnd(this.item.price.toString().length + 2 - num, end)
      }
      this.item.type = [this.item.type]
      http.post('/api/products',JSON.stringify(this.item),{headers: {"Content-Type":"application/json"}})
      .then(result => {
        if(result.data.code == 1)
        {
          const id = result.data.data
          let formData = new FormData()
          formData.append('pic', this.pics[0].raw)
          http.post('/api/products/pic/1/' + id,formData,{headers: {"Content-Type":"multipart/form-data"}})
          .then(result => {
            if(result.data.code === 1)
            {
              ElMessage.success(result.data.msg)
            }
            else
            {
              ElMessage.error(result.data.msg)
            }
          })
          .catch(error => {
            ElMessage.error("主图上传失败，请继续编辑商品")
            console.log(error)
          })
          formData = new FormData()
          for(let i = 1; i < this.pics.length; i++)
          {
            formData.append('pic',this.pics[i].raw)
            http.post('/api/products/pic/2/' + id,formData,{headers: {"Content-Type":"multipart/form-data"}})
          .then(result => {
            if(result.data.code === 1)
            {
              ElMessage.success(result.data.msg)
            }
            else
            {
              ElMessage.error(result.data.msg)
              
            }
          })
          .catch(error => {
            throttle(ElMessage.error("副图上传失败，请继续编辑商品"), 100*1000)
            
            console.log(error)
          })
          }
        }
        else
        {
          ElMessage.error(result.data.msg)
        }
      })
      .catch(error => {
        ElMessage.error(error)
        console.log(error)
      })
    },
    clickClear()
    {
      // 清空表单
      this.item.name = ''
      this.item.price = 2.00
      this.item.amount = 1
      this.item.prof = ''
    }
  }
}
</script>
<style scoped>
@media screen and (min-width: 960px) {
  
  :deep(.avatar-uploader .el-upload) {
    border: 0;
  }
      .price-length {
        width: "40%"
      }
}
  
</style>
