// 功能1 进度显示
// jq相关的api
// 思路：
// 1当ajax发送请求时显示进度条
// 2当ajax请求中的时候显示进度加载
// 3挡ajax完成了，进度条要走完
$(document).ajaxStart(function () {
    // 只要使用了ajax就会调用这个方法
    // 开启进度条
    NProgress.start();
})

$(document).ajaxStop(function () {
    // 结束进度条
    NProgress.done();
})


// 功能2 左侧信息栏显示与隐藏
// 1 给menu注册点击事件
// 2 点击menu使左侧信息栏left更改为-180px---通过切换类名的方式
// 3 同时，main的margin值变为0--通过切换类名的方式
$(function () {


    // 功能5 显示隐藏分类二级菜单
    var $list = $('.category');
    // console.log($list);
    $list.on('click',function(){
        $(this).next().stop().slideToggle();
        console.log(1);
    })


    $('.main_menu').on('click', function () {
        $('.nav').toggleClass('hid');
        $('.main').toggleClass('hid');
        $('.main_header').toggleClass('hid');
    })


    // 功能3 退出功能配置模态框
    $('.main_logout').on('click', function () {
        $('#logout').modal('show');
    });

    // 功能4 退出功能
    // 1 给模态框的退出按钮注册点击事件
    // 2 发送ajax请求，退出程序
    $('.btn-logout').on('click', function () {
        $.ajax({
            type: 'get',
            url: '/employee/employeeLogout',
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    location.href = "login.html";
                    return;
                }
            }
        })
    })




});