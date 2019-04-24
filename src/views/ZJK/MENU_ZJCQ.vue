<template>
    <section>
        <div>
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true" :model="filters" ref="filters" :rules="rules">
                    <el-row style="margin-bottom: 0px;">
                        <el-col :span="4">
                            <el-form-item prop="ZY">
                                <el-select
                                        v-model="filters.ZY"
                                        multiple
                                        filterable
                                        placeholder="专业">
                                    <el-option
                                            v-for="item in ZY"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item prop="ZW">
                                <el-select
                                        v-model="filters.ZW"
                                        multiple
                                        filterable
                                        placeholder="职务">
                                    <el-option
                                            v-for="item in ZW"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item prop="ZC">
                                <el-select
                                        v-model="filters.ZC"
                                        filterable
                                        multiple
                                        placeholder="职称">
                                    <el-option
                                            v-for="item in ZC"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">
                            <el-form-item prop="SEX">
                                <el-select v-model="filters.SEX" multiple placeholder="性别">
                                    <el-option
                                            v-for="item in SEX"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">
                            <el-form-item prop="AMOUNT">
                                <el-input v-model.trim="filters.AMOUNT" placeholder="抽取总人数"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item>
                                <el-button type="primary" @click="Inquiry('filters')">抽取</el-button>
                                <!--<el-button type="primary" @click="resertFilter('filters')">重置</el-button>-->
                                <template v-if="dataList.length>0">
                                    <el-button type="warning" @click="exportExcel"  v-if="getMounButton.indexOf('BTN_EXPORT')!=-1">导出</el-button>
                                </template>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
            <!--列表-->
            <el-table :data="dataList.slice((currpage - 1) * pagesize, currpage * pagesize)" highlight-current-row
                      v-loading="listLoading"
                      element-loading-text="拼命加载中"
                      border
                      id="out-table"
                      style="width: 100%;" align="center"
            >
                <el-table-column type="index" label="序号" width="60" align="center">
                </el-table-column>
                <el-table-column prop="originalObjects.NAME" label="姓名" align="center"  width="120">
                </el-table-column>
                <el-table-column prop="currentObjects.SEX_DESC" label="性别" align="center"  width="80">
                </el-table-column>
                <el-table-column prop="currentObjects.GZDW_DESC" label="工作单位" align="center">
                </el-table-column>
                <el-table-column prop="currentObjects.ZHUANYE_DESC" label="专业" align="center">
                </el-table-column>
                <el-table-column prop="currentObjects.ZHIWU_DESC" label="职务" align="center" width="140">
                </el-table-column>
                <el-table-column prop="currentObjects.ZHICHENG_DESC" label="职称" align="center">
                </el-table-column>
                <el-table-column prop="originalObjects.PHONE" label="手机号码" align="center">
                </el-table-column>
                <el-table-column prop="originalObjects.TEL" label="电话" align="center">
                </el-table-column>
                <el-table-column prop="originalObjects.BEIZHU" label="备注" align="center">
                </el-table-column>
            </el-table>
            <!--工具条-->
            <el-col :span="24" class="toolbar">
                <el-pagination class="fy"
                               layout="total, prev, pager, next, sizes, jumper"
                               :page-sizes="[30, 50, 100]"
                               :page-size="pagesize"
                               :total="dataList.length"
                               @current-change="handleCurrentChange"
                               @size-change="handleSizeChange"
                               style="float: right"
                >
                </el-pagination>
            </el-col>
            <!-- 弹框页面 -->
            <expertDialog :dialog='dialog' :form='form' :zhuanye="ZY" :zhiwu="ZW" :zhicheng="ZC" :sex="SEX"
                          @update="getUsers"></expertDialog>
        </div>
    </section>
</template>

