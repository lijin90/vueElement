<template>
    <div id="container">
        <div class="jlxmName">
            <ul>
                <template v-for="item in dataList">
                    <li>项目名称：<span>{{item.originalObjects.XMMC}}</span></li>
                    <li>项目类型：<span>{{item.originalObjects.XMLX}}</span></li>
                    <li>实施单位：<span>{{item.currentObjects.SSDW_DESC}}</span></li>
                </template>

            </ul>
            <div class="handle-row">
                <el-button type="primary" @click="back">返回</el-button>
            </div>
        </div>
        <template v-for="item in dataList">
            <el-collapse style="margin-bottom: 20px" v-model="activeNames">
                <el-collapse-item title="项目基本信息" name="1">
                    <el-form ref="form" label-width="180px">
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="项目名称">
                                    <el-input v-model="item.originalObjects.XMMC" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="项目类型">
                                    <el-input v-model="item.originalObjects.XMLX" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="实施单位">
                                    <el-input v-model="item.currentObjects.SSDW_DESC" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="拟开工日期">
                                    <el-input v-model="item.originalObjects.YJKGSJ.substr(0,10)" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="建设性质">
                                    <el-input v-model="item.originalObjects.JSXZ" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="拟建成日期">
                                    <el-input v-model="item.originalObjects.YJJCSJ.substr(0,10)" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="证照类型">
                                    <el-input v-model="item.currentObjects.ZZLX_DESC" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="10">
                                <el-form-item label="详细建设地点">
                                    <el-input v-model="item.originalObjects.XXJSDD"
                                              readonly="readonly" class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="联系人电话">
                                    <el-input v-model="item.originalObjects.LXSJ" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="证照编码">
                                    <el-input v-model="item.originalObjects.ZZBM" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="联系人">
                                    <el-input v-model="item.originalObjects.LXRXM" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="联系人邮箱">
                                    <el-input v-model="item.originalObjects.LXYX" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="项目代码">
                                    <el-input v-model="item.originalObjects.XMDM" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="上报日期">
                                    <el-input v-model="item.originalObjects.SBRQ" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="国标行业">
                                    <el-input v-model="item.originalObjects.GBHY" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="项目目录">
                                    <el-input v-model="item.originalObjects.XMML" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="项目监管人">
                                    <el-input v-model="item.originalObjects.XMJGR" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="需中央投资（万元）">
                                    <el-input v-model="item.originalObjects.ZYTZ" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="需省级投资（万元）">
                                    <el-input v-model="item.originalObjects.SJPT" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="需市级投资（万元）">
                                    <el-input v-model="item.originalObjects.CSJPT" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="需县级投资（万元）">
                                    <el-input v-model="item.originalObjects.XJPT" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="需建设方自筹（万元）">
                                    <el-input v-model="item.originalObjects.JSFTZ" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="需总投资额（万元）">
                                    <el-input v-model="item.originalObjects.ZTZE" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="审核结果">
                                    <el-input v-model="item.currentObjects.SHJG_DESC" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="专家评审意见">
                                    <el-input v-model="item.originalObjects.ZJPSYJ" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="建设内容与规模">
                                    <el-input v-model="item.originalObjects.JSNRGMMS" readonly="readonly"
                                              :autosize="{ minRows: 2, maxRows: 6}"
                                              type="textarea"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-collapse-item>
            </el-collapse>
            <el-collapse v-model="activeNames" style="margin-bottom: 20px">
                <el-collapse-item title="可研批复信息" name="2">
                    <el-form label-width="180px" ref="Addform" style="overflow: hidden">
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="国家投资">
                                    <el-input v-model="item.originalObjects.PF_GTPFZJ" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="自筹资金">
                                    <el-input v-model="item.originalObjects.PF_ZCPFZJ" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="投资类别">
                                    <el-input v-model="item.originalObjects.PF_TZLB" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="预开工年份">
                                    <el-input v-model="item.originalObjects.PF_YKGNF" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="预建成年份">
                                    <el-input v-model="item.originalObjects.PF_YJCNF" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="审核结果">
                                    <el-input v-model="item.originalObjects.PF_SHJG" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="审核意见：">
                                    <el-input v-model="item.originalObjects.PF_SHYJ" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="可研申请上报文号：">
                                    <el-input v-model="item.originalObjects.PF_KYSQSBWH_DESC" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="可研批复文号：">
                                    <el-input v-model="item.originalObjects.PF_KYPFWH_DESC" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="省转发国家批复文号：">
                                    <el-input v-model="item.originalObjects.PF_SZFGJKYPFWH_DESC" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="可研申请上报文件">
                                    <div v-for="item in item.originalObjects.PF_KYSQSBWH_DOCINFOS">
                                        <template v-if="item.hz==1">
                                            <a target="_blank" :href="'/jlxmgl/uploadfiles/'+item.S_PATH">{{item.S_NAME}}</a>
                                        </template>
                                        <template v-else>
                                            <a :href="'/jlxmgl/fileDLS?filePath='+item.S_PATH.replace('\\\\', '\/\/')+'&fileName='+item.S_NAME">{{item.S_NAME}}</a>
                                        </template>
                                        <!--<a :href="'/jlxmgl/fileDLS?filePath='+item.S_PATH.replace('\\\\', '\/\/')+'&fileName='+item.name">{{item.S_NAME}}</a>-->
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="省转发国家批复文件">
                                    <div v-for="item in item.originalObjects.PF_SZFGJKYPFWH_DOCINFOS">
                                        <a :href="'/jlxmgl/fileDLS?filePath='+item.S_PATH.replace('\\\\', '\/\/')+'&fileName='+item.S_NAME">{{item.S_NAME}}</a>
                                    </div>
                                </el-form-item>
                            </el-col>

                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="可研批复文件">
                                    <div v-for="item in item.originalObjects.PF_KYPFWH_DOCINFOS">
                                        <template v-if="item.hz==1">
                                            <a target="_blank" :href="'/jlxmgl/uploadfiles/'+item.S_PATH">{{item.S_NAME}}</a>
                                        </template>
                                        <template v-else>
                                            <a :href="'/jlxmgl/fileDLS?filePath='+item.S_PATH.replace('\\\\', '\/\/')+'&fileName='+item.S_NAME">{{item.S_NAME}}</a>
                                        </template>
                                        <!--<a :href="'/jlxmgl/fileDLS?filePath='+item.S_PATH.replace('\\\\', '\/\/')+'&fileName='+item.S_NAME">{{item.S_NAME}}</a>-->
                                    </div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-collapse-item>
            </el-collapse>
            <el-collapse v-model="activeNames" style="margin-bottom: 20px">
                <el-collapse-item title="初设上报信息" name="3">
                    <el-form label-width="180px" ref="Addform" style="overflow: hidden">
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="审核结果">
                                    <el-input v-model="item.originalObjects.CS_SHJG" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="审核意见：">
                                    <el-input v-model="item.originalObjects.CS_SHYJ" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="主要建设内容：">
                                    <el-input v-model="item.originalObjects.CS_JSNR" readonly="readonly"
                                              :autosize="{ minRows: 2, maxRows: 6}"
                                              type="textarea"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="初设申报文号：">
                                    <el-input v-model="item.originalObjects.CS_SBWH_DESC" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="省批复初设文号：">
                                    <el-input v-model="item.originalObjects.CS_SPFWH_DESC" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="初设申报文件">
                                    <div v-for="item in item.originalObjects.CS_SBWH_DOCINFOS">
                                        <template v-if="item.hz==1">
                                            <a target="_blank" :href="'/jlxmgl/uploadfiles/'+item.S_PATH">{{item.S_NAME}}</a>
                                        </template>
                                        <template v-else>
                                            <a :href="'/jlxmgl/fileDLS?filePath='+item.S_PATH.replace('\\\\', '\/\/')+'&fileName='+item.S_NAME">{{item.S_NAME}}</a>
                                        </template>
                                        <!--<a :href="'/jlxmgl/fileDLS?filePath='+item.S_PATH.replace('\\\\', '\/\/')+'&fileName='+item.S_NAME">{{item.S_NAME}}</a>-->
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="省批复初设文件">
                                    <div v-for="item in item.originalObjects.CS_SPFWH_DOCINFOS">
                                        <template v-if="item.hz==1">
                                            <a target="_blank" :href="'/jlxmgl/uploadfiles/'+item.S_PATH">{{item.S_NAME}}</a>
                                        </template>
                                        <template v-else>
                                            <a :href="'/jlxmgl/fileDLS?filePath='+item.S_PATH.replace('\\\\', '\/\/')+'&fileName='+item.S_NAME">{{item.S_NAME}}</a>
                                        </template>
                                        <!--<a :href="'/jlxmgl/fileDLS?filePath='+item.S_PATH.replace('\\\\', '\/\/')+'&fileName='+item.S_NAME">{{item.S_NAME}}</a>-->
                                    </div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-collapse-item>
            </el-collapse>
        </template>
        <el-collapse v-model="activeNames" style="margin-bottom: 20px">
            <el-collapse-item title="资金下达" name="4">
                <!--列表-->
                <el-table
                        ref="multipleTable"
                        :data="PJ_FUND_INFO"
                        border
                        style="width: 100%;" align="center"
                >
                    <el-table-column
                            prop="originalObjects.ZJ_GTZJ"
                            label="国投资金"
                            width="120" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="originalObjects.ZJ_GTDWZI"
                            label="国投到位资金"
                            width="120" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="originalObjects.ZJ_STZJ"
                            label="省投资金"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="originalObjects.ZJ_STDWZJ"
                            label="省投到位资金"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="originalObjects.ZJ_CSTZJ"
                            label="市投资金"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="originalObjects.ZJ_CSTDWZJ"
                            label="市投到位资金"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="originalObjects.ZJ_XTZJ"
                            label="县投资金"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="originalObjects.ZJ_XTDWZJ"
                            label="县投到位资金"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="originalObjects.ZJ_DWZCZJ"
                            label="单位自筹资金"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="originalObjects.ZJ_DWZCDWZJ"
                            label="单位自筹到位资金"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="originalObjects.ZJ_LJWCTZ"
                            label="累计完成投资"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="originalObjects.ZJ_NDJSNR"
                            label="年度建设内容"
                            align="center"
                            width="200"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="originalObjects.ZJ_SJBFZR"
                            label="省经办负责人"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="originalObjects.ZJ_SJBLXDH"
                            label="省经办联系电话"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            label="国家计划文号"
                            align="center"
                            width="200"
                    >
                        <template slot-scope="scope">
                            <div v-for="item in scope.row.originalObjects.ZJ_GJJHWH_DOCINFOS">
                                <template v-if="item.hz==1">
                                    <a target="_blank"
                                       :href="'/jlxmgl/uploadfiles/'+item.S_PATH.replace('\\\\', '\/\/')">{{item.S_NAME}}</a>
                                </template>
                                <template v-else>
                                    <a :href="'/jlxmgl/fileDLS?filePath='+item.S_PATH.replace('\\\\', '\/\/')+'&fileName='+item.S_NAME">{{item.S_NAME}}</a>
                                </template>
                                <!--<a :href="'/jlxmgl/fileDLS?filePath='+item.S_PATH.replace('\\\\', '\/\/')+'&fileName='+item.S_NAME">{{item.S_NAME}}</a>-->
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="省下达计划文件"
                            align="center"
                            width="200"
                    >
                        <template slot-scope="scope">
                            <div v-for="item in scope.row.originalObjects.ZJ_SXDJHWH_DOCINFOS">
                                <template v-if="item.hz==1">
                                    <a target="_blank"
                                       :href="'/jlxmgl/uploadfiles/'+item.S_PATH.replace('\\\\', '\/\/')">{{item.S_NAME}}</a>
                                </template>
                                <template v-else>
                                    <a :href="'/jlxmgl/fileDLS?filePath='+item.S_PATH.replace('\\\\', '\/\/')+'&fileName='+item.S_NAME">{{item.S_NAME}}</a>
                                </template>
                                <!--<a :href="'/jlxmgl/fileDLS?filePath='+item.S_PATH.replace('\\\\', '\/\/')+'&fileName='+item.S_NAME">{{item.S_NAME}}</a>-->
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-collapse-item>
        </el-collapse>
        <template v-for="item in dataList">
            <el-collapse v-model="activeNames" style="margin-bottom: 20px">
                <el-collapse-item title="验收申请" name="5">
                    <el-form label-width="180px">
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="实际开工时间">
                                    <el-input v-model="item.originalObjects.YS_SJKGRQ" readonly="readonly"
                                              class="changeInput" style="border:none"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="实际竣工时间">
                                    <el-input v-model="item.originalObjects.YS_SJJGRQ" readonly="readonly"
                                              class="changeInput" style="border:none"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="专家验收意见">
                                    <el-input v-model="item.originalObjects.YS_ZJYSYJ"
                                              readonly="readonly"
                                              :autosize="{ minRows: 2, maxRows: 6}"
                                              type="textarea"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="验收申请号：">
                                    <el-input v-model="item.originalObjects.YS_SQWH_DESC" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="竣工验收批复文号：">
                                    <el-input v-model="item.originalObjects.YS_JGYSPFWH_DESC" readonly="readonly"
                                              class="changeInput"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="验收报告">
                                    <div v-for="item in item.originalObjects.YS_YSBG_DOCINFOS">
                                        <template v-if="item.hz==1">
                                            <a target="_blank" :href="'/jlxmgl/uploadfiles/'+item.S_PATH">{{item.S_NAME}}</a>
                                        </template>
                                        <template v-else>
                                            <a :href="'/jlxmgl/fileDLS?filePath='+item.S_PATH.replace('\\\\', '\/\/')+'&fileName='+item.S_NAME">{{item.S_NAME}}</a>
                                        </template>
                                        <!--<a :href="'/jlxmgl/fileDLS?filePath='+item.S_PATH.replace('\\\\', '\/\/')+'&fileName='+item.S_NAME">{{item.S_NAME}}</a>-->
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="验收申请文件">
                                    <div v-for="item in item.originalObjects.YS_SQWH_DOCINFOS">
                                        <template v-if="item.hz==1">
                                            <a target="_blank" :href="'/jlxmgl/uploadfiles/'+item.S_PATH">{{item.S_NAME}}</a>
                                        </template>
                                        <template v-else>
                                            <a :href="'/jlxmgl/fileDLS?filePath='+item.S_PATH.replace('\\\\', '\/\/')+'&fileName='+item.S_NAME">{{item.S_NAME}}</a>
                                        </template>
                                        <!--<a :href="'/jlxmgl/fileDLS?filePath='+item.S_PATH.replace('\\\\', '\/\/')+'&fileName='+item.S_NAME">{{item.S_NAME}}</a>-->
                                    </div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="竣工验收批复文件">
                                    <div v-for="item in item.originalObjects.YS_JGYSPFWH_DOCINFOS">
                                        <template v-if="item.hz==1">
                                            <a target="_blank" :href="'/jlxmgl/uploadfiles/'+item.S_PATH">{{item.S_NAME}}</a>
                                        </template>
                                        <template v-else>
                                            <a :href="'/jlxmgl/fileDLS?filePath='+item.S_PATH.replace('\\\\', '\/\/')+'&fileName='+item.S_NAME">{{item.S_NAME}}</a>
                                        </template>
                                        <!--<a :href="'/jlxmgl/fileDLS?filePath='+item.S_PATH.replace('\\\\', '\/\/')+'&fileName='+item.S_NAME">{{item.S_NAME}}</a>-->
                                    </div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-collapse-item>
            </el-collapse>
            <el-collapse v-model="activeNames" style="margin-bottom: 20px">
                <el-collapse-item title="档案管理" name="6" v-if="GetFile==1">
                    <el-form label-width="180px">
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="所属项目">
                                    <el-input v-model="item.originalObjects.DAK_INFO.currentObjects.PROJECT_ID_DESC"
                                              readonly="readonly"
                                              class="changeInput" style="border:none"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="验收报告">
                                    <div v-for="item in item.originalObjects.DAK_INFO.originalObjects.DOCINFOS">
                                        <template v-if="item.hz==1">
                                            <a target="_blank" :href="'/jlxmgl/uploadfiles/'+item.S_PATH">{{item.S_NAME}}</a>
                                        </template>
                                        <template v-else>
                                            <a :href="'/jlxmgl/fileDLS?filePath='+item.S_PATH.replace('\\\\', '\/\/')+'&fileName='+item.S_NAME">{{item.S_NAME}}</a>
                                        </template>
                                    </div>
                                    <!--<div v-for="item in item.originalObjects.DAK_INFO.originalObjects.DOCINFOS">-->
                                        <!--<a :href="'/jlxmgl/fileDLS?filePath='+item.S_PATH.replace('\\\\', '\/\/')+'&fileName='+item.S_NAME">{{item.S_NAME}}</a>-->
                                    <!--</div>-->
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="上传用户">
                                    <el-input v-model="item.originalObjects.DAK_INFO.originalObjects.AUTHOR"
                                              readonly="readonly"
                                              class="changeInput" style="border:none"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="上传日期">
                                    <el-input v-model="item.originalObjects.DAK_INFO.originalObjects.UPLOAD_DATE.substr(0,10)"
                                              readonly="readonly"
                                              class="changeInput" style="border:none"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-collapse-item>
            </el-collapse>
        </template>
    </div>
