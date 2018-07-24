$(document).ready(function() {
    var compareVisible = false;

    if (window.location.host !== 'hingeto.sekvoia.co') {
        $('.compare-handle').css({
            display: 'block'
        });
    }

    $('.compare-handle').on('click', function($event) {
        $('.compare').toggleClass('in');
    })

    $('[data-scroll-anchor]').each(function() {
    	var offset = ($(this).attr('data-scroll-offset')) ? parseInt($(this).attr('data-scroll-offset')) : 32;
    	var speed = ($(this).attr('data-scroll-speed')) ? parseInt($(this).attr('data-scroll-speed')) : 500;
        var $target = $($(this).attr('data-scroll-anchor'));

        $(this).addClass('clickable');

        if ($target) {
            $(this).on('click', function() {
                $('html, body').animate({
                    scrollTop: $target.offset().top - offset
                }, 500);
            });
        }
    })
})