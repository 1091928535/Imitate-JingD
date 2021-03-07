var touch = {
    tap: function(ele, callBack) {
        {
            // 判断用户是否传入对象
            if (!ele || typeof ele != "object") {
                return;
            }
            var startTime, startX, startY;
            ele.addEventListener("touchstart", function(e) {
                // 如果长度大于1说明不止一个手指，就不是单击操作
                if (e.targetTouches.length > 1) {
                    return;
                }
                //记录当前手指触摸的事件
                startTime = Date.now();
                //记录当前手指的坐标
                startX = e.targetTouches[0].clientX;
                startY = e.targetTouches[0].clientY;
            })

            ele.addEventListener("touchend", function(e) {
                // 如果长度大于1说明不止一个手指，就不是单击操作
                //这里结束后就没有手指了，不能用targettouches，可以用change
                if (e.changedTouches.length > 1) {
                    return;
                }
                // 结束后的时间和点击前的时间，判断是否为长按操作
                var endTime = Date.now() - startTime;
                if (endTime > 300) {
                    return;
                }
                //结束时坐标的差异，不大于6px
                var endX = e.changedTouches[0].clientX;
                var endY = e.changedTouches[0].clientY;
                if (Math.abs(endX - startX) < 6 || Math.abs(endY - startY) < 6) {
                    console.log("这才是点击事件！");
                    //判断用户是否传入回调函数,要写到最后判断条件里面，因为这个才是点击事件
                    //callBack(e)相当于touchend回调函数里面的e
                    callBack && callBack(e);
                }
            })
        }
    }
}