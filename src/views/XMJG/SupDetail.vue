<template>
    <div id="container">
        <div class="jlxmName">
            <!--<ul>-->
                <!--<template >-->
                    <!--<li>项目名称：<span>{{dataList.NAME}}</span></li>-->
                    <!--<li>项目类型：<span></span></li>-->
                    <!--<li>实施单位：<span></span></li>-->
                <!--</template>-->

            <!--</ul>-->
            <div class="handle-row" style="margin: 10px 0px;">
                <el-button type="primary" @click="back">返回</el-button>
            </div>
        </div>
        <div class="detail">
            <el-card class="box-card">
                <div class="text item">项目名称:{{dataList.NAME}}</div>
                <div class="text item">项目类型:{{dataList.FIELDS_INFO}}</div>
                <div class="text item">实施单位:{{dataList.COMPANYNAMES}}</div>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SupDetail",
        data(){
            return{
                GetId:this.$route.query.SendID,
                dataList:{},
            }
        },
        created(){
            var that=this;
            that.$axios({
                method: "GET",
                url: "/jlxmgl/pjTemplateDetails.do?id=" + that.GetId,
            }).then(function (res) {
                // console.log(res);
                if (res.data.result == 'success') {
                    that.dataList=res.data.data.originalObjects;
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        methods: {
            back: function () {
                this.$router.go(-1);
            },
        },
    }
</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .jlxmName {
        overflow: hidden;
    }

    .jlxmName ul {
        overflow: hidden;
        float: left;
        padding: 0px 0px;
    }

    .jlxmName li {
        float: left;
        list-style: none;
        padding: 0px 30px 0px 0px;
        color: #303133;
    }

    .jlxmName li span {
        color: #9b9b9b !important;
    }

    .handle-row {
        float: right;
        overflow: hidden;
    }
</style>