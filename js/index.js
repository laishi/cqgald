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

    console.log("svgMaxHeight: " + svgMaxHeight)





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


        console.log("svgMaxHeight: " + svgMaxHeight)




        if (scrollPos >= 0 && scrollPos < window.innerHeight) {


            sliderScrollHeight = parseInt(curve.getAttribute("d").split(" ")[5]);

            var svgHeight = parseInt(curve.getAttribute("d").split(" ")[2]); //479

            console.log("svgScrollH: " + svgScrollH);


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


            console.log("svgHeight: " + curveValue)




            // var headerHeight = curve.getBoundingClientRect().height;

            // console.log("headerHeight: " + headerHeight)

            // if (headerHeight < 1) {

            //     headerHeight = curve.getClientRects().height;

            // }



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

});