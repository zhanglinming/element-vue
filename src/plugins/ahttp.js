/*插件模块*/
import axios from 'axios'
const aHttpServer = {}

aHttpServer.install = (Vue) => {
  axios.default.baseURL = '/apis/gnyj/query?=&key=a1e918176df5819bb023a1748807669d'
  /*添加实例方法*/
  Vue.prototype.$http = axios
}

export default aHttpServer
