<template>
  <div class="wrap">
    <button @click="connected">连接Socket</button>
    <button @click="socketSendmsg">发送数据</button>
  </div>
</template>

<script>
export default {
  methods: {
    connected() {
      this.$socket.open() // 开始连接socket
    },
    socketSendmsg() {
      this.$socket.emit('my other event', { my: 'data' })
    }
  },
  sockets: {
    connecting() {
      console.log('正在连接')
    },
    disconnect() {
      console.log('Socket 断开')
    },
    connect_failed() {
      console.log('连接失败')
    },
    connect() {
      console.log('socket connected')
    },
    news(data) {
      console.log(data)
    },
    open(data) {
      console.log(data)
    }
  }
}
</script>
