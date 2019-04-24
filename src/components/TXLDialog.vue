<template>
    <div id="CallDialog">
        <el-dialog
                :title="dialog.title"
                :visible.sync="dialog.show"
                :close-on-click-modal='false'
        >
            <el-form
                    ref="form"
                    :model="form"
                    :rules="form_rules"
                    label-width="120px"
                    style="margin:10px;width:auto;"
            >
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop='REALNAME' label="姓名:">
                            <el-input v-model="form.REALNAME" placeholder="姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop='ORGAN_ID' label="单位:">
                            <el-select
                                    v-model="form.ORGAN_ID"
                                    filterable
                                    placeholder="请选择"
                                    style="width: 100%">
                                <el-option
                                        v-for="item in danwei"
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
                        <el-form-item prop='DUTY_ID' label="职务:">
                            <el-select v-model="form.DUTY_ID"
                                       placeholder="请选择"
                                       filterable
                                       @change="change"
                                       style="width: 100%">
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
                        <el-form-item prop='CELLPHONE' label="手机:">
                            <el-input v-model="form.CELLPHONE" placeholder="手机"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <!--<el-form-item prop='TELEPHONE' label="座机:" :required="selectChange" message="请输入">-->
                        <el-form-item prop='TELEPHONE' label="座机:"
                                      :rules="[{ required: selectChange, message: '座机号必须填写'}]">
                            <el-input v-model="form.TELEPHONE" placeholder="座机"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop='FAX' label="传真:">
                            <el-input v-model="form.FAX" placeholder="传真"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click='onSubmit("form")' :disabled="db">提交</el-button>
                <el-button @click="dialog.show = false;selectChange=false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "CallDialog",
        props: {
            dialog: Object,
            form: Object,
            zhiwu: Array,
            danwei: Array,
        },
        data() {
            return {
                // odlData:this.form,
                db: false,
                selectChange: false,
                form_rules: {
                    REALNAME: [{required: true, message: '请输入姓名', trigger: 'blur'}],
                    ORGAN_ID: [{required: true, message: '请选择工作单位', trigger: 'blur'}],
                    DUTY_ID: [{required: true, message: '请选择职务', trigger: 'blur'}],
                    CELLPHONE: [{required: true, validator: this.common.CallcheckPhone, trigger: 'blur'}],
                    // TELEPHONE: [{message: '请输入座机号', trigger: 'blur'}],
                }
            }
        },
        created() {
            // this.odlData=this.form;
        },
        methods: {
            change: function (val) {
                var that = this;
                if (val == 60 || val == 61) {
                    that.selectChange = true
                } else {
                    that.selectChange = false
                }
                // console.log(that.selectChange)
            },
            //保存和编辑
            onSubmit(form) {
                var that = this;
                that.db = true;
                that.$refs[form].validate(valid => {
                    if (valid) {
                        var BaseUrl = '/jlxmgl/form/save.do';
                        if (that.dialog.option == 'add') {
                            var datas = JSON.stringify({
                                "tableName": "t_address_list",
                                "jsonStr": [null, that.form, null, null]
                            });
                        } else {
                            BaseUrl = '/jlxmgl/updateTxl.do';
                            that.form.ID = that.dialog.ID;
                            var datas = JSON.stringify(that.form);
                            // var datas = JSON.stringify({
                            //     // "tableName": "t_address_list",
                            //     "jsonStr": [that.form, null, null]
                            //     // "jsonStr": [{ID: that.dialog.ID}, that.form, null, null]
                            // });
                        }
                        console.log(that.form, BaseUrl);
                        that.$axios({
                            method: "post",
                            url: BaseUrl,
                            // data: that.$qs.stringify({data: datas})
                            data: that.dialog.option == 'add' ? that.$qs.stringify({data: datas}) : datas
                        }).then(function (res) {
                            // console.log(res);
                            if (res.data.result == "success") {
                                that.$message({
                                    message: '恭喜你，信息添加成功！',
                                    type: 'success'
                                });
                            }
                            that.db = false;
                            that.$emit("update");
                            that.dialog.show = false;
                            that.selectChange = false;
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
        watch: {
            form(val) {
                // console.log(val);
                // this.odlData=this.form;
                // this.odlData.ID=this.dialog.ID;
                // console.log(this.odlData);
                if (val.DUTY_ID == '计财处处长' || val.DUTY_ID == '分管局长') {
                    this.selectChange = true
                } else {
                    this.selectChange = false
                }
            }
        },

    }
</script>

<style scoped>

</style>