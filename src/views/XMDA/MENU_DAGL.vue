<template>
    <!--<section>-->
    <div>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters" ref="filters">
                <el-form-item prop="PROJECT_NAME">
                    <el-input v-model.trim="filters.PROJECT_NAME" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item prop="UPLOAD_DATE">
                    <el-date-picker
                            v-model="filters.UPLOAD_DATE"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="Inquiry('filters')">查询</el-button>
                    <!--<el-button type="primary" @click="resertFilter('filters')">重置</el-button>-->
                    <el-button type="primary" @click="add" v-if="getMounButton.indexOf('BTN_ADD')!=-1">新增</el-button>
                    <template  v-if="dataList.length>0">
                        <el-button @click="handleEditer" type="success"  v-if="getMounButton.indexOf('BTN_UPDATE')!=-1">编辑</el-button>
                        <el-button @click='Delete' type="danger" v-if="getMounButton.indexOf('BTN_DELETE')!=-1">删除</el-button>
                        <el-button type="warning" @click="exportExcel"  v-if="getMounButton.indexOf('BTN_EXPORT')!=-1">导出</el-button>
                    </template>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="dataList.slice((currpage - 1) * pagesize, currpage * pagesize)"
                  highlight-current-row
                  v-loading="loading"
                  id="out-table"
                  element-loading-text="拼命加载中"
                  border
                  style="width: 100%;"
                  align="center"
                  @selection-change="handleSelectionChange"
        >
            <el-table-column
                    align="center"
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    label="所属项目"
                    align="center">
                <template slot-scope="scope">
                    <span class="xiangqing" @click="xiangqing(scope.$index, scope.row,1)">{{ scope.row.currentObjects.PROJECT_ID_DESC }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="originalObjects.PROJECT_NAME" label="名称" align="center" width="160">
            </el-table-column>
            <el-table-column label="附件" align="center">
                <template slot-scope="scope">
                    <div v-for="item in scope.row.originalObjects.DOCINFOS">
                        <template v-if="item.hz==1">
                            <a target="_blank" :href="'/jlxmgl/uploadfiles/'+item.S_PATH">{{item.S_NAME}}</a>
                        </template>
                        <template v-else>
                            <a :href="'/jlxmgl/fileDLS?filePath='+item.S_PATH+'&fileName='+item.S_NAME">{{item.S_NAME}}</a>
                        </template>
                        <!--<a :href="'/jlxmgl/fileDLS?filePath='+item.S_PATH+'&fileName='+item.S_NAME">{{item.S_NAME}}</a>-->
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="originalObjects.AUTHOR" label="上传用户" align="center" width="140">
            </el-table-column>
            <el-table-column prop="originalObjects.UPLOAD_DATE" label="上传日期" align="center" width="160">
            </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
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
        <!-- 弹框页面 -->
        <XMDADialog :dialog='dialog' :form='form' @update="getUsers"></XMDADialog>
    </div>
    <!--</section>-->

</template>

<script>
    import XMDADialog from '../../components/XMDADialog'
    // import FileSaver from 'file-saver'//导出excel
    // import XLSX from 'xlsx'//导出excel
    export default {
        data() {
            return {
                getFile: [],
                // uploadSee: [],
                // fileList:[],
                form: {
                    FW_RQ: "",
                    BGQX: "",
                    DAMC: "",
                    WEN_HAO: "",
                    ZUO_ZHE: "",
                    ZHANGSHU: ""
                },
                dataList: [],
                loading: false,
                filters: {},
                pagesize: 30,
                currpage: 1,
                listLoading: false,
                dialog: {
                    PK_UID: '',
                    show: false,
                    title: "",
                    option: "",
                },
                SelectArr:[],//是否勾选
                SelectId:[],//勾选的ID
                FileId:[],//文件的ID
                Editer:{},//获取编辑的数据
                getMounButton:JSON.parse(localStorage.getItem('MountButton')),
            }
        },
        components: {
            XMDADialog
        },
        created() {
            this.getUsers();
        },
        methods: {
            handleSelectionChange(val) {
                // console.log(val)
                this.SelectId=[];
                this.FileId=[];
                for(var i=0;i<val.length;i++){
                    this.SelectId.push(val[i].originalObjects.ID);
                    this.Editer=val[i];
                }
                for(var i=0;i<val.length;i++){
                    for(var j=0;j<val[i].originalObjects.DOCINFOS.length;j++){
                        this.FileId.push(val[i].originalObjects.DOCINFOS[j].DOCID)
                    }
                }
                this.SelectArr=val;
            },
            exportExcel() {//导出
                this.common.Excel();
            },
            resertFilter(formName) {//重置
                this.$refs[formName].resetFields();
                this.getUsers();
            },
            // 详情
            xiangqing(index, row,getFileDetail) {
                var that=this;
                that.$router.push({
                    path: '/cssb',
                    query: {
                        GetFile:getFileDetail,
                        SendID:row.originalObjects.ID
                    }
                })
            },
            Inquiry() {//查询
                var that = this;
                var PROJECT_NAME, UPLOAD_DATE = '';
                if (that.filters.UPLOAD_DATE == '' && that.filters.PROJECT_NAME == '') {
                    that.getUsers();
                    return;
                }
                if (that.filters.PROJECT_NAME == undefined) {
                    PROJECT_NAME = '';
                } else {
                    PROJECT_NAME = that.filters.PROJECT_NAME
                }
                if (that.filters.UPLOAD_DATE == undefined) {
                    UPLOAD_DATE = '';
                } else {
                    UPLOAD_DATE = that.filters.UPLOAD_DATE
                }
                that.$axios({
                    method: "GET",
                   url: "/jlxmgl/dakQuery.do?PROJECT_NAME=" + PROJECT_NAME + '&UPLOAD_DATE=' + UPLOAD_DATE,
                }).then(function (res) {
                    if (res.data.result == "success") {
                        for (var i = 0; i < res.data.data.length; i++) {
                            res.data.data[i].originalObjects.UPLOAD_DATE=res.data.data[i].originalObjects.UPLOAD_DATE.substring(0,10);
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
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            add() {//新增
                this.dialog = {
                    show: true,
                    title: "新增信息",
                    option: "add",
                    fileList: [],
                    fileListId: [],
                };
                this.form = {
                    AUTHOR: "",
                    PROJECT_NAME: "",
                    UPLOAD_DATE: "",
                    ARCHIVESNAMES: "",
                    WH: "",
                    ARCHIVES_IDS: "",
                };
            },
            handleEditer(row) {//编辑
                // console.log(row)
                var that = this;
                if (that.SelectArr.length!=1) {
                    that.$message({
                        message: '请勾选一项！',
                        type: 'warning'
                    });
                    return;
                }
                var fileList = [];//上传的文件
                var fileListId = [];//上传文件的ID
                // fileListId.push(row.originalObjects.ARCHIVES_IDS.split(','));
                var editerFJID =that.Editer.originalObjects.DOCINFOS;
                for (var i = 0; i < editerFJID.length; i++) {
                    var file = {};
                    file.response={};
                    file.response.data={};
                    file['name'] = editerFJID[i].S_NAME;
                    file['path'] = editerFJID[i].S_PATH;
                    file['id'] = editerFJID[i].DOCID;
                    file.response.data.DOCUMENTID=editerFJID[i].DOCID;
                    fileListId.push(editerFJID[i].DOCID);
                    fileList.push(file);
                }
                // console.log(fileList);
                that.dialog = {
                    PK_UID:that.Editer.originalObjects.ID,
                    show: true,
                    title: "编辑信息",
                    option: "editer",
                    fileList: fileList,
                    fileListId: fileListId,
                };
                that.form = {
                    // AUTHOR: that.Editer.originalObjects.AUTHOR,
                    PROJECT_ID:that.Editer.originalObjects.PROJECT_ID,
                    PROJECT_NAME: that.Editer.originalObjects.PROJECT_NAME,
                    // UPLOAD_DATE: that.Editer.originalObjects.UPLOAD_DATE,
                    ARCHIVESNAMES: that.Editer.originalObjects.ARCHIVESNAMES,
                    ARCHIVES_IDS: that.Editer.originalObjects.ARCHIVES_IDS
                };
            },
            Delete(row, index) {//删除
                var that = this;
                if(that.SelectArr.length==0){
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
                       url: "/jlxmgl/dakDelete.do?ID=" +that.SelectId.join(',')+ '&DOCIDS=' +DocumentId,
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
            handleCurrentChange(cpage) {//分页部分
                this.currpage = cpage;
            },
            handleSizeChange(psize) {
                this.pagesize = psize;
            },
            // //获取列表数据
            getUsers() {
                var that = this;
                that.loading = true;
                var datas = JSON.stringify({
                    "addCaptionField": true,
                    "PROJECT_NAME": '',
                    "UPLOAD_DATE": '',
                })
                that.$axios({
                    method: "GET",
                   url: "/jlxmgl/dakQuery.do",
                    data: that.$qs.stringify({data: datas})
                }).then(function (res) {
                    // console.log(res)
                    if (res.data.result == "success") {
                        for (var i = 0; i < res.data.data.length; i++) {
                            res.data.data[i].originalObjects.UPLOAD_DATE=res.data.data[i].originalObjects.UPLOAD_DATE.substring(0,10);
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
                        that.loading = false;
                        // that.getFileDiao();//文件上传
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
        },
    }

</script>

<style scoped>
    .xiangqing {
        cursor: pointer;
    }
    .download {
        float: left;
        margin: 0px 5px;
    }

    .el-col {
        margin-right: 30px;
    }
</style>