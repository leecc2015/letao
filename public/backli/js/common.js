// 进度显示
// jq相关的api
// 思路：
// 1当ajax发送请求时显示进度条
// 2当ajax请求中的时候显示进度加载
// 3挡ajax完成了，进度条要走完
$(document).ajaxStart(function(){
    // 只要使用了ajax就会调用这个方法
    // 开启进度条
    NProgress.start();
})

$(document).ajaxStop(function(){
    // 结束进度条
    NProgress.done();
})