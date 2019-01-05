
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



    // 功能3 添加分类到列表
    // 思路
    // 1 给分类按钮注册点击事件
    // 2 点击按钮显示模态框
    // 3 给模态框添加按钮添加点击事件，点击按钮添加分类
    $('.main_bottom .addCate').on('click', function () {
        // 弹出模态框
        $('#insertCate').modal('show');

        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (data) {
                var html = template('secondCateList', data)
                $('.dropdown-menu').html(html);
            }
        })

    })

    // 功能4 同步一级分类的文本
    $(".dropdown-menu").on('click', '.topCate', function () {
        var $text = $(this).text();
        $(".dropdown-toggle .text").text($text);
        var id = $(this).data('id');
        $('[name="categoryId"]').val(id);
        $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
    })

    // 功能4 校验输入框

    $("#form").bootstrapValidator({
        excluded: [],
        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 校验的字段
        fields: {
            brandName: {
                // 校验规则
                validators: {
                    // 非空检验
                    notEmpty: {
                        // 提示信息
                        message: "请输入二级分类名称"
                    }
                }
            },

            categoryId: {
                // 校验规则
                validators: {
                    // 非空检验
                    notEmpty: {
                        // 提示信息
                        message: "请输入一级分类名称"
                    }
                }
            },

            brandLogo: {
                // 校验规则
                validators: {
                    // 非空检验
                    notEmpty: {
                        // 提示信息
                        message: "请上传图片"
                    }
                }
            }
        }
    });



    // 功能5 配置fileupload
    $('#fileupload').fileupload({
        dataType: "json",
        done: function (e, data) {
            // console.log(data);
            var pic = data.result.picAddr;
            $(".imgBox img").attr('src', pic)
            $('[name="brandLogo"]').val(pic);
            // 重置校验状态
            $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID")
        }
    })

    // 功能6 注册校验成功事件，通过ajax进行添加
    $("#form").on("success.form.bv", function (e) {
        //  阻止默认事件
        e.preventDefault();

        // 发送ajax请求，添加二级分类
        $.ajax({
            url:'/category/addSecondCategory',
            type:'post',
            data:$('#form').serialize(),
            success:function(data){
                // console.log(data);
                // 关闭模态框
                $('#insertCate').modal('hide');
                // 重置表单
                $('#form').data("bootstrapValidator").resetForm( true );

                currentPage = 1;
                render();
                $(".dropdown-toggle .text").text("请选择一级分类");
                $(".imgBox img").attr('src', './images/none.png')

            }
        })
    })
})