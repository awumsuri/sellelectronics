//Site Style 1
$(function() {
    // Managed Scripts
    /*jshint eqnull:true */
/*!
 * jQuery Cookie Plugin v1.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function($, document) {

    var pluses = /\+/g;
    function raw(s) {
        return s;
    }
    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, ' '));
    }

    $.cookie = function(key, value, options) {

        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value == null)) {
            options = $.extend({}, $.cookie.defaults, options);

            if (value == null) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || $.cookie.defaults || {};
        var decode = options.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        for (var i = 0, parts; (parts = cookies[i] && cookies[i].split('=')); i++) {
            if (decode(parts.shift()) === key) {
                return decode(parts.join('='));
            }
        }
        return null;
    };

    $.cookie.defaults = {};

})(jQuery, document);
/*
 * jQuery Form Plugin
 * version: 2.17 (06-NOV-2008)
 * @requires jQuery v1.2.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id$
 */
;(function($) {

/*
    Usage Note:  
    -----------
    Do not use both ajaxSubmit and ajaxForm on the same form.  These
    functions are intended to be exclusive.  Use ajaxSubmit if you want
    to bind your own submit handler to the form.  For example,

    $(document).ready(function() {
        $('#myForm').bind('submit', function() {
            $(this).ajaxSubmit({
                target: '#output'
            });
            return false; // <-- important!
        });
    });

    Use ajaxForm when you want the plugin to manage all the event binding
    for you.  For example,

    $(document).ready(function() {
        $('#myForm').ajaxForm({
            target: '#output'
        });
    });
        
    When using ajaxForm, the ajaxSubmit function will be invoked for you
    at the appropriate time.  
*/

/**
 * ajaxSubmit() provides a mechanism for immediately submitting 
 * an HTML form using AJAX.
 */
$.fn.ajaxSubmit = function(options) {
    // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
    if (!this.length) {
        log('ajaxSubmit: skipping submit process - no element selected');
        return this;
    }

    if (typeof options == 'function')
        options = { success: options };

    options = $.extend({
        url:  this.attr('action') || window.location.toString(),
        type: this.attr('method') || 'GET'
    }, options || {});

    // hook for manipulating the form data before it is extracted;
    // convenient for use with rich editors like tinyMCE or FCKEditor
    var veto = {};
    this.trigger('form-pre-serialize', [this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
        return this;
    }

    // provide opportunity to alter form data before it is serialized
    if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSerialize callback');
        return this;
    }    
   
    var a = this.formToArray(options.semantic);
    if (options.data) {
        options.extraData = options.data;
        for (var n in options.data) {
          if(options.data[n] instanceof Array) {
            for (var k in options.data[n])
              a.push( { name: n, value: options.data[n][k] } )
          }  
          else
             a.push( { name: n, value: options.data[n] } );
        }
    }

    // give pre-submit callback an opportunity to abort the submit
    if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSubmit callback');
        return this;
    }    

    // fire vetoable 'validate' event
    this.trigger('form-submit-validate', [a, this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
        return this;
    }    

    var q = $.param(a);

    if (options.type.toUpperCase() == 'GET') {
        options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
        options.data = null;  // data is null for 'get'
    }
    else
        options.data = q; // data is the query string for 'post'

    var $form = this, callbacks = [];
    if (options.resetForm) callbacks.push(function() { $form.resetForm(); });
    if (options.clearForm) callbacks.push(function() { $form.clearForm(); });

    // perform a load on the target only if dataType is not provided
    if (!options.dataType && options.target) {
        var oldSuccess = options.success || function(){};
        callbacks.push(function(data) {
            $(options.target).html(data).each(oldSuccess, arguments);
        });
    }
    else if (options.success)
        callbacks.push(options.success);

    options.success = function(data, status) {
        for (var i=0, max=callbacks.length; i < max; i++)
            callbacks[i].apply(options, [data, status, $form]);
    };

    // are there files to upload?
    var files = $('input:file', this).fieldValue();
    var found = false;
    for (var j=0; j < files.length; j++)
        if (files[j])
            found = true;

    // options.iframe allows user to force iframe mode
   if (options.iframe || found) { 
       // hack to fix Safari hang (thanks to Tim Molendijk for this)
       // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
       if ($.browser.safari && options.closeKeepAlive)
           $.get(options.closeKeepAlive, fileUpload);
       else
           fileUpload();
       }
   else
       $.ajax(options);

    // fire 'notify' event
    this.trigger('form-submit-notify', [this, options]);
    return this;


    // private function for handling file uploads (hat tip to YAHOO!)
    function fileUpload() {
        var form = $form[0];
        
        if ($(':input[@name=submit]', form).length) {
            alert('Error: Form elements must not be named "submit".');
            return;
        }
        
        var opts = $.extend({}, $.ajaxSettings, options);
		var s = jQuery.extend(true, {}, $.extend(true, {}, $.ajaxSettings), opts);

        var id = 'jqFormIO' + (new Date().getTime());
        var $io = $('<iframe id="' + id + '" name="' + id + '" />');
        var io = $io[0];

        if ($.browser.msie || $.browser.opera) 
            io.src = 'javascript:false;document.write("");';
        $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });

        var xhr = { // mock object
            aborted: 0,
            responseText: null,
            responseXML: null,
            status: 0,
            statusText: 'n/a',
            getAllResponseHeaders: function() {},
            getResponseHeader: function() {},
            setRequestHeader: function() {},
            abort: function() { 
                this.aborted = 1; 
                $io.attr('src','about:blank'); // abort op in progress
            }
        };

        var g = opts.global;
        // trigger ajax global events so that activity/block indicators work like normal
        if (g && ! $.active++) $.event.trigger("ajaxStart");
        if (g) $.event.trigger("ajaxSend", [xhr, opts]);

		if (s.beforeSend && s.beforeSend(xhr, s) === false) {
			s.global && jQuery.active--;
			return;
        }
        if (xhr.aborted)
            return;
        
        var cbInvoked = 0;
        var timedOut = 0;

        // add submitting element to data if we know it
        var sub = form.clk;
        if (sub) {
            var n = sub.name;
            if (n && !sub.disabled) {
                options.extraData = options.extraData || {};
                options.extraData[n] = sub.value;
                if (sub.type == "image") {
                    options.extraData[name+'.x'] = form.clk_x;
                    options.extraData[name+'.y'] = form.clk_y;
                }
            }
        }

        // take a breath so that pending repaints get some cpu time before the upload starts
        setTimeout(function() {
            // make sure form attrs are set
            var t = $form.attr('target'), a = $form.attr('action');
            $form.attr({
                target:   id,
                method:   'POST',
                action:   opts.url
            });
            
            // ie borks in some cases when setting encoding
            if (! options.skipEncodingOverride) {
                $form.attr({
                    encoding: 'multipart/form-data',
                    enctype:  'multipart/form-data'
                });
            }

            // support timout
            if (opts.timeout)
                setTimeout(function() { timedOut = true; cb(); }, opts.timeout);

            // add "extra" data to form if provided in options
            var extraInputs = [];
            try {
                if (options.extraData)
                    for (var n in options.extraData)
                        extraInputs.push(
                            $('<input type="hidden" name="'+n+'" value="'+options.extraData[n]+'" />')
                                .appendTo(form)[0]);
            
                // add iframe to doc and submit the form
                $io.appendTo('body');
                io.attachEvent ? io.attachEvent('onload', cb) : io.addEventListener('load', cb, false);
                form.submit();
            }
            finally {
                // reset attrs and remove "extra" input elements
                $form.attr('action', a);
                t ? $form.attr('target', t) : $form.removeAttr('target');
                $(extraInputs).remove();
            }
        }, 10);

        function cb() {
            if (cbInvoked++) return;
            
            io.detachEvent ? io.detachEvent('onload', cb) : io.removeEventListener('load', cb, false);

            var operaHack = 0;
            var ok = true;
            try {
                if (timedOut) throw 'timeout';
                // extract the server response from the iframe
                var data, doc;

                doc = io.contentWindow ? io.contentWindow.document : io.contentDocument ? io.contentDocument : io.document;
                
                if (doc.body == null && !operaHack && $.browser.opera) {
                    // In Opera 9.2.x the iframe DOM is not always traversable when
                    // the onload callback fires so we give Opera 100ms to right itself
                    operaHack = 1;
                    cbInvoked--;
                    setTimeout(cb, 100);
                    return;
                }
                
                xhr.responseText = doc.body ? doc.body.innerHTML : null;
                xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                xhr.getResponseHeader = function(header){
                    var headers = {'content-type': opts.dataType};
                    return headers[header];
                };

                if (opts.dataType == 'json' || opts.dataType == 'script') {
                    var ta = doc.getElementsByTagName('textarea')[0];
                    xhr.responseText = ta ? ta.value : xhr.responseText;
                }
                else if (opts.dataType == 'xml' && !xhr.responseXML && xhr.responseText != null) {
                    xhr.responseXML = toXml(xhr.responseText);
                }
                data = $.httpData(xhr, opts.dataType);
            }
            catch(e){
                ok = false;
                $.handleError(opts, xhr, 'error', e);
            }

            // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
            if (ok) {
                opts.success(data, 'success');
                if (g) $.event.trigger("ajaxSuccess", [xhr, opts]);
            }
            if (g) $.event.trigger("ajaxComplete", [xhr, opts]);
            if (g && ! --$.active) $.event.trigger("ajaxStop");
            if (opts.complete) opts.complete(xhr, ok ? 'success' : 'error');

            // clean up
            setTimeout(function() {
                $io.remove();
                xhr.responseXML = null;
            }, 100);
        };

        function toXml(s, doc) {
            if (window.ActiveXObject) {
                doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.async = 'false';
                doc.loadXML(s);
            }
            else
                doc = (new DOMParser()).parseFromString(s, 'text/xml');
            return (doc && doc.documentElement && doc.documentElement.tagName != 'parsererror') ? doc : null;
        };
    };
};

/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *    is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *    used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */ 
$.fn.ajaxForm = function(options) {
    return this.ajaxFormUnbind().bind('submit.form-plugin',function() {
        $(this).ajaxSubmit(options);
        return false;
    }).each(function() {
        // store options in hash
        $(":submit,input:image", this).bind('click.form-plugin',function(e) {
            var form = this.form;
            form.clk = this;
            if (this.type == 'image') {
                if (e.offsetX != undefined) {
                    form.clk_x = e.offsetX;
                    form.clk_y = e.offsetY;
                } else if (typeof $.fn.offset == 'function') { // try to use dimensions plugin
                    var offset = $(this).offset();
                    form.clk_x = e.pageX - offset.left;
                    form.clk_y = e.pageY - offset.top;
                } else {
                    form.clk_x = e.pageX - this.offsetLeft;
                    form.clk_y = e.pageY - this.offsetTop;
                }
            }
            // clear form vars
            setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 10);
        });
    });
};

// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind = function() {
    this.unbind('submit.form-plugin');
    return this.each(function() {
        $(":submit,input:image", this).unbind('click.form-plugin');
    });

};

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic) {
    var a = [];
    if (this.length == 0) return a;

    var form = this[0];
    var els = semantic ? form.getElementsByTagName('*') : form.elements;
    if (!els) return a;
    for(var i=0, max=els.length; i < max; i++) {
        var el = els[i];
        var n = el.name;
        if (!n) continue;

        if (semantic && form.clk && el.type == "image") {
            // handle image inputs on the fly when semantic == true
            if(!el.disabled && form.clk == el)
                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
            continue;
        }

        var v = $.fieldValue(el, true);
        if (v && v.constructor == Array) {
            for(var j=0, jmax=v.length; j < jmax; j++)
                a.push({name: n, value: v[j]});
        }
        else if (v !== null && typeof v != 'undefined')
            a.push({name: n, value: v});
    }

    if (!semantic && form.clk) {
        // input type=='image' are not found in elements array! handle them here
        var inputs = form.getElementsByTagName("input");
        for(var i=0, max=inputs.length; i < max; i++) {
            var input = inputs[i];
            var n = input.name;
            if(n && !input.disabled && input.type == "image" && form.clk == input)
                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
        }
    }
    return a;
};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
    //hand off to jQuery.param for proper encoding
    return $.param(this.formToArray(semantic));
};

