import Vue from 'vue'
//权限检查方法
Vue.prototype.$_has = function (value) {
    // debugger
    // console.log(value)
    let isExist = false;

    let buttonpermsStr = localStorage.getItem('Menu_Btn');
    console.log(buttonpermsStr);
    if (buttonpermsStr == undefined || buttonpermsStr == null) {
        return false;
    }
    let buttonperms = JSON.parse(buttonpermsStr);
    for (let i = 0; i < buttonperms.length; i++) {
        var bb = buttonperms[i].replace(/\'/g, "");
        if (bb.indexOf(value) > -1) {
            isExist = true;
            break;
        }
    }
    return isExist;
};
/**权限指令**/
const has=Vue.directive('has', {
    bind: function (el, binding) {
        // console.log(el)
        if (!Vue.prototype.$_has(binding.value)) {
            setTimeout(() => el.parentNode.removeChild(el))
            // el.parentNode.removeChild(el);
        }
    }
});
export {has}

