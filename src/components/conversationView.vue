<template>
  <div class="con">
    <div class="default" v-if="isShow">
      <el-empty :image="nomeImage" description="开始聊天吧我的宝！！！" :image-size="500">
      </el-empty>
    </div>
    <div class="show" v-else>
      <div class="top" ref="top">
        <joinView friends="zs" />
        <myTalk />
        <friendTalk />
        <joinView friends="zs" />
        <friendTalk />
        <myTalk />
        <friendTalk />
        <myTalk />
      </div>
      <div class="bottom">
        <div class="text">
          <el-input type="textarea" v-model="content" placeholder="请输入内容"></el-input>
        </div>
        <div class="edit">
          <div class="icon">
            <i class="iconfont icon-biaoqing"></i>
            <i class="el-icon-microphone"></i>
            <i class="el-icon-picture-outline"></i>
          </div>
          <div class="smit">
            <el-button type="primary">按下Enter发送</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nomeImage: require('../assets/images/nonoe.jpg'),
      isShow: true,
      content: '你好'
    }
  },
  methods: {
    viewBottom(el) {
      el.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
    }
  },
  mounted() {
    if (!this.$refs.top) return
    this.viewBottom(this.$refs.top)
  }
}
</script>

<style lang="less" scoped>
.con {
  width: 100%;
  height: 100%;
  .show {
    .top {
      width: 100%;
      height: 500px;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;
      overflow: scroll;
    }
    .bottom {
      width: 100%;
      height: 222px;
      padding: 20px;
      box-sizing: border-box;
      .text {
        height: 70%;
        .el-textarea {
          font-size: 18px;
        }
      }
      .edit {
        height: 30%;
        display: flex;
        box-sizing: border-box;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        .icon {
          font-size: 20x;
          i {
            margin-right: 15px;
            font-size: 25px;
          }
        }
      }
    }
  }
}
</style>
