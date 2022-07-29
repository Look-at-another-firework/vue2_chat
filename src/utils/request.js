import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: '/chat',
  timeout: 5000,
  withCredentials: false // 表示跨域请求时是否需要使用凭证
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token') || ''
    // 判断token存在再做配置
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
