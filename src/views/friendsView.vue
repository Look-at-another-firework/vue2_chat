<template>
  <div class="container">
    <div class="left">
      <el-card>
        <BuddyView @click.native="toTalk">
          <img src="../assets/images/头像.jpg" alt="" v-if="!ava" />
          <img :src="ava" alt="" v-else />
          <div class="text">
            <p>聊天机器人</p>
            <p>{{ time }}</p>
            <div class="textLone">
              <p>你好朋友，欢迎来到聊天室，畅快聊天吧我的宝！！！</p>
            </div>
          </div>
        </BuddyView>
        <BuddyView @click.native="toWorld">
          <img src="../assets/images/头像.jpg" alt="" v-if="!ava" />
          <img :src="Qava" alt="" v-else />
          <div class="text">
            <p>公共聊天室</p>
            <p>{{ time }}</p>
            <div class="textLone">
              <p>快来和其他有兴趣的朋友一起聊天吧！！</p>
            </div>
          </div>
        </BuddyView>
        <BuddyView v-for="(i, index) in inlineBody" :key="index">
          <img src="../assets/images/头像.jpg" alt="" v-if="!ava" />
          <img :src="'images/' + i.ava + '.jpeg'" alt="" v-else />
          <div class="text">
            <p>{{ i.name }}</p>
            <p>{{ time }}</p>
            <div class="textLone">
              <p>{{ i.introduce }}</p>
            </div>
          </div>
        </BuddyView>
      </el-card>
    </div>
    <div class="right">
      <el-card>
        <conversationView
          ref="conversation"
          :myName="myName"
          :liveName="liveName"
        ></conversationView>
      </el-card>
    </div>
  </div>
</template>

<script>
// import { Message } from 'element-ui'
import buddyView from '@/components/buddyView.vue'
import conversationView from '@/components/conversationView.vue'
import BuddyView from '@/components/buddyView.vue'
export default {
  data() {
    return {
      ava: require('@/assets/images/默认图片.png'),
      Qava: require('@/assets/images/qun.jpeg'),
      myName: '',
      avaUrl: require('@/assets/images/1.jpeg'),
      inlineBody: [],
      liveName: '',
      imgIndex: 0
    }
  },
  components: {
    buddyView,
    BuddyView,
    conversationView
  },
  computed: {
    time() {
      return new Date().toLocaleTimeString()
    }
  },
  methods: {
    toTalk() {
      // this.$refs.conversation.isShow = false  取消机器人的聊天
      this.$refs.conversation.ava = this.ava
      this.$refs.conversation.name = '聊天机器人'
    },
    toWorld() {
      this.$refs.conversation.isShow = false
    }
  },
  mounted() {
    this.$socket.emit('allBody')
    this.myName = JSON.parse(localStorage.getItem('userInfo')).name
  },
  sockets: {
    // 在线的所有人
    allBodyReturn(data) {
      console.log('在线人数组')
      console.log(data)
      // 图片序号
      this.imgIndex = data.ava
      this.inlineBody = data
    },
    // 离开的名称
    live(data) {
      this.liveName = data.name
      console.log('离开的名称：' + this.liveName)
    },
    // 离开人之后的数组
    afterBody(data) {
      this.inlineBody = data
    }
  },
  watch: {
    inlineBody(newArr) {
      this.inlineBody = newArr
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
