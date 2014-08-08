jQuery(document).ready(function ($) {
	
	  $("#slider_post_list_right").niceScroll({cursorcolor:"#999", cursorborder:"0px", cursorborderradius:"0px"});
		
	// nivoslider init
		if (jQuery().nivoSlider) {
			$('#slider').nivoSlider({
				effect: 'random',
				directionNav:true,
                animSpeed:500,
				pauseTime: 4000,
                startSlide:0,
				directionNavHide:false,
				controlNav:true  			
		});
		}

		if (jQuery().nivoSlider) {
			$('.nivoSlider_content').nivoSlider({
				effect: 'random',
				directionNav:true,
                animSpeed:500,
				pauseTime: 4000,
                startSlide:0,
				controlNav:false  			
		});
		}		
		
	
if (jQuery().jcarousel) {		
	jQuery('.jcarousel_vertical').jcarousel({
        vertical: true
    });
}

    //////////////////////////////////////////////////////////////////////////	
    // News ticker
    //////////////////////////////////////////////////////////////////////////

	if (jQuery().simplyScroll) {
    $("#scroller").simplyScroll({
        autoMode: 'loop',
        speed: 1,
        frameRate: 30
    });
	}

    //////////////////////////////////////////////////////////////////////////	
    // Fixed Main Menu
    //////////////////////////////////////////////////////////////////////////
	if (jQuery().sticky) {
	$(".menu_wrapper_sticky").sticky({ 
 	topSpacing: 0 
	});
	}
    //////////////////////////////////////////////////////////////////////////	
    // Menu
    //////////////////////////////////////////////////////////////////////////
    var mainmenu = $('#menu-top, #mainmenu').superfish({
        delay: 500,
        animation: {
            opacity: 'show',
            height: 'show'
        },
        speed: 'fast',
        autoArrows: false,
        dropShadows: false,
        disableHI: true
        //add options here if required
    });

 

    //////////////////////////////////////////////////////////////////////////	
    // Search and Share
    //////////////////////////////////////////////////////////////////////////

    var $ticker = $("#tickersearchform");
    var $social = $(".socialdrop");
    $ticker.data('bSearch', false);
    $social.data('cSocial', false);

    var closeSearch = function () {

        $ticker.data('bSearch', false);
        $ticker.slideUp(400, 'easeInOutQuart');

    };

    var openSearch = function () {

        $ticker.data('bSearch', true);
        $ticker.slideDown(400, 'easeInOutQuart');
      
    };

    var $body = $("body");
    $("#tickersearch").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
       var $isSearch = $ticker.data('bSearch');
        if ($isSearch === true) {
            closeSearch();
        } else {
            openSearch();
            closeSocial();
            $ticker.on("click", function (e) {
                e.stopPropagation();
            });
            $body.one("click", function (e) {
                closeSearch();
            });
        }
    });

    var closeSocial = function () {

        $social.data('cSocial', false);
        $social.slideUp(400, 'easeInOutQuart');
    };

    var openSocial = function () {

        $social.data('cSocial', true);
        $social.slideDown(400, 'easeInOutQuart');
    };

    $("#tickersocial").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var $cSocial = $social.data('cSocial');

        if ($cSocial === true) {
            closeSocial();
        } else {
            openSocial();
            closeSearch();
            $social.on("click", function (e) {
                e.stopPropagation();
            });
            $body.one("click", function (e) {
                closeSocial();
            });
        }
    });
	
	//////////////////////////////////////////////////////////////////////////
	//				Audio / Video
	//////////////////////////////////////////////////////////////////////////
	$('audio').mediaelementplayer({
			audioWidth: '100%'
		});
	

    //////////////////////////////////////////////////////////////////////////	
    // Select menu
    //////////////////////////////////////////////////////////////////////////

    selectnav('mainmenu', {
        label: 'Navigation Menu',
        nested: true,
        indent: '-'
    });
    selectnav('menu-top', {
        label: 'Navigation Menu',
        nested: true,
        indent: '-'
    });


    //////////////////////////////////////////////////////////////////////////	
    // Carousel
    //////////////////////////////////////////////////////////////////////////

    var $itemcarousel = $('.carousel_horizontal_small ul');
    if ($itemcarousel.length) {
        var caroWidth = 220;
        $itemcarousel.jcarousel({
            wrap: 'both',
			scroll: 1,
            animation: 1000,
            easing: 'easeInOutExpo', //easeInBack, easeOutQuart
            setupCallback: function (carousel) {
                carousel.reload();
            },
            reloadCallback: function (carousel) {
                var num = Math.round(carousel.clipping() / caroWidth);
                carousel.options.visible = num;
            }
        });

    }
   
    var $itemcarousel = $('.carousel_horizontal ul, .jcarousel');
    if ($itemcarousel.length) {
        var caroWidth = 220;
        $itemcarousel.jcarousel({
            wrap: 'both',
            //auto: 2,
			scroll: 1, 
            animation: 1000,
            easing: 'easeInOutExpo', //easeInBack, easeOutQuart
            setupCallback: function (carousel) {
                carousel.reload();
            },
            reloadCallback: function (carousel) {
                var num = Math.round(carousel.clipping() / caroWidth);
                carousel.options.visible = num;
            }
        });

    }

    //////////////////////////////////////////////////////////////////////////	
    // Flex Slider
    //////////////////////////////////////////////////////////////////////////	 

    if (jQuery().flexslider) {
        $('.flexslider').flexslider({
            animation: "fade",
            slideshow: true,
            animationLoop: true,
            start: function (slider) {
                $('body').removeClass('loading');
            }
        });
    }	  

    //////////////////////////////////////////////////////////////////////////	
    // To top
    //////////////////////////////////////////////////////////////////////////

    $().UItoTop({
        scrollSpeed: 800,
        easingType: 'easeInOutExpo'
    });


       //////////////////////////////////////////////////////////////////////////	
    // Tab
    //////////////////////////////////////////////////////////////////////////		
    var $tabsNav = $('.tabs-nav'),
        $tabsNavLis = $tabsNav.children('li');
    $tabsNav.each(function () {
        var $this = $(this);
        $this.next().children('.tab-content').stop(true, true).hide()
            .first().show();
        $this.children('li').first().addClass('active').stop(true, true).show();
    });
    $tabsNavLis.on('click', function (e) {
        var $this = $(this);
        $this.siblings().removeClass('active').end()
            .addClass('active');
        $this.parent().next().children('.tab-content').stop(true, true).hide()
            .siblings($this.find('a').attr('href')).fadeIn();
        e.preventDefault();
    });

    //////////////////////////////////////////////////////////////////////////	
    // Alert
    //////////////////////////////////////////////////////////////////////////

    $(".close").live("click", function () {
        $(this).parent().fadeOut('slow');
    });
	
		  $('.img_thumbnail, .entry-thumb, .image_post, .feature-link').hover(function () {
        $(this).stop().animate({
            opacity: 0.7
        }, {
            queue: false,
            duration: 400
        });
    }, function () {
        $(this).stop().animate({
            opacity: 1
        }, {
            queue: false,
            duration: 400
        });
    });

	
    //////////////////////////////////////////////////////////////////////////	
    // END SCRIPT
    //////////////////////////////////////////////////////////////////////////
});