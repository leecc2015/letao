$(function(){
// 功能1 渲染表格

// 当前页
var currentPage = 1;
// 每页的条数
var pageSize = 5;

render();
// 发送ajax请求获取数据渲染表格
function render (){
    $.ajax({
        type:'get',
        url:'/user/queryUser',
        data:{
            page:currentPage,
            pageSize:pageSize
        },
        success:function(data){
            // console.log(data);
            // var json = data.rows;
            var html = template("userList",data);
            $('.main_bottom tbody').html(html);

// 功能2 分页
   // 配置分页
            $("#paginator").bootstrapPaginator({
                bootstrapMajorVersion:3,//指定bootstrap的版本，如果是3，必须指定
                currentPage:data.page,//指定当前页
                totalPages:Math.ceil(data.total/pageSize),//指定总页数
                onPageClicked:function (a,b,c, page) {
                  //page指的是点击的页码,修改了当前页
                  currentPage = page;
                  //重新渲染
                  render();
                }
              })
        }

    })
}


// 功能3 启用禁用功能
// 思路
// 1 给按钮注册点击事件--由于按钮是动态变化的，得注册委托事件
// 2 点击按钮显示模态框
// 3 获取点击按钮的data-id的值
// 4 给模态框确定按钮注册点击事件，并发送ajax请求，更改状态
$('.main_bottom tbody').on('click','.btn',function(){
    // 弹出模态框
    $('#statusChange').modal('show');

    // 获取id
    var id = $(this).parent().data("id");
    // 获取用户当前按钮的状态
    var isDelete = $(this).hasClass("btn-success") ? 1 : 0 ;
    // console.log(id);
    // console.log(isDelete);

    // 先解绑模态框确认按钮上的事件，在绑定事件----为了使按钮上始终只有一个事件
    $('.submitBtn').off('click').on('click',function(){
        // 发送ajax请求，更改状态
        $.ajax({
            type:'post',
            url:'/user/updateUser',
            data:{
                id:id,
                isDelete:isDelete
            },
            success:function(data){
                if(data.success){
                    $('#statusChange').modal('hide');
                    render();
                }
            }
        })
    })
})











})