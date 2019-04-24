import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'
import qs from 'qs'
Vue.prototype.$qs = qs;
// 引入 axios
import axios from 'axios'
Vue.prototype.$axios = axios;//把axios挂载到vue上
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        userName: sessionStorage.getItem("userName"),
        qx_btn: [],//按钮
        Moban: [],//按钮
        homepage_btn: [],
        // NAME: sessionStorage.getItem("NAME"),
        // ROUTES:[],
        // ROUTES: JSON.parse(sessionStorage.getItem("ROUTES")),
        changePrice:false,
        SHJG:[],//审核结果
        Invest:[],
        disabled:false,
    },
    mutations: {
        getLS_btn(state, res) {
            sessionStorage.setItem('state.qx_btn',res);
        },
        getdata(state,res){
            state.Invest=res
            console.log(state.Invest)
        }
    },
    actions: {
        getdata(context){
            var that=this;
            //获取投资类别列表
            axios({
                // method: "post",
                url: "http://jsonplaceholder.typicode.com/users",
                // data: that.$qs.stringify({data: datas})
            }).then(function (res) {
                console.log(res);
                context.commit('getdata',res.data)
            }).catch(function (error) {
                console.log(error);
            });
        }
    },

})
