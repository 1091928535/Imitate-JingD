window.onload = function() {
    //动态添加小圆点
    var bannerUl = document.querySelector('.jd_bannerImg');
    var bannerLi = bannerUl.querySelectorAll('li');
    var bannerOl = document.querySelector('.jd_banner_icon');
    for (var i = 0; i < bannerLi.length; i++) {
        var lis = document.createElement('li');
        bannerOl.appendChild(lis);
    }
    bannerOl.children[0].className = 'current';

    //添加头部效果
    var search = document.querySelector('.jd_search');
    var banner = document.querySelector('.jd_banner');
    var bannerHeight = banner.offsetHeight;

    window.onscroll = function() {
        var scroll = window.scrollY;
        var opacity = scroll / bannerHeight;
        if (scroll < bannerHeight) {
            search.style.backgroundColor = 'rgba(255,0,0,' + opacity + ')'
        }
    }

    // 1.先获取span标签和秒杀时间
    var countdown1 = document.querySelector('.countdown1');
    var countdown2 = document.querySelector('.countdown2');
    var countdown3 = document.querySelector('.countdown3');
    //console.log(+countdownTime)和console.log(countdownTime.getTime)返回的值一样
    var countdownTime = +new Date('2021-11-28 20:00:00');
    //创建定时器之前需要先调用定时器里面的函数一次，避免刚打开页面是的00：00:00
    jdSkillSet();
    // 2.在创建当前时间，并创建定时器
    setInterval(jdSkillSet, 1000);

    function jdSkillSet() {
        var newTime = +new Date();
        // 用秒杀时间毫秒减去当前时间毫秒等于总时间，然后除以1000，等于总秒数
        var times = (countdownTime - newTime) / 1000;
        //除以3600等于总小时数在取余24，等于还剩多少小时，返回的是有小数的，要取整
        //用parseInt比较好
        var h = parseInt(times / 3600 % 24);
        h = h < 10 ? '0' + h : h;
        countdown1.innerHTML = h;
        //不能直接把表达式放在innerHTML里面 
        // countdown1.innerHTML = h < 10 ? '0' + h : h;
        var m = parseInt(times / 60 % 60);
        m = m < 10 ? '0' + m : m;
        countdown2.innerHTML = m;
        var s = parseInt(times % 60);
        s = s < 10 ? '0' + s : s;
        countdown3.innerHTML = s;
    }

    //动态添加图片
    //1.先获取先要添加的ul,前后小li
    var jd_bannerUl = document.querySelector('.jd_bannerImg');
    var firstLi = jd_bannerUl.querySelector('li:first-of-type');
    var lastLi = jd_bannerUl.querySelector('li:last-of-type');
    //获取所有的li,把他们的数量乘以一个li的数量的宽度给ul
    var jd_banner = document.querySelector('.jd_banner');
    var jd_bannerWidth = jd_banner.offsetWidth;
    jd_bannerUl.appendChild(firstLi.cloneNode(true));
    //insertBefore(需要添加的内容,需要添加到哪个位置)
    jd_bannerUl.insertBefore(lastLi.cloneNode(true), jd_bannerUl.firstChild);

    var bannerLis = jd_bannerUl.querySelectorAll('li');
    var count = bannerLis.length;
    jd_bannerUl.style.width = jd_bannerWidth * count + 'px';
    //给每一个li设置宽
    for (var i = 0; i < count; i++) {
        bannerLis[i].style.width = jd_bannerWidth + 'px';
    }
    //给ul设置偏移值
    jd_bannerUl.style.left = -jd_bannerWidth + 'px';

    //当页面缩小时轮播图的图片会同时显示，应该当页面缩小时，li和ul一起缩小

    var index = 0;
    window.onresize = function() {
        //每次拉动窗口时就清除定时器，在调用一次定时器
        jd_bannerUl = document.querySelector('.jd_bannerImg');
        var firstLi = jd_bannerUl.querySelector('li:first-of-type');
        var lastLi = jd_bannerUl.querySelector('li:last-of-type');
        //获取所有的li,把他们的数量乘以一个li的数量的宽度给ul
        jd_banner = document.querySelector('.jd_banner');
        jd_bannerWidth = jd_banner.offsetWidth;
        // jd_bannerUl.appendChild(firstLi.cloneNode(true));
        // //insertBefore(需要添加的内容,需要添加到哪个位置)
        // jd_bannerUl.insertBefore(lastLi.cloneNode(true), jd_bannerUl.firstChild);

        bannerLis = jd_bannerUl.querySelectorAll('li');
        count = bannerLis.length;
        jd_bannerUl.style.width = jd_bannerWidth * count + 'px';
        //给每一个li设置宽
        for (var i = 0; i < count; i++) {
            bannerLis[i].style.width = jd_bannerWidth + 'px';
        }
        //给ul设置偏移值
        //当屏幕缩放时，需要把index的值也获取，然后偏移
        jd_bannerUl.style.left = -index * jd_bannerWidth + 'px';

    }
    var jd_bannerUl = document.querySelector('.jd_bannerImg');
    //获取所有的li,把他们的数量乘以一个li的数量的宽度给ul
    var jd_banner = document.querySelector('.jd_banner');
    var jd_bannerWidth = jd_banner.offsetWidth;
    var bannerLis = jd_bannerUl.querySelectorAll('li');
    jd_banner_icon = document.querySelector('.jd_banner_icon');
    jd_banner_icon_lis = jd_banner_icon.querySelectorAll('li');
    // console.log(jd_banner_icon_lis);
    var count = bannerLis.length;
    // console.log(count);

    var timer;

    function timerID() {
        timer = setInterval(function() {
            index++;
            jd_bannerUl.style.transition = 'left 0.5s ease-in-out';
            //还可以用transform：translateX可以不加定位
            // jd_bannerUl.style.transform = 'translateX(' + -index * jd_bannerWidth + 'px)';
            jd_bannerUl.style.left = -index * jd_bannerWidth - jd_bannerWidth + 'px';
            // 跳到第一张是太生硬，可以加个延时

            setTimeout(function() {
                if (index == count - 2) {
                    index = 0;
                    //当这个判断执行后，图片还是有动画缓慢跳，可以把动画清除
                    jd_bannerUl.style.transition = 'none';
                    // jd_bannerUl.style.transform = 'translateX(' + -index * jd_bannerWidth + 'px)';

                    jd_bannerUl.style.left = -index * jd_bannerWidth - jd_bannerWidth + 'px';
                }
            }, 500);
        }, 2000);
    }
    timerID();

    var startX, moveX, slideX;
    // 快速移动会出现bug，需要设置一个节流阀
    var isEnd = true;
    jd_bannerUl.addEventListener('touchstart', function(e) {
        // 这里直接清理， 不执行， 因为ul没有宽高，子元素浮动撑不起盒子应该去除
        clearInterval(timer);
        //获取手指的值
        startX = e.targetTouches[0].clientX;
    });
    jd_bannerUl.addEventListener('touchmove', function(e) {
        if (isEnd == true) {
            moveX = e.targetTouches[0].clientX;
            slideX = startX - moveX;
            jd_bannerUl.style.transition = 'none';
            jd_bannerUl.style.left = (-index * jd_bannerWidth - jd_bannerWidth - slideX) + 'px';
        }

    });
    jd_bannerUl.addEventListener('touchend', function() {
        isEnd = false;
        // 这里slidex设置节流阀后， 每次移动slideX都一样， 不管前移后移，所以必须每次移动后让他们的值初始化
        if (Math.abs(slideX) > 100) {
            if (slideX > 0) {
                index++;
            } else {
                index--;
            }
            jd_bannerUl.style.transition = 'left 0.5s ease-in-out';
            jd_bannerUl.style.left = (-index * jd_bannerWidth - jd_bannerWidth) + 'px';
        } else if (Math.abs(slideX) < 100) {
            jd_bannerUl.style.transition = 'left 0.5s ease-in-out';
            jd_bannerUl.style.left = (-index * jd_bannerWidth - jd_bannerWidth) + 'px';
        }
        startX = 0;
        moveX = 0;
        slideX = 0;
    });
    jd_bannerUl.addEventListener('webkitTransitionEnd', function() {
        if (index >= count - 2) {
            index = 0;
            // 根据最新的索引值移动
            //当这个判断执行后，图片还是有动画缓慢跳，可以把动画清除
            jd_bannerUl.style.transition = 'none';
            // jd_bannerUl.style.transform = 'translateX(' + -index * jd_bannerWidth + 'px)';

            jd_bannerUl.style.left = -index * jd_bannerWidth - jd_bannerWidth + 'px';
        } else if (index < 0) {
            index = count - 3;
            // 根据最新的索引值移动
            //当这个判断执行后，图片还是有动画缓慢跳，可以把动画清除
            jd_bannerUl.style.transition = 'none';
            // jd_bannerUl.style.transform = 'translateX(' + -index * jd_bannerWidth + 'px)';

            jd_bannerUl.style.left = -index * jd_bannerWidth - jd_bannerWidth + 'px';
        }
        // 在过渡事件结束后把节流阀打开
        // 可以设置多少秒后打开
        setTimeout(function() {
            isEnd = true;
            clearInterval(timer);
            timerID();
        }, 500);
        // //让小圆点跟着图片变化。也需要写在过渡结束里面,删除带有current类的li
        jd_banner_icon.querySelector('.current').classList.remove('current');
        jd_banner_icon.children[index].classList.add('current');

        // jd_banner_icon.querySelector('.current').classList.remove('current');
        // jd_banner_icon_lis[index].classList.add('current');
    });

}









