function update_region_field(src, dest, clear) {
    if (!$(src).val()) {
        return;
    }
    $.getJSON('/countries/ajax/region-codes/'+$(src).val()+'/', function(json) {
        var parent = $(dest)//.parent();
        var value = $(dest).val()
        var attributes = $(dest)[0].attributes;
        var stored = new Array(attributes.length);

        // store field attributes so we can restore them
        for (var index in attributes) {
            var attribute = attributes[index];
            if (attribute.nodeName == 'type') {
                continue;
            }
            if (index == 'length') {
                break; //weird bug?
            }
            if (attribute.nodeName.search('jQuery') != -1) { // fix for IE8
                continue;
            }
            var arr = new Array(2);
            arr[0] = attribute.nodeName;
            arr[1] = attribute.nodeValue;
            stored[index] = arr;
        }

        var child_text = '';
        if (json.type == 'text') {
            child_text = '<input type="text" id="'+dest.substring(1)+'" name="'+dest.substring(4)+'"/>';
        }
        else {
            child_text = '<select id="'+dest.substring(1)+'" name="'+dest.substring(4)+'">'+json.html+'</select>';
        }
        parent.replaceWith(child_text);
        
        // restore field attributes
        for (var index in stored) {
            var attribute = stored[index];
            $(dest).attr(attribute[0], attribute[1]);
        }
        if (!clear) {
            $(dest).val(value);
        }
    });
}
