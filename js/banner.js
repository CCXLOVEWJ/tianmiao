window.onload = function () {
    /**
     * 轮播图
     * @type {Element}
     */
    //获取事件源
    var inner = document.getElementsByClassName('inner')[0];
    var ul = inner.firstElementChild || inner.firstChild;
    var liArr = inner.children[0].children;
    var ol = inner.children[1];
    var arrow = inner.children[2];
    var arrowLR = arrow.children;
    var imgWidth = inner.offsetWidth

    //在原本的ul后新增一个li,l新增的li与第一个li完全相同
    var newLi = liArr[0].cloneNode(true);
    ul.appendChild(newLi);
    //在ol中添加li,存放底部轮播数字
    for (var i = 0; i < ul.children.length-1; i++) {    //上边新增了一个li,此处需要减一
        var olNewLi = document.createElement('li');
        olNewLi.innerHTML = i+1;
        ol.appendChild(olNewLi);
    }
    //获取新增的ol中所有li元素
    var olLiArr = ol.children;
    olLiArr.className = "current";
    //为新增的li添加鼠标滑动效果
    for (var i = 0; i < olLiArr.length; i++) {
        olLiArr[i].index = i;
        olLiArr[i].onmouseover = function () {
            for (var j = 0; j < olLiArr.length; j++) {
                olLiArr[j].className = "";
            }
            imgNum = squareNum = this.index;    //图片索引和小数字索引记录的不一致会导致暂停后图片继续从上一次的位置轮播
            this.className = "current";
            slow(ul,-this.index * imgWidth);
        }
    }

    //1.添加定时器,让图片自动轮播
    var timer = null;
    clearInterval(timer);
    timer = setInterval(autoPlay,3000);
    //2.图片和底下数字都需要绑定一个计数器,使各自的索引值等于计数器
    var imgNum = 0;
    var squareNum = 0;
    function autoPlay() {
        imgNum++;
        if (imgNum > olLiArr.length) {
            ul.style.left = 0;
            imgNum = 1; //跳转到第二张
        }
        slow(ul,-imgNum*imgWidth);
        squareNum++;
        //4.判断,当squareNum大于li数组就回到第一个的位置
        if (squareNum > olLiArr.length-1) {
            squareNum = 0;
        }
        //3.排他思想,自动轮播小数字
        for (var i = 0; i < olLiArr.length; i++) {
            olLiArr[i].className = "";
        }
        olLiArr[squareNum].className = "current";
    }


    inner.onmouseover = function () {
        arrow.style.display = "block";
        clearInterval(timer);
    }
    inner.onmouseout = function () {
        arrow.style.display = "none";
        timer = setInterval(autoPlay,3000);
    }

    arrowLR[0].onclick = function () {
        imgNum--;
        if (imgNum < 0) {
            ul.style.left = -imgWidth * (olLiArr.length) + "px";  //ul左移四张图片的大小,显示第五张
            imgNum = olLiArr.length-1; //图片是第五张
        }
        slow(ul,-imgNum*imgWidth);
        squareNum--;
        if (squareNum < 0) {
            squareNum = olLiArr.length-1;
        }
        //3.排他思想,自动轮播小数字
        for (var i = 0; i < olLiArr.length; i++) {
            olLiArr[i].className = "";
        }
        olLiArr[squareNum].className = "current";
    }
    arrowLR[1].onclick = function () {
        autoPlay();
    }



    function uniform(ele,target) {
        clearInterval(ele.timer);
        var speed = (target > ele.offsetLeft) ? 10 : -10;
        ele.timer = setInterval(function() {
            var val = target - ele.offsetLeft;
            ele.style.left = ele.offsetLeft + speed + "px";
            if (Math.abs(val) <= Math.abs(speed)) {
                ele.style.left = target + "px";
                clearInterval(ele.timer);
            }
        },10);
    }
    function slow(ele,target) {
        clearInterval(ele.timer);   //使用前先清除定时器
        ele.timer = setInterval(function () {
            var speed = (target - ele.offsetLeft) / 10;        //距离目标位置越近,步长越来越小
            speed = target > ele.offsetLeft ? Math.ceil(speed) : Math.floor(speed);
            ele.style.left = ele.offsetLeft + speed + "px"; //缓动动画的本质,盒子目标的位置=当前位置+步长
            if (Math.abs(target-ele.offsetLeft) < Math.abs(speed)) {
                ele.style.left = target + "px";
                clearInterval(ele.timer);
            }
        },30);
    }

    /**
     * 关闭顶部广告栏
     * @type {Element}
     */
    var header = document.getElementsByClassName('header-top')[0];
    var ad = document.getElementsByClassName('advertisement')[0];
    var close_top_ad = ad.children[1].firstElementChild || ad.children[1].firstChild;

    close_top_ad.onclick = function () {
        //设置定时器
        timer = setInterval(function() {
            ad.style.opacity -= 0.1;
            //透明度为0后,隐藏广告栏,清除定时器
            if (ad.style.opacity <= 0) {
                header.style.display = "none";
                clearInterval(timer);
            }
        },50);
    }


    /**
     * 搜索框
     * @type {Element}
     */
    var search = document.getElementsByClassName('search')[0];
    var search_ipt = search.children[0];
    //2.绑定事件
    search_ipt.onfocus = function () {
        if (this.value === "满300立减30") {
            this.value = "";
        }
    }
    search_ipt.onblur = function () {
        if (this.value === "") {
            this.value = "满300立减30";
        }
    }

    /**
     * tab栏
     * @type {Element}
     */
    // $(".tab-main-inner").hide();
    // $("ul.tab li:first").addClass("active").show();
    // $(".tab-main-inner:first").show();
    // $(".tab li").mouseenter(function () {
    //     $("ul.tab li").removeClass("active");
    //     $(this).addClass("active");
    //     $(".tab-main-inner").hide();
    //     $(".tab-main-inner").fadeIn();
    //     return false;
    // })
    tabs(".tab", "current", ".tab-main");
    function tabs(tab_header, on, tab_content) {
        $(tab_header).children().hover(function () {
            $(this).addClass(on).siblings().removeClass(on);
            var index = $(tab_header).children().index(this);
            $(tab_content).children().eq(index).show().siblings().hide();
        });
    };

    /**
     * 回到顶部
     */
    $(".to-top").click(function () {
        $("html").animate({scrollTop:0},500);
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $(".search").addClass("search-fixed");
        }else {
            $(".search").removeClass("search-fixed");
        }
    });
}