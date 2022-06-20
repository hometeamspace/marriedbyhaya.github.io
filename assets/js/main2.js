/*============================================ Custom Functions  ============================================*/
;(function ($, window, document, undefined) {
    'use strict';
    var _doc = $(document),
    _win = $(window),

    Egprojets = {
        name : 'Egprojets',
        version : '1.0.0',
        // On Page Ready
        documentReady:function(){
            Egprojets.eventButtonTop();
            Egprojets.initSlide();
            Egprojets.menuButton();
            Egprojets.initPopup();
            Egprojets.scrollMenu();
            Egprojets.scrollMenuMobile();
            Egprojets.countDown();
            Egprojets.selectCustom();
            Egprojets.slidePlanner();
            Egprojets.controlForm();
        },

        // On Page Load
        windowLoad: function(){
            Egprojets.preloadWow();
            Egprojets.menuButton();
            Egprojets.scrollFromMenu();
        },

        // Scroll Menu From Hash
        scrollFromMenu: function(){
            var hash = location.hash.substr(1);
            if( hash > 0 ) {
                var target = $('[data-section-scroll='+hash+']');
                var targetHeightHash = target.offset().top-parseInt('80', 10);
                $('html, body').animate({
                  scrollTop: targetHeightHash
                }, 1000)
            }
        },

        // Preload Wow
        preloadWow: function(){
            jQuery("#status").fadeOut();
            jQuery("#preloader").delay(350).fadeOut("slow");
            var wow = new WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                mobile: true,
                live: true
            });
            wow.init();
        },

        // Back to Top js
        eventButtonTop: function(){
            var $this = $(window);
            $(window).scroll(function(){
                if ($(this).scrollTop() > 400) {
                    $('.scrollToTop').fadeIn();
                } else {
                    $('.scrollToTop').fadeOut();
                }
            });
            //Click event to scroll to top
            $(document).on('click','.scrollToTop',function(){
                $('html, body').animate({scrollTop : 0},400);
                return false;
            });
        },

        // Menu button
        menuButton: function(){
            $(document).on('click','#menu_click',function(){
                this.classList.toggle("change");
                $('.wd_main_menu_wrapper').slideToggle();
            });
            
            // Menu js for Position fixed
            $(window).scroll(function(){
                var window_top = $(window).scrollTop() + 1; 
                if (window_top > 500) {
                    $('.wd_main_menu_wrapper').addClass('menu_fixed animated fadeInDown');
                } else {
                    $('.wd_main_menu_wrapper').removeClass('menu_fixed animated fadeInDown');
                }
            });
        },

        // Init Slide Website
        initSlide: function(){
            // Testimonial Slider Js
            $('.wd_testimonial_slider .owl-carousel').owlCarousel({
                loop:true,
                margin:0,
                nav:false,
                autoplay:true,
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:1
                    },
                    1000:{
                        items:1
                    }
                }
            });
            
            // Family Slider Js
            $('.wd_family_slider .owl-carousel').owlCarousel({
                loop:true,
                margin:10,
                nav:true,
                navText:["<i class='fa fa-angle-left'></i>" , "<i class='fa fa-angle-right'></i>"],
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:2
                    },
                    1000:{
                        items:3
                    }
                }
            });
        },

        // Magnific Popup js
        initPopup: function(){
            $('.popup-gallery').magnificPopup({
                delegate: '.wd_glr_overlay a',
                type: 'image',
                tLoading: 'Loading image #%curr%...',
                mainClass: 'mfp-img-mobile',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0,1] // Will preload 0 - before current, and 1 after the current image
                },
                image: {
                    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                    titleSrc: function(item) {
                        return item.el.attr('title') + '<small></small>';
                    }
                }
            });
        },

        //Single page scroll js
        scrollMenu: function(){
            $('.wd_single_index_menu ul li a').on('click' , function(e){
              $('.wd_single_index_menu ul li').removeClass('active');
              $(this).parent().addClass('active');
              var target = $('[data-section-scroll='+$(this).attr('href')+']');
              e.preventDefault();
              var targetHeight = target.offset().top-parseInt('80', 10);
              $('html, body').animate({
                scrollTop: targetHeight
              }, 1000);
            });
            
            //Single page scroll Active Link
            $(window).scroll(function() {
              var windscroll = $(window).scrollTop();
              var target = $('.wd_single_index_menu ul li');
              if (windscroll >= 0) {
               $('[data-section-scroll]').each(function(i) {
                if ($(this).position().top <= windscroll + 83) {
                 target.removeClass('active');
                  if ( target.eq(i).hasClass('scroller') ) {
                        target.eq(i).addClass('active');
                  }
                }
               });
              }else{
               target.removeClass('active');
               $('.wd_single_index_menu ul li:first').addClass('active');
              }
            });
        },

        //Single page scroll js Mobile
        scrollMenuMobile: function(){
            $('.wd_single_index_menu_down ul li a').on('click' , function(e){
              $('.wd_single_index_menu_down ul li').removeClass('active');
              $(this).parent().addClass('active');
              var target = $('[data-section-scroll='+$(this).attr('href')+']');
              e.preventDefault();
              var targetHeight = target.offset().top-parseInt('83', 10);
              $('html, body').animate({
               scrollTop: targetHeight
              }, 1000);
            });
            
            //Single page scroll Active Link Mobile
            $(window).scroll(function() {
              var windscroll = $(window).scrollTop();
              var target = $('.wd_single_index_menu_down ul li');
              if (windscroll >= 0) {
               $('[data-section-scroll]').each(function(i) {
                if ($(this).position().top <= windscroll + 83) {
                 target.removeClass('active');
                 target.eq(i).addClass('active');
                }
               });
              }else{
               target.removeClass('active');
               $('.wd_single_index_menu_down ul li:first').addClass('active');
              }
            });
        },

        // CountDown Js
        countDown: function(){
            var deadline = 'December 20 2019 11:59:59 GMT+0530';
            Egprojets.run_clock('clockdiv',deadline); 
        },

        run_clock: function(id,endtime){
            var clock = document.getElementById(id);
            if(clock != null){
              // get spans where our clock numbers are held
              var timeinterval = 0;

              var days_span = clock.querySelector('.days');
              var hours_span = clock.querySelector('.hours');
              var minutes_span = clock.querySelector('.minutes');
              var seconds_span = clock.querySelector('.seconds');

              timeinterval = setInterval(function(){
                Egprojets.update_clock(timeinterval, endtime, days_span, hours_span, minutes_span, seconds_span);
              },1000);
            }
        },

        time_remaining: function(endtime){
            var t = Date.parse(endtime) - Date.parse(new Date());
            var seconds = Math.floor( (t/1000) % 60 );
            var minutes = Math.floor( (t/1000/60) % 60 );
            var hours = Math.floor( (t/(1000*60*60)) % 24 );
            var days = Math.floor( t/(1000*60*60*24) );
            return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
        },

        update_clock: function(timeinterval,endtime,  days_span, hours_span, minutes_span, seconds_span){
            var t = Egprojets.time_remaining(endtime);
            days_span.innerHTML = t.days;
            hours_span.innerHTML = ('0' + t.hours).slice(-2);
            minutes_span.innerHTML = ('0' + t.minutes).slice(-2);
            seconds_span.innerHTML = ('0' + t.seconds).slice(-2);
            
            if(t.total<=0){ clearInterval( timeinterval ); }
        },

        // Custom Select Box Js
        selectCustom: function(){
            $(".custom-select").each(function() {
                  var classes = $(this).attr("class"),
                      id      = $(this).attr("id"),
                      name    = $(this).attr("name");
                  var template =  '<div class="' + classes + '">';
                      template += '<span class="custom-select-trigger">' + $(this).attr("data-placeholder") + '</span>';
                      template += '<div class="custom-options">';
                      $(this).find("option").each(function() {
                        template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
                      });
                  template += '</div></div>';
                  
                  $(this).wrap('<div class="custom-select-wrapper"></div>');
                  $(this).hide();
                  $(this).after(template);
            });
            $(".custom-option:first-of-type").hover(function() {
              $(this).parents(".custom-options").addClass("option-hover");
            }, function() {
              $(this).parents(".custom-options").removeClass("option-hover");
            });
            $(".custom-select-trigger").on("click", function(event) {
              $(this).parents(".custom-select").toggleClass("opened");
              event.stopPropagation();
            });
            $(document).on('click','html',function(){
              $(".custom-select").removeClass("opened");
            });

            $(document).on('click','.custom-option',function(){
              $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
              $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
              $(this).addClass("selection");
              $(this).parents(".custom-select").removeClass("opened");
              $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
            });
        },

        controlForm: function(){
          $(document).on('submit','.form-reservation',function(){
            $('.mail-message').remove();
            $('.inputError').removeClass('inputError');
            var hasError = false;
            $('.required-field').each(function() {
              if($.trim($(this).val()) == '') {
                var labelText = $(this).attr('name');
                $(this).addClass('inputError');
                hasError = true;
              } else if($(this).hasClass('email')) {
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if(!emailReg.test($.trim($(this).val()))) {
                  var labelText = $(this).attr('name');
                  $(this).addClass('inputError');
                  hasError = true;
                }
              }
            });
            if(!hasError) {
              var formInput = $(this).serialize();
              $('.form-reservation').append('<div id="preloader" class="temp-loader"><div id="status"><img src="assets/images/header/preloader.gif" id="preloader_image" alt="loader"></div></div>')
              $.post($(this).attr('action'),formInput, function(data){
                $('.temp-loader').fadeOut("slow", function() {
                  $('.temp-loader').remove(); 
                  $('.form-reservation').before('<div class="mail-message"><p class="mail-head">Thank You!</p><p>Your email has been delivered.</p></div>');
                });
              });
            }
            return false;   
          });

          $(document).on('click','.wd_btn > a', function(){
            $('.form-reservation').submit();
            return false
          });

        },
        // Main Slider JS Planner
        slidePlanner: function(){
            $('.wd_main_slide').each(function(){
               $(this).css('background-image',"url('"+$(this).attr('data-slide')+"'");
            });
            var owl = $('.wd_planner_slider .owl-carousel');
            owl.owlCarousel({
                loop:true,
                margin:0,
                autoplay:true,
                navText : false,
                items:1
                
            });


            function setAnimation ( _elem, _InOut ) {
              var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

              _elem.each ( function () {
                var $elem = $(this);
                var $animationType = 'animated ' + $elem.data( 'animation-' + _InOut );

                $elem.addClass($animationType).one(animationEndEvent, function () {
                  $elem.removeClass($animationType);
                });
              });
            }

            owl.on('change.owl.carousel', function(event) {
                var $currentItem = $('.owl-item', owl).eq(event.item.index);
                var $elemsToanim = $currentItem.find("[data-animation-out]");
                setAnimation ($elemsToanim, 'out');
            });

            owl.on('changed.owl.carousel', function(event) {

                var $currentItem = $('.owl-item', owl).eq(event.item.index);
                var $elemsToanim = $currentItem.find("[data-animation-in]");
                setAnimation ($elemsToanim, 'in');
            })
        }
    }
    /*============================================ Call Functions on Document.Ready ============================================*/
    _doc.ready(Egprojets.documentReady);
    /*============================================ Call Functions on Window.Load ============================================*/
    _win.on('load',Egprojets.windowLoad);
})(jQuery, window, window.document);
/*============================================ End Custom Functions  ============================================*/