$(function () {
  // 初始化插件
  $('#login').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [':disabled', ':hidden', ':not(:visible)'],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
          callback: {
            message: '用户名错误'
          }
        }
      },


      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          // 长度校验
          stringLength: {
            min: 6,
            max: 30,
            message: '密码长度必须在6到30之间'
          },
          // 正则校验
          regexp: {
            regexp: /^[a-zA-Z0-9_\.]+$/,
            message: '密码由数字字母下划线和.组成'
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    },
  });

  $('#login').on('success.form.bv', function (e) {
    e.preventDefault();//阻止默认的提交功能，防止跳转，通过ajax提交
    $form = $(e.target);//事件目标
    // console.log($form.serialize());
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      datatype: 'json',
      data: $form.serialize(),
      success: function (data) {
        // console.log(res);
        if (data.success) {
          location.href = 'index.html';
          return;
        }
        if (data.error == 1000) {
          $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
          return;
        }
        if (data.error == 1001) {
          $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
          return;
        }
      }
    })
  })

  // 重置功能
  //里面传参是内容和状态都重置，不传参只重置状态
  $("[type='reset']").click(function(){
    $('#login').data('bootstrapValidator').resetForm();
  })

})