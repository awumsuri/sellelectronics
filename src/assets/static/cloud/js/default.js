WebCube.extend('cloud', {
    /*
     *  method : function() { }
     *  WebCube.cloud.method()
     */
});


$(function() {
    WebCube.adjustContainer('#wrap, #footer');
    $(window).resize(function() { WebCube.adjustContainer('#wrap, #footer'); });

    if ($('body').hasClass('home')) {
        if ($('#cta_key_homepage_feature').length === 0) {
            $('#hero').append([
                '<div class="init">',
                    '<h1>Welcome to Web Cube</h1>',
                    '<p>',
                        '<a href="'+ WebCube.settings.ADMIN_URL +'" class="button">Login</a> or ',
                        '<a href="'+ WebCube.settings.ADMIN_URL +'ctas/calltoaction/add/?key=homepage_feature" class="button">Add this Call To Action</a>',
                    '</p>',
                '</div>'].join(''));
        }
        WebCube.initCTAs({pager:true,selector:'.homepage_feature'});
    }

    $('#form_footer_newsletter').live('submit', function() {
        var selector = '#' + $(this).attr('id');
        WebCube.loader('add', selector);

        $.post($(this).attr('action'), $(this).serialize(), function(data) {
            var content = (data.errors) ? data.errors.email[0] : data.message;
            WebCube.loader('remove', selector);
            WebCube.overlay('<h3>'+ content +'</h3>');
        });

        return false;
    });


    $('.notification_success').fadeIn().delay(5000).slideUp();
    $('.notification_success .close').click(function() {
        $(this).parent().slideUp();
    });

    // CORE

    // BLOG
    if ($('body').hasClass('blog')) {
        WebCube.embedVideo('.media .video', '', {
            width:710,
            height:391,
            extra_params: '&autohide=1&rel=0&modestbranding=1'
        });

        $('.entry .email a').click(function() {
            WebCube.sendToFriend($(this).attr('href'));
            return false;
        });


        // blogentry
        if ($('body').hasClass('blogentry_detail')) {
            $('.reply_button').click(function() {
                $(this).addClass('hidden');
                $('.reply .form_holder').removeClass('hidden');
                return false;
            });

            WebCube.postComment('.reply .form_holder form', {
                comment_count: $('.comments .comment_count').text()
            });
        }
    }

    // NEWS
    if ($('body').hasClass('news')) {
        $('.email a, .share_services .e-mail a').click(function() {
            WebCube.sendToFriend($(this).attr('href'));
            return false;
        });

        WebCube.embedVideo('.video', '', {
            width:710,
            height:399
        });
    }

    // PRESS
    if ($('body').hasClass('press')) {

        $('.email a, .share_services .e-mail a').click(function() {
            WebCube.sendToFriend($(this).attr('href'));
            return false;
        });

        // TODO: Sort Order
        WebCube.scroller('.column_content .media', { show:1 });

        $('.media ul li.video a').click(function() {
             WebCube.videoOverlay($(this).parent().data('webcube-video'), {
                width:640,
                height:360,
                extra_params:'&autoplay=1'
            });
            return false;
        });
    }

    // gallery
    if ($('body').hasClass('gallery')) {
        $('.email a, .share_services .e-mail a').click(function() {
            WebCube.sendToFriend($(this).attr('href'));
            return false;
        });

        WebCube.gallery('.column_content', { show:5, marginRight:4 });
        $('.thumbnails ul li a').on('click', function(event) {
            var data = { 
                'title': $(this).find('.info').text(),
                'caption': $(this).parents('li').find('.caption').text()
            }, caption_html = (data.caption !== '') ? '<span class="caption">'+ data.caption +'</span>': '';
            $('.column_content .description p.info').html('<span class="title">'+ data.title +'</span>'+ caption_html);
        });
        $('#view_larger a').fancybox();
    }

    // VIDEOS
    if ($('body').hasClass('videos')) {

        WebCube.scroller('.thumbnails', { show:5, marginRight:2 });

        $('.description .share .email a').click(function() {
            WebCube.sendToFriend($(this).attr('href'));
            return false;
        });

        $('.thumbnails ul li a').click(function() {
            var domain = [window.location.protocol, '//', WebCube.settings.SITE_DOMAIN].join(''),
                share_links = {
                    'facebook': 'http://www.facebook.com/share.php?u='+ domain + $(this).attr('href'),
                    'twitter': 'http://twitter.com/home?status='+ $(this).find('.info').text() +' - '+ domain + $(this).attr('href'),
                    'email': '/send-to-friend/send-to-friend/?url='+ $(this).attr('href')
                };

            WebCube.embedVideo('.media_holder', $(this).data('webcube-video'), {
                width:710,
                height:399
            });

            $('.description .caption').html($(this).parent().find('.caption').html());

            // social shares
            $('.description ul li').each(function(k,v) {
                $(this).find('a').attr({ 'href': share_links[$(this).attr('class')] });
            });

            return false;
        });

	if ($('body').hasClass('video_detail')) {
	    WebCube.embedVideo('.media_holder', $('.media_holder').data('webcube-video'), {
                width:710,
                height:399
            });
	}



        $('.thumbnails ul li:first a').trigger('click');
    }


    if ($('body').hasClass('supportdocs') || $('body').hasClass('infopages')) {
        WebCube.embedVideo('.media .video', '', {
            width:710,
            height:391,
            extra_params: '&autohide=1&rel=0&modestbranding=1'
        });
    }

    $('#nav_cart a').click(function() {
        if ($('body').hasClass('cs_open')) {
            $('#cart_summary_wrap').slideUp();
            $('body').removeClass('cs_open');
            $(this).parent().removeClass('active');
        } else {
            $('body').addClass('cs_open');
            if (!$('body').hasClass('cs_available')) {
                $('body').addClass('cs_available');

                var cart_summary_html = [
                    '<div id="cart_summary_wrap">',
                        '<div class="position">',
                            '<div id="cart_summary" class="container"></div>',
                        '</div>',
                    '</div>'
                ];

                $('#global').before(cart_summary_html.join(''));
            }
            $('#cart_summary_wrap').slideUp();
            WebCube.catalog.cartSummary('#cart_summary');
            $(this).parent().addClass('active');
        }
        return false;
    });

    // ----------------------------------------------------------------------
    // SIMPLECART

    WebCube.catalog.getCartCount();
    // shop
    if ($('body').hasClass('catalog')) {
        WebCube.catalog.recentlyViewed('render', '#recently_viewed');
        WebCube.catalog.requestInstockNotification('form[name="request_instock_notification"]');
    }

    // shop:category_detail
    if ($('body').hasClass('catalog category')) {
        WebCube.catalog.graphicOptions();

        if (!$('body').hasClass('fbtab')) {
            WebCube.catalog.recentlyViewed('category',{
                'name': category_name,
                'url': window.location.pathname
            });
        }

        if ($('#product_list').hasClass('lookbook')) {
            WebCube.scroller('#product_list', {
                show: 1,
                margin: { right: 0 },
                scroll_type: 'lookbook',
                offset: 1.66
            });
        }

        WebCube.catalog.products('div.item[itemtype="http://schema.org/Product"]:has(script[type="application/json"][data-type="product"])');
    }

    // shop:product_detail
    if ($('body').hasClass('product_detail')) {
        WebCube.catalog.recentlyViewed('product', {
            'name':$('#product_name').text(),
            'url':window.location.pathname,
            'thumb':$('.media .thumbnails ul li:first img').attr('src'),
            'price':$('.price').html()
        });

        WebCube.catalog.infoTabs('.information');
        WebCube.gallery('.media');

        $('.media .thumbnails ul li.video a').click(function() {
            WebCube.videoOverlay($(this).parent().data('webcube-video'), {
                width:640, 
                height:360, 
                extra_params:'&autoplay=1', 
                webcube_iframe:false, 
                video_url:$(this).parent().data('webcube-video') 
            });
        });

        WebCube.catalog.products('div[itemtype="http://schema.org/Product"]:has(script[type="application/json"][data-type="product"])')

        $('#write_review_button a').click(function() {
            if ($('#write_review_form').hasClass('active')) {
                $(this).text('Write A Review');
                $('#write_review_form').removeClass('active');
            } else {
                $(this).text('Cancel Review');
                $('#write_review_form').addClass('active');
            }
            return false;
        });

        $('#write_review_form form').live('submit', function() {
            $.post($(this).attr('action'), $(this).serialize(), function(data) {
                $('#write_review_form').html(data);
                WebCube.catalog.ratings_form('#write_review_form form');

            });

            return false;
        });

        WebCube.catalog.ratings_form('#write_review_form form');

        $('#view_larger a, a.cloud-zoom').fancybox({
            overlayColor: '#000',
            overlayOpacity:'0.9',
            centerOnScroll: true,
            titleShow: false,
            padding:0
        });

        // send to friend

        $('.send_to_friend a').click(function() {
            WebCube.sendToFriend($(this).attr('href'));
            return false;
        });
    }

    // rma_order_detail
    if ($('body').hasClass('rma_order_detail')) {
        $('#form_rma_order ul li .options a').click(function() {
            if ($(this).parents('li').hasClass('selected')) {
                $(this).find('.text').text($(this).data('select'));
                $(this).parents('li').removeClass('selected');
                $(this).parents('li').find('input[name="'+ $(this).parents('li').attr('id') +'-checked"]').val(0);
            } else {
                $(this).find('.text').text($(this).data('remove'));
                $(this).parents('li').addClass('selected');
                $(this).parents('li').find('input[name="'+ $(this).parents('li').attr('id') +'-checked"]').val(1);
            }
            return false;
        });
    }

    // accounts
    if ($('body').hasClass('accounts')) {}

    if ($('body').hasClass('add_stored_card')) {
        $('#id_bill_country').blur(function() {
            update_region_field('#id_bill_country','#id_bill_state', false) 
        });
        update_region_field('#id_bill_country','#id_bill_state', false);
    }

    // referrals 
    if ($('body').hasClass('referrals')) {
        $('#email_friend').submit(function() {
            var $this = $(this);
            $.post($this.attr('action'), $this.serialize(), function(data) {
                $this.find('ul.errorlist').remove();
                var json = $.parseJSON(data);
                if (json.errors) { 
                    if(json.errors['friends_email']) {
                        $('#id_friends_email').parents('.row').addClass('error').append('<ul class="errorlist"><li>'+ json.errors['friends_email'] +'</li></ul>');
                    }
                    if(json.errors['message']) {
                        $('#id_message').parents('.row').addClass('error').append('<ul class="errorlist"><li>'+ json.errors['message'] +'</li></ul>');
                    }
                } else { 
                    var count = ($('#id_friends_email').val().indexOf(',') == -1) ? 'referral has' : 'referrals have';
                    WebCube.overlay('<h3>Your '+ count +' been sent!</h3>'); 
                    $this.find('input[type="text"], textarea').attr({'value':''});
                }
            });
            return false;
        });
        $('.user_select').on('click', function() { $(this).select(); });
    }
});

