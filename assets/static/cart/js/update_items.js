$(document).ready(function() {
    var kuInt;
    
    $('body').bind('cart_step_loaded', function(event, step) {
        if (step.attr('data-key') == 'update-items') {
            $('.page_header').text('Shopping Cart');
            
            function refresh_basket($this, callback) {
                clearTimeout(kuInt);
                var qName = $this.attr('name');
                if ($this.val() !== '' && !isNaN($this.val())) {
                    kuInt = setTimeout(function() {
                        $('.step[data-key="update-items"]').addClass('processing');
                        $.post($('#basket_table').attr('action'), $('#basket_table').serialize(), function(data) {
                            clearTimeout(kuInt);
                            WebCube.checkout.process_step_response(step, data)
                            if (typeof callback === 'function') {
                                callback();
                            }
                        }); 
                    }, 1000);
                }
            }
            
            function init_listeners() {
                clearTimeout(kuInt);
               
                $('.row:not(.managed) .cart_basket_table_quantity .quantity').keyup(function() {
                    var $this = $(this);
                    refresh_basket($this, function() {
                        $('input.quantity[name="'+ $this.attr('name') +'"]').focus();
                        if (WebCube.settings.CATALOG_URLS.cart_upsells) display_upsell();
                    });
                });
                
                $('.row:not(.managed) .cart_basket_table_remove .remove').click(function() {
                    $(this).parent().find('input').attr({'value':'true'});
                    $('#basket_table').submit();
                    
                    return false;
                });
            }
            init_listeners();
        } else {
            $('.page_header').text('Checkout');
        }
    });
});

