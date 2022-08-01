<template>
  <div class="con">
    <div class="default" v-show="isShow">
      <el-empty :image="nomeImage" description="开始聊天吧我的宝！！！" :image-size="500">
      </el-empty>
    </div>
    <div class="show" v-show="!isShow">
      <div class="top" ref="top">
        <!-- 这里添加对话 -->
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
import myTalk from '@/components/myTalk.vue'
import friendTalk from '@/components/friendTalk.vue'
export default {
  props: ['liveName'],
  data() {
    return {
      nomeImage: require('../assets/images/nonoe.jpg'),
      isShow: true,
      ChangeContent: '',
      myName: '',
      live: ''
    }
  },
  methods: {
    viewBottom(el = this.$refs.top) {
      if (!el.lastElementChild) return
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
      this.$socket.emit('changeContent', {
        // 聊天内容
        msg: this.ChangeContent,
        // 头像
        ava: JSON.parse(localStorage.getItem('userInfo')).ava,
        // // 名字
        name: JSON.parse(localStorage.getItem('userInfo')).name
      })
      this.ChangeContent = ''
    }
  },
  mounted() {
    this.viewBottom(this.$refs.top)
    this.$socket.emit('myName')
  },
  watch: {
    ChangeContent() {
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
        this.$refs.top.append(mapComponent.$el)
      })
    },
    liveName(newName) {
      this.$nextTick(() => {
        var Profile = Vue.extend(joinView)
        if (!this.$refs.top) return
        var mapComponent = new Profile({ propsData: { live: newName + '已离线！！！' } }).$mount()
        this.$refs.top.append(mapComponent.$el)
      })
    }
  },
  sockets: {
    // 加入成员
    myNameReturn(name) {
      this.myName = name
    },
    changeContentReturn(content) {
      if (content.name == JSON.parse(localStorage.getItem('userInfo')).name) {
        this.$nextTick(() => {
          var Profile = Vue.extend(myTalk)
          // 创建 Profile 实例，并挂载到一个元素上。
          if (!this.$refs.top) return
          var mapComponent = new Profile({
            propsData: { contextData: content.msg }
          }).$mount()
          this.$refs.top.append(mapComponent.$el)
        })
      } else {
        this.$nextTick(() => {
          var Profile = Vue.extend(friendTalk)
          // 创建 Profile 实例，并挂载到一个元素上。
          if (!this.$refs.top) return
          var mapComponent = new Profile({
            propsData: { contextData: content.msg, ava: content.ava, name: content.name }
          }).$mount()
          this.$refs.top.append(mapComponent.$el)
        })
      }
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
