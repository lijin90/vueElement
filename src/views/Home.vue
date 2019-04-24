<template>
    <div>
        <el-row class="container">
            <el-col :span="24" class="header">
                <!-- 折叠按钮 -->
                <div class="collapse-btn" @click="collapseChage">
                    <i class="el-icon-menu"></i>
                </div>
                <el-col class="logo" :span="8">
                    {{sysName}}
                </el-col>
                <el-col :span="4" class="userinfo">
                    <el-dropdown trigger="click">
                    <span class="el-dropdown-link userinfo-inner"><img
                            src="../assets/headpic.png"/>
                        <!--{{$store.state.NAME}}-->
                        {{orgName}}
                        <!--用户名-->
                    </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="CheckPassword">修改密码</el-dropdown-item>
                            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-col>
            <el-col :span="24" class="main">
                <aside>
                    <el-menu
                            :collapse="collapse"
                            :unique-opened="true"
                            mode="vertical"
                            default-active="1-1"
                            background-color="#324057"
                            text-color="#fff"
                            active-text-color="#409eff"
                            class="el-menu-vertical-demo">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>项目管理</span>
                            </template>
                            <el-menu-item-group>
                                <template v-if="GetMenus.indexOf('MENU_XMXXLB')!=-1">
                                    <router-link to="/MENU_XMXXLB" tag="li">
                                        <el-menu-item index="1-1">
                                            <span slot="title">项目信息列表</span>
                                        </el-menu-item>
                                    </router-link>
                                </template>
                                <template v-if="GetMenus.indexOf('MENU_XMTJ')!=-1">
                                    <router-link to="/MENU_XMTJ" tag="li">
                                        <el-menu-item index="1-2">
                                            <span slot="title">项目统计</span>
                                        </el-menu-item>
                                    </router-link>
                                </template>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>项目监管</span>
                            </template>
                            <el-menu-item-group>
                                <template v-if="GetMenus.indexOf('MENU_XMJGMB')!=-1">
                                    <router-link to="/MENU_XMJGMB" tag="li">
                                        <el-menu-item index="2-1">
                                            <span slot="title">项目监管模板</span>
                                        </el-menu-item>
                                    </router-link>
                                </template>
                                <template v-if="GetMenus.indexOf('MENU_XMJGXXGL')!=-1">
                                    <router-link to="/MENU_XMJGXXGL" tag="li">
                                        <el-menu-item index="2-2">
                                            <span slot="title">项目监管信息</span>
                                        </el-menu-item>
                                    </router-link>
                                </template>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-setting"></i>
                                <span>专家库管理</span>
                            </template>
                            <el-menu-item-group>
                                <template v-if="GetMenus.indexOf('MENU_ZJCQ')!=-1">
                                    <router-link to="/MENU_ZJCQ" tag="li">
                                        <el-menu-item index="3-1">
                                            <span slot="title">专家抽取</span>
                                        </el-menu-item>
                                    </router-link>
                                </template>
                                <template v-if="GetMenus.indexOf('MENU_ZJXXGL')!=-1">
                                    <router-link to="/MENU_ZJXXGL" tag="li">
                                        <el-menu-item index="3-2">
                                            <span slot="title">专家信息管理</span>
                                        </el-menu-item>
                                    </router-link>
                                </template>
                            </el-menu-item-group>
                        </el-submenu>
                        <!--不收权限控制一直显示-->
                        <template v-for="(menu,index) in N_qx">
                            <router-link :to="menu.path" tag="li">
                                <el-menu-item :index="menu.path" :key="menu.path">
                                    <i :class="menu.icon"></i>
                                    <span slot="title">{{ menu.name }}</span>
                                </el-menu-item>
                            </router-link>
                        </template>
                        <template>
                            <el-menu-item>
                                <i class="fa fa-margin fa-server"></i>
                                <!--<router-link :to="YWPTURL">-->
                                    <!--<span>12321</span>-->
                                <!--</router-link>-->
                                <a class="WarpLink" :href="YWPTURL" target="_blank" slot="title">系统管理</a>
                            </el-menu-item>
                        </template>

                        <!--<template v-for="(menu,index) in items">-->
                        <!--<el-submenu v-if="menu.children" :index="menu.path" :key="menu.path">-->
                        <!--<template slot="title">-->
                        <!--<i :class="'fa fa-margin '+menu.icon"></i>-->
                        <!--<span slot="title">{{menu.name}}</span>-->
                        <!--</template>-->
                        <!--<router-link tag="li" v-for="(citem,cindex) in menu.children"-->
                        <!--:to="citem.path" :key="cindex">-->
                        <!--<el-menu-item-->
                        <!--:index='citem.path'>-->
                        <!--<span slot="title">{{citem.name}}</span>-->
                        <!--</el-menu-item>-->
                        <!--</router-link>-->
                        <!--</el-submenu>-->
                        <!--<template v-else>-->
                        <!--<router-link :to="menu.path" tag="li">-->
                        <!--<el-menu-item :index="menu.path" :key="menu.path">-->
                        <!--<i :class="menu.icon"></i>-->
                        <!--<span slot="title">{{ menu.name }}</span>-->
                        <!--</el-menu-item>-->
                        <!--</router-link>-->
                        <!--</template>-->
                        <!--</template>-->
                    </el-menu>
                </aside>
                <section class="content-container">
                    <div class="grid-content bg-purple-light">
                        <el-col :span="24" class="content-wrapper">
                            <transition name="fade" mode="out-in">
                                <!--<keep-alive>-->
                                <router-view></router-view>
                                <!--</keep-alive>-->
                            </transition>
                        </el-col>
                    </div>
                </section>
            </el-col>
        </el-row>
        <!-- 弹框页面 -->
        <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%">
            <el-form :model="resetForm" status-icon :rules="resetFormRules" ref="resetForm" label-width="100px">
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="新密码" prop="newpwd">
                            <el-input type="password" v-model="resetForm.newpwd"
                                      placeholder="请输入密码长度为6 - 18个字符"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="确认密码" prop="renewpwd">
                            <el-input type="password" v-model="resetForm.renewpwd"
                                      placeholder="确认密码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click='onSubmit("resetForm")' :disabled="db">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>

