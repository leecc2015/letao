
$(function () {

    // 功能1 渲染表格
    var currentPage = 1;
    var pageSize = 5;

    render();
    function render() {

        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                var html = template('secondList', data);
                $('.main_bottom tbody').html(html)

                // 功能2 分页
                // 配置分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//指定bootstrap的版本，如果是3，必须指定
                    currentPage: data.page,//指定当前页
                    totalPages: Math.ceil(data.total / pageSize),//指定总页数
                    onPageClicked: function (a, b, c, page) {
                        //page指的是点击的页码,修改了当前页
                        currentPage = page;
                        //重新渲染
                        render();
                    }
                })
            }
        })
    }



    // 功能3 添加分类
    // 思路
    // 1 给分类按钮注册点击事件
    // 2 点击按钮显示模态框
    // 3 给模态框添加按钮添加点击事件，点击按钮添加分类
    $('.main_bottom .addCate').on('click',function(){
        // 弹出模态框
        $('#insertCate').modal('show');
    
    
    
        // 先解绑模态框确认按钮上的事件，在绑定事件----为了使按钮上始终只有一个事件
        $('.insertBtn').off('click').on('click',function(){
            // 发送ajax请求，更改状态
            var categoryName = $('.insert').val();
            $.ajax({
                type:'post',
                url:'/category/addTopCategory',
                data:{
                    categoryName:categoryName
                },
                success:function(data){
                    if(data.success){
                        $('#insertCate').modal('hide');
                        $('.insert').val("");
                        currentPage = 1;
                        render();
                    }
                }
            })
        })
    })

    // 功能4 校验输入框
   
    $("#form").bootstrapValidator({

        // 配置图标
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },
    
        // 校验的字段
        fields: {
          cateName: {
            // 校验规则
            validators: {
              // 非空检验
              notEmpty: {
                // 提示信息
                message: "请输入一级分类名称"
              }
            }
          }
        }
      });




















})