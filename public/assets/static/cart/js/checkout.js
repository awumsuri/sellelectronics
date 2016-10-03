WebCube.extend('checkout', {
    post: function(url, data, success) {
        $.ajax({
            url: url,
            data: data,
            type: 'POST',
            success: success,
            error: function(jqXHR, textStatus, errorThrown) {
                alert('There was an error processing your request');
                window.location.reload(true);
            }
        });
    },
    
    getJSON: function(url, success) {
        $.ajax({
            url: url,
            dataType: 'json',
            success: success,
            error: function(jqXHR, textStatus, errorThrown) {
                alert('There was an error processing your request');
                window.location.reload(true);
            }
        });
    },
    
    redirect_to: function(url) {
        var location = window.location;
        if (url.search('http://') == 0 ||
            url.search('https://') == 0 ) {
            window.location = url;
        } else {
            window.location = location.protocol + '//' + location.host + url;
        }
        return;
    },
    
    update_step_numbers: function() {
        $('.step:visible').each(function(count) {
            $(this).find('.number').text(count+1);
        });
    },
   
    update_step_states: function(step_summary_info){
        for(var i=0;i<step_summary_info.length;i++){
            var step = step_summary_info[i];
            var $step = $('.step[data-key="'+step.key+'"]');
            $step.toggleClass("active_step",step.is_active);
            $step.toggleClass("accessible_step",step.is_accessible);
            $step.toggleClass("complete_step",step.is_complete);
            $step.toggleClass("skippable_step",step.is_skippable);
            $step.toggleClass("skipped_step", (step.status == 'skipped'));
        }
    },
 
    process_step_response: function(step, data) {
        //console.log("Processing Step Response for "+step.attr("data-key"));
        //console.log(data);
        if(data.step_summary_info != undefined){ // Why would this be undefined?
            WebCube.checkout.update_step_states(data.step_summary_info);
        }

        $('.step.current').not(step).removeClass('current');
        step.addClass('current');
        
        $('.api span').text($('.step.current').attr('data-key'));

        var step_digest = step.find('.step_digest');
        var step_body = step.find('.step_body');
       
        if (data.checkout_success) {
            return WebCube.checkout.redirect_to(data.checkout_success);
        }

        if (data.cart_summary) {
            $('#basket_summary').html(data.cart_summary);
        }

        if (data.digest_html) {
            step_digest.html(data.digest_html);
            step_digest.slideDown(500);
            //signal digest
            try {
                $('body').trigger('cart_digest_loaded', [step, data]);
            } catch (exception) {
                WebCube.log(exception);
            }
        }
        if (data.step_html) {
            step_body.html(data.step_html);
            step_body.find('form').submit(WebCube.checkout.submit_step);
            step_body.slideDown(500);
            step_digest.slideUp(500);
            
            WebCube.checkout.signal_step(step, data);
            
        }
        if (data.next_step) {
            step.removeClass('current');
            step_body.slideUp(500);
            if (step.hasClass('standalone') && data.next) {
                return WebCube.checkout.redirect_to(data.next);
            }
            var next_step = $('.step[data-key="'+data.next_step+'"]');
            if (!next_step.length) {
                //TODO refresh
            }
            if (!data.next_step_html) {
                WebCube.checkout.getJSON(next_step.attr('data-submit-url'), function(next_data) {
                    return WebCube.checkout.process_step_response(next_step, next_data);
                });
            } else {
                return WebCube.checkout.process_step_response(next_step, {'step_html':data.next_step_html});
            }
        }
        if (data.next) {
            return WebCube.checkout.redirect_to(data.next)
        }
        if (data.errors && !data.step_html && !data.digest_html && !data.next_step) {
            alert(data.errors[0])
        }
        WebCube.checkout.update_step_numbers();

        WebCube.loader('remove', '.step.processing .submit_divide');
        $('.step').removeClass('processing');
        $(':input').removeAttr('disabled');
        $('body').trigger('step-updated', [step, data])
    },
    
    signal_step: function(step, data) {
        var classes = $('body').attr('class').split(' ');
        for (var cindex in classes) {
            cls = classes[cindex]
            if (cls.search('current_step_') == 0) {
                $('body').removeClass(cls)
            }
        }
        $('body').addClass('current_step_' + $('.step.current').attr('data-key'));
        
        //signal step_html
        try {
            $('body').trigger('cart_step_loaded', [step, data])
        } catch (exception) {
            WebCube.log(exception)
        }
    },
     
    skip_current_step: function() {
        var step = $('.step.current'),
            post_data = {'skip_to_next': 'true'};

        post_data['csrfmiddlewaretoken'] = step.find(':input[name="csrfmiddlewaretoken"]').val();
        WebCube.checkout.post(step.attr('data-submit-url'), post_data, function(data) {
            WebCube.checkout.process_step_response(step, data);
        });
    },
  
    submit_step: function(aform) {
        if (aform && aform.currentTarget) {
            aform = aform.currentTarget;
        }
        aform = $(aform) || $(this);
        if (aform.parents('.unmanaged_form').length) return true;
        var $step = aform.parents('.step');
        if (!$step.length) { //unable to locate step, default to current step
            $step = $('.step.current');
        }

        $('.step.current').addClass('processing');
        WebCube.loader('remove', '.step.processing .submit_divide'); 
        WebCube.loader('add', '.step.processing .submit_divide');
        //WebCube.loader('add', '.step.processing .submit_divide');

        $('.step.processing input[type="submit"], .step.processing button[type="submit"]').attr({'disabled':true});


        var url = $step.attr('data-submit-url') || aform.attr('action');
        WebCube.checkout.post(url, aform.serialize(), function(data, textStatus, jqXHR) {
            WebCube.checkout.process_step_response($step, data);
        }, 'json');
        return false;
    },
   
    first_run: true,  

    select_step: function(key) {
        if (key === 'update-items' && this.first_run === true) { 
            this.first_run = false;
        } else { 
            var current_step = $('.step.current');
            current_step.removeClass('current');
            current_step.find('.step_body').slideUp(500);
            
            //TODO what about digest?
            var step = $('.step[data-key="'+key+'"]');
            if (step.hasClass('current')) {
                return;
            }

            WebCube.checkout.getJSON(step.attr('data-submit-url'), function(data) {
                WebCube.checkout.process_step_response(step, data);
            });
        } 
    },
    
    populate_step_from_preselection: function() {
        var $this = $(this);
        var step = $this.parents('.step:first');
        var attributes = $this.find(':selected')[0].attributes;
        for (var i=0; i < attributes.length; i++) {
            if(attributes[i].name.indexOf("data-") == 0) {
                target = step.find(':input[name="'+attributes[i].name.substr(5)+'"]');
                target.val(unescape(attributes[i].value));
            }
        }
    },
    
    populate_step_from_checkbox: function() {
        var $this = $(this);
        var step = $this.parents('.step:first');
        var attributes = $this[0].attributes;
        for (var i=0; i < attributes.length; i++) {
            if(attributes[i].name.indexOf("data-") == 0) {
                //console.log(step.find(':input'))
                
                target = step.find(':input[name="'+attributes[i].name.substr(5)+'"]');
                target.val(unescape(attributes[i].value));
            }
        }
    },
    
    cart_review_or_checkout: function(step) {
        WebCube.checkout.signal_step($('.step[data-key="'+step+'"]'));
        WebCube.checkout.select_step('update-items');
    }
});

