import Vue from 'vue'
import App from './App.vue'
import router from './router'
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

Vue.component('joinView', joinView)
Vue.component('myTalk', myTalk)
Vue.component('friendTalk', friendTalk)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
