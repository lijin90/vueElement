<template>
    <div>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters" ref="filters" :rules="rules">
                <el-row>
                    <el-col :span="4">
                        <el-form-item prop="ZY">
                            <el-select
                                    filterable
                                    v-model="filters.ZY"
                                    multiple placeholder="专业">
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
                                    filterable
                                    v-model="filters.ZW"
                                    multiple
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
                    <el-col :span="3">
                        <el-form-item prop="AMOUNT">
                            <el-input v-model.trim="filters.AMOUNT" placeholder="抽取总人数"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-form-item>
                        <el-button type="primary" @click="Inquiry('filters')">查询</el-button>
                        <!--<el-button type="primary" @click="resertFilter('filters')">重置</el-button>-->
                        <el-button type="primary" @click="add"  v-if="getMounButton.indexOf('BTN_ADD')!=-1">新增</el-button>
                        <template v-if="dataList.length>0">
                            <el-button @click="handleEditer" type="success"  v-if="getMounButton.indexOf('BTN_UPDATE')!=-1">编辑</el-button>
                            <el-button type="danger" @click="Delete"  v-if="getMounButton.indexOf('BTN_DELETE')!=-1">删除</el-button>
                        </template>
                    </el-form-item>
                </el-row>
            </el-form>
        </el-col>
        <!--表格-->
        <!--列表-->
        <el-table :data="dataList.slice((currpage - 1) * pagesize, currpage * pagesize)" highlight-current-row
                  v-loading="listLoading"
                  element-loading-text="拼命加载中"
                  border
                  id="out-table"
                  style="width: 100%;" align="center"
                  @selection-change="handleSelectionChange"
        >
            <el-table-column
                    align="center"
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column type="index" label="序号" width="60" align="center">
            </el-table-column>
            <el-table-column prop="originalObjects.NAME" label="姓名" align="center">
            </el-table-column>
            <el-table-column prop="currentObjects.SEX_DESC" label="性别" align="center" width="80">
            </el-table-column>
            <el-table-column prop="currentObjects.GZDW_DESC" label="工作单位" align="center">
            </el-table-column>
            <el-table-column prop="currentObjects.ZHUANYE_DESC" label="专业" align="center">
            </el-table-column>
            <el-table-column prop="currentObjects.ZHIWU_DESC" label="职务" align="center" width="140">
            </el-table-column>
            <el-table-column prop="currentObjects.ZHICHENG_DESC" label="职称" align="center" width="140">
            </el-table-column>
            <el-table-column prop="originalObjects.PHONE" label="手机号码" align="center">
            </el-table-column>
            <el-table-column prop="originalObjects.TEL" label="电话" align="center" width="180">
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
</template>

<script>
    import expertDialog from '../../components/expertDialog'

    export default {
        name: "expertInformation",
        data() {
            return {
                filters: {},
                listLoading: false,
                pagesize: 30,
                currpage: 1,
                dataList: [],
                ZY: [],
                ZW: [],
                ZC: [],
                SEX: [],
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
                rules: {
                    AMOUNT: [{required: true, message: '抽取总人数不能为空', trigger: 'blur'}],
                },
                SelectArr: [],//是否勾选
                SelectId: [],//勾选的ID
                Editer: {},//获取编辑的数据
                getMounButton:JSON.parse(localStorage.getItem('MountButton')),
            }
        },
        components: {
            expertDialog
        },
        methods: {
            handleSelectionChange(val) {
                // console.log(val);
                this.SelectId = [];
                for (var i = 0; i < val.length; i++) {
                    this.SelectId.push(val[i].originalObjects.ID);
                    this.Editer = val[i];
                }
                this.SelectArr = val;
                // console.log(this.SelectId);
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
                    TEL: '',
                    BEIZHU: '',
                }
            },
            handleEditer(row) {//编辑
                // console.log(row.originalObjects.ID)
                var that = this;
                if (that.SelectArr.length != 1) {
                    that.$message({
                        message: '请勾选一项！',
                        type: 'warning'
                    });
                    return;
                }
                that.dialog = {
                    show: true,
                    title: "编辑信息",
                    option: "editer",
                    ID: that.Editer.originalObjects.ID,
                    alreadyData: that.Editer.originalObjects,
                };
                this.form = {
                    NAME: that.Editer.originalObjects.NAME,
                    SEX: that.Editer.originalObjects.SEX,
                    ZHIWU: that.Editer.originalObjects.ZHIWU,
                    GZDW: that.Editer.originalObjects.GZDW,
                    ZHICHENG: that.Editer.originalObjects.ZHICHENG,
                    ZHUANYE: that.Editer.originalObjects.ZHUANYE,
                    PHONE: that.Editer.originalObjects.PHONE,
                    TEL: that.Editer.originalObjects.TEL,
                    BEIZHU: that.Editer.originalObjects.BEIZHU,
                }
            },
            resertFilter(formName) {//重置
                this.$refs[formName].resetFields();
                this.getUsers();
            },
            // 查询
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
                            console.log(res)
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
            handleCurrentChange(cpage) {
                this.currpage = cpage;
            },
            handleSizeChange(psize) {
                this.pagesize = psize;
            },
            Delete(row, index) {//删除
                var that = this;
                if (that.SelectArr.length == 0) {
                    that.$message({
                        message: '至少勾选一项！',
                        type: 'warning'
                    });
                    return;
                }
                that.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    var datas = JSON.stringify({
                        "tableName": "T_EXPERT",
                        "queryFilter": {
                            "mapperId": "expertDel",
                            "filterString": {
                                "mapperId": "expertDel",
                                "ID": that.SelectId.join(',')
                            }
                        }
                    });
                    that.$axios({
                        method: "post",
                        url: "/jlxmgl/form/del.do",
                        data: this.$qs.stringify({data: datas})
                    }).then(function (res) {
                        if (res.data.result == 'success') {
                            that.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            that.getUsers();
                        }

                    }).catch(function (error) {
                        console.log(error);
                    });
                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
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
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
        },
        mounted() {
            this.getUsers();
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
            //获取ZC列表
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
    }
</script>

<style scoped>

</style>