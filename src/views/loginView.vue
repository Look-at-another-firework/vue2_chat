<template>
  <div class="home">
    <!-- 内容区 -->
    <div class="container">
      <!-- 头像区 -->
      <div class="avatar">
        <img src="../assets/images/头像.jpg" alt="" />
      </div>
      <!-- 输入框 -->
      <div class="ipt">
        <div class="usn">
          <p>名称：</p>
          <el-input placeholder="请输入名称" v-model="userInfo.username" clearable> </el-input>
        </div>
        <div class="psd">
          <p>密码：</p>
          <el-input placeholder="请输入密码" type="password" v-model="userInfo.password" clearable>
          </el-input>
        </div>
        <div class="smit">
          <el-button type="primary" @click="toHome">登录</el-button>
          <el-button type="info" @click="info">重置</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  name: 'HomeView',
  data() {
    return {
      userInfo: {
        // 默认名称
        username: 'admin',
        // 个性签名
        introduce: '快来添加一点什么吧！！！',
        // 密码
        password: '123456'
      }
    }
  },
  methods: {
    // 重置
    info() {
      this.userInfo.username = ''
      this.userInfo.password = ''
    },
    // 登录
    async toHome() {
      // 判断名称是否为空
      if (!this.userInfo.username.trim()) {
        this.$notify.info({
          title: '提示',
          message: '您还没有输入名称'
        })
        return false
      }
      // 判断密码是否为空
      if (!this.userInfo.password.trim()) {
        this.$notify.info({
          title: '提示',
          message: '您还没有输入密码'
        })
        return false
      }
      // 发起请求
      const res = await this.$API.home.reqLogin({
        name: this.userInfo.username,
        password: this.userInfo.password
      })
      if (res.status == 200) {
        // 保存token
        localStorage.setItem('token', res.token)
      }
      console.log(this.userInfo.username + '登陆了')
      // 连接
      this.$socket.open()
      // 发送连接信息（名称，随机头像序号，个性签名）
      this.$socket.emit('login', {
        name: this.userInfo.username,
        ava: Math.ceil(Math.random() * 6),
        introduce: this.userInfo.introduce
      })
    }
  },
  sockets: {
    // 成功返回登录结果
    loginSuccess(data) {
      if (data.status == 200) {
        // 提示
        Message({
          message: data.message,
          type: 'success',
          duration: 3 * 1000
        })
        // 用于保存名称
        this.userInfo.username = data.data.name
        const otherData = {
          ava: data.data.ava,
          introduce: this.userInfo.introduce,
          name: data.data.name
        }
        // 保存个人信息
        if (!localStorage.getItem('userInfo'))
          localStorage.setItem('userInfo', JSON.stringify(otherData))
        // 跳转
        this.$router.push('/home')
      }
    },
    // 返回登录失败的结果
    loginErr(data) {
      if (data.status == 300) {
        Message({
          message: data.message,
          type: 'error',
          duration: 3 * 1000
        })
        return false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  background: url('@/assets/images/login_pg.jpg') no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  position: relative;
  .container {
    width: 600px;
    height: 400px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 30px;
    border: 2px solid #fff;
    box-shadow: 0 0 40px 10px rgba(238, 238, 238, 0.768);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .avatar {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0 0 17px 6px rgb(238 238 238 / 77%);
      img {
        width: 100%;
      }
    }
    .ipt {
      width: 80%;
      height: 56%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      .usn,
      .psd {
        display: flex;
        width: 90%;
        p {
          margin: 10px 0 0 0;
          width: 60px;
        }
      }
      .smit {
        margin-left: 230px;
        .el-button {
          width: 98px;
        }
      }
    }
  }
}
</style>
