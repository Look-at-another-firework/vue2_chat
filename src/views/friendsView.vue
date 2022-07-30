<template>
  <div class="container">
    <div class="left">
      <el-card>
        <buddyView
          :time="time"
          username="聊天机器人"
          longText="你好朋友，欢迎来到聊天室，畅快聊天吧我的宝！！！"
          :ava="ava"
          @click.native="toTalk"
        />
      </el-card>
    </div>
    <div class="right">
      <el-card>
        <conversationView ref="conversation" />
      </el-card>
    </div>
  </div>
</template>

<script>
import buddyView from '@/components/buddyView.vue'
import conversationView from '@/components/conversationView.vue'
export default {
  data() {
    return {
      ava: require('@/assets/images/默认图片.png')
    }
  },
  components: {
    buddyView,
    conversationView
  },
  computed: {
    time() {
      return new Date().toLocaleTimeString()
    }
  },
  methods: {
    toTalk() {
      this.$refs.conversation.isShow = false
      this.$refs.conversation.ava = this.ava
      this.$refs.conversation.name = '聊天机器人'
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .left {
    width: 32%;
    height: 750px;
    box-sizing: border-box;
    overflow-y: auto;
    overflow: hidden;
    .el-card {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    width: 63%;
    height: 100%;
    .el-card {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
