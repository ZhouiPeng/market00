<template>
  <div class="frame">
    <el-form :model="localUser" ref="localUserForm" :rules="rules" label-width="15%" class="form" size="large">
      <el-form-item label="头像:">
        <el-row class="full-width">
          <el-col :span="8" class="display-center">
            <el-avatar v-if="picture" :size="80" :src="picture" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-col>
          <el-col :span="16" class="display-center">
            <el-upload
              v-model:file-list="newAvatar"
              class="upload-demo full-width"
              action="#"
              :limit="1"
              :show-file-list="false"
              :http-request="selectImg"
              accept=".jpg,.jpeg,.png"
            >
              <el-button type="primary">更换头像</el-button>
              <template #tip>
                <div class="el-upload__tip">
                  单张图片大小不超过 512 kb.
                </div>
              </template>
            </el-upload>
          </el-col>
          <el-dialog
            v-model="dialogVisible"
            width="600"
            :before-close="handleClose"
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :align-center="true"
            class="imgCut"
          >
            <avatarEdit :req="req" @getdata="clickSaveImg" @handle-close="dialogVisible = false">

            </avatarEdit>
            <template #footer>
            </template>
          </el-dialog>
        </el-row>
      </el-form-item>
      <el-form-item label="邮箱:" prop="email">
        <el-input v-model="localUser.email" style="width: 50%;"/>
      </el-form-item>
      <el-form-item label="性别:">
        <el-radio-group v-model="localUser.gender">
          <el-radio value="女">女</el-radio>
          <el-radio value="男">男</el-radio>
          <el-radio value="未公开">未公开</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="个人简介:">
        <el-input v-model="localUser.prof" type="textarea" :autosize="{minRows: 6, maxRows: 14}"/>
      </el-form-item>
      
      <el-row>
        <ElDivider />
        <div class="display-center full-width">
          <el-button type="primary" @click="onSave">保存</el-button>
          <el-button @click="onReset">重置</el-button>
        </div>
      </el-row>
      
    </el-form>
  </div>

</template>

<script>
import avatarEdit from '../Tools/avatarEdit.vue'
import { mapState } from 'vuex'
import http from '../../global/http'

export default {
  data(){
    return {
      localUser: {
        userId: undefined,
        username: '',
        picture: '',
        picture_narrow: '',
        tel: '132',
        email: '',
        gender: undefined,
        prof: '',
        fans: 0,
        follows: 0
      },
      picture: null,
      //用户模型
      newAvatar: [],
      req: {
        img: null,
        type: null,
      },
      dialogVisible: false,
      rules: {
        email: [
          { type: 'email', required: false, message:'请输入正确的邮箱地址', trigger: 'blur'},
        ]
      }
    }
  },
  created(){
    // 获取用户商品信息
      this.getAvator()
      this.localUser.userId = this.user.userId
      this.localUser.username = this.user.username
      this.localUser.picture = this.user.picture
      this.localUser.picture_narrow = this.user.picture_narrow
      this.localUser.tel = this.user.tel
      this.localUser.email = this.user.email
      this.localUser.gender = this.user.gender
      this.localUser.prof = this.user.prof
      this.localUser.fans = this.user.fans
      this.localUser.follows = this.user.follows
    
  },
  methods: {
    onSave()
    {
      this.$store.dispatch('updateUserProfile',this.localUser).then(() => {
        this.$message.success('保存成功！')
      }).catch((error) => {
        this.$message.error(error.message)
      })
    },
    onReset()
    {
     this.$refs.localUserForm.resetFields()
    },
    selectImg()
    {
      const url = URL.createObjectURL(this.newAvatar[0].raw)
      this.req.img = url
      this.req.type = this.newAvatar[0].name.split('.')[1]
      this.dialogVisible = true
      this.newAvatar = []
    },
    handleClose()
    {
      this.dialogVisible = false
    },
    clickSaveImg(data)
    {
      const file = new FormData();
      file.append('pic', data)
      http.post('/api/localUsers/icon', file)
      .then(result => {
        if(result.data.code === 1)
        {
          this.$message.success("保存成功！")
          this.dialogVisible = false
        }
        else
        {
          this.$message.error(result.data.msg)
        }
      })
      .catch(error =>
      {
        this.$message.error("网络繁忙，请稍后再试")
        console.log(error)
      })
    },
    getAvator(){
      http.get(this.user.picture, { responseType: "blob"})
        .then(result => {
          if(result.data != null)
            this.picture = URL.createObjectURL(result.data)
          else
            return null
        })
        .catch(error => {
          if(this.user.picture_cache)
          {
            this.picture = this.user.picture_cache
          }
          console.log(error)
          this.$message.error("网络异常，请稍后再试")
        })
      }
  },
  components: {
    avatarEdit
  },
  computed: 
  {
    ...mapState(['user']),
  }
}
</script>
<style scoped>
  @media screen and (min-width: 960px) {
    :deep(.avatar-uploader .el-upload)  {
      border: 0;
    }
    :deep(.el-form-item__label-wrap) {
      display: flex;
      align-items: center;
    }
    :deep(.el-dialog__body) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    :deep(.el-dialog){
      background-color: rgba(0,0,0,0);
      border: 0px;
      box-shadow: none;
    }
    .imgCut {
     display: block; 
    }
  }

</style>
