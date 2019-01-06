$(function () {
    /*获得slider插件对象*/
    var gallery = mui('.mui-slider');
    /*调用slider初始化轮播图*/
    gallery.slider({
        /*自动轮播图的间隔时间*/
        interval: 500
    });


    // mui实现的选择器, 可以生成mui实例, 就可以调用 mui实例的方法
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false //是否显示滚动条
  });
})