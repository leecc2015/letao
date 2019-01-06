
$(function(){

    // 功能1 渲染表格
    var currentPage = 1;
    var pageSize = 2;
    // 声明一个空数组保存图片
    var picArr = [];

    render();
    function render() {

        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (data) {
                var html = template('goodList', data);
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



    // 功能3 动态添加二级分类

    $('.main_bottom .addCate').on('click', function () {
        // 弹出模态框
        $('#insertGood').modal('show');

        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                var html = template('secondList', data)
                $('.dropdown-menu').html(html);
            }
        })
    })


    // 功能4 同步二级分类的文本
    $(".dropdown-menu").on('click', 'a', function () {
        var $text = $(this).text();
        $(".dropdown-toggle .text").text($text);
        var id = $(this).data('id');
        $('[name="brandId"]').val(id);
        $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
    })


    // // 功能5 校验输入框
    $("#form").bootstrapValidator({
        // 将默认的排除项重置掉
        excluded:[],
        // 配置图标
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },

        // 校验的字段
        fields: {
            brandId: {
            // 校验规则
            validators: {
              // 非空检验
              notEmpty: {
                // 提示信息
                message: "请选择二级分类"
              }
            }
          },

          proName: {
            // 校验规则
            validators: {
              // 非空检验
              notEmpty: {
                // 提示信息
                message: "请输入商品名称"
              }
            }
          },

          proDesc: {
            // 校验规则
            validators: {
              // 非空检验
              notEmpty: {
                // 提示信息
                message: "请输入商品描述"
              }
            }
          },

          num: {
            // 校验规则
            validators: {
              // 非空检验
              notEmpty: {
                // 提示信息
                message: "请输入商品库存"
              },
              regexp: {
                  regexp:/^[1-9]\d*$/,
                // 提示信息
                message: "商品的库存必须是非零整数"
              }
            }
          },

          size: {
            // 校验规则
            validators: {
              // 非空检验
              notEmpty: {
                // 提示信息
                message: "请输入商品尺码"
              },
              regexp: {
                regexp: /^\d{2}-\d{2}$/,
                message: '尺码格式, 必须是 32-42'
              }
            }
          },

         price: {
            // 校验规则
            validators: {
              // 非空检验
              notEmpty: {
                // 提示信息
                message: "请输入商品价格"
              }
            }
          },

          oldPrice: {
            // 校验规则
            validators: {
              // 非空检验
              notEmpty: {
                // 提示信息
                message: "请输入商品原价"
              }
            }
          },

          picStatus: {
            // 校验规则
            validators: {
              // 非空检验
              notEmpty: {
                // 提示信息
                message: "请上传3张图片"
              }
            }
          }
        }
      });



    //   功能6 配置图片上传
    $("#fileupload").fileupload({
        dataType:"json",
        done:function(e,data){
           var picObj = data.result;
            var pic =  picObj.picAddr;
            // 将添加的图片加到imgBox的前面
            // 将 新得到的图片对象添加到数组的最前面
            picArr.unshift( picObj );
            $('#imgBox').prepend('<img src="' + pic + '" width="100">');
            
            // 如果上传的图片大于3张，需要将最先上传的删除
            if(picArr.length > 3 ){
              picArr.pop();
              $('#imgBox img:last-of-type').remove();
              console.log(picArr);
            }

            if(picArr.length == 3 ){
              $('#form').data('bootstrapValidator').updateStatus('picStatus', 'VALID');
            }
        }
    })

    // 功能7 注册校验成功事件
    $('#form').on('success.form.bv',function(e){
      e.preventDefault();
      var params = $("#form").serialize();

      params += '&picArr=' + JSON.stringify( picArr );

      $.ajax({
        type:'post',
        url:'/product/addProduct',
        data:params,
        success:function( data ){
          console.log(data);
          if(data.success){
            // 关闭模态框
            $('#insertGood').modal('hide');
            // 重置表格
            $("#form").data('bootstrapValidator').resetForm(true);
            // 渲染页面
            currentPage = 1;
            render();
            // 重置下拉菜单
            $(".dropdown-toggle .text").text('请选择二级分类');
            // 删除预览图片
            $('#imgBox img').remove();
            // 重置数组
            picArr = [];
          }
        }
      })
    });




})