// *******************
// window.onload = function() {
//     //动态添加小圆点
//     addLi();
//     searchFixed();
//     jdSkill();
//     bannerShuffling();
//     setTime();
// }

// // 动态添加小li
// function addLi() {
//     var bannerUl = document.querySelector('.jd_bannerImg');
//     var bannerLi = bannerUl.querySelectorAll('li');
//     var bannerOl = document.querySelector('.jd_banner_icon');
//     for (var i = 0; i < bannerLi.length; i++) {
//         var lis = document.createElement('li');
//         bannerOl.appendChild(lis);
//     }
//     bannerOl.children[0].className = 'current';

// }

// // 头部搜索框
// function searchFixed() {
//     //添加头部效果
//     var search = document.querySelector('.jd_search');
//     var banner = document.querySelector('.jd_banner');
//     var bannerHeight = banner.offsetHeight;

//     window.onscroll = function() {
//         var scroll = window.scrollY;
//         var opacity = scroll / bannerHeight;
//         if (scroll < bannerHeight) {
//             search.style.backgroundColor = 'rgba(255,0,0,' + opacity + ')'
//         }
//     }
// }

// //京东秒杀
// function jdSkill() {
//     // 1.先获取span标签和秒杀时间
//     var countdown1 = document.querySelector('.countdown1');
//     var countdown2 = document.querySelector('.countdown2');
//     var countdown3 = document.querySelector('.countdown3');
//     //console.log(+countdownTime)和console.log(countdownTime.getTime)返回的值一样
//     var countdownTime = +new Date('2020-11-28 20:00:00');
//     //创建定时器之前需要先调用定时器里面的函数一次，避免刚打开页面是的00：00:00
//     jdSkillSet();
//     // 2.在创建当前时间，并创建定时器
//     setInterval(jdSkillSet, 1000);

