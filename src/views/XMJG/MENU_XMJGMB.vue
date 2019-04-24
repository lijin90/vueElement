<template>
    <div id="Supervision">
        <div>
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true" :model="filters" ref="filters">
                    <el-row>
                        <el-col :span="4">
                            <el-form-item prop="NAME">
                                <el-input v-model.trim="filters.NAME" placeholder="名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="18">
                            <el-form-item>
                                <el-button type="primary" @click="Inquiry('filters')">查询</el-button>
                                <!--<el-button type="primary" @click="resertFilter('filters')">重置</el-button>-->
                                <el-button type="primary" @click="add"  v-if="getMounButton.indexOf('BTN_ADD')!=-1">新增</el-button>
                                <template v-if="dataList.length>0">
                                    <el-button type="success" @click="handleEdit" v-if="getMounButton.indexOf('BTN_UPDATE')!=-1">编辑</el-button>
                                    <el-button type="info" @click="jianguan">监管信息</el-button>
                                    <el-button type="danger" @click="Delete"  v-if="getMounButton.indexOf('BTN_DELETE')!=-1">删除</el-button>
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
                <el-table-column
                        label="名称"
                        width="200"
                >
                    <template slot-scope="scope">
                        <span class="xiangqing" @click="xiangqing(scope.$index, scope.row)">{{scope.row.originalObjects.NAME}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="字段信息"
                >
                    <template slot-scope="scope">
                        <!--<el-tooltip class="item" effect="dark" :content=scope.row.originalObjects.FIELDS_INFO-->
                        <!--placement="right-start">-->
                        <span>{{scope.row.originalObjects.FIELDS_INFO}}</span>
                        <!--</el-tooltip>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="originalObjects.UPLOAD_TIME"
                        label="创建时间"
                        width="200"
                >
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
        <XMJGDialog :dialog='dialog' :form='form' @update="getUsers"></XMJGDialog>
    </div>
</template>

<script>
    import XMJGDialog from '../../components/XMJGDialog'

    export default {
        name: "MENU_XMJGXXGL",
        data() {
            return {
                listLoading: false,
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
                dataList: [],
                SelectArr: [],//是否勾选
                SelectId: [],//勾选的ID
                SelectName:[],//勾选的NAME
                Editer: {},//获取编辑的数据
                getMounButton:JSON.parse(localStorage.getItem('MountButton')),
            }
        },
        components: {
            XMJGDialog
        },
        filters: {
            jiequ: function (value) {
                console.log(value)
                // if (value.length >= 70) {
                //     return value.substr(0, 65) + '...'
                // } else {
                //     return value
                // }
            }
        },

        methods: {
            handleSelectionChange(val) {
                // console.log(val)
                this.SelectId = [];
                this.SelectName=[];
                this.Editer = {};
                for (var i = 0; i < val.length; i++) {
                    this.SelectId.push(val[i].originalObjects.ID);
                    this.SelectName.push(val[i].originalObjects.NAME);
                    this.Editer = val[i];
                }
                this.SelectArr = val;
            },
            handleCurrentChange(cpage) {//分页部分
                this.currpage = cpage;
            },
            handleSizeChange(psize) {
                this.pagesize = psize;
            },
            resertFilter(formName) {//重置
                this.$refs[formName].resetFields();
                this.getUsers();
            },

            Inquiry() {//查询
                var that = this
                if (that.filters.NAME == undefined) {
                    return;
                }
                that.listLoading = true;
                var datas = JSON.stringify({
                    "tableName": "T_SUPERVISE_TEMPLATE",
                    "queryFilter": {
                        "mapperId": "xmjgmbQuery",
                        "addCaptionField": true,
                        "filterString": {
                            "mapperId": "xmjgmbQuery",
                            "NAME": '%' + that.filters.NAME + '%',
                        }
                    }
                })
                that.$axios({
                    method: "post",
                    url: "/jlxmgl/form/getEntityList.do",
                    data: that.$qs.stringify({data: datas})
                }).then(function (res) {
                    if (res.data.result == 'success') {
                        that.dataList = res.data.data.reverse();
                        that.listLoading = false;
                    }
                }).catch(function (error) {
                    console.log(error);
                });

            },
            add() {
                this.dialog = {
                    show: true,
                    title: "添加监管信息",
                    option: "add",
                };
                this.form = {
                    NAME: '',
                    FIELDS_INFO: ['招投标形式', '形象进度', '年度建设内容'],
                    // FIELDS_INFO: [{label:'招投标形式',val:true},{label:'形象进度',val:true},{label:'年度建设内容',val:true}],
                    REPORTED_COMPANY: [],
                }
            },
            // 监管信息
            jianguan() {
                var that = this;
                if (that.SelectArr.length != 1) {
                    that.$message({
                        message: '请勾选一项！',
                        type: 'warning'
                    });
                    return;
                }
                this.$router.push({
                    path: '/SupJg',
                    query: {
                        SendID:that.Editer.originalObjects.ID,
                        MbName:that.SelectName,
                    }
                })
            },
            // 详情
            xiangqing(index, row) {
                // console.log(row);
                this.$router.push({
                    path: '/SupDetail',
                    query: {
                        SendID:row.originalObjects.ID
                    }
                })
            },
            //编辑
            handleEdit(row) {
                // console.log(row)
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
                    title: "编辑监管信息",
                    option: "editer",
                    ID: that.Editer.originalObjects.ID,
                };
                this.form = {
                    NAME: that.Editer.originalObjects.NAME,
                    REPORTED_COMPANY: that.Editer.originalObjects.REPORTED_COMPANY.split(','),
                    FIELDS_INFO: that.Editer.originalObjects.FIELDS_INFO.split(','),
                    UPLOAD_TIME: that.Editer.originalObjects.UPLOAD_TIME,
                }
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
                        "tableName": "T_SUPERVISE_TEMPLATE",
                        "queryFilter": {
                            "mapperId": "xmjgmbDel",
                            "filterString": {
                                "mapperId": "xmjgmbDel",
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
            //获取用户列表
            getUsers() {
                var that = this;
                that.listLoading = true;
                var datas = JSON.stringify({
                    "tableName": "T_SUPERVISE_TEMPLATE",
                    "queryFilter": {
                        "mapperId": "xmjgmbQuery",
                        "addCaptionField": true,
                        "filterString": {
                            "mapperId": "xmjgmbQuery",
                        }
                    }
                })
                that.$axios({
                    method: "post",
                    url: "/jlxmgl/form/getEntityList.do",
                    data: that.$qs.stringify({data: datas})
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
        },
        mounted() {
            this.getUsers();
        }
    }
</script>

<style scoped>
    .xiangqing {
        cursor: pointer;
    }

    .xiangqing:hover {
        color: #409eff;
    }
</style>