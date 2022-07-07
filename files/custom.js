$(window).on('load',function(){
	setTimeout(function(){$("#preloader").addClass('hide-preloader');},450);// will fade out the white DIV that covers the website.
});

$(document).ready(function(){      
    'use strict'	
			    
	function init_template(){	        
        
        //Demo Purposes.
		$('a').on('click', function(){var attrs = $(this).attr('href');	if(attrs === '#'){return false;}});
			
        var header_lines = $('.header-line-2, .header-line-1');
        var header_line1 = $('.header-line-1');
        var header_line2 = $('.header-line-2');
        var header = $('.header');
        var header_tabs = $('.header-tabs');
        var header_search = $('.header-search');
        var menu_box = $('.menu-box');
        var menu_load = $('.menu-load');
        var menu_hider = $('#menu-hider');
        var menu_window = $('.menu-bottom');
        var menu_modal = $('.menu-modal');
        var menu_hiders = $('#menu-hider, .close-menu, .menu-hide');
        var page_transitions = $('#page-transitions');
        var page_content = $('.page-content');
        var page_content_sccroll = $('.page-content-scroll');
        var debounce_timer = '';
        var movable_items = $('.header, .page-content');
        var show_on_scroll = $('.show-on-scroll');
        var fixed_tabs = $('.fixed-tabs');
        
        //Activating Menus After Page Load
        setTimeout(function(){menu_box.css({"display": "block"});},350);
        
        //Preloading the Menus on Load
        menu_load.each(function(){var menuLoad = $(this).data('load'); $(this).load(menuLoad);});
        
        //Activating Menu Functions on Data Click
        $('a[data-menu]').on('click',function(){
            menu_box.removeClass('menu-box-active');
            var menuID = $('#' + $(this).data('menu'));
            var menuSelect = menuID.data('selected');
            var menuTitle = menuID.data('title');
            var menuSubTitle = menuID.data('subtitle');
            var menuLoad = menuID.data('load');
            var menuHeight = menuID.data('height');
            var menuWidth = menuID.data('width');
            menuID.addClass('menu-box-active');
            menu_hider.addClass('menu-hider-active');
            
            if(menuID.data('height')){
               menuID.css({'height':menuHeight})
               menuID.css({'top':'auto'})
            }
            
            if(menuSubTitle === ''){
                menuID.find('.menu-title h1').css({'margin-bottom':'10px'});
                menuID.find('.menu-title h1').css({'margin-top':'20px'});
                menuID.find('.menu-title .menu-hide').css({'margin-top':'-2px'});
            }
            
            if(menuID.hasClass('menu-modal')){
                menuID.css({
                    'height':menuHeight,
                    'width':menuWidth,
                    'margin-top':(menuHeight/2)*(-1),
                    'margin-left':(menuWidth/2)*(-1)
                });
            }
            
            if(menuID.hasClass('menu-sidebar-left-push')){movable_items.addClass('move-contents-left');}
            if(menuID.hasClass('menu-sidebar-right-push')){movable_items.addClass('move-contents-right');}       
            if(menuID.hasClass('menu-sidebar-left-parallax')){movable_items.addClass('parallax-contents-left');}
            if(menuID.hasClass('menu-sidebar-right-parallax')){movable_items.addClass('parallax-contents-right');}                   
            
            if(menuID.data('load')){
               menuID.find('#'+menuSelect).addClass('menu-active');
               menuID.find('.menu-title h1').html(menuTitle); 
               menuID.find('.menu-title span').html(menuSubTitle); 
            }
            return false;
        });
        
        menu_modal.each(function(){
            var modalHeight = menu_modal.data('height');
            var modalWidth = menu_modal.data('width');
            menu_modal.css({
                'height':modalHeight,
                'width':modalWidth,
                'margin-top':(modalHeight/2)*(-1),
                'margin-left':(modalWidth/2)*(-1)
            });
        })
        
        //Hiding the menu on click.
        $('#menu-hider, .close-menu, .menu-hide').on('click',function(){
            menu_box.removeClass('menu-box-active');
            menu_hider.removeClass('menu-hider-active');
            movable_items.removeClass('move-contents-left move-contents-right parallax-contents-left parallax-contents-right');
            header_lines.removeClass('move-contents-left move-contents-right');
            page_content.removeClass('move-contents-left move-contents-right');
            $('.search-header a').removeClass('search-close-active');
            $('#search-page').removeClass('move-search-list-up');
            return false;
        });

        //Header Pretitle
        if($('.header-pretitle').length){$('.header-title').css({'margin-top':'8px'})}
        
        //Get Date and Day for Header
        var weekID = new Date();
        var weekdayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var monthID = new Date();
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var dayID = new Date();
        var dayName = dayID.getDate();
        var daySuffix = 'th';
        if(dayName === '1'){daySuffix = 'st'};
        if(dayName === '2'){daySuffix = 'nd'};
        if(dayName === '3'){daySuffix = 'rd'};
        $('.header-date').html(weekdayName[weekID.getDay()]  + ' ' +  dayName + daySuffix + ' ' + monthNames[monthID.getMonth()])
        
		//Copyright Year 
        var dteNow = new Date();
        var intYear = dteNow.getFullYear();
        var copyrightYear = $('#copyright-year, .copyright-year')
        copyrightYear.html(intYear);
        
        
        //Back To Top & Back Button
        $('.back-button').on('click', function() {
            page_transitions.addClass('back-button-clicked');
            page_transitions.removeClass('back-button-not-clicked');
            window.history.go(-1);
            return false;
        });
        $('.back-to-top-badge, .back-to-top').on("click", function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, universalTransitionTime);
            return false;
        });

		//Mobile Ads
        var ad_fixed = $('.ad-300x50-fixed');
        function showFixedAd(){setTimeout(function(){ad_fixed.fadeIn(350);},3500);}
		$('.close-ad-button').on('click', function(){ad_fixed.fadeOut(250);});
        if(ad_fixed.length){showFixedAd();}
        
		//Accordion
        var accordion_trigger = $('a[data-accordion]')
        var accordion_content = $('.accordion-content');
        
		accordion_trigger.on( "click", function(){
			var accordion_number = $(this).data('accordion');
			accordion_content.slideUp(200);
			$('.accordion i').removeClass('rotate-180');			
			if($('#'+accordion_number).is(":visible")){
				$('#'+accordion_number).slideUp(200); 
				$(this).find('i:last-child').removeClass('rotate-180');
			}else{
				$('#'+accordion_number).slideDown(200); 
				$(this).find('i:last-child').addClass('rotate-180');
  			}
		});
        
        //Preload Image
        $(function() {$(".preload-image").lazyload({threshold : 500});});

        //Notifications
        var notification_trigger =  $('a[data-notification]');
        var notification_fixed = $('.notification-fixed');
        var close_notification = $('.close-notification');
        notification_trigger.on('click',function(){
            notification_fixed.removeClass('notification-fixed-active');
            var notificationData = $(this).data('notification');
            var notificationID = '#' + notificationData;
            $(notificationID).toggleClass('notification-fixed-active');
            return false;
        })
        $('.notification-fixed a, .notification-fixed').on('click',function(){
            notification_fixed.removeClass('notification-fixed-active');
            return false;
        })
        $('.close-notification').on('click', function() {$(this).parent().hide(250); return false;});
        
        //Show Back To Home When Scrolling
        $(window).on('scroll', function () {
            var total_scroll_height = document.body.scrollHeight
            var inside_header = ($(this).scrollTop() <= 100);
            var passed_header = ($(this).scrollTop() >= 0); //250
            var passed_header2 = ($(this).scrollTop() >= 150); //250
            var footer_reached = ($(this).scrollTop() >= (total_scroll_height - ($(window).height() + 300 )));
            var window_top = $(window).scrollTop();
            var content_height = $('.page-content').height();     
            var window_height = $(window).height();
            var totalScroll = (window_top / (content_height - window_height)) * 100;
            
            if (inside_header === true) {
                $('.back-to-top-badge').removeClass('back-to-top-badge-visible');
                $('.scroll-ad').removeClass('scroll-ad-visible');
                if(header.hasClass('header-scroll-effect')){
                    header.removeClass('header-effect');
                    header_tabs.removeClass('header-tabs-effect');
                    header_search.removeClass('header-search-effect');
                }
            }
            else if(passed_header === true){
                $('.back-to-top-badge').addClass('back-to-top-badge-visible');
                $('.scroll-ad').addClass('scroll-ad-visible');
                if(header.hasClass('header-scroll-effect')){
                    header.addClass('header-effect');
                    header_tabs.addClass('header-tabs-effect');
                    header_search.addClass('header-search-effect');
                }
            } 
            if (footer_reached == true){
                $('.back-to-top-badge').removeClass('back-to-top-badge-visible');
            }
            
            $(".reading-line").css("width", totalScroll + "%");
        });
                
        var single_slider = $('.single-slider');
        var simple_slider = $('.simple-slider');
        var double_slider = $('.double-slider');
        var quote_slider = $('.quote-slider');
        var cover_slider = $('.cover-slider');
        var walkthrough_slider = $('.walkthrough-slider');
        
        setTimeout(function() {
            single_slider.owlCarousel({
                loop: true,
                margin: 0,
                nav: false,
                dots:false,
                autoHeight: true,
                lazyLoad: true,
                items: 1,
                autoplay: true,
                autoplayTimeout: 4500
            });   
            cover_slider.owlCarousel({
                loop: true,
                margin: 0,
                nav: false,
                dots:false,
                autoHeight: false,
                items: 1,
                autoplay: false,
                autoplayTimeout: 4500
            });   
            walkthrough_slider.owlCarousel({
                loop: true,
                margin: 0,
                nav: false,
                dots:true,
                autoHeight: false,
                items: 1,
                autoplay: false,
                autoplayTimeout: 4500
            });          
            simple_slider.owlCarousel({
                loop: true,
                margin: 0,
                nav: false,
                autoHeight: true,
                items: 1,
                autoplay: false,
            });      
            quote_slider.owlCarousel({
                loop: true,
                margin: 20,
                nav: false,
                autoHeight: true,
                items: 1,
                autoplay: true,
                autoplayTimeout:4500
            });
            double_slider.owlCarousel({
                loop: true,
                margin: 20,
                nav: false,
                autoHeight: true,
                lazyLoad: true,
                items: 2,
                autoplay: true,
                autoplayTimeout: 4500
            });

            $('.next-slide, .next-slide-arrow, .next-slide-text, .next-slide-custom').on('click', function() {$(this).parent().find('.owl-carousel').trigger('next.owl.carousel');});
            $('.prev-slide, .prev-slide-arrow, .prev-slide-text, .prev-slide-custom').on('click', function() {$(this).parent().find('.owl-carousel').trigger('prev.owl.carousel');});
        }, 100);
        
        setTimeout(function(){resize_coverpage();}, 250);        
        function resize_coverpage() {
            var cover_height = $(window).height();
            var cover_width = $(window).width();
            var page_content_full = $('.page-content-full');
            var cover_item = $('.cover-item');
            var cover_item_full = $('.cover-item-full');
            var coverpage_full = $('.coverpage-full');
            var cover_content_center = $('.cover-content-center');
            var cover_content_center_full = $('.cover-content-center-full');
            if (cover_width.length > 0) {var header_height = "0"; page_transitions.css({"min-height": cover_height});
            } else {var header_height = "0"; page_transitions.css({"min-height": cover_height});}
            
            cover_item.css({"height": (cover_height - header_height), "width": cover_width})
            cover_item_full.css({"margin-top": header_height * (-1), "height": cover_height, "width": cover_width})
            $('.coverpage-full .cover-item').css({"height": cover_height, "width": cover_width});
            coverpage_full.css({"margin-top": header_height * (-1)});
            cover_content_center.each(function() {
                var cover_content_center_height = $(this).innerHeight();
                var cover_content_center_width = $(this).innerWidth();
                $(this).css({
                    "margin-left": (cover_content_center_width / 2) * (-1),
                    "margin-top": ((cover_content_center_height / 2) * (-1))
                })
            });
            cover_content_center_full.each(function() {
                var cover_content_center_height = $(this).innerHeight();
                $(this).css({"margin-top": (cover_content_center_height / 2) * (-1)})
            });
        }
        $(window).on('resize', function() {resize_coverpage();})
        
        //Galleries
        baguetteBox.run('.gallery', {});
        baguetteBox.run('.profile-gallery', {});
        setTimeout(function(){if ($('.gallery-filter').length > 0) {$('.gallery-filter').filterizr();}
        $('.gallery-filter-controls li').on('click', function() {
            $('.gallery-filter-controls li').removeClass('gallery-filter-active color-highlight');
            $(this).addClass('gallery-filter-active color-highlight');
        });
        },150);
        
        //Contact Form
        var formSubmitted = "false";
        jQuery(document).ready(function(e) {
            function t(t, n) {
                formSubmitted = "true";
                var r = e("#" + t).serialize();
                e.post(e("#" + t).attr("action"), r, function(n) {
                    e("#" + t).hide();
                    e("#formSuccessMessageWrap").fadeIn(500)
                })
            }

            function n(n, r) {
                e(".formValidationError").hide();
                e(".fieldHasError").removeClass("fieldHasError");
                e("#" + n + " .requiredField").each(function(i) {
                    if (e(this).val() == "" || e(this).val() == e(this).attr("data-dummy")) {
                        e(this).val(e(this).attr("data-dummy"));
                        e(this).focus();
                        e(this).addClass("fieldHasError");
                        e("#" + e(this).attr("id") + "Error").fadeIn(300);
                        return false
                    }
                    if (e(this).hasClass("requiredEmailField")) {
                        var s = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                        var o = "#" + e(this).attr("id");
                        if (!s.test(e(o).val())) {
                            e(o).focus();
                            e(o).addClass("fieldHasError");
                            e(o + "Error2").fadeIn(300);
                            return false
                        }
                    }
                    if (formSubmitted == "false" && i == e("#" + n + " .requiredField").length - 1) {
                        t(n, r)
                    }
                })
            }
            e("#formSuccessMessageWrap").hide(0);
            e(".formValidationError").fadeOut(0);
            e('input[type="text"], input[type="password"], textarea').focus(function() {
                if (e(this).val() == e(this).attr("data-dummy")) {
                    e(this).val("")
                }
            });
            e("input, textarea").blur(function() {
                if (e(this).val() == "") {
                    e(this).val(e(this).attr("data-dummy"))
                }
            });
            e("#contactSubmitButton").click(function() {
                n(e(this).attr("data-formId"));
                return false
            })
        })
                
        //Universal Transition Timing
        var universalTransitionTime = 300;
        setTimeout(function(){
        $('.header, .header-line-1, .header-line-2, .header-tabs, .header-search, .footer, .menu-box, #menu-hider, .menu-hider-active, .page-content, #search-page, .search-header a').css({
            WebkitTransition: 'all ' + universalTransitionTime + 'ms ease',
            MozTransition: 'all ' + universalTransitionTime + 'ms ease',
            MsTransition: 'all ' + universalTransitionTime + 'ms ease',
            OTransition: 'all ' + universalTransitionTime + 'ms ease',
            transition: 'all ' + universalTransitionTime + 'ms ease'
        });
        },250);
        
        //Adding added-to-homescreen class to be targeted when used as PWA.
        function ath(){
        (function(a, b, c) {
            if (c in b && b[c]) {
                var d, e = a.location,
                    f = /^(a|html)$/i;
                a.addEventListener("click", function(a) {
                    d = a.target;
                    while (!f.test(d.nodeName)) d = d.parentNode;
                    "href" in d && (d.href.indexOf("http") || ~d.href.indexOf(e.host)) && (a.preventDefault(), e.href = d.href)
                }, !1);
                $('body').addClass('added-to-home');
                $('.added-to-home .add-to-home').addClass('disabled');
                $('#page-transitions').append('<div class="ioshome"></div>');
                if($('.page-content-full').length){
                    setTimeout(function(){
                        $('.ioshome').addClass('disabled');
                    },300)
                };
            }
        })(document, window.navigator, "standalone")
        }
        
        ath();
        
        if (window.matchMedia('(display-mode: standalone)').matches) {
            $('.add-to-home').addClass('disabled');
        }
        
        $('head').append('<meta charset="utf-8">');
        $('head').append('<meta name="apple-mobile-web-app-capable" content="yes">');
        $('head').append('<link rel="apple-touch-icon" sizes="180x180" href="images/ath.png">');
        var isMobile = {
            Android: function() {return navigator.userAgent.match(/Android/i);},
            iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
            Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
            any: function() {return (isMobile.Android() || isMobile.iOS() || isMobile.Windows());}
        };
        if (!isMobile.any()) {
            $('body').addClass('is-not-ios');
            $('.add-to-home').addClass('disabled');
            $('.show-blackberry, .show-ios, .show-windows, .show-android').addClass('disabled');
            $('.show-no-detection').removeClass('disabled');
        }
        if (isMobile.Android()) {
            $('body').addClass('is-not-ios');
            $('.add-to-home').addClass('add-to-home-android');
            $('head').append('<meta name="theme-color" content="#000000"> />');
            $('.show-android').removeClass('disabled');
            $('.show-blackberry, .show-ios, .show-windows, .show-download').addClass('disabled');
            $('.sidebar-scroll').css('right', '0px');
            $('.set-today').addClass('mobile-date-correction');
        }
        if (isMobile.iOS()) {
            $('body').addClass('is-ios');
            $('.add-to-home').addClass('add-to-home-ios');
            $('.show-ios').removeClass('disabled');
            $('.show-blackberry, .show-android, .show-windows, .show-download').addClass('disabled');
            $('.set-today').addClass('mobile-date-correction');
        }
        if (isMobile.Windows()) {
            $('.show-windows').removeClass('disabled');
            $('.show-blackberry, .show-ios, .show-android, .show-download').addClass('disabled');
        }
        $('.inner-link-list').on('click', function() {
            $(this).parent().find('.link-list').slideToggle(250);
        });
        
        if(!$('#footer-menu').length){
            $('.footer').addClass('footer-no-padding');
        }
        
        //Device Has Notch? 
        var deviceHasNotch = "false";
        var deviceNotchSize = "44" //44 pixel is the default notch size
        if(deviceHasNotch === "true"){
            $('body').addClass('has-notch');
            $('body').append('<div class="notch-hider"></div>');
            $('.notch-hider').css('height', deviceNotchSize +'px');
            $('.header, .header-tabs, .header-search, body, #page, .menu-sidebar-left-full, .menu-sidebar-right-full, .menu-sidebar-left-push, .menu-sidebar-right-push, .menu-sidebar-left-parallax, .menu-sidebar-right-parallax').css('margin-top', deviceNotchSize +'px');
        }
    
        
        var chartsTriggerLoad = $('.chart');
        if (chartsTriggerLoad.length > 0) {
            var loadJS = function(url, implementationCode, location) {
                var scriptTag = document.createElement('script');
                scriptTag.src = url;
                scriptTag.onload = implementationCode;
                scriptTag.onreadystatechange = implementationCode;
                location.appendChild(scriptTag);
            };
            var call_charts_to_page = function() {
                new Chart(document.getElementById("pie-chart"), {
                    type: 'pie',
                    data: {
                        labels: ["Facebook", "Twitter", "WhatsApp"],
                        datasets: [{
                            backgroundColor: ["#4A89DC", "#4FC1E9", "#A0D468"],
                            borderColor: "rgba(255,255,255,1)",
                            data: [7000, 3000, 5000]
                        }]
                    },
                    options: {
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                fontSize: 13,
                                padding: 15,
                                boxWidth: 12
                            },
                        },
                        tooltips: {
                            enabled: true
                        },
                        animation: {
                            duration: 1500
                        }
                    }
                });
                new Chart(document.getElementById("doughnut-chart"), {
                    type: 'doughnut',
                    data: {
                        labels: ["Apple Inc.", "Samsung", "Google", "One Plus", "Huawei"],
                        datasets: [{
                            backgroundColor: ["#CCD1D9", "#5D9CEC", "#FC6E51", "#434A54", "#4FC1E9"],
                            borderColor: "rgba(255,255,255,1)",
                            data: [5500, 4000, 2000, 3000, 1000]
                        }]
                    },
                    options: {
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                fontSize: 13,
                                padding: 15,
                                boxWidth: 12
                            },
                        },
                        tooltips: {
                            enabled: true
                        },
                        animation: {
                            duration: 1500
                        },
                        layout: {
                            padding: {
                                bottom: 30
                            }
                        }
                    }
                });
                new Chart(document.getElementById("polar-chart"), {
                    type: 'polarArea',
                    data: {
                        labels: ["Windows", "Mac", "Linux"],
                        datasets: [{
                            backgroundColor: ["#CCD1D9", "#5D9CEC", "#FC6E51"],
                            borderColor: "rgba(255,255,255,1)",
                            data: [7000, 10000, 5000]
                        }]
                    },
                    options: {
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                fontSize: 13,
                                padding: 15,
                                boxWidth: 12
                            },
                        },
                        tooltips: {
                            enabled: true
                        },
                        animation: {
                            duration: 1500
                        },
                        layout: {
                            padding: {
                                bottom: 30
                            }
                        }
                    }
                });
                new Chart(document.getElementById("vertical-chart"), {
                    type: 'bar',
                    data: {
                        labels: ["2010", "2015", "2020", "2025"],
                        datasets: [{
                            label: "iOS",
                            backgroundColor: "#A0D468",
                            data: [900, 1000, 1200, 1400]
                        }, {
                            label: "Android",
                            backgroundColor: "#4A89DC",
                            data: [890, 950, 1100, 1300]
                        }]
                    },
                    options: {
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                fontSize: 13,
                                padding: 15,
                                boxWidth: 12
                            },
                        },
                        title: {
                            display: false
                        }
                    }
                });
                new Chart(document.getElementById("horizontal-chart"), {
                    type: 'horizontalBar',
                    data: {
                        labels: ["2010", "2013", "2016", "2020"],
                        datasets: [{
                            label: "Mobile",
                            backgroundColor: "#8CC152",
                            data: [330, 400, 580, 590]
                        }, {
                            label: "Responsive",
                            backgroundColor: "#FFCE54",
                            data: [390, 450, 550, 570]
                        }]
                    },
                    options: {
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                fontSize: 13,
                                padding: 15,
                                boxWidth: 12
                            },
                        },
                        title: {
                            display: false
                        }
                    }
                });
                new Chart(document.getElementById("line-chart"), {
                    type: 'line',
                    data: {
                        labels: [2000, 2005, 2010, 2015, 2010],
                        datasets: [{
                            data: [500, 400, 300, 200, 200],
                            label: "Desktop Web",
                            borderColor: "#D8334A"
                        }, {
                            data: [0, 100, 300, 400, 550],
                            label: "Mobile Web",
                            borderColor: "#4A89DC"
                        }]
                    },
                    options: {
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                fontSize: 13,
                                padding: 15,
                                boxWidth: 12
                            },
                        },
                        title: {
                            display: false
                        }
                    }
                });
            }
            loadJS('scripts/charts.js', call_charts_to_page, document.body);
        }
        
        //Create Cookies
        function createCookie(e, t, n) {
            if (n) {
                var o = new Date;
                o.setTime(o.getTime() + 48 * n * 60 * 60 * 1e3);
                var r = "; expires=" + o.toGMTString()
            } else var r = "";
            document.cookie = e + "=" + t + r + "; path=/"
        }

        function readCookie(e) {
            for (var t = e + "=", n = document.cookie.split(";"), o = 0; o < n.length; o++) {
                for (var r = n[o];
                    " " == r.charAt(0);) r = r.substring(1, r.length);
                if (0 == r.indexOf(t)) return r.substring(t.length, r.length)
            }
            return null
        }

        //Cookie Policy
        function eraseCookie(e) {createCookie(e, "", -1)}
        if (!readCookie('enabled_cookie_themeforest_apptastic')) {
            setTimeout(function() {
                $('#menu-cookie').addClass('menu-box-active');
                $('.menu-cookie-hider').addClass('menu-hider-active');
            }, 1500);
        }
        if (readCookie('enabled_cookie_themeforest_apptastic')) {
            $('#menu-cookie').removeClass('menu-box-active');
        }
        $('.remove-cookie').click(function() {
            $('#menu-cookie').removeClass('menu-box-active');
            menu_hider.removeClass('menu-hider-active');
            createCookie('enabled_cookie_themeforest_apptastic', true, 1)
        });

        
        //Reading Time
        $(function() {
            var $article = $('.reading-time-box');
            $article.readingTime({
                readingTimeAsNumber: true,
                readingTimeTarget: $article.find('.reading-time'),
                wordCountTarget: $article.find('.reading-words'),
                wordsPerMinute: 1075,
                round: false,
                lang: 'en',
            });
        });
        
        //Snackbars
        var snackbar_trigger = $('a[data-deploy-snack]')
        snackbar_trigger.on("click", function() {
            var snack_number = $(this).data('deploy-snack');
            $('#' + snack_number).addClass('active-snack');
            setTimeout(function() {
                $('#' + snack_number).removeClass('active-snack');
            }, 5000);
        });
        $('.snackbar a').on('click', function() {
            $(this).parent().removeClass('active-snack');
        });
        $('.snb').on("click", function() {
            var snb_height = $('.notification-bar').height();
            $('.notification-bar').toggleClass('toggle-notification-bar');
        });
        
        //Sortables
        if ($('#sortable').length) {
            var list = document.getElementById("sortable");
            Sortable.create(list);
        }
        
        //Classic Serch
        $('[data-search]').on('keyup', function() {
            var searchVal = $(this).val();
            var filterItems = $(this).parent().parent().find('[data-filter-item]');
            if (searchVal != '') {
                $(this).parent().parent().find('.search-results').removeClass('disabled-search-list');
                $(this).parent().parent().find('[data-filter-item]').addClass('disabled-search');
                $(this).parent().parent().find('[data-filter-item][data-filter-name*="' + searchVal.toLowerCase() + '"]').removeClass('disabled-search');
            } else {
                $(this).parent().parent().find('.search-results').addClass('disabled-search-list');
                $(this).parent().parent().find('[data-filter-item]').removeClass('disabled-search');
            }
        });       
        
        //Header Serch
        $('[data-search-header]').on('keyup', function() {
            var searchVal = $(this).val();
            var filterItems = $('[data-filter-item]');
            if (searchVal != '') {
                $('.search-results').removeClass('disabled-search-list');
                $('[data-filter-item]').addClass('disabled-search');
                $('[data-filter-item][data-filter-name*="' + searchVal.toLowerCase() + '"]').removeClass('disabled-search');
                $('.search-excluded').addClass('disabled-search');
            } else {
                $('.search-excluded').removeClass('disabled-search');
                $('.search-results').addClass('disabled-search-list');
                $('[data-filter-item]').removeClass('disabled-search');
            }
        });
        $('.header-search a').on('click',function(){
            $('[data-search-header]').val('');
            $('.search-excluded').removeClass('disabled-search');
            $('.search-results').addClass('disabled-search-list');
            $('[data-filter-item]').removeClass('disabled-search');
        })
        
        //Tabs
        $('.active-tab').slideDown(0);
        $('a[data-tab]').on("click", function() {
            var tab_number = $(this).data('tab');
            $(this).parent().find('[data-tab]').removeClass('active-tab-button');
            $(this).parent().parent().find('.tab-titles a').removeClass('active-tab-button');
            $(this).addClass('active-tab-button');
            $(this).parent().parent().find('.tab-item').slideUp(200);
            $('#' + tab_number).slideDown(200);
        });
        $('a[data-tab-pill]').on("click", function() {
            var tab_number = $(this).data('tab-pill');
            var tab_bg = $(this).parent().parent().find('.tab-pill-titles').data('active-tab-pill-background');
            $(this).parent().find('[data-tab-pill]').removeClass('active-tab-pill-button ' + tab_bg);
            $(this).parent().parent().find('.tab-titles a').removeClass('active-tab-pill-button ' + tab_bg);
            $(this).addClass('active-tab-pill-button ' + tab_bg);
            $(this).parent().parent().find('.tab-item').slideUp(200);
            $('#' + tab_number).slideDown(200);
        });
        
        //Toasts
        $('a[data-toast]').on("click", function() {
            $('.toast').removeClass('show-toast');
            var toast_number = $(this).data('toast');
            $('#' + toast_number).addClass('show-toast');
            setTimeout(function() {
                $('#' + toast_number).removeClass('show-toast');
            }, 3000);
        });
        
        //Header Tabs
        if($('.header-tabs').length){
            var header_tabs = $('.header-tabs');
            var header_tabs_number = $('.header-tabs').data('total-tabs');
            var header_tabs_color = $('.header-tabs').data('tabs-color');
            var header_tabs_width = $('.header-tabs').width();      
            var header_tabs_active = $('.header-tabs a.active-tab').data('header-tab');
            var header_tab_content = $('.header-tab-content');
            
            header_tab_content.hide();
            $('#'+header_tabs_active).show();
            $('.header-tabs .active-tab').addClass(header_tabs_color);
            $('.header-tabs a').css({"width":(header_tabs_width/header_tabs_number-1)})

            $('a[data-header-tab]').on('click',function(){
                var header_tab_id = $('#' +  $(this).data('header-tab'));
                header_tabs.find('a').removeClass(header_tabs_color);
                $(this).addClass(header_tabs_color)
                header_tab_content.hide();
                header_tab_id.show();
            })
        }
                
        //Toggles
        var toggle_trigger = $('.toggle-trigger, .toggle-title');
        toggle_trigger.on('click', function() {
            $(this).parent().toggleClass('toggle-active');
            $(this).parent().find('.toggle-content').slideToggle(250);
        });
        
        //FAQ
        var faq_trigger = $('.faq-question');
        faq_trigger.on('click', function() {
            $(this).parent().find('.faq-answer').slideToggle(300);
            $(this).find('.fa-plus').toggleClass('rotate-45');
            $(this).find('.fa-chevron-down').toggleClass('rotate-180');
            $(this).find('.fa-arrow-down').toggleClass('rotate-180');
        })
        
        //Articel Cards
        if ($('.article-card, .instant-box').length) {
            setTimeout(function() {
                $('[data-article-card="' + activate_clone + '"]').addClass('active-card');
                $('[data-instant="' + activate_clone + '"]').addClass('active-instant');
            }, 0);
        }
        $('[data-article-card]').clone().addClass('article-clone').removeClass('article-card-round').appendTo('#page-transitions');
        $('.article-clone .article-header').append('<span class="article-back"><i class="fa fa-angle-left"></i> Back</span>');
        $('[data-deploy-card]').on('click', function() {
            $('.article-clone a').removeAttr('data-deploy-card');
            var data_card = $(this).data('deploy-card');
            $('[data-article-card="' + data_card + '"]').addClass('active-card');
            $('.article-card').animate({
                scrollTop: 0
            }, 0);
        });
        $('.article-clone .article-back, .close-article').on('click', function() {
            $('.article-clone').removeClass('active-card');
            return false;
        });
        $('.instant-box').clone().addClass('instant-box-clone').appendTo('#page-transitions');
        $('[data-deploy-instant]').on('click', function() {
            $('.instant-box-clone .instant-content').removeAttr('data-deploy-instant');
            var data_card = $(this).data('deploy-instant');
            $('[data-instant="' + data_card + '"]').addClass('active-instant');
            $('.instant-box').animate({
                scrollTop: 0
            }, 0);
        });
        $('.instant-clone').remove('instant-hidden-large');
        $('.close-instant').on('click', function() {
            $('.instant-box-clone').removeClass('active-instant');
            return false;
        });
        
        //Progress Bar
        var progress_bar = $('.progress-bar');
        var progress_bar_wrapper = $('.progress-bar-wrapper');
        
        if (progress_bar.length > 0) {
            progress_bar_wrapper.each(function() {
                var progress_height = $(this).data('progress-height');
                var progress_border = $(this).data('progress-border');
                var progress_round = $(this).attr('data-progress-round');
                var progress_color = $(this).data('progress-bar-color');
                var progress_bg = $(this).data('progress-bar-background');
                var progress_complete = $(this).data('progress-complete');
                var progress_text_visible = $(this).attr('data-progress-text-visible');
                var progress_text_color = $(this).attr('data-progress-text-color');
                var progress_text_size = $(this).attr('data-progress-text-size');
                var progress_text_position = $(this).attr('data-progress-text-position');
                var progress_text_before = $(this).attr('data-progress-text-before');
                var progress_text_after = $(this).attr('data-progress-text-after');
                if (progress_round === 'true') {
                    $(this).find('.progress-bar').css({
                        'border-radius': progress_height
                    })
                    $(this).css({
                        'border-radius': progress_height
                    })
                }
                if (progress_text_visible === 'true') {
                    $(this).append('<em>' + progress_text_before + progress_complete + '%' + progress_text_after + '</em>')
                    $(this).find('em').css({
                        "color": progress_text_color,
                        "text-align": progress_text_position,
                        "font-size": progress_text_size + 'px',
                        "height": progress_height + 'px',
                        "line-height": progress_height + progress_border + 'px'
                    });
                }
                $(this).css({
                    "height": progress_height + progress_border,
                    "background-color": progress_bg,
                })
                $(this).find('.progress-bar').css({
                    "width": progress_complete + '%',
                    "height": progress_height - progress_border,
                    "background-color": progress_color,
                    "border-left-color": progress_bg,
                    "border-right-color": progress_bg,
                    "border-left-width": progress_border,
                    "border-right-width": progress_border,
                    "margin-top": progress_border,
                })
            });
        }

        //Countdown
        /*
function countdown(dateEnd) {
            var timer, years, days, hours, minutes, seconds;
            dateEnd = new Date(dateEnd);
            dateEnd = dateEnd.getTime();
            if (isNaN(dateEnd)) {
                return;
            }
            timer = setInterval(calculate, 1);

            function calculate() {
                var dateStart = new Date();
                var dateStart = new Date(dateStart.getUTCFullYear(), dateStart.getUTCMonth(), dateStart.getUTCDate(), dateStart.getUTCHours(), dateStart.getUTCMinutes(), dateStart.getUTCSeconds());
                var timeRemaining = parseInt((dateEnd - dateStart.getTime()) / 1000)
                if (timeRemaining >= 0) {
                    years = parseInt(timeRemaining / 31536000);
                    timeRemaining = (timeRemaining % 31536000);
                    days = parseInt(timeRemaining / 86400);
                    timeRemaining = (timeRemaining % 86400);
                    hours = parseInt(timeRemaining / 3600);
                    timeRemaining = (timeRemaining % 3600);
                    minutes = parseInt(timeRemaining / 60);
                    timeRemaining = (timeRemaining % 60);
                    seconds = parseInt(timeRemaining);
                    if ($('.countdown').length > 0) {
                        $(".countdown #years")[0].innerHTML = parseInt(years, 10);
                        $(".countdown #days")[0].innerHTML = parseInt(days, 10);
                        $(".countdown #hours")[0].innerHTML = ("0" + hours).slice(-2);
                        $(".countdown #minutes")[0].innerHTML = ("0" + minutes).slice(-2);
                        $(".countdown #seconds")[0].innerHTML = ("0" + seconds).slice(-2);
                    }
                } else {
                    return;
                }
            }

            function display(days, hours, minutes, seconds) {}
        }
        countdown('12/20/2018 1:00:00 PM');
        
        $('.show-map, .hide-map').on('click', function() {
            $('.map-full .cover-content').toggleClass('deactivate-map');
            $('.map-full .cover-overlay').toggleClass('deactivate-map');
            $('.map-but-1, .map-but-2').toggleClass('deactivate-map');
            $('.map-full .hide-map').toggleClass('activate-map');
        });
        $('[data-toggle-box]').on('click', function() {
            var toggle_box = $(this).data('toggle-box');
            if ($('#' + toggle_box).is(":visible")) {
                $('#' + toggle_box).slideUp(250);
            } else {
                $("[id^='box']").slideUp(250);
                $('#' + toggle_box).slideDown(250);
            }
        });
        $('.read-more-show').on('click', function() {
            $(this).hide();
            $(this).parent().parent().find('.read-more-box').show();
        });
*/
        
        //Share Links
        var share_link = "window.location.href;"
        $('.shareToFacebook').prop("href", "https://www.facebook.com/sharer/sharer.php?u=" + share_link)
        $('.shareToGooglePlus').prop("href", "https://plus.google.com/share?url=" + share_link)
        $('.shareToTwitter').prop("href", "https://twitter.com/home?status=" + share_link)
        $('.shareToLinkedIn').prop("href", "https://www.linkedin.com/sharing/share-offsite/?url=" + share_link)
        $('.shareToPinterest').prop("href", "https://pinterest.com/pin/create/button/?url=" + share_link)
        $('.shareToWhatsApp').prop("href", "whatsapp://send?text=" + share_link)
        $('.shareToMail').prop("href", "mailto:?body=" + share_link)
    }
    setTimeout(init_template, 0);
    $(function(){
		'use strict';
		var options = {
			prefetch: true,
			prefetchOn: 'mouseover',
			cacheLength: 100,
			scroll: true, 
			blacklist: '.default-link' && '.show-gallery',
			forms: 'contactForm',
			onStart: {
				duration:200, // Duration of our animation
				render: function ($container) {
				$container.addClass('is-exiting');// Add your CSS animation reversing class
					$('.page-change-preloader').addClass('show-change-preloader');
					return false;
				}
			},
			onReady: {
				duration: 50,
				render: function ($container, $newContent) {
					$container.removeClass('is-exiting');// Remove your CSS animation reversing class
					$container.html($newContent);// Inject the new content
					$('#page-build').remove();
					$('.page-change-preloader').addClass('show-change-preloader');		
				}
			},
			onAfter: function($container, $newContent) {
				setTimeout(init_template, 0)//Timeout required to properly initiate all JS Functions. 
				setTimeout(function(){
                    $('#page-transitions').removeClass('back-button-clicked');
				    $('.page-change-preloader').removeClass('show-change-preloader');	
				},150);
			}
      	};
      var smoothState = $('#page-transitions').smoothState(options).data('smoothState');
    });   
	$('body').append('<div class="page-change-preloader preloader-light hide-change-preloader"><div id="preload-spinner" class="spinner-red"></div></div>');
});





/*
$(function(){
var draw31 = $('.draw31');
	TweenMax.from(draw31, 10, {css:{top:"1", left:"-10"}, repeat:-1,yoyo:true, repeatDelay:0, ease: Power0.easeNone});

});






$(function(){
	var tl = new TimelineLite();
	var step1 = $(".draw21");
	var step2 = $(".draw22");
	var step5 = $("#step-4");
	var step6 = $("#step-6");
	
	
	// tl.from(step1, 3, {ease: Power0.easeNone, opacity:0, top:-10, delay:0});
	tl.from(step2, 1, {ease: Power0.easeNone, opacity:0,top:-10, delay:0});
	tl.from(step5, 0.5, {ease: Power0.easeNone, opacity:0,top:5, delay:0});
	tl.from(step6, 0.5, {ease: Power0.easeNone, opacity:0,top:5, delay:0});

});
*/


