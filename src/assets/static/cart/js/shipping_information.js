$(document).ready(function() {
    $('#id_preset_ship_address').live('change', WebCube.checkout.populate_step_from_preselection); //clicks work, blur does not for live
    function ship_country_click() {
        update_region_field('#id_ship_country','#id_ship_state', false);
    }
    
    $('#id_ship_country').change(ship_country_click);
    update_region_field('#id_ship_country','#id_ship_state', false);
    
    $('body').bind('cart_step_loaded', function(event, step) {
        if (step.find('#id_ship_country').length) {
            $('#id_ship_country').change(ship_country_click);
            update_region_field('#id_ship_country','#id_ship_state', false);
        }
    });
});

