<template>
  <div class="myTalk">
    <div class="ava">
      <img src="../assets/images/头像.jpg" alt="" />
    </div>
    <div class="text">
      <p>学姐也太棒了吧！！</p>
    </div>
  </div>
</template>

<script>
export default {}
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
    // transform-style: preserve-3d;
    p {
      margin: 0;
    }
    // &:before,
    // &:after {
    //   position: absolute;
    //   content: '';
    //   border: 10px solid;
    //   filter: drop-shadow(9px 0px 5px #b3c5f6);
    //   transform: translateZ(-1px);
    // }
    // &:before {
    //   right: -19px;
    //   top: 12px;
    //   border-color: transparent transparent transparent #fff;
    // }

    // &:after {
    //   border-color: transparent transparent transparent #fff;
    //   right: -20px;
    //   top: 12px;
    // }
  }
}
</style>
