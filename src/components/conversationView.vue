<template>
  <div class="con">
    <div class="default" v-show="isShow">
      <el-empty :image="nomeImage" description="开始聊天吧我的宝！！！" :image-size="500">
      </el-empty>
    </div>
    <div class="show" v-show="!isShow">
      <div class="top" ref="top" id="#top">
        <!-- <joinView :friends="myName" /> -->
        <div class="top-join" ref="topJoin"></div>
        <!-- <friendTalk>
          <template v-if="ava">
            <div class="ava">
              <p class="name">{{ name }}</p>
              <img src="../assets/images/头像.jpg" alt="" v-if="!ava" />
              <img :src="ava" alt="" v-else />
            </div>
            <div class="text">
              <p>你好啊我的朋友！！！</p>
            </div>
          </template>
        </friendTalk> -->
        <template v-if="isShowMyTalk">
          <myTalk v-for="(i, index) in indexData" :key="index" :contextData="i" />
        </template>
        <div class="top-leave" ref="leave"></div>
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
import Vue from 'vue'
import joinView from '@/components/joinView.vue'
export default {
  props: ['liveName'],
  data() {
    return {
      nomeImage: require('../assets/images/nonoe.jpg'),
      isShow: true,
      ChangeContent: '',
      isShowMyTalk: false,
      indexData: [],
      myName: '',
      live: ''
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
    this.viewBottom(this.$refs.top)
    this.$socket.emit('myName')
  },
  watch: {
    indexData() {
      this.viewBottom()
    },
    myName(newName) {
      this.$nextTick(() => {
        var Profile = Vue.extend(joinView)
        // 创建 Profile 实例，并挂载到一个元素上。
        if (!this.$refs.top) return
        var mapComponent = new Profile({
          propsData: { friends: newName + '在线中！！！' }
        }).$mount()
        this.$refs.topJoin.append(mapComponent.$el)
      })
    },
    liveName(newName) {
      console.log(newName)
      this.$nextTick(() => {
        var Profile = Vue.extend(joinView)
        // 创建 Profile 实例，并挂载到一个元素上。
        if (!this.$refs.leave) return
        var mapComponent = new Profile({ propsData: { live: newName + '已离线！！！' } }).$mount()
        this.$refs.leave.append(mapComponent.$el)
      })
    }
  },
  sockets: {
    myNameReturn(name) {
      this.myName = name
      console.log(this.myName + '---')
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
