(function($) {
    var pauseOnHover = true;
    var slideDelay = 6000;


    function Timer(callback, delay) {
        var timerId, start, remaining = delay;

        this.pause = function() {
            window.clearTimeout(timerId);
            remaining -= new Date() - start;
        };

        this.resume = function() {
            start = new Date();
            window.clearTimeout(timerId);
            timerId = window.setTimeout(callback, remaining);
        };

        this.clear = function() {
            window.clearTimeout(timerId);
        }

        this.resume();
    }

    $(document).ready(function() {
        var $slider = $('.slider');
        var $sliderNavigation = $slider.find('.slider-navigation');
        var $slide = $slider.find('.slide');
        var $activeSlide;
        var slideCount = $slider.find('.slide').length;
        var timer;

        var setTimer = function() {
            timer = new Timer(function() {
                navigate('next');
            }, slideDelay);
        }

        var navigate = function(direction) {
            var $activeSlide = $slider.find('.slide.active');
            var slideNum = $activeSlide.index();

            if (timer) timer.clear();

            if (direction === 'next') {
                var $nextSlide = (slideNum + 1 === slideCount) ? $slider.find('.slide:first') : $activeSlide.next('.slide');
            }
            if (direction === 'prev') {
                var $nextSlide = (slideNum === 0) ? $slider.find('.slide:last') : $activeSlide.prev('.slide');
            }

            setTimer();

            $activeSlide.removeClass('active');
            $nextSlide.addClass('active');

            updateNavPosition();
        }

        var updateNavPosition = function() {
            var $slide = $slider.find('.slide.active');

            // FIX: Navigation position on small screens
            if ($(window).outerWidth() <= 576) {
                $sliderNavigation.css({
                    bottom: $slide.find('div.review').outerHeight()
                })
            } else {
                $sliderNavigation.removeAttr('style');
            }
        }


        //updateNavPosition();
        setTimer();

        if (pauseOnHover) {
            $slider.on('mouseenter', function() {
                if (timer) timer.pause();
            });

            $slider.on('mouseleave', function() {
                if (timer) timer.resume();
            })
        }


        $slider.find('.slider-nav-next').on('click', function(e) {
            e.preventDefault();
            navigate('next');
        });

        $slider.find('.slider-nav-prev').on('click', function(e) {
            e.preventDefault();
            navigate('prev');
        });

        $(window).on('resize', function() {
            updateNavPosition();
        });
    });


})(jQuery);