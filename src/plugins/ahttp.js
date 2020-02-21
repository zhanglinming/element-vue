/*插件模块*/
import axios from 'axios'
const aHttpServer = {}

aHttpServer.install = (Vue) => {
  axios.default.baseURL = 'http://web.juhe.cn:8080/finance/stock/'
  /*添加实例方法*/
  Vue.prototype.$http = axios
}

export default aHttpServer
