<template>
    <div class="dialog">
        <el-dialog
                :title="dialog.title"
                :visible.sync="dialog.show"
                :close-on-click-modal='false'
        >
            <div class="form">
                <el-form
                        ref="form"
                        :rules="form_rules"
                        :model="form"
                        label-width="100px"
                        style="margin:10px;width:auto;">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="名称:" prop='PROJECT_NAME'>
                                <el-input v-model="form.PROJECT_NAME" placeholder="请输入文件名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop='PROJECT_ID' label="所属项目:">
                                <el-select v-model="form.PROJECT_ID"
                                           placeholder="所属项目"
                                           filterable
                                           style="width: 100%">
                                    <el-option
                                            v-for="item in xmList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!--<el-col :span="12">-->
                        <!--<el-form-item prop='AUTHOR' label="作者:">-->
                        <!--<el-input  v-model="form.AUTHOR" placeholder="请输入作者"></el-input>-->
                        <!--</el-form-item>-->
                        <!--</el-col>-->
                    </el-row>
                    <el-row>
                        <!--<el-col :span="12">-->
                        <!--<el-form-item prop='WH' label="文号:">-->
                        <!--<el-input v-model="form.WH" placeholder="请输入文号"></el-input>-->
                        <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="12">-->
                        <!--<el-form-item prop='PROJECT_ID' label="所属项目:">-->
                        <!--<el-select v-model="form.PROJECT_ID"-->
                        <!--placeholder="所属项目"-->
                        <!--filterable-->
                        <!--style="width: 100%">-->
                        <!--<el-option-->
                        <!--v-for="item in xmList"-->
                        <!--:key="item.value"-->
                        <!--:label="item.label"-->
                        <!--:value="item.value">-->
                        <!--</el-option>-->
                        <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--</el-col>-->
                    </el-row>
                    <el-row>
                        <!--<el-col :span="12">-->
                        <!--<el-form-item label="日期" prop="UPLOAD_DATE">-->
                        <!--<el-date-picker-->
                        <!--v-model="form.UPLOAD_DATE"-->
                        <!--type="date"-->
                        <!--style="width: 100%"-->
                        <!--value-format="yyyy-MM-dd"-->
                        <!--placeholder="选择日期">-->
                        <!--</el-date-picker>-->
                        <!--</el-form-item>-->
                        <!--</el-col>-->
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="附件:" prop="ARCHIVES_IDS">
                                <el-upload
                                        class="upload-demo"
                                        action="/jlxmgl/uploader"
                                        ref="upload"
                                        :multiple="false"
                                        :on-success="successMap"
                                        :on-remove="remove"
                                        :on-change="change"
                                        :file-list="dialog.fileList"
                                        accept=".xls,.xlsx,.docx,.BMP,.PDF,.txt"
                                >
                                    <el-button size="mini" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传.xls,.xlsx,.docx,.BMP,.PDF,.txt文件
                                    </div>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click='onSubmit("form")' :disabled="db">提 交</el-button>
                <el-button @click="dialog.show = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Dialog",
        props: {
            dialog: Object,
            form: Object
        },
        // components:{
        //     search
        // },
        data() {
            return {
                db: false,
                xmList: [],
                upload: [],
                form_rules: {
                    PROJECT_NAME: [
                        {required: true, message: "名称不能为空！", trigger: "blur"}
                    ],
                    PROJECT_ID: [
                        {required: true, message: "所属项目！", trigger: "blur"}
                    ],
                }
            }
        },
        created() {
            var that = this;
            //获取项目列表
            var orgId = sessionStorage.getItem('orgId');//后台需要的orgId
            var datas = JSON.stringify({
                "tableName": "t_project_info",
                "queryFilter": {
                    "mapperId": "getPjList",
                    "filterString": {
                        "mapperId": "getPjList",
                        "XMTBDW":""+orgId+"",//每次传给后台
                    },
                    "selectFields": "ID,XMMC"
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
                        res.data.data[i].originalObjects.label = res.data.data[i].originalObjects.XMMC
                        res.data.data[i].originalObjects.value = res.data.data[i].originalObjects.ID
                        delete res.data.data[i].originalObjects.XMMC
                        delete res.data.data[i].originalObjects.ID
                        that.xmList.push(res.data.data[i].originalObjects)
                    }
                }
                // console.log(that.wj);
            }).catch(function (error) {
                console.log(error);
            });
        },
        methods: {
            successMap(response) {
                // 判断是新增还是编辑的时候
                if (this.dialog.option == 'add') {
                    this.upload.push(response.data.DOCUMENTID);
                } else {
                    this.upload = this.dialog.fileListId;
                    this.upload.push(response.data.DOCUMENTID);
                }
            },
            remove(file, fileList) {
                // console.log(file);
                // 判断是新增还是编辑的时候注意获取的文件id方式不同
                if (this.dialog.option == 'add') {
                    for (var i = 0; i < this.upload.length; i++) {
                        if (this.upload[i] == file.response.data.DOCUMENTID) {
                            this.upload.splice($.inArray(this.upload[i], this.upload), 1);
                        }
                    }
                } else {
                    // console.log(this.dialog.fileListId);
                    for (var i = 0; i < this.dialog.fileListId.length; i++) {
                        // console.log(this.dialog.fileListId[i]);
                        if (this.dialog.fileListId[i] == file.response.data.DOCUMENTID) {
                            this.dialog.fileListId.splice($.inArray(this.dialog.fileListId[i], this.dialog.fileListId), 1);
                        }
                    }
                    this.upload = this.dialog.fileListId;
                    // console.log(this.upload);
                }
            },
            change(file) {
                // console.log(file)
            },
            onSubmit(form) {//保存和编辑
                var that = this;
                that.db = true;
                var time = that.common.formatReplyTime(new Date());
                // console.log(that.dialog.fileListId.length)
                var getUpload = [];
                if (that.dialog.option == 'add') {
                    getUpload = that.upload.length
                } else {
                    getUpload = that.dialog.fileListId.length
                }

                // 判断上传文件不能为空，否则return；
                if (getUpload == 0) {
                    that.$message({
                        message: '最少上传一个文件！！',
                        type: 'warning'
                    });
                    return;
                }
                this.$refs[form].validate(valid => {
                    if (valid) {
                        that.form.UPLOAD_DATE = time;
                        that.form.AUTHOR = sessionStorage.getItem("userName");
                        that.form.ARCHIVES_IDS = that.upload.toString();
                        if (that.dialog.option == 'add') {
                            var datas = JSON.stringify({
                                "tableName": "T_ARCHIVES_MANAGER",
                                "jsonStr": [null, that.form, null, null]
                            });
                        } else {
                            var datas = JSON.stringify({
                                "tableName": "T_ARCHIVES_MANAGER",
                                "jsonStr": [{ID: that.dialog.PK_UID}, that.form, null, null]
                            });
                        }
                        that.$axios({
                            method: "post",
                            url: "/jlxmgl/form/save.do",
                            data: that.$qs.stringify({data: datas})
                        }).then(function (res) {
                            // console.log(res)
                            if (res.data.result == "success") {
                                that.$message({
                                    message: '恭喜你，信息添加成功！',
                                    type: 'success'
                                });
                            }
                            that.db = false;
                            that.upload = [];
                            that.dialog.show = false;
                            that.$emit("update");
                        }).catch(function (error) {
                            that.$message({
                                message: '添加失败！',
                                type: error
                            });
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },

    }
</script>
<style>
    .el-dialog__body {
        padding: 10px 20px !important;
    }
</style>
<style scoped>

</style>