import request from '@/utils/request'
// const token = localStorage.getItem('token') || ''

// 登录
export function reqLogin(data) {
  return request({
    url: '/api/logins',
    method: 'post',
    data
  })
}

// 获取数据
export function reqUserData() {
  return request({
    url: '/getUser',
    method: 'GET'
  })
}
