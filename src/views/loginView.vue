<template>
  <div class="home">
    <div class="container">
      <div class="avatar">
        <img src="../assets/images/头像.jpg" alt="" />
      </div>
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
export default {
  name: 'HomeView',
  data() {
    return {
      userInfo: {
        ava: require('@/assets/images/萨摩耶.jpg'),
        username: 'admin',
        introduce: '快来添加一点什么吧！！！',
        password: '123456'
      }
    }
  },
  methods: {
    info() {
      this.userInfo.username = ''
      this.userInfo.password = ''
    },
    async toHome() {
      if (!this.userInfo.username.trim()) {
        this.$notify.info({
          title: '提示',
          message: '您还没有输入账号'
        })
        return false
      }
      if (!this.userInfo.password.trim()) {
        this.$notify.info({
          title: '提示',
          message: '您还没有输入密码'
        })
        return false
      }
      const res = await this.$API.home.reqLogin({
        name: this.userInfo.username,
        password: this.userInfo.password
      })
      if (res.status == 200) {
        localStorage.setItem('token', res.token)
      }
      console.log(res)

      this.$router.push('/home')
      const otherData = {
        ava: this.userInfo.ava,
        introduce: this.userInfo.introduce
      }
      if (!localStorage.getItem('userInfo')) {
        localStorage.setItem('userInfo', JSON.stringify(otherData))
        return
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
        display: -webkit-inline-box;
        width: 90%;
        p {
          margin: 10px 0 0 0;
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