</template>

<script>
    export default {
        name: "ApprovalPf",
        data() {
            return {
                fileDownloadIpPort: '',
                PJ_FUND_INFO: [],//资金下达
                dataList: [],//获取数据列表
                activeNames: ['1'],
                listLoading: false,
                GetFile: this.$route.query.GetFile,
                SendID: this.$route.query.SendID,
            }
        },
        methods: {
            back: function () {
                this.$router.go(-1);
            },
        },
        created() {
            var that = this;
            // if (that.GetFile == 1) {
            //     that.$axios({
            //         method: "GET",
            //         url: "/jlxmgl/dakPjQuery.do?docId=" + that.SendID,
            //         // data: this.$qs.stringify({data: datas})
            //     }).then(function (res) {
            //         if (res.data.result == 'success') {
            //             that.dataList.push(res.data.data);
            //             that.PJ_FUND_INFO = res.data.data.originalObjects.PJ_FUND_INFO
            //         }
            //     }).catch(function (error) {
            //         console.log(error);
            //     });
            // }else{ }
            var baseUrl="/jlxmgl/pjDetails.do?pjId=" + that.SendID;
            if (that.GetFile == 1) {
                baseUrl="/jlxmgl/dakPjQuery.do?docId=" + that.SendID;
            }
            that.$axios({
                method: "GET",
                url: baseUrl,
                // data: this.$qs.stringify({data: datas})
            }).then(function (res) {
                if (res.data.result == 'success') {
                    //科研批复
                    that.common.Pdf(res.data.data.originalObjects.PF_KYPFWH_DOCINFOS);
                    //科研批复上报
                    that.common.Pdf(res.data.data.originalObjects.PF_KYSQSBWH_DOCINFOS);

                    //科研批复上报
                    that.common.Pdf(res.data.data.originalObjects.PF_SZFGJKYPFWH_DOCINFOS);

                    //初设上报
                    that.common.Pdf(res.data.data.originalObjects.CS_SBWH_DOCINFOS);
                    //初设批复
                    that.common.Pdf(res.data.data.originalObjects.CS_SPFWH_DOCINFOS);
                    //验收批复
                    that.common.Pdf(res.data.data.originalObjects.YS_JGYSPFWH_DOCINFOS);
                    //验收批复
                    that.common.Pdf(res.data.data.originalObjects.YS_SQWH_DOCINFOS);
                    //验收批复
                    that.common.Pdf(res.data.data.originalObjects.YS_YSBG_DOCINFOS);
                    // 资金吗
                    for (var i = 0; i < res.data.data.originalObjects.PJ_FUND_INFO.length; i++) {
                        for (var j = 0; j < res.data.data.originalObjects.PJ_FUND_INFO[i].originalObjects.ZJ_GJJHWH_DOCINFOS.length; j++) {
                            if (res.data.data.originalObjects.PJ_FUND_INFO[i].originalObjects.ZJ_GJJHWH_DOCINFOS[j].S_NAME.endsWith('.pdf')) {
                                res.data.data.originalObjects.PJ_FUND_INFO[i].originalObjects.ZJ_GJJHWH_DOCINFOS[j].hz = 1
                            } else {
                                res.data.data.originalObjects.PJ_FUND_INFO[i].originalObjects.ZJ_GJJHWH_DOCINFOS[j].hz = 0
                            }
                        }
                        for (var j = 0; j < res.data.data.originalObjects.PJ_FUND_INFO[i].originalObjects.ZJ_SXDJHWH_DOCINFOS.length; j++) {
                            if (res.data.data.originalObjects.PJ_FUND_INFO[i].originalObjects.ZJ_SXDJHWH_DOCINFOS[j].S_NAME.endsWith('.pdf')) {
                                res.data.data.originalObjects.PJ_FUND_INFO[i].originalObjects.ZJ_SXDJHWH_DOCINFOS[j].hz = 1
                            } else {
                                res.data.data.originalObjects.PJ_FUND_INFO[i].originalObjects.ZJ_SXDJHWH_DOCINFOS[j].hz = 0
                            }
                        }
                    }
                    if (that.GetFile == 1) {
                        // 档案
                        // console.log(res.data.data.originalObjects.DAK_INFO.originalObjects.DOCINFOS)
                        for (var i = 0; i < res.data.data.originalObjects.DAK_INFO.originalObjects.DOCINFOS.length; i++) {
                            if (res.data.data.originalObjects.DAK_INFO.originalObjects.DOCINFOS[i].S_NAME.endsWith('.pdf')) {
                                res.data.data.originalObjects.DAK_INFO.originalObjects.DOCINFOS[i].hz = 1
                            } else {
                                res.data.data.originalObjects.DAK_INFO.originalObjects.DOCINFOS[i].hz = 0
                            }
                        }
                    }

                    that.dataList.push(res.data.data);
                    that.PJ_FUND_INFO = res.data.data.originalObjects.PJ_FUND_INFO;
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        mounted() {
        },

    }
</script>
<style>
    .changeInput .el-input__inner {
        border: none;
        outline: none;
        color: #9b9b9b !important;
    }

    .changeInput .el-textarea__inner {
        border: none;
        outline: none;
        color: #9b9b9b !important;
        resize: none;
    }
</style>
<style scoped>
    .el-form-item {
        margin-bottom: 0px !important;
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

    a[data-v-3c53039f] {
        display: inline-block;
        padding: 0px 15px;
        color: #9b9b9b !important;
    }

    a:hover {
        color: #D05628 !important;
    }

    .handle-row {
        float: right;
        overflow: hidden;
    }

</style>