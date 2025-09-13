(function ($) {
    "use strict";

    // Preloader
    $(window).on('load', function () {
        if ($('#preloader').length) {
            $('#preloader').delay(100).fadeOut('slow', function () {
                $(this).remove();
            });
        }
        document.getElementById("my_audio").play();
    });

    // Full page
    var myFullpage = new fullpage('#full-page', {
        scrollBar: true,
        scrollingSpeed: 500,
        autoScrolling: true,
        fitToSection: true,
        navigation: true,
        navigationPosition: 'left',
        paddingTop: '0',
        paddingBottom: '0',
        verticalCentered: true,
        showActiveTooltip: true,
        navigationTooltips: ['K', 'H', 'U', 'T', 'H', 'U'],
        sectionsColor: ['#ffffff']
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Initiate menu
    $('#header').after('<div class="mobile-menu d-xl-none">');
    $('.top-menu').clone().appendTo('.mobile-menu');
    $('.mobile-menu-btn').click(function () {
        $('.mobile-menu').stop().slideToggle();
    });

    // Intro carousel
    var introCarousel = $(".carousel");
    var introCarouselIndicators = $(".carousel-indicators");
    introCarousel.find(".carousel-inner").children(".carousel-item").each(function (index) {
        (index === 0) ?
            introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "' class='active'></li>") :
            introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "'></li>");

        $(this).css("background-image", "url('" + $(this).children('.carousel-background').children('img').attr('src') + "')");
        $(this).children('.carousel-background').remove();
    });

    $(".carousel").swipe({
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            if (direction == 'left')
                $(this).carousel('next');
            if (direction == 'right')
                $(this).carousel('prev');
        },
        allowPageScroll: "vertical"
    });

    //Portfolio modal slider
    $('.gallery').slick({
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.gallery-nav'
    });
    $('.gallery-nav').slick({
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.gallery',
        arrows: false,
        dots: false,
        centerMode: true,
        focusOnSelect: true
    });

    // CountDown
    var date = new Date(2025, 9, 12, 11, 0, 0);
    var now = new Date();
    var diff = (date.getTime() / 1000) - (now.getTime() / 1000);
    $('.clock').FlipClock(diff, {
        clockFace: 'DailyCounter',
        countdown: true
    });

    //audio play
    // $(document).on('click', function () {
    //     document.getElementById("my_audio").play();
    // });

    // Chặn menu chuột phải
    $(document).on('contextmenu', function (e) {
        e.preventDefault();
    });

    // Chặn kéo thả ảnh ra ngoài (cách 1: lắng trực tiếp trên document + điều kiện)
    $(document).on('dragstart', function (e) {
        if (e.target && e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

    // Hoặc cách 2: ủy quyền chỉ cho thẻ <img> (thường gọn hơn)
    // $(document).on('dragstart', 'img', function(e){ e.preventDefault(); });

    // Chặn phím tắt Ctrl+S, Ctrl+U, Ctrl+Shift+I/C/J
    $(document).on('keydown', function (e) {
        const key = (e.key || '').toLowerCase();
        const ctrlOrCmd = e.ctrlKey || e.metaKey; // nếu muốn hỗ trợ Cmd trên mac, giữ như này

        if (
            (ctrlOrCmd && (key === 's' || key === 'u')) ||                     // Ctrl/Cmd+S, Ctrl/Cmd+U
            (ctrlOrCmd && e.shiftKey && (key === 'i' || key === 'c' || key === 'j')) // Ctrl/Cmd+Shift+I/C/J
        ) {
            e.preventDefault();
            // tùy chọn: hiển thị thông báo nhỏ
            // console.log('Phím tắt đã bị chặn');
        }
    });

})(jQuery);

