<template>
  <div class="myTalk">
    <!-- 头像 -->
    <div class="ava">
      <img :src="avaUrl" alt="" />
    </div>
    <!-- 内容 -->
    <div class="text">
      <p>{{ contextData }}</p>
    </div>
  </div>
</template>

<script>
export default {
  // 接收发送的内容
  props: ['contextData'],
  data() {
    return {
      // 默认头像
      avaUrl: require('@/assets/images/1.jpeg')
    }
  },
  mounted() {
    // 获取登录时候的头像随机数
    this.$socket.emit('getUserAva')
  },
  sockets: {
    // 获取之后保存好随机数
    getUserAvaReturn(data) {
      this.avaUrl = require('@/assets/images/' + data.ava + '.jpeg')
    }
  }
}
</script>

<style lang="less" scoped>
.myTalk {
  overflow: hidden;
  box-sizing: border-box;
  margin: 15px 0;
  padding: 15px;
  .ava {
    width: 60px;
    height: 60px;
    float: right;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .text {
    float: right;
    width: 180px;
    box-sizing: border-box;
    padding: 10px 15px;
    margin-right: 30px;
    margin-top: 10px;
    position: relative;
    box-shadow: 0px 0px 13px 3px #b3c5f6;
    border-radius: 18px;
    line-height: 25px;
    min-height: 45px;
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
