$(document).ready(function() {

    // START OF THE PLUGIN //

    $.fn.page = function(options) {

            var default_o = {
                'threshold': 200,
                'time': 300,
                'easing': 'linear',
                'page': null,
                'header': null,
                'before': null,
                'sticky': false,
                'stickyCls': null,
                'pageName': []
            };

            var o = $.extend(default_o, options);
            var elm = {};
            var id;
            var stickyH;



            function __init() {
                $(o.page).first().addClass('actived');
            }

            function toNext(selector) {
                var $this = $('.actived');
                var nxt = $this.next(o.page);
                if (nxt.length > 0) {
                    var offset = nxt.offset().top;
                    if (o.sticky) { offset = offset - parseInt(stickyH, 10); }

                    if (typeof(o.before) == 'function') { o.before(); }
                    $('body, html').animate({ scrollTop: offset }, {
                        start: function() { $this.removeClass('actived'); },
                        easing: o.easing,
                        duration: o.time,
                        complete: function() {
                            nxt.addClass('actived');
                            var color = $('.actived').prev(o.page).css('background');
                            if ((o.sticky) && (!o.stickyCls)) {
                                elm.wraper.animate({ 'background': color }, o.time);
                            }
                        },
                    });
                }
            }

            function toPrev(selector) {
                var $this = $('.actived');
                var prv = $this.prev(o.page);
                if (prv.length > 0) {
                    var offset = prv.offset().top;
                    if (o.sticky) { offset = offset - parseInt(stickyH, 10); }

                    if (typeof(o.before) == 'function') { o.before(); }
                    $('body, html').animate({ scrollTop: offset }, {
                        start: function() { $this.removeClass('actived'); },
                        easing: o.easing,
                        duration: o.time,
                        complete: function() {
                            prv.addClass('actived');
                            if ($('.actived').prev(o.page).length > 0) {
                                var color = $('.actived').prev(o.page).css('background');
                                if ((o.sticky) && (!o.stickyCls)) {
                                    elm.wraper.animate({ 'background': color }, o.time);
                                }
                            } else {
                                var color = $(o.page).last().css('background');
                                if ((o.sticky) && (!o.stickyCls)) {
                                    elm.wraper.animate({ 'background': color }, o.time / 4);
                                }
                            }
                        },
                    });
                }
            }








            __init();

            $(window).on('scroll scrollstop', function() {
                var wndw = $(window).height();
                var amt = window.scrollY;


                if ($('.actived').length > 0) {
                    var off = $('.actived').offset().top;
                    var hegt = $('.actived').height();
                }

                if ((parseInt(amt, 10) + parseInt(wndw, 10)) > parseInt(off, 10) + parseInt(hegt, 10) + parseInt(o.threshold, 10)) { toNext(o.page); } else if (amt < off - o.threshold - 5) { toPrev(o.page); }

            });

        }
        // END OF THE PLUGIN!!//

    $(document).page({
        'page': '.section',
        'header': '.header',
        // 'sticky': true,
        // 'stickyCls': 'nav',
        // 'pageName': ['Pages/Name', 'Sticky Menu', 'Easing', 'Threshold/Time']
    });
});