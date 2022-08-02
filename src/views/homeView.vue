<template>
  <div class="home">
    <el-container>
      <!-- 左侧 -->
      <el-aside width="200px">
        <!-- 头像名称 -->
        <div class="content">
          <img :src="avaUrl" alt="" />
          <p>{{ name }}</p>
        </div>
        <div class="menu1">
          <!-- 左侧栏一 -->
          <el-menu
            default-active="1"
            background-color="#2dafff"
            text-color="#ffffff"
            active-text-color="#ffffff"
          >
            <el-menu-item index="1">
              <i class="iconfont icon-wodehaoyou"></i>
              <span @click="$router.push('/home/friends')">聊天室好友</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="iconfont icon-shezhi"></i>
              <span slot="title" @click="$router.push('/home/set')">设置</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="menu2">
          <!-- 左侧栏二 -->
          <el-menu background-color="#2dafff" text-color="#ffffff" active-text-color="#ffffff">
            <el-menu-item index="3">
              <i class="iconfont icon-dingbudaohang-zhangh"></i>
              <span @click="toNext = true">退出</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="iconfont icon-bangzhu"></i>
              <span slot="title" @click="$router.push('/home/detail')">帮助</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <!-- 右侧内容区 -->
      <el-container>
        <!-- 头部 -->
        <el-header>
          <div class="search">
            <!-- 输入框 -->
            <el-input
              v-model="data"
              placeholder="请输入你需要搜索的内容"
              clearable
              prefix-icon="el-icon-search"
            ></el-input>
          </div>
          <!-- 退出按钮 -->
          <div class="next">
            <el-button type="danger" @click="toNext = true"> 退出登录</el-button>
          </div>
        </el-header>
        <el-main>
          <!-- 展示区 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

    <!-- 提示框 -->
    <el-dialog title="提示" :visible.sync="toNext" width="25%">
      <span>每次退出都会清除聊天内容，确定要退出吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="toNext = false">取 消</el-button>
        <el-button type="primary" @click="toLogin">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 搜索的内容
      data: '',
      // 是否显示提示框
      toNext: false,
      // 名称
      name: '',
      // 图片默认地址
      avaUrl: require('@/assets/images/1.jpeg')
    }
  },
  methods: {
    // 退出登录
    toLogin() {
      // 打开对话框
      this.toNext = false
      // 获取离开的数组
      this.$socket.emit('afterBody')
      // 跳转
      this.$router.push('/login')
      // 清除本地
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      // 关闭连接
      this.$socket.close()
    },
    // 获取名字
    async getUserInfo() {
      const res = await this.$API.home.reqUserData()
      if (res.status == 200) {
        // 发请求获取名称
        this.name = res.data.name
      }
    }
  },
  mounted() {
    this.getUserInfo()
    // 获取登录图片随机数
    this.$socket.emit('getUserAva')
  },
  sockets: {
    getUserAvaReturn(data) {
      // 设置随机数
      this.avaUrl = require('@/assets/images/' + data.ava + '.jpeg')
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  .el-container {
    height: 100%;
    .el-aside {
      background-color: #2dafff;
      text-align: center;
      overflow: hidden;
      .content {
        height: 100px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0 25px;
        box-sizing: border-box;
        color: #eee;
        font-size: 16px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
      .menu1 {
        .el-menu-item {
          display: flex;
          justify-content: space-around;
          align-items: center;
          span {
            display: block;
            width: 56px;
            height: 56px;
          }
          i {
            color: #ffffff;
          }
        }
        .el-menu-item.is-active {
          background-color: rgb(36, 140, 204) !important;
        }
      }
      .menu2 {
        margin-top: 350px;
        .el-menu-item {
          display: flex;
          justify-content: space-around;
          align-items: center;

          span {
            display: block;
            width: 56px;
            height: 56px;
          }
          i {
            color: #fff;
          }
        }
      }
    }
    .el-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #eee;
      .search {
        width: 500px;
      }
    }
    .el-main {
      width: 100%;
      height: 100%;
      padding: 20px 20px 0 20px;
      box-sizing: border-box;
    }
  }
}
</style>
