<template>
    <div id="SupervisionDialog">
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
                        <el-form-item prop='NAME' label="名称">
                            <el-input v-model="form.NAME" placeholder="名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="字段信息">
                            <el-checkbox-group v-model="form.FIELDS_INFO">
                                <template v-for="item in FIELDS_LIST">
                                    <el-checkbox :label="item.label"
                                                 v-if="item.label=='招投标形式'||item.label=='形象进度'||item.label=='年度建设内容'"
                                                 disabled
                                                 style="width: 120px"
                                    ></el-checkbox>
                                    <el-checkbox :label="item.label"
                                                 v-else
                                                 style="width: 120px"
                                    ></el-checkbox>
                                </template>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="创建单位" prop="REPORTED_COMPANY">
                            <el-select v-model="form.REPORTED_COMPANY"
                                       style="width: 100%"
                                       multiple
                                       collapse-tags
                                       @change="changeSelect"
                                       placeholder="请选择类型查询">
                                <el-option v-for="item in REPORTED_LIST"
                                           :key="item.value"
                                           :label="item.label"
                                           :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click='onSubmit("form")'>提交</el-button>
                <el-button @click="dialog.show = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "SupervisionDialog",
        props: {
            dialog: Object,
            form: Object,
        },
        data() {
            return {
                staffId: [-1],
                oldSearchJobType: [],
                FIELDS_LIST: [],
                REPORTED_LIST: [],
                getSelect: [],
                oldOptions: [], // 用来储存上一次的数据
                form_rules: {
                    NAME: [
                        {required: true, message: "监管信息名称！", trigger: "blur"}
                    ],
                    REPORTED_COMPANY: [
                        {required: true, message: "填报单位！", trigger: "change"}
                    ],
                },


            }
        },
        methods: {
            changeSelect(val) {
                this.getSelect = [];
                const allValues = [];
                // 保留所有值
                for (const item of this.REPORTED_LIST) {
                    allValues.push(item.value)
                }
                // 用来储存上一次的值，可以进行对比
                const oldVal = this.oldSearchJobType.length === 1 ? this.oldSearchJobType[0] : [];
                // 若是全部选择
                if (val.includes('ALL_SELECT')) this.form.REPORTED_COMPANY = allValues;
                // 取消全部选中 上次有 当前没有 表示取消全选
                if (oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) this.form.REPORTED_COMPANY = [];
                // 点击非全部选中 需要排除全部选中 以及 当前点击的选项
                // 新老数据都有全部选中
                if (oldVal.includes('ALL_SELECT') && val.includes('ALL_SELECT')) {
                    const index = val.indexOf('ALL_SELECT');
                    val.splice(index, 1); // 排除全选选项
                    this.form.REPORTED_COMPANY = val
                }
                // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
                if (!oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
                    if (val.length === allValues.length - 1) this.form.REPORTED_COMPANY = ['ALL_SELECT'].concat(val)
                }
                // 储存当前最后的结果 作为下次的老数据
                this.oldSearchJobType[0] = this.form.REPORTED_COMPANY;
                for (var i = 0; i < this.oldSearchJobType[0].length; i++) {
                    if (this.oldSearchJobType[0][i] != 'ALL_SELECT') {
                        this.getSelect.push(this.oldSearchJobType[0][i])
                    }
                }
                // this.oldSearchJobType[0] = this.getSelect;
                // console.log(this.getSelect)
            },
            //保存和编辑
            onSubmit(form) {
                var that = this;
                that.$refs[form].validate(valid => {
                    if (valid) {
                        that.form.UPLOAD_TIME = that.common.formatReplyTime(new Date());
                        that.form.FIELDS_INFO = that.form.FIELDS_INFO.toString();
                        that.form.REPORTED_COMPANY = that.getSelect.toString();
                        if (that.dialog.option == 'add') {
                            var datas = JSON.stringify({
                                "tableName": "T_SUPERVISE_TEMPLATE",
                                "jsonStr": [null, that.form, null, null]
                            });
                        } else {
                            var datas = JSON.stringify({
                                "tableName": "T_SUPERVISE_TEMPLATE",
                                "jsonStr": [{ID: that.dialog.ID}, that.form, null, null]
                            });
                        }
                        // console.log(datas);
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
        created() {
            var that = this;
            //获取字段列表
            var datas = JSON.stringify({
                "tableName": "fl_sys_zysjzd",
                "queryFilter": {
                    "mapperId": "getFieldsData",
                    "filterString": {
                        "mapperId": "getFieldsData"
                    },
                    "selectFields": "C_CODE,C_NAME"
                }
            })
            that.$axios({
                method: "post",
                url: "/jlxmgl/form/getEntityList.do",
                data: that.$qs.stringify({data: datas})
            }).then(function (res) {
                if (res.data.result == "success") {
                    for (var i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].originalObjects.label = res.data.data[i].originalObjects.C_NAME
                        res.data.data[i].originalObjects.value = res.data.data[i].originalObjects.C_CODE
                        delete res.data.data[i].originalObjects.C_NAME
                        delete res.data.data[i].originalObjects.C_CODE
                        that.FIELDS_LIST.push(res.data.data[i].originalObjects)
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
            //获取单位列表
            var datas = JSON.stringify({
                "tableName": "fl_sys_zysjzd",
                "queryFilter": {
                    "mapperId": "txlOrganQuery",
                    "filterString": {
                        "mapperId": "txlOrganQuery"
                    },
                    "selectFields": "C_CODE,C_NAME"
                }
            })
            that.$axios({
                method: "post",
                url: "/jlxmgl/form/getEntityList.do",
                data: that.$qs.stringify({data: datas})
            }).then(function (res) {
                if (res.data.result == "success") {
                    for (var i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].originalObjects.label = res.data.data[i].originalObjects.C_NAME
                        res.data.data[i].originalObjects.value = res.data.data[i].originalObjects.C_CODE
                        delete res.data.data[i].originalObjects.C_NAME
                        delete res.data.data[i].originalObjects.C_CODE

                        that.REPORTED_LIST.push(res.data.data[i].originalObjects);
                    }
                    that.REPORTED_LIST.unshift({label: '全选', value: 'ALL_SELECT'});
                    // console.log(that.REPORTED_LIST);
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
    }
</script>

<style scoped>

</style>