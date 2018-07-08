$(document).ready(function() {







    var gridItemWidth = $(".gridItem").width();
    var imageWidth = $(".gridItem").children().width();
    var imageHeight = $(".gridItemImg").height();




    // TweenMax.set($(".gridItem"), { height: imageHeight + imageHeight / 2 })
    // TweenMax.set($(".gridImg"), { height: gridItemWidth })


    var gridCicleR = $(".gridCicle").height();

    TweenMax.set($(".gridCicle"), { top: imageHeight - gridCicleR / 2, left: imageWidth - gridCicleR * 2 })



    TweenMax.set($(".gridText"), { height: imageHeight / 2 })
    TweenMax.set($(".gridText h3"), { "lineHeight": imageHeight / 2 + "px" })




    // var d = new Date();
    // var n = d.getSeconds();
    // var times = -1;

    // setInterval(function() {

    //     TweenMax.to($("img"), 0.3, { y: imageHeight * times });

    //     if (times === 0) {
    //         times = -1
    //     } else {
    //         times = 0
    //     }




    // }, Math.random(n) * 5000);





    $(".gridItemImgs").each(function(index) {
        console.log(index + ": " + $(this));



        var imgNum = $(this).children("img").length;




        console.log(imgNum);
        $(this).siblings(".gridCicle").html(imgNum)
    });





    TweenMax.set($(".gridItemImgs"), { height: imageHeight })



    $(".gridItem").hover(imgin, imgout);

    function imgin() {
        TweenMax.to($(this).find("img"), 0.3, { y: -imageHeight });
        TweenMax.to($(this).children(".gridItemImgs"), 0.3, { opacity: 1.0 });
        TweenMax.set($(this), { "background-color": "#2196f3" });
    }



    function imgout() {
        TweenMax.to($(this).find("img"), 0.3, { y: 0 });
        TweenMax.to($(this).children(".gridItemImgs"), 0.3, { opacity: 0.8 });
        TweenMax.set($(this), { "background-color": "#232322" });
    }










    var sourceGridX;
    var sourceGridY;
    var recenterX;
    var recenterY;















    $(".gridItem").click(function(index, item) {


        cg = $(this);




        var currentIndex = $(this).index();

        var WW = $(window).innerWidth();
        var WH = $(window).innerHeight();


        var fixGridW = 720;


        if (window.innerWidth < 720) {
            fixGridW = window.innerWidth - 50
        }
        var fixGridH = fixGridW * 0.58;

        var wwr = fixGridW / imageWidth;
        var whr = fixGridH / imageHeight;

        var csw = imageWidth / 720;
        var csh = imageHeight / 400;



        var gridX = $(this).offset().left;
        var gridY = $(this).offset().top;


        var pagebg = $(this).parent(".page");















        var scrollTop = $(window).scrollTop();

        var sGridW = $(this).width();
        var sGridH = $(this).height();


        var gridW = $(this).width();
        var gridH = $(this).height();


        var centerX = WW / 2 - gridX - gridW / 2;
        var centerY = scrollTop + WH / 2 - gridY - gridH / 2;




        var prevGrid = $(this).prevAll();
        var nextGrid = $(this).nextAll();

        var moveH = $(".mixGrids").height();



        var currentItem = $(this)





        if ($(this).hasClass("action")) {

            gridMove(prevGrid, WH * 1.5, "+=", Power2.easeOut);
            gridMove(nextGrid, WH * 1.5, "-=", Power2.easeOut);

            // $('.fp-scroller').off('scroll mousewheel touchmove', stopScrolling);

            $(this).removeClass("action")

            TweenMax.to($(this), 0.5, { scaleX: 1, scaleY: 1, x: 0, y: 0, ease: Power2.easeOut })
            TweenMax.to(currentItem.children(), 0.1, { scaleX: 1, scaleY: 1, ease: Power2.easeIn })




            //WAVE
            TweenMax.to($(".galdwork"), 1, { background: "#fff", ease: Power3.easeOut });
            TweenMax.to($(".waveCont"), 0.3, { opacity: 1, ease: Power3.easeIn });




        } else {






            sourceGridX = gridX;
            sourceGridY = gridY;


            recenterX = WW / 2 - sourceGridX - gridW / 2;
            recenterY = scrollTop + WH / 2 - sourceGridY - gridH / 2;


            gridMove(prevGrid, WH * 1.5, "-=", Power2.easeIn);
            gridMove(nextGrid, WH * 1.5, "+=", Power2.easeIn);




            var replaceImg = $(this).children(".gridItemImgs").children()







            $.each(replaceImg, function(key, element) {
                console.log(key)
                console.log($(this).attr('src'))

                var workImgSrc = $(this).attr('src').replace('thumbs', 'large');
                $(this).attr("src", workImgSrc);

            });













            TweenMax.to($(this), 0.5, { scaleX: wwr, scaleY: whr, x: centerX, y: centerY, ease: Power2.easeIn, onComplete: toCenter })


            TweenMax.to($(this).children(".gridCicle"), 0.5, { scale: 0.8 })
            TweenMax.to($(this).children(".gridText"), 0.5, { scale: 0.8 })


            // TweenMax.to(currentItem.children(), 0.1, { scaleX: 1 / (WW * 0.8 / gridW), scaleY: 1 / (WH * 0.8 / gridH), ease: Power2.easeIn })


            // $('.fp-scroller').on('scroll mousewheel touchmove', stopScrolling);
            $(this).addClass("action")


            //WAVE
            TweenMax.to($(".galdwork"), 1, { background: "radial-gradient(#fff, #333)", ease: Power3.easeOut });
            TweenMax.to($(".waveCont"), 0.3, { opacity: 0, ease: Power3.easeOut });


        }


        function gridMove(item, value, addSub, curve) {

            TweenMax.staggerTo(item, 0.5, { y: addSub + value, ease: curve }, "0.05")
        }


        function toCenter() {





        }



        function scaleEnd() {

        }

        function scaleBack() {

            TweenMax.to($(this), 0.5, { x: centerX, y: centerY, ease: Power2.easeOut })

        }



    })



    function stopScrolling(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }



});