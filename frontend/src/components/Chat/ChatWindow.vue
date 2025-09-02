<template>
  <el-container style="height: 100%" ref="bodyform">
    <div class="el_main_content">
      <div class="main_content_header">与{{otherUser}}的聊天</div>
      <div class="main_content_center">
        <el-scrollbar
          class="faultExpertConsultation_scrollbar"
          ref="scrollbarRef"
        >
          <div
            v-for="(item, index) in messagesWithTimestamps"
            :key="index"
            v-show="messagesWithTimestamps.length > 0"
          >
            <div v-if="item.showTime" class="chat_time">
              {{ formatSendTime(item.timestamp) }}
            </div>
            <div class="question chat" v-if="item.direction === 'sent'">
              <div class="chat_question chat_common">
                <span>{{ item.question }}</span>
              </div>
              <el-avatar class="avatar">
                <span class="me">我</span>
              </el-avatar>
            </div>
            <div class="answer chat" v-if="item.direction === 'received'">
              <el-avatar :src="robot" />
              <div class="chat_answer chat_common">
                <span>{{ item.question }}</span>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div class="main_content_footer">
        <div class="input_box">
          <textarea class="chat-input no-border" v-model="question" />
        </div>
        <div class="btn_box">
          <el-button type="primary" class="btn" @click="askClick(question)">
            发送
          </el-button>
          <el-button type="danger" class="btn" @click="clearChatHistory">
            清除消息记录
          </el-button>
        </div>
      </div>
    </div>
  </el-container>
</template>
<script setup>
import { ref, onMounted, nextTick, computed, watch } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"

const question = ref("") // 输入框值
const chatList = ref([]) // 循环的聊天数组
const scrollbarRef = ref(null)
const currentUser = ref("user1") // 当前用户
const otherUser = ref("Alice") // 对方用户

// 创建新的对话数组，加上属性 showTime
const messagesWithTimestamps = computed(() => {
  return chatList.value.map((item, index) => ({
    ...item,
    showTime: index === 0 || shouldShowTime(index),
  }))
})

// 计算两次会话时间是否超过3分钟方法
const shouldShowTime = (index) => {
  const current = new Date(chatList.value[index - 1].timestamp)
  const next = new Date(chatList.value[index].timestamp)
  const diff = next - current
  return diff > 3 * 60 * 1000 // 如果间隔超过3分钟返回true
}

// 从 localStorage 加载聊天记录
const loadChatHistory = () => {
  const keySent = `chat_${currentUser.value}_to_${otherUser.value}`
  const keyReceived = `chat_${otherUser.value}_to_${currentUser.value}`

  const chatsSent = JSON.parse(localStorage.getItem(keySent)) || []
  const chatsReceived = JSON.parse(localStorage.getItem(keyReceived)) || []

  // 统一打上 direction 标签，不依赖原数据中的 direction
  const combinedChats = [
    ...chatsSent.map(chat => ({ ...chat, direction: 'sent' })),
    ...chatsReceived.map(chat => ({ ...chat, direction: 'received' }))
  ]

  // 按时间排序
  combinedChats.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

  chatList.value = combinedChats
}

// 保存聊天记录到 localStorage（区分发送者）
const saveChatMessage = (message) => {
  const key = `chat_${message.from}_to_${message.to}`
  const existingChats = JSON.parse(localStorage.getItem(key)) || []
  existingChats.push(message)
  localStorage.setItem(key, JSON.stringify(existingChats))
  console.log('Message saved to localStorage')
}

// 提问方法
const askClick = (val) => {
  if (val.trim() !== "") {
    const message = {
      question: val,
      answer: "", // 假设没有实时回复
      timestamp: new Date(),
      to: otherUser.value,
      from: currentUser.value,
      direction: 'sent'
    }

    chatList.value.push(message)
    saveChatMessage(message) // 保存消息到本地
  } else {
    ElMessage("不能发送空白消息")
  }
}

// 切换用户时自动加载聊天记录
watch([currentUser, otherUser], () => {
  loadChatHistory()
})

// 页面加载时获取聊天记录
onMounted(() => {
  loadChatHistory()
})

// 清除消息记录的方法
const clearChatHistory = () => {
  const keySent = `chat_${currentUser.value}_to_${otherUser.value}`
  const keyReceived = `chat_${otherUser.value}_to_${currentUser.value}`

  localStorage.removeItem(keySent)
  localStorage.removeItem(keyReceived)

  // 清除页面上的消息列表
  chatList.value = []
}
// 滚动事件到底部事件
const scrollToBottom = () => {
  nextTick(() => {
    let chat = document.querySelector(".main_content_center")
    scrollbarRef.value.wrapRef.scrollTop = chat.scrollHeight
  })
}

watch(
  chatList.value,
  (newVal, oldVal) => {
    scrollToBottom()
  },
  { immediate: true }
)

const formatSendTime = (sendTime) => {
  const now = new Date()
  const sendDate = new Date(sendTime)
  const timeDiff = now - sendDate
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfTargetDate = new Date(sendDate.getFullYear(), sendDate.getMonth(), sendDate.getDate())
  const oneDay = 24 * 60 * 60 * 1000

  if (timeDiff < 0) {
    return "Invalid time"
  }

  if (startOfToday.getTime() === startOfTargetDate.getTime()) {
    return formatTime(sendDate)
  }

  if (timeDiff < oneDay) {
    return "昨天 " + formatTime(sendDate)
  }

  return (
    sendDate.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }) +
    " " +
    formatTime(sendDate)
  )
}

const formatTime = (date) => {
  // 格式化时间为“时:分”
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  return hours + ":" + minutes
}


</script>
<style lang="less" scoped>
.el_main_content {
  width: 100%;
  height: 600px;
  border-radius: 5px;
  border: 1px solid #e4e7ed;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  margin: auto;

  .main_content_header {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    background-color: #7de0bd;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }

  .main_content_center {
    width: 100%;
    height: 500px;
    overflow-y: auto;
    margin: 10px 0px;

    .chat_time {
      display: flex;
      justify-content: center;
      font-size: 10px;
    }
    .question {
      justify-content: flex-end;
    }
    .chat_question {
      background-color: #8ce45f;
      margin-right: 5px;
      color: #ffffff;
    }
    .chat_answer {
      background-color: #f2f3f5;
      margin-left: 5px;
    }
    .chat {
      width: 98%;
      margin: 10px auto;
      display: flex;
    }
    .chat_common {
      max-width: 40%;
      padding: 10px;
      border-radius: 2px;
      word-break: break-all;
      display: flex;
      align-items: center;
    }
    .avatar {
      background-color: #409eff;
      border: 2px solid #409eff;
    }
    .me {
      font-size: 16px;
      color: #ffffff;
      font-weight: bold;
    }
  }

  .main_content_footer {
    width: 100%;
    height: 100px;
    border-top: 1px solid #e4e7ed;
    .input_box {
      width: 100%;
      height: 60px;
      .chat-input {
        width: calc(100% - 20px);
        padding: 10px;
        margin: auto;
      }
    }
    .btn_box {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .btn {
        margin-right: 10px;
      }
    }
  }
}
</style>