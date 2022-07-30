import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入api请求接口
import API from '@/api'
// 引入格式化样式
import './assets/css/Normalize.css'
import './assets/css/index.css'
// icon
import './assets/icon/iconfont.css'
// ele
import {
  Button,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  Input,
  Notification,
  Container,
  Aside,
  Header,
  Card,
  Main,
  Empty,
  Form,
  FormItem,
  Upload,
  Dialog
} from 'element-ui'
Vue.use(Button)
Vue.use(Input)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Card)
Vue.use(Empty)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Upload)
Vue.use(Dialog)
Vue.prototype.$notify = Notification

Vue.config.productionTip = false
// 公共组件
import joinView from '@/components/joinView.vue'
import myTalk from '@/components/myTalk.vue'
import friendTalk from '@/components/friendTalk.vue'
// socket.io
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

Vue.use(
  new VueSocketIO({
    debug: false,
    connection: SocketIO('http://127.0.0.1:3030', {
      autoConnect: true // 自动连接     这里为我项目需求  需要在指定情况下才连接socket
    }), //使用Socket.IO-client
    extraHeaders: { 'Access-Control-Allow-Origin': '*' }
  })
)

Vue.component('joinView', joinView)
Vue.component('myTalk', myTalk)
Vue.component('friendTalk', friendTalk)

Vue.prototype.$API = API

new Vue({
  // 这里为全局监听socket事件消息，监听函数这里只写了一点，其实很有很多事件。
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
    }
  },
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  render: (h) => h(App)
}).$mount('#app')
