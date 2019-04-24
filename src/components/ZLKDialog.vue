<template>
    <div id="DataBaseDialog">
        <el-dialog
                :title="dialog.title"
                :visible.sync="dialog.show"
                :close-on-click-modal='false'
        >
            <el-form
                    ref="form"
                    :model="form"
                    label-width="120px"
                    :rules="form_rules"
                    style="margin:10px;width:auto;"
            >
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop='DATA_NAME' label="文件名称">
                            <el-input v-model="form.DATA_NAME" placeholder="文件名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop='DATA_TYPE_ID' label="文件类型:">
                            <el-select v-model="form.DATA_TYPE_ID"
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
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="上传附件" prop="DOCUMENT_ID">
                            <el-upload
                                    class="upload-demo"
                                    action="/jlxmgl/uploader"
                                    ref="uploadFile"
                                    :limit="1"
                                    :on-remove="removeFile"
                                    :on-success="successFile"
                                    accept=".docx,.PDF"
                            >
                                <el-button size="mini" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传.docx,.PDF文件</div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click='onSubmit("form")' :disabled="db">提交</el-button>
                <el-button @click="dialog.show = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "DataBaseDialog",
        props: {
            dialog: Object,
            form: Object,
            wj: Array,
        },
        data() {
            return {
                db:false,
                // selectChange:true,//文件必传判断
                uploadFileId:[],//上传文件存的ID
                DOCUMENT_ID: '',
                form_rules: {
                    DATA_NAME: [{required: true, message: '请输入文件名称', trigger: 'blur'}],
                    DATA_TYPE_ID: [{required: true, message: '请选择文件类型', trigger: 'blur'}],
                    // DOCUMENT_ID: [{required: true, message: '文件必须上传', trigger: 'change'}],
                },
            }
        },
        methods: {
            successFile(response, file, fileList) {//上传文件成功
                this.DOCUMENT_ID = response.data.DOCUMENTID;
                this.uploadFileId.push(response.data.DOCUMENTID);
            },
            removeFile(file) {//删除图片
                for (var i = 0; i < this.uploadFileId.length; i++) {
                    if (this.uploadFileId[i] == file.response.data.DOCUMENTID) {
                        this.uploadFileId.splice($.inArray(this.uploadFileId[i], this.uploadFileId), 1);
                    }
                }
            },
            //保存和编辑
            onSubmit(form) {
                var that = this;
                that.db=true;
                var time=that.common.formatReplyTime(new Date());
                // 判断上传文件不能为空，否则return；
                if (that.uploadFileId.length == 0) {
                    that.$message({
                        message: '最少上传一个文件！！',
                        type: 'warning'
                    });
                    return;
                }
                // console.log( that.uploadFileId)
                that.$refs[form].validate(valid => {
                    if (valid) {
                        that.form.DOCUMENT_ID =  that.uploadFileId.toString();
                        that.form.DATA_UPDATELOAD_TIME = time;
                        that.form.DATA_UPLOADER = sessionStorage.getItem("userName");
                        var datas = JSON.stringify({
                            "tableName": "t_data_manager",
                            "jsonStr": [null, that.form, null, null]
                        });
                        that.$axios({
                            method: "post",
                            url: "/jlxmgl/form/save.do",
                            data: that.$qs.stringify({data: datas})
                        }).then(function (res) {
                            // console.log(res);
                            if (res.data.result == "success") {
                                that.$message({
                                    message: '恭喜你，信息添加成功！',
                                    type: 'success'
                                });
                                that.$refs[form].resetFields();
                                that.$refs.uploadFile.clearFiles();//清除上传的文件
                            }
                            that.db=false;
                            that.uploadFileId=[];
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
        }
    }
</script>

<style scoped>

</style>