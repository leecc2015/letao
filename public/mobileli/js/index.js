$(function () {
    /*获得slider插件对象*/
    var gallery = mui('.mui-slider');
    /*调用slider初始化轮播图*/
    gallery.slider({
        /*自动轮播图的间隔时间*/
        interval: 500
    });
})