<template>
  <el-pagination
      background
      v-model:current-page="_currentPage"
      v-model:page-size="_pageSize"
      size="large"
      :hide-on-single-page="true"
      layout="prev, pager, next, jumper"
      :total="_total"
      class="display-center pagination"
    />
</template>
<script>
 export default{
  data() {
    return {
      
    }
  },
  props: ['currentPage', 'pageSize', 'total'],
  emits: ['currentPageChange', 'pageSizeChange', 'totalChange'],
  computed: {
    _currentPage: {
      get() {
        return this.currentPage
      },
      set(newValue) {
        this.$emit('currentPageChange', newValue)
      }
    },
    _pageSize: {
      get() {
        return this.pageSize
      },
      set(newValue) {
        this.$emit('pageSizeChange', newValue)
      }
    },
    _total: {
      get() {
        return this.total
      },
      set(newValue) {
        this.$emit('totalChange', newValue)
      }
    }
  }
 }
</script>
<style scoped>
  @media screen and (min-width: 960px) {
    .pagination {
      margin-top: var(--wide-slot-width);
      padding-bottom: var(--wide-slot-width);
    }
    :deep(.el-pagination.is-background .btn-next) {
      background-color: white;
    }
    :deep(.el-pagination.is-background .btn-prev) {
      background-color: white;
    }
    :deep(.el-pagination.is-background .el-pager li) {
      background-color: white;
    }
  }
</style>