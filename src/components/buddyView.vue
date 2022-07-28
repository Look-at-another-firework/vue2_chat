<template>
  <div class="buddy">
    <img src="../assets/images/头像.jpg" alt="" v-if="!ava" />
    <img :src="ava" alt="" v-else />
    <div class="text">
      <p>{{ username }}</p>
      <p>{{ time }}</p>
      <div class="textLone">
        <p>
          {{ longText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['username', 'time', 'longText', 'ava']
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