//     function jdSkillSet() {
//         var newTime = +new Date();
//         // 用秒杀时间毫秒减去当前时间毫秒等于总时间，然后除以1000，等于总秒数
//         var times = (countdownTime - newTime) / 1000;
//         //除以3600等于总小时数在取余24，等于还剩多少小时，返回的是有小数的，要取整
//         //用parseInt比较好
//         var h = parseInt(times / 3600 % 24);
//         h = h < 10 ? '0' + h : h;
//         countdown1.innerHTML = h;
//         //不能直接把表达式放在innerHTML里面 
//         // countdown1.innerHTML = h < 10 ? '0' + h : h;
//         var m = parseInt(times / 60 % 60);
//         m = m < 10 ? '0' + m : m;
//         countdown2.innerHTML = m;
//         var s = parseInt(times % 60);
//         s = s < 10 ? '0' + s : s;
//         countdown3.innerHTML = s;
//     }
// }

// // 轮播图
// function bannerShuffling() {
//     //动态添加图片
//     //1.先获取先要添加的ul,前后小li
//     var jd_bannerUl = document.querySelector('.jd_bannerImg');
//     var firstLi = jd_bannerUl.querySelector('li:first-of-type');
//     var lastLi = jd_bannerUl.querySelector('li:last-of-type');
//     //获取所有的li,把他们的数量乘以一个li的数量的宽度给ul
//     var jd_banner = document.querySelector('.jd_banner');
//     var jd_bannerWidth = jd_banner.offsetWidth;
//     jd_bannerUl.appendChild(firstLi.cloneNode(true));
//     //insertBefore(需要添加的内容,需要添加到哪个位置)
//     jd_bannerUl.insertBefore(lastLi.cloneNode(true), jd_bannerUl.firstChild);

