<template>
  <el-dialog class="frame" title="请修改商品" v-model="dialogVisable" destroy-on-close>
    <el-empty v-if="item === null">
    </el-empty>
    <el-form v-else :model="item" label-width="20%" :rules="rules" class="form" size="large">
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
      
      <el-form-item label="图片:">
        <!-- 上传商品图片 -->
        <el-upload
          v-model:file-list="pics"
          class="upload-demo full-class"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :auto-upload="false"
          list-type="picture"
          :limit="5"
          accept=".jpg,.jpeg,.png"
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
        <el-button @click="clickConcel">取消</el-button>
      </div>
      </el-row>
    </el-form>
  </el-dialog>

</template>

<script>
import http from "../../global/http"
import { first_type } from "@/global/global"
import { ElMessage } from "element-plus"
import { throttle } from "@/global/global"
export default {
  data(){
    return {
      //用户模型
      pics: [],
      mainPicId: undefined,
      oldPics: [],
      first_type,
      item: null,
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
  props: {
    product: Object,
    itemEditDialogVisable: Boolean,
  },
  emits: ['itemEditDialogClose'],
  computed: {
    dialogVisable:{
      get() {
        return this.itemEditDialogVisable
      },
      set() {
        this.$emit('itemEditDialogClose')
      }
    }
  },
  async created() {
    this.item = JSON.parse(JSON.stringify(this.product))
    const result = await http.get('/api/products/pics/' + this.product.id)
      try{
        if(result.data.code == 1)
        {
          this.pics = []
          for(let i = 0; i < result.data.data.length; i++)
          {
            if(result.data.data[i].kind == 1)
            {
              this.mainPicId = result.data.data[i].id
              console.log(this.mainPicId)
            }
            const picData = await http.get('/api/products/' + result.data.data[i].id,
                                          {responseType: 'blob' })
            if(picData.data != null)
            {
              this.pics.push({name: result.data.data[i].id,
                              url:URL.createObjectURL(picData.data),
                              kind:result.data.data[i].kind})
              this.oldPics.push({id: result.data.data[i].id,
                              kind:result.data.data[i].kind})
            }
            else
            {
              this.pics = []
            }
          }
          this.itemUrlFinished = true
        }
      }
      catch(error){
        //连接出错时抛出异常
        ElMessage.error("网络繁忙，请稍后再试")
        console.log(error)
      }
  },
  methods: {

    async clickAdd()
    {
      if(this.pics.length == 0)
      {
        ElMessage.error("请选择商品图")
        return
      }
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
      try {
        const formRes = await http.put('/api/products',
                                JSON.stringify(this.item), 
                                {headers: {"Content-Type":"application/json"}})
        if(formRes.data.code == 1)
        {
          const deleted = this.oldPics.filter(old =>
          !this.pics.find(newPic => newPic.name == old.id) // 不在新列表里
        )
        
          // 2. 找出新上传的图片（带 raw 的才是新图）
          const added = this.pics.filter(p => p.raw)

          // 3. 找出还保留的旧图（没删的旧图，不需要动）
          const kept = this.pics.filter(p => !p.raw)
          
          console.log("删除的旧图：", deleted)
          console.log("新增的图：", added)
          console.log("保留的旧图：", kept)

          // --- 接下来调接口 ---
          // (1) 删除旧图
          for (let d of deleted) {
            if(d.id !== this.mainPicId)
              await http.delete(`/api/products/pic/${d.id}`)
          }

          // // (2) 替换主图（如果用户上传了新主图）
          if (added.length > 0) {
            const mainPic = added[0] // 约定第1张是主图
            if(mainPic.raw)
            {
              const formData = new FormData()
              formData.append("pic", mainPic.raw)
              await http.put(`/api/products/pic/${this.mainPicId}`, formData)
            }
            else
            {
              await http.delete(`/api/products/pic/${mainPic.id}`)
            }
          }

          // // (3) 上传副图（跳过第1张主图）
          for (let i = 1; i < added.length; i++) {
            const formData = new FormData()
            formData.append("pic", added[i].raw)
            http.post(`/api/products/pic/${this.item.id}`, formData)
          }
          ElMessage.success("保存成功")
        }
        else
        {
          ElMessage.error(formRes.data.msg)
        }
      } catch(error) {
        ElMessage.error(error)
        console.log(error)
      } 
    },
    clickConcel() {
      this.dialogVisable = false
    }
  }
}
</script>
<style scoped>
@media screen and (min-width: 960px) {
  
  :deep(.avatar-uploader .el-upload)  {
    border: 0;
  }
      .price-length {
        width: "40%"
      }
}
</style>
