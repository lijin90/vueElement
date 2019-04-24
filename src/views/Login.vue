<template>
    <div class="bgtp">
        <div class="fore-login-logo"> </div>
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
                 class="demo-ruleForm login-container">
            <h3 class="title">用户登录</h3>
            <p class="status">请输入用户名与密码</p>
            <el-form-item prop="account">
                <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号">
                </el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;background: #119988" @click.native.prevent="handleSubmit2" :loading="logining">
                    登录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {adminRouter} from '../routes.js'
    export default {
        data() {
            return {
                logining: false,
                ruleForm2: {
                    account: '',
                    checkPass: ''
                },
                rules2: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                    ],
                    checkPass: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ]
                },
                checked: true
            };
        },
        methods: {
            handleSubmit2(ev) {
                var that = this;
                that.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        this.$message({
                            message: '恭喜你，登陆成功！',
                            type: 'success'
                        });
                        // if (that.ruleForm2.account == 'admin') {//总管理看到 项目批复/资金下达
                        //     for (var i = 0; i < adminRouter.length; i++) {
                        //         that.$router.options.routes[2].children.push(adminRouter[i])
                        //     }
                        //     that.$router.addRoutes(that.$router.options.routes);
                        //     that.$store.commit('SET_ROUTES', that.$router.options.routes);
                        // }else{//否则看不到
                        //     that.$store.commit('SET_ROUTES', that.$router.options.routes);
                        // }
                        // console.log(that.$store.state.ROUTES)
                        that.$store.commit('SET_NAME', that.ruleForm2.account);
                        that.$router.push({
                            path: 'projectManage',
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
        },
        created() {
        },
    }
</script>

<style lang="scss" scoped>
   p.status{
       color: #119988;
   }
    .bgtp{
        position: relative;
        background: url(../assets/backlogin.png) center center no-repeat;
        background-size: 100% 100%;
        height: 100%;
    }
    .fore-login-logo {
        position: absolute;
        top:80px;
        left:200px;
        width: 750px;
        height: 100px;
        background: url(../assets/nnxyw2.png) no-repeat center;
        background-size: 70%;
    }
    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        /*margin: 180px auto;*/
        position: absolute;
        bottom:25%;
        right: 23%;
        width:230px;
        padding: 35px 35px 35px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        /*box-shadow: 0 0 25px #cac6c6;*/

        .title {
            margin: 0px auto 20px auto;
            text-align: center;
            color: #505458;
        }

        .remember {
            margin: 0px 0px 35px 0px;
        }
    }
</style>