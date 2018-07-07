(function() {




    // Variables
    var curve = document.getElementById("clipPathBg");
    var clipPathBg = document.getElementById("clipPathBg");
    var imgClip = document.getElementById("imgClip");
    var navCurve = document.getElementById("navCurve");


    var svgBG = document.getElementById("svgBG");
    var svgNav = document.getElementById("svgNav");
    var sliderText = document.getElementById("sliderText");

    var $path = document.getElementsByClassName("path");
    var navItem = document.getElementsByClassName("navItem");
    var galdLogo = document.getElementById("galdLogo");

    // var svgBg = document.getElementById("svgBg");




    var last_known_scroll_position = 0;
    var defaultCurveValue = 1000;
    var curveRate = 1.5;
    var ticking = false;
    var curveValue;

    var rate = 1.5;

    var sliderScrollHeight;








    function getOffset(element) {
        var bound = element.getBoundingClientRect();
        var html = document.documentElement;
        return {
            top: bound.top + window.pageYOffset - html.clientTop,
            left: bound.left + window.pageXOffset - html.clientLeft
        };
    }











    // INIT SVG viewbox="0 0 1920 920"

    var fixHeaderHeight = 150;

    var windowW = window.innerWidth;
    var windowHS = windowW / 2;
    var svgBaseHeight = window.innerHeight / rate;

    if (window.innerWidth > window.innerHeight) {
        var changeCurver = 250;
    } else {
        changeCurver = 150;
    }


    var svgMaxHeight = svgBaseHeight + changeCurver;






    function initSvg() {
        svgBG.setAttribute('viewBox', "0 0" + " " + windowW + " " + svgMaxHeight);
        svgNav.setAttribute('viewBox', "0 0" + " " + windowW + " " + svgMaxHeight);
        navCurve.setAttribute(
            "d",
            "M 0 " + svgBaseHeight + " Q " + windowHS + " " + svgMaxHeight + " " + windowW + " " + svgBaseHeight
        );

        sliderText.setAttribute(
            "d",
            "M 0 " + (svgBaseHeight - 100) + " Q " + windowHS + " " + (svgMaxHeight - 100) + " " + windowW + " " + (svgBaseHeight - 100)
        );

        curve.setAttribute(
            "d",
            "M 0 " + svgBaseHeight + " Q " + windowHS + " " + svgMaxHeight + " " + windowW + " " + svgBaseHeight + " V 0 H 0 Z"
        );
        TweenMax.to($(".sliders"), 1, { height: svgMaxHeight });
    }


    initSvg()









    TweenMax.set($(".sliders"), { height: curveValue - 200 });



    window.addEventListener('resize', function(event) {

        windowW = window.innerWidth;
        windowHS = windowW / 2;
        svgBaseHeight = window.innerHeight / rate;

        svgMaxHeight = svgBaseHeight + changeCurver;


        initSvg()

        if (window.width >= 1024) {
            var n = $(".flowBox").length; // Div count
            var OW = 38; // Div over width
            TweenMax.set($(".flowBox"), { width: 100 / n + '%' });

        }



        // headerHeight = curve.getBoundingClientRect().height;

    });






    var svgScrollH = parseInt(curve.getAttribute("d").split(" ")[5]);




    function scrollEvent(scrollPos) {




        var bgpos = scrollPos * 1.5;

        var bgopacity = scrollPos / 600;

        if (bgpos > 600) {

            bgpos = 600;

        }


        var bgopacity = bgpos / 600;



        $(".bgcont").css("top", bgpos + "px");
        $(".bgcont").css("opacity", bgopacity);





        TweenMax.to(".navHome", 3, { attr: { keyPoints: '0.33;0.33' }, ease: Elastic.easeOut.config(1, 0.3), y: -500 });
        TweenMax.to(".navTeam", 3, { attr: { keyPoints: '0.41;0.41' }, ease: Elastic.easeOut.config(1, 0.3), y: -500 });
        TweenMax.to(".navWork", 3, { attr: { keyPoints: '0.59;0.59' }, ease: Elastic.easeOut.config(1, 0.3), y: -500 });
        TweenMax.to(".navContact", 3, { attr: { keyPoints: '0.67;0.67' }, ease: Elastic.easeOut.config(1, 0.3), y: -500 });






        if (scrollPos >= 0 && scrollPos < window.innerHeight) {


            sliderScrollHeight = parseInt(curve.getAttribute("d").split(" ")[5]);

            var svgHeight = parseInt(curve.getAttribute("d").split(" ")[2]); //479



            curveValue = svgScrollH - parseFloat(scrollPos * curveRate);



            curve.setAttribute(
                "d",
                "M 0 " + svgHeight + " Q " + windowHS + " " + curveValue + " " + windowW + " " + svgHeight + " V 0 H 0 Z"
            );

            navCurve.setAttribute(
                "d",
                "M 0 " + svgHeight + " Q " + windowHS + " " + curveValue + " " + windowW + " " + svgHeight
            );

            // curve.setAttribute(
            //     "d",
            //     "M 0 " + svgHeight + " Q 960 " + curveValue + " 1920 " + svgHeight + " V 0 H 0 Z"
            // );


            var textHeight = svgHeight - 200;
            var fixtext = curveValue - 200;




            sliderText.setAttribute(
                "d",
                "M 0 " + svgHeight + " Q " + windowHS + " " + fixtext + " " + windowW + " " + svgHeight
            );


            var logoPath = "path('M 0,700 Q 960 " + curveValue + " 1920 700')";


            TweenMax.to($(".sliders"), 1, { height: curveValue });


        }
    }




    window.addEventListener("scroll", function(e) {
        last_known_scroll_position = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(function() {
                scrollEvent(last_known_scroll_position);
                ticking = false;
            });
        }

        ticking = true;
    });
})();








