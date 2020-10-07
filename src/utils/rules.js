
// 手机号验证
var phone = ( value) => {
    let regFormat = /^[1][3578][0-9]{9}$/; //正确手机号
    return regFormat.test(value)
};
// 验证码
var code = ( value) => {
    let regFormat = /^\S{6}$/; //
    return regFormat.test(value)
};
// 邀请码
var inviteCode = ( value) => {
    let regFormat = /^[A-Za-z0-9]{6}$/; //
    return regFormat.test(value)
};
//数字验证
var number = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('不能为空'));
    }
    if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
    } else {
        if (value < 18) {
            callback(new Error('必须大于18岁'));
        }else if(value >55){
            callback(new Error('必须小于55岁'));
        } else {
            callback();
        }
    }
};
//text不能为空
var text = ( value) => {
    return value.length > 0
};
//desc不能为空
var desc = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('不能为空'));
    }else{
        callback();
    }
};
//邮箱
var email = (value) => {
    let mal = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   return mal.test(value)
};
//开始时间
var startTime = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请选择开始日期'));
    }else{
        callback();
    }
};
//开始时间
var endTime = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请选择结束日期'));
    }else{
        callback();
    }
};
//时间
var time = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请选择日期'));
    }else{
        callback();
    }
};
//多选框
var checkbox = (rule, value, callback) => {
    if (value.length<1) {
        return callback(new Error('请选择一个'));
    }else{
        callback();
    }
};
//单选框
var radio = (rule, value, callback) => {
    if (value.length<1) {
        return callback(new Error('请选择一个'));
    }else{
        callback();
    }
};
//下拉框
var select = (rule, value, callback) => {
    if (value.length<1) {
        return callback(new Error('请选择一个'));
    }else{
        callback();
    }
};
//QQ号码验证
var QQV = (rule, value, callback) => {
    debugger
    if (value === '') {
        callback(new Error('输入QQ号'))
    } else if (/^[1-9][0-9]{4,10}$/.test(value)) {
        callback()
    } else {
        callback(new Error('输入正确的QQ号'))
    }
}

// 类似金钱,首位不为0,最多2位小数
export function checkNumPot2(rule, value, callback) {
    const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
    if (!value) {
        return callback(new Error('请填写数字'))
    } else if (!reg.test(value)) {
        return callback(new Error('请填写数字,最多2位小数'))
    } else {
        callback()
    }
}

// 身份证
export function checkIdNum(rule, value, callback) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (!value) {
        return callback(new Error('证件号码不能为空'))
    } else if (!reg.test(value)) {
        return callback(new Error('证件号码不正确'))
    } else {
        callback()
    }
}

// 整数
export function checkInterNum(rule, value, callback) {
    const reg = /^[0-9]*[1-9][0-9]*$/
    if (!value) {
        return callback(new Error('请填写整数'))
    } else if (!reg.test(value)) {
        return callback(new Error('请输入整数'))
    } else {
        callback()
    }
}
// 密码
export function checkPassword(value) {
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,20}$/
    return reg.test(value)
}
// web
export function checkWeb(value) {
    const reg = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/
    return reg.test(value)
}
export default {
    phone: [{required: true, validator: phone, message: '请输入正确手机号'}],
    code: [{required: true, validator: code, message: '请输入6位验证码'}],
    inviteCode: [{required: true, validator: inviteCode, message: '请输入6位数字英文邀请码'}],
}