/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize = function(successful) {
    var a = [];
    this.each(function() {
        var n = this.name;
        if (!n) return;
        var v = $.fieldValue(this, successful);
        if (v && v.constructor == Array) {
            for (var i=0,max=v.length; i < max; i++)
                a.push({name: n, value: v[i]});
        }
        else if (v !== null && typeof v != 'undefined')
            a.push({name: this.name, value: v});
    });
    //hand off to jQuery.param for proper encoding
    return $.param(a);
};

/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *      <input name="A" type="text" />
 *      <input name="A" type="text" />
 *      <input name="B" type="checkbox" value="B1" />
 *      <input name="B" type="checkbox" value="B2"/>
 *      <input name="C" type="radio" value="C1" />
 *      <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $(':text').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $(':checkbox').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $(':radio').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *       array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue = function(successful) {
    for (var val=[], i=0, max=this.length; i < max; i++) {
        var el = this[i];
        var v = $.fieldValue(el, successful);
        if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length))
            continue;
        v.constructor == Array ? $.merge(val, v) : val.push(v);
    }
    return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
    if (typeof successful == 'undefined') successful = true;

    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
        (t == 'checkbox' || t == 'radio') && !el.checked ||
        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
        tag == 'select' && el.selectedIndex == -1))
            return null;

    if (tag == 'select') {
        var index = el.selectedIndex;
        if (index < 0) return null;
        var a = [], ops = el.options;
        var one = (t == 'select-one');
        var max = (one ? index+1 : ops.length);
        for(var i=(one ? index : 0); i < max; i++) {
            var op = ops[i];
            if (op.selected) {
                // extra pain for IE...
                var v = $.browser.msie && !(op.attributes['value'].specified) ? op.text : op.value;
                if (one) return v;
                a.push(v);
            }
        }
        return a;
    }
    return el.value;
};