</template>
<script>
    // import Barrett from '../common/js/Barrett.js'
    // import BigInt from '../common/js/BigInt.js'
    // import RSA from '../common/js/RSA.js'
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入新密码'));
                } else if (value.toString().length < 6 || value.toString().length > 18) {
                    callback(new Error('密码长度为6 - 18个字符'))
                } else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.resetForm.newpwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                db:false,
                YWPTURL:sessionStorage.getItem("YWPTURL"),//运维平台
                orgName: '',//右上角显示的单位
                dialogVisible: false,
                collapse: false,
                userName:'',
                ls_btn: [],//储存临时项目按钮
                homepage_btn: [],//储存首页项目按钮
                qx_btn: [],//先取出后台配置所有的权限按钮
                GetMenus: [],
                N_qx: [{
                    icon: "el-icon-document",
                    name: "项目档案",
                    path: "MENU_DAGL",
                    title: "'MENU_DAGL'",
                },

                    {
                        icon: "el-icon-tickets",
                        name: "通讯录管理",
                        path: "MENU_TXLGL",
                        title: "'MENU_TXLGL'",
                    },
                    {
                        icon: "el-icon-picture",
                        name: "资料库管理",
                        path: "MENU_ZLKGL",
                        title: "'MENU_ZLKGL'"
                    },],
                // items: [//解决addrouters 刷新路由失效
                //     {
                //         icon: "el-icon-message",
                //         name: "项目管理",
                //         path: "Home",
                //         children: [
                //             {
                //                 path: '/MENU_XMXXLB',
                //                 name: '项目信息列表',
                //                 title: "'MENU_XMXXLB'",
                //             },
                //
                //             {
                //                 path: "/MENU_XMTJ",
                //                 name: "项目统计",
                //                 title: "'MENU_XMTJ'"
                //             },
                //         ]
                //     },
                //     {
                //         icon: "fa-asterisk",
                //         name: "项目监管",
                //         path: "Supervision",
                //         title: 'YWPT_Supervision',
                //         children: [
                //             {path: '/MENU_XMJGMB', name: '项目监管模板', title: "'MENU_XMJGMB'"},
                //             {path: "/MENU_XMJGXXGL", name: "项目监管信息", role: 0, title: "'MENU_XMJGXXGL'"},
                //             // {path: '/MENU_XXJGJDXX', name: '项目监管进度信息', title: "'MENU_XXJGJDXX'"},
                //         ]
                //     },
                //     {
                //         icon: "el-icon-news",
                //         name: "专家库管理",
                //         path: "info",
                //         title: 'YWPT_ZJPSK',
                //         children: [
                //             {path: "/MENU_ZJCQ", name: "专家抽取", role: 0, title: "'MENU_ZJCQ'"},
                //             {path: "/MENU_ZJXXGL", name: "专家信息管理", role: 0, title: "'MENU_ZJXXGL'"}
                //         ]
                //     },
                //     {
                //         icon: "el-icon-document",
                //         name: "项目档案",
                //         path: "MENU_DAGL",
                //         title: "'MENU_DAGL'",
                //     },
                //
                //     {
                //         icon: "el-icon-tickets",
                //         name: "通讯录管理",
                //         path: "MENU_TXLGL",
                //         title: "'MENU_TXLGL'",
                //     },
                //     {
                //         icon: "el-icon-picture",
                //         name: "资料库管理",
                //         path: "MENU_ZLKGL",
                //         title: "'MENU_ZLKGL'"
                //     },
                //
                // ],
                sysUserName: sessionStorage.getItem('Name'),
                sysName: '吉林省林业和草原局项目管理系统',
                //重置密码
                resetForm: {
                    newpwd: '',
                    renewpwd: '',
                },
                resetFormRules: {
                    newpwd: [
                        {required: true, validator: validatePass, trigger: 'blur'}
                    ],
                    renewpwd: [
                        {required: true, validator: validatePass2, trigger: 'blur'}
                    ]
                },
                MountButton: []//按钮权限
            }
        },

        methods: {
            // 修改密码
            CheckPassword() {
                this.dialogVisible = true;
                this.resetForm = {
                    newpwd: '',
                    renewpwd: '',
                }
            },
            onSubmit(formName) {
                var that = this;
                that.db=true;
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        var datas = JSON.stringify({
                            "CONFIRMPWD": that.resetForm.renewpwd,
                            'USERNAME':that.userName
                        })
                        that.$axios({
                            method: "post",
                            url: "/jlxmgl/updatePwd.do",
                            data: that.$qs.stringify({data: datas})
                        }).then(function (res) {
                            console.log(res.data)
                            if (res.data == true) {
                                that.$message({
                                    message: '恭喜你，修改密码成功！',
                                    type: 'success'
                                });
                                that.db=false;
                                window.location.href = '/jlxmgl/login.do';
                            }
                        }).catch(function (error) {
                            console.log(error);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 侧边栏折叠
            collapseChage() {
                this.collapse = !this.collapse;
            },
            //退出登录
            logout: function () {
                var that = this;
                this.$confirm('确认退出吗?', '提示', {
                }).then(() => {
                    that.$axios({
                        method: "post",
                        url: "/jlxmgl/logout.do",
                    }).then(function (res) {
                        //每次退出登录把从后台获取的值清除掉
                        sessionStorage.removeItem('userName');
                        sessionStorage.removeItem('orgName');
                        sessionStorage.removeItem('orgId');
                        sessionStorage.removeItem('YWPTURL');
                        window.location.href = '/jlxmgl/login.do';
                    }).catch(function (error) {
                        console.log(error);
                    });
                }).catch(() => {
                    console.log('error logout!!');
                    return false;
                });
            },
            //折叠导航栏
            collapseHead: function () {
                this.collapsed = !this.collapsed;
            },
            showMenu(i, status) {
                this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
            }
        },
        created() {
            // var Base=window.location.href.split('#/')[1].toString();
            var that = this;
            that.userName = sessionStorage.getItem("userName");
            console.log( that.userName);
            that.orgName = sessionStorage.getItem("orgName");
            //运维平台接口
            // that.$axios.get("api/jlxmgl/roleFunctions.do?username=test").then((res) => {
            that.$axios.get(that.YWPTURL+"/roleFunctions.do?username="+that.userName).then((res) => {
                var BUTTONS = res.data.data.BUTTONS;
                for (var i = 0; i < BUTTONS.length; i++) {
                    this.MountButton.push(BUTTONS[i].replace(/\'/g, ""))
                }
                // this.MountButton = JSON.stringify(this.MountButton);
                localStorage.setItem("MountButton", JSON.stringify(this.MountButton));
                // 因为只有三个菜单需要权限所以写死（需求一直在变化）
                for (var i = 0; i < res.data.data.MENUS.length; i++) {
                    that.GetMenus.push(res.data.data.MENUS[i].replace(/\'/g, ""))
                }
                if (res.data.result == "success") {
                    localStorage.setItem("Menu_Btn", JSON.stringify(BUTTONS));
                    that.$store.commit('getLS_btn', JSON.stringify(BUTTONS));
                    // console.log(BUTTONS.indexOf(Base));
                    // if(BUTTONS.indexOf(Base)<0){
                    //     that.$router.push({
                    //         path: 'MENU_ZLKGL',
                    //     })
                    // }
                    // for (var i = 0; i < that.items.length; i++) {
                    //     if (that.items[i].children == undefined) {
                    //         if (menu.indexOf(that.items[i].title) < 0) {//运维平台返回的数据与自己定义好的路由对比如果没有返回的就从自己的路由中删除
                    //             that.items.splice(i, 1);
                    //         }
                    //     } else if (that.items[i].children != undefined) {
                    //         for (var j = 0; j < that.items[i].children.length; j++) {
                    //             if (menu.indexOf(that.items[i].children[j].title) < 0) {//运维平台返回的数据与自己定义好的路由对比如果没有返回的就从自己的路由中删除
                    //                 that.items[i].children.splice(j, 1);
                    //                 j--;
                    //             }
                    //         }
                    //         if (that.items[i].children.length == 0) {//循环完成之后删除children长度为0的空数组
                    //             that.items.splice(i, 1)
                    //         }
                    //     }
                    // }
                }

            }).catch((response) => {
                console.log(response);
            })
        }
    }

</script>
<style>
    .el-menu-item-group__title {
        padding: 0px 0px !important;
    }
</style>
<style scoped lang="scss">
    @import '~scss_vars';

    .WarpLink {
        color: #fff;
        text-decoration: none;
    }

    .bg-purple-light, .content-wrapper {
        height: 100%;
    }

    .container .main .content-container[data-v-5bd8bda9] {
        overflow-y: auto;
    }

    /*.menu-expanded ul {*/
    /*width: 100% !important;*/
    /*}*/
    .collapse-btn {
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 60px;
        font-size: 22px;
    }

    .container .header .logo[data-v-5bd8bda9] {
        border: none !important;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }

    .container {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;

        .header {
            height: 60px;
            line-height: 60px;
            background: #545C64;
            color: #fff;

            .userinfo {
                text-align: right;
                padding-right: 35px;
                float: right;
                height: 60px;

                .userinfo-inner {
                    cursor: pointer;
                    color: #fff;

                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 20px;
                        margin: 10px 0px 10px 10px;
                        float: right;
                    }
                }
            }

            .logo {
                //width:230px;
                height: 60px;
                font-size: 22px;
                /*padding-left: 20px;*/
                padding-right: 20px;
                border-color: rgba(238, 241, 146, 0.3);
                border-right-width: 1px;
                border-right-style: solid;

                img {
                    width: 40px;
                    float: left;
                    margin: 10px 10px 10px 18px;
                }

                .txt {
                    color: #fff;
                }
            }
        }

        .main {
            display: flex;
            // background: #324057;
            position: absolute;
            top: 60px;
            bottom: 0px;
            overflow: hidden;

            aside {
                .el-menu {
                    height: 100%;
                }

                .collapsed {
                    width: 60px;

                    .item {
                        position: relative;
                    }

                    .submenu {
                        position: absolute;
                        top: 0px;
                        left: 60px;
                        z-index: 99999;
                        height: auto;
                        display: none;
                    }

                }
            }

            .menu-collapsed {
                flex: 0 0 60px;
                width: 60px;
            }

            .menu-expanded {
                flex: 0 0 230px;
                width: 230px;
            }

            .content-container {
                // background: #f1f2f7;
                flex: 1;
                // position: absolute;
                // right: 0px;
                // top: 0px;
                // bottom: 0px;
                // left: 230px;
                overflow-y: scroll;
                padding: 20px;

                .breadcrumb-container {
                    //margin-bottom: 15px;
                    .title {
                        width: 200px;
                        float: left;
                        color: #475669;
                    }

                    .breadcrumb-inner {
                        float: right;
                    }
                }

                .content-wrapper {
                    background-color: #fff;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>