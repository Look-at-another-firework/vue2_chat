<template>
  <div class="con">
    <!-- 默认显示区域 -->
    <div class="default" v-show="isShow">
      <el-empty :image="nomeImage" description="开始聊天吧我的宝！！！" :image-size="500">
      </el-empty>
    </div>
    <!-- 聊天区域 -->
    <div class="show" v-show="!isShow">
      <!-- top区域为对话区域 -->
      <div class="top" ref="top"></div>
      <!-- 这是底部编辑区域 -->
      <div class="bottom">
        <!-- 输入内容区域 -->
        <div class="text">
          <el-input type="textarea" v-model="ChangeContent" placeholder="请输入内容"></el-input>
        </div>
        <!-- 图标区域  目前未开发 -->
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
      // 为聊天显示图片地址
      nomeImage: require('../assets/images/nonoe.jpg'),
      // 是否聊天开关
      isShow: true,
      // 聊天内容收集
      ChangeContent: '',
      // 加入成员名称
      myName: '',
      // 离开成员名称
      live: '',
      // 用于保存返回和信息
      mine: '',
      // 自身头像随机数
      mineAva: 0
    }
  },
  methods: {
    // 该方法为自身或者他人发送消息使其一直保存显示到可见区域
    viewBottom(el = this.$refs.top) {
      this.$nextTick(() => {
        if (!el.lastChild) return
        el.lastChild.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
      })
    },
    // 发送聊天
    smit() {
      // 验证是否为空
      if (!this.ChangeContent) {
        this.$notify.info({
          title: '注意',
          message: '发送的内容不能为空'
        })
        return false
      }
      // 获取名字头像
      this.$socket.emit('getUserAva')
      // 发送聊天人的名称头像内容
      this.$socket.emit('changeContent', {
        // 聊天内容
        msg: this.ChangeContent,
        // 头像
        ava: this.mineAva,
        // 名字
        name: this.mine
      })
      // 清空输入
      this.ChangeContent = ''
    }
  },
  mounted() {
    // 一开始显示到底部
    this.viewBottom(this.$refs.top)
    // 获取加入成员名称
    this.$socket.emit('myName')
  },
  watch: {
    // 监听在线成员
    myName(newName) {
      this.$nextTick(() => {
        var Profile = Vue.extend(joinView)
        // 创建 Profile 实例，并挂载到一个元素上。
        if (!this.$refs.top) return
        var mapComponent = new Profile({
          // 在线成员名称传递
          propsData: { friends: newName + '在线中！！！' }
        }).$mount()
        this.$refs.top.append(mapComponent.$el)
      })
    },
    // 监听离开成员
    liveName(newName) {
      this.$nextTick(() => {
        var Profile = Vue.extend(joinView)
        if (!this.$refs.top) return
        var mapComponent = new Profile({ propsData: { live: newName + '已离线！！！' } }).$mount() // 传入离开成员名称
        this.$refs.top.append(mapComponent.$el)
      })
    }
  },
  sockets: {
    // 加入成员
    myNameReturn(name) {
      // 赋值
      this.myName = name
    },
    // 接收返回的信息判断是否是自己发送还是别人发送
    changeContentReturn(content) {
      // 自己发送的
      if (content.name == this.mine) {
        this.$nextTick(() => {
          var Profile = Vue.extend(myTalk)
          if (!this.$refs.top) return
          var mapComponent = new Profile({
            // 只需要传入发送的信息
            propsData: { contextData: content.msg }
          }).$mount()
          this.$refs.top.append(mapComponent.$el)
        })
        // 调用回到底部的方法
        this.viewBottom()
      } else {
        // 他人的信息
        this.$nextTick(() => {
          var Profile = Vue.extend(friendTalk)
          // 创建 Profile 实例，并挂载到一个元素上。
          if (!this.$refs.top) return
          var mapComponent = new Profile({
            // 传入他人的信息头像名称
            propsData: { contextData: content.msg, ava: content.ava, name: content.name }
          }).$mount()
          this.$refs.top.append(mapComponent.$el)
        })
        // 调用回到底部的方法
        this.viewBottom()
      }
    },
    // 获取自己登录的名称和头像，方便发送消息时候的验证和传出
    getUserAvaReturn(data) {
      this.mine = data.name
      this.mineAva = data.ava
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
