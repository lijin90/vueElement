<template>
    <div>
        <!--工具条-->
        <el-row>
            <!--工具条-->
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true" :model="filters" ref="filters">
                    <el-form-item prop="startTime">
                        <el-date-picker
                                v-model="filters.startTime"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="拟开工时间">
                        </el-date-picker>
                        <!--<el-input v-model.trim="filters.XMBH" placeholder="拟开工时间"></el-input>-->
                    </el-form-item>
                    <el-form-item prop="stopTime">
                        <el-date-picker
                                v-model="filters.stopTime"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="拟完工时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="tjType" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="tongji('filters')">统计</el-button>
                        <!--<el-button type="primary" @click="resertFilter('filters')">重置</el-button>-->
                        <el-button type="primary" @click="exportExcel" v-has="'BTN_EXPORT'">导出</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <div style="float: right;padding-right: 20px">
                <template>
                    <el-radio v-model="radio" label="1" @change="ChangeTab">项目类别</el-radio>
                    <el-radio v-model="radio" label="2" @change="ChangeTab">建设性质</el-radio>
                </template>
            </div>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="10">
                <el-table
                        id="out-table"
                        :data="GetJSXZ"
                        style="width: 100%">
                    <el-table-column
                            label="项目类别"
                    >
                        <template slot-scope="scope">
                            <span>{{scope.row.XMLX}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="建设性质" align="center">
                        <el-table-column
                                label="新建"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.XMLX==''"></span>
                                <span v-else>{{scope.row.XJCOUNT}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column

                                label="续建"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.XMLX==''"></span>
                                <span v-else>{{scope.row.ZXJCOUNT}}</span>
                                <!--<span>{{scope.row.ZXJCOUNT}}</span>-->
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="改扩建"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.XMLX==''"></span>
                                <span v-else>{{scope.row.GKJCOUNT}}</span>
                                <!--<span>{{scope.row.GKJCOUNT}}</span>-->
                            </template>
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="14">
                <!--柱状图-->
                <div class="echarts">
                    <div id="myLine" v-show="current==1"></div>
                    <div id="jsxz" v-show="current==2"></div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    //导入子组件
    import FileSaver from 'file-saver'//导出excel
    import XLSX from 'xlsx'//导出excel
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    export default {
        name: "files",
        data() {
            return {
                radio: '1',
                current: 1,
                Z_Title: ['项目类别', '建设性质'],
                options: [{
                    value: 'XMLB',
                    label: '项目类别'
                }, {
                    value: 'ZYTZ',
                    label: '中央投资'
                }, {
                    value: 'SJPT',
                    label: '省级配套'
                }, {
                    value: 'CSJPT',
                    label: '市级配套'
                }, {
                    value: 'XJPT',
                    label: '县级配套'
                },],
                tjType: 'XMLB',
                filters: {},
                dataList: [],
                loading: false,
                // filters: {},
                listLoading: false,
                dataListYear: [],
                dataListNum: [],
                getDataListNUM: [],
                GetJSXZ: [],
                EchartsY: new Array(),
                X_XMLX: [],//项目类型
                X_XJ: [],//新建
                X_ZXJ: [],//续建
                X_GKJ: [],//改扩建
            }
        },
        methods: {
            ChangeTab: function (index) {
                // console.log(index)
                this.current = index;
            },
            resertFilter(formName) {//重置
                this.$refs[formName].resetFields();
                this.getUsers();
            },
            tongji: function () {
                var that = this;
                that.GetJSXZ = [];
                that.X_XMLX = [];
                that.X_XJ = [];
                that.X_ZXJ = [];
                that.X_GKJ = [];
                that.EchartsY = new Array();
                // console.log(that.filters);
                var startTime, stopTime = '';
                if (that.filters.startTime == undefined) {
                    startTime = '';
                } else {
                    startTime = that.filters.startTime
                }
                if (that.filters.stopTime == undefined) {
                    stopTime = '';
                } else {
                    stopTime = that.filters.stopTime
                }
                // console.log(startTime,stopTime)
                that.$axios({
                    method: "GET",
                    // url: "/jlxmgl/pjTJFX.do?tjType=" + that.tjType,
                    url: "/jlxmgl/pjTJFX.do?tjType=" + that.tjType + '&startTime=' + startTime + '&stopTime=' + stopTime,
                }).then(function (res) {
                    if (res.data.result == 'success') {
                        for (var i = 0; i < res.data.data.TABLEDATA.length; i++) {
                            // console.log(res.data.data.TABLEDATA[i].originalObjects.XMLX)
                            that.GetJSXZ.push(res.data.data.TABLEDATA[i].originalObjects);
                            that.X_XMLX.push(res.data.data.TABLEDATA[i].originalObjects.XMLX);
                            that.X_XJ.push(res.data.data.TABLEDATA[i].originalObjects.XJCOUNT);
                            that.X_ZXJ.push(res.data.data.TABLEDATA[i].originalObjects.ZXJCOUNT);
                            that.X_GKJ.push(res.data.data.TABLEDATA[i].originalObjects.GKJCOUNT);
                        }
                        // console.log(that.X_XJ);
                        res.data.data.ECHARTSDATA = res.data.data.ECHARTSDATA.reverse();
                        // console.log(res.data.data.ECHARTSDATA);
                        for (var i = 0; i < res.data.data.ECHARTSDATA.length; i++) {
                            // console.log(res.data.data.ECHARTSDATA[i].originalObjects.JSXZ );
                            if (res.data.data.ECHARTSDATA[i].originalObjects.JSXZ == '新建') {
                                that.EchartsY[0] = res.data.data.ECHARTSDATA[i].originalObjects.TJDA;
                            }
                            if (res.data.data.ECHARTSDATA[i].originalObjects.JSXZ == '续建') {
                                that.EchartsY[1] = res.data.data.ECHARTSDATA[i].originalObjects.TJDA;
                            }
                            if (res.data.data.ECHARTSDATA[i].originalObjects.JSXZ == '改扩建') {
                                that.EchartsY[2] = res.data.data.ECHARTSDATA[i].originalObjects.TJDA;
                            }
                        }
                        // console.log(that.EchartsY);
                        that.drawLine();
                        that.jsxz();
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            // //获取用户列表
            getUsers() {
                var that = this;
                that.GetJSXZ = [];
                that.X_XMLX = [];
                that.X_XJ = [];
                that.X_ZXJ = [];
                that.X_GKJ = [];
                that.EchartsY = new Array();
                that.$axios({
                    method: "GET",
                    url: "/jlxmgl/pjTJFX.do?tjType=" + that.tjType,
                }).then(function (res) {
                    if (res.data.result == 'success') {
                        for (var i = 0; i < res.data.data.TABLEDATA.length; i++) {
                            // console.log(res.data.data.TABLEDATA[i].originalObjects.XMLX)
                            that.GetJSXZ.push(res.data.data.TABLEDATA[i].originalObjects);
                            that.X_XMLX.push(res.data.data.TABLEDATA[i].originalObjects.XMLX);
                            that.X_XJ.push(res.data.data.TABLEDATA[i].originalObjects.XJCOUNT);
                            that.X_ZXJ.push(res.data.data.TABLEDATA[i].originalObjects.ZXJCOUNT);
                            that.X_GKJ.push(res.data.data.TABLEDATA[i].originalObjects.GKJCOUNT);
                        }
                        // console.log(that.X_XJ );
                        res.data.data.ECHARTSDATA = res.data.data.ECHARTSDATA.reverse();
                        // console.log(res.data.data.ECHARTSDATA);
                        for (var i = 0; i < res.data.data.ECHARTSDATA.length; i++) {
                            // console.log(res.data.data.ECHARTSDATA[i].originalObjects.JSXZ );
                            if (res.data.data.ECHARTSDATA[i].originalObjects.JSXZ == '新建') {
                                that.EchartsY[0] = res.data.data.ECHARTSDATA[i].originalObjects.TJDA;
                            }
                            if (res.data.data.ECHARTSDATA[i].originalObjects.JSXZ == '续建') {
                                that.EchartsY[1] = res.data.data.ECHARTSDATA[i].originalObjects.TJDA;
                            }
                            if (res.data.data.ECHARTSDATA[i].originalObjects.JSXZ == '改扩建') {
                                that.EchartsY[2] = res.data.data.ECHARTSDATA[i].originalObjects.TJDA;
                            }
                        }
                        that.drawLine();
                        that.jsxz();
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            exportExcel() {//导出
                this.common.Excel();
            },

            drawLine() {
                let myLine = echarts.init(document.getElementById('myLine'));
                // 绘制图表
                myLine.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    title: {
                        text: '吉林项目',
                        subtext: '项目类别'
                    },
                    xAxis: {
                        type: 'category',
                        data: JSON.parse(JSON.stringify(this.X_XMLX))
                    },
                    yAxis: [
                        {
                            type: 'value',
                        },

                    ],
                    dataZoom: [{
                        realtime: true, //拖动滚动条时是否动态的更新图表数据
                        height: 25,//滚动条高度
                        start: 40,//滚动条开始位置（共100等份）
                        end: 65,//结束位置（共100等份）
                        handleColor: '#000',//h滑动图标的颜色
                        handleStyle: {
                            borderColor: "#000",
                            borderWidth: "1",
                            shadowBlur: 2,
                            background: "#000",
                            shadowColor: "#000",
                        },
                    }],

                    series: [
                        {
                            name: '新建',
                            type: 'bar',
                            data: this.X_XJ
                        },
                        {
                            name: '续建',
                            type: 'bar',
                            data: this.X_ZXJ
                        },
                        {
                            name: '改扩建',
                            type: 'bar',
                            data: this.X_GKJ
                        },

                    ]
                });
            },
            jsxz() {
                // console.log(this.dataListYear)
                // 基于准备好的dom，初始化echarts实例
                var echart = $('.echarts');
                var echartsWidth = echart.outerWidth(true);
                var echartsHeight = echart.outerHeight(true);
                var myChart = $('#jsxz');
                myChart.css('width', echartsWidth);
                myChart.css('height', echartsHeight);
                let jsxz = echarts.init(document.getElementById('jsxz'));
                // 绘制图表
                jsxz.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    title: {
                        text: '吉林项目',
                        subtext: '建设性质'
                    },
                    xAxis: {
                        type: 'category',
                        data: ['新建', '续建', '改扩建']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        name: '总数据',
                        data: this.EchartsY,
                        type: 'bar'
                    }]
                });
            },
        },
        created() {
            this.getUsers();
        },
    }
</script>

<style scoped>

    #myLine {
        width: 100%;
        height: 500px;
    }

    #jsxz {
        width: 100%;
        height: 500px;
    }

    .title {
        padding: 10px;
        background: #cecece;
        margin-bottom: 15px;
    }

    .pie {
        width: 100%;
        /*padding: 50px 0px;*/
    }


    .module {
        float: left;
        margin: 0 10px;
    }

    .module .bg {
        width: 80px;
        height: 80px;
        background: #6f7180;
        text-align: center;
        line-height: 80px;
    }

    .module p {
        text-align: center;
    }
</style>