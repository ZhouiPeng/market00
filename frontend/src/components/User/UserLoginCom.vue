<template>
  <div class="full-width">
    <div class="display-center">
        <h1>登录</h1>
    </div>
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
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </div>
      <el-link style="margin: 0%;" type="primary" @click="clickRegis">没有账户？立即注册</el-link>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import { ElMessage } from 'element-plus'
import http from '../../global/http'
import router from '@/router'
  export default {
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
        try {
          const result = await axios.post('/api/users/login', post, {headers: {"Content-Type": "application/json"}})
          if(result.data.code > 0)
          {
            token = result.data.data.token
            localStorage.setItem('token',token)
            const userData = await http.get('/api/users/prof/' + result.data.data.uid)
            if(userData.data.code === 1)
              {
                user = {
                  ...userData.data.data,
                  picture: '/api/users/icon/' + userData.data.data.userId,
                  picture_narrow: '/api/users/icon/' + userData.data.data.userId,
                  picture_cache: null,
                }
                // console.log(user)
                const avatarData = await http.get(user.picture, { responseType: "blob"})
                if(avatarData.data != null)
                {
                  user.picture_cache = await new Promise((resolve,reject) => {
                    const reader = new FileReader()
                    reader.onloadend =  () => resolve(reader.result)
                    reader.onerror = reject
                    reader.readAsDataURL(avatarData.data)
                  })
                }
                  
                this.$store.commit('login',user,token)
                router.push({name: 'home'})
              }
              else
              {
                ElMessage.error(userData.data.msg)
              }
          }
          else
          {
            ElMessage.error(result.data.msg)
          }
        } catch(error) {
          ElMessage.error('网络繁忙，请稍后再试')
          console.log(error)
        }
      },
      clickRegis() {
        router.push({name: 'Regis'})
      }
    },
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