$(function() {

    // add loader to paypal button after click
    $('#step_review .unmanaged_form form input[type="image"]').live('click', function() {
       $('#step_review').addClass('processing');
       WebCube.loader('add', '#step_review .unmanaged_form');
    });

    $('.back_to_cart a').live('click', function() {
        $('.column_nav').css('height', 'auto');
        $('#summary_wrap').removeClass('fixedNav').removeClass('hitBottom');
        WebCube.checkout.select_step('update-items');
        return false;
    });

    $('.step form').live('submit', WebCube.checkout.submit_step);
    $('.step_edit a').live('click', function() {
        var key = $(this).parents('.step:first').attr('data-key');
        WebCube.checkout.select_step(key);
        return false;
    });
    
    WebCube.checkout.update_step_numbers();

    if ($('.column_nav').length) {
        
        var summary = {
            "offset": $('#summary_wrap').offset().top,
            "footer_height": $('#footer').height()
        };

        $(window).scroll(function(e) {

            summary['height'] = $('#summary_wrap').height();
            summary['content_height'] = $('#content').height()-$('#content').offset().top;

            $('.column_nav').height($('.column_content').height());

            var pOffset = ($.browser.msie) ? document.documentElement.scrollTop : e.currentTarget.pageYOffset,
                fOffset = $('#footer').offset().top;

            if (!$('body').hasClass('current_step_update-items')) {
                if ($('#summary_wrap').hasClass('fixedNav')) {
                    if ((pOffset+20) <= summary['offset']) {
                        $('#summary_wrap').removeClass('fixedNav').removeClass('pinBottom');
                    } 

                    if((pOffset+summary.height)+50 >= fOffset) {
                        $('#summary_wrap').removeClass('fixedNav').addClass('pinBottom');
                    }
                } else {
                    if((pOffset+summary.height)+50 >= fOffset) {
                        $('#summary_wrap').removeClass('fixedNav').addClass('pinBottom');
                    } else if ($(window).height() > $('#summary_wrap').height()) {
                        if ((pOffset+20) > summary['offset']) {
                            $('#summary_wrap').addClass('fixedNav').removeClass('pinBottom');
                        }
                    }
                }
            } else {
               $('#summary_wrap').removeClass('fixedNav pinBottom');
            }

        }); // eo window scroll
    }


});

