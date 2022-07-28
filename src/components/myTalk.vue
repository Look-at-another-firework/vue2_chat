<template>
  <div class="myTalk">
    <div class="ava">
      <img :src="ava" alt="" />
    </div>
    <div class="text">
      <p>{{ contextData }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['contextData'],
  computed: {
    ava() {
      return localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo')).ava
        : '../assets/images/头像.jpg'
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
