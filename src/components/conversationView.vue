<template>
  <div class="con">
    <div class="default" v-if="isShow">
      <el-empty :image="nomeImage" description="开始聊天吧我的宝！！！" :image-size="500">
      </el-empty>
    </div>
    <div class="show" v-else>
      <div class="top" ref="top">
        <!-- <joinView friends="zs" /> -->
        <friendTalk :ava="ava" :name="name" />
        <template v-if="isShowMyTalk">
          <myTalk v-for="(i, index) in indexData" :key="index" :contextData="i" />
        </template>
      </div>
      <div class="bottom">
        <div class="text">
          <el-input type="textarea" v-model="ChangeContent" placeholder="请输入内容"></el-input>
        </div>
        <div class="edit">
          <div class="icon">
            <i class="iconfont icon-biaoqing"></i>
            <i class="el-icon-microphone"></i>
            <i class="el-icon-picture-outline"></i>
          </div>
          <div class="smit">
            <el-button type="primary" @click="smit">点击发送</el-button>
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
      ChangeContent: '',
      ava: '',
      isShowMyTalk: false,
      indexData: [],
      name: ''
    }
  },
  methods: {
    viewBottom(el = this.$refs.top) {
      el.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
    },
    smit() {
      if (!this.ChangeContent) {
        this.$notify.info({
          title: '注意',
          message: '发送的内容不能为空'
        })
        return false
      }
      this.isShowMyTalk = true
      this.indexData.push(this.ChangeContent)
      this.ChangeContent = ''
    }
  },
  mounted() {
    if (!this.$refs.top) return
    this.viewBottom(this.$refs.top)
  },
  watch: {
    indexData() {
      this.viewBottom()
    }
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
