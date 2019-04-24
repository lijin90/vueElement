<template>
    <div id="add_editer">
        <div class="jlxmName">
            <ul>
                <li>编辑</li>
            </ul>
        </div>
        <el-form :model="Editerform" label-width="200px" ref="Editerform" style="overflow: hidden" :rules="rules">
            <el-collapse v-model="activeNames">
                <el-collapse-item title="项目基本信息" name="1">
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="项目名称" prop="XMMC">
                                <el-input v-model="Editerform.XMMC" placeholder="请输入项目名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="项目类型" prop="XMLX">
                                <el-select
                                        style="width:100%;"
                                        v-model="Editerform.XMLX"
                                        filterable
                                        @change="change($event,3)"
                                        placeholder="请选择项目类型">
                                    <el-option
                                            v-for="item in SB_TYPE"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.label">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="实施单位" prop="SSDW">
                                <el-select
                                        style="width:100%;"
                                        v-model="Editerform.SSDW"
                                        filterable
                                        placeholder="请选择实施单位">
                                    <el-option
                                            v-for="item in SSDW"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="拟开工日期" prop="YJKGSJ">
                                <el-date-picker
                                        v-model="Editerform.YJKGSJ"
                                        type="date"
                                        style="width: 100%;"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="建设性质" prop="JSXZ">
                                <el-select v-model="Editerform.JSXZ" placeholder="请选择" style="width: 100%;">
                                    <el-option
                                            v-for="item in JSXZ"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.label">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="拟建成日期" prop="YJJCSJ">
                                <el-date-picker
                                        v-model="Editerform.YJJCSJ"
                                        type="date"
                                        style="width: 100%;"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="证照类型" prop="ZZLX">
                                <el-select v-model="Editerform.ZZLX" placeholder="请选择" style="width: 100%;">
                                    <el-option
                                            v-for="item in Ztype"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="详细建设地点" prop="XXJSDD">
                                <el-input v-model="Editerform.XXJSDD" placeholder="请输入详细建设地点"
                                          maxlength="100"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="联系人" prop="LXRXM">
                                <el-input v-model="Editerform.LXRXM" placeholder="请输入联系人姓名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="证照编码" prop="ZZBM">
                                <el-input v-model="Editerform.ZZBM" placeholder="请输入证照编码"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="联系人电话" prop="LXSJ">
                                <el-input v-model="Editerform.LXSJ" placeholder="请输入联系人电话"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="联系人邮箱" prop="LXYX">
                                <el-input v-model="Editerform.LXYX" placeholder="请输入联系人邮箱"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="项目代码" prop="XMDM">
                                <el-input v-model="Editerform.XMDM" placeholder="请输入项目代码"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="上报日期" prop="SBRQ">
                                <el-date-picker
                                        v-model="Editerform.SBRQ"
                                        type="date"
                                        style="width: 100%;"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="国标行业" prop="GBHY">
                                <el-input v-model="Editerform.GBHY" placeholder="国标行业"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="项目目录" prop="XMML">
                                <el-input v-model="Editerform.XMML" placeholder="项目目录"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="项目监管人" prop="XMJGR"
                            >
                                <el-input v-model="Editerform.XMJGR" placeholder="项目监管人"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="10">
                            <el-form-item label="需中央投资（万元）" prop="ZYTZ"
                            >
                                <el-input v-model="Editerform.ZYTZ" placeholder="请输入中央投资金额" maxlength="10"></el-input>
                            </el-form-item>
                        </el-col>

                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="需省级投资（万元）" prop="SJPT"
                            >
                                <el-input v-model="Editerform.SJPT" placeholder="请输入省级投资金额" maxlength="10"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="需市级投资（万元）" prop="CSJPT"
                            >
                                <el-input v-model="Editerform.CSJPT" placeholder="请输入市级投资金额" maxlength="10"></el-input>
                            </el-form-item>
                        </el-col>

                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="需县级投资（万元）" prop="XJPT"
                            >
                                <el-input v-model="Editerform.XJPT" placeholder="请输入县级投资金额" maxlength="10"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="需建设方自筹（万元）" prop="JSFTZ"
                            >
                                <el-input v-model="Editerform.JSFTZ" placeholder="请输入建设方自筹金额" maxlength="10"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="需总投资额（万元）" prop="ZTZE"
                            >
                                <el-input v-model="Editerform.ZTZE" placeholder="请输入总投资额金额" maxlength="10"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" v-if="selectChange==false">
                            <el-form-item label="审核结果" prop="SHJG"
                            >
                                <el-select v-model="Editerform.SHJG" placeholder="请选择" style="width:100%;">
                                    <el-option
                                            v-for="item in jieguo"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="建设内容与规模" prop="JSNRGMMS">
                                <el-input v-model="Editerform.JSNRGMMS" type="textarea"
                                          placeholder="请输入建设内容与规模"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20" v-if="selectChange==false">
                            <el-form-item label="专家评审意见" prop="ZJPSYJ">
                                <el-input v-model="Editerform.ZJPSYJ" type="textarea"
                                          placeholder="请输入专家评审意见"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <el-collapse-item title="可研批复信息" name="2">
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="国投批复资金（万元）" prop="PF_GTPFZJ"
                            >
                                <el-input v-model="Editerform.PF_GTPFZJ" placeholder="请输入国投批复资金"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="自筹批复资金（万元）" prop="PF_ZCPFZJ"
                            >
                                <el-input v-model="Editerform.PF_ZCPFZJ" placeholder="请输入自筹批复资金"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="投资类别" prop="PF_TZLB">
                                <el-select v-model="Editerform.PF_TZLB" placeholder="请选择" style="width: 100%;">
                                    <el-option
                                            v-for="item in Invest"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.label">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="预建成年份" prop="PF_YJCNF">
                                <el-date-picker
                                        size="large"
                                        v-model="Editerform.PF_YJCNF"
                                        type="date"
                                        style="width:100%"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择日期">
                                    >
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="预开工年份" prop="PF_YKGNF">
                                <el-date-picker
                                        size="large"
                                        v-model="Editerform.PF_YKGNF"
                                        type="date"
                                        style="width:100%"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="审核结果" prop="PF_SHJG"
                            >
                                <el-select v-model="Editerform.PF_SHJG" placeholder="请选择" style="width:100%;">
                                    <el-option
                                            v-for="item in jieguo"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="审核意见" prop="PF_SHYJ">
                                <el-input v-model="Editerform.PF_SHYJ" type="textarea"
                                          placeholder="请输入审核意见："></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="可研申请上报文号" prop="PF_KYSQSBWH_DESC"
                            >
                                <el-input v-model="Editerform.PF_KYSQSBWH_DESC" placeholder="可研申请上报文号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item prop="PF_KYSQSBWH">
                                <el-upload
                                        class="upload-demo"
                                        action="/jlxmgl/uploader"
                                        ref="uploadFile"
                                        accept=".docx,.doc,.PDF"
                                        :on-success="PF_SB"
                                        :on-remove="PF_RSB"
                                        :file-list="Editerform.PF_KYSQSBWH_DOCINFOS"
                                >
                                    <el-button size="mini" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传.docx,.doc,.PDF文件</div>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="可研批复文号" prop="PF_KYPFWH_DESC"
                            >
                                <el-input v-model="Editerform.PF_KYPFWH_DESC" placeholder="可研批复文号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item prop="PF_KYPFWH">
                                <el-upload
                                        class="upload-demo"
                                        action="/jlxmgl/uploader"
                                        ref="uploadFile2"
                                        accept=".docx,.doc,.PDF"
                                        :on-success="PF_SB2"
                                        :on-remove="PF_RSB2"
                                        :file-list="Editerform.PF_KYPFWH_DOCINFOS"
                                >
                                    <el-button size="mini" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传.docx,.doc,.PDF文件</div>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="省转发国家可研批复文件号" prop="PF_SZFGJKYPFWH_DESC"
                            >
                                <el-input v-model="Editerform.PF_SZFGJKYPFWH_DESC"
                                          placeholder="省转发国家可研批复文件号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item prop="PF_SZFGJKYPFWH">
                                <el-upload
                                        class="upload-demo"
                                        action="/jlxmgl/uploader"
                                        ref="uploadFile3"
                                        accept=".docx,.doc,.PDF"
                                        :on-success="PF_SB3"
                                        :on-remove="PF_RSB3"
                                        :file-list="Editerform.PF_SZFGJKYPFWH_DOCINFOS"
                                >
                                    <el-button size="mini" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传.docx,.doc,.PDF文件</div>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <el-collapse-item title="初设上报信息" name="3">
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="审核结果" prop="CS_SHJG"
                            >
                                <el-select v-model="Editerform.CS_SHJG" placeholder="请选择" style="width:100%">
                                    <el-option
                                            v-for="item in jieguo"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="审核意见" prop="CS_SHYJ">
                                <el-input v-model="Editerform.CS_SHYJ" type="textarea"
                                          placeholder="请输入审核意见："></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="主要建设内容" prop="CS_JSNR">
                                <el-input v-model="Editerform.CS_JSNR" type="textarea"
                                          placeholder="请输入主要建设内容：："></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="初设申报文号" prop="CS_SBWH_DESC"
                            >
                                <el-input v-model="Editerform.CS_SBWH_DESC" placeholder="初设申报文号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item prop="CS_SBWH">
                                <el-upload
                                        class="upload-demo"
                                        action="/jlxmgl/uploader"
                                        ref="uploadFile"
                                        accept=".docx,.doc,.PDF"
                                        :on-success="CH_SB"
                                        :on-remove="CH_RSB"
                                        :file-list="Editerform.CS_SBWH_DOCINFOS"
                                >
                                    <el-button size="mini" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传.docx,.doc,.PDF文件</div>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="省批复初设文号" prop="CS_SPFWH_DESC"
                            >
                                <el-input v-model="Editerform.CS_SPFWH_DESC" placeholder="省批复初设文号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item prop="CS_SPFWH">
                                <el-upload
                                        class="upload-demo"
                                        action="/jlxmgl/uploader"
                                        ref="uploadFile2"
                                        accept=".docx,.doc,.PDF"
                                        :on-success="CH_SB2"
                                        :on-remove="CH_RSB2"
                                        :file-list="Editerform.CS_SPFWH_DOCINFOS"
                                >
                                    <el-button size="mini" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传.docx,.doc,.PDF文件</div>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <el-collapse-item title="新增资金下达" name="4">
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="国投资金（万元）" prop="ZJ_GTZJ">
                                <el-input v-model="Editerform.ZJ_GTZJ" placeholder="请输入国投资金" maxlength="10"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="自筹资金（万元）" prop="ZJ_DWZCZJ">
                                <el-input v-model="Editerform.ZJ_DWZCZJ" placeholder="请输入自筹资金"
                                          maxlength="10"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="国投到位资金（万元）" prop="ZJ_GTDWZI">
                                <el-input v-model="Editerform.ZJ_GTDWZI" placeholder="请输入国投到位资金"
                                          maxlength="10"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="自筹到位资金（万元）" prop="ZJ_DWZCDWZJ">
                                <el-input v-model="Editerform.ZJ_DWZCDWZJ" placeholder="请输入自筹到位资金"
                                          maxlength="10"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="省投资金（万元）" prop="ZJ_STZJ">
                                <el-input v-model="Editerform.ZJ_STZJ" placeholder="请输入省投资金" maxlength="10"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="省投到位资金（万元）" prop="ZJ_STDWZJ">
                                <el-input v-model="Editerform.ZJ_STDWZJ" placeholder="请输入省投到位资金"
                                          maxlength="10"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="市投资金（万元）" prop="ZJ_CSTZJ">
                                <el-input v-model="Editerform.ZJ_CSTZJ" placeholder="请输入市投资金" maxlength="10"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="市投到位资金（万元）" prop="ZJ_CSTDWZJ">
                                <el-input v-model="Editerform.ZJ_CSTDWZJ" placeholder="请输入市投到位资金"
                                          maxlength="10"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="县投资金（万元）" prop="ZJ_XTZJ">
                                <el-input v-model="Editerform.ZJ_XTZJ" placeholder="请输入县投资金" maxlength="10"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="县投到位资金（万元）" prop="ZJ_XTDWZJ">
                                <el-input v-model="Editerform.ZJ_XTDWZJ" placeholder="请输入县投到位资金"
                                          maxlength="10"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="累计完成投资（万元）" prop="ZJ_LJWCTZ">
                                <el-input v-model="Editerform.ZJ_LJWCTZ" placeholder="请输入累计完成投资"
                                          maxlength="10"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="单位项目负责人" prop="ZJ_DWXMFZR">
                                <el-input v-model="Editerform.ZJ_DWXMFZR" placeholder="请输入单位项目负责人"></el-input>
                            </el-form-item>
                        </el-col>
                        <!--<el-col :span="10">-->
                            <!--<el-form-item label="日期" prop="TIME">-->
                                <!--<el-date-picker-->
                                        <!--v-model="Editerform.TIME"-->
                                        <!--type="date"-->
                                        <!--style="width: 100%;"-->
                                        <!--value-format="yyyy-MM-dd"-->
                                        <!--placeholder="选择日期">-->
                                <!--</el-date-picker>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="单位项目负责人手机" prop="ZJ_DWLXDH">
                                <el-input v-model="Editerform.ZJ_DWLXDH" placeholder="请输入单位项目负责人手机"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="省经办负责人" prop="ZJ_SJBFZR">
                                <el-input v-model="Editerform.ZJ_SJBFZR" placeholder="请输入省经办负责人"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="省经办负责人手机" prop="ZJ_SJBLXDH">
                                <el-input v-model="Editerform.ZJ_SJBLXDH" placeholder="请输入省经办负责人手机"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="审核结果" prop="ZJ_SHJG"
                            >
                                <el-select v-model="Editerform.ZJ_SHJG" placeholder="请选择" style="width:100%;">
                                    <el-option
                                            v-for="item in jieguo"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="审核意见" prop="ZJ_SHYJ">
                                <el-input v-model="Editerform.ZJ_SHYJ" type="textarea"
                                          placeholder="请输入审核意见："></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="年度建设内容" prop="ZJ_NDJSNR">
                                <el-input type="textarea" v-model="Editerform.ZJ_NDJSNR"
                                          placeholder="请输入年度建设内容"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="国家计划文号" prop="ZJ_GJJHWH_DESC"
                            >
                                <el-input v-model="Editerform.ZJ_GJJHWH_DESC" placeholder="国家计划文号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item prop="ZJ_GJJHWH">
                                <el-upload
                                        class="upload-demo"
                                        action="/jlxmgl/uploader"
                                        accept=".docx,.doc,.PDF"
                                        ref="uploadfile"
                                        :on-success="ZJ_SB"
                                        :on-remove="ZJ_RSB"
                                        :file-list="Editerform.ZJ_GJJHWH_DOCINFOS"
                                >
                                    <el-button size="mini" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传.docx,.doc,.PDF文件</div>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="省下达计划文号" prop="ZJ_SXDJHWH_DESC"
                            >
                                <el-input v-model="Editerform.ZJ_SXDJHWH_DESC" placeholder="省下达计划文号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item prop="ZJ_SXDJHWH">
                                <el-upload
                                        class="upload-demo"
                                        action="/jlxmgl/uploader"
                                        accept=".docx,.doc,.PDF"
                                        ref="uploadfile"
                                        :on-success="ZJ_SB2"
                                        :on-remove="ZJ_RSB2"
                                        :file-list="Editerform.ZJ_SXDJHWH_DOCINFOS"
                                >
                                    <el-button size="mini" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传.docx,.doc,.PDF文件</div>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <el-collapse-item title="项目验收信息" name="5">
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="实际开工时间" prop="YS_SJKGRQ">
                                <el-date-picker
                                        v-model="Editerform.YS_SJKGRQ"
                                        type="date"
                                        style="width: 100%"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="实际竣工时间" prop="YS_SJJGRQ">
                                <el-date-picker
                                        v-model="Editerform.YS_SJJGRQ"
                                        type="date"
                                        style="width: 100%"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="专家验收意见" prop="YS_ZJYSYJ">
                                <el-input type="textarea" v-model="Editerform.YS_ZJYSYJ"
                                          placeholder="请输入专家验收意见"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="验收申请文号" prop="YS_SQWH_DESC"
                            >
                                <el-input v-model="Editerform.YS_SQWH_DESC" placeholder="验收申请文号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item prop="YS_SQWH">
                                <el-upload
                                        class="upload-demo"
                                        action="/jlxmgl/uploader"
                                        ref="uploadfile"
                                        accept=".docx,.doc,.PDF"
                                        :on-success="YS_SB"
                                        :on-remove="YS_RSB"
                                        :file-list="Editerform.YS_SQWH_DOCINFOS"
                                >
                                    <el-button size="mini" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传.docx,.doc,.PDF文件</div>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="竣工验收批复文号" prop="YS_JGYSPFWH_DESC"
                            >
                                <el-input v-model="Editerform.YS_JGYSPFWH_DESC" placeholder="竣工验收批复文号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item prop="YS_JGYSPFWH">
                                <el-upload
                                        class="upload-demo"
                                        action="/jlxmgl/uploader"
                                        ref="uploadfile3"
                                        accept=".docx,.doc,.PDF"
                                        :on-success="YS_SB3"
                                        :on-remove="YS_RSB3"
                                        :file-list="Editerform.YS_JGYSPFWH_DOCINFOS"
                                >
                                    <el-button size="mini" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传.docx,.doc,.PDF文件</div>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="验收报告" prop="YS_YSBG">
                                <el-upload
                                        class="upload-demo"
                                        action="/jlxmgl/uploader"
                                        ref="uploadfile2"
                                        accept=".docx,.doc,.PDF"
                                        :on-success="YS_SB2"
                                        :on-remove="YS_RSB2"
                                        :file-list="Editerform.YS_YSBG_DOCINFOS"
                                        style="margin-left:0px"
                                >
                                    <el-button size="mini" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传.docx,.doc,.PDF文件</div>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-collapse-item>
            </el-collapse>
            <el-form-item style="float: right;margin: 15px 0px">
                <el-button type="primary" @click="submitForm('Editerform')" :disabled="db">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "add_editer",
        data() {
            return {
                db:false,
                NEWEditerform: '',//
                Editerform: {},//接收编辑传过来的数据
                selectChange: false,//当项目类型为：天保、三北防护林的情况时，专家评审信息不可填写。
                SB_TYPE: [],//项目类型
                JSXZ: [],//建设性质
                Ztype: [],//证照类型
                jieguo: [],//审核结果
                SSDW: [],//实施单位
                Invest: [],//投资类别
                current: '',//判断再次下达资金
                ID: this.$route.query.ID,//判断再次下达资金
                currentNames: ['4'],
                activeNames: ['1'],
                SendID: this.$route.query.SendID,
                rules: {
                    XMMC: [{required: true, message: '请输入项目名称', trigger: 'blur'}],
                    SSDW: [{required: true, message: '实施单位', trigger: 'blur'}],
                    ZZLX: [{required: true, message: '证照类型', trigger: 'blur'}],
                    ZZBM: [{required: true, message: '证照编码', trigger: 'blur'}],
                    XXJSDD: [{required: true, message: '建设地点', trigger: 'blur'}],
                    JSNRGMMS: [{required: true, message: '建设内容', trigger: 'blur'}],
                    JSXZ: [{required: true, message: '建设性质', trigger: 'blur'}],
                    XMLX: [{required: true, message: '项目类型', trigger: 'blur'}],
                    YJKGSJ: [{required: true, message: '拟开工日期', trigger: 'blur'}],
                    YJJCSJ: [{required: true, message: '拟建成日期', trigger: 'blur'}],
                    // 金额验证
                    ZYTZ: [{required: true, validator: this.common.XmcheckNumber, trigger: 'blur'}],
                    SJPT: [{required: false, validator: this.common.checkNumber, trigger: 'blur'}],
                    CSJPT: [{required: false, validator: this.common.checkNumber, trigger: 'blur'}],
                    XJPT: [{required: false, validator: this.common.checkNumber, trigger: 'blur'}],
                    JSFTZ: [{required: false, validator: this.common.checkNumber, trigger: 'blur'}],
                    ZTZE: [{required: false, validator: this.common.checkNumber, trigger: 'blur'}],
                    PF_ZCPFZJ: [{required: false, validator: this.common.checkNumber, trigger: 'blur'}],
                    PF_GTPFZJ: [{required: false, validator: this.common.checkNumber, trigger: 'blur'}],
                    ZJ_GTZJ: [{required: false, validator: this.common.checkNumber, trigger: 'blur'}],
                    ZJ_GTDWZI: [{required: false, validator: this.common.checkNumber, trigger: 'blur'}],
                    ZJ_STZJ: [{required: false, validator: this.common.checkNumber, trigger: 'blur'}],
                    ZJ_STDWZJ: [{required: false, validator: this.common.checkNumber, trigger: 'blur'}],
                    ZJ_CSTZJ: [{required: false, validator: this.common.checkNumber, trigger: 'blur'}],
                    ZJ_CSTDWZJ: [{required: false, validator: this.common.checkNumber, trigger: 'blur'}],
                    ZJ_XTZJ: [{required: false, validator: this.common.checkNumber, trigger: 'blur'}],
                    ZJ_XTDWZJ: [{required: false, validator: this.common.checkNumber, trigger: 'blur'}],
                    ZJ_DWZCZJ: [{required: false, validator: this.common.checkNumber, trigger: 'blur'}],
                    ZJ_DWZCDWZJ: [{required: false, validator: this.common.checkNumber, trigger: 'blur'}],
                    // 手机号码验证
                    LXSJ: [{required: false, validator: this.common.checkPhone, trigger: 'blur'}],
                    ZJ_DWLXDH: [{required: false, validator: this.common.checkPhone, trigger: 'blur'}],
                    ZJ_SJBLXDH: [{required: false, validator: this.common.checkPhone, trigger: 'blur'}],
                    //邮箱
                    LXYX: [{required: false, validator: this.common.checkEmail, trigger: 'blur'}],
                },
                // 资金id
                FUND_ID: '',
                //可研批复信息
                PF_KYSQSBWH: [],//科研申请上报文号
                PF_KYPFWH: [],//可研批复文号
                PF_SZFGJKYPFWH: [],//生转发国家科研批复文号
                //初设上报信息
                CS_SBWH: [],//初设申报文号
                CS_SPFWH: [],//省批复初设文号
                //资金下达
                ZJ_GJJHWH: [],//国家计划文号
                ZJ_SXDJHWH: [],//省下达计划文号
                //项目验收信息
                YS_SQWH: [],//验收申请文号
                YS_YSBG: [],//验收报告
                YS_JGYSPFWH: [],//竣工验收批复文号
                GETediter: {},
            }
        },
        created() {
            var that = this;
            that.getEditer();
            //获取投资类别列表
            var datas = JSON.stringify({
                "tableName": "fl_sys_zysjzd",
                "queryFilter": {
                    "mapperId": "getInvestTypeData",
                    "filterString": {
                        "mapperId": "getInvestTypeData"
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
                        that.Invest.push(res.data.data[i].originalObjects)
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
            //获取实施单位列表
            var datas = JSON.stringify({
                "tableName": "fl_sys_zysjzd",
                "queryFilter": {
                    "mapperId": "getSSDWData",
                    "filterString": {
                        "mapperId": "getSSDWData"
                    },
                    "selectFields": "C_CODE,C_NAME"
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
                        res.data.data[i].originalObjects.label = res.data.data[i].originalObjects.C_NAME
                        res.data.data[i].originalObjects.value = res.data.data[i].originalObjects.C_CODE
                        delete res.data.data[i].originalObjects.C_NAME
                        delete res.data.data[i].originalObjects.C_CODE
                        that.SSDW.push(res.data.data[i].originalObjects)
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
            //获取项目类型列表
            var datas = JSON.stringify({
                "tableName": "fl_sys_zysjzd",
                "queryFilter": {
                    "mapperId": "getProjectTypeData",
                    "filterString": {
                        "mapperId": "getProjectTypeData"
                    },
                    "selectFields": "C_CODE,C_NAME"
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
                        res.data.data[i].originalObjects.label = res.data.data[i].originalObjects.C_NAME
                        res.data.data[i].originalObjects.value = res.data.data[i].originalObjects.C_CODE
                        delete res.data.data[i].originalObjects.C_NAME
                        delete res.data.data[i].originalObjects.C_CODE
                        that.SB_TYPE.push(res.data.data[i].originalObjects)
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
            //获取建设性质列表
            var datas = JSON.stringify({
                "tableName": "fl_sys_zysjzd",
                "queryFilter": {
                    "mapperId": "getBuildTypeData",
                    "filterString": {
                        "mapperId": "getBuildTypeData"
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
                        that.JSXZ.push(res.data.data[i].originalObjects)
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
            //获取证照列表
            var datas = JSON.stringify({
                "tableName": "fl_sys_zysjzd",
                "queryFilter": {
                    "mapperId": "getCardTypeData",
                    "filterString": {
                        "mapperId": "getCardTypeData"
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
                        that.Ztype.push(res.data.data[i].originalObjects)
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
            //获取审核列表
            var datas = JSON.stringify({
                "tableName": "fl_sys_zysjzd",
                "queryFilter": {
                    "mapperId": "getCheckResultData",
                    "filterString": {
                        "mapperId": "getCheckResultData"
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
                        that.jieguo.push(res.data.data[i].originalObjects)
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        watch: {
            Editerform(val) {
                if (val.XMLX == 6 || val.XMLX == 7) {
                    this.selectChange = true
                } else {
                    this.selectChange = false
                }
            }
        },
        methods: {
            getEditer: function () {
                var that = this;
                //可研批复信息
                that.$axios({
                    method: "GET",
                    url: "/jlxmgl/pjDetailsForUpdate.do?pjId=" + that.SendID,
                }).then(function (res) {
                    // console.log(res)
                    if (res.data.result == 'success') {
                        that.GETediter = res.data.data;
                        that.common.replacefile(that.GETediter.originalObjects.PF_KYSQSBWH_DOCINFOS);
                        that.common.replacefile(that.GETediter.originalObjects.PF_SZFGJKYPFWH_DOCINFOS);
                        that.common.replacefile(that.GETediter.originalObjects.PF_KYPFWH_DOCINFOS);
                        // // //初设上报信息
                        that.common.replacefile(that.GETediter.originalObjects.CS_SBWH_DOCINFOS);
                        that.common.replacefile(that.GETediter.originalObjects.CS_SPFWH_DOCINFOS);
                        // // //资金下达
                        that.common.replacefile(that.GETediter.originalObjects.ZJ_GJJHWH_DOCINFOS);
                        that.common.replacefile(that.GETediter.originalObjects.ZJ_SXDJHWH_DOCINFOS);
                        // //项目验收信息
                        that.common.replacefile(that.GETediter.originalObjects.YS_JGYSPFWH_DOCINFOS);
                        that.common.replacefile(that.GETediter.originalObjects.YS_SQWH_DOCINFOS);
                        that.common.replacefile(that.GETediter.originalObjects.YS_YSBG_DOCINFOS);
                        that.Editerform = that.GETediter.originalObjects;
                        // // // 可研批复信息
                        that.FUND_ID = that.Editerform.FUND_ID
                        // console.log(that.FUND_ID);
                        that.common.GetID(that.Editerform.PF_KYSQSBWH_DOCINFOS, that.PF_KYSQSBWH);
                        that.common.GetID(that.Editerform.PF_KYPFWH_DOCINFOS, that.PF_KYPFWH);
                        that.common.GetID(that.Editerform.PF_SZFGJKYPFWH_DOCINFOS, that.PF_SZFGJKYPFWH);
                        //初设上报信息
                        that.common.GetID(that.Editerform.CS_SBWH_DOCINFOS, that.CS_SBWH);
                        that.common.GetID(that.Editerform.CS_SPFWH_DOCINFOS, that.CS_SPFWH);
                        //资金
                        that.common.GetID(that.Editerform.ZJ_GJJHWH_DOCINFOS, that.ZJ_GJJHWH);
                        that.common.GetID(that.Editerform.ZJ_SXDJHWH_DOCINFOS, that.ZJ_SXDJHWH)
                        //项目验收信息
                        that.common.GetID(that.Editerform.YS_SQWH_DOCINFOS, that.YS_SQWH);
                        that.common.GetID(that.Editerform.YS_YSBG_DOCINFOS, that.YS_YSBG);
                        that.common.GetID(that.Editerform.YS_JGYSPFWH_DOCINFOS, that.YS_JGYSPFWH);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            change: function (val) {
                var that = this;
                if (val == 6 || val == 7) {
                    that.selectChange = true
                } else {
                    that.selectChange = false
                }
            },
            //可研批复信息
            //科研申请上报文号
            PF_SB(response, file, fileList) {
                this.PF_KYSQSBWH.push(response.data.DOCUMENTID);
                for (var i = 0; i < this.PF_KYSQSBWH.length; i++) {
                    if (this.PF_KYSQSBWH[i] == undefined) {
                        this.PF_KYSQSBWH.splice(this.PF_KYSQSBWH[i], 1)
                    }
                }
            },
            PF_RSB(file) {
                for (var i = 0; i < this.PF_KYSQSBWH.length; i++) {
                    if (this.PF_KYSQSBWH[i] == file.response.data.DOCUMENTID) {
                        this.PF_KYSQSBWH.splice($.inArray(this.PF_KYSQSBWH[i], this.PF_KYSQSBWH), 1);
                    }
                }
            },
            //可研批复文号
            PF_SB2(response, file, fileList) {
                this.PF_KYPFWH.push(response.data.DOCUMENTID);
                for (var i = 0; i < this.PF_KYPFWH.length; i++) {
                    if (this.PF_KYPFWH[i] == undefined) {
                        this.PF_KYPFWH.splice(this.PF_KYPFWH[i], 1)
                    }
                }
            },
            PF_RSB2(file) {
                for (var i = 0; i < this.PF_KYPFWH.length; i++) {
                    if (this.PF_KYPFWH[i] == file.response.data.DOCUMENTID) {
                        this.PF_KYPFWH.splice($.inArray(this.PF_KYPFWH[i], this.PF_KYPFWH), 1);
                    }
                }
            },
            //生转发国家科研批复文号
            PF_SB3(response, file, fileList) {
                this.PF_SZFGJKYPFWH.push(response.data.DOCUMENTID);
                for (var i = 0; i < this.PF_SZFGJKYPFWH.length; i++) {
                    if (this.PF_SZFGJKYPFWH[i] == undefined) {
                        this.PF_SZFGJKYPFWH.splice(this.PF_SZFGJKYPFWH[i], 1)
                    }
                }
            },
            PF_RSB3(file) {
                for (var i = 0; i < this.PF_SZFGJKYPFWH.length; i++) {
                    if (this.PF_SZFGJKYPFWH[i] == file.response.data.DOCUMENTID) {
                        this.PF_SZFGJKYPFWH.splice($.inArray(this.PF_SZFGJKYPFWH[i], this.PF_SZFGJKYPFWH), 1);
                    }
                }
            },
            //初设上报信息
            //初设申报文号
            CH_SB(response, file, fileList) {
                this.CS_SBWH.push(response.data.DOCUMENTID);
                for (var i = 0; i < this.CS_SBWH.length; i++) {
                    if (this.CS_SBWH[i] == undefined) {
                        this.CS_SBWH.splice(this.CS_SBWH[i], 1)
                    }
                }
            },
            CH_RSB(file) {
                for (var i = 0; i < this.CS_SBWH.length; i++) {
                    if (this.CS_SBWH[i] == file.response.data.DOCUMENTID) {
                        this.CS_SBWH.splice($.inArray(this.CS_SBWH[i], this.CS_SBWH), 1);
                    }
                }
            },
            //省批复初设文号
            CH_SB2(response, file, fileList) {
                this.CS_SPFWH.push(response.data.DOCUMENTID);
                for (var i = 0; i < this.ZJ_GJJHWH.length; i++) {
                    if (this.CS_SPFWH[i] == undefined) {
                        this.CS_SPFWH.splice(this.CS_SPFWH[i], 1)
                    }
                }
            },
            CH_RSB2(file) {
                for (var i = 0; i < this.CS_SPFWH.length; i++) {
                    if (this.CS_SPFWH[i] == file.response.data.DOCUMENTID) {
                        this.CS_SPFWH.splice($.inArray(this.CS_SPFWH[i], this.CS_SPFWH), 1);
                    }
                }
            },
            //资金
            //国家计划文号
            ZJ_SB(response, file, fileList) {
                this.ZJ_GJJHWH.push(response.data.DOCUMENTID);
                for (var i = 0; i < this.ZJ_GJJHWH.length; i++) {
                    if (this.ZJ_GJJHWH[i] == undefined) {
                        this.ZJ_GJJHWH.splice(this.ZJ_GJJHWH[i], 1)
                    }
                }
            },
            ZJ_RSB(file) {
                for (var i = 0; i < this.ZJ_GJJHWH.length; i++) {
                    // console.log(this.ZJ_GJJHWH[i])
                    if (this.ZJ_GJJHWH[i] == file.response.data.DOCUMENTID) {
                        this.ZJ_GJJHWH.splice($.inArray(this.ZJ_GJJHWH[i], this.ZJ_GJJHWH), 1);
                    }
                }
            },
            //省下达计划文号
            ZJ_SB2(response, file, fileList) {
                this.ZJ_SXDJHWH.push(response.data.DOCUMENTID);
                for (var i = 0; i < this.ZJ_SXDJHWH.length; i++) {
                    if (this.ZJ_SXDJHWH[i] == undefined) {
                        this.ZJ_SXDJHWH.splice(this.ZJ_SXDJHWH[i], 1)
                    }
                }
            },
            ZJ_RSB2(file) {
                for (var i = 0; i < this.ZJ_SXDJHWH.length; i++) {
                    if (this.ZJ_SXDJHWH[i] == file.response.data.DOCUMENTID) {
                        this.ZJ_SXDJHWH.splice($.inArray(this.ZJ_SXDJHWH[i], this.ZJ_SXDJHWH), 1);
                    }
                }
            },
            //项目验收信息
            //验收申请文号
            YS_SB(response, file, fileList) {
                this.YS_SQWH.push(response.data.DOCUMENTID);
                for (var i = 0; i < this.YS_SQWH.length; i++) {
                    if (this.YS_SQWH[i] == undefined) {
                        this.YS_SQWH.splice(this.YS_SQWH[i], 1)
                    }
                }
            },
            YS_RSB(file, fileList) {
                for (var i = 0; i < this.YS_SQWH.length; i++) {
                    if (this.YS_SQWH[i] == file.response.data.DOCUMENTID) {
                        this.YS_SQWH.splice($.inArray(this.YS_SQWH[i], this.YS_SQWH), 1);
                    }
                }

            },
            //验收报告
            YS_SB2(response, file, fileList) {
                this.YS_YSBG.push(response.data.DOCUMENTID);
                for (var i = 0; i < this.YS_YSBG.length; i++) {
                    if (this.YS_YSBG[i] == undefined) {
                        this.YS_YSBG.splice(this.YS_YSBG[i], 1)
                    }
                }
            },
            YS_RSB2(file) {
                for (var i = 0; i < this.YS_YSBG.length; i++) {
                    if (this.YS_YSBG[i] == file.response.data.DOCUMENTID) {
                        this.YS_YSBG.splice($.inArray(this.YS_YSBG[i], this.YS_YSBG), 1);
                    }
                }
            },
            //竣工验收批复文号
            YS_SB3(response, file, fileList) {
                this.YS_JGYSPFWH.push(response.data.DOCUMENTID);
                for (var i = 0; i < this.YS_JGYSPFWH.length; i++) {
                    if (this.YS_JGYSPFWH[i] == undefined) {
                        this.YS_JGYSPFWH.splice(this.YS_JGYSPFWH[i], 1)
                    }
                }
            },
            YS_RSB3(file) {
                for (var i = 0; i < this.YS_JGYSPFWH.length; i++) {
                    if (this.YS_JGYSPFWH[i] == file.response.data.DOCUMENTID) {
                        this.YS_JGYSPFWH.splice($.inArray(this.YS_JGYSPFWH[i], this.YS_JGYSPFWH), 1);
                    }
                }
            },
            // 取消
            cancel: function () {
                this.$router.go(-1);
            },
            // 提交
            submitForm: function (formName) {
                var that = this;
                that.db=true;
                //可研批复信息
                that.Editerform.FUND_ID = that.FUND_ID;
                that.Editerform.PF_KYSQSBWH = that.PF_KYSQSBWH.toString();
                that.Editerform.PF_KYPFWH = that.PF_KYPFWH.toString();
                that.Editerform.PF_SZFGJKYPFWH = that.PF_SZFGJKYPFWH.toString();
                //初设上报信息
                that.Editerform.CS_SBWH = that.CS_SBWH.toString();
                that.Editerform.CS_SPFWH = that.CS_SPFWH.toString();
                //资金
                that.Editerform.ZJ_GJJHWH = that.ZJ_GJJHWH.toString();
                that.Editerform.ZJ_SXDJHWH = that.ZJ_SXDJHWH.toString();
                //项目验收信息
                that.Editerform.YS_SQWH = that.YS_SQWH.toString();
                that.Editerform.YS_YSBG = that.YS_YSBG.toString();
                that.Editerform.YS_JGYSPFWH = that.YS_JGYSPFWH.toString();
                // console.log(that.Editerform);
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        that.$axios({
                            method: "post",
                            url: '/jlxmgl/pjUpdate.do',
                            data: JSON.stringify(that.Editerform)
                        }).then(function (res) {
                            // console.log(res);
                            if (res.data.result == "success") {
                                that.$message({
                                    message: '恭喜你，信息添加成功！',
                                    type: 'success'
                                });
                                that.$router.go(-1);
                                that.db=false;
                            }
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
    .upload-demo {
        margin-left: -180px;
    }

    .el-button--mini {
        padding: 13px 15px !important;
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
</style>