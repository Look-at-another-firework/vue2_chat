<template>
  <div class="set">
    <el-card>
      <el-form :model="MyData" :rules="rules" ref="ruleForm" label-width="100px">
      <!-- 名称 -->
        <el-form-item label="新用户名" prop="name" style="width: 400px">
          <el-input v-model="MyData.name" clearable placeholder="请输入新用户名"></el-input>
        </el-form-item>
        <!-- 旧密码 -->
        <el-form-item label="旧密码" prop="password" style="width: 400px">
          <el-input
            v-model="MyData.password"
            type="password"
            clearable
            placeholder="请输入旧密码"
          ></el-input>
        </el-form-item>
        <!-- 新密码 -->
        <el-form-item label="新密码" prop="passwords" style="width: 400px">
          <el-input
            v-model="MyData.passwords"
            type="password"
            clearable
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <!-- 签名 -->
        <el-form-item label="个性签名" prop="desc">
          <el-input
            type="textarea"
            v-model="MyData.desc"
            style="border: 1px solid #eee"
            maxlength="200"
            placeholder="请输入个性签名"
            :rows="2"
          ></el-input>
        </el-form-item>
        <!-- 图片上传禁用（后续开发）
        <el-form-item label="上传头像">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :limit="1"
            :file-list="fileList"
            :on-change="fileChange"
            ref="uploads"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="showImg">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
          -->
        <el-form-item>
          <el-button type="primary" @click="changeInfo">修改</el-button>
          <el-button type="info" @click="info">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  data() {
    return {
      // 验证规则
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' },
          { min: 0, max: 200, message: '最长200个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        passwords: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      },
      // 收集信息
      MyData: {
        name: '',
        password: '',
        passwords: '',
        desc: ''
      },
      // 预览图片地址 目前未开发
      dialogImageUrl: '',
      // 预览图片开关 目前未开发
      showImg: false,
      // 图标开关 目前未开发
      disabled: false,
      // 上传图片地址保存 目前未开发
      fileList: []
    }
  },
  methods: {
    // 移除图片 目前未开发
    handleRemove() {
      delete this.fileList[0]
    },
    // 预览图片 目前未开发
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.showImg = true
    },
    // 下载图片 目前未开发
    handleDownload(file) {
      const image = new Image()
      image.setAttribute('crossOrigin', 'anonymous')
      image.onload = function () {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        const url = canvas.toDataURL('image/png')
        const a = document.createElement('a')
        const event = new MouseEvent('click')
        a.download = file.name || '图片'
        a.href = url
        a.dispatchEvent(event)
      }
      image.src = file.url
    },
    // 修改信息
    async changeInfo() {
      // 获取密码
      const res = await this.$API.home.reqUserData()
      let psd = ''
      if (res.status == 200) {
        psd = res.data.password
      }
      // 验证密码
      if (
        this.MyData.password.trim() == psd &&
        this.MyData.password.trim() !== this.MyData.passwords.trim()
      ) {
        // 其他信息的验证
        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            let userInfo = JSON.parse(localStorage.getItem('userInfo'))
            // 修改io
            this.$socket.emit('setInfo', {
              // 以前的名字
              name: userInfo.name,
              // 新的名字
              newName: this.MyData.name,
              // 介绍
              introduce: this.MyData.desc
            })
          } else {
            console.log('error')
            return false
          }
        })
      } else if (this.MyData.password.trim() == this.MyData.passwords.trim()) {
        this.$notify.error({
          title: '错误',
          message: '新密码不能和旧密码一致'
        })
      } else {
        this.$notify.error({
          title: '错误',
          message: '旧密码错误'
        })
      }
    },
    // 重置操作
    info() {
      this.MyData = {
        name: '',
        password: '',
        passwords: '',
        desc: ''
      }
    },
    fileChange(file) {
      this.$refs.uploads.clearFiles() //form表单的清空操作
      this.fileList.push(file)
    }
  },
  sockets: {
    // 接收修改后的个人信息
    async setInfoReturn(data) {
      // userInfo.ava = this.fileList[0] ? this.fileList[0].url : userInfo.ava  图片修改功能 目前未开发
      // 重新保存
      localStorage.setItem('userInfo', JSON.stringify(data))
      // 重新获取token
      const res = await this.$API.home.reqLogin({
        name: this.MyData.name,
        password: this.MyData.passwords
      })
      if (res.status == 200) {
        localStorage.setItem('token', res.token)
      }
      // 提示
      Message({
        message: '修改成功',
        type: 'success',
        duration: 3 * 1000
      })
      // 回到首页
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="less" scoped>
.set {
  width: 100%;
  height: 100%;
  .el-card {
    width: 100%;
    height: 97%;
    padding: 10px 0;
    box-sizing: border-box;
    .el-form {
      margin: 20px 0;
      .el-textarea {
        width: 50%;
        border-radius: 5px;
      }
    }
  }
}
</style>
