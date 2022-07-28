<template>
  <div class="detail">
    <el-card> <myMarkdown /> </el-card>
  </div>
</template>

<script>
import myMarkdown from './myMarkdown.vue'
export default {
  components: {
    myMarkdown
  }
}
</script>

<style lang="less" scoped>
.detail {
  width: 100%;
  height: 88vh;
  // overflow: scroll;
  .el-card {
    width: 100%;
    height: 100%;
    overflow: scroll;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !important;
  }
}
</style>