$(document).ready(function() {





    $('.navHomeGroup').hover(navHomeGroupIn, showGald);

    function navHomeGroupIn() {
        console.log($('this'));
        console.log($('.curveText')[0].innerHTML = '回 到 首 页')

    }

    $('.navTeamGroup').hover(navTeamGroupIn, showGald);

    function navTeamGroupIn() {
        console.log($('.curveText')[0].innerHTML = '优秀的团队 确保您的设计出彩')

    }

    $('.navWorkGroup').hover(navWorkGroupIn, showGald);

    function navWorkGroupIn() {
        console.log($('.curveText')[0].innerHTML = '工作案例展示')

    }

    $('.navContactGroup').hover(navContactGroupIn, showGald);

    function navContactGroupIn() {
        console.log($('.curveText')[0].innerHTML = 'Phone: 13640566324  Email:504677424@qq.com')

    }


    function showGald() {
        console.log($('.curveText')[0].innerHTML = ' 光 爱 照 明 设 计')
    }





    $('.galdLogo').hover(handlerIn, handlerOut);

    function handlerIn() {
        TweenMax.to(".navHome", 2, { attr: { keyPoints: '0.388;0.388' }, ease: Elastic.easeOut.config(1.3, 0.3), y: -500 });
        TweenMax.to(".navTeam", 2, { attr: { keyPoints: '0.44;0.44' }, ease: Elastic.easeOut.config(1.3, 0.3), y: -500 });
        TweenMax.to(".navWork", 2, { attr: { keyPoints: '0.56;0.56' }, ease: Elastic.easeOut.config(1.3, 0.3), y: -500 });
        TweenMax.to(".navContact", 2, { attr: { keyPoints: '0.612;0.612' }, ease: Elastic.easeOut.config(1.3, 0.3), y: -500 });
    }


    function handlerOut() {
        // TweenMax.to(".navHome", 1, {attr:{keyPoints:'0.33;0.33'},ease: Elastic.easeOut.config(1.3, 0.3), y: -500});
        // TweenMax.to(".navTeam", 1, {attr:{keyPoints:'0.41;0.41'},ease: Elastic.easeOut.config(1.3, 0.3), y: -500});
    }

























    //创建和初始化地图函数：
    function initMap() {
        createMap(); //创建地图
        setMapEvent(); //设置地图事件
        addMapControl(); //向地图添加控件
        addMarker(); //向地图中添加marker
    }

    //创建地图函数：
    function createMap() {
        var map = new BMap.Map("dituContent"); //在百度地图容器中创建一个地图
        var point = new BMap.Point(106.523946, 29.543257); //定义一个中心点坐标
        map.centerAndZoom(point, 17); //设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map; //将map变量存储在全局
    }

    //地图事件设置函数：
    function setMapEvent() {
        map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
        map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard(); //启用键盘上下左右键移动地图
    }

    //地图控件添加函数：
    function addMapControl() {
        //向地图中添加缩放控件
        var ctrl_nav = new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_RIGHT,
            type: BMAP_NAVIGATION_CONTROL_LARGE
        });
        map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
        var ctrl_ove = new BMap.OverviewMapControl({
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
            isOpen: 1
        });
        map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
        var ctrl_sca = new BMap.ScaleControl({
            anchor: BMAP_ANCHOR_BOTTOM_LEFT
        });
        map.addControl(ctrl_sca);
    }

    //标注点数组
    var markerArr = [{
        title: "重庆光爱照明设计",
        content: "公司地址",
        point: "106.524153|29.543618",
        isOpen: 0,
        icon: {
            w: 21,
            h: 21,
            l: 0,
            t: 0,
            x: 6,
            lb: 5
        }
    }];
    //创建marker
    function addMarker() {
        for (var i = 0; i < markerArr.length; i++) {
            var json = markerArr[i];
            var p0 = json.point.split("|")[0];
            var p1 = json.point.split("|")[1];
            var point = new BMap.Point(p0, p1);
            var iconImg = createIcon(json.icon);
            var marker = new BMap.Marker(point, {
                icon: iconImg
            });
            var iw = createInfoWindow(i);
            var label = new BMap.Label(json.title, {
                "offset": new BMap.Size(json.icon.lb - json.icon.x + 10, -20)
            });
            marker.setLabel(label);
            map.addOverlay(marker);
            label.setStyle({
                borderColor: "#808080",
                color: "#333",
                cursor: "pointer"
            });

            (function() {
                var index = i;
                var _iw = createInfoWindow(i);
                var _marker = marker;
                _marker.addEventListener("click", function() {
                    this.openInfoWindow(_iw);
                });
                _iw.addEventListener("open", function() {
                    _marker.getLabel().hide();
                })
                _iw.addEventListener("close", function() {
                    _marker.getLabel().show();
                })
                label.addEventListener("click", function() {
                    _marker.openInfoWindow(_iw);
                })
                if (!!json.isOpen) {
                    label.hide();
                    _marker.openInfoWindow(_iw);
                }
            })()
        }
    }
    //创建InfoWindow
    function createInfoWindow(i) {
        var json = markerArr[i];
        var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>" + json.content + "</div>");
        return iw;
    }
    //创建一个Icon
    function createIcon(json) {
        var icon = new BMap.Icon("../img/icon72.png", new BMap.Size(json.w, json.h), {
            imageOffset: new BMap.Size(-json.l, -json.t),
            infoWindowOffset: new BMap.Size(json.lb + 5, 1),
            offset: new BMap.Size(json.x, json.h)
        })
        return icon;
    }

    initMap(); //创建和初始化地图


    // ICON


    //WORKFLOW

    if (window.innerWidth < 1024) {



    } else {
        /*EXPAND owlItemW INIT*/

        var n = $(".flowBox").length; // Div count
        var OW = 38; // Div over width
        TweenMax.set($(".flowBox"), { width: 100 / n + '%' });
        $(".flowBox").hover(over, out);

        function over(item, index) {
            console.log($(this).index)
            TweenMax.to($(this), 0.3, { width: OW + '%' });
            TweenMax.to($(this).find(".flowBoxTitle"), 0.3, { y: (window.innerHeight / 2 - 200) * -0.5 - 50 });
            TweenMax.to($(this).find(".flowBoxText"), 0.3, { y: -100 });
            TweenMax.to($(this).find("h3"), 0.3, { opacity: 0 });
            TweenMax.to($(this).siblings(), 0.3, { width: (100 - OW) / (n - 1) + '%' })
        }

        function out() {
            TweenMax.to($(this).find(".flowBoxTitle"), 0.3, { y: 0 });
            TweenMax.to($(this).find(".flowBoxText"), 0.3, { y: 0 });
            TweenMax.to($(this).find("h3"), 0.3, { opacity: 1 });
            TweenMax.to($(".flowBox"), 0.3, { width: 100 / n + '%', ease: Back.easeOut })
        }

    }







});


