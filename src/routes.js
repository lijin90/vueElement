import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
// import HomePage from './views/HomePage.vue'

// 获取专家管理列表
import MENU_ZJCQ from './views/ZJK/MENU_ZJCQ.vue'
import MENU_ZJXXGL from './views/ZJK/MENU_ZJXXGL.vue'
// 获取档案管理列表

import MENU_DAGL from './views/XMDA/MENU_DAGL.vue'


// 获取通讯录列表
import MENU_TXLGL from './views/TXL/MENU_TXLGL.vue'
// 获取通讯录列表
import MENU_ZLKGL from './views/ZLK/MENU_ZLKGL.vue'

//项目列表
import MENU_XMXXLB from './views/XMGL/MENU_XMXXLB.vue'
//项目新增
import add from './views/XMGL/add.vue'
//项目新增
import add_editer from './views/XMGL/add_editer.vue'
import MENU_XMTJ from './views/XMGL/MENU_XMTJ.vue'
//项目详情
import cssb from './views/XMGL/cssb.vue'
// 获取通讯录列表
import MENU_XMJGXXGL from './views/XMJG/MENU_XMJGXXGL.vue'
// // 获取项目监管列表
// import MENU_XXJGJDXX from './views/XMJG/MENU_XXJGJDXX.vue'
// // 获取项目监管填报
import MENU_XMJGMB from './views/XMJG/MENU_XMJGMB.vue'
// // 获取项目监管新增
import SupAdd from './views/XMJG/SupAdd.vue'
// // 获取项目监管详情
import SupDetail from './views/XMJG/SupDetail.vue'
// // 获取监管信息列表
import SupJg from './views/XMJG/SupJg.vue'
Vue.use(VueRouter)

const router = new VueRouter({ //静态路由，登录、404
    // mode: 'history',
    // base:'/dist',
    routes: [
        // { path: '*', name: '/404', component: NotFound },
        // { path: '/', redirect: '/Default'},
        { path: '*', redirect: '/MENU_XMXXLB'},
        {
            path: '/Home',
            component: Home,
            name: 'Home',
            iconCls: 'el-icon-message',//图标样式class
            children: [
                {
                    path: '/MENU_XMXXLB',
                    name: 'MENU_XMXXLB',
                    component: MENU_XMXXLB
                },

                {
                    path: '/MENU_ZLKGL',
                    name: 'MENU_ZLKGL',
                    component: MENU_ZLKGL
                },

                {
                    path: '/MENU_XMJGXXGL',
                    name: 'MENU_XMJGXXGL',
                    component: MENU_XMJGXXGL
                },
                // {
                //     path: '/MENU_XXJGJDXX',
                //     name: 'MENU_XXJGJDXX',
                //     component: MENU_XXJGJDXX
                // },
                {
                    path: '/MENU_XMJGMB',
                    name: 'MENU_XMJGMB',
                    component: MENU_XMJGMB
                },
                {
                    path: '/SupAdd',
                    name: 'SupAdd',
                    component: SupAdd
                },
                {
                    path: '/SupDetail',
                    name: 'SupDetail',
                    component: SupDetail
                },
                {
                    path: '/SupJg',
                    name: 'SupJg',
                    component: SupJg
                },
                {
                    path: '/add',
                    name: 'add',
                    component: add
                },
                {
                    path: '/add_editer',
                    name: 'add_editer',
                    component: add_editer
                },

                {
                    path: '/MENU_TXLGL',
                    name: 'MENU_TXLGL',
                    component: MENU_TXLGL,
                },


                {
                    path: '/cssb',
                    name: 'cssb',
                    component: cssb,
                    hidden: true,
                },
                {path: '/MENU_ZJCQ', component: MENU_ZJCQ, name: 'MENU_ZJCQ'},
                {path: '/MENU_ZJXXGL', component: MENU_ZJXXGL, name: 'MENU_ZJXXGL'},
                {path: '/MENU_DAGL', component: MENU_DAGL, name: 'MENU_DAGL'},
                {path: '/MENU_XMTJ', component: MENU_XMTJ, name: 'MENU_XMTJ'},
                // {path: '/fileSearch', component: fileSearch, name: 'fileSearch'},
                // {path: '/fileHistory', component: fileHistory, name: 'fileHistory'},
                // {path: '/HomePage', component: HomePage, name: 'HomePage'},
                // {
                //     path: '/ApprovalPf',
                //     name: 'ApprovalPf',
                //     component: ApprovalPf,
                //     hidden: true,
                // },
                //
                // {
                //     path: '/editer',
                //     name: 'editer',
                //     component: editer,
                //     hidden: true,
                // },
            ]
        },
    ]
});
export default router //默认静态路由