/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm = function() {
    return this.each(function() {
        $('input,select,textarea', this).clearFields();
    });
};

/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function() {
    return this.each(function() {
        var t = this.type, tag = this.tagName.toLowerCase();
        if (t == 'text' || t == 'password' || tag == 'textarea')
            this.value = '';
        else if (t == 'checkbox' || t == 'radio')
            this.checked = false;
        else if (tag == 'select')
            this.selectedIndex = -1;
    });
};

/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm = function() {
    return this.each(function() {
        // guard against an input with the name of 'reset'
        // note that IE reports the reset function as an 'object'
        if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType))
            this.reset();
    });
};

/**
 * Enables or disables any matching elements.
 */
$.fn.enable = function(b) { 
    if (b == undefined) b = true;
    return this.each(function() { 
        this.disabled = !b 
    });
};

/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.selected = function(select) {
    if (select == undefined) select = true;
    return this.each(function() { 
        var t = this.type;
        if (t == 'checkbox' || t == 'radio')
            this.checked = select;
        else if (this.tagName.toLowerCase() == 'option') {
            var $sel = $(this).parent('select');
            if (select && $sel[0] && $sel[0].type == 'select-one') {
                // deselect all other options
                $sel.find('option').selected(false);
            }
            this.selected = select;
        }
    });
};

