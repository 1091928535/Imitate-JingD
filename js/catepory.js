window.onload = function() {
    var boxUl = document.querySelector(".category_bottom_left");
    var ul = document.querySelector(".category_bottom_left ul");
    var lis = ul.querySelectorAll("li");
    var ulHeight = ul.offsetHeight;
    var boxUlHeight = boxUl.offsetHeight;
    console.log(ulHeight, boxUlHeight);
    //静止状态下top最大距离
    var maxTop = 0;
    //静止状态下top最小距离
    var minTop = boxUlHeight - ulHeight;
    //滑动状态下top的最大距离
    var maxSlideTop = maxTop + 100;
    var minSlideTop = minTop - 100;
    var slientY, moveY, countY, currentY = 0;
    ul.addEventListener("touchstart", function(e) {
        slientY = e.targetTouches[0].pageY;
    })
    ul.addEventListener("touchmove", function(e) {
        moveY = e.targetTouches[0].pageY;
        countY = moveY - slientY;
        //在计算出移动距离后判断
        if ((currentY + countY) > maxSlideTop || (currentY + countY) < minSlideTop) {
            return;
        }
        ul.style.transition = "none";
        ul.style.top = (currentY + countY) + 'px';
    })
    ul.addEventListener("touchend", function() {
        //结束后让ul回到top最大的位置
        if ((currentY + countY) > maxTop) {
            currentY = maxTop;
            ul.style.top = maxTop + 'px';
            //添加一个过渡效果
            ul.style.transition = 'top 0.5s';
            // 每次重置top值得时候应该也要把currentY重置
        } else if ((currentY + countY) < minTop) {
            currentY = minTop;
            ul.style.top = minTop + 'px';
            ul.style.transition = 'top 0.5s';
        } else {
            //每次移动的距离都累加起来就不会跳到第一个上面去
            currentY += countY;
        }
    })
    for (var i = 0; i < lis.length; i++) {
        //偏移事件先把li的索引设置好
        //这样容易在浏览器修改，可以设置一个内置的属性
        // lis[i].setAttribute("index", i);
        lis[i].index = i;
    }
    //添加tap点击事件
    // touch.tap(ul, function(e) {
    //     // 1.清除其他li的样式，让当前li添加样式
    //     for (var i = 0; i < lis.length; i++) {
    //         lis[i].classList.remove("current");
    //     }
    //     //e.target获取的是当前点击的子元素
    //     var li = e.target.parentNode;
    //     //获取当前li的高度
    //     var liHeight = li.offsetHeight;
    //     // console.log(liHeight);
    //     var index = li.index;
    //     li.classList.add("current");
    //     ul.style.transition = 'top 0.5s';
    //     // 如果小于最小值
    //     if (-index * liHeight < minTop) {
    //         ul.style.top = minTop + 'px';
    //         // 每次偏移都要把currentY重置
    //         currentY = minTop;
    //     }
    //     //如果大于最大值
    //     else if (-index * liHeight > maxTop) {
    //         ul.style.top = maxTop + 'px';
    //         currentY = maxTop;
    //     } else {
    //         ul.style.top = -index * liHeight + 'px';
    //     }
    // })
    $(function() {
        FastClick.attach(document.body);
    });
    ul.addEventListener("click", function(e) {
        // 1.清除其他li的样式，让当前li添加样式
        for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove("current");
        }
        //e.target获取的是当前点击的子元素
        var li = e.target.parentNode;
        //获取当前li的高度
        var liHeight = li.offsetHeight;
        // console.log(liHeight);
        var index = li.index;
        li.classList.add("current");
        ul.style.transition = 'top 0.5s';
        // 如果小于最小值
        if (-index * liHeight < minTop) {
            ul.style.top = minTop + 'px';
            // 每次偏移都要把currentY重置
            currentY = minTop;
        }
        //如果大于最大值
        else if (-index * liHeight > maxTop) {
            ul.style.top = maxTop + 'px';
            currentY = maxTop;
        } else {
            ul.style.top = -index * liHeight + 'px';
        }
    })
}