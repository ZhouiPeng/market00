<template>
  <div class="feedback-page">
    <h1>反馈</h1>
    <el-form label-width="100px">
      <el-form-item label="反馈内容">
        <el-input v-model="feedbackContent" type="textarea" :rows="4" placeholder="请输入您的反馈内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitFeedback">提交反馈</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import global from '@/global/global'
export default {
  data() {
    return {
      feedbackContent: '',
      userId:global.user.userID,
    }
  },
  methods: {
    submitFeedback() {
      if (this.feedbackContent.trim() == '') {
        this.$message.error('请输入反馈内容');
      } 
        // 提交反馈
        axios.post(global.serverUrl + '/api/submit-feedback', {
          content: this.feedbackContent
        })
        .then(response => {
          if (response.data.success) {
            this.$message.success('反馈提交成功');
            this.feedbackContent = '';
          } else {
            this.$message.error('反馈提交失败，请稍后再试');
          }
        })
        .catch(error => {
          this.$message.error('网络错误，请检查您的网络连接');
          console.error('提交反馈时发生错误：', error);
        })
      }
    }
  }

</script>

<style scoped>
.feedback-page {
  text-align: center;
  padding: 20px;
}
</style>