// helper fn for console logging
// set $.fn.ajaxSubmit.debug to true to enable debug logging
function log() {
    if ($.fn.ajaxSubmit.debug && window.console && window.console.log)
        window.console.log('[jquery.form] ' + Array.prototype.join.call(arguments,''));
};

})(jQuery);
var newsLetterSignup = {
    close_newsletter_signup: function() {
        $('#newsletter_signup').animate({height: 0}, 'slow'); 
    },

    show_newsletter_signup: function(box_height) {
        $('#newsletter_signup').animate({height: box_height}, 'slow');
    },

    init_newsletter_close: function($nl) {
        var $close_btn = $('#newsletter_signup a.close');
        if ($close_btn.length == 0){

            $close_btn = $('<a href="javascript:void(0)" class="close">Close</a>').click(function(){
                console.log('closing newsletter');
                $nl.addClass('closed');
                newsLetterSignup.refresh_newsletter_signup();
            });
            $('#newsletter_signup').append($close_btn);
        }
    },

    track_newsletter_event: function($nl, event_type){
    // track a javascript event with Google Analytics
        try { 
            // since we call refresh_newsletter_signup() multiple times,
            // make sure we're not accidentally double tracking an event
            if(!$nl.hasClass(event_type+'_tracked')) { 
                pageTracker._trackPageview("/newsletter/events/"+event_type+"/");
                $nl.addClass(event_type+'_tracked');
            }
        } catch(e) {}
    },

    refresh_newsletter_signup: function() {

        var box_height = 230,
            animation_speed = 2000;

        // Since we get a 'success' response on the ajax form regardless of 
        // whether there were form errors, we'll use use the existence of the form
        // to determine success/failure
        var $nl = $('#newsletter_signup');
        if ($nl.find('form').length == 0){
            $nl.addClass('success');
            $('<p class="success_message">Thank you for signing up!</p>').appendTo($nl);
        }
        else {
            if ($nl.find('form').hasClass('invalid')){ $nl.addClass('invalid'); }
        }
        newsLetterSignup.init_newsletter_close($nl);

        // ########## COOKIE/TRACKING ###########
        // add cookie if necessary
        if ($nl.hasClass('success')){
            $.cookie('hide_newsletter', 'signed up', {expires: 30});
            newsLetterSignup.track_newsletter_event($nl, 'success');
        }
        if ($nl.hasClass('closed')){
            $.cookie('hide_newsletter', 'closed', {expires: 1});
            newsLetterSignup.track_newsletter_event($nl, 'closed');
        }
        if ($nl.hasClass('invalid')){
            newsLetterSignup.track_newsletter_event($nl, 'invalid');
        }

        // ########## BOX DISPLAY/HIDING ###########
        // If there's a cookie to hide the box
        if ($.cookie('hide_newsletter')) {

            // hide the box after a delay if user just signed up
            if ($nl.hasClass('success')){
                window.setTimeout(function(){
                    newsLetterSignup.close_newsletter_signup();
                }, animation_speed);
            }
            // or hide the box immediately (user click close button)
            else {
                newsLetterSignup.close_newsletter_signup();
            }
        }
        // if there's no cookie, show the box
        else {
            newsLetterSignup.show_newsletter_signup(box_height);
        }

        // display initial placeholder
        var $email_field = $('#newsletter_signup #id_email');
        if ($email_field.length && $email_field.hasClass('initial')) {
            $email_field.focus(function() {
                $(this).removeClass('initial');
            });
        }

        // ########## FORM INITIALIZATION ###########
        // if there's a form, initialize it for ajax submission
        if (!$nl.hasClass('success')){
            $('#newsletter_signup form').ajaxForm({
                target: '#newsletter_signup',
                success: function(response, status, xhr){
                    newsLetterSignup.refresh_newsletter_signup();
                },
            }); 
        }
    }
}

