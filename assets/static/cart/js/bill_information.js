$(document).ready(function() {
    $('#id_preset_bill_address').live('change', WebCube.checkout.populate_step_from_preselection);
    $('#id_preset_bill_address_same_as_ship').live('click', function populate_step_from_checkbox() {
        var $this = $(this);
        if (!$this.is(':checked')) return;
        var step = $this.parents('.step:first');
        var attributes = $this[0].attributes;
        for (var i=0; i < attributes.length; i++) {
            if(attributes[i].name.indexOf("data-") == 0) {
                //console.log(step.find(':input'))
                
                target = step.find(':input[name="bill_'+attributes[i].name.substr(10)+'"]')
                target.val(unescape(attributes[i].value))
            }
        }
    });
    
    function bill_country_click() {
        update_region_field('#id_bill_country','#id_bill_state', false);
    }
    
    
    $('#id_bill_country').blur(bill_country_click);
    update_region_field('#id_bill_country','#id_bill_state', false);
    
    $('body').bind('cart_step_loaded', function(event, step) {
        if (step.find('#id_bill_country').length) {
           $('#id_bill_country').blur(bill_country_click);
           update_region_field('#id_bill_country','#id_bill_state', false);
           format_payment();
        }
    });
    
    function format_payment() {
        // STYLE CREDIT INFO
        credit_card_rows = [
            '#row_cc_type',
            '#row_cc_number',
            '#row_cc_exp',
            '#row_cc_ccv'
        ];
        
        $('#row_cc_ccv').after('<div id="cc_info"><h3>Secure Credit Card Payment</h3></div>');
        
        for (i in credit_card_rows) {
            $(credit_card_rows[i]).appendTo('#cc_info');
        }

        $('#row_cc_ccv p').append('<a class="whats_this" href="#">?<span id="show_ccv"></span></a>');
        $('.whats_this').click(function() { return false; });

        if ($('#row_reusable').length) {
            $('#row_reusable').appendTo('#cc_info');
        }

        var card_store_html = $('#row_card_store').html();
        $('#row_card_store').remove();
        $('#form_payment').prepend('<div id="row_card_store" class="row">'+ card_store_html +'</div>');
        $('#row_card_store label').text('Use an Existing Card:');
        $('#id_card_store').change(function() {
            if ($(this).val() !== '') {
                $('#form_payment > div, #form_payment > p').not('.submit_divide').hide();
                $(this).parents('.row').show();
                $(this).find('option').first().text('Add a new Card');
            } else {
                $(this).find('option').first().text('Select Card Store');
                $('#form_payment > div, #form_payment > p').show();
            }
        });

    }
});

