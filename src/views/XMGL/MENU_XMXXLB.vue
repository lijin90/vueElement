<template>
    <div id="XMLIST">
        <section>
            <!--工具条-->
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true" :model="filters" ref="filters">
                    <el-form-item prop="XMMC">
                        <el-input v-model.trim="filters.XMMC" placeholder="项目名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="Inquiry('filters')">查询</el-button>
                    </el-form-item>
                    <!--<el-form-item>-->
                        <!--<el-button type="primary" @click="resertFilter('filters')">重置</el-button>-->
                    <!--</el-form-item>-->
                    <el-form-item>
                        <el-button type="primary" @click="add" v-if="getMounButton.indexOf('BTN_ADD')!=-1">新增</el-button>
                    </el-form-item>
                    <template v-if="dataList.length>0">
                        <el-form-item>
                            <el-button type="success" @click="handleEdit" v-if="getMounButton.indexOf('BTN_UPDATE')!=-1" >编辑</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="warning" @click="xiada(4)"  v-if="getMounButton.indexOf('BTN_ZJXD')!=-1">再次下达资金</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" @click="Delete"  v-if="getMounButton.indexOf('BTN_DELETE')!=-1">删除</el-button>
                        </el-form-item>
                    </template>
                </el-form>
            </el-col>
            <!--列表-->
            <el-table
                    ref="multipleTable"
                    :data="dataList.slice((currpage - 1) * pagesize, currpage * pagesize)"
                    tooltip-effect="dark"
                    border
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
                        label="项目名称"
                        width="260" align="center">
                    <template slot-scope="scope">
                        <span class="xiangqing" @click="xiangqing(scope.$index, scope.row)">{{ scope.row.originalObjects.XMMC }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="currentObjects.SSDW_DESC"
                        label="实施单位"
                        width="160" align="center">
                    <!--<template slot-scope="scope">-->
                    <!--<span class="xiangqing" @click="xiangqing(scope.$index, scope.row)">{{ scope.row.name }}</span>-->
                    <!--</template>-->
                </el-table-column>
                <el-table-column
                        prop="originalObjects.JSXZ"
                        label="建设性质"
                        width="120"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="拟开工时间"
                        width="120"
                        align="center">
                    <template slot-scope="scope">
                     <span>{{ scope.row.originalObjects.YJKGSJ.substr(0,10)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="originalObjects.XXJSDD"
                        label="详细建设地点"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="originalObjects.ZJPSYJ"
                        label="专家评审意见"
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
        </section>
    </div>
</template>

<script>
    export default {
        name: "XMLIST",
        data() {
            return {
                userName:sessionStorage.getItem("userName"),
                YWPTURL:sessionStorage.getItem("YWPTURL"),//运维平台
                listLoading: false,
                SelectArr: [],//是否勾选
                SelectId: [],//勾选的ID
                filters: {},//查询
                pagesize: 30,
                currpage: 1,
                dataList: [],
                SelectArr: [],//是否勾选
                SelectId: [],//勾选的ID
                SelectFileId: [],//保存选中文件的id
                LastFileID: [],//过滤到未定义的
                EditerVal: [],//获取需要编辑的数据
                // getMounButton:JSON.parse(localStorage.getItem('MountButton')),
                getMounButton:[],//因为登录页面没有存储按钮所以在此页面在获取一次（解决又是获取不到的问题）
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.EditerVal = [];
                this.EditerVal = val[0];
                // console.log(this.EditerVal);
                this.SelectId = [];
                this.SelectFileId = [];
                this.LastFileID = [];
                for (var i = 0; i < val.length; i++) {
                    this.SelectId.push(val[i].originalObjects.ID);
                    for (var j = 0; j < val[i].originalObjects.PJ_FUND_INFO.length; j++) {
                        this.SelectFileId.push(val[i].originalObjects.PJ_FUND_INFO[j].originalObjects.ZJ_GJJHWH, val[i].originalObjects.PJ_FUND_INFO[j].originalObjects.ZJ_SXDJHWH)
                    }
                    this.SelectFileId.push(
                        val[i].originalObjects.PF_KYSQSBWH, val[i].originalObjects.PF_KYPFWH, val[i].originalObjects.PF_SZFGJKYPFWH,
                        val[i].originalObjects.CS_SBWH, val[i].originalObjects.CS_SPFWH,
                        val[i].originalObjects.YS_SQWH, val[i].originalObjects.YS_YSBG, val[i].originalObjects.YS_JGYSPFWH
                    );
                }
                for (var i = 0; i < this.SelectFileId.length; i++) {
                    if (this.SelectFileId[i] != undefined) {
                        this.LastFileID.push(this.SelectFileId[i]);
                    }
                }
                // console.log(this.SelectId,this.LastFileID);
                this.SelectArr = val;
            },
            //编辑
            handleEdit(row) {
                var that = this;
                // console.log(that.EditerVal)
                if (that.SelectArr.length != 1) {
                    that.$message({
                        message: '请勾选一项！',
                        type: 'warning'
                    });
                    return;
                }
                localStorage.setItem('SendEditerVal', JSON.stringify(that.EditerVal));
                this.$router.push({
                    path: 'add_editer',
                    query: {
                        SendEditerVal: that.EditerVal,
                        SendID: this.SelectId
                    }
                })

            },
            // 再次下达资金
            xiada(current) {
                var that = this;
                if (that.SelectArr.length != 1) {
                    that.$message({
                        message: '请勾选一项！',
                        type: 'warning'
                    });
                    return;
                }
                this.$router.push({
                    path: '/add',
                    query: {
                        current: current,
                        ID: that.SelectId
                    }
                })
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
            // 详情
            xiangqing(index, row) {
                this.$router.push({
                    path: '/cssb',
                    query: {
                        GetFile: 2,
                        SendID: row.originalObjects.ID
                    }
                })
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
                var datas = JSON.stringify({
                    // "data": {
                    "PJ_IDS": that.SelectId.join(),
                    "DOC_IDS": that.LastFileID.join(),
                    // }
                });
                that.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    that.$axios({
                        method: "post",
                        url: "/jlxmgl/pjDel.do",
                        data: that.$qs.stringify({data: datas})
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
            //新增
            add: function () {
                this.$router.push({
                    path: 'add',
                })
            },
            Inquiry() {//查询
                var that = this
                if (that.filters.XMMC == undefined) {
                    return;
                }
                that.listLoading = true;
                var datas = JSON.stringify({
                    "XMMC": that.filters.XMMC,
                })
                that.$axios({
                    method: "post",
                    url: "/jlxmgl/pjQuery.do",
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
            // //获取列表数据
            getUsers() {
                var that = this;
                that.listLoading = true;
                var datas = JSON.stringify({
                    "XMMC": '',
                })
                that.$axios({
                    method: "post",
                    url: "/jlxmgl/pjQuery.do",
                    data: that.$qs.stringify({data: datas})
                }).then(function (res) {
                    // console.log(res)
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
        created() {
            var userName=sessionStorage.getItem('userName');//获取登录的名称
            this.$axios.get(this.YWPTURL+"/roleFunctions.do?username="+userName).then((res) => {
                if (res.data.result == "success") {
                    var buttons=res.data.data.BUTTONS;
                    for(var i=0;i<buttons.length;i++){
                        this.getMounButton.push(buttons[i].replace(/\'/g, ""))
                    }
                   this.getMounButton = JSON.stringify( this.getMounButton);
                }
            }).catch((response) => {
                console.log(response);
            })
            this.getUsers();
        },
    }
</script>

<style scoped>
    .xiangqing {
        cursor: pointer;
    }
</style>