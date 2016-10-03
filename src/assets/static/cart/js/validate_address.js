$(document).ready(function() {
    $('body').bind('step-updated', function(event, step, data) {
        if ($('#shipping_suggested_addresses').length) {
            $('.form_wrap > ul.errorlist li:contains("address did not validate")').remove(); // handled by address validation overlay
            WebCube.overlay($('#shipping_suggested_addresses'), {'id':'overlay_address_validation'}, function() {
                $('#shipping_suggested_addresses #row_address p').remove();
            });
            $('#shipping_suggested_addresses form').submit(WebCube.checkout.submit_step).submit(function() {
                //TODO close overlay
                $('.overlay .close').trigger('click');
                return false;
            });
        }
    });
});
