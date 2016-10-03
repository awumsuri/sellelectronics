function format_payment_tabs() {
    // payment_method
    var selector = 'method',
        lis = '',
        len = $('#id_'+ selector).children().length,
        input_name = $('#id_'+selector).attr('name');
    
    if ($('#id_method').data('tabsloaded')) return;
    $('#id_method').data('tabsloaded', true);
    
    var current_value = $('#id_' + selector).val();
    if($('#id_' + selector + ' option').length>1){
        $('#id_' + selector + ' option').each(function(k,v) {
            lis += '<p class="'+ ((k == (len-1)) ? 'column_last' : 'column') +'"><a href="#" id="id_'+ $(v).val() +'" data-method="'+ $(v).val() +'"><span>'+ $(v).text() +'</span></a></p>';
        });
    }else{
        $('#row_method').hide();
    }

    var content = '<input type="hidden" name="'+ input_name +'" /><div id="payment_methods" class="column'+ len +'">'+ lis +'</div>';
    $('#row_' + selector).after(content);
    $('#row_' + selector).remove();
    
    if (current_value) {
        $('#payment_methods p a[data-method="'+current_value+'"]').parent().addClass('active');
    }
    $('#payment_methods p a').click(function() {
        $('input[name="'+ input_name +'"]').val($(this).attr('data-method'));
        WebCube.checkout.submit_step('#form_payment_step');
        return false;
    });
}

$(function() {
//    Are these necessary?
//-------------------------
//    format_payment_tabs();
    
    $('body').bind('cart_step_loaded', function(event, step) {
        format_payment_tabs();

//        if (step.find('#id_method').length) {
//            format_payment_tabs();
//        }
    });
});