$(function() {
    newsLetterSignup.refresh_newsletter_signup();
});
})
// Raw Scripts
WebCube.extend('stampdla', {
  /*
   *  method : function() { }
   *  WebCube.cloud.method()
   */

  lookbook : function(container, o) { 

    var controls = $(container).parents('#content').find('.controls');

    $(container).attr({'data-total':$(container).children().length, 'data-current':0 });

    $(container).children().each(function(k,v) {
        $(this).attr({'data-id':k});
    });

    $('.controls .next, .controls .previous').live('click', function(e) {
        e.preventDefault()
        var dc = parseInt($(container).attr('data-current')),
            dt = parseInt($(container).attr('data-total'));

        if (!$(this).hasClass('disabled')) {
          switch($(this).attr('class')) {
              case 'next':
                  dc = (dc < (dt-1)) ? dc+1 : 0;
                  break;
              case 'previous':
                  dc = (dc > 0) ? dc-1 : dt-1;
                  break;
          }
          $(container).attr({'data-current':dc });
          if (dc === 0) {
            $('.controls .previous').addClass('disabled');
          } else if (dc === dt-1) {
            $('.controls .next').addClass('disabled');
          } else {
            $('.controls a').removeClass('disabled');

          }
          $(container).animate({marginLeft:-dc*980}, 300);
          $('.page').removeClass('active');
        }


    }); 


    $('.controls .get_the_look, .controls .close').live('click', function() {
        var dc = $(container).attr('data-current');
        if (!$(container).find('.page[data-id="'+ dc +'"]').hasClass('active')) {
            $('.page').removeClass('active');
            $(container).find('.page[data-id="'+ dc +'"]').addClass('active');
            $('.get_the_look').addClass('hidden');
        } else {
            $('.page').removeClass('active');
        }
        return false; 
    }); 

    $('.page').hover(function() {
        if (!$('.page').hasClass('active')) {
            $(this).find('.get_the_look').removeClass('hidden'); 
        }
    }, function() {
        $(this).find('.get_the_look').addClass('hidden');
    });
        
  },

  lazyImages: function(force) {
    $('.when').each(function(k,v) {
      $(v).attr({'data-top': $(v).offset().top });
      if ((window.pageYOffset+window.innerHeight) > $(v).data('top') || force || window.pageYOffset == undefined) {
        if ($(v).attr('src') !== $(v).attr('data-src')) {
          $(v).attr('src', $(v).data('src'));
          $(v).addClass('loaded');
        }
      }
    });
  }
});