//     var bannerLis = jd_bannerUl.querySelectorAll('li');
//     var count = bannerLis.length;
//     jd_bannerUl.style.width = jd_bannerWidth * count + 'px';
//     //给每一个li设置宽
//     for (var i = 0; i < count; i++) {
//         bannerLis[i].style.width = jd_bannerWidth + 'px';
//     }
//     //给ul设置偏移值
//     jd_bannerUl.style.left = -jd_bannerWidth + 'px';
// }
// //当页面缩小时轮播图的图片会同时显示，应该当页面缩小时，li和ul一起缩小
// var index = 0;
// window.onresize = function() {
//     //每次拉动窗口时就清除定时器，在调用一次定时器
//     jd_bannerUl = document.querySelector('.jd_bannerImg');
//     var firstLi = jd_bannerUl.querySelector('li:first-of-type');
//     var lastLi = jd_bannerUl.querySelector('li:last-of-type');
//     //获取所有的li,把他们的数量乘以一个li的数量的宽度给ul
//     jd_banner = document.querySelector('.jd_banner');
//     jd_bannerWidth = jd_banner.offsetWidth;
//     // jd_bannerUl.appendChild(firstLi.cloneNode(true));
//     // //insertBefore(需要添加的内容,需要添加到哪个位置)
//     // jd_bannerUl.insertBefore(lastLi.cloneNode(true), jd_bannerUl.firstChild);

//     bannerLis = jd_bannerUl.querySelectorAll('li');
//     count = bannerLis.length;
//     jd_bannerUl.style.width = jd_bannerWidth * count + 'px';
//     //给每一个li设置宽
//     for (var i = 0; i < count; i++) {
//         bannerLis[i].style.width = jd_bannerWidth + 'px';
//     }
//     //给ul设置偏移值
//     //当屏幕缩放时，需要把index的值也获取，然后偏移
//     jd_bannerUl.style.left = -index * jd_bannerWidth + 'px';

// }

// function setTime() {
//     var jd_bannerUl = document.querySelector('.jd_bannerImg');
//     var firstLi = jd_bannerUl.querySelector('li:first-of-type');
//     var lastLi = jd_bannerUl.querySelector('li:last-of-type');
//     //获取所有的li,把他们的数量乘以一个li的数量的宽度给ul
//     var jd_banner = document.querySelector('.jd_banner');
//     var jd_bannerWidth = jd_banner.offsetWidth;
//     var bannerLis = jd_bannerUl.querySelectorAll('li');
//     jd_banner_icon = document.querySelector('.jd_banner_icon');
//     jd_banner_icon_lis = jd_banner_icon.querySelectorAll('li');
//     // console.log(jd_banner_icon_lis);
//     var count = bannerLis.length;
//     // console.log(count);
//     timer = setInterval(function() {
//         index++;
//         var x = -index * jd_bannerWidth;
//         jd_bannerUl.style.transition = 'all 0.5s ease-in-out';
//         //还可以用transform：translateX可以不加定位
//         // jd_bannerUl.style.transform = 'translateX(' + -index * jd_bannerWidth + 'px)';
//         jd_bannerUl.style.transform = 'translateX(' + x + 'px)';
//         // 跳到第一张是太生硬，可以加个延时

//         // setTimeout(() => {
//         //     if (index == count - 1) {
//         //         index = 1;
//         //         //当这个判断执行后，图片还是有动画缓慢跳，可以把动画清除
//         //         jd_bannerUl.style.transition = 'none';
//         //         // jd_bannerUl.style.transform = 'translateX(' + -index * jd_bannerWidth + 'px)';

//         //         jd_bannerUl.style.left = -index * jd_bannerWidth + 'px';
//         //     }
//         // }, 500);
//     }, 2000);

