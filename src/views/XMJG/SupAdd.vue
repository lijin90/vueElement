<template>
    <div id="add">
        <div class="jlxmName">
            <ul>
                <li>新增</li>
            </ul>
        </div>
        <el-form ref="Addform" :model="Addform" label-width="200px" :rules="rules">
            <el-row>
                <el-col :span="10" v-if="GetMobanArr.indexOf('项目名称')!=-1">
                    <el-form-item label="项目名称" prop="XMMC">
                        <el-input v-model="Addform.XMMC" placeholder="请输入项目名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" v-if="GetMobanArr.indexOf('建设单位')!=-1">
                    <el-form-item label="建设单位" prop="JSDW">
                        <el-input v-model="Addform.JSDW" placeholder="请输入建设单位"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" v-if="GetMobanArr.indexOf('实际开工时间')!=-1">
                    <el-form-item label="实际开工时间" prop="SJKGSJ">
                        <el-date-picker
                                v-model="Addform.SJKGSJ"
                                type="date"
                                style="width: 100%;"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="10" v-if="GetMobanArr.indexOf('实际竣工时间')!=-1">
                    <el-form-item label="实际竣工时间" prop="SJJGSJ">
                        <el-date-picker
                                v-model="Addform.SJJGSJ"
                                type="date"
                                style="width: 100%;"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="10" v-if="GetMobanArr.indexOf('招投标形式')!=-1">
                    <el-form-item label="招投标形式" prop="ZTBXS">
                        <el-select v-model="Addform.ZTBXS"
                                   placeholder="请选择"
                                   filterable
                                   style="width: 100%">
                            <el-option
                                    v-for="item in Zb"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="10" v-if="GetMobanArr.indexOf('形象进度')!=-1">
                    <el-form-item label="形象进度" prop="XXJD">
                        <el-select v-model="Addform.XXJD"
                                   placeholder="请选择"
                                   filterable
                                   style="width: 100%">
                            <el-option
                                    v-for="item in Xx"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="10" v-if="GetMobanArr.indexOf('总投资')!=-1">
                    <el-form-item label="总投资（万元）" prop="ZTZ">
                        <el-input v-model="Addform.ZTZ" placeholder="总投资" maxlength="10"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" v-if="GetMobanArr.indexOf('本次下达中央资金')!=-1">
                    <el-form-item label="本次下达中央资金（万元）" prop="BCXDZYZJ">
                        <el-input v-model="Addform.BCXDZYZJ" placeholder="本次下达中央资金" maxlength="10"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" v-if="GetMobanArr.indexOf('累积下达中央资金')!=-1">
                    <el-form-item label="累积下达中央资金（万元）" prop="LJXDZYZJ">
                        <el-input v-model="Addform.LJXDZYZJ" placeholder="累积下达中央资金" maxlength="10"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" v-if="GetMobanArr.indexOf('累计到位中央资金')!=-1">
                    <el-form-item label="累计到位中央资金（万元）" prop="LJDWZYZJ">
                        <el-input v-model="Addform.LJDWZYZJ" placeholder="累计到位中央资金" maxlength="10"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" v-if="GetMobanArr.indexOf('累计完成中央资金')!=-1">
                    <el-form-item label="累计完成中央资金（万元）" prop="LJWCZYZJ">
                        <el-input v-model="Addform.LJWCZYZJ" placeholder="累计完成中央资金" maxlength="10"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" v-if="GetMobanArr.indexOf('累计支付中央资金')!=-1">
                    <el-form-item label="累计支付中央资金（万元）" prop="LJZFZYZJ">
                        <el-input v-model="Addform.LJZFZYZJ" placeholder="累计支付中央资金" maxlength="10"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" v-if="GetMobanArr.indexOf('批准地方配套')!=-1">
                    <el-form-item label="批准地方配套（万元）" prop="PZDFPT">
                        <el-input v-model="Addform.PZDFPT" placeholder="批准地方配套" maxlength="10"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" v-if="GetMobanArr.indexOf('累计完成地方资金')!=-1">
                    <el-form-item label="累计完成地方资金" prop="LJDWDFZJ">
                        <el-input v-model="Addform.LJDWDFZJ" placeholder="累计完成地方资金" maxlength="10"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" v-if="GetMobanArr.indexOf('累计完成地方资金')!=-1">
                    <el-form-item label="累计完成地方资金（万元）" prop="LJWCDFZJ">
                        <el-input v-model="Addform.LJWCDFZJ" placeholder="累计完成地方资金"
                                  maxlength="10"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" v-if="GetMobanArr.indexOf('累计支付地方资金')!=-1">
                    <el-form-item label="累计支付地方资金（万元）" prop="LJZFDFZJ">
                        <el-input v-model="Addform.LJZFDFZJ" placeholder="累计支付地方资金" maxlength="10"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="GetMobanArr.indexOf('年度建设内容')!=-1">
                    <el-form-item label="年度建设内容" prop="NDJSNR">
                        <el-input v-model="Addform.NDJSNR" type="textarea" maxlength="100"
                                  placeholder="年度建设内容(100字以内)"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="GetMobanArr.indexOf('问题及建议')!=-1">
                    <el-form-item label="问题及建议" prop="WTJJY">
                        <el-input v-model="Addform.WTJJY" type="textarea" maxlength="100"
                                  placeholder="问题及建议(100字以内)"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item style="float: right;margin: 15px 0px">
                    <el-button type="primary" @click="submitForm('Addform')">保存</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    import bus from '../../common/js/eventBus'
    export default {
        name: "SupAdd",
        data() {
            return {
                Addform: {},
                Zb: [],//招标形式
                Xx: [],//形象进度
                GetMobanArr:this.$route.query.GetMobanArr,
                rules: {
                    XMMC: [{required: true, message: '请输入项目名称', trigger: 'blur'}],
                    JSDW: [{required: true, message: '请输入建设单位', trigger: 'blur'}],
                    SJKGSJ: [{required: true, message: '实际开工时间', trigger: 'blur'}],
                    SJJGSJ: [{required: true, message: '实际竣工时间', trigger: 'blur'}],
                    ZTBXS: [{required: true, message: '招投标形式', trigger: 'blur'}],
                    XXJD: [{required: true, message: '形象进度', trigger: 'blur'}],
                    ZTZ: [{required: true, validator:this.common.XmcheckNumber, trigger: 'blur'}],
                    BCXDZYZJ: [{required: true, validator:this.common.XmcheckNumber, trigger: 'blur'}],
                    LJXDZYZJ: [{required: true, validator:this.common.XmcheckNumber, trigger: 'blur'}],
                    LJDWZYZJ: [{required: true, validator:this.common.XmcheckNumber, trigger: 'blur'}],
                    LJWCZYZJ: [{required: true, validator:this.common.XmcheckNumber, trigger: 'blur'}],
                    LJZFZYZJ: [{required: true, validator:this.common.XmcheckNumber, trigger: 'blur'}],
                    PZDFPT: [{required: true, validator:this.common.XmcheckNumber, trigger: 'blur'}],
                    LJDWDFZJ: [{required: true, validator:this.common.XmcheckNumber, trigger: 'blur'}],
                    LJWCDFZJ: [{required: true, validator:this.common.XmcheckNumber, trigger: 'blur'}],
                    // LJZFDFZJ: [{required: true, message: '累计支付地方资金', trigger: 'blur'}],
                    LJZFDFZJ: [{required: true,validator:this.common.XmcheckNumber, trigger: 'blur'}],
                    NDJSNR: [{required: true, message: '年度建设内容100字以内', trigger: 'blur'}],
                    WTJJY: [{required: true, message: '问题及建议100字以内', trigger: 'blur'}],
                },
            }
        },
        methods: {
            // 取消
            cancel:function () {
                this.$router.go(-1);
            },
            // 提交
            submitForm: function (formName) {
                var that = this;
                // console.log(that.Addform)
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 提交
            submitForm: function (formName) {
                var that = this;
                // console.log(that.Addform)
                that.Addform.MBID=that.MBID;
                var datas = JSON.stringify({
                    "tableName": "t_pj_supervise_info",
                    "jsonStr": [null, that.Addform, null, null]
                });
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        that.$axios({
                            method: "post",
                            url: "/jlxmgl/form/save.do",
                            data: that.$qs.stringify({data: datas})
                        }).then(function (res) {
                            // console.log(res)
                            if (res.data.result == "success") {
                                that.$message({
                                    message: '恭喜你，信息添加成功！',
                                    type: 'success'
                                });
                            }
                            that.AddShow=false;
                        }).catch(function (error) {
                            that.$message({
                                message: '添加失败！',
                                type: error
                            });
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // getBrother:function () {
            //     bus.$on('Brother',(message)=>{   //这里最好用箭头函数，不然this指向有问题
            //         console.log(message)
            //         this.GetMobanArr = message;
            //     })
            //     console.log(this.GetMobanArr)
            // }
        },
        created() {
            var that = this;
            // that.getBrother();
            //获取职务列表
            var datas = JSON.stringify({
                "tableName": "fl_sys_zysjzd",
                "queryFilter": {
                    "mapperId": "getZtbxxData",
                    "filterString": {
                        "mapperId": "getZtbxxData"
                    },
                    "selectFields": "C_CODE,C_NAME"
                }
            })
            // console.log(datas)
            that.$axios({
                method: "post",
                url: "/jlxmgl/form/getEntityList.do",
                data: that.$qs.stringify({data: datas})
            }).then(function (res) {
                if (res.data.result == "success") {
                    for (var i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].originalObjects.label = res.data.data[i].originalObjects.C_NAME
                        res.data.data[i].originalObjects.value = res.data.data[i].originalObjects.C_CODE
                        delete res.data.data[i].originalObjects.C_NAME
                        delete res.data.data[i].originalObjects.C_CODE
                        that.Zb.push(res.data.data[i].originalObjects)
                    }
                }
                // console.log(that.Zb);
            }).catch(function (error) {
                console.log(error);
            });
            //获取形象进度
            var datas = JSON.stringify({
                "tableName": "fl_sys_zysjzd",
                "queryFilter": {
                    "mapperId": "getXxjdData",
                    "filterString": {
                        "mapperId": "getXxjdData"
                    },
                    "selectFields": "C_CODE,C_NAME"
                }
            })
            that.$axios({
                method: "post",
                url: "/jlxmgl/form/getEntityList.do",
                data: that.$qs.stringify({data: datas})
            }).then(function (res) {
                if (res.data.result == "success") {
                    for (var i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].originalObjects.label = res.data.data[i].originalObjects.C_NAME
                        res.data.data[i].originalObjects.value = res.data.data[i].originalObjects.C_CODE
                        delete res.data.data[i].originalObjects.C_NAME
                        delete res.data.data[i].originalObjects.C_CODE
                        that.Xx.push(res.data.data[i].originalObjects)
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
    }
</script>

<style scoped>
    .jlxmName {
        overflow: hidden;
    }

    .jlxmName ul {
        overflow: hidden;
        float: left;
        padding: 0px 0px;
    }

    .jlxmName li {
        float: left;
        list-style: none;
        padding: 0px 30px 0px 0px;
        color: #303133;
    }

    .jlxmName li span {
        color: #9b9b9b !important;
    }
</style>