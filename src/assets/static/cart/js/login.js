$(document).ready(function() {
    $('.checkout_as a').live('click', function() {
        WebCube.checkout.skip_current_step();
    });
});
