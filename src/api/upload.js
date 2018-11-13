import request from './request'

export function uploadPic(file) {
    let param = new FormData(); //创建form对象
    param.append('file',file);//通过append向form对象添加数据
    return request({
        url: '/api/upload/uploadPic',
        method: 'post',
        headers: {'Content-Type':'multipart/form-data'},
        data: param
    })
}
