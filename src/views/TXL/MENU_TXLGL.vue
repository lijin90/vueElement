<template>
    <div id="Call">
        <div>
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true" :model="filters" ref="filters">
                    <el-row>
                        <el-col :span="4">
                            <el-form-item prop="REALNAME">
                                <el-input v-model.trim="filters.REALNAME" placeholder="姓名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item prop='ORGAN_ID'>
                                <el-select v-model="filters.ORGAN_ID" filterable placeholder="请选择工作单位">
                                    <el-option
                                            v-for="item in danwei"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item prop='DUTY_ID'>
                                <el-select v-model="filters.DUTY_ID" filterable placeholder="请选择职务">
                                    <el-option
                                            v-for="item in zhiwu"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item>
                                <el-button type="primary" @click="Inquiry('filters')">查询</el-button>
                                <!--<el-button type="primary" @click="resertFilter('filters')">重置</el-button>-->
                                <el-button type="primary" @click="add"  v-if="getMounButton.indexOf('BTN_ADD')!=-1">新增</el-button>
                                <template v-if="dataList.length>0">
                                    <el-button  type="success" @click="handleEdit"  v-if="getMounButton.indexOf('BTN_UPDATE')!=-1">编辑</el-button>
                                    <el-button type="danger" @click="Delete"  v-if="getMounButton.indexOf('BTN_DELETE')!=-1">删除</el-button>
                                    <el-button type="warning" @click="exportExcel" v-if="getMounButton.indexOf('BTN_EXPORT')!=-1">导出</el-button>
                                </template>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </div>
        <div>
            <!--列表-->
            <el-table
                    ref="multipleTable"
                    :data="dataList.slice((currpage - 1) * pagesize, currpage * pagesize)"
                    tooltip-effect="dark"
                    border
                    id="out-table"
                    v-loading="listLoading"
                    element-loading-text="拼命加载中"
                    style="width: 100%;" align="center"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column
                        align="center"
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="currentObjects.ORGAN_ID_DESC"
                        label="工作单位"
                        width="120" align="center">
                </el-table-column>
                <el-table-column
                        prop="currentObjects.DUTY_ID_DESC"
                        label="职务"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="姓名"
                        prop="originalObjects.REALNAME"
                        width="120" align="center">
                </el-table-column>
                <el-table-column
                        prop="originalObjects.CELLPHONE"
                        label="电话"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="originalObjects.TELEPHONE"
                        label="座机"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="originalObjects.FAX"
                        label="传真"
                        align="center">
                </el-table-column>
            </el-table>

            <!--工具条-->
            <el-col :span="24" class="toolbar" v-if="dataList.length>0">
                <el-pagination class="fy"
                               layout="total, prev, pager, next, sizes, jumper"
                               :page-sizes="[10,30, 50, 100]"
                               :page-size="pagesize"
                               :total="dataList.length"
                               @current-change="handleCurrentChange"
                               @size-change="handleSizeChange"
                               style="float: right"
                >
                </el-pagination>
            </el-col>
        </div>
        <!-- 弹框页面 -->
        <TXLDialog :dialog='dialog' :form='form' :zhiwu="zhiwu" :danwei="danwei" @update="getUsers"></TXLDialog>
    </div>
</template>

