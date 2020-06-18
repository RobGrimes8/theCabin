$('.parallax-window').parallax({ imageSrc: '/images/ruthinTown.jpg' });

$('.parallax-window-2').parallax({ imageSrc: '/images/coffee3-min.jpg' });

$('.parallax-window-3').parallax({ imageSrc: '/images/coffeeMap.jpg' });

$('.parallax-window-4').parallax({ imageSrc: '/images/coffeeParalax4.jpg' });

$("#aboutLink").click(function() {
    if ($(".about").length) {
        scrollTo(".about", 80);
        return false;
    }
});

$("#foodDrinkLink").click(function() {
    if ($(".foodDrink").length) {
        scrollTo(".foodDrink", 40);
        return false;
    }
});

function scrollTo(there, off) {
    $('html,body').animate({
            scrollTop: $(there).offset().top - off
        },
        'slow');
}

$(window).scroll(function() {
    showImages('.menuImg');
});

function showImages(el) {
    var windowHeight = jQuery(window).height();
    $(el).each(function() {
        var thisPos = $(this).offset().top;

        var topOfWindow = $(window).scrollTop();
        if (topOfWindow + windowHeight - 200 > thisPos) {
            $(this).removeClass("left");
            $(this).removeClass("right");
        }
    });
}

function showModal(url) {
    $("#modalImg").attr("src", url);
    $(".modal-title").text(src);
}