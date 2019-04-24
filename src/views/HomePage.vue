<template>
    <div id="homepage">
        <div class="upSection">
            <div class="title">
                代办提醒
            </div>
            <el-row :gutter="20">
                <el-col :span="16">
                    <template>
                        <el-table
                                :data="dataList"
                                v-loading="listLoading"
                                height="400"
                                element-loading-text="拼命加载中" border
                                style="width: 100%;" align="center">
                            <el-table-column type="index" label="编号" align="center" width="60">
                            </el-table-column>
                            <el-table-column
                                    prop="originalObjects.NAME"
                                    label="项目名称"
                                    align="center"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="currentObjects.SSDW_DESC"
                                    label="申报单位"
                                    align="center"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="currentObjects.SB_TYPE_DESC"
                                    align="center"
                                    label="项目阶段">
                            </el-table-column>
                            <el-table-column label="操作" width="180" align="center">
                                <template slot-scope="scope">
                                     <span v-has="['SY_DSP']"
                                               >待审批</span>
                                     <span  type="success" size="small"
                                                v-has="['SY_YSP']">已审批</span>
                                </template>
                            </el-table-column>
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
                </el-col>
                <el-col :span="8">
                    <div class="rightTopTitle">吉林申报项目概况</div>
                    <el-card class="box-card">
                        <!--<template v-for="item in XMSB">-->
                        <div class="text item">
                            <span class="listTitle">列表内容 </span> <span class="sum">{{XMSB[0]}} 个</span>
                        </div>
                        <div class="text item">
                            <span class="listTitle">核准类项目</span> <span class="sum">{{XMSB[1]}} 个</span>
                        </div>
                        <div class="text item">
                            <span class="listTitle"> 备案类项目</span> <span class="sum">{{XMSB[2]}} 个</span>
                        </div>
                        <!--</template>-->

                    </el-card>
                    <div class="rightTopTitle">吉林申报项目行业TOP5</div>
                    <div id="myLine" style="height:250px"></div>
                </el-col>
            </el-row>
        </div>
        <div class="footSection">
            <div class="title">
                项目办理结果公示
            </div>
            <el-row :gutter="20">
                <el-col>
                    <template>
                        <el-table
                                :data="XMBL"
                                v-loading="listLoading"
                                height="300"
                                element-loading-text="拼命加载中" border
                                style="width: 100%;" align="center">
                            <el-table-column type="index" label="编号" align="center" width="60">
                            </el-table-column>
                            <el-table-column
                                    prop="originalObjects.XMBH"
                                    label="项目代码"
                                    align="center"
                                    >
                            </el-table-column>
                            <el-table-column
                                    prop="originalObjects.NAME"
                                    label="项目名称"
                                    align="center"
                                   >
                            </el-table-column>
                            <el-table-column
                                    prop="currentObjects.SPJG_DESC"
                                    align="center"
                                    label="审批结果">
                            </el-table-column>
                        </el-table>
                    </template>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    // import login from '../common/js/common.js'
    // import global from '../components/globalVue'//引用模块进来
    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    export default {
        name: "HomePage",
        data() {
            return {
                homepage_btn: JSON.parse(sessionStorage.getItem('state.homepage_btn')),
                pagesize: 30,
                currpage: 1,
                dataList: [],//数据列表
                XMSB: [],//项目申报
                XMBL: [],//项目办理
                listLoading: false,
                global:global.httpUrl,
                dataT: [],
            }
        },
        created() {
            // this.common.login();
            // this.common.commonUser();
            // this.$store.dispatch("getRouter");
            // console.log(this.homepage_btn);
        },
        methods: {
            //获取用户列表
            getUsers() {
                var that = this;
                that.listLoading = true;
                var datas = JSON.stringify({
                        "tableName": "sy_dbtx_v",
                        "queryFilter": {"filterString": {"mapperId": "ST2"}, "addCaptionField": true},
                    }
                );
                that.$axios({
                    method: "post",
                    url:"/jlxmgl/form/getEntityList.do",
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
            // 项目申报
            xmsb() {
                var that = this;
                that.loading = true;
                var datas = JSON.stringify({
                        "tableName": "sy_xmgk_v",
                        "queryFilter": {"filterString": {"mapperId": "ST3"}, "addCaptionField": true},
                    }
                );
                that.$axios({
                    method: "post",
                    url:"/jlxmgl/form/getEntityList.do",
                    data: that.$qs.stringify({data: datas})
                }).then(function (res) {
                    if (res.data.result == "success") {
                        for (var i = 0; i < res.data.data.length; i++) {
                            that.XMSB.push(res.data.data[i].originalObjects.JSXZSUM)
                        }
                        that.loading = false;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            // 项目办理
            xmbl() {
                var that = this;
                that.loading = true;
                var datas = JSON.stringify({
                        "tableName": "sy_bljggs_v",
                        "queryFilter": {"filterString": {"mapperId": "ST1"}, "addCaptionField": true},
                    }
                );
                that.$axios({
                    method: "post",
                    url:"/jlxmgl/form/getEntityList.do",
                    data: that.$qs.stringify({data: datas})
                }).then(function (res) {
                    // console.log(res);
                    if (res.data.result == "success") {
                        that.XMBL = res.data.data;
                        that.total = that.XMBL.length;
                        that.loading = false;
                    }
                    // console.log(that.XMBL );
                }).catch(function (error) {
                    console.log(error);
                });
            },
            drawLine() {
                // console.log(this.dataListYear)
                // 基于准备好的dom，初始化echarts实例
                let myLine = echarts.init(document.getElementById('myLine'))
                // 绘制图表
                myLine.setOption({
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: [
                                {value: 10, name: '直接访问'},
                                {value: 310, name: '邮件营销'},
                                {value: 234, name: '联盟广告'},
                                {value: 135, name: '视频广告'},
                                {value: 1548, name: '搜索引擎'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            },
            handleCurrentChange(cpage) {
                this.currpage = cpage;
            },
            handleSizeChange(psize) {
                this.pagesize = psize;
            },
        },
        mounted() {
            this.getUsers();//获取用户列表
            this.xmsb();  // 项目申报
            this.xmbl(); // 项目办理
            this.drawLine();
        }
    }
</script>

<style scoped>
    /*#homepage .upSection{*/
        /*height: 60%;*/
    /*}*/
    #homepage .title {
        padding: 10px;
        background: #cecece;
        margin-bottom: 15px;
    }

    #homepage .rightTopTitle {
        padding: 10px;
        background: #cecece;
        margin: 5px 0px 0px;
    }

    .text {
        font-size: 14px;
    }

    .item {
        padding: 2px 0;
    }

    .item span.listTitle {
        display: inline-block;
        width: 40%;
    }

    .item span.sum {
        color: #919191;
    }

    #myLine {
        width: 100%;
        height: 400px;
    }
</style>