<script>
    import expertDialog from '../../components/expertDialog'
    import FileSaver from 'file-saver'//导出excel
    import XLSX from 'xlsx'//导出excel
    export default {
        data() {
            return {
                getMounButton:JSON.parse(localStorage.getItem('MountButton')),
                pagesize: 30,
                currpage: 1,
                radio2: '',
                Found: true,
                look: false,
                lookData: {},
                dialog: {
                    show: false
                },
                ZY: [],
                ZW: [],
                ZC: [],
                SEX: [],
                listLoading: false,
                guize: false,
                filters: {},
                dataList: [],
                radio: [],
                rules: {
                    AMOUNT: [{required: true, message: '抽取总人数不能为空', trigger: 'blur'}],
                },
                dialog: {
                    show: false,
                    title: "",
                    option: "",
                },
                form: {
                    NAME: '',
                    SEX: '',
                    ZHIWU_DESC: '',
                    GZDW_DESC: '',
                    ZHIWU_DESC: '',
                    ZHUANYE_DESC: '',
                    PHONE: '',
                    desc: ''
                },

            }
        },
        components: {
            expertDialog
        },
        methods: {
            //规则
            handleCurrentChange(cpage) {
                this.currpage = cpage;
            },
            handleSizeChange(psize) {
                this.pagesize = psize;
            },
            resertFilter(formName) {//重置
                this.$refs[formName].resetFields();
                this.getUsers();
            },
            add() {//新增//
                this.dialog = {
                    show: true,
                    title: "新增专家基本信息",
                    option: "add",
                };
                this.form = {
                    NAME: '',
                    SEX: '',
                    ZHIWU: '',
                    GZDW: '',
                    ZHICHENG: '',
                    ZHUANYE: '',
                    PHONE: '',
                }
            },
            Inquiry(formName) {//查询
                var that = this
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        that.listLoading = true;
                        let postData = that.$qs.stringify({
                            "ZHUANYE": that.filters.ZY.join(),
                            "ZHIWU": that.filters.ZW.join(),
                            "COUNT": that.filters.AMOUNT,
                        });
                        that.$axios({
                            method: "post",
                            url: "/jlxmgl/expertQuery.do",
                            data: postData
                        }).then(function (res) {
                            // console.log(res)
                            if (res.data.result == 'success') {
                                that.dataList = res.data.data
                                that.listLoading = false;
                            }
                        }).catch(function (error) {
                            console.log(error);
                        });
                    }
                })
            },
            //获取用户列表
            getUsers() {
                var that = this;
                that.listLoading = true;
                that.$axios({
                    method: "post",
                    url: "/jlxmgl/expertQuery.do",
                }).then(function (res) {
                    if (res.data.result == "success") {
                        that.dataList = res.data.data;
                        that.total = that.dataList.length;
                        that.listLoading = false;
                        // console.log(that.dataList);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            exportExcel() {//导出
                this.common.Excel();
            },

        },
        created() {
            var that = this;
            //获取专业列表
            var datas = JSON.stringify({
                "tableName": "fl_sys_zysjzd",
                "queryFilter": {
                    "mapperId": "getMajorData",
                    "filterString": {
                        "mapperId": "getMajorData"
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
                        that.ZY.push(res.data.data[i].originalObjects)
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
            //获取职务列表
            var datas = JSON.stringify({
                "tableName": "fl_sys_zysjzd",
                "queryFilter": {
                    "mapperId": "getDutyData",
                    "filterString": {
                        "mapperId": "getDutyData"
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
                        that.ZW.push(res.data.data[i].originalObjects)
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
            //获取职称列表
            var datas = JSON.stringify({
                "tableName": "fl_sys_zysjzd",
                "queryFilter": {
                    "mapperId": "getJobTitleData",
                    "filterString": {
                        "mapperId": "getJobTitleData"
                    },
                    "selectFields": "C_CODE,C_NAME"
                }
            })
            that.$axios({
                method: "post",
                url: "/jlxmgl/form/getEntityList.do",
                data: that.$qs.stringify({data: datas})
            }).then(function (res) {
                // console.log(res)
                if (res.data.result == "success") {
                    for (var i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].originalObjects.label = res.data.data[i].originalObjects.C_NAME
                        res.data.data[i].originalObjects.value = res.data.data[i].originalObjects.C_CODE
                        delete res.data.data[i].originalObjects.C_NAME
                        delete res.data.data[i].originalObjects.C_CODE
                        that.ZC.push(res.data.data[i].originalObjects)
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
            //获取性别列表
            var datas = JSON.stringify({
                "tableName": "fl_sys_zysjzd",
                "queryFilter": {
                    "mapperId": "zlkSexData",
                    "filterString": {
                        "mapperId": "zlkSexData"
                    },
                    "selectFields": "C_CODE,C_NAME"
                }
            })
            that.$axios({
                method: "post",
                url: "/jlxmgl/form/getEntityList.do",
                data: that.$qs.stringify({data: datas})
            }).then(function (res) {
                // console.log(res)
                if (res.data.result == "success") {
                    for (var i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].originalObjects.label = res.data.data[i].originalObjects.C_NAME
                        res.data.data[i].originalObjects.value = res.data.data[i].originalObjects.C_CODE
                        delete res.data.data[i].originalObjects.C_NAME
                        delete res.data.data[i].originalObjects.C_CODE
                        that.SEX.push(res.data.data[i].originalObjects)
                    }
                }
            }).catch(function (error) {
                console.log(error);
            })
        },
        mounted() {
            this.getUsers();
        }
    }

</script>
<style scoped>
    @import '../../assets/css/zTreeStyle.css';

    .el-radio-group .el-radio {
        width: 100%;
        margin: 5px 0px;
    }

    .leftList {
        position: relative;
        height: 425px;
        background: #d3dce6;
    }

    .btnSelect {
        position: absolute;
        bottom: 0px;
    }

    .bg-purple {
        overflow: hidden;
        background: #d3dce6;
        height: 360px;
        overflow-y: auto;
        padding: 10px 10px;
    }

    /*.el-radio + .el-radio {*/
    /*margin-left: 0px;*/
    /*width: 100%;*/

    /*}*/

    .el-row {
        margin-bottom: 20px;
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }


    .el-dialog__body {
        /*height: 425px;*/
    }

    .bg-purple-light {
        background: #e5e9f2;
        height: 405px;
        padding: 10px 10px;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>
