import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import store from './vuex/store'
import Vuex from 'vuex'
import axios from 'axios'//引入axios
import qs from 'qs'
// 引入echarts
import echarts from 'echarts'
import 'babel-polyfill';

Vue.prototype.$echarts = echarts
// 加密
import JsEncrypt from 'jsencrypt'

Vue.prototype.$jsEncrypt = JsEncrypt

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios;//把axios挂载到vue上
Vue.prototype.$qs = qs;
import $ from 'jquery'
import router from './routes'
import 'font-awesome/css/font-awesome.min.css'
// 引入公共的js文件
import common from "./common/js/common.js"
// import QXAN from "./common/js/QXAN.js"
Vue.prototype.common = common
Vue.use(ElementUI)
Vue.use(Vuex)
//权限检查方法
Vue.prototype.$_has = function (value) {
    let isExist = false;
    let buttonpermsStr = localStorage.getItem('Menu_Btn');
    // console.log(buttonpermsStr);
    if (buttonpermsStr == undefined || buttonpermsStr == null) {
        return false;
    }
    let buttonperms = JSON.parse(buttonpermsStr);
    for (let i = 0; i < buttonperms.length; i++) {
        var bb = buttonperms[i].replace(/\'/g, "");
        if (bb.indexOf(value) > -1) {
            isExist = true;
            break;
        }
    }
    return isExist;
};
/**权限指令**/
Vue.directive('has', {
    bind: function (el, binding) {
        // console.log(el)
        if (!Vue.prototype.$_has(binding.value)) {
            setTimeout(() => el.parentNode.removeChild(el))
            // el.parentNode.removeChild(el);
        }
    }
});
// 判断是否登录未登录跳转到登录界面
router.beforeEach((to, from, next) => {
    // console.log(to,from)
    var IsLogin = sessionStorage.getItem('userName');
    // var IsLogin = 1;
    if (IsLogin) {
        next();
    } else {
        window.location.href = '/jlxmgl/login.do';
    }
});
if (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) < 11) {
    alert("尽量使用谷歌，火狐，360等浏览器");
}
new Vue({
    //el: '#app',
    //template: '<App/>',
    router,
    store,
    //components: { App }
    render: h => h(App)
}).$mount('#app')


