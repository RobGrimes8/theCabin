$('.parallax-window').parallax({ imageSrc: '/images/ruthinTown.jpg' });

$('.parallax-window-2').parallax({ imageSrc: '/images/coffee3-min.jpg' });

$('.parallax-window-3').parallax({ imageSrc: '/images/coffeeMap.jpg' });

$('.parallax-window-4').parallax({ imageSrc: '/images/coffeeParalax4.jpg' });

$("#aboutLink").click(function() {
    $('html,body').animate({
            scrollTop: $(".about").offset().top - 90
        },
        'slow');
});