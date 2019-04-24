import Vue from 'vue'
import axios from 'axios'//引入axios
import qs from 'qs'
import FileSaver from 'file-saver'//导出excel
import XLSX from 'xlsx'//导出excel
// Vue.use(axios)
// Vue.prototype.$axios = axios;//把axios挂载到vue上
export default {
    // 项目监管进度金额验证
    XmcheckNumber: (rule, value, callback) => {
        if (!value) {
            return callback(new Error('输入金额'));
        } else {
            // const reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/
            const reg = /^(([0-9]*)|(([0]\.\d{1,2}|[0-9]*\.\d{1,2})))$/
            if (reg.test(value)) {
                callback();
            } else {
                return callback(new Error('请输入正确的金额（保留小数点后俩位）'));
            }
        }
    },
    // 验证邮箱
    checkEmail: (rule, value, callback) => {
        if (value != '' && value != undefined) {
            const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
            if (reg.test(value)) {
                callback();
            } else {
                return callback(new Error('请输入正确的邮箱号'));
            }
        } else {
            callback();
        }
    },
    // 验证金额
    checkNumber: (rule, value, callback) => {
        if (value != '' && value != undefined) {
            const reg = /^(([0-9]*)|(([0]\.\d{1,2}|[0-9]*\.\d{1,2})))$/
            // const reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/
            if (reg.test(value)) {
                callback();
            } else {
                return callback(new Error('请输入正确的金额（保留小数点后俩位）'));
            }
        } else {
            callback();
        }
    },
    CallcheckPhone: (rule, value, callback) => {
        if (!value) {
            return callback(new Error('手机号不能为空'));
        } else {
            const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
            if (reg.test(value)) {
                callback();
            } else {
                return callback(new Error('请输入正确的手机号'));
            }
        }
    },
    // 验证手机号
    checkPhone: (rule, value, callback) => {
        if (value != '' && value != undefined) {
            const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
            if (reg.test(value)) {
                callback();
            } else {
                return callback(new Error('请输入正确的手机号'));
            }
        } else {
            callback();
        }
    },
    //专家验证手机号
    ExpertcheckPhone: (rule, value, callback) => {
        // console.log(value)
        if (!value) {
            return callback(new Error('请输入手机号'));
        } else {
            const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
            if (reg.test(value)) {
                callback();
            } else {
                return callback(new Error('请输入正确的手机号'));
            }
        }
    },
    // 导出excel
    Excel: function () {
        /* generate workbook object from table */
        var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
        try {
            FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), 'Excel.xlsx')
        } catch (e) {
            if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
    },
    login: function () {
        console.log("1111");
    },
    // 修改文件名，路径，id
    replacefile: function (obj) {
        // console.log(obj)
        if (obj) {
            for (var i = 0; i < obj.length; i++) {
                obj[i].response = {};
                obj[i].response.data = {}
                obj[i].id = obj[i].DOCID;
                obj[i].name = obj[i].S_NAME;
                obj[i].path = obj[i].S_PATH;
                obj[i].response.data.DOCUMENTID = obj[i].DOCID;
                delete obj[i].DOCID;
                delete obj[i].S_NAME;
                delete obj[i].S_PATH;
            }
        }
        // console.log(obj)

    },
    // 当前时间
    formatReplyTime: function (date) {
        if (date) {
            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            return date.getFullYear() + "-" + month + "-" + currentDate + " " + hours + ":" + minutes + ":" + seconds;
        }
    },
    // var time=formatReplyTime(new Date());//调用
    GetID: function (obj, IDARR) {
        for (var i = 0; i < obj.length; i++) {
            IDARR.push(obj[i].id)
        }
    },

    // 判断pdf
    Pdf:function (obj) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].S_NAME.endsWith('.pdf')) {
                obj[i].hz = 1;
            } else {
                obj[i].hz = 0;
            }
        }
    }
}