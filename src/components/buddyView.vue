<template>
  <div class="buddy">
    <slot> </slot>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
.buddy {
  width: 100%;
  height: 150px;
  padding-bottom: 20px;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  border-bottom: 1px solid #eee;
  &:hover {
    background-color: #f4f5fc;
  }
  &:last-child {
    margin: 0;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-top: -3px;
  }
  .text {
    margin-left: 15px;
    line-height: 20px;
    margin-top: -20px;
    p {
      margin: 0;
      margin-bottom: 5px;
      margin-top: 10px;
      &:nth-child(1) {
        font-size: 20px;
        margin-top: 12px;
      }
    }
    .textLone {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      p {
        font-size: 16px;
        line-height: 25px;
      }
    }
  }
}
</style>