$(function() {
    var $body = $('body');

    WebCube.adjustContainer('#wrap, #footer');
    $(window).resize(function() { WebCube.adjustContainer('#wrap, #footer'); });

    // initCTAs being called in default.js
    //if ($body.hasClass('home')) {
    //    WebCube.initCTAs({selector:'.homepage_feature'});
    //}

    if ($body.hasClass('landing')) {
        WebCube.initCTAs({selector:'.landing_feature'});
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
    if ($body.hasClass('blog')) {
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
        if ($body.hasClass('blogentry_detail')) {
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
    if ($body.hasClass('news')) {
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
    if ($body.hasClass('press')) {

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
    if ($body.hasClass('gallery')) {
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
    if ($body.hasClass('videos')) {

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
                width:960,
                height:540
            });

            $('.description .caption').html($(this).parent().find('.caption').html());

            // social shares
            $('.description ul li').each(function(k,v) {
                $(this).find('a').attr({ 'href': share_links[$(this).attr('class')] });
            });

            return false;
        });

    if ($body.hasClass('video_detail')) {
        WebCube.embedVideo('.media_holder', $('.media_holder').data('webcube-video'), {
                width:960,
                height:540
            });
    }



        $('.thumbnails ul li:first a').trigger('click');
    }


    if ($body.hasClass('supportdocs') || $body.hasClass('infopages')) {
        WebCube.embedVideo('.media .video', '', {
            width:710,
            height:391,
            extra_params: '&autohide=1&rel=0&modestbranding=1'
        });
    }

    $('#nav_global_cart a').click(function() {
        if ($body.hasClass('cs_open')) {
            $('#cart_summary_wrap').slideUp();
            $body.removeClass('cs_open');
            $(this).parent().removeClass('active');
        } else {
            $body.addClass('cs_open');
            if (!$body.hasClass('cs_available')) {
                $body.addClass('cs_available');

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

    WebCube.catalog.getCartCount('#nav_global_cart');
    $('#nav_global_cart span').text($.JSONCookie("CART_ITEM_COUNT").count);
    // shop
    if ($body.hasClass('catalog')) {
        WebCube.catalog.requestInstockNotification('form[name="request_instock_notification"]');
    }

    // shop:category_detail
    if ($body.hasClass('catalog category')) {
        WebCube.catalog.graphicOptions();


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
    if ($body.hasClass('product_detail')) {
        WebCube.catalog.infoTabs('.information');
        //WebCube.gallery('#product', { marginRight:80 });

        $('.thumbnails ul li a').click(function(e) {
          e.preventDefault();
          if ($(this).parent().hasClass('video')) {
            WebCube.videoOverlay($(this).parent().data('webcube-video'), {
                width:640, 
                height:360, 
                extra_params:'&autoplay=1', 
                webcube_iframe:false, 
                video_url:$(this).parent().data('webcube-video') 
            });
          } else {
            $('#product .display img').attr('src', $(this).attr('href'));
            $('#product .display img').attr({'src' : $(this).attr('href')});
            $('#product .display a, #product #view_larger a').attr({'href': $(this).attr('data-full-size')});
            if ($('#product .display a').hasClass('cloud-zoom')) {
              // remove cloudzoom instance info
              $('.mousetrap').remove();
              // reactivate cloudzoom
              $('.cloud-zoom').CloudZoom();
            }

            $(this).parents('ul').find('li').removeClass('active');
            $(this).parent().addClass('active');
          }
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
/*
    // rma_order_detail
    if ($body.hasClass('rma_order_detail')) {
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
*/
    // accounts
    if ($body.hasClass('accounts')) {}

    if ($body.hasClass('add_stored_card')) {
        $('#id_bill_country').blur(function() {
            update_region_field('#id_bill_country','#id_bill_state', false) 
        });
        update_region_field('#id_bill_country','#id_bill_state', false);
    }

    // referrals 
    if ($body.hasClass('referrals')) {
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
    var $body = $('body');

    if ($body.hasClass('landing')) {
      var feature = {
        "width": $('.landing_feature .cta_item').width(), 
        "height": $('.landing_feature .cta_item').height()
      };
      
      windowInfo = function() {
        return {'width': $(window).width(), 'height': $(window).height() }
      }

      $('.landing_feature').css({ height: windowInfo().height});
      $('.landing_feature .cta_item').css({
        marginLeft: -feature.width*.5,
        marginTop: -feature.height*.5
      }).animate({'opacity': 1});

      $(window).resize(function() {
        $('.landing_feature').css({ height: windowInfo().height});
      });
    }

    if ($body.hasClass('catalog category')) {
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
        if($body.hasClass('fbtab')){
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
    if ($body.hasClass('locator')) {
        var lat = $body.data('webcube-lat') ? $body.data('webcube-lat') : 33,
            lng = $body.data('webcube-lng') ? $body.data('webcube-lng') : -117,
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

    if ($body.hasClass('shop_index')) {
      $('#product_nav').append('<div id="slider" />');
     
      $('#product_nav ul li a').click(function(e) {
        e.preventDefault();
        var data_cat = $(this).data('category');
        if (!$('#slider').is(':animated')) {
          $('#slider').animate({"margin-left":$(this).parent().position().left-55}, 500);
        }
        
        var data_cat = $(this).data('category');
        if (data_cat === 'all') {
          $('.column').removeClass('hidden');
        } else {
          //$('.column').not(".column[data-category='"+data_cat+"']").addClass('hidden');
          //$('.column[data-category="'+data_cat+'"]').removeClass('hidden');

          $('.column').each(function() {
            var cats = $(this).attr('data-categories').split(',');
            if ($.inArray(data_cat, cats) === -1) {
              $(this).addClass('hidden');
            } else {
              $(this).removeClass('hidden');
            }
          });

          WebCube.stampdla.lazyImages(true);
        }
        
        // if ($('html').hasClass('ie')) {
        //   WebCube.stampdla.lazyImages(true);
        // }
        
        // $('#product_nav li a').each(function(index, val) {
        //     if($(val).data('category') == 'selects') {
        //         $(val).addClass('ir');
        //     }
        // });
      });


      WebCube.stampdla.lazyImages();
      $(window).scroll(function() {
        WebCube.stampdla.lazyImages();
      });
    }
});
