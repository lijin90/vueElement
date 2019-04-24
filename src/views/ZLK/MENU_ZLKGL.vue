<template>
    <div id="DataBase">
        <div>
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true" :model="filters" ref="filters">
                    <el-row>
                        <el-col :span="4">
                            <el-form-item prop="DATA_NAME">
                                <el-input v-model.trim="filters.DATA_NAME" placeholder="关键词"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item prop='DATA_TYPE_ID'>
                                <el-select v-model="filters.DATA_TYPE_ID"
                                           placeholder="文件类型"
                                           filterable
                                           style="width: 100%">
                                    <el-option
                                            v-for="item in wj"
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
                                <el-button type="primary" @click="add" v-if="getMounButton.indexOf('BTN_ADD')!=-1">新增</el-button>
                                <template v-if="dataList.length>0">
                                    <el-button type="danger" @click="Delete" v-if="getMounButton.indexOf('BTN_DELETE')!=-1">删除</el-button>
                                    <el-button type="warning" @click="exportExcel"  v-if="getMounButton.indexOf('BTN_EXPORT')!=-1">导出</el-button>
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
                    v-loading="listLoading"
                    element-loading-text="拼命加载中"
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
                        prop="currentObjects.DATA_TYPE_ID_DESC"
                        label="资料类别"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="originalObjects.DATA_NAME"
                        label="资料名称"
                        align="center">
                    <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
                </el-table-column>
                <el-table-column
                        prop="originalObjects.DOCUMENT_ID"
                        label="附件"
                        align="center">
                    <template slot-scope="scope">
                        <div v-for="item in scope.row.originalObjects.DOCINFOS">
                           <template v-if="item.hz==1">
                               <a target="_blank" :href="'/jlxmgl/uploadfiles/'+item.S_PATH">{{item.S_NAME}}</a>
                           </template>
                            <template v-else>
                                <a :href="'/jlxmgl/fileDLS?filePath='+item.S_PATH+'&fileName='+item.S_NAME">{{item.S_NAME}}</a>
                            </template>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="originalObjects.DATA_UPLOADER"
                        label="上传用户"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="originalObjects.DATA_UPDATELOAD_TIME"
                        label="上传时间"
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
        <ZLKDialog :dialog='dialog' :form='form' :wj="wj" @update="getUsers"></ZLKDialog>
    </div>
</template>

<script>
    import ZLKDialog from '../../components/ZLKDialog'

    export default {
        name: "MENU_ZLKGL",
        data() {
            return {
                dataList: [],
                listLoading: false,
                wj: [],
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
                FileId: [],//文件的ID
                getMounButton:JSON.parse(localStorage.getItem('MountButton'))
            }
        },
        components: {
            ZLKDialog,
            // pdf
        },
        methods: {
            handleSelectionChange(val) {
                // console.log(val);
                this.SelectId = [];
                this.FileId = [];
                for (var i = 0; i < val.length; i++) {
                    this.SelectId.push(val[i].originalObjects.ID)
                }
                for (var i = 0; i < val.length; i++) {
                    for (var j = 0; j < val[i].originalObjects.DOCINFOS.length; j++) {
                        this.FileId.push(val[i].originalObjects.DOCINFOS[j].DOCID)
                    }
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
            handleCurrentChange(cpage) {//分页部分
                this.currpage = cpage;
            },
            handleSizeChange(psize) {
                this.pagesize = psize;
            },
            Inquiry() {//查询
                var that = this;
                var DATA_NAME, DATA_TYPE_ID = '';
                if (that.filters.DATA_NAME == undefined && that.filters.DATA_TYPE_ID == undefined) {
                    return;
                }
                that.listLoading = true;
                if (that.filters.DATA_NAME == undefined) {
                    DATA_NAME = '';
                } else {
                    DATA_NAME = that.filters.DATA_NAME
                }
                if (that.filters.DATA_TYPE_ID == undefined) {
                    DATA_TYPE_ID = '';
                } else {
                    DATA_TYPE_ID = that.filters.DATA_TYPE_ID
                }
                that.$axios({
                    method: "GET",
                    url: "/jlxmgl/zlkQuery.do?DATA_NAME=" + DATA_NAME + '&DATA_TYPE_ID=' + DATA_TYPE_ID,
                }).then(function (res) {
                    console.log(res);
                    if (res.data.result == 'success') {
                        that.dataList = res.data.data;
                        that.listLoading = false;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            add() {
                this.dialog = {
                    show: true,
                    title: "资料信息上传",
                    option: "add",
                };
                this.form = {
                    DATA_NAME: '',
                    DATA_TYPE_ID: '',
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
                var DocumentId = that.FileId.join(',');
                that.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    that.$axios({
                        method: "post",
                        url: "/jlxmgl/zlkDelete.do?ID=" + that.SelectId.join(',') + '&DOCIDS=' + DocumentId,
                        // data: this.$qs.stringify({data: datas})
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
                    method: "GET",
                    url: "/jlxmgl/zlkQuery.do?DATA_NAME=",
                }).then(function (res) {
                    if (res.data.result == "success") {
                        for (var i = 0; i < res.data.data.length; i++) {
                            res.data.data[i].originalObjects.DATA_UPDATELOAD_TIME=res.data.data[i].originalObjects.DATA_UPDATELOAD_TIME.substring(0,10);
                            for (var j = 0; j < res.data.data[i].originalObjects.DOCINFOS.length; j++) {
                                if(res.data.data[i].originalObjects.DOCINFOS[j].S_NAME.endsWith('.pdf')){
                                    res.data.data[i].originalObjects.DOCINFOS[j].hz=1;
                                }else{
                                    res.data.data[i].originalObjects.DOCINFOS[j].hz=0;
                                }
                                res.data.data[i].originalObjects.DOCINFOS[j].S_PATH = res.data.data[i].originalObjects.DOCINFOS[j].S_PATH.replace("\\\\", "\/\/");
                            }
                        }
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
            // console.log(JSON.parse(localStorage.getItem('MountButton')))
            var that = this;
            //获取审核列表
            // that.$store.dispatch('getSHJG');
            //获取职务列表
            var datas = JSON.stringify({
                "tableName": "fl_sys_zysjzd",
                "queryFilter": {
                    "mapperId": "zlkDataType",
                    "filterString": {
                        "mapperId": "zlkDataType"
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
                        that.wj.push(res.data.data[i].originalObjects)
                    }
                }
                // console.log(that.wj);
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