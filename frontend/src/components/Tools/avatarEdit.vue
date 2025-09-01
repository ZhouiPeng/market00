<template>
  <div style="width: 500px;height: 500px;">
    <vueCropper
      ref="cropper"
      :img="req.img"
      :outputType="req.type"
      :centerBox="true"
      :canMove="false"
      :autoCrop="true"
      :fixed="true"
      :original="true"
    >
    </vueCropper>
    <div class="dialog-footer display-center">
      <el-button type="primary" @click="saveAvatar">保存</el-button>
      <el-button @click="$emit('handleClose')">取消</el-button>
    </div>
</div>
  
</template>
<script>
  export default{
    data() {
      return {

      }
    },
    emits:['getdata','handleClose'],
    props: ['req'],
    methods: {
      saveAvatar(){
        this.$refs.cropper.getCropBlob(data => {
          this.$emit('getdata',data)
        })
      },
    }
  }
</script>
<style scoped>
</style>