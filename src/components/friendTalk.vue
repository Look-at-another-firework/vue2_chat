<template>
  <div class="friendTalk">
    <div class="ava">
      <p class="name">{{ name }}</p>
      <img src="../assets/images/头像.jpg" alt="" v-if="!ava" />
      <img :src="ava" alt="" v-else />
    </div>
    <div class="text">
      <p>你好啊我的朋友！！！</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['ava', 'name']
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
    margin-top: 9px;
    p {
      margin: 0;
      font-size: 12px;
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
    p {
      margin: 0;
    }
    // &:before,
    // &:after {
    //   position: absolute;
    //   content: '';
    //   border: 10px solid;
    //   filter: drop-shadow(-5px 0px 5px #b3c5f6);
    // }
    // &:before {
    //   left: -19px;
    //   top: 12px;
    //   border-color: transparent #fff transparent transparent;
    // }

    // &:after {
    //   border-color: transparent #fff transparent transparent;
    //   left: -18px;
    //   top: 12px;
    // }
  }
}
</style>
