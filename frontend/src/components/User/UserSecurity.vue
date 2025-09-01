<template>
  <div class="frame">
    <el-form :model="localUser" ref="ruleFormRef" :rules="rules" label-width="15%" class="form" size="large">
      <el-form-item label="用户名:">
        <el-input v-model="localUser.username" style="width: 50%;"/>
      </el-form-item>
      <el-form-item label="电话:">
        <el-input v-model="localUser.tel" style="width: 50%;"/>
      </el-form-item>
      <el-form-item label="密码:">
        <el-input v-model="localUser.pwd" style="width: 50%;"/>
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
import { mapState } from 'vuex'
import { ElMessage } from 'element-plus'
import http from '../../global/http'

export default {
  data(){
    return {
      picture: null,
      //用户模型
      dialogVisible: false,
      localUser: {
        username: '',
        tel: '',
        pwd: '',
      },
      rules: {
        username: [
          { validator: (rule, value,callback) => {
            if(value === '')
            {
              callback(new Error( '请输入用户名'))
            }
            else if(!/^(?!\d+$)[A-Za-z0-9\u4e00-\u9fa5]+$/.test(value))
            {
              callback(new Error('用户名由汉字、字母、数字组成,且非纯数字'))
            }
            else if(value.length < 4 || value.length > 30)
            {
              callback(new Error('用户名长度为4-30'))
            }
            else
            {
              callback()
            }
            }, trigger: 'blur'}
        ],
        tel: [
          { required: true, message: '电话号码不能为空', trigger: 'blur'},
          { pattern:/^1[34578][0-9]{9}$/, message: '请输入正确的电话号码', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur'},
          { max: 20, message: "不超过20字符", trigger: 'blur'}
        ],
      }
    }
  },
  created(){
  // 获取用户商品信息
    this.localUser.username = this.user.username
    this.localUser.tel = this.user.tel
    
  },
  methods: {
      onSave()
      {
        this.$store.dispatch('updateUserSecurity',this.localUser).then(() => {
          ElMessage.success('保存成功！')
        }).catch(() => {
          ElMessage.error('保存失败')
        })
        console.log('submit!')
      },
      handleClose()
      {
        this.dialogVisible = false
      },
      onReset()
      {
      this.$refs.localUserForm.resetFields()
      },
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
