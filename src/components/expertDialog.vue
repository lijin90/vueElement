<template>
    <div id="expertDialog">
        <el-dialog
                :title="dialog.title"
                :visible.sync="dialog.show"
                :close-on-click-modal='false'
        >
            <el-form
                    ref="form"
                    :model="form"
                    label-width="120px"
                    style="margin:10px;width:auto;"
                    :rules="form_rules"
            >
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop='NAME' label="姓名:">
                            <el-input  v-model="form.NAME" placeholder="姓名"></el-input >
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop='SEX' label="性别:">
                            <el-select v-model="form.SEX" placeholder="性别" style="width:100%;">
                                <el-option
                                        v-for="item in sex"
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
                        <el-form-item prop='GZDW' label="工作单位:">
                            <el-input  v-model="form.GZDW" placeholder="工作单位"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="ZHUANYE" label="专业:">
                            <el-select v-model="form.ZHUANYE"  placeholder="专业" style="width:100%;">
                                <el-option
                                        v-for="item in zhuanye"
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
                        <el-form-item prop='ZHIWU' label="现任职务:">
                            <el-select v-model="form.ZHIWU"  placeholder="现任职务" style="width:100%;">
                                <el-option
                                        v-for="item in zhiwu"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop='ZHICHENG' label="职称:">
                            <el-select v-model="form.ZHICHENG" placeholder="职称" style="width:100%;">
                                <el-option
                                        v-for="item in zhicheng"
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
                        <el-form-item prop='PHONE' label="联系电话:">
                            <el-input  v-model="form.PHONE" placeholder="联系电话"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop='TEL' label="电话:">
                            <el-input  v-model="form.TEL" placeholder="电话"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item prop='BEIZHU' label="备注:">
                            <el-input type="textarea" v-model="form.BEIZHU"
                                      placeholder=""></el-input>
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
        name: "expertDialog",
        props: {
            dialog: Object,
            form: Object,
            zhuanye:Array,
            zhiwu:Array,
            zhicheng:Array,
            sex:Array,
        },
        data() {
            return {
                db:false,
                form_rules: {
                    NAME: [{required: true, message: '请填写姓名', trigger: 'blur'}],
                    SEX: [{required: true, message: '请选择性别', trigger: 'blur'}],
                    ZHICHENG: [{required: true, message: '请选择职称', trigger: 'blur'}],
                    ZHIWU: [{required: true, message: '请选择职务', trigger: 'blur'}],
                    ZHUANYE: [{required: true, message: '请选择专业', trigger: 'blur'}],
                    GZDW: [{required: true, message: '请填写工作单位', trigger: 'blur'}],
                    PHONE: [{required: true, validator:this.common.ExpertcheckPhone,  trigger: 'blur'}],
                },
            }
        },
        methods:{
            onSubmit(form) {//保存和编辑
                var that = this;
                that.db=true;
                that.$refs[form].validate(valid => {
                    if (valid) {
                        var BaseUrl = '/jlxmgl/form/save.do';
                        if (that.dialog.option == 'add') {
                            var datas = JSON.stringify({
                                "tableName": "t_expert",
                                "jsonStr": [null, that.form, null, null]
                            });
                        }else {
                            BaseUrl = '/jlxmgl/updateExperts.do';
                            that.form.ID = that.dialog.ID;
                            var datas = JSON.stringify(that.form);
                            // var datas = JSON.stringify({
                            //     "tableName": "t_expert",
                            //     "jsonStr": [{ID: that.dialog.ID}, that.form, null, null]
                            // });
                        }
                        // console.log(datas)
                        that.$axios({
                            method: "post",
                            url:BaseUrl,
                            // data: that.$qs.stringify({data: datas})
                            data: that.dialog.option == 'add' ? that.$qs.stringify({data: datas}) : datas
                        }).then(function (res) {
                            if (res.data.result == "success") {
                                that.$message({
                                    message: '恭喜你，信息添加成功！',
                                    type: 'success'
                                });
                            }
                            that.db=false;
                            that.$emit("update");
                            that.dialog.show = false;
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

<style scoped>

</style>