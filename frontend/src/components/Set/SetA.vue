<template>
  <div class="set-a">
    <h1>修改信息</h1>
    <form @submit.prevent="submitForm">
      

      <div class="form-group">
        <label for="avatar">头像</label>
        <input type="file" id="avatar" @change="onFileChange" accept="image/*">
        <img v-if="form.avatar" :src="form.avatar" alt="头像" class="avatar-preview">
      </div>

      <div class="form-group">
        <label for="oldPassword">旧密码</label>
        <input type="password" id="oldPassword" v-model="form.oldPassword" required>
      </div>

      <div class="form-group">
        <label for="newPassword">新密码</label>
        <input type="password" id="newPassword" v-model="form.newPassword" required>
      </div>

      <button type="submit">保存更改</button>

      <div v-if="message" class="message">{{ message }}</div>
    </form>
  </div>
</template>

<script>
import global from '@/global/global'
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        username: '',
        avatar: null,
        oldPassword: '',
        newPassword: ''
      },
      message: ''
    }
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.form.avatar = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    async submitForm() {
      try {
        // 构建表单数据
        const formData = new FormData()
        formData.append('username', global.user.userName)
        formData.append('oldPassword', this.form.oldPassword)
        formData.append('newPassword', this.form.newPassword)
        if (this.form.avatar) {
          formData.append('avatar', this.form.avatar)
        }

        // 提交表单数据
        const response = await axios.post(global.serverUrl + '/api/settings', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        if (response.data.success) {
          this.message = '更改成功'
        } else {
          this.message = response.data.message || '更改失败'
        }
      } catch (error) {
        this.message = '网络错误，请稍后再试'
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
.set-a {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"],
input[type="email"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="file"] {
  margin-bottom: 10px;
}

.avatar-preview {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.message {
  margin-top: 15px;
  color: green;
  font-size: 14px;
}

.message.error {
  color: red;
}
</style>