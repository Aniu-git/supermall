import axios from 'axios'

export function request(config) {
  // 创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })
  // 请求拦截
  instance.interceptors.request.use(config => {
    // 处理...
    return config
  }, err => {
    return err
  })
  // 响应拦截
  instance.interceptors.response.use(response => {
    // 处理...
    return response.data
  }, err => {
    return err
  })

  // 发送真正的网络请求
  return instance(config)
}