//     jd_bannerUl.addEventListener('transitionend', function() {
//         // 这里第八张就是最后一张
//         if (index >= count - 2) {
//             index = 0;
//             //要根据最先的x值创建动画
//             var x = -index * jd_bannerWidth;
//             //当这个判断执行后，图片还是有动画缓慢跳，可以把动画清除
//             jd_bannerUl.style.transition = 'none';
//             // jd_bannerUl.style.transform = 'translateX(' + -index * jd_bannerWidth + 'px)';

//             jd_bannerUl.style.transform = 'translateX(' + x + 'px)';

//         } else if (index < 0) {
//             index = count - 3;
//             var x = -index * jd_bannerWidth;
//             //当这个判断执行后，图片还是有动画缓慢跳，可以把动画清除
//             jd_bannerUl.style.transition = 'none';
//             // jd_bannerUl.style.transform = 'translateX(' + -index * jd_bannerWidth + 'px)';

//             jd_bannerUl.style.transform = 'translateX(' + x + 'px)';
//         }
//         //让小圆点跟着图片变化。也需要写在过渡结束里面,删除带有current类的li
//         jd_banner_icon.querySelector('.current').classList.remove('current');
//         jd_banner_icon.children[index].classList.add('current');

//         // jd_banner_icon.querySelector('.current').classList.remove('current');
//         // jd_banner_icon_lis[index].classList.add('current');
//     })

//     //轮播图滑动效果
//     //1.当手指开始滑动时获取手指初始位置
//     var startX = 0;
//     var moveX = 0;
//     var slideX = 0;
//     //每次如果没有拖动就不用执行拖动代码
//     var flag = false;
//     jd_bannerUl.addEventListener('touchstart', function(e) {
//         startX = e.targetTouches[0].pageX;
//         //每次手指触摸是需要停止定时器
//         clearInterval(timer);
//     })

//     //2.获取手指移动的距离,并移动
//     jd_bannerUl.addEventListener('touchmove', function(e) {
//         flag = true;
//         moveX = e.targetTouches[0].pageX - startX;
//         slideX = -index * jd_bannerWidth + moveX;
//         //手指滑动时不需要有过渡效果所以需要清除
//         jd_bannerUl.style.transition = 'none';
//         jd_bannerUl.style.transform = 'translateX(' + slideX + 'px)';
//     })

//     //3.当移动距离小于50时做回弹效果
//     jd_bannerUl.addEventListener('touchend', function() {
//         //moveX需要加绝对值，因为右移会产生负值
//         if (flag) {
//             if (Math.abs(moveX) > 100) {
//                 //判断这个值是负数还是正数，index--或index++
//                 if (moveX > 0) {
//                     index--;
//                 } else {
//                     index++;
//                 }
//                 //判断结束后把index值给transform
//                 var x = -index * jd_bannerWidth;
//                 jd_bannerUl.style.transition = 'all 0.5s ease-in-out';
//                 jd_bannerUl.style.transform = 'translateX(' + x + 'px)';
//             } else if (Math.abs(moveX) < 100) {
//                 var x = -index * jd_bannerWidth;
//                 jd_bannerUl.style.transition = 'all 0.5s ease-in-out';
//                 jd_bannerUl.style.transform = 'translateX(' + x + 'px)';
//             }
//             // 移动完后清理上一次的定时器并开启定时器
//             clearInterval(timer);
//             timer = setInterval(function() {
//                 index++;
//                 var x = -index * jd_bannerWidth;
//                 jd_bannerUl.style.transition = 'all 0.5s ease-in-out';
//                 //还可以用transform：translateX可以不加定位
//                 // jd_bannerUl.style.transform = 'translateX(' + -index * jd_bannerWidth + 'px)';
//                 jd_bannerUl.style.transform = 'translateX(' + x + 'px)';
//                 // 跳到第一张是太生硬，可以加个延时

//                 // setTimeout(() => {
//                 //     if (index == count - 1) {
//                 //         index = 1;
//                 //         //当这个判断执行后，图片还是有动画缓慢跳，可以把动画清除
//                 //         jd_bannerUl.style.transition = 'none';
//                 //         // jd_bannerUl.style.transform = 'translateX(' + -index * jd_bannerWidth + 'px)';

//                 //         jd_bannerUl.style.left = -index * jd_bannerWidth + 'px';
//                 //     }
//                 // }, 500);
//             }, 2000);
//         }
//     })
// }