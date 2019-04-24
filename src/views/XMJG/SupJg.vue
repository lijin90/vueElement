<template>
    <div id="SupJg">
        <div class="title">
            <template v-for="item in MbName">
                <span class="biaoti">{{item}}</span>
            </template>
            <div style="float: right">
                <div>
                    <!--<el-button type="danger" @click="Delete" v-has="'BTN_DELETE'">删除</el-button>-->
                    <el-button type="warning" @click="exportExcel">导出</el-button>
                </div>
            </div>
        </div>
        <div style="float:right; color: #909399;margin: 10px 0px;">
            <span>时间：{{NewTime}}&nbsp;&nbsp;</span>
            <span>&nbsp;&nbsp;单位：万元</span>
        </div>
        <template v-if="dataList.length>0">
            <el-table
                    :data="dataList.slice((currpage - 1) * pagesize, currpage * pagesize)"
                    border
                    id="out-table"
                    align="center"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column
                        align="center"
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        v-if="dataListKey.indexOf('XMMC')!=-1"
                        prop="currentObjects.XMMC_DESC"
                        label="项目名称"
                        width="160"
                >
                </el-table-column>
                <el-table-column
                        v-if="dataListKey.indexOf('JSDW')!=-1"
                        prop="originalObjects.JSDW"
                        label="建设单位"
                        width="200"
                >
                </el-table-column>
                <el-table-column
                        v-if="dataListKey.indexOf('SJKGSJ')!=-1"
                        prop="originalObjects.SJKGSJ"
                        label="实际开工时间"
                        width="160"
                >
                </el-table-column>
                <el-table-column
                        v-if="dataListKey.indexOf('SJJGSJ')!=-1"
                        prop="originalObjects.SJJGSJ"
                        label="实际竣工时间"
                        width="160"
                >
                </el-table-column>
                <el-table-column
                        v-if="dataListKey.indexOf('ZTBXS')!=-1"
                        prop="currentObjects.ZTBXS_DESC"
                        label="招投标形式"
                        width="160"
                >
                </el-table-column>
                <el-table-column
                        v-if="dataListKey.indexOf('XXJD')!=-1"
                        prop="currentObjects.XXJD_DESC"
                        label="形象进度"
                        width="160"
                >
                </el-table-column>
                <el-table-column
                        v-if="dataListKey.indexOf('ZTZ')!=-1"
                        prop="originalObjects.ZTZ"
                        label="总投资">
                </el-table-column>
                <el-table-column
                        v-if="dataListKey.indexOf('BCXDZYZJ')!=-1"
                        prop="originalObjects.BCXDZYZJ"
                        label="本次下达中央资金"
                        width="160"
                >
                </el-table-column>
                <el-table-column
                        v-if="dataListKey.indexOf('LJXDZYZJ')!=-1"
                        prop="originalObjects.LJXDZYZJ"
                        label="累积下达中央资金"
                        width="160"
                >
                </el-table-column>
                <el-table-column
                        v-if="dataListKey.indexOf('LJDWZYZJ')!=-1"
                        prop="originalObjects.LJDWZYZJ"
                        label="累计到位中央资金"
                        width="160"
                >
                </el-table-column>
                <el-table-column
                        v-if="dataListKey.indexOf('LJWCZYZJ')!=-1"
                        prop="originalObjects.LJWCZYZJ"
                        label="累计完成中央资金"
                        width="160"
                >
                </el-table-column>
                <el-table-column
                        v-if="dataListKey.indexOf('LJZFZYZJ')!=-1"
                        prop="originalObjects.LJZFZYZJ"
                        label="累计支付中央资金"
                        width="160"
                >
                </el-table-column>
                <el-table-column
                        v-if="dataListKey.indexOf('PZDFPT')!=-1"
                        prop="originalObjects.PZDFPT"
                        label="批准地方配套"
                        width="160"
                >
                </el-table-column>
                <el-table-column
                        v-if="dataListKey.indexOf('LJDWDFZJ')!=-1"
                        prop="originalObjects.LJDWDFZJ"
                        label="累计到位地方资金"
                        width="160"
                >
                </el-table-column>
                <el-table-column
                        v-if="dataListKey.indexOf('LJWCDFZJ')!=-1"
                        prop="originalObjects.LJWCDFZJ"
                        label="累计完成地方资金"
                        width="160"
                >
                </el-table-column>
                <el-table-column
                        v-if="dataListKey.indexOf('LJZFDFZJ')!=-1"
                        prop="originalObjects.LJZFDFZJ"
                        label="累计支付地方资金"
                        width="160"
                >
                </el-table-column>
                <el-table-column
                        v-if="dataListKey.indexOf('NDJSNR')!=-1"
                        prop="originalObjects.NDJSNR"
                        label="年度建设内容"
                        width="200"
                >
                </el-table-column>
                <el-table-column
                        v-if="dataListKey.indexOf('WTJJY')!=-1"
                        prop="originalObjects.WTJJY"
                        label="问题及建议"
                        width="200"
                >
                </el-table-column>
            </el-table>
        </template>
        <template v-else>
            <el-table border>
                暂无数据
            </el-table>

        </template>
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
</template>

<script>
    export default {
        name: "SupJg",
        data() {
            return {
                NewTime:'',
                listLoading: false,
                pagesize: 30,
                currpage: 1,
                GetId: this.$route.query.SendID,
                MbName: this.$route.query.MbName,
                dataList: [],//存储数据
                dataListKey: [],//用来判断该字段是否显示
                SelectArr: [],//是否勾选
                SelectId: [],//勾选的ID
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.SelectId = [];
                for (var i = 0; i < val.length; i++) {
                    this.SelectId.push(val[i].originalObjects.ID);
                }
                this.SelectArr = val;
                // console.log( this.SelectArr)
            },
            handleCurrentChange(cpage) {//分页部分
                this.currpage = cpage;
            },
            handleSizeChange(psize) {
                this.pagesize = psize;
            },
            exportExcel() {//导出
                this.common.Excel();
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
                        "tableName": "t_pj_supervise_info",
                        "queryFilter": {
                            "mapperId": "delCompanyReportedInfo",
                            "filterString": {
                                "mapperId": "delCompanyReportedInfo",
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
                that.$axios({
                    method: "GET",
                    url: "/jlxmgl/supervisePjDetails.do?MBID=" + that.GetId,
                }).then(function (res) {
                    // console.log(res);
                    if (res.data.result == 'success') {
                        that.dataList = res.data.data;
                        for (var i = 0; i < that.dataList.length; i++) {
                            for (var j in that.dataList[i].originalObjects) {
                                that.dataListKey.push(j);
                            }
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
        },
        mounted() {
            this.NewTime=this.common.formatReplyTime(new Date()).substr(0,10);//调用
            this.getUsers();
        },
    }
</script>

<style scoped>
    .title {
        background: #F2F2F2;
        overflow: hidden;
        padding: 10px 10px;
        margin: 10px 0px 10px 0px;
    }

    .biaoti {
        color: #909399;
        font-size: 18px;
        display: inline-block;
        line-height: 40px;
    }
</style>