<script>
    import FileSaver from 'file-saver'//导出excel
    import XLSX from 'xlsx'//导出excel
    import TXLDialog from '../../components/TXLDialog'

    export default {
        name: "MENU_TXL",
        data() {
            return {
                show:false,
                dataList: [],
                listLoading: false,
                danwei: [],//单位
                zhiwu: [],//职务
                dialog: {
                    show: false,
                    title: "",
                    option: "",
                },
                form: {
                    NAME: '',
                    PHONE: '',
                    desc: ''
                },
                filters: {},
                pagesize: 30,
                currpage: 1,
                SelectArr: [],//是否勾选
                SelectId: [],//勾选的ID
                Editer:{},//获取编辑的数据
                getMounButton:JSON.parse(localStorage.getItem('MountButton')),
            }
        },
        components: {
            TXLDialog
        },
        methods: {
            handleSelectionChange(val) {
                // console.log(val)
                this.SelectId = [];
                for (var i = 0; i < val.length; i++) {
                    this.SelectId.push(val[i].originalObjects.ID);
                    this.Editer=val[i];
                }
                this.SelectArr = val;
            },
            exportExcel() {//导出
                this.common.Excel();
            },
            resertFilter(formName) {//重置
                this.$refs[formName].resetFields();
                this.getUsers();
            },
            Inquiry() {//查询
                var that = this
                if (that.filters.REALNAME == undefined && that.filters.ORGAN_ID == undefined && that.filters.DUTY_ID == undefined) {
                    return;
                } else if (that.filters.REALNAME == undefined) {
                    that.filters.REALNAME = ""
                }
                that.listLoading = true;
                var datas = JSON.stringify({
                    "tableName": "t_address_list",
                    "queryFilter": {
                        "mapperId": "txlQuery",
                        "addCaptionField": true,
                        "filterString": {
                            "mapperId": "txlQuery",
                            "REALNAME": '%' + that.filters.REALNAME + '%',
                            "ORGAN_ID": that.filters.ORGAN_ID,
                            "DUTY_ID": that.filters.DUTY_ID,
                        }
                    }
                })
                that.$axios({
                    method: "post",
                    url: "/jlxmgl/form/getEntityList.do",
                    data: that.$qs.stringify({data: datas})
                }).then(function (res) {
                    if (res.data.result == 'success') {
                        that.dataList = res.data.data
                        that.listLoading = false;
                    }
                }).catch(function (error) {
                    console.log(error);
                });

            },
            //删除
            Delete(index, row) {
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
                        "tableName": "t_address_list",
                        "queryFilter": {
                            "mapperId": "txlDel",
                            "filterString": {
                                "mapperId": "txlDel",
                                "ID": that.SelectId.join(',')
                            }
                        }
                    })
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
            handleCurrentChange(cpage) {//分页部分
                this.currpage = cpage;
            },
            handleSizeChange(psize) {
                this.pagesize = psize;
            },
            add() {
                this.dialog = {
                    show: true,
                    title: "通讯录管理",
                    option: "add",
                    // DUTY_ID:row.originalObjects.DUTY_ID,
                };
                this.form = {
                    ORGAN_ID: '',
                    DUTY_ID: '',
                    REALNAME: '',
                    TELEPHONE: '',
                    CELLPHONE: '',
                    FAX: '',
                }
            },
            //编辑
            handleEdit(row) {
                var that = this;
                if (that.SelectArr.length!=1) {
                    that.$message({
                        message: '请勾选一项！',
                        type: 'warning'
                    });
                    return;
                }
                // console.log(JSON.stringify(OldData));
                that.dialog = {
                    show: true,
                    title: "编辑",
                    option: "editer",
                    ID: that.Editer.originalObjects.ID,
                    DUTY_ID:that.Editer.originalObjects.DUTY_ID,
                };
                this.form = {
                    // ORGAN_ID:that.Editer.currentObjects.ORGAN_ID_DESC,
                    // DUTY_ID: that.Editer.currentObjects.DUTY_ID_DESC,
                    ORGAN_ID:that.Editer.originalObjects.ORGAN_ID.toString(),
                    DUTY_ID: that.Editer.originalObjects.DUTY_ID.toString(),
                    REALNAME:that.Editer.originalObjects.REALNAME,
                    TELEPHONE: that.Editer.originalObjects.TELEPHONE,
                    CELLPHONE: that.Editer.originalObjects.CELLPHONE,
                    FAX: that.Editer.originalObjects.FAX,
                }
            },
            //获取用户列表
            getUsers() {
                var that = this;
                that.listLoading = true;
                var datas = JSON.stringify({
                    "tableName": "t_address_list",
                    "queryFilter": {
                        "mapperId": "txlQuery",
                        "addCaptionField": true,
                        "filterString": {
                            "mapperId": "txlQuery",
                        }
                    }
                })
                that.$axios({
                    method: "post",
                    url: "/jlxmgl/form/getEntityList.do",
                    data: that.$qs.stringify({data: datas})
                }).then(function (res) {
                    if (res.data.result == "success") {
                        that.dataList = res.data.data.reverse();
                        that.total = that.dataList.length;
                        that.listLoading = false;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
        },
        created() {
            var that = this;
            //获取职务列表
            var datas = JSON.stringify({
                "tableName": "fl_sys_zysjzd",
                "queryFilter": {
                    "mapperId": "txlDutyQuery",
                    "filterString": {
                        "mapperId": "txlDutyQuery"
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
                        that.zhiwu.push(res.data.data[i].originalObjects)
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
            //获取单位列表
            var datas = JSON.stringify({
                "tableName": "fl_sys_zysjzd",
                "queryFilter": {
                    "mapperId": "txlOrganQuery",
                    "filterString": {
                        "mapperId": "txlOrganQuery"
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
                        that.danwei.push(res.data.data[i].originalObjects)
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        mounted() {
            this.getUsers();
        }
    }
</script>

<style scoped>

</style>