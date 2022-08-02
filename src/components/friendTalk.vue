<template>
  <div class="friendTalk">
    <!-- 头像名称 -->
    <div class="ava">
      <p class="name">{{ name }}</p>
      <img src="../assets/images/头像.jpg" alt="" v-if="!ava" />
      <img :src="avaUrl" alt="" v-else />
    </div>
    <!-- 内容 -->
    <div class="text">
      <p>{{ contextData }}</p>
    </div>
  </div>
</template>

<script>
export default {
  // 需要传入名称，头像随机数，收到的信息
  props: ['name', 'ava', 'contextData'],
  data() {
    return {
      // 默认头像
      avaUrl: require('@/assets/images/1.jpeg')
    }
  },
  mounted() {
    // 设置随机图片
    this.avaUrl = require('@/assets/images/' + this.ava + '.jpeg')
  }
}
</script>

<style lang="less" scoped>
.friendTalk {
  display: flex;
  overflow: hidden;
  box-sizing: border-box;
  margin: 15px 0;
  padding: 15px;
  .ava {
    width: 60px;
    height: 60px;
    margin-left: 20px;
    text-align: center;
    margin-top: -10px;
    p {
      margin: 0;
      font-size: 12px;
      margin-bottom: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .text {
    width: 180px;
    margin-left: 30px;
    box-sizing: border-box;
    padding: 10px 15px;
    position: relative;
    box-shadow: 0px 0px 13px 3px #b3c5f6;
    border-radius: 18px;
    line-height: 25px;
    margin-bottom: 15px;
    margin-top: 10px;
    // 超过部分换行
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    p {
      margin: 0;
    }
  }
}
</style>