// ALL LOADED

window.onload = function() {


    $(".BMap_Marker").css("backgroundImage", "../img/icon72.png");

    $(".BMapLabel").css("width", "150px");
    $(".BMapLabel").css("height", "24px");
    $(".BMapLabel").css("fontSize", "18px");
    $(".BMapLabel").css("lineHeight", "24px");
    $(".BMapLabel").css("borderRadius", "24px");
    $(".BMapLabel").css("padding-left", "18px");
    $(".BMapLabel").css("padding-top", "5px");
    $(".BMapLabel").css("background-color", "red");
    $(".BMapLabel").css("color", "#fff");




    $(".navIcons").css("display", "block");



    if ($(".navIcons").css("display") == "block") {








        var workup = 5;


        $(function() {


            $.scrollify({
                section: ".page",
                //sectionName:false,
                scrollSpeed: 1100,
                after: function(i) {



                    if (i === 1) {
                        TweenMax.set($(".card"), {
                            display: "block"
                        });

                        TweenMax.staggerTo($(".card"), 0.3, {
                            opacity: 1
                        }, 0.1);

                        TweenMax.staggerFrom($(".card"), 1.0, {
                            ease: Elastic.easeOut.config(1, 0.3),
                            scale: 0,
                        }, 0.6);
                    } else {
                        TweenMax.set($(".card"), {
                            display: "none"
                        });
                    }

                    if (i === 2) {

                        TweenMax.set($(".flowBox"), {
                            display: "block"
                        });

                        TweenMax.staggerTo($(".flowBox"), 0.3, {
                            opacity: 1
                        }, 0.1);

                        TweenMax.staggerFrom($(".flowBox1"), 0.3, {
                            y: window.innerHeight
                        }, 0.2);


                        TweenMax.staggerFrom($(".flowBox2"), 0.3, {
                            y: -window.innerHeight
                        }, 0.2);
                    } else {
                        TweenMax.set($(".flowBox"), {
                            display: "none"
                        });
                    }


                    //Video
                    if (i === 3) {

                        TweenMax.set($(".fullsize-video-bg"), {
                            display: "block"
                        });
                        TweenMax.to($(".shutterUp"), 1.2, {
                            y: -window.innerHeight,
                        });
                        TweenMax.to($(".shutterDown"), 1.2, {
                            y: window.innerHeight,
                        });

                        // TweenMax.from($(".fullsize-video-bg"), 3.3, {
                        //     scaleY: 0
                        // });
                    } else {
                        // TweenMax.to($(".shutterUp"), 1.2, {
                        //     y: 0,
                        // });
                        // TweenMax.to($(".shutterDown"), 1.2, {
                        //     y: 0,
                        // });

                        // TweenMax.set($(".fullsize-video-bg"), {
                        //     display: "none"
                        // });
                    }

                    //Team
                    if (i === 4) {

                        TweenMax.set($(".cicleSlides li"), {
                            display: "block"
                        });
                        TweenMax.to($(".cicleSlides li"), 0.3, {
                            opacity: 1
                        });

                        TweenMax.staggerFrom($(".cicleSlides li"), 0.3, {
                            scale: 0
                        }, 0.1);

                    } else {

                        TweenMax.set($(".cicleSlides li"), {
                            display: "none"
                        });
                    }





                    if (i === 5 & workup === 5) {

                        TweenMax.to($(".gridItem"), 0.3, {
                            opacity: 1
                        });

                        TweenMax.staggerFrom($(".gridItem"), 0.3, {
                            ease: Elastic.easeOut.config(0.6, 0.5),
                            scale: 0,
                        }, 0.05);
                    } else {
                        // TweenMax.to($(".gridItem"), 0.3, {
                        //     opacity: 0
                        // });
                    }



                    if (i === 6) {

                        workup = 6
                    } else {

                        workup = 5

                    }




                }
            });

            $(".scroll,.scroll-btn").click(function(e) {
                e.preventDefault();

                $.scrollify.next();



            });


            var hasHovered = false;
            $(".coffee").on("mouseenter focus", function() {
                if (hasHovered === false) {
                    ga('send', 'event', 'Coffee', 'hover', 'Buy me a coffee');
                    hasHovered = true;
                }
            });

        });






        var caseSlider = document.querySelector('.sliderCont');
        var caseImg = caseSlider.querySelectorAll('.sliderImg');

        for (var i = 0; i < caseImg.length; i++) {
            var imgSrc = caseImg[i].style.backgroundImage.replace('small', 'large');
            console.log(imgSrc);
            caseImg[i].style.backgroundImage = imgSrc;

        }

    }


};