$(window).one('load', function() {

    //if ($('body').hasClass('home')) {
    //    WebCube.cloud.addControls('#cta_key_homepage_feature');
    //}

    if ($('body').hasClass('catalog category')) {
        if (!$('#product_list').hasClass('list')) {

            $('#product_list .row').each(function(k,v) {
                var heights = [];
                $(v).find('.item .thumb img').each(function(k,v) {
                    heights.push($(v).height());
                });

                $(v).find('.item .thumb').css({'height': WebCube.getMaxInArray(heights)});
            });

        }

        // Facebook Special Pages
        if($('body').hasClass('fbtab')){
            $('#product_list .item').each(function(){
                var $item = $(this),
                    $url = $item.find('a.product_url');
                $item.data('quickshop-url', $url.attr('href'));
            });

            WebCube.catalog.buyNow();

            // Open product links in a new window
            $('#product_list .thumb a, #product_list a.product_url, .quick_shop a').each(function(){
                $(this).attr('target', '_blank');
            });
        } else {
            WebCube.catalog.quickShop();
        }

    }

    // dealer locator
    if ($('body').hasClass('locator')) {
        var lat = $('body').data('webcube-lat') ? $('body').data('webcube-lat') : 33,
            lng = $('body').data('webcube-lng') ? $('body').data('webcube-lng') : -117,
            map = WebCube.maps.setBackend(WebCube.settings.maps.backend);

        map.mapId = 'map_holder';
        map.icon = WebCube.settings.maps.icon;
        map.styles = WebCube.settings.maps.styles;
        if (lat) {
            map.init(lat, lng, 'results');
        } else {
            map.init(lat, lng);
        }

        $('form#form_find_dealer').submit(function() {
            map.geocode();
            return false;
        });
    }
});