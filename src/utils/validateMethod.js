

export function _validateUserName (rule, value, callback) {
    if (value === '') {
        callback(new Error('请输入用户名'));
        return false;
    }
    if(!new RegExp(/^[a-zA-Z0-9_-]{4,16}$/).test(value)){
        callback(new Error('用户名不合格'));
        return false;
    }
    return true;
}

export function _validatePhone (rule, value, callback) {
    if(value !== '' && value !== null && !new RegExp(/^1\d{10}$/).test(value)){
        callback(new Error('请输入正确手机号'));
        return false;
    }
    callback();
    return true;
}
