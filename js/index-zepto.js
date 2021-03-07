$(function() {
    //获取需要的元素
    var jd_banner = $(".jd_banner");
    var jd_bannerWidth = jd_banner.width();
    var jd_bannerImg = $(".jd_bannerImg");
    var jd_banner_icon = $(".jd_banner_icon");
    var jd_banner_icon_lis = jd_banner_icon.find("li");
    var first = jd_bannerImg.find("li:first-child");
    var last = jd_bannerImg.find("li:last-child");

    //1.先把第一张照片和最后一张照片clone
    jd_bannerImg.append(first.clone());
    last.clone().insertBefore(first);
    //2.设置ul和li的宽高
    var lis = $(".jd_bannerImg li");
    var count = lis.length;
    jd_bannerImg.width(jd_bannerWidth * count);
    //为每一个li赋值
    lis.each(function(index, ele) {
        $(lis[index]).width(jd_bannerWidth);
    });
    //让ul偏移
    jd_bannerImg.css("left", -jd_bannerWidth);

    // 给ul加上定时器
    var index = 1;
    //封装动画函数
    var imgAnimate = function() {
        jd_bannerImg.animate({ "left": -index * jd_bannerWidth },
            //过渡效果时间
            200,
            "ease-out",
            function() {
                if (index == count - 1) {
                    index = 1;
                    $(".jd_bannerImg").css("left", -index * jd_bannerWidth);
                } else if (index == 0) {
                    index = count - 2;
                    $(".jd_bannerImg").css("left", -index * jd_bannerWidth);
                }
                //获取回来的元素不需要再加$获取
                jd_banner_icon_lis.removeClass("current").eq(index - 1).addClass("current");
            }
        )
    }

    function timerID() {
        timer = setInterval(function() {
            index++;
            imgAnimate();
        }, 2000);
    }
    timerID();
    //向左滑动,谷歌浏览器支持tap，谷歌浏览器不支持swipe，真机模拟支持
    jd_bannerImg.on("swipeLeft", function() {
        clearInterval(timer);
        index++;
        imgAnimate();
        timerID();
    });
    //向右滑动
    jd_bannerImg.on("swipeRight", function() {
        clearInterval(timer);
        index--
        imgAnimate();
        timerID();
    });
})