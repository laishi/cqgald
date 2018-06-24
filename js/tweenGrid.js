$(document).ready(function() {




    var gridItemWidth = $(".gridItem").width();
    var imageWidth = $(".gridItem").children().width();
    var imageHeight = 180;



    TweenMax.set($(".gridItem"), { height: imageHeight + 50 })
        // TweenMax.set($(".gridImg"), { height: gridItemWidth })










    var sourceGridX;
    var sourceGridY;
    var recenterX;
    var recenterY;

    $(".gridItem").click(function() {




        var currentIndex = $(this).index();

        var WW = $(window).innerWidth();
        var WH = $(window).innerHeight();


        var wwr = 720 / imageWidth;
        var whr = 400 / imageHeight;



        var gridX = $(this).offset().left;
        var gridY = $(this).offset().top;


        var pagebg = $(this).parent(".page");







        // alert($(this).parent(".page"))








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

            $('.fp-scroller').off('scroll mousewheel touchmove', stopScrolling);

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



            var workImgSrc = $(this).children("img").attr('src').replace('thumbs', 'large');
            $(this).children("img").attr("src", workImgSrc);
            console.log($(this).children("img").attr('src'))





            TweenMax.to($(this), 0.5, { scaleX: wwr, scaleY: whr, x: centerX, y: centerY, ease: Power2.easeIn, onComplete: toCenter })
                // TweenMax.to(currentItem.children(), 0.1, { scaleX: 1 / (WW * 0.8 / gridW), scaleY: 1 / (WH * 0.8 / gridH), ease: Power2.easeIn })


            $('.fp-scroller').on('scroll mousewheel touchmove', stopScrolling);
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