<template>
  <el-dialog
    v-model="diaglogVisable"
    title="登录"
    width="40%"
    :close-on-click-modal="false"
    center
    align-center
  >
    <el-form
      ref="ruleFormRef"
      :model="user"
      :rules="rules"
      label-width="30%"
      :hide-required-asterisk="true"
      size="large"
      style="text-align: center;"
    >
      <el-form-item class="InputRow" label="用户名" prop="username">
        <el-input v-model="user.username"  placeholder='请输入用户名或电话'/>
      </el-form-item>
      <el-form-item class="InputRow" label="密码" prop="password">
        <el-input v-model="user.password" show-password placeholder='请输入密码'/>
      </el-form-item>
      <div class="display-center">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="diaglogVisable=false">取消</el-button>
      </div>
      <el-link style="margin: 0%;" type="primary" @click="registerDiaVisable=true">没有账户？立即注册</el-link>
    </el-form>
  </el-dialog>
  <UserRegister :registerDiaVisable="registerDiaVisable" @registerDialogClose="cancelRegister">

  </UserRegister>
</template>

<script>
import UserRegister from './UserRegister.vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import http from '../../global/http'
  export default {
    emits: ['loginDialogClose'],
    components: {
      UserRegister
    },
    props: {
      loginDiaVisable: Boolean
    },
    data() {
      return {
        registerDiaVisable: false,
        // 用户输入表单
        user: {
          username: '',
          tel:'',
          password: '',
        },
        rules: {
          username: [
            { required: true, message: '用户名或电话不能为空', trigger: 'blur'}
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      async onSubmit() {
        const post = {
          username: /^1[34578][0-9]{9}$/.test(this.user.username)? '': this.user.username,
          tel: /^1[34578][0-9]{9}$/.test(this.user.username)? this.user.username: '',
          pwd: this.user.password
        }
        let token = null
        let user = null
        await axios.post('/api/users/login', post, {headers: {"Content-Type": "application/json"}})
        .then(result => {
          if(result.data.code > 0)
          {
            ElMessage.success(result.data.msg)
            token = result.data.data.token
            localStorage.setItem('token',token)
            http.get('/api/users/prof/' + result.data.data.uid)
            .then(result => {
              if(result.data.code === 1)
              {
                user = {
                  ...result.data.data,
                  picture:'/api/users/icon/' + result.data.data.userId,
                  picture_narrow:'/api/users/icon/' + result.data.data.userId
                }
                // console.log(user)
                this.$store.commit('login',user,token)
                this.diaglogVisable = false

              }
              else
              {
                ElMessage.error(result.data.msg)
              }
            })
            .catch(error => {
              ElMessage.error('网络繁忙，请稍后再试')
              console.log(error)
            })
          }
          else
          {
            ElMessage.error(result.data.msg)
          }
        })
        .catch(error => {
          ElMessage.error('网络繁忙，请稍后再试')
          console.log(error)
        })

      },
      cancelRegister() {
        this.registerDiaVisable = false
      }
    },
    computed: {
      // 本组件的对话框无前缀(dialogVisable)，子组件(Register)的对话框有前缀(registerDialogVisable)
      diaglogVisable: {
        get() {
          return this.loginDiaVisable
        },
        set() {
          this.$emit('loginDialogClose')
        }
      }
    }
  }
</script>
<style scoped>
  .InputArea {
    list-style-type: none;
    margin-left: 6%;
  }
  .LoginIndicate {
    width:14%;
    margin-top: 20px;
  }
  .InputRow {
    width: 50%;
    margin-left: 20%;
  }
  :deep(.el-form-item__content) {
    justify-content: center;
  }
</style>