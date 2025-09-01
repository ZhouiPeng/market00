<template>
  <div v-if="item !== null" class="main-content">
    <div class="title">
      <h1>
      请在 <span>{{ formatTime(remainTime) }}</span>内完成支付，否则订单取消</h1>
    </div>
    <div class="info">
      <el-row>
        <el-col :span="4">
          <el-image class="img" :src="pics.url" fit="cover" />
        </el-col>
        <el-col :span="16" :offset="1">
          <div class="data">
            <el-row>{{ item.name }}</el-row>
            <!-- 根据订单数量来，此处只是模拟 -->
            <el-row>{{ "&times;" + item.amount }}</el-row>
            <el-row>总计:<span class="price">{{ "￥" + item.price }}</span></el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row class="pay-way">
      <el-select v-model="method" placeholder="选择支付方式" style="width: 240px" size="large">
        <el-option
          v-for="(pay_method,index) in pay_methods"
          :key="index"
          :label="pay_method"
          :value="index"
        />
      </el-select>
    </el-row>
    <el-row class="operation display-center">
      <el-button type="primary" @click="clickPay">去支付</el-button>
    </el-row>
      
  </div>
  <el-dialog v-model="resultDialogVisible" title="是否支付成功" width="500" align-center :close-on-click-modal="false">
    <template #footer>
      <div class="dialog-footer">
        <el-button type="danger" @click="resultDialogVisible = false">否</el-button>
        <el-button type="success" @click="paySucess">
          是
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { allProducts } from '@/test';
import { pay_methods } from '@/global/global';
import router from '@/router';
import { ElMessage } from 'element-plus';
  export default {
    data() {
      return {
        item: null,
        pics: undefined,
        method: undefined,
        pay_methods,
        resultDialogVisible: false,
        remainTime: undefined,
      }
    },
    props:['productid'],
    created() {
      //获取截止时间
      
      var targetTime = new Date()
      targetTime.setHours(new Date().getHours() + 1)
      this.remainTime = targetTime - Date.now()
      setInterval(() => {
        this.remainTime = targetTime - Date.now()
      },1000)
      for(let i = 0; i < allProducts.length; i++)
      {
        if(this.productid == allProducts[i].id)
        {
          this.item = allProducts[i]
          this.pics = {
            name: '',
            url: this.item.pics[0]
          }
          
          break
        }
      }
    },
    methods: {
      clickPay() {
        const href = router.resolve({name: 'TradePay', params: this.productid}).href
        window.open(href, "_blank")
        this.resultDialogVisible = true
      },
      paySucess() {
        this.resultDialogVisible = false
        ElMessage.success("支付成功，即将跳转到订单详情页")
      },
      formatTime(time) {
        let totalSeconds = Math.floor(time / 1000)
        let hours = Math.floor(totalSeconds / (60 * 60))
        let minutes = Math.floor(totalSeconds % (60 * 60) / 60)
        let seconds = Math.floor(totalSeconds % 60)
        return `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`
      }
    }
  }
</script>
<style>
  .title h1{
    color: #606266;
  }
  .title h1 span{
    color: rgb(248, 152, 152);
  }
  .el-row {
    color: #909399;
  }
  .price {
    color:rgb(238, 190, 119);
  }
  .data {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .main-content {
    margin: var(--wide-slot-width);
    padding: var(--wide-slot-width);
  }
  .info {
    box-shadow: var(--el-box-shadow-light);
    padding: var(--wide-slot-width);
  }
  .img {
    width: 100px;
    height: 100px;
  }
  .pay-way {
    margin-top: calc(var(--wide-slot-width) * 2);
  }
  .operation {
    margin-top: calc(var(--wide-slot-width) * 2);
  }
</style>