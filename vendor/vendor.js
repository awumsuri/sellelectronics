/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1||b[0]>3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){if(a(b.target).is(this))return b.handleObj.handler.apply(this,arguments)}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.7",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a("#"===f?[]:f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.7",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c).prop(c,!0)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c).prop(c,!1))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target).closest(".btn");b.call(d,"toggle"),a(c.target).is('input[type="radio"], input[type="checkbox"]')||(c.preventDefault(),d.is("input,button")?d.trigger("focus"):d.find("input:visible,button:visible").first().trigger("focus"))}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.7",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));if(!(a>this.$items.length-1||a<0))return this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){if(!this.sliding)return this.slide("next")},c.prototype.prev=function(){if(!this.sliding)return this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.7",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",f)))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.7",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger(a.Event("shown.bs.dropdown",h))}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.7",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){document===a.target||this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;!e&&/destroy|hide/.test(b)||(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.7",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);if(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),!c.isInStateTrue())return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element&&e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);if(this.$element.trigger(g),!g.isDefaultPrevented())return f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=window.SVGElement&&c instanceof window.SVGElement,g=d?{top:0,left:0}:f?null:b.offset(),h={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},i=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,h,i,g)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null,a.$element=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;!e&&/destroy|hide/.test(b)||(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.7",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.7",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){
this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.7",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.7",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return e<c&&"top";if("bottom"==this.affixed)return null!=c?!(e+this.unpin<=f.top)&&"bottom":!(e+g<=a-d)&&"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&e<=c?"top":null!=d&&i+j>=a-d&&"bottom"},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
;
;
var Zone$1 = (function (global) {
    if (global.Zone) {
        throw new Error('Zone already loaded.');
    }
    var Zone = (function () {
        function Zone(parent, zoneSpec) {
            this._properties = null;
            this._parent = parent;
            this._name = zoneSpec ? zoneSpec.name || 'unnamed' : '<root>';
            this._properties = zoneSpec && zoneSpec.properties || {};
            this._zoneDelegate = new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
        }
        Zone.assertZonePatched = function () {
            if (global.Promise !== ZoneAwarePromise) {
                throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` " +
                    "has been overwritten.\n" +
                    "Most likely cause is that a Promise polyfill has been loaded " +
                    "after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. " +
                    "If you must load one, do so before loading zone.js.)");
            }
        };
        Object.defineProperty(Zone, "current", {
            get: function () { return _currentZone; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Zone, "currentTask", {
            get: function () { return _currentTask; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Zone.prototype, "parent", {
            get: function () { return this._parent; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Zone.prototype, "name", {
            get: function () { return this._name; },
            enumerable: true,
            configurable: true
        });
        ;
        Zone.prototype.get = function (key) {
            var zone = this.getZoneWith(key);
            if (zone)
                return zone._properties[key];
        };
        Zone.prototype.getZoneWith = function (key) {
            var current = this;
            while (current) {
                if (current._properties.hasOwnProperty(key)) {
                    return current;
                }
                current = current._parent;
            }
            return null;
        };
        Zone.prototype.fork = function (zoneSpec) {
            if (!zoneSpec)
                throw new Error('ZoneSpec required!');
            return this._zoneDelegate.fork(this, zoneSpec);
        };
        Zone.prototype.wrap = function (callback, source) {
            if (typeof callback !== 'function') {
                throw new Error('Expecting function got: ' + callback);
            }
            var _callback = this._zoneDelegate.intercept(this, callback, source);
            var zone = this;
            return function () {
                return zone.runGuarded(_callback, this, arguments, source);
            };
        };
        Zone.prototype.run = function (callback, applyThis, applyArgs, source) {
            if (applyThis === void 0) { applyThis = null; }
            if (applyArgs === void 0) { applyArgs = null; }
            if (source === void 0) { source = null; }
            var oldZone = _currentZone;
            _currentZone = this;
            try {
                return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
            }
            finally {
                _currentZone = oldZone;
            }
        };
        Zone.prototype.runGuarded = function (callback, applyThis, applyArgs, source) {
            if (applyThis === void 0) { applyThis = null; }
            if (applyArgs === void 0) { applyArgs = null; }
            if (source === void 0) { source = null; }
            var oldZone = _currentZone;
            _currentZone = this;
            try {
                try {
                    return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                _currentZone = oldZone;
            }
        };
        Zone.prototype.runTask = function (task, applyThis, applyArgs) {
            task.runCount++;
            if (task.zone != this)
                throw new Error('A task can only be run in the zone which created it! (Creation: ' +
                    task.zone.name + '; Execution: ' + this.name + ')');
            var previousTask = _currentTask;
            _currentTask = task;
            var oldZone = _currentZone;
            _currentZone = this;
            try {
                if (task.type == 'macroTask' && task.data && !task.data.isPeriodic) {
                    task.cancelFn = null;
                }
                try {
                    return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                _currentZone = oldZone;
                _currentTask = previousTask;
            }
        };
        Zone.prototype.scheduleMicroTask = function (source, callback, data, customSchedule) {
            return this._zoneDelegate.scheduleTask(this, new ZoneTask('microTask', this, source, callback, data, customSchedule, null));
        };
        Zone.prototype.scheduleMacroTask = function (source, callback, data, customSchedule, customCancel) {
            return this._zoneDelegate.scheduleTask(this, new ZoneTask('macroTask', this, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.scheduleEventTask = function (source, callback, data, customSchedule, customCancel) {
            return this._zoneDelegate.scheduleTask(this, new ZoneTask('eventTask', this, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.cancelTask = function (task) {
            var value = this._zoneDelegate.cancelTask(this, task);
            task.runCount = -1;
            task.cancelFn = null;
            return value;
        };
        Zone.__symbol__ = __symbol__;
        return Zone;
    }());
    ;
    var ZoneDelegate = (function () {
        function ZoneDelegate(zone, parentDelegate, zoneSpec) {
            this._taskCounts = { microTask: 0, macroTask: 0, eventTask: 0 };
            this.zone = zone;
            this._parentDelegate = parentDelegate;
            this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
            this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
            this._interceptZS = zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
            this._interceptDlgt = zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
            this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
            this._invokeDlgt = zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
            this._handleErrorZS = zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
            this._handleErrorDlgt = zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
            this._scheduleTaskZS = zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
            this._scheduleTaskDlgt = zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
            this._invokeTaskZS = zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
            this._invokeTaskDlgt = zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
            this._cancelTaskZS = zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
            this._cancelTaskDlgt = zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
            this._hasTaskZS = zoneSpec && (zoneSpec.onHasTask ? zoneSpec : parentDelegate._hasTaskZS);
            this._hasTaskDlgt = zoneSpec && (zoneSpec.onHasTask ? parentDelegate : parentDelegate._hasTaskDlgt);
        }
        ZoneDelegate.prototype.fork = function (targetZone, zoneSpec) {
            return this._forkZS
                ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec)
                : new Zone(targetZone, zoneSpec);
        };
        ZoneDelegate.prototype.intercept = function (targetZone, callback, source) {
            return this._interceptZS
                ? this._interceptZS.onIntercept(this._interceptDlgt, this.zone, targetZone, callback, source)
                : callback;
        };
        ZoneDelegate.prototype.invoke = function (targetZone, callback, applyThis, applyArgs, source) {
            return this._invokeZS
                ? this._invokeZS.onInvoke(this._invokeDlgt, this.zone, targetZone, callback, applyThis, applyArgs, source)
                : callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.handleError = function (targetZone, error) {
            return this._handleErrorZS
                ? this._handleErrorZS.onHandleError(this._handleErrorDlgt, this.zone, targetZone, error)
                : true;
        };
        ZoneDelegate.prototype.scheduleTask = function (targetZone, task) {
            try {
                if (this._scheduleTaskZS) {
                    return this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this.zone, targetZone, task);
                }
                else if (task.scheduleFn) {
                    task.scheduleFn(task);
                }
                else if (task.type == 'microTask') {
                    scheduleMicroTask(task);
                }
                else {
                    throw new Error('Task is missing scheduleFn.');
                }
                return task;
            }
            finally {
                if (targetZone == this.zone) {
                    this._updateTaskCount(task.type, 1);
                }
            }
        };
        ZoneDelegate.prototype.invokeTask = function (targetZone, task, applyThis, applyArgs) {
            try {
                return this._invokeTaskZS
                    ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this.zone, targetZone, task, applyThis, applyArgs)
                    : task.callback.apply(applyThis, applyArgs);
            }
            finally {
                if (targetZone == this.zone && (task.type != 'eventTask') && !(task.data && task.data.isPeriodic)) {
                    this._updateTaskCount(task.type, -1);
                }
            }
        };
        ZoneDelegate.prototype.cancelTask = function (targetZone, task) {
            var value;
            if (this._cancelTaskZS) {
                value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this.zone, targetZone, task);
            }
            else if (!task.cancelFn) {
                throw new Error('Task does not support cancellation, or is already canceled.');
            }
            else {
                value = task.cancelFn(task);
            }
            if (targetZone == this.zone) {
                // this should not be in the finally block, because exceptions assume not canceled.
                this._updateTaskCount(task.type, -1);
            }
            return value;
        };
        ZoneDelegate.prototype.hasTask = function (targetZone, isEmpty) {
            return this._hasTaskZS && this._hasTaskZS.onHasTask(this._hasTaskDlgt, this.zone, targetZone, isEmpty);
        };
        ZoneDelegate.prototype._updateTaskCount = function (type, count) {
            var counts = this._taskCounts;
            var prev = counts[type];
            var next = counts[type] = prev + count;
            if (next < 0) {
                throw new Error('More tasks executed then were scheduled.');
            }
            if (prev == 0 || next == 0) {
                var isEmpty = {
                    microTask: counts.microTask > 0,
                    macroTask: counts.macroTask > 0,
                    eventTask: counts.eventTask > 0,
                    change: type
                };
                try {
                    this.hasTask(this.zone, isEmpty);
                }
                finally {
                    if (this._parentDelegate) {
                        this._parentDelegate._updateTaskCount(type, count);
                    }
                }
            }
        };
        return ZoneDelegate;
    }());
    var ZoneTask = (function () {
        function ZoneTask(type, zone, source, callback, options, scheduleFn, cancelFn) {
            this.runCount = 0;
            this.type = type;
            this.zone = zone;
            this.source = source;
            this.data = options;
            this.scheduleFn = scheduleFn;
            this.cancelFn = cancelFn;
            this.callback = callback;
            var self = this;
            this.invoke = function () {
                _numberOfNestedTaskFrames++;
                try {
                    return zone.runTask(self, this, arguments);
                }
                finally {
                    if (_numberOfNestedTaskFrames == 1) {
                        drainMicroTaskQueue();
                    }
                    _numberOfNestedTaskFrames--;
                }
            };
        }
        ZoneTask.prototype.toString = function () {
            if (this.data && typeof this.data.handleId !== 'undefined') {
                return this.data.handleId;
            }
            else {
                return this.toString();
            }
        };
        return ZoneTask;
    }());
    function __symbol__(name) { return '__zone_symbol__' + name; }
    ;
    var symbolSetTimeout = __symbol__('setTimeout');
    var symbolPromise = __symbol__('Promise');
    var symbolThen = __symbol__('then');
    var _currentZone = new Zone(null, null);
    var _currentTask = null;
    var _microTaskQueue = [];
    var _isDrainingMicrotaskQueue = false;
    var _uncaughtPromiseErrors = [];
    var _numberOfNestedTaskFrames = 0;
    function scheduleQueueDrain() {
        // if we are not running in any task, and there has not been anything scheduled
        // we must bootstrap the initial task creation by manually scheduling the drain
        if (_numberOfNestedTaskFrames == 0 && _microTaskQueue.length == 0) {
            // We are not running in Task, so we need to kickstart the microtask queue.
            if (global[symbolPromise]) {
                global[symbolPromise].resolve(0)[symbolThen](drainMicroTaskQueue);
            }
            else {
                global[symbolSetTimeout](drainMicroTaskQueue, 0);
            }
        }
    }
    function scheduleMicroTask(task) {
        scheduleQueueDrain();
        _microTaskQueue.push(task);
    }
    function consoleError(e) {
        var rejection = e && e.rejection;
        if (rejection) {
            console.error('Unhandled Promise rejection:', rejection instanceof Error ? rejection.message : rejection, '; Zone:', e.zone.name, '; Task:', e.task && e.task.source, '; Value:', rejection, rejection instanceof Error ? rejection.stack : undefined);
        }
        console.error(e);
    }
    function drainMicroTaskQueue() {
        if (!_isDrainingMicrotaskQueue) {
            _isDrainingMicrotaskQueue = true;
            while (_microTaskQueue.length) {
                var queue = _microTaskQueue;
                _microTaskQueue = [];
                for (var i = 0; i < queue.length; i++) {
                    var task = queue[i];
                    try {
                        task.zone.runTask(task, null, null);
                    }
                    catch (e) {
                        consoleError(e);
                    }
                }
            }
            while (_uncaughtPromiseErrors.length) {
                var _loop_1 = function() {
                    var uncaughtPromiseError = _uncaughtPromiseErrors.shift();
                    try {
                        uncaughtPromiseError.zone.runGuarded(function () { throw uncaughtPromiseError; });
                    }
                    catch (e) {
                        consoleError(e);
                    }
                };
                while (_uncaughtPromiseErrors.length) {
                    _loop_1();
                }
            }
            _isDrainingMicrotaskQueue = false;
        }
    }
    function isThenable(value) {
        return value && value.then;
    }
    function forwardResolution(value) { return value; }
    function forwardRejection(rejection) { return ZoneAwarePromise.reject(rejection); }
    var symbolState = __symbol__('state');
    var symbolValue = __symbol__('value');
    var source = 'Promise.then';
    var UNRESOLVED = null;
    var RESOLVED = true;
    var REJECTED = false;
    var REJECTED_NO_CATCH = 0;
    function makeResolver(promise, state) {
        return function (v) {
            resolvePromise(promise, state, v);
            // Do not return value or you will break the Promise spec.
        };
    }
    function resolvePromise(promise, state, value) {
        if (promise[symbolState] === UNRESOLVED) {
            if (value instanceof ZoneAwarePromise && value[symbolState] !== UNRESOLVED) {
                clearRejectedNoCatch(value);
                resolvePromise(promise, value[symbolState], value[symbolValue]);
            }
            else if (isThenable(value)) {
                value.then(makeResolver(promise, state), makeResolver(promise, false));
            }
            else {
                promise[symbolState] = state;
                var queue = promise[symbolValue];
                promise[symbolValue] = value;
                for (var i = 0; i < queue.length;) {
                    scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
                }
                if (queue.length == 0 && state == REJECTED) {
                    promise[symbolState] = REJECTED_NO_CATCH;
                    try {
                        throw new Error("Uncaught (in promise): " + value);
                    }
                    catch (e) {
                        var error = e;
                        error.rejection = value;
                        error.promise = promise;
                        error.zone = Zone.current;
                        error.task = Zone.currentTask;
                        _uncaughtPromiseErrors.push(error);
                        scheduleQueueDrain();
                    }
                }
            }
        }
        // Resolving an already resolved promise is a noop.
        return promise;
    }
    function clearRejectedNoCatch(promise) {
        if (promise[symbolState] === REJECTED_NO_CATCH) {
            promise[symbolState] = REJECTED;
            for (var i = 0; i < _uncaughtPromiseErrors.length; i++) {
                if (promise === _uncaughtPromiseErrors[i].promise) {
                    _uncaughtPromiseErrors.splice(i, 1);
                    break;
                }
            }
        }
    }
    function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
        clearRejectedNoCatch(promise);
        var delegate = promise[symbolState] ? onFulfilled || forwardResolution : onRejected || forwardRejection;
        zone.scheduleMicroTask(source, function () {
            try {
                resolvePromise(chainPromise, true, zone.run(delegate, null, [promise[symbolValue]]));
            }
            catch (error) {
                resolvePromise(chainPromise, false, error);
            }
        });
    }
    var ZoneAwarePromise = (function () {
        function ZoneAwarePromise(executor) {
            var promise = this;
            if (!(promise instanceof ZoneAwarePromise)) {
                throw new Error('Must be an instanceof Promise.');
            }
            promise[symbolState] = UNRESOLVED;
            promise[symbolValue] = []; // queue;
            try {
                executor && executor(makeResolver(promise, RESOLVED), makeResolver(promise, REJECTED));
            }
            catch (e) {
                resolvePromise(promise, false, e);
            }
        }
        ZoneAwarePromise.resolve = function (value) {
            return resolvePromise(new this(null), RESOLVED, value);
        };
        ZoneAwarePromise.reject = function (error) {
            return resolvePromise(new this(null), REJECTED, error);
        };
        ZoneAwarePromise.race = function (values) {
            var resolve;
            var reject;
            var promise = new this(function (res, rej) { resolve = res; reject = rej; });
            function onResolve(value) { promise && (promise = null || resolve(value)); }
            function onReject(error) { promise && (promise = null || reject(error)); }
            for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                var value = values_1[_i];
                if (!isThenable(value)) {
                    value = this.resolve(value);
                }
                value.then(onResolve, onReject);
            }
            return promise;
        };
        ZoneAwarePromise.all = function (values) {
            var resolve;
            var reject;
            var promise = new this(function (res, rej) { resolve = res; reject = rej; });
            var count = 0;
            var resolvedValues = [];
            for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
                var value = values_2[_i];
                if (!isThenable(value)) {
                    value = this.resolve(value);
                }
                value.then((function (index) { return function (value) {
                    resolvedValues[index] = value;
                    count--;
                    if (!count) {
                        resolve(resolvedValues);
                    }
                }; })(count), reject);
                count++;
            }
            if (!count)
                resolve(resolvedValues);
            return promise;
        };
        ZoneAwarePromise.prototype.then = function (onFulfilled, onRejected) {
            var chainPromise = new this.constructor(null);
            var zone = Zone.current;
            if (this[symbolState] == UNRESOLVED) {
                this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
            }
            else {
                scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
            }
            return chainPromise;
        };
        ZoneAwarePromise.prototype.catch = function (onRejected) {
            return this.then(null, onRejected);
        };
        return ZoneAwarePromise;
    }());
    // Protect against aggressive optimizers dropping seemingly unused properties.
    // E.g. Closure Compiler in advanced mode.
    ZoneAwarePromise['resolve'] = ZoneAwarePromise.resolve;
    ZoneAwarePromise['reject'] = ZoneAwarePromise.reject;
    ZoneAwarePromise['race'] = ZoneAwarePromise.race;
    ZoneAwarePromise['all'] = ZoneAwarePromise.all;
    var NativePromise = global[__symbol__('Promise')] = global.Promise;
    global.Promise = ZoneAwarePromise;
    function patchThen(NativePromise) {
        var NativePromiseProtototype = NativePromise.prototype;
        var NativePromiseThen = NativePromiseProtototype[__symbol__('then')]
            = NativePromiseProtototype.then;
        NativePromiseProtototype.then = function (onResolve, onReject) {
            var nativePromise = this;
            return new ZoneAwarePromise(function (resolve, reject) {
                NativePromiseThen.call(nativePromise, resolve, reject);
            }).then(onResolve, onReject);
        };
    }
    if (NativePromise) {
        patchThen(NativePromise);
        if (typeof global['fetch'] !== 'undefined') {
            var fetchPromise = void 0;
            try {
                // In MS Edge this throws
                fetchPromise = global['fetch']();
            }
            catch (e) {
                // In Chrome this throws instead.
                fetchPromise = global['fetch']('about:blank');
            }
            // ignore output to prevent error;
            fetchPromise.then(function () { return null; }, function () { return null; });
            if (fetchPromise.constructor != NativePromise) {
                patchThen(fetchPromise.constructor);
            }
        }
    }
    // This is not part of public API, but it is usefull for tests, so we expose it.
    Promise[Zone.__symbol__('uncaughtPromiseErrors')] = _uncaughtPromiseErrors;
    return global.Zone = Zone;
})(typeof window === 'object' && window || typeof self === 'object' && self || global);

/**
 * Suppress closure compiler errors about unknown 'process' variable
 * @fileoverview
 * @suppress {undefinedVars}
 */
var zoneSymbol = Zone['__symbol__'];
var _global$1 = typeof window === 'object' && window || typeof self === 'object' && self || global;
function bindArguments(args, source) {
    for (var i = args.length - 1; i >= 0; i--) {
        if (typeof args[i] === 'function') {
            args[i] = Zone.current.wrap(args[i], source + '_' + i);
        }
    }
    return args;
}
;
function patchPrototype(prototype, fnNames) {
    var source = prototype.constructor['name'];
    var _loop_1 = function(i) {
        var name_1 = fnNames[i];
        var delegate = prototype[name_1];
        if (delegate) {
            prototype[name_1] = (function (delegate) {
                return function () {
                    return delegate.apply(this, bindArguments(arguments, source + '.' + name_1));
                };
            })(delegate);
        }
    };
    for (var i = 0; i < fnNames.length; i++) {
        _loop_1(i);
    }
}
;
var isWebWorker = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope);
var isNode = (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]');
var isBrowser = !isNode && !isWebWorker && !!(typeof window !== 'undefined' && window['HTMLElement']);
function patchProperty(obj, prop) {
    var desc = Object.getOwnPropertyDescriptor(obj, prop) || {
        enumerable: true,
        configurable: true
    };
    // A property descriptor cannot have getter/setter and be writable
    // deleting the writable and value properties avoids this error:
    //
    // TypeError: property descriptors must not specify a value or be writable when a
    // getter or setter has been specified
    delete desc.writable;
    delete desc.value;
    // substr(2) cuz 'onclick' -> 'click', etc
    var eventName = prop.substr(2);
    var _prop = '_' + prop;
    desc.set = function (fn) {
        if (this[_prop]) {
            this.removeEventListener(eventName, this[_prop]);
        }
        if (typeof fn === 'function') {
            var wrapFn = function (event) {
                var result;
                result = fn.apply(this, arguments);
                if (result != undefined && !result)
                    event.preventDefault();
            };
            this[_prop] = wrapFn;
            this.addEventListener(eventName, wrapFn, false);
        }
        else {
            this[_prop] = null;
        }
    };
    // The getter would return undefined for unassigned properties but the default value of an unassigned property is null
    desc.get = function () {
        return this[_prop] || null;
    };
    Object.defineProperty(obj, prop, desc);
}
;
function patchOnProperties(obj, properties) {
    var onProperties = [];
    for (var prop in obj) {
        if (prop.substr(0, 2) == 'on') {
            onProperties.push(prop);
        }
    }
    for (var j = 0; j < onProperties.length; j++) {
        patchProperty(obj, onProperties[j]);
    }
    if (properties) {
        for (var i = 0; i < properties.length; i++) {
            patchProperty(obj, 'on' + properties[i]);
        }
    }
}
;
var EVENT_TASKS = zoneSymbol('eventTasks');
// For EventTarget
var ADD_EVENT_LISTENER = 'addEventListener';
var REMOVE_EVENT_LISTENER = 'removeEventListener';
function findExistingRegisteredTask(target, handler, name, capture, remove) {
    var eventTasks = target[EVENT_TASKS];
    if (eventTasks) {
        for (var i = 0; i < eventTasks.length; i++) {
            var eventTask = eventTasks[i];
            var data = eventTask.data;
            if (data.handler === handler
                && data.useCapturing === capture
                && data.eventName === name) {
                if (remove) {
                    eventTasks.splice(i, 1);
                }
                return eventTask;
            }
        }
    }
    return null;
}
function attachRegisteredEvent(target, eventTask) {
    var eventTasks = target[EVENT_TASKS];
    if (!eventTasks) {
        eventTasks = target[EVENT_TASKS] = [];
    }
    eventTasks.push(eventTask);
}
function makeZoneAwareAddListener(addFnName, removeFnName, useCapturingParam, allowDuplicates) {
    if (useCapturingParam === void 0) { useCapturingParam = true; }
    if (allowDuplicates === void 0) { allowDuplicates = false; }
    var addFnSymbol = zoneSymbol(addFnName);
    var removeFnSymbol = zoneSymbol(removeFnName);
    var defaultUseCapturing = useCapturingParam ? false : undefined;
    function scheduleEventListener(eventTask) {
        var meta = eventTask.data;
        attachRegisteredEvent(meta.target, eventTask);
        return meta.target[addFnSymbol](meta.eventName, eventTask.invoke, meta.useCapturing);
    }
    function cancelEventListener(eventTask) {
        var meta = eventTask.data;
        findExistingRegisteredTask(meta.target, eventTask.invoke, meta.eventName, meta.useCapturing, true);
        meta.target[removeFnSymbol](meta.eventName, eventTask.invoke, meta.useCapturing);
    }
    return function zoneAwareAddListener(self, args) {
        var eventName = args[0];
        var handler = args[1];
        var useCapturing = args[2] || defaultUseCapturing;
        // - Inside a Web Worker, `this` is undefined, the context is `global`
        // - When `addEventListener` is called on the global context in strict mode, `this` is undefined
        // see https://github.com/angular/zone.js/issues/190
        var target = self || _global$1;
        var delegate = null;
        if (typeof handler == 'function') {
            delegate = handler;
        }
        else if (handler && handler.handleEvent) {
            delegate = function (event) { return handler.handleEvent(event); };
        }
        var validZoneHandler = false;
        try {
            // In cross site contexts (such as WebDriver frameworks like Selenium),
            // accessing the handler object here will cause an exception to be thrown which
            // will fail tests prematurely.
            validZoneHandler = handler && handler.toString() === "[object FunctionWrapper]";
        }
        catch (e) {
            // Returning nothing here is fine, because objects in a cross-site context are unusable
            return;
        }
        // Ignore special listeners of IE11 & Edge dev tools, see https://github.com/angular/zone.js/issues/150
        if (!delegate || validZoneHandler) {
            return target[addFnSymbol](eventName, handler, useCapturing);
        }
        if (!allowDuplicates) {
            var eventTask = findExistingRegisteredTask(target, handler, eventName, useCapturing, false);
            if (eventTask) {
                // we already registered, so this will have noop.
                return target[addFnSymbol](eventName, eventTask.invoke, useCapturing);
            }
        }
        var zone = Zone.current;
        var source = target.constructor['name'] + '.' + addFnName + ':' + eventName;
        var data = {
            target: target,
            eventName: eventName,
            name: eventName,
            useCapturing: useCapturing,
            handler: handler
        };
        zone.scheduleEventTask(source, delegate, data, scheduleEventListener, cancelEventListener);
    };
}
function makeZoneAwareRemoveListener(fnName, useCapturingParam) {
    if (useCapturingParam === void 0) { useCapturingParam = true; }
    var symbol = zoneSymbol(fnName);
    var defaultUseCapturing = useCapturingParam ? false : undefined;
    return function zoneAwareRemoveListener(self, args) {
        var eventName = args[0];
        var handler = args[1];
        var useCapturing = args[2] || defaultUseCapturing;
        // - Inside a Web Worker, `this` is undefined, the context is `global`
        // - When `addEventListener` is called on the global context in strict mode, `this` is undefined
        // see https://github.com/angular/zone.js/issues/190
        var target = self || _global$1;
        var eventTask = findExistingRegisteredTask(target, handler, eventName, useCapturing, true);
        if (eventTask) {
            eventTask.zone.cancelTask(eventTask);
        }
        else {
            target[symbol](eventName, handler, useCapturing);
        }
    };
}
var zoneAwareAddEventListener = makeZoneAwareAddListener(ADD_EVENT_LISTENER, REMOVE_EVENT_LISTENER);
var zoneAwareRemoveEventListener = makeZoneAwareRemoveListener(REMOVE_EVENT_LISTENER);
function patchEventTargetMethods(obj) {
    if (obj && obj.addEventListener) {
        patchMethod(obj, ADD_EVENT_LISTENER, function () { return zoneAwareAddEventListener; });
        patchMethod(obj, REMOVE_EVENT_LISTENER, function () { return zoneAwareRemoveEventListener; });
        return true;
    }
    else {
        return false;
    }
}
var originalInstanceKey = zoneSymbol('originalInstance');
// wrap some native API on `window`
function patchClass(className) {
    var OriginalClass = _global$1[className];
    if (!OriginalClass)
        return;
    _global$1[className] = function () {
        var a = bindArguments(arguments, className);
        switch (a.length) {
            case 0:
                this[originalInstanceKey] = new OriginalClass();
                break;
            case 1:
                this[originalInstanceKey] = new OriginalClass(a[0]);
                break;
            case 2:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
                break;
            case 3:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
                break;
            case 4:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
                break;
            default: throw new Error('Arg list too long.');
        }
    };
    var instance = new OriginalClass(function () { });
    var prop;
    for (prop in instance) {
        // https://bugs.webkit.org/show_bug.cgi?id=44721
        if (className === 'XMLHttpRequest' && prop === 'responseBlob')
            continue;
        (function (prop) {
            if (typeof instance[prop] === 'function') {
                _global$1[className].prototype[prop] = function () {
                    return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);
                };
            }
            else {
                Object.defineProperty(_global$1[className].prototype, prop, {
                    set: function (fn) {
                        if (typeof fn === 'function') {
                            this[originalInstanceKey][prop] = Zone.current.wrap(fn, className + '.' + prop);
                        }
                        else {
                            this[originalInstanceKey][prop] = fn;
                        }
                    },
                    get: function () {
                        return this[originalInstanceKey][prop];
                    }
                });
            }
        }(prop));
    }
    for (prop in OriginalClass) {
        if (prop !== 'prototype' && OriginalClass.hasOwnProperty(prop)) {
            _global$1[className][prop] = OriginalClass[prop];
        }
    }
}
;
function createNamedFn(name, delegate) {
    try {
        return (Function('f', "return function " + name + "(){return f(this, arguments)}"))(delegate);
    }
    catch (e) {
        // if we fail, we must be CSP, just return delegate.
        return function () {
            return delegate(this, arguments);
        };
    }
}
function patchMethod(target, name, patchFn) {
    var proto = target;
    while (proto && !proto.hasOwnProperty(name)) {
        proto = Object.getPrototypeOf(proto);
    }
    if (!proto && target[name]) {
        // somehow we did not find it, but we can see it. This happens on IE for Window properties.
        proto = target;
    }
    var delegateName = zoneSymbol(name);
    var delegate;
    if (proto && !(delegate = proto[delegateName])) {
        delegate = proto[delegateName] = proto[name];
        proto[name] = createNamedFn(name, patchFn(delegate, delegateName, name));
    }
    return delegate;
}

var WTF_ISSUE_555 = 'Anchor,Area,Audio,BR,Base,BaseFont,Body,Button,Canvas,Content,DList,Directory,Div,Embed,FieldSet,Font,Form,Frame,FrameSet,HR,Head,Heading,Html,IFrame,Image,Input,Keygen,LI,Label,Legend,Link,Map,Marquee,Media,Menu,Meta,Meter,Mod,OList,Object,OptGroup,Option,Output,Paragraph,Pre,Progress,Quote,Script,Select,Source,Span,Style,TableCaption,TableCell,TableCol,Table,TableRow,TableSection,TextArea,Title,Track,UList,Unknown,Video';
var NO_EVENT_TARGET = 'ApplicationCache,EventSource,FileReader,InputMethodContext,MediaController,MessagePort,Node,Performance,SVGElementInstance,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebKitNamedFlow,Window,Worker,WorkerGlobalScope,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload,IDBRequest,IDBOpenDBRequest,IDBDatabase,IDBTransaction,IDBCursor,DBIndex'.split(',');
var EVENT_TARGET = 'EventTarget';
function eventTargetPatch(_global) {
    var apis = [];
    var isWtf = _global['wtf'];
    if (isWtf) {
        // Workaround for: https://github.com/google/tracing-framework/issues/555
        apis = WTF_ISSUE_555.split(',').map(function (v) { return 'HTML' + v + 'Element'; }).concat(NO_EVENT_TARGET);
    }
    else if (_global[EVENT_TARGET]) {
        apis.push(EVENT_TARGET);
    }
    else {
        // Note: EventTarget is not available in all browsers,
        // if it's not available, we instead patch the APIs in the IDL that inherit from EventTarget
        apis = NO_EVENT_TARGET;
    }
    for (var i = 0; i < apis.length; i++) {
        var type = _global[apis[i]];
        patchEventTargetMethods(type && type.prototype);
    }
}

/*
 * This is necessary for Chrome and Chrome mobile, to enable
 * things like redefining `createdCallback` on an element.
 */
var _defineProperty = Object[zoneSymbol('defineProperty')] = Object.defineProperty;
var _getOwnPropertyDescriptor = Object[zoneSymbol('getOwnPropertyDescriptor')] = Object.getOwnPropertyDescriptor;
var _create = Object.create;
var unconfigurablesKey = zoneSymbol('unconfigurables');
function propertyPatch() {
    Object.defineProperty = function (obj, prop, desc) {
        if (isUnconfigurable(obj, prop)) {
            throw new TypeError('Cannot assign to read only property \'' + prop + '\' of ' + obj);
        }
        var originalConfigurableFlag = desc.configurable;
        if (prop !== 'prototype') {
            desc = rewriteDescriptor(obj, prop, desc);
        }
        return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
    };
    Object.defineProperties = function (obj, props) {
        Object.keys(props).forEach(function (prop) {
            Object.defineProperty(obj, prop, props[prop]);
        });
        return obj;
    };
    Object.create = function (obj, proto) {
        if (typeof proto === 'object' && !Object.isFrozen(proto)) {
            Object.keys(proto).forEach(function (prop) {
                proto[prop] = rewriteDescriptor(obj, prop, proto[prop]);
            });
        }
        return _create(obj, proto);
    };
    Object.getOwnPropertyDescriptor = function (obj, prop) {
        var desc = _getOwnPropertyDescriptor(obj, prop);
        if (isUnconfigurable(obj, prop)) {
            desc.configurable = false;
        }
        return desc;
    };
}
;
function _redefineProperty(obj, prop, desc) {
    var originalConfigurableFlag = desc.configurable;
    desc = rewriteDescriptor(obj, prop, desc);
    return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
}
;
function isUnconfigurable(obj, prop) {
    return obj && obj[unconfigurablesKey] && obj[unconfigurablesKey][prop];
}
function rewriteDescriptor(obj, prop, desc) {
    desc.configurable = true;
    if (!desc.configurable) {
        if (!obj[unconfigurablesKey]) {
            _defineProperty(obj, unconfigurablesKey, { writable: true, value: {} });
        }
        obj[unconfigurablesKey][prop] = true;
    }
    return desc;
}
function _tryDefineProperty(obj, prop, desc, originalConfigurableFlag) {
    try {
        return _defineProperty(obj, prop, desc);
    }
    catch (e) {
        if (desc.configurable) {
            // In case of errors, when the configurable flag was likely set by rewriteDescriptor(), let's retry with the original flag value
            if (typeof originalConfigurableFlag == 'undefined') {
                delete desc.configurable;
            }
            else {
                desc.configurable = originalConfigurableFlag;
            }
            try {
                return _defineProperty(obj, prop, desc);
            }
            catch (e) {
                var descJson = null;
                try {
                    descJson = JSON.stringify(desc);
                }
                catch (e) {
                    descJson = descJson.toString();
                }
                console.log("Attempting to configure '" + prop + "' with descriptor '" + descJson + "' on object '" + obj + "' and got error, giving up: " + e);
            }
        }
        else {
            throw e;
        }
    }
}

function registerElementPatch(_global) {
    if (!isBrowser || !('registerElement' in _global.document)) {
        return;
    }
    var _registerElement = document.registerElement;
    var callbacks = [
        'createdCallback',
        'attachedCallback',
        'detachedCallback',
        'attributeChangedCallback'
    ];
    document.registerElement = function (name, opts) {
        if (opts && opts.prototype) {
            callbacks.forEach(function (callback) {
                var source = 'Document.registerElement::' + callback;
                if (opts.prototype.hasOwnProperty(callback)) {
                    var descriptor = Object.getOwnPropertyDescriptor(opts.prototype, callback);
                    if (descriptor && descriptor.value) {
                        descriptor.value = Zone.current.wrap(descriptor.value, source);
                        _redefineProperty(opts.prototype, callback, descriptor);
                    }
                    else {
                        opts.prototype[callback] = Zone.current.wrap(opts.prototype[callback], source);
                    }
                }
                else if (opts.prototype[callback]) {
                    opts.prototype[callback] = Zone.current.wrap(opts.prototype[callback], source);
                }
            });
        }
        return _registerElement.apply(document, [name, opts]);
    };
}

// we have to patch the instance since the proto is non-configurable
function apply(_global) {
    var WS = _global.WebSocket;
    // On Safari window.EventTarget doesn't exist so need to patch WS add/removeEventListener
    // On older Chrome, no need since EventTarget was already patched
    if (!_global.EventTarget) {
        patchEventTargetMethods(WS.prototype);
    }
    _global.WebSocket = function (a, b) {
        var socket = arguments.length > 1 ? new WS(a, b) : new WS(a);
        var proxySocket;
        // Safari 7.0 has non-configurable own 'onmessage' and friends properties on the socket instance
        var onmessageDesc = Object.getOwnPropertyDescriptor(socket, 'onmessage');
        if (onmessageDesc && onmessageDesc.configurable === false) {
            proxySocket = Object.create(socket);
            ['addEventListener', 'removeEventListener', 'send', 'close'].forEach(function (propName) {
                proxySocket[propName] = function () {
                    return socket[propName].apply(socket, arguments);
                };
            });
        }
        else {
            // we can patch the real socket
            proxySocket = socket;
        }
        patchOnProperties(proxySocket, ['close', 'error', 'message', 'open']);
        return proxySocket;
    };
    for (var prop in WS) {
        _global.WebSocket[prop] = WS[prop];
    }
}

var eventNames = 'copy cut paste abort blur focus canplay canplaythrough change click contextmenu dblclick drag dragend dragenter dragleave dragover dragstart drop durationchange emptied ended input invalid keydown keypress keyup load loadeddata loadedmetadata loadstart message mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup pause play playing progress ratechange reset scroll seeked seeking select show stalled submit suspend timeupdate volumechange waiting mozfullscreenchange mozfullscreenerror mozpointerlockchange mozpointerlockerror error webglcontextrestored webglcontextlost webglcontextcreationerror'.split(' ');
function propertyDescriptorPatch(_global) {
    if (isNode) {
        return;
    }
    var supportsWebSocket = typeof WebSocket !== 'undefined';
    if (canPatchViaPropertyDescriptor()) {
        // for browsers that we can patch the descriptor:  Chrome & Firefox
        if (isBrowser) {
            patchOnProperties(HTMLElement.prototype, eventNames);
        }
        patchOnProperties(XMLHttpRequest.prototype, null);
        if (typeof IDBIndex !== 'undefined') {
            patchOnProperties(IDBIndex.prototype, null);
            patchOnProperties(IDBRequest.prototype, null);
            patchOnProperties(IDBOpenDBRequest.prototype, null);
            patchOnProperties(IDBDatabase.prototype, null);
            patchOnProperties(IDBTransaction.prototype, null);
            patchOnProperties(IDBCursor.prototype, null);
        }
        if (supportsWebSocket) {
            patchOnProperties(WebSocket.prototype, null);
        }
    }
    else {
        // Safari, Android browsers (Jelly Bean)
        patchViaCapturingAllTheEvents();
        patchClass('XMLHttpRequest');
        if (supportsWebSocket) {
            apply(_global);
        }
    }
}
function canPatchViaPropertyDescriptor() {
    if (isBrowser && !Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'onclick')
        && typeof Element !== 'undefined') {
        // WebKit https://bugs.webkit.org/show_bug.cgi?id=134364
        // IDL interface attributes are not configurable
        var desc = Object.getOwnPropertyDescriptor(Element.prototype, 'onclick');
        if (desc && !desc.configurable)
            return false;
    }
    Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', {
        get: function () {
            return true;
        }
    });
    var req = new XMLHttpRequest();
    var result = !!req.onreadystatechange;
    Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', {});
    return result;
}
;
var unboundKey = zoneSymbol('unbound');
// Whenever any eventListener fires, we check the eventListener target and all parents
// for `onwhatever` properties and replace them with zone-bound functions
// - Chrome (for now)
function patchViaCapturingAllTheEvents() {
    var _loop_1 = function(i) {
        var property = eventNames[i];
        var onproperty = 'on' + property;
        document.addEventListener(property, function (event) {
            var elt = event.target, bound, source;
            if (elt) {
                source = elt.constructor['name'] + '.' + onproperty;
            }
            else {
                source = 'unknown.' + onproperty;
            }
            while (elt) {
                if (elt[onproperty] && !elt[onproperty][unboundKey]) {
                    bound = Zone.current.wrap(elt[onproperty], source);
                    bound[unboundKey] = elt[onproperty];
                    elt[onproperty] = bound;
                }
                elt = elt.parentElement;
            }
        }, true);
    };
    for (var i = 0; i < eventNames.length; i++) {
        _loop_1(i);
    }
    ;
}
;

function patchTimer(window, setName, cancelName, nameSuffix) {
    var setNative = null;
    var clearNative = null;
    setName += nameSuffix;
    cancelName += nameSuffix;
    function scheduleTask(task) {
        var data = task.data;
        data.args[0] = task.invoke;
        data.handleId = setNative.apply(window, data.args);
        return task;
    }
    function clearTask(task) {
        return clearNative(task.data.handleId);
    }
    setNative = patchMethod(window, setName, function (delegate) { return function (self, args) {
        if (typeof args[0] === 'function') {
            var zone = Zone.current;
            var options = {
                handleId: null,
                isPeriodic: nameSuffix === 'Interval',
                delay: (nameSuffix === 'Timeout' || nameSuffix === 'Interval') ? args[1] || 0 : null,
                args: args
            };
            var task = zone.scheduleMacroTask(setName, args[0], options, scheduleTask, clearTask);
            if (!task) {
                return task;
            }
            // Node.js must additionally support the ref and unref functions.
            var handle = task.data.handleId;
            if (handle.ref && handle.unref) {
                task.ref = handle.ref.bind(handle);
                task.unref = handle.unref.bind(handle);
            }
            return task;
        }
        else {
            // cause an error by calling it directly.
            return delegate.apply(window, args);
        }
    }; });
    clearNative = patchMethod(window, cancelName, function (delegate) { return function (self, args) {
        var task = args[0];
        if (task && typeof task.type === 'string') {
            if (task.cancelFn && task.data.isPeriodic || task.runCount === 0) {
                // Do not cancel already canceled functions
                task.zone.cancelTask(task);
            }
        }
        else {
            // cause an error by calling it directly.
            delegate.apply(window, args);
        }
    }; });
}

var set = 'set';
var clear = 'clear';
var blockingMethods = ['alert', 'prompt', 'confirm'];
var _global = typeof window === 'object' && window || typeof self === 'object' && self || global;
patchTimer(_global, set, clear, 'Timeout');
patchTimer(_global, set, clear, 'Interval');
patchTimer(_global, set, clear, 'Immediate');
patchTimer(_global, 'request', 'cancel', 'AnimationFrame');
patchTimer(_global, 'mozRequest', 'mozCancel', 'AnimationFrame');
patchTimer(_global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');
for (var i = 0; i < blockingMethods.length; i++) {
    var name = blockingMethods[i];
    patchMethod(_global, name, function (delegate, symbol, name) {
        return function (s, args) {
            return Zone.current.run(delegate, _global, args, name);
        };
    });
}
eventTargetPatch(_global);
propertyDescriptorPatch(_global);
patchClass('MutationObserver');
patchClass('WebKitMutationObserver');
patchClass('FileReader');
propertyPatch();
registerElementPatch(_global);
// Treat XMLHTTPRequest as a macrotask.
patchXHR(_global);
var XHR_TASK = zoneSymbol('xhrTask');
var XHR_SYNC = zoneSymbol('xhrSync');
function patchXHR(window) {
    function findPendingTask(target) {
        var pendingTask = target[XHR_TASK];
        return pendingTask;
    }
    function scheduleTask(task) {
        var data = task.data;
        data.target.addEventListener('readystatechange', function () {
            if (data.target.readyState === data.target.DONE) {
                if (!data.aborted) {
                    task.invoke();
                }
            }
        });
        var storedTask = data.target[XHR_TASK];
        if (!storedTask) {
            data.target[XHR_TASK] = task;
        }
        sendNative.apply(data.target, data.args);
        return task;
    }
    function placeholderCallback() {
    }
    function clearTask(task) {
        var data = task.data;
        // Note - ideally, we would call data.target.removeEventListener here, but it's too late
        // to prevent it from firing. So instead, we store info for the event listener.
        data.aborted = true;
        return abortNative.apply(data.target, data.args);
    }
    var openNative = patchMethod(window.XMLHttpRequest.prototype, 'open', function () { return function (self, args) {
        self[XHR_SYNC] = args[2] == false;
        return openNative.apply(self, args);
    }; });
    var sendNative = patchMethod(window.XMLHttpRequest.prototype, 'send', function () { return function (self, args) {
        var zone = Zone.current;
        if (self[XHR_SYNC]) {
            // if the XHR is sync there is no task to schedule, just execute the code.
            return sendNative.apply(self, args);
        }
        else {
            var options = {
                target: self,
                isPeriodic: false,
                delay: null,
                args: args,
                aborted: false
            };
            return zone.scheduleMacroTask('XMLHttpRequest.send', placeholderCallback, options, scheduleTask, clearTask);
        }
    }; });
    var abortNative = patchMethod(window.XMLHttpRequest.prototype, 'abort', function (delegate) { return function (self, args) {
        var task = findPendingTask(self);
        if (task && typeof task.type == 'string') {
            // If the XHR has already completed, do nothing.
            if (task.cancelFn == null) {
                return;
            }
            task.zone.cancelTask(task);
        }
        // Otherwise, we are trying to abort an XHR which has not yet been sent, so there is no task to cancel. Do nothing.
    }; });
}
/// GEO_LOCATION
if (_global['navigator'] && _global['navigator'].geolocation) {
    patchPrototype(_global['navigator'].geolocation, [
        'getCurrentPosition',
        'watchPosition'
    ]);
}
/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect;
(function (Reflect) {
    "use strict";
    var hasOwn = Object.prototype.hasOwnProperty;
    // feature test for Object.create support
    var supportsCreate = typeof Object.create === "function";
    // feature test for __proto__ support
    var supportsProto = (function () {
        var sentinel = {};
        function __() { }
        __.prototype = sentinel;
        var instance = new __();
        return instance.__proto__ === sentinel;
    })();
    // create an object in dictionary mode (a.k.a. "slow" mode in v8)
    var createDictionary = supportsCreate ? function () { return MakeDictionary(Object.create(null)); } :
        supportsProto ? function () { return MakeDictionary({ __proto__: null }); } :
            function () { return MakeDictionary({}); };
    var HashMap;
    (function (HashMap) {
        var downLevel = !supportsCreate && !supportsProto;
        HashMap.has = downLevel
            ? function (map, key) { return hasOwn.call(map, key); }
            : function (map, key) { return key in map; };
        HashMap.get = downLevel
            ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
            : function (map, key) { return map[key]; };
    })(HashMap || (HashMap = {}));
    // Load global or shim versions of Map, Set, and WeakMap
    var functionPrototype = Object.getPrototypeOf(Function);
    var _Map = typeof Map === "function" ? Map : CreateMapPolyfill();
    var _Set = typeof Set === "function" ? Set : CreateSetPolyfill();
    var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
    // [[Metadata]] internal slot
    var Metadata = new _WeakMap();
    /**
      * Applies a set of decorators to a property of a target object.
      * @param decorators An array of decorators.
      * @param target The target object.
      * @param targetKey (Optional) The property key to decorate.
      * @param targetDescriptor (Optional) The property descriptor for the target key
      * @remarks Decorators are applied in reverse order.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     Example = Reflect.decorate(decoratorsArray, Example);
      *
      *     // property (on constructor)
      *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
      *
      *     // property (on prototype)
      *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
      *
      *     // method (on constructor)
      *     Object.defineProperty(Example, "staticMethod",
      *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
      *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
      *
      *     // method (on prototype)
      *     Object.defineProperty(Example.prototype, "method",
      *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
      *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
      *
      */
    function decorate(decorators, target, targetKey, targetDescriptor) {
        if (!IsUndefined(targetDescriptor)) {
            if (!IsArray(decorators))
                throw new TypeError();
            if (!IsObject(target))
                throw new TypeError();
            if (IsUndefined(targetKey))
                throw new TypeError();
            if (!IsObject(targetDescriptor))
                throw new TypeError();
            targetKey = ToPropertyKey(targetKey);
            return DecoratePropertyWithDescriptor(decorators, target, targetKey, targetDescriptor);
        }
        else if (!IsUndefined(targetKey)) {
            if (!IsArray(decorators))
                throw new TypeError();
            if (!IsObject(target))
                throw new TypeError();
            targetKey = ToPropertyKey(targetKey);
            return DecoratePropertyWithoutDescriptor(decorators, target, targetKey);
        }
        else {
            if (!IsArray(decorators))
                throw new TypeError();
            if (!IsConstructor(target))
                throw new TypeError();
            return DecorateConstructor(decorators, target);
        }
    }
    Reflect.decorate = decorate;
    /**
      * A default metadata decorator factory that can be used on a class, class member, or parameter.
      * @param metadataKey The key for the metadata entry.
      * @param metadataValue The value for the metadata entry.
      * @returns A decorator function.
      * @remarks
      * If `metadataKey` is already defined for the target and target key, the
      * metadataValue for that key will be overwritten.
      * @example
      *
      *     // constructor
      *     @Reflect.metadata(key, value)
      *     class Example {
      *     }
      *
      *     // property (on constructor, TypeScript only)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         static staticProperty;
      *     }
      *
      *     // property (on prototype, TypeScript only)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         property;
      *     }
      *
      *     // method (on constructor)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         static staticMethod() { }
      *     }
      *
      *     // method (on prototype)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         method() { }
      *     }
      *
      */
    function metadata(metadataKey, metadataValue) {
        function decorator(target, targetKey) {
            if (!IsUndefined(targetKey)) {
                if (!IsObject(target))
                    throw new TypeError();
                targetKey = ToPropertyKey(targetKey);
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
            }
            else {
                if (!IsConstructor(target))
                    throw new TypeError();
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, /*targetKey*/ undefined);
            }
        }
        return decorator;
    }
    Reflect.metadata = metadata;
    /**
      * Define a unique metadata entry on the target.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param metadataValue A value that contains attached metadata.
      * @param target The target object on which to define metadata.
      * @param targetKey (Optional) The property key for the target.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     Reflect.defineMetadata("custom:annotation", options, Example);
      *
      *     // property (on constructor)
      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
      *
      *     // property (on prototype)
      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
      *
      *     // method (on constructor)
      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
      *
      *     // method (on prototype)
      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
      *
      *     // decorator factory as metadata-producing annotation.
      *     function MyAnnotation(options): Decorator {
      *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
      *     }
      *
      */
    function defineMetadata(metadataKey, metadataValue, target, targetKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(targetKey))
            targetKey = ToPropertyKey(targetKey);
        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
    }
    Reflect.defineMetadata = defineMetadata;
    /**
      * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.hasMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function hasMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(targetKey))
            targetKey = ToPropertyKey(targetKey);
        return OrdinaryHasMetadata(metadataKey, target, targetKey);
    }
    Reflect.hasMetadata = hasMetadata;
    /**
      * Gets a value indicating whether the target object has the provided metadata key defined.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function hasOwnMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(targetKey))
            targetKey = ToPropertyKey(targetKey);
        return OrdinaryHasOwnMetadata(metadataKey, target, targetKey);
    }
    Reflect.hasOwnMetadata = hasOwnMetadata;
    /**
      * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function getMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(targetKey))
            targetKey = ToPropertyKey(targetKey);
        return OrdinaryGetMetadata(metadataKey, target, targetKey);
    }
    Reflect.getMetadata = getMetadata;
    /**
      * Gets the metadata value for the provided metadata key on the target object.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getOwnMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function getOwnMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(targetKey))
            targetKey = ToPropertyKey(targetKey);
        return OrdinaryGetOwnMetadata(metadataKey, target, targetKey);
    }
    Reflect.getOwnMetadata = getOwnMetadata;
    /**
      * Gets the metadata keys defined on the target object or its prototype chain.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns An array of unique metadata keys.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getMetadataKeys(Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getMetadataKeys(Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getMetadataKeys(Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getMetadataKeys(Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getMetadataKeys(Example.prototype, "method");
      *
      */
    function getMetadataKeys(target, targetKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(targetKey))
            targetKey = ToPropertyKey(targetKey);
        return OrdinaryMetadataKeys(target, targetKey);
    }
    Reflect.getMetadataKeys = getMetadataKeys;
    /**
      * Gets the unique metadata keys defined on the target object.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns An array of unique metadata keys.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getOwnMetadataKeys(Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
      *
      */
    function getOwnMetadataKeys(target, targetKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(targetKey))
            targetKey = ToPropertyKey(targetKey);
        return OrdinaryOwnMetadataKeys(target, targetKey);
    }
    Reflect.getOwnMetadataKeys = getOwnMetadataKeys;
    /**
      * Deletes the metadata entry from the target object with the provided key.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns `true` if the metadata entry was found and deleted; otherwise, false.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.deleteMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function deleteMetadata(metadataKey, target, targetKey) {
        // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#deletemetadata-metadatakey-p-
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(targetKey))
            targetKey = ToPropertyKey(targetKey);
        var metadataMap = GetOrCreateMetadataMap(target, targetKey, /*create*/ false);
        if (IsUndefined(metadataMap))
            return false;
        if (!metadataMap.delete(metadataKey))
            return false;
        if (metadataMap.size > 0)
            return true;
        var targetMetadata = Metadata.get(target);
        targetMetadata.delete(targetKey);
        if (targetMetadata.size > 0)
            return true;
        Metadata.delete(target);
        return true;
    }
    Reflect.deleteMetadata = deleteMetadata;
    function DecorateConstructor(decorators, target) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target);
            if (!IsUndefined(decorated)) {
                if (!IsConstructor(decorated))
                    throw new TypeError();
                target = decorated;
            }
        }
        return target;
    }
    function DecoratePropertyWithDescriptor(decorators, target, propertyKey, descriptor) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target, propertyKey, descriptor);
            if (!IsUndefined(decorated)) {
                if (!IsObject(decorated))
                    throw new TypeError();
                descriptor = decorated;
            }
        }
        return descriptor;
    }
    function DecoratePropertyWithoutDescriptor(decorators, target, propertyKey) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            decorator(target, propertyKey);
        }
    }
    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#getorcreatemetadatamap--o-p-create-
    function GetOrCreateMetadataMap(target, targetKey, create) {
        var targetMetadata = Metadata.get(target);
        if (!targetMetadata) {
            if (!create)
                return undefined;
            targetMetadata = new _Map();
            Metadata.set(target, targetMetadata);
        }
        var keyMetadata = targetMetadata.get(targetKey);
        if (!keyMetadata) {
            if (!create)
                return undefined;
            keyMetadata = new _Map();
            targetMetadata.set(targetKey, keyMetadata);
        }
        return keyMetadata;
    }
    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinaryhasmetadata--metadatakey-o-p-
    function OrdinaryHasMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn)
            return true;
        var parent = GetPrototypeOf(O);
        return parent !== null ? OrdinaryHasMetadata(MetadataKey, parent, P) : false;
    }
    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinaryhasownmetadata--metadatakey-o-p-
    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*create*/ false);
        return metadataMap !== undefined && Boolean(metadataMap.has(MetadataKey));
    }
    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarygetmetadata--metadatakey-o-p-
    function OrdinaryGetMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn)
            return OrdinaryGetOwnMetadata(MetadataKey, O, P);
        var parent = GetPrototypeOf(O);
        return parent !== null ? OrdinaryGetMetadata(MetadataKey, parent, P) : undefined;
    }
    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarygetownmetadata--metadatakey-o-p-
    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*create*/ false);
        return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
    }
    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarydefineownmetadata--metadatakey-metadatavalue-o-p-
    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*create*/ true);
        metadataMap.set(MetadataKey, MetadataValue);
    }
    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarymetadatakeys--o-p-
    function OrdinaryMetadataKeys(O, P) {
        var ownKeys = OrdinaryOwnMetadataKeys(O, P);
        var parent = GetPrototypeOf(O);
        if (parent === null)
            return ownKeys;
        var parentKeys = OrdinaryMetadataKeys(parent, P);
        if (parentKeys.length <= 0)
            return ownKeys;
        if (ownKeys.length <= 0)
            return parentKeys;
        var keys = new _Set();
        for (var _i = 0; _i < ownKeys.length; _i++) {
            var key = ownKeys[_i];
            keys.add(key);
        }
        for (var _a = 0; _a < parentKeys.length; _a++) {
            var key = parentKeys[_a];
            keys.add(key);
        }
        return getKeys(keys);
    }
    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinaryownmetadatakeys--o-p-
    function OrdinaryOwnMetadataKeys(target, targetKey) {
        var metadataMap = GetOrCreateMetadataMap(target, targetKey, /*create*/ false);
        var keys = [];
        if (metadataMap)
            forEach(metadataMap, function (_, key) { return keys.push(key); });
        return keys;
    }
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-language-types-undefined-type
    function IsUndefined(x) {
        return x === undefined;
    }
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
    function IsArray(x) {
        return Array.isArray ? Array.isArray(x) : x instanceof Array || Object.prototype.toString.call(x) === "[object Array]";
    }
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object-type
    function IsObject(x) {
        return typeof x === "object" ? x !== null : typeof x === "function";
    }
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
    function IsConstructor(x) {
        return typeof x === "function";
    }
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-language-types-symbol-type
    function IsSymbol(x) {
        return typeof x === "symbol";
    }
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
    function ToPropertyKey(value) {
        return IsSymbol(value) ? value : String(value);
    }
    function GetPrototypeOf(O) {
        var proto = Object.getPrototypeOf(O);
        if (typeof O !== "function" || O === functionPrototype)
            return proto;
        // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
        // Try to determine the superclass Exampleonstructor. Compatible implementations
        // must either set __proto__ on a subclass Exampleonstructor to the superclass Exampleonstructor,
        // or ensure each class has a valid `constructor` property on its prototype that
        // points back to the constructor.
        // If this is not the same as Function.[[Prototype]], then this is definately inherited.
        // This is the case when in ES6 or when using __proto__ in a compatible browser.
        if (proto !== functionPrototype)
            return proto;
        // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
        var prototype = O.prototype;
        var prototypeProto = prototype && Object.getPrototypeOf(prototype);
        if (prototypeProto == null || prototypeProto === Object.prototype)
            return proto;
        // If the constructor was not a function, then we cannot determine the heritage.
        var constructor = prototypeProto.constructor;
        if (typeof constructor !== "function")
            return proto;
        // If we have some kind of self-reference, then we cannot determine the heritage.
        if (constructor === O)
            return proto;
        // we have a pretty good guess at the heritage.
        return constructor;
    }
    function IteratorStep(iterator) {
        var result = iterator.next();
        return result.done ? undefined : result;
    }
    function IteratorClose(iterator) {
        var f = iterator["return"];
        if (f)
            f.call(iterator);
    }
    function forEach(source, callback, thisArg) {
        var entries = source.entries;
        if (typeof entries === "function") {
            var iterator = entries.call(source);
            var result;
            try {
                while (result = IteratorStep(iterator)) {
                    var _a = result.value, key = _a[0], value = _a[1];
                    callback.call(thisArg, value, key, source);
                }
            }
            finally {
                if (result)
                    IteratorClose(iterator);
            }
        }
        else {
            var forEach_1 = source.forEach;
            if (typeof forEach_1 === "function") {
                forEach_1.call(source, callback, thisArg);
            }
        }
    }
    function getKeys(source) {
        var keys = [];
        forEach(source, function (_, key) { keys.push(key); });
        return keys;
    }
    // naive MapIterator shim
    function CreateMapIterator(keys, values, kind) {
        var index = 0;
        return {
            next: function () {
                if ((keys || values) && index < (keys || values).length) {
                    var current = index++;
                    switch (kind) {
                        case "key": return { value: keys[current], done: false };
                        case "value": return { value: values[current], done: false };
                        case "key+value": return { value: [keys[current], values[current]], done: false };
                    }
                }
                keys = undefined;
                values = undefined;
                return { value: undefined, done: true };
            },
            "throw": function (error) {
                if (keys || values) {
                    keys = undefined;
                    values = undefined;
                }
                throw error;
            },
            "return": function (value) {
                if (keys || values) {
                    keys = undefined;
                    values = undefined;
                }
                return { value: value, done: true };
            }
        };
    }
    // naive Map shim
    function CreateMapPolyfill() {
        var cacheSentinel = {};
        return (function () {
            function Map() {
                this._keys = [];
                this._values = [];
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
            }
            Object.defineProperty(Map.prototype, "size", {
                get: function () { return this._keys.length; },
                enumerable: true,
                configurable: true
            });
            Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
            Map.prototype.get = function (key) {
                var index = this._find(key, /*insert*/ false);
                return index >= 0 ? this._values[index] : undefined;
            };
            Map.prototype.set = function (key, value) {
                var index = this._find(key, /*insert*/ true);
                this._values[index] = value;
                return this;
            };
            Map.prototype.delete = function (key) {
                var index = this._find(key, /*insert*/ false);
                if (index >= 0) {
                    var size = this._keys.length;
                    for (var i = index + 1; i < size; i++) {
                        this._keys[i - 1] = this._keys[i];
                        this._values[i - 1] = this._values[i];
                    }
                    this._keys.length--;
                    this._values.length--;
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                    return true;
                }
                return false;
            };
            Map.prototype.clear = function () {
                this._keys.length = 0;
                this._values.length = 0;
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
            };
            Map.prototype.keys = function () { return CreateMapIterator(this._keys, /*values*/ undefined, "key"); };
            Map.prototype.values = function () { return CreateMapIterator(/*keys*/ undefined, this._values, "value"); };
            Map.prototype.entries = function () { return CreateMapIterator(this._keys, this._values, "key+value"); };
            Map.prototype._find = function (key, insert) {
                if (this._cacheKey === key)
                    return this._cacheIndex;
                var index = this._keys.indexOf(key);
                if (index < 0 && insert) {
                    index = this._keys.length;
                    this._keys.push(key);
                    this._values.push(undefined);
                }
                return this._cacheKey = key, this._cacheIndex = index;
            };
            return Map;
        })();
    }
    // naive Set shim
    function CreateSetPolyfill() {
        return (function () {
            function Set() {
                this._map = new _Map();
            }
            Object.defineProperty(Set.prototype, "size", {
                get: function () { return this._map.size; },
                enumerable: true,
                configurable: true
            });
            Set.prototype.has = function (value) { return this._map.has(value); };
            Set.prototype.add = function (value) { return this._map.set(value, value), this; };
            Set.prototype.delete = function (value) { return this._map.delete(value); };
            Set.prototype.clear = function () { this._map.clear(); };
            Set.prototype.keys = function () { return this._map.keys(); };
            Set.prototype.values = function () { return this._map.values(); };
            Set.prototype.entries = function () { return this._map.entries(); };
            return Set;
        })();
    }
    // naive WeakMap shim
    function CreateWeakMapPolyfill() {
        var UUID_SIZE = 16;
        var keys = createDictionary();
        var rootKey = CreateUniqueKey();
        return (function () {
            function WeakMap() {
                this._key = CreateUniqueKey();
            }
            WeakMap.prototype.has = function (target) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                return table !== undefined ? HashMap.has(table, this._key) : false;
            };
            WeakMap.prototype.get = function (target) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                return table !== undefined ? HashMap.get(table, this._key) : undefined;
            };
            WeakMap.prototype.set = function (target, value) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                table[this._key] = value;
                return this;
            };
            WeakMap.prototype.delete = function (target) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                return table !== undefined ? delete table[this._key] : false;
            };
            WeakMap.prototype.clear = function () {
                // NOTE: not a real clear, just makes the previous data unreachable
                this._key = CreateUniqueKey();
            };
            return WeakMap;
        })();
        function FillRandomBytes(buffer, size) {
            for (var i = 0; i < size; ++i)
                buffer[i] = Math.random() * 0xff | 0;
            return buffer;
        }
        function GenRandomBytes(size) {
            if (typeof Uint8Array === "function") {
                if (typeof crypto !== "undefined")
                    return crypto.getRandomValues(new Uint8Array(size));
                if (typeof msCrypto !== "undefined")
                    return msCrypto.getRandomValues(new Uint8Array(size));
                return FillRandomBytes(new Uint8Array(size), size);
            }
            return FillRandomBytes(new Array(size), size);
        }
        function CreateUUID() {
            var data = GenRandomBytes(UUID_SIZE);
            // mark as random - RFC 4122 § 4.4
            data[6] = data[6] & 0x4f | 0x40;
            data[8] = data[8] & 0xbf | 0x80;
            var result = "";
            for (var offset = 0; offset < UUID_SIZE; ++offset) {
                var byte = data[offset];
                if (offset === 4 || offset === 6 || offset === 8)
                    result += "-";
                if (byte < 16)
                    result += "0";
                result += byte.toString(16).toLowerCase();
            }
            return result;
        }
        function CreateUniqueKey() {
            var key;
            do
                key = "@@WeakMap@@" + CreateUUID();
            while (HashMap.has(keys, key));
            keys[key] = true;
            return key;
        }
        function GetOrCreateWeakMapTable(target, create) {
            if (!hasOwn.call(target, rootKey)) {
                if (!create)
                    return undefined;
                Object.defineProperty(target, rootKey, { value: createDictionary() });
            }
            return target[rootKey];
        }
    }
    // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
    function MakeDictionary(obj) {
        obj.__DICTIONARY_MODE__ = 1;
        delete obj.____DICTIONARY_MODE__;
        return obj;
    }
    // patch global Reflect
    (function (__global) {
        if (typeof __global.Reflect !== "undefined") {
            if (__global.Reflect !== Reflect) {
                for (var p in Reflect) {
                    if (hasOwn.call(Reflect, p)) {
                        __global.Reflect[p] = Reflect[p];
                    }
                }
            }
        }
        else {
            __global.Reflect = Reflect;
        }
    })(typeof window !== "undefined" ? window :
        typeof WorkerGlobalScope !== "undefined" ? self :
            typeof global !== "undefined" ? global :
                Function("return this;")());
})(Reflect || (Reflect = {}));
//# sourceMappingURL=Reflect.js.map
/*
 * SystemJS Polyfills for URL and Promise providing IE8+ Support
 */
!function(t){!function(e){"object"==typeof exports?module.exports=e():"function"==typeof t&&t.amd?t(e):"undefined"!=typeof window?window.Promise=e():"undefined"!=typeof global?global.Promise=e():"undefined"!=typeof self&&(self.Promise=e())}(function(){var t;return function e(t,n,o){function r(u,c){if(!n[u]){if(!t[u]){var f="function"==typeof require&&require;if(!c&&f)return f(u,!0);if(i)return i(u,!0);throw new Error("Cannot find module '"+u+"'")}var s=n[u]={exports:{}};t[u][0].call(s.exports,function(e){var n=t[u][1][e];return r(n?n:e)},s,s.exports,e,t,n,o)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<o.length;u++)r(o[u]);return r}({1:[function(t,e,n){var o=t("../lib/decorators/unhandledRejection"),r=o(t("../lib/Promise"));e.exports="undefined"!=typeof global?global.Promise=r:"undefined"!=typeof self?self.Promise=r:r},{"../lib/Promise":2,"../lib/decorators/unhandledRejection":4}],2:[function(e,n,o){!function(t){"use strict";t(function(t){var e=t("./makePromise"),n=t("./Scheduler"),o=t("./env").asap;return e({scheduler:new n(o)})})}("function"==typeof t&&t.amd?t:function(t){n.exports=t(e)})},{"./Scheduler":3,"./env":5,"./makePromise":7}],3:[function(e,n,o){!function(t){"use strict";t(function(){function t(t){this._async=t,this._running=!1,this._queue=this,this._queueLen=0,this._afterQueue={},this._afterQueueLen=0;var e=this;this.drain=function(){e._drain()}}return t.prototype.enqueue=function(t){this._queue[this._queueLen++]=t,this.run()},t.prototype.afterQueue=function(t){this._afterQueue[this._afterQueueLen++]=t,this.run()},t.prototype.run=function(){this._running||(this._running=!0,this._async(this.drain))},t.prototype._drain=function(){for(var t=0;t<this._queueLen;++t)this._queue[t].run(),this._queue[t]=void 0;for(this._queueLen=0,this._running=!1,t=0;t<this._afterQueueLen;++t)this._afterQueue[t].run(),this._afterQueue[t]=void 0;this._afterQueueLen=0},t})}("function"==typeof t&&t.amd?t:function(t){n.exports=t()})},{}],4:[function(e,n,o){!function(t){"use strict";t(function(t){function e(t){throw t}function n(){}var o=t("../env").setTimer,r=t("../format");return function(t){function i(t){t.handled||(l.push(t),a("Potentially unhandled rejection ["+t.id+"] "+r.formatError(t.value)))}function u(t){var e=l.indexOf(t);e>=0&&(l.splice(e,1),h("Handled previous rejection ["+t.id+"] "+r.formatObject(t.value)))}function c(t,e){p.push(t,e),null===d&&(d=o(f,0))}function f(){for(d=null;p.length>0;)p.shift()(p.shift())}var s,a=n,h=n;"undefined"!=typeof console&&(s=console,a="undefined"!=typeof s.error?function(t){s.error(t)}:function(t){s.log(t)},h="undefined"!=typeof s.info?function(t){s.info(t)}:function(t){s.log(t)}),t.onPotentiallyUnhandledRejection=function(t){c(i,t)},t.onPotentiallyUnhandledRejectionHandled=function(t){c(u,t)},t.onFatalRejection=function(t){c(e,t.value)};var p=[],l=[],d=null;return t}})}("function"==typeof t&&t.amd?t:function(t){n.exports=t(e)})},{"../env":5,"../format":6}],5:[function(e,n,o){!function(t){"use strict";t(function(t){function e(){return"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process)}function n(){return"function"==typeof MutationObserver&&MutationObserver||"function"==typeof WebKitMutationObserver&&WebKitMutationObserver}function o(t){function e(){var t=n;n=void 0,t()}var n,o=document.createTextNode(""),r=new t(e);r.observe(o,{characterData:!0});var i=0;return function(t){n=t,o.data=i^=1}}var r,i="undefined"!=typeof setTimeout&&setTimeout,u=function(t,e){return setTimeout(t,e)},c=function(t){return clearTimeout(t)},f=function(t){return i(t,0)};if(e())f=function(t){return process.nextTick(t)};else if(r=n())f=o(r);else if(!i){var s=t,a=s("vertx");u=function(t,e){return a.setTimer(e,t)},c=a.cancelTimer,f=a.runOnLoop||a.runOnContext}return{setTimer:u,clearTimer:c,asap:f}})}("function"==typeof t&&t.amd?t:function(t){n.exports=t(e)})},{}],6:[function(e,n,o){!function(t){"use strict";t(function(){function t(t){var n="object"==typeof t&&null!==t&&(t.stack||t.message)?t.stack||t.message:e(t);return t instanceof Error?n:n+" (WARNING: non-Error used)"}function e(t){var e=String(t);return"[object Object]"===e&&"undefined"!=typeof JSON&&(e=n(t,e)),e}function n(t,e){try{return JSON.stringify(t)}catch(n){return e}}return{formatError:t,formatObject:e,tryStringify:n}})}("function"==typeof t&&t.amd?t:function(t){n.exports=t()})},{}],7:[function(e,n,o){!function(t){"use strict";t(function(){return function(t){function e(t,e){this._handler=t===_?e:n(t)}function n(t){function e(t){r.resolve(t)}function n(t){r.reject(t)}function o(t){r.notify(t)}var r=new b;try{t(e,n,o)}catch(i){n(i)}return r}function o(t){return k(t)?t:new e(_,new x(v(t)))}function r(t){return new e(_,new x(new P(t)))}function i(){return $}function u(){return new e(_,new b)}function c(t,e){var n=new b(t.receiver,t.join().context);return new e(_,n)}function f(t){return a(B,null,t)}function s(t,e){return a(M,t,e)}function a(t,n,o){function r(e,r,u){u.resolved||h(o,i,e,t(n,r,e),u)}function i(t,e,n){a[t]=e,0===--s&&n.become(new q(a))}for(var u,c="function"==typeof n?r:i,f=new b,s=o.length>>>0,a=new Array(s),p=0;p<o.length&&!f.resolved;++p)u=o[p],void 0!==u||p in o?h(o,c,p,u,f):--s;return 0===s&&f.become(new q(a)),new e(_,f)}function h(t,e,n,o,r){if(U(o)){var i=m(o),u=i.state();0===u?i.fold(e,n,void 0,r):u>0?e(n,i.value,r):(r.become(i),p(t,n+1,i))}else e(n,o,r)}function p(t,e,n){for(var o=e;o<t.length;++o)l(v(t[o]),n)}function l(t,e){if(t!==e){var n=t.state();0===n?t.visit(t,void 0,t._unreport):0>n&&t._unreport()}}function d(t){return"object"!=typeof t||null===t?r(new TypeError("non-iterable passed to race()")):0===t.length?i():1===t.length?o(t[0]):y(t)}function y(t){var n,o,r,i=new b;for(n=0;n<t.length;++n)if(o=t[n],void 0!==o||n in t){if(r=v(o),0!==r.state()){i.become(r),p(t,n+1,r);break}r.visit(i,i.resolve,i.reject)}return new e(_,i)}function v(t){return k(t)?t._handler.join():U(t)?j(t):new q(t)}function m(t){return k(t)?t._handler.join():j(t)}function j(t){try{var e=t.then;return"function"==typeof e?new g(e,t):new q(t)}catch(n){return new P(n)}}function _(){}function w(){}function b(t,n){e.createContext(this,n),this.consumers=void 0,this.receiver=t,this.handler=void 0,this.resolved=!1}function x(t){this.handler=t}function g(t,e){b.call(this),G.enqueue(new E(t,e,this))}function q(t){e.createContext(this),this.value=t}function P(t){e.createContext(this),this.id=++Y,this.value=t,this.handled=!1,this.reported=!1,this._report()}function R(t,e){this.rejection=t,this.context=e}function C(t){this.rejection=t}function O(){return new P(new TypeError("Promise cycle"))}function T(t,e){this.continuation=t,this.handler=e}function Q(t,e){this.handler=e,this.value=t}function E(t,e,n){this._then=t,this.thenable=e,this.resolver=n}function L(t,e,n,o,r){try{t.call(e,n,o,r)}catch(i){o(i)}}function S(t,e,n,o){this.f=t,this.z=e,this.c=n,this.to=o,this.resolver=X,this.receiver=this}function k(t){return t instanceof e}function U(t){return("object"==typeof t||"function"==typeof t)&&null!==t}function H(t,n,o,r){return"function"!=typeof t?r.become(n):(e.enterContext(n),F(t,n.value,o,r),void e.exitContext())}function N(t,n,o,r,i){return"function"!=typeof t?i.become(o):(e.enterContext(o),W(t,n,o.value,r,i),void e.exitContext())}function J(t,n,o,r,i){return"function"!=typeof t?i.notify(n):(e.enterContext(o),z(t,n,r,i),void e.exitContext())}function M(t,e,n){try{return t(e,n)}catch(o){return r(o)}}function F(t,e,n,o){try{o.become(v(t.call(n,e)))}catch(r){o.become(new P(r))}}function W(t,e,n,o,r){try{t.call(o,e,n,r)}catch(i){r.become(new P(i))}}function z(t,e,n,o){try{o.notify(t.call(n,e))}catch(r){o.notify(r)}}function A(t,e){e.prototype=V(t.prototype),e.prototype.constructor=e}function B(t,e){return e}function K(){}function D(){return"undefined"!=typeof process&&null!==process&&"function"==typeof process.emit?function(t,e){return"unhandledRejection"===t?process.emit(t,e.value,e):process.emit(t,e)}:"undefined"!=typeof self&&"function"==typeof CustomEvent?function(t,e,n){var o=!1;try{var r=new n("unhandledRejection");o=r instanceof n}catch(i){}return o?function(t,o){var r=new n(t,{detail:{reason:o.value,key:o},bubbles:!1,cancelable:!0});return!e.dispatchEvent(r)}:t}(K,self,CustomEvent):K}var G=t.scheduler,I=D(),V=Object.create||function(t){function e(){}return e.prototype=t,new e};e.resolve=o,e.reject=r,e.never=i,e._defer=u,e._handler=v,e.prototype.then=function(t,e,n){var o=this._handler,r=o.join().state();if("function"!=typeof t&&r>0||"function"!=typeof e&&0>r)return new this.constructor(_,o);var i=this._beget(),u=i._handler;return o.chain(u,o.receiver,t,e,n),i},e.prototype["catch"]=function(t){return this.then(void 0,t)},e.prototype._beget=function(){return c(this._handler,this.constructor)},e.all=f,e.race=d,e._traverse=s,e._visitRemaining=p,_.prototype.when=_.prototype.become=_.prototype.notify=_.prototype.fail=_.prototype._unreport=_.prototype._report=K,_.prototype._state=0,_.prototype.state=function(){return this._state},_.prototype.join=function(){for(var t=this;void 0!==t.handler;)t=t.handler;return t},_.prototype.chain=function(t,e,n,o,r){this.when({resolver:t,receiver:e,fulfilled:n,rejected:o,progress:r})},_.prototype.visit=function(t,e,n,o){this.chain(X,t,e,n,o)},_.prototype.fold=function(t,e,n,o){this.when(new S(t,e,n,o))},A(_,w),w.prototype.become=function(t){t.fail()};var X=new w;A(_,b),b.prototype._state=0,b.prototype.resolve=function(t){this.become(v(t))},b.prototype.reject=function(t){this.resolved||this.become(new P(t))},b.prototype.join=function(){if(!this.resolved)return this;for(var t=this;void 0!==t.handler;)if(t=t.handler,t===this)return this.handler=O();return t},b.prototype.run=function(){var t=this.consumers,e=this.handler;this.handler=this.handler.join(),this.consumers=void 0;for(var n=0;n<t.length;++n)e.when(t[n])},b.prototype.become=function(t){this.resolved||(this.resolved=!0,this.handler=t,void 0!==this.consumers&&G.enqueue(this),void 0!==this.context&&t._report(this.context))},b.prototype.when=function(t){this.resolved?G.enqueue(new T(t,this.handler)):void 0===this.consumers?this.consumers=[t]:this.consumers.push(t)},b.prototype.notify=function(t){this.resolved||G.enqueue(new Q(t,this))},b.prototype.fail=function(t){var e="undefined"==typeof t?this.context:t;this.resolved&&this.handler.join().fail(e)},b.prototype._report=function(t){this.resolved&&this.handler.join()._report(t)},b.prototype._unreport=function(){this.resolved&&this.handler.join()._unreport()},A(_,x),x.prototype.when=function(t){G.enqueue(new T(t,this))},x.prototype._report=function(t){this.join()._report(t)},x.prototype._unreport=function(){this.join()._unreport()},A(b,g),A(_,q),q.prototype._state=1,q.prototype.fold=function(t,e,n,o){N(t,e,this,n,o)},q.prototype.when=function(t){H(t.fulfilled,this,t.receiver,t.resolver)};var Y=0;A(_,P),P.prototype._state=-1,P.prototype.fold=function(t,e,n,o){o.become(this)},P.prototype.when=function(t){"function"==typeof t.rejected&&this._unreport(),H(t.rejected,this,t.receiver,t.resolver)},P.prototype._report=function(t){G.afterQueue(new R(this,t))},P.prototype._unreport=function(){this.handled||(this.handled=!0,G.afterQueue(new C(this)))},P.prototype.fail=function(t){this.reported=!0,I("unhandledRejection",this),e.onFatalRejection(this,void 0===t?this.context:t)},R.prototype.run=function(){this.rejection.handled||this.rejection.reported||(this.rejection.reported=!0,I("unhandledRejection",this.rejection)||e.onPotentiallyUnhandledRejection(this.rejection,this.context))},C.prototype.run=function(){this.rejection.reported&&(I("rejectionHandled",this.rejection)||e.onPotentiallyUnhandledRejectionHandled(this.rejection))},e.createContext=e.enterContext=e.exitContext=e.onPotentiallyUnhandledRejection=e.onPotentiallyUnhandledRejectionHandled=e.onFatalRejection=K;var Z=new _,$=new e(_,Z);return T.prototype.run=function(){this.handler.join().when(this.continuation)},Q.prototype.run=function(){var t=this.handler.consumers;if(void 0!==t)for(var e,n=0;n<t.length;++n)e=t[n],J(e.progress,this.value,this.handler,e.receiver,e.resolver)},E.prototype.run=function(){function t(t){o.resolve(t)}function e(t){o.reject(t)}function n(t){o.notify(t)}var o=this.resolver;L(this._then,this.thenable,t,e,n)},S.prototype.fulfilled=function(t){this.f.call(this.c,this.z,t,this.to)},S.prototype.rejected=function(t){this.to.reject(t)},S.prototype.progress=function(t){this.to.notify(t)},e}})}("function"==typeof t&&t.amd?t:function(t){n.exports=t()})},{}]},{},[1])(1)}),"undefined"!=typeof systemJSBootstrap&&systemJSBootstrap()}();
//# sourceMappingURL=system-polyfills.js.map

/*
 * SystemJS v0.19.27
 */
(function() {
function bootstrap() {// from https://gist.github.com/Yaffle/1088850
(function(global) {
function URLPolyfill(url, baseURL) {
  if (typeof url != 'string')
    throw new TypeError('URL must be a string');
  var m = String(url).replace(/^\s+|\s+$/g, "").match(/^([^:\/?#]+:)?(?:\/\/(?:([^:@\/?#]*)(?::([^:@\/?#]*))?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
  if (!m)
    throw new RangeError('Invalid URL format');
  var protocol = m[1] || "";
  var username = m[2] || "";
  var password = m[3] || "";
  var host = m[4] || "";
  var hostname = m[5] || "";
  var port = m[6] || "";
  var pathname = m[7] || "";
  var search = m[8] || "";
  var hash = m[9] || "";
  if (baseURL !== undefined) {
    var base = baseURL instanceof URLPolyfill ? baseURL : new URLPolyfill(baseURL);
    var flag = !protocol && !host && !username;
    if (flag && !pathname && !search)
      search = base.search;
    if (flag && pathname[0] !== "/")
      pathname = (pathname ? (((base.host || base.username) && !base.pathname ? "/" : "") + base.pathname.slice(0, base.pathname.lastIndexOf("/") + 1) + pathname) : base.pathname);
    // dot segments removal
    var output = [];
    pathname.replace(/^(\.\.?(\/|$))+/, "")
      .replace(/\/(\.(\/|$))+/g, "/")
      .replace(/\/\.\.$/, "/../")
      .replace(/\/?[^\/]*/g, function (p) {
        if (p === "/..")
          output.pop();
        else
          output.push(p);
      });
    pathname = output.join("").replace(/^\//, pathname[0] === "/" ? "/" : "");
    if (flag) {
      port = base.port;
      hostname = base.hostname;
      host = base.host;
      password = base.password;
      username = base.username;
    }
    if (!protocol)
      protocol = base.protocol;
  }

  // convert windows file URLs to use /
  if (protocol == 'file:')
    pathname = pathname.replace(/\\/g, '/');

  this.origin = host ? protocol + (protocol !== "" || host !== "" ? "//" : "") + host : "";
  this.href = protocol + (protocol && host || protocol == "file:" ? "//" : "") + (username !== "" ? username + (password !== "" ? ":" + password : "") + "@" : "") + host + pathname + search + hash;
  this.protocol = protocol;
  this.username = username;
  this.password = password;
  this.host = host;
  this.hostname = hostname;
  this.port = port;
  this.pathname = pathname;
  this.search = search;
  this.hash = hash;
}
global.URLPolyfill = URLPolyfill;
})(typeof self != 'undefined' ? self : global);(function(__global) {

  var isWorker = typeof window == 'undefined' && typeof self != 'undefined' && typeof importScripts != 'undefined';
  var isBrowser = typeof window != 'undefined' && typeof document != 'undefined';
  var isWindows = typeof process != 'undefined' && typeof process.platform != 'undefined' && !!process.platform.match(/^win/);

  if (!__global.console)
    __global.console = { assert: function() {} };

  // IE8 support
  var indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, thisLen = this.length; i < thisLen; i++) {
      if (this[i] === item) {
        return i;
      }
    }
    return -1;
  };
  
  var defineProperty;
  (function () {
    try {
      if (!!Object.defineProperty({}, 'a', {}))
        defineProperty = Object.defineProperty;
    }
    catch (e) {
      defineProperty = function(obj, prop, opt) {
        try {
          obj[prop] = opt.value || opt.get.call(obj);
        }
        catch(e) {}
      }
    }
  })();

  var errArgs = new Error(0, '_').fileName == '_';

  function addToError(err, msg) {
    // parse the stack removing loader code lines for simplification
    if (!err.originalErr) {
      var stack = (err.stack || err.message || err).split('\n');
      var newStack = [];
      for (var i = 0; i < stack.length; i++) {
        if (typeof $__curScript == 'undefined' || stack[i].indexOf($__curScript.src) == -1)
          newStack.push(stack[i]);
      }
    }

    var newMsg = (newStack ? newStack.join('\n\t') : err.message) + '\n\t' + msg;

    // Convert file:/// URLs to paths in Node
    if (!isBrowser)
      newMsg = newMsg.replace(isWindows ? /file:\/\/\//g : /file:\/\//g, '');

    var newErr = errArgs ? new Error(newMsg, err.fileName, err.lineNumber) : new Error(newMsg);
    
    // Node needs stack adjustment for throw to show message
    if (!isBrowser)
      newErr.stack = newMsg;
    // Clearing the stack stops unnecessary loader lines showing
    else
      newErr.stack = null;
    
    // track the original error
    newErr.originalErr = err.originalErr || err;

    return newErr;
  }

  function __eval(source, debugName, context) {
    try {
      new Function(source).call(context);
    }
    catch(e) {
      throw addToError(e, 'Evaluating ' + debugName);
    }
  }

  var baseURI;
  // environent baseURI detection
  if (typeof document != 'undefined' && document.getElementsByTagName) {
    baseURI = document.baseURI;

    if (!baseURI) {
      var bases = document.getElementsByTagName('base');
      baseURI = bases[0] && bases[0].href || window.location.href;
    }

    // sanitize out the hash and querystring
    baseURI = baseURI.split('#')[0].split('?')[0];
    baseURI = baseURI.substr(0, baseURI.lastIndexOf('/') + 1);
  }
  else if (typeof process != 'undefined' && process.cwd) {
    baseURI = 'file://' + (isWindows ? '/' : '') + process.cwd() + '/';
    if (isWindows)
      baseURI = baseURI.replace(/\\/g, '/');
  }
  else if (typeof location != 'undefined') {
    baseURI = __global.location.href;
  }
  else {
    throw new TypeError('No environment baseURI');
  }

  try {
    var nativeURL = new __global.URL('test:///').protocol == 'test:';
  }
  catch(e) {}

  var URL = nativeURL ? __global.URL : __global.URLPolyfill;
/*
*********************************************************************************************

  Dynamic Module Loader Polyfill

    - Implemented exactly to the former 2014-08-24 ES6 Specification Draft Rev 27, Section 15
      http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts#august_24_2014_draft_rev_27

    - Functions are commented with their spec numbers, with spec differences commented.

    - Spec bugs are commented in this code with links.

    - Abstract functions have been combined where possible, and their associated functions
      commented.

    - Realm implementation is entirely omitted.

*********************************************************************************************
*/

function Module() {}
// http://www.ecma-international.org/ecma-262/6.0/#sec-@@tostringtag
defineProperty(Module.prototype, 'toString', {
  value: function() {
    return 'Module';
  }
});
function Loader(options) {
  this._loader = {
    loaderObj: this,
    loads: [],
    modules: {},
    importPromises: {},
    moduleRecords: {}
  };

  // 26.3.3.6
  defineProperty(this, 'global', {
    get: function() {
      return __global;
    }
  });

  // 26.3.3.13 realm not implemented
}

(function() {

// Some Helpers

// logs a linkset snapshot for debugging
/* function snapshot(loader) {
  console.log('---Snapshot---');
  for (var i = 0; i < loader.loads.length; i++) {
    var load = loader.loads[i];
    var linkSetLog = '  ' + load.name + ' (' + load.status + '): ';

    for (var j = 0; j < load.linkSets.length; j++) {
      linkSetLog += '{' + logloads(load.linkSets[j].loads) + '} ';
    }
    console.log(linkSetLog);
  }
  console.log('');
}
function logloads(loads) {
  var log = '';
  for (var k = 0; k < loads.length; k++)
    log += loads[k].name + (k != loads.length - 1 ? ' ' : '');
  return log;
} */


/* function checkInvariants() {
  // see https://bugs.ecmascript.org/show_bug.cgi?id=2603#c1

  var loads = System._loader.loads;
  var linkSets = [];

  for (var i = 0; i < loads.length; i++) {
    var load = loads[i];
    console.assert(load.status == 'loading' || load.status == 'loaded', 'Each load is loading or loaded');

    for (var j = 0; j < load.linkSets.length; j++) {
      var linkSet = load.linkSets[j];

      for (var k = 0; k < linkSet.loads.length; k++)
        console.assert(loads.indexOf(linkSet.loads[k]) != -1, 'linkSet loads are a subset of loader loads');

      if (linkSets.indexOf(linkSet) == -1)
        linkSets.push(linkSet);
    }
  }

  for (var i = 0; i < loads.length; i++) {
    var load = loads[i];
    for (var j = 0; j < linkSets.length; j++) {
      var linkSet = linkSets[j];

      if (linkSet.loads.indexOf(load) != -1)
        console.assert(load.linkSets.indexOf(linkSet) != -1, 'linkSet contains load -> load contains linkSet');

      if (load.linkSets.indexOf(linkSet) != -1)
        console.assert(linkSet.loads.indexOf(load) != -1, 'load contains linkSet -> linkSet contains load');
    }
  }

  for (var i = 0; i < linkSets.length; i++) {
    var linkSet = linkSets[i];
    for (var j = 0; j < linkSet.loads.length; j++) {
      var load = linkSet.loads[j];

      for (var k = 0; k < load.dependencies.length; k++) {
        var depName = load.dependencies[k].value;
        var depLoad;
        for (var l = 0; l < loads.length; l++) {
          if (loads[l].name != depName)
            continue;
          depLoad = loads[l];
          break;
        }

        // loading records are allowed not to have their dependencies yet
        // if (load.status != 'loading')
        //  console.assert(depLoad, 'depLoad found');

        // console.assert(linkSet.loads.indexOf(depLoad) != -1, 'linkset contains all dependencies');
      }
    }
  }
} */

  // 15.2.3 - Runtime Semantics: Loader State

  // 15.2.3.11
  function createLoaderLoad(object) {
    return {
      // modules is an object for ES5 implementation
      modules: {},
      loads: [],
      loaderObj: object
    };
  }

  // 15.2.3.2 Load Records and LoadRequest Objects

  // 15.2.3.2.1
  function createLoad(name) {
    return {
      status: 'loading',
      name: name,
      linkSets: [],
      dependencies: [],
      metadata: {}
    };
  }

  // 15.2.3.2.2 createLoadRequestObject, absorbed into calling functions

  // 15.2.4

  // 15.2.4.1
  function loadModule(loader, name, options) {
    return new Promise(asyncStartLoadPartwayThrough({
      step: options.address ? 'fetch' : 'locate',
      loader: loader,
      moduleName: name,
      // allow metadata for import https://bugs.ecmascript.org/show_bug.cgi?id=3091
      moduleMetadata: options && options.metadata || {},
      moduleSource: options.source,
      moduleAddress: options.address
    }));
  }

  // 15.2.4.2
  function requestLoad(loader, request, refererName, refererAddress) {
    // 15.2.4.2.1 CallNormalize
    return new Promise(function(resolve, reject) {
      resolve(loader.loaderObj.normalize(request, refererName, refererAddress));
    })
    // 15.2.4.2.2 GetOrCreateLoad
    .then(function(name) {
      var load;
      if (loader.modules[name]) {
        load = createLoad(name);
        load.status = 'linked';
        // https://bugs.ecmascript.org/show_bug.cgi?id=2795
        load.module = loader.modules[name];
        return load;
      }

      for (var i = 0, l = loader.loads.length; i < l; i++) {
        load = loader.loads[i];
        if (load.name != name)
          continue;
        console.assert(load.status == 'loading' || load.status == 'loaded', 'loading or loaded');
        return load;
      }

      load = createLoad(name);
      loader.loads.push(load);

      proceedToLocate(loader, load);

      return load;
    });
  }

  // 15.2.4.3
  function proceedToLocate(loader, load) {
    proceedToFetch(loader, load,
      Promise.resolve()
      // 15.2.4.3.1 CallLocate
      .then(function() {
        return loader.loaderObj.locate({ name: load.name, metadata: load.metadata });
      })
    );
  }

  // 15.2.4.4
  function proceedToFetch(loader, load, p) {
    proceedToTranslate(loader, load,
      p
      // 15.2.4.4.1 CallFetch
      .then(function(address) {
        // adjusted, see https://bugs.ecmascript.org/show_bug.cgi?id=2602
        if (load.status != 'loading')
          return;
        load.address = address;

        return loader.loaderObj.fetch({ name: load.name, metadata: load.metadata, address: address });
      })
    );
  }

  var anonCnt = 0;

  // 15.2.4.5
  function proceedToTranslate(loader, load, p) {
    p
    // 15.2.4.5.1 CallTranslate
    .then(function(source) {
      if (load.status != 'loading')
        return;

      return Promise.resolve(loader.loaderObj.translate({ name: load.name, metadata: load.metadata, address: load.address, source: source }))

      // 15.2.4.5.2 CallInstantiate
      .then(function(source) {
        load.source = source;
        return loader.loaderObj.instantiate({ name: load.name, metadata: load.metadata, address: load.address, source: source });
      })

      // 15.2.4.5.3 InstantiateSucceeded
      .then(function(instantiateResult) {
        if (instantiateResult === undefined) {
          load.address = load.address || '<Anonymous Module ' + ++anonCnt + '>';

          // instead of load.kind, use load.isDeclarative
          load.isDeclarative = true;
          return transpile.call(loader.loaderObj, load)
          .then(function(transpiled) {
            // Hijack System.register to set declare function
            var curSystem = __global.System;
            var curRegister = curSystem.register;
            curSystem.register = function(name, deps, declare) {
              if (typeof name != 'string') {
                declare = deps;
                deps = name;
              }
              // store the registered declaration as load.declare
              // store the deps as load.deps
              load.declare = declare;
              load.depsList = deps;
            }
            // empty {} context is closest to undefined 'this' we can get
            __eval(transpiled, load.address, {});
            curSystem.register = curRegister;
          });
        }
        else if (typeof instantiateResult == 'object') {
          load.depsList = instantiateResult.deps || [];
          load.execute = instantiateResult.execute;
          load.isDeclarative = false;
        }
        else
          throw TypeError('Invalid instantiate return value');
      })
      // 15.2.4.6 ProcessLoadDependencies
      .then(function() {
        load.dependencies = [];
        var depsList = load.depsList;

        var loadPromises = [];
        for (var i = 0, l = depsList.length; i < l; i++) (function(request, index) {
          loadPromises.push(
            requestLoad(loader, request, load.name, load.address)

            // 15.2.4.6.1 AddDependencyLoad (load is parentLoad)
            .then(function(depLoad) {

              // adjusted from spec to maintain dependency order
              // this is due to the System.register internal implementation needs
              load.dependencies[index] = {
                key: request,
                value: depLoad.name
              };

              if (depLoad.status != 'linked') {
                var linkSets = load.linkSets.concat([]);
                for (var i = 0, l = linkSets.length; i < l; i++)
                  addLoadToLinkSet(linkSets[i], depLoad);
              }

              // console.log('AddDependencyLoad ' + depLoad.name + ' for ' + load.name);
              // snapshot(loader);
            })
          );
        })(depsList[i], i);

        return Promise.all(loadPromises);
      })

      // 15.2.4.6.2 LoadSucceeded
      .then(function() {
        // console.log('LoadSucceeded ' + load.name);
        // snapshot(loader);

        console.assert(load.status == 'loading', 'is loading');

        load.status = 'loaded';

        var linkSets = load.linkSets.concat([]);
        for (var i = 0, l = linkSets.length; i < l; i++)
          updateLinkSetOnLoad(linkSets[i], load);
      });
    })
    // 15.2.4.5.4 LoadFailed
    ['catch'](function(exc) {
      load.status = 'failed';
      load.exception = exc;

      var linkSets = load.linkSets.concat([]);
      for (var i = 0, l = linkSets.length; i < l; i++) {
        linkSetFailed(linkSets[i], load, exc);
      }

      console.assert(load.linkSets.length == 0, 'linkSets not removed');
    });
  }

  // 15.2.4.7 PromiseOfStartLoadPartwayThrough absorbed into calling functions

  // 15.2.4.7.1
  function asyncStartLoadPartwayThrough(stepState) {
    return function(resolve, reject) {
      var loader = stepState.loader;
      var name = stepState.moduleName;
      var step = stepState.step;

      if (loader.modules[name])
        throw new TypeError('"' + name + '" already exists in the module table');

      // adjusted to pick up existing loads
      var existingLoad;
      for (var i = 0, l = loader.loads.length; i < l; i++) {
        if (loader.loads[i].name == name) {
          existingLoad = loader.loads[i];

          if (step == 'translate' && !existingLoad.source) {
            existingLoad.address = stepState.moduleAddress;
            proceedToTranslate(loader, existingLoad, Promise.resolve(stepState.moduleSource));
          }

          // a primary load -> use that existing linkset if it is for the direct load here
          // otherwise create a new linkset unit
          if (existingLoad.linkSets.length && existingLoad.linkSets[0].loads[0].name == existingLoad.name)
            return existingLoad.linkSets[0].done.then(function() {
              resolve(existingLoad);
            });
        }
      }

      var load = existingLoad || createLoad(name);

      load.metadata = stepState.moduleMetadata;

      var linkSet = createLinkSet(loader, load);

      loader.loads.push(load);

      resolve(linkSet.done);

      if (step == 'locate')
        proceedToLocate(loader, load);

      else if (step == 'fetch')
        proceedToFetch(loader, load, Promise.resolve(stepState.moduleAddress));

      else {
        console.assert(step == 'translate', 'translate step');
        load.address = stepState.moduleAddress;
        proceedToTranslate(loader, load, Promise.resolve(stepState.moduleSource));
      }
    }
  }

  // Declarative linking functions run through alternative implementation:
  // 15.2.5.1.1 CreateModuleLinkageRecord not implemented
  // 15.2.5.1.2 LookupExport not implemented
  // 15.2.5.1.3 LookupModuleDependency not implemented

  // 15.2.5.2.1
  function createLinkSet(loader, startingLoad) {
    var linkSet = {
      loader: loader,
      loads: [],
      startingLoad: startingLoad, // added see spec bug https://bugs.ecmascript.org/show_bug.cgi?id=2995
      loadingCount: 0
    };
    linkSet.done = new Promise(function(resolve, reject) {
      linkSet.resolve = resolve;
      linkSet.reject = reject;
    });
    addLoadToLinkSet(linkSet, startingLoad);
    return linkSet;
  }
  // 15.2.5.2.2
  function addLoadToLinkSet(linkSet, load) {
    if (load.status == 'failed')
      return;

    console.assert(load.status == 'loading' || load.status == 'loaded', 'loading or loaded on link set');

    for (var i = 0, l = linkSet.loads.length; i < l; i++)
      if (linkSet.loads[i] == load)
        return;

    linkSet.loads.push(load);
    load.linkSets.push(linkSet);

    // adjustment, see https://bugs.ecmascript.org/show_bug.cgi?id=2603
    if (load.status != 'loaded') {
      linkSet.loadingCount++;
    }

    var loader = linkSet.loader;

    for (var i = 0, l = load.dependencies.length; i < l; i++) {
      if (!load.dependencies[i])
        continue;

      var name = load.dependencies[i].value;

      if (loader.modules[name])
        continue;

      for (var j = 0, d = loader.loads.length; j < d; j++) {
        if (loader.loads[j].name != name)
          continue;

        addLoadToLinkSet(linkSet, loader.loads[j]);
        break;
      }
    }
    // console.log('add to linkset ' + load.name);
    // snapshot(linkSet.loader);
  }

  // linking errors can be generic or load-specific
  // this is necessary for debugging info
  function doLink(linkSet) {
    var error = false;
    try {
      link(linkSet, function(load, exc) {
        linkSetFailed(linkSet, load, exc);
        error = true;
      });
    }
    catch(e) {
      linkSetFailed(linkSet, null, e);
      error = true;
    }
    return error;
  }

  // 15.2.5.2.3
  function updateLinkSetOnLoad(linkSet, load) {
    // console.log('update linkset on load ' + load.name);
    // snapshot(linkSet.loader);

    console.assert(load.status == 'loaded' || load.status == 'linked', 'loaded or linked');

    linkSet.loadingCount--;

    if (linkSet.loadingCount > 0)
      return;

    // adjusted for spec bug https://bugs.ecmascript.org/show_bug.cgi?id=2995
    var startingLoad = linkSet.startingLoad;

    // non-executing link variation for loader tracing
    // on the server. Not in spec.
    /***/
    if (linkSet.loader.loaderObj.execute === false) {
      var loads = [].concat(linkSet.loads);
      for (var i = 0, l = loads.length; i < l; i++) {
        var load = loads[i];
        load.module = !load.isDeclarative ? {
          module: _newModule({})
        } : {
          name: load.name,
          module: _newModule({}),
          evaluated: true
        };
        load.status = 'linked';
        finishLoad(linkSet.loader, load);
      }
      return linkSet.resolve(startingLoad);
    }
    /***/

    var abrupt = doLink(linkSet);

    if (abrupt)
      return;

    console.assert(linkSet.loads.length == 0, 'loads cleared');

    linkSet.resolve(startingLoad);
  }

  // 15.2.5.2.4
  function linkSetFailed(linkSet, load, exc) {
    var loader = linkSet.loader;
    var requests;

    checkError: 
    if (load) {
      if (linkSet.loads[0].name == load.name) {
        exc = addToError(exc, 'Error loading ' + load.name);
      }
      else {
        for (var i = 0; i < linkSet.loads.length; i++) {
          var pLoad = linkSet.loads[i];
          for (var j = 0; j < pLoad.dependencies.length; j++) {
            var dep = pLoad.dependencies[j];
            if (dep.value == load.name) {
              exc = addToError(exc, 'Error loading ' + load.name + ' as "' + dep.key + '" from ' + pLoad.name);
              break checkError;
            }
          }
        }
        exc = addToError(exc, 'Error loading ' + load.name + ' from ' + linkSet.loads[0].name);
      }
    }
    else {
      exc = addToError(exc, 'Error linking ' + linkSet.loads[0].name);
    }


    var loads = linkSet.loads.concat([]);
    for (var i = 0, l = loads.length; i < l; i++) {
      var load = loads[i];

      // store all failed load records
      loader.loaderObj.failed = loader.loaderObj.failed || [];
      if (indexOf.call(loader.loaderObj.failed, load) == -1)
        loader.loaderObj.failed.push(load);

      var linkIndex = indexOf.call(load.linkSets, linkSet);
      console.assert(linkIndex != -1, 'link not present');
      load.linkSets.splice(linkIndex, 1);
      if (load.linkSets.length == 0) {
        var globalLoadsIndex = indexOf.call(linkSet.loader.loads, load);
        if (globalLoadsIndex != -1)
          linkSet.loader.loads.splice(globalLoadsIndex, 1);
      }
    }
    linkSet.reject(exc);
  }

  // 15.2.5.2.5
  function finishLoad(loader, load) {
    // add to global trace if tracing
    if (loader.loaderObj.trace) {
      if (!loader.loaderObj.loads)
        loader.loaderObj.loads = {};
      var depMap = {};
      load.dependencies.forEach(function(dep) {
        depMap[dep.key] = dep.value;
      });
      loader.loaderObj.loads[load.name] = {
        name: load.name,
        deps: load.dependencies.map(function(dep){ return dep.key }),
        depMap: depMap,
        address: load.address,
        metadata: load.metadata,
        source: load.source,
        kind: load.isDeclarative ? 'declarative' : 'dynamic'
      };
    }
    // if not anonymous, add to the module table
    if (load.name) {
      console.assert(!loader.modules[load.name], 'load not in module table');
      loader.modules[load.name] = load.module;
    }
    var loadIndex = indexOf.call(loader.loads, load);
    if (loadIndex != -1)
      loader.loads.splice(loadIndex, 1);
    for (var i = 0, l = load.linkSets.length; i < l; i++) {
      loadIndex = indexOf.call(load.linkSets[i].loads, load);
      if (loadIndex != -1)
        load.linkSets[i].loads.splice(loadIndex, 1);
    }
    load.linkSets.splice(0, load.linkSets.length);
  }

  function doDynamicExecute(linkSet, load, linkError) {
    try {
      var module = load.execute();
    }
    catch(e) {
      linkError(load, e);
      return;
    }
    if (!module || !(module instanceof Module))
      linkError(load, new TypeError('Execution must define a Module instance'));
    else
      return module;
  }

  // 26.3 Loader

  // 26.3.1.1
  // defined at top

  // importPromises adds ability to import a module twice without error - https://bugs.ecmascript.org/show_bug.cgi?id=2601
  function createImportPromise(loader, name, promise) {
    var importPromises = loader._loader.importPromises;
    return importPromises[name] = promise.then(function(m) {
      importPromises[name] = undefined;
      return m;
    }, function(e) {
      importPromises[name] = undefined;
      throw e;
    });
  }

  Loader.prototype = {
    // 26.3.3.1
    constructor: Loader,
    // 26.3.3.2
    define: function(name, source, options) {
      // check if already defined
      if (this._loader.importPromises[name])
        throw new TypeError('Module is already loading.');
      return createImportPromise(this, name, new Promise(asyncStartLoadPartwayThrough({
        step: 'translate',
        loader: this._loader,
        moduleName: name,
        moduleMetadata: options && options.metadata || {},
        moduleSource: source,
        moduleAddress: options && options.address
      })));
    },
    // 26.3.3.3
    'delete': function(name) {
      var loader = this._loader;
      delete loader.importPromises[name];
      delete loader.moduleRecords[name];
      return loader.modules[name] ? delete loader.modules[name] : false;
    },
    // 26.3.3.4 entries not implemented
    // 26.3.3.5
    get: function(key) {
      if (!this._loader.modules[key])
        return;
      doEnsureEvaluated(this._loader.modules[key], [], this);
      return this._loader.modules[key].module;
    },
    // 26.3.3.7
    has: function(name) {
      return !!this._loader.modules[name];
    },
    // 26.3.3.8
    'import': function(name, parentName, parentAddress) {
      if (typeof parentName == 'object')
        parentName = parentName.name;

      // run normalize first
      var loaderObj = this;

      // added, see https://bugs.ecmascript.org/show_bug.cgi?id=2659
      return Promise.resolve(loaderObj.normalize(name, parentName))
      .then(function(name) {
        var loader = loaderObj._loader;

        if (loader.modules[name]) {
          doEnsureEvaluated(loader.modules[name], [], loader._loader);
          return loader.modules[name].module;
        }

        return loader.importPromises[name] || createImportPromise(loaderObj, name,
          loadModule(loader, name, {})
          .then(function(load) {
            delete loader.importPromises[name];
            return evaluateLoadedModule(loader, load);
          }));
      });
    },
    // 26.3.3.9 keys not implemented
    // 26.3.3.10
    load: function(name) {
      var loader = this._loader;
      if (loader.modules[name])
        return Promise.resolve();
      return loader.importPromises[name] || createImportPromise(this, name, new Promise(asyncStartLoadPartwayThrough({
        step: 'locate',
        loader: loader,
        moduleName: name,
        moduleMetadata: {},
        moduleSource: undefined,
        moduleAddress: undefined
      }))
      .then(function() {
        delete loader.importPromises[name];
      }));
    },
    // 26.3.3.11
    module: function(source, options) {
      var load = createLoad();
      load.address = options && options.address;
      var linkSet = createLinkSet(this._loader, load);
      var sourcePromise = Promise.resolve(source);
      var loader = this._loader;
      var p = linkSet.done.then(function() {
        return evaluateLoadedModule(loader, load);
      });
      proceedToTranslate(loader, load, sourcePromise);
      return p;
    },
    // 26.3.3.12
    newModule: function (obj) {
      if (typeof obj != 'object')
        throw new TypeError('Expected object');

      var m = new Module();

      var pNames = [];
      if (Object.getOwnPropertyNames && obj != null)
        pNames = Object.getOwnPropertyNames(obj);
      else
        for (var key in obj)
          pNames.push(key);

      for (var i = 0; i < pNames.length; i++) (function(key) {
        defineProperty(m, key, {
          configurable: false,
          enumerable: true,
          get: function () {
            return obj[key];
          },
          set: function() {
            throw new Error('Module exports cannot be changed externally.');
          }
        });
      })(pNames[i]);

      if (Object.freeze)
        Object.freeze(m);

      return m;
    },
    // 26.3.3.14
    set: function(name, module) {
      if (!(module instanceof Module))
        throw new TypeError('Loader.set(' + name + ', module) must be a module');
      this._loader.modules[name] = {
        module: module
      };
    },
    // 26.3.3.15 values not implemented
    // 26.3.3.16 @@iterator not implemented
    // 26.3.3.17 @@toStringTag not implemented

    // 26.3.3.18.1
    normalize: function(name, referrerName, referrerAddress) {
      return name;
    },
    // 26.3.3.18.2
    locate: function(load) {
      return load.name;
    },
    // 26.3.3.18.3
    fetch: function(load) {
    },
    // 26.3.3.18.4
    translate: function(load) {
      return load.source;
    },
    // 26.3.3.18.5
    instantiate: function(load) {
    }
  };

  var _newModule = Loader.prototype.newModule;
/*
 * ES6 Module Declarative Linking Code - Dev Build Only
 */
  function link(linkSet, linkError) {

    var loader = linkSet.loader;

    if (!linkSet.loads.length)
      return;

    var loads = linkSet.loads.concat([]);

    for (var i = 0; i < loads.length; i++) {
      var load = loads[i];

      var module = doDynamicExecute(linkSet, load, linkError);
      if (!module)
        return;
      load.module = {
        name: load.name,
        module: module
      };
      load.status = 'linked';

      finishLoad(loader, load);
    }
  }

  function evaluateLoadedModule(loader, load) {
    console.assert(load.status == 'linked', 'is linked ' + load.name);
    return load.module.module;
  }

  function doEnsureEvaluated() {}

  function transpile() {
    throw new TypeError('ES6 transpilation is only provided in the dev module loader build.');
  }
})();/*
*********************************************************************************************

  System Loader Implementation

    - Implemented to https://github.com/jorendorff/js-loaders/blob/master/browser-loader.js

    - <script type="module"> supported

*********************************************************************************************
*/

var System;

function SystemLoader() {
  Loader.call(this);
  this.paths = {};
}

// NB no specification provided for System.paths, used ideas discussed in https://github.com/jorendorff/js-loaders/issues/25
function applyPaths(paths, name) {
  // most specific (most number of slashes in path) match wins
  var pathMatch = '', wildcard, maxWildcardPrefixLen = 0;

  // check to see if we have a paths entry
  for (var p in paths) {
    var pathParts = p.split('*');
    if (pathParts.length > 2)
      throw new TypeError('Only one wildcard in a path is permitted');

    // exact path match
    if (pathParts.length == 1) {
      if (name == p)
        return paths[p];
      
      // support trailing / in paths rules
      else if (name.substr(0, p.length - 1) == p.substr(0, p.length - 1) && (name.length < p.length || name[p.length - 1] == p[p.length - 1]) && paths[p][paths[p].length - 1] == '/')
        return paths[p].substr(0, paths[p].length - 1) + (name.length > p.length ? '/' + name.substr(p.length) : '');
    }
    // wildcard path match
    else {
      var wildcardPrefixLen = pathParts[0].length;
      if (wildcardPrefixLen >= maxWildcardPrefixLen &&
          name.substr(0, pathParts[0].length) == pathParts[0] &&
          name.substr(name.length - pathParts[1].length) == pathParts[1]) {
            maxWildcardPrefixLen = wildcardPrefixLen;
            pathMatch = p;
            wildcard = name.substr(pathParts[0].length, name.length - pathParts[1].length - pathParts[0].length);
          }
    }
  }

  var outPath = paths[pathMatch];
  if (typeof wildcard == 'string')
    outPath = outPath.replace('*', wildcard);

  return outPath;
}

// inline Object.create-style class extension
function LoaderProto() {}
LoaderProto.prototype = Loader.prototype;
SystemLoader.prototype = new LoaderProto();
  var fetchTextFromURL;
  if (typeof XMLHttpRequest != 'undefined') {
    fetchTextFromURL = function(url, authorization, fulfill, reject) {
      var xhr = new XMLHttpRequest();
      var sameDomain = true;
      var doTimeout = false;
      if (!('withCredentials' in xhr)) {
        // check if same domain
        var domainCheck = /^(\w+:)?\/\/([^\/]+)/.exec(url);
        if (domainCheck) {
          sameDomain = domainCheck[2] === window.location.host;
          if (domainCheck[1])
            sameDomain &= domainCheck[1] === window.location.protocol;
        }
      }
      if (!sameDomain && typeof XDomainRequest != 'undefined') {
        xhr = new XDomainRequest();
        xhr.onload = load;
        xhr.onerror = error;
        xhr.ontimeout = error;
        xhr.onprogress = function() {};
        xhr.timeout = 0;
        doTimeout = true;
      }
      function load() {
        fulfill(xhr.responseText);
      }
      function error() {
        reject(new Error('XHR error' + (xhr.status ? ' (' + xhr.status + (xhr.statusText ? ' ' + xhr.statusText  : '') + ')' : '') + ' loading ' + url));
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          // in Chrome on file:/// URLs, status is 0
          if (xhr.status == 0) {
            if (xhr.responseText) {
              load();
            }
            else {
              // when responseText is empty, wait for load or error event
              // to inform if it is a 404 or empty file
              xhr.addEventListener('error', error);
              xhr.addEventListener('load', load);
            }
          }
          else if (xhr.status === 200) {
            load();
          }
          else {
            error();
          }
        }
      };
      xhr.open("GET", url, true);

      if (xhr.setRequestHeader) {
        xhr.setRequestHeader('Accept', 'application/x-es-module, */*');
        // can set "authorization: true" to enable withCredentials only
        if (authorization) {
          if (typeof authorization == 'string')
            xhr.setRequestHeader('Authorization', authorization);
          xhr.withCredentials = true;
        }
      }

      if (doTimeout) {
        setTimeout(function() {
          xhr.send();
        }, 0);
      } else {
        xhr.send(null);
      }
    };
  }
  else if (typeof require != 'undefined' && typeof process != 'undefined') {
    var fs;
    fetchTextFromURL = function(url, authorization, fulfill, reject) {
      if (url.substr(0, 8) != 'file:///')
        throw new Error('Unable to fetch "' + url + '". Only file URLs of the form file:/// allowed running in Node.');
      fs = fs || require('fs');
      if (isWindows)
        url = url.replace(/\//g, '\\').substr(8);
      else
        url = url.substr(7);
      return fs.readFile(url, function(err, data) {
        if (err) {
          return reject(err);
        }
        else {
          // Strip Byte Order Mark out if it's the leading char
          var dataString = data + '';
          if (dataString[0] === '\ufeff')
            dataString = dataString.substr(1);

          fulfill(dataString);
        }
      });
    };
  }
  else if (typeof self != 'undefined' && typeof self.fetch != 'undefined') {
    fetchTextFromURL = function(url, authorization, fulfill, reject) {
      var opts = {
        headers: {'Accept': 'application/x-es-module, */*'}
      };

      if (authorization) {
        if (typeof authorization == 'string')
          opts.headers['Authorization'] = authorization;
        opts.credentials = 'include';
      }

      fetch(url, opts)
        .then(function (r) {
          if (r.ok) {
            return r.text();
          } else {
            throw new Error('Fetch error: ' + r.status + ' ' + r.statusText);
          }
        })
        .then(fulfill, reject);
    }
  }
  else {
    throw new TypeError('No environment fetch API available.');
  }

  SystemLoader.prototype.fetch = function(load) {
    return new Promise(function(resolve, reject) {
      fetchTextFromURL(load.address, undefined, resolve, reject);
    });
  };
/*
 * Traceur, Babel and TypeScript transpile hook for Loader
 */
var transpile = (function() {

  // use Traceur by default
  Loader.prototype.transpiler = 'traceur';

  function transpile(load) {
    var self = this;

    return Promise.resolve(__global[self.transpiler == 'typescript' ? 'ts' : self.transpiler]
        || (self.pluginLoader || self)['import'](self.transpiler))
    .then(function(transpiler) {
      if (transpiler.__useDefault)
        transpiler = transpiler['default'];

      var transpileFunction;
      if (transpiler.Compiler)
        transpileFunction = traceurTranspile;
      else if (transpiler.createLanguageService)
        transpileFunction = typescriptTranspile;
      else
        transpileFunction = babelTranspile;

      // note __moduleName will be part of the transformer meta in future when we have the spec for this
      return '(function(__moduleName){' + transpileFunction.call(self, load, transpiler) + '\n})("' + load.name + '");\n//# sourceURL=' + load.address + '!transpiled';
    });
  };

  function traceurTranspile(load, traceur) {
    var options = this.traceurOptions || {};
    options.modules = 'instantiate';
    options.script = false;
    if (options.sourceMaps === undefined)
      options.sourceMaps = 'inline';
    options.filename = load.address;
    options.inputSourceMap = load.metadata.sourceMap;
    options.moduleName = false;

    var compiler = new traceur.Compiler(options);

    return doTraceurCompile(load.source, compiler, options.filename);
  }
  function doTraceurCompile(source, compiler, filename) {
    try {
      return compiler.compile(source, filename);
    }
    catch(e) {
      // on older versions of traceur (<0.9.3), an array of errors is thrown
      // rather than a single error.
      if (e.length) {
        throw e[0];
      }
      throw e;
    }
  }

  function babelTranspile(load, babel) {
    var options = this.babelOptions || {};
    options.modules = 'system';
    if (options.sourceMap === undefined)
      options.sourceMap = 'inline';
    options.inputSourceMap = load.metadata.sourceMap;
    options.filename = load.address;
    options.code = true;
    options.ast = false;

    return babel.transform(load.source, options).code;
  }

  function typescriptTranspile(load, ts) {
    var options = this.typescriptOptions || {};
    options.target = options.target || ts.ScriptTarget.ES5;
    if (options.sourceMap === undefined)
      options.sourceMap = true;
    if (options.sourceMap && options.inlineSourceMap !== false)
      options.inlineSourceMap = true;

    options.module = ts.ModuleKind.System;

    return ts.transpile(load.source, options, load.address);
  }

  return transpile;
})();
// SystemJS Loader Class and Extension helpers

function SystemJSLoader() {
  SystemLoader.call(this);

  systemJSConstructor.call(this);
}

// inline Object.create-style class extension
function SystemProto() {};
SystemProto.prototype = SystemLoader.prototype;
SystemJSLoader.prototype = new SystemProto();
SystemJSLoader.prototype.constructor = SystemJSLoader;

// remove ESML instantiate
SystemJSLoader.prototype.instantiate = function() {};

var systemJSConstructor;

function hook(name, hook) {
  SystemJSLoader.prototype[name] = hook(SystemJSLoader.prototype[name] || function() {});
}
function hookConstructor(hook) {
  systemJSConstructor = hook(systemJSConstructor || function() {});
}

function dedupe(deps) {
  var newDeps = [];
  for (var i = 0, l = deps.length; i < l; i++)
    if (indexOf.call(newDeps, deps[i]) == -1)
      newDeps.push(deps[i])
  return newDeps;
}

function group(deps) {
  var names = [];
  var indices = [];
  for (var i = 0, l = deps.length; i < l; i++) {
    var index = indexOf.call(names, deps[i]);
    if (index === -1) {
      names.push(deps[i]);
      indices.push([i]);
    }
    else {
      indices[index].push(i);
    }
  }
  return { names: names, indices: indices };
}

var getOwnPropertyDescriptor = true;
try {
  Object.getOwnPropertyDescriptor({ a: 0 }, 'a');
}
catch(e) {
  getOwnPropertyDescriptor = false;
}

// converts any module.exports object into an object ready for SystemJS.newModule
function getESModule(exports) {
  var esModule = {};
  // don't trigger getters/setters in environments that support them
  if (typeof exports == 'object' || typeof exports == 'function') {
    var hasOwnProperty = exports && exports.hasOwnProperty;
    if (getOwnPropertyDescriptor) {
      for (var p in exports) {
        if (!trySilentDefineProperty(esModule, exports, p))
          setPropertyIfHasOwnProperty(esModule, exports, p, hasOwnProperty);
      }
    }
    else {
      for (var p in exports)
        setPropertyIfHasOwnProperty(esModule, exports, p, hasOwnProperty);
    }
  }
  esModule['default'] = exports;
  defineProperty(esModule, '__useDefault', {
    value: true
  });
  return esModule;
}

function setPropertyIfHasOwnProperty(targetObj, sourceObj, propName, hasOwnProperty) {
  if (!hasOwnProperty || sourceObj.hasOwnProperty(propName))
    targetObj[propName] = sourceObj[propName];
}

function trySilentDefineProperty(targetObj, sourceObj, propName) {
  try {
    var d;
    if (d = Object.getOwnPropertyDescriptor(sourceObj, propName))
      defineProperty(targetObj, propName, d);

    return true;
  } catch (ex) {
    // Object.getOwnPropertyDescriptor threw an exception, fall back to normal set property.
    return false;
  }
}

function extend(a, b, prepend) {
  for (var p in b) {
    if (!prepend || !(p in a))
      a[p] = b[p];
  }
  return a;
}

// package configuration options
var packageProperties = ['main', 'format', 'defaultExtension', 'meta', 'map', 'basePath', 'depCache'];

// meta first-level extends where:
// array + array appends
// object + object extends
// other properties replace
function extendMeta(a, b, prepend) {
  for (var p in b) {
    var val = b[p];
    if (!(p in a))
      a[p] = val;
    else if (val instanceof Array && a[p] instanceof Array)
      a[p] = [].concat(prepend ? val : a[p]).concat(prepend ? a[p] : val);
    else if (typeof val == 'object' && val !== null && typeof a[p] == 'object')
      a[p] = extend(extend({}, a[p]), val, prepend);
    else if (!prepend)
      a[p] = val;
  }
}

function warn(msg) {
  if (this.warnings && typeof console != 'undefined' && console.warn)
    console.warn(msg);
}
// we define a __exec for globally-scoped execution
// used by module format implementations
var __exec;

(function() {

  var hasBtoa = typeof btoa != 'undefined';

  function getSource(load) {
    var lastLineIndex = load.source.lastIndexOf('\n');

    // wrap ES formats with a System closure for System global encapsulation
    var wrap = load.metadata.format != 'global';

    var sourceMap = load.metadata.sourceMap;
    if (sourceMap) {
      if (typeof sourceMap != 'object')
        throw new TypeError('load.metadata.sourceMap must be set to an object.');

      sourceMap = JSON.stringify(sourceMap);
    }

    return (wrap ? '(function(System, SystemJS) {' : '') + load.source + (wrap ? '\n})(System, System);' : '')
        // adds the sourceURL comment if not already present
        + (load.source.substr(lastLineIndex, 15) != '\n//# sourceURL=' 
          ? '\n//# sourceURL=' + load.address + (sourceMap ? '!transpiled' : '') : '')
        // add sourceMappingURL if load.metadata.sourceMap is set
        + (sourceMap && hasBtoa && '\n//# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(sourceMap))) || '');
  }

  var curLoad;

  // System.register, System.registerDynamic, AMD define pipeline
  // if currently evalling code here, immediately reduce the registered entry against the load record
  hook('pushRegister_', function() {
    return function(register) {
      if (!curLoad)
        return false;

      this.reduceRegister_(curLoad, register);
      return true;
    };
  });

  // System clobbering protection (mostly for Traceur)
  var curSystem;
  var callCounter = 0;
  function preExec(loader, load) {
    curLoad = load;
    if (callCounter++ == 0)
      curSystem = __global.System;
    __global.System = __global.SystemJS = loader; 
  }
  function postExec() {
    if (--callCounter == 0)
      __global.System = __global.SystemJS = curSystem;
    curLoad = undefined;
  }

  var vm;
  __exec = function(load) {
    if (!load.source)
      return;
    if ((load.metadata.integrity || load.metadata.nonce) && supportsScriptExec)
      return scriptExec.call(this, load);
    try {
      preExec(this, load);
      curLoad = load;
      // global scoped eval for node (avoids require scope leak)
      if (this._nodeRequire) {
        vm = vm || this._nodeRequire('vm');
        vm.runInThisContext(getSource(load));
      }
      else {
        (0, eval)(getSource(load));
      }
      postExec();
    }
    catch(e) {
      postExec(); 
      throw addToError(e, 'Evaluating ' + load.address);
    }
  };

  var supportsScriptExec = false;
  if (isBrowser && typeof document != 'undefined' && document.getElementsByTagName) {
    var scripts = document.getElementsByTagName('script');
    $__curScript = scripts[scripts.length - 1];

    if (!(window.chrome && window.chrome.extension || navigator.userAgent.match(/^Node\.js/)))
      supportsScriptExec = true;
  }

  // script execution via injecting a script tag into the page
  // this allows CSP integrity and nonce to be set for CSP environments
  var head;
  function scriptExec(load) {
    if (!head)
      head = document.head || document.body || document.documentElement;

    var script = document.createElement('script');
    script.text = getSource(load, false);
    var onerror = window.onerror;
    var e;
    window.onerror = function(_e) {
      e = addToError(_e, 'Evaluating ' + load.address);
    }
    preExec(this, load);

    if (load.metadata.integrity)
      script.setAttribute('integrity', load.metadata.integrity);
    if (load.metadata.nonce)
      script.setAttribute('nonce', load.metadata.nonce);

    head.appendChild(script);
    head.removeChild(script);
    postExec();
    window.onerror = onerror;
    if (e)
      throw e;
  }

})();
var absURLRegEx = /^[^\/]+:\/\//;

function readMemberExpression(p, value) {
  var pParts = p.split('.');
  while (pParts.length)
    value = value[pParts.shift()];
  return value;
}

var baseURLCache = {};
function getBaseURLObj() {
  if (baseURLCache[this.baseURL])
    return baseURLCache[this.baseURL];

  // normalize baseURL if not already
  if (this.baseURL[this.baseURL.length - 1] != '/')
    this.baseURL += '/';

  var baseURL = new URL(this.baseURL, baseURI);

  this.baseURL = baseURL.href;

  return (baseURLCache[this.baseURL] = baseURL);
}

function getMapMatch(map, name) {
  var bestMatch, bestMatchLength = 0;

  for (var p in map) {
    if (name.substr(0, p.length) == p && (name.length == p.length || name[p.length] == '/')) {
      var curMatchLength = p.split('/').length;
      if (curMatchLength <= bestMatchLength)
        continue;
      bestMatch = p;
      bestMatchLength = curMatchLength;
    }
  }

  return bestMatch;
}

function setProduction(isProduction) {
  this.set('@system-env', this.newModule({
    browser: isBrowser,
    node: !!this._nodeRequire,
    production: isProduction,
    'default': true
  }));
}

var baseURIObj = new URL(baseURI);

hookConstructor(function(constructor) {
  return function() {
    constructor.call(this);

    // support baseURL
    this.baseURL = baseURI.substr(0, baseURI.lastIndexOf('/') + 1);

    // support map and paths
    this.map = {};
    this.paths = {};

    // global behaviour flags
    this.warnings = false;
    this.defaultJSExtensions = false;
    this.pluginFirst = false;
    this.loaderErrorStack = false;

    // by default load ".json" files as json
    // leading * meta doesn't need normalization
    // NB add this in next breaking release
    // this.meta['*.json'] = { format: 'json' };

    // support the empty module, as a concept
    this.set('@empty', this.newModule({}));

    setProduction.call(this, false);
  };
});

// include the node require since we're overriding it
if (typeof require != 'undefined' && typeof process != 'undefined' && !process.browser)
  SystemJSLoader.prototype._nodeRequire = require;

var nodeCoreModules = ['assert', 'buffer', 'child_process', 'cluster', 'console', 'constants', 
    'crypto', 'dgram', 'dns', 'domain', 'events', 'fs', 'http', 'https', 'module', 'net', 'os', 'path', 
    'process', 'punycode', 'querystring', 'readline', 'repl', 'stream', 'string_decoder', 'sys', 'timers', 
    'tls', 'tty', 'url', 'util', 'vm', 'zlib'];

/*
  Core SystemJS Normalization

  If a name is relative, we apply URL normalization to the page
  If a name is an absolute URL, we leave it as-is

  Plain names (neither of the above) run through the map and paths
  normalization phases.

  The paths normalization phase applies last (paths extension), which
  defines the `decanonicalize` function and normalizes everything into
  a URL.
 */

function isPlain(name) {
  return (name[0] != '.' || (!!name[1] && name[1] != '/' && name[1] != '.')) && name[0] != '/' && !name.match(absURLRegEx);
}

function urlResolve(name, parent) {
  if (parent)
    parent = parent.replace(/#/g, '%05');
  return new URL(name, parent || baseURIObj).href.replace(/%05/g, '#');
}

// only applies to plain names
function baseURLResolve(loader, name) {
  return new URL(name, getBaseURLObj.call(loader)).href;
}

function coreResolve(name, parentName) {
  // standard URL resolution
  if (!isPlain(name))
    return urlResolve(name, parentName);

  // plain names not starting with './', '://' and '/' go through custom resolution
  var mapMatch = getMapMatch(this.map, name);

  if (mapMatch) {
    name = this.map[mapMatch] + name.substr(mapMatch.length);

    if (!isPlain(name))
      return urlResolve(name);
  }

  if (this.has(name))
    return name;
  // dynamically load node-core modules when requiring `@node/fs` for example
  if (name.substr(0, 6) == '@node/' && nodeCoreModules.indexOf(name.substr(6)) != -1) {
    if (!this._nodeRequire)
      throw new TypeError('Error loading ' + name + '. Can only load node core modules in Node.');
    this.set(name, this.newModule(getESModule(this._nodeRequire(name.substr(6)))));
    return name;
  }

  var pathed = applyPaths(this.paths, name);

  if (pathed && !isPlain(pathed))
    return urlResolve(pathed);

  return baseURLResolve(this, pathed || name);
}

hook('normalize', function(normalize) {
  return function(name, parentName, skipExt) {
    var resolved = coreResolve.call(this, name, parentName);
    if (!skipExt && this.defaultJSExtensions && resolved.substr(resolved.length - 3, 3) != '.js' && !isPlain(resolved))
      resolved += '.js';
    return resolved;
  };
});

// percent encode just '#' in urls if using HTTP requests
var httpRequest = typeof XMLHttpRequest != 'undefined';
hook('locate', function(locate) {
  return function(load) {
    return Promise.resolve(locate.call(this, load))
    .then(function(address) {
      if (httpRequest)
        return address.replace(/#/g, '%23');
      return address;
    });
  };
});

/*
 * Fetch with authorization
 */
hook('fetch', function() {
  return function(load) {
    return new Promise(function(resolve, reject) {
      fetchTextFromURL(load.address, load.metadata.authorization, resolve, reject);
    });
  };
});

/*
  __useDefault
  
  When a module object looks like:
  newModule(
    __useDefault: true,
    default: 'some-module'
  })

  Then importing that module provides the 'some-module'
  result directly instead of the full module.

  Useful for eg module.exports = function() {}
*/
hook('import', function(systemImport) {
  return function(name, parentName, parentAddress) {
    if (parentName && parentName.name)
      warn.call(this, 'SystemJS.import(name, { name: parentName }) is deprecated for SystemJS.import(name, parentName), while importing ' + name + ' from ' + parentName.name);
    return systemImport.call(this, name, parentName, parentAddress).then(function(module) {
      return module.__useDefault ? module['default'] : module;
    });
  };
});

/*
 * Allow format: 'detect' meta to enable format detection
 */
hook('translate', function(systemTranslate) {
  return function(load) {
    if (load.metadata.format == 'detect')
      load.metadata.format = undefined;
    return systemTranslate.call(this, load);
  };
});


/*
 * JSON format support
 *
 * Supports loading JSON files as a module format itself
 *
 * Usage:
 *
 * SystemJS.config({
 *   meta: {
 *     '*.json': { format: 'json' }
 *   }
 * });
 *
 * Module is returned as if written:
 *
 * export default {JSON}
 *
 * No named exports are provided
 *
 * Files ending in ".json" are treated as json automatically by SystemJS
 */
hook('instantiate', function(instantiate) {
  return function(load) {
    if (load.metadata.format == 'json' && !this.builder) {
      var entry = load.metadata.entry = createEntry();
      entry.deps = [];
      entry.execute = function() {
        try {
          return JSON.parse(load.source);
        }
        catch(e) {
          throw new Error("Invalid JSON file " + load.name);
        }
      };
    }
  };
})

/*
 Extend config merging one deep only

  loader.config({
    some: 'random',
    config: 'here',
    deep: {
      config: { too: 'too' }
    }
  });

  <=>

  loader.some = 'random';
  loader.config = 'here'
  loader.deep = loader.deep || {};
  loader.deep.config = { too: 'too' };


  Normalizes meta and package configs allowing for:

  SystemJS.config({
    meta: {
      './index.js': {}
    }
  });

  To become

  SystemJS.meta['https://thissite.com/index.js'] = {};

  For easy normalization canonicalization with latest URL support.

*/
SystemJSLoader.prototype.env = 'development';

var curCurScript;
SystemJSLoader.prototype.config = function(cfg) {
  var loader = this;

  if ('loaderErrorStack' in cfg) {
    curCurScript = $__curScript;
    if (cfg.loaderErrorStack)
      $__curScript = undefined;
    else
      $__curScript = curCurScript;
  }

  if ('warnings' in cfg)
    loader.warnings = cfg.warnings;

  // transpiler deprecation path
  if (cfg.transpilerRuntime === false)
    loader._loader.loadedTranspilerRuntime = true;

  // always configure baseURL first
  if (cfg.baseURL) {
    var hasConfig = false;
    function checkHasConfig(obj) {
      for (var p in obj)
        if (hasOwnProperty.call(obj, p))
          return true;
    }
    if (checkHasConfig(loader.packages) || checkHasConfig(loader.meta) || checkHasConfig(loader.depCache) || checkHasConfig(loader.bundles) || checkHasConfig(loader.packageConfigPaths))
      throw new TypeError('Incorrect configuration order. The baseURL must be configured with the first SystemJS.config call.');

    loader.baseURL = cfg.baseURL;

    // sanitize baseURL
    getBaseURLObj.call(loader);
  }

  if (cfg.defaultJSExtensions) {
    loader.defaultJSExtensions = cfg.defaultJSExtensions;
    warn.call(loader, 'The defaultJSExtensions configuration option is deprecated, use packages configuration instead.');
  }

  if (cfg.pluginFirst)
    loader.pluginFirst = cfg.pluginFirst;

  if (cfg.production)
    setProduction.call(loader, true);

  if (cfg.paths) {
    for (var p in cfg.paths)
      loader.paths[p] = cfg.paths[p];
  }

  if (cfg.map) {
    var objMaps = '';
    for (var p in cfg.map) {
      var v = cfg.map[p];

      // object map backwards-compat into packages configuration
      if (typeof v !== 'string') {
        objMaps += (objMaps.length ? ', ' : '') + '"' + p + '"';

        var defaultJSExtension = loader.defaultJSExtensions && p.substr(p.length - 3, 3) != '.js';
        var prop = loader.decanonicalize(p);
        if (defaultJSExtension && prop.substr(prop.length - 3, 3) == '.js')
          prop = prop.substr(0, prop.length - 3);

        // if a package main, revert it
        var pkgMatch = '';
        for (var pkg in loader.packages) {
          if (prop.substr(0, pkg.length) == pkg 
              && (!prop[pkg.length] || prop[pkg.length] == '/') 
              && pkgMatch.split('/').length < pkg.split('/').length)
            pkgMatch = pkg;
        }
        if (pkgMatch && loader.packages[pkgMatch].main)
          prop = prop.substr(0, prop.length - loader.packages[pkgMatch].main.length - 1);

        var pkg = loader.packages[prop] = loader.packages[prop] || {};
        pkg.map = v;
      }
      else {
        loader.map[p] = v;
      }
    }
    if (objMaps)
      warn.call(loader, 'The map configuration for ' + objMaps + ' uses object submaps, which is deprecated in global map.\nUpdate this to use package contextual map with configs like SystemJS.config({ packages: { "' + p + '": { map: {...} } } }).');
  }

  if (cfg.packageConfigPaths) {
    var packageConfigPaths = [];
    for (var i = 0; i < cfg.packageConfigPaths.length; i++) {
      var path = cfg.packageConfigPaths[i];
      var packageLength = Math.max(path.lastIndexOf('*') + 1, path.lastIndexOf('/'));
      var defaultJSExtension = loader.defaultJSExtensions && path.substr(packageLength - 3, 3) != '.js';
      var normalized = loader.decanonicalize(path.substr(0, packageLength));
      if (defaultJSExtension && normalized.substr(normalized.length - 3, 3) == '.js')
        normalized = normalized.substr(0, normalized.length - 3);
      packageConfigPaths[i] = normalized + path.substr(packageLength);
    }
    loader.packageConfigPaths = packageConfigPaths;
  }

  if (cfg.bundles) {
    for (var p in cfg.bundles) {
      var bundle = [];
      for (var i = 0; i < cfg.bundles[p].length; i++) {
        var defaultJSExtension = loader.defaultJSExtensions && cfg.bundles[p][i].substr(cfg.bundles[p][i].length - 3, 3) != '.js';
        var normalizedBundleDep = loader.decanonicalize(cfg.bundles[p][i]);
        if (defaultJSExtension && normalizedBundleDep.substr(normalizedBundleDep.length - 3, 3) == '.js')
          normalizedBundleDep = normalizedBundleDep.substr(0, normalizedBundleDep.length - 3);
        bundle.push(normalizedBundleDep);
      }
      loader.bundles[p] = bundle;
    }
  }

  if (cfg.packages) {
    for (var p in cfg.packages) {
      if (p.match(/^([^\/]+:)?\/\/$/))
        throw new TypeError('"' + p + '" is not a valid package name.');

      var prop = coreResolve.call(loader, p);

      // allow trailing slash in packages
      if (prop[prop.length - 1] == '/')
        prop = prop.substr(0, prop.length - 1);

      loader.packages[prop] = loader.packages[prop] || {};

      var pkg = cfg.packages[p];

      // meta backwards compatibility
      if (pkg.modules) {
        warn.call(loader, 'Package ' + p + ' is configured with "modules", which is deprecated as it has been renamed to "meta".');
        pkg.meta = pkg.modules;
        delete pkg.modules;
      }

      if (typeof pkg.main == 'object') {
        pkg.map = pkg.map || {};
        pkg.map['./@main'] = pkg.main;
        pkg.main['default'] = pkg.main['default'] || './';
        pkg.main = '@main';
      }

      for (var q in pkg)
        if (indexOf.call(packageProperties, q) == -1)
          warn.call(loader, '"' + q + '" is not a valid package configuration option in package ' + p);

      extendMeta(loader.packages[prop], pkg);
    }
  }

  for (var c in cfg) {
    var v = cfg[c];

    if (c == 'baseURL' || c == 'map' || c == 'packages' || c == 'bundles' || c == 'paths' || c == 'warnings' || c == 'packageConfigPaths' || c == 'loaderErrorStack')
      continue;

    if (typeof v != 'object' || v instanceof Array) {
      loader[c] = v;
    }
    else {
      loader[c] = loader[c] || {};

      for (var p in v) {
        // base-level wildcard meta does not normalize to retain catch-all quality
        if (c == 'meta' && p[0] == '*') {
          loader[c][p] = v[p];
        }
        else if (c == 'meta') {
          // meta can go through global map, with defaultJSExtensions adding
          var resolved = coreResolve.call(loader, p);
          if (loader.defaultJSExtensions && resolved.substr(resolved.length - 3, 3) != '.js' && !isPlain(resolved))
            resolved += '.js';
          loader[c][resolved] = v[p];
        }
        else if (c == 'depCache') {
          var defaultJSExtension = loader.defaultJSExtensions && p.substr(p.length - 3, 3) != '.js';
          var prop = loader.decanonicalize(p);
          if (defaultJSExtension && prop.substr(prop.length - 3, 3) == '.js')
            prop = prop.substr(0, prop.length - 3);
          loader[c][prop] = v[p];
        }
        else {
          loader[c][p] = v[p];
        }
      }
    }
  }
};/*
 * Package Configuration Extension
 *
 * Example:
 *
 * SystemJS.packages = {
 *   jquery: {
 *     main: 'index.js', // when not set, package name is requested directly
 *     format: 'amd',
 *     defaultExtension: 'ts', // defaults to 'js', can be set to false
 *     modules: {
 *       '*.ts': {
 *         loader: 'typescript'
 *       },
 *       'vendor/sizzle.js': {
 *         format: 'global'
 *       }
 *     },
 *     map: {
 *        // map internal require('sizzle') to local require('./vendor/sizzle')
 *        sizzle: './vendor/sizzle.js',
 *        // map any internal or external require of 'jquery/vendor/another' to 'another/index.js'
 *        './vendor/another.js': './another/index.js',
 *        // test.js / test -> lib/test.js
 *        './test.js': './lib/test.js',
 *
 *        // environment-specific map configurations
 *        './index.js': {
 *          '~browser': './index-node.js'
 *        }
 *     },
 *     // allows for setting package-prefixed depCache
 *     // keys are normalized module names relative to the package itself
 *     depCache: {
 *       // import 'package/index.js' loads in parallel package/lib/test.js,package/vendor/sizzle.js
 *       './index.js': ['./test'],
 *       './test.js': ['external-dep'],
 *       'external-dep/path.js': ['./another.js']
 *     }
 *   }
 * };
 *
 * Then:
 *   import 'jquery'                       -> jquery/index.js
 *   import 'jquery/submodule'             -> jquery/submodule.js
 *   import 'jquery/submodule.ts'          -> jquery/submodule.ts loaded as typescript
 *   import 'jquery/vendor/another'        -> another/index.js
 *
 * Detailed Behaviours
 * - main can have a leading "./" can be added optionally
 * - map and defaultExtension are applied to the main
 * - defaultExtension adds the extension only if the exact extension is not present
 * - defaultJSExtensions applies after map when defaultExtension is not set
 * - if a meta value is available for a module, map and defaultExtension are skipped
 * - like global map, package map also applies to subpaths (sizzle/x, ./vendor/another/sub)
 * - condition module map is '@env' module in package or '@system-env' globally
 * - map targets support conditional interpolation ('./x': './x.#{|env}.js')
 * - internal package map targets cannot use boolean conditionals
 *
 * Package Configuration Loading
 *
 * Not all packages may already have their configuration present in the System config
 * For these cases, a list of packageConfigPaths can be provided, which when matched against
 * a request, will first request a ".json" file by the package name to derive the package
 * configuration from. This allows dynamic loading of non-predetermined code, a key use
 * case in SystemJS.
 *
 * Example:
 *
 *   SystemJS.packageConfigPaths = ['packages/test/package.json', 'packages/*.json'];
 *
 *   // will first request 'packages/new-package/package.json' for the package config
 *   // before completing the package request to 'packages/new-package/path'
 *   SystemJS.import('packages/new-package/path');
 *
 *   // will first request 'packages/test/package.json' before the main
 *   SystemJS.import('packages/test');
 *
 * When a package matches packageConfigPaths, it will always send a config request for
 * the package configuration.
 * The package name itself is taken to be the match up to and including the last wildcard
 * or trailing slash.
 * The most specific package config path will be used.
 * Any existing package configurations for the package will deeply merge with the
 * package config, with the existing package configurations taking preference.
 * To opt-out of the package configuration request for a package that matches
 * packageConfigPaths, use the { configured: true } package config option.
 *
 */
(function() {

  hookConstructor(function(constructor) {
    return function() {
      constructor.call(this);
      this.packages = {};
      this.packageConfigPaths = [];
    };
  });

  function getPackage(loader, normalized) {
    // use most specific package
    var curPkg, curPkgLen = 0, pkgLen;
    for (var p in loader.packages) {
      if (normalized.substr(0, p.length) === p && (normalized.length === p.length || normalized[p.length] === '/')) {
        pkgLen = p.split('/').length;
        if (pkgLen > curPkgLen) {
          curPkg = p;
          curPkgLen = pkgLen;
        }
      }
    }
    return curPkg;
  }

  function addDefaultExtension(loader, pkg, pkgName, subPath, skipExtensions) {
    // don't apply extensions to folders or if defaultExtension = false
    if (!subPath || subPath[subPath.length - 1] == '/' || skipExtensions || pkg.defaultExtension === false)
      return subPath;

    // NB are you sure about this?
    // skip if we have interpolation conditional syntax in subPath?
    if (subPath.match(interpolationRegEx))
      return subPath;

    var metaMatch = false;

    // exact meta or meta with any content after the last wildcard skips extension
    if (pkg.meta)
      getMetaMatches(pkg.meta, subPath, function(metaPattern, matchMeta, matchDepth) {
        if (matchDepth == 0 || metaPattern.lastIndexOf('*') != metaPattern.length - 1)
          return metaMatch = true;
      });

    // exact global meta or meta with any content after the last wildcard skips extension
    if (!metaMatch && loader.meta)
      getMetaMatches(loader.meta, pkgName + '/' + subPath, function(metaPattern, matchMeta, matchDepth) {
        if (matchDepth == 0 || metaPattern.lastIndexOf('*') != metaPattern.length - 1)
          return metaMatch = true;
      });

    if (metaMatch)
      return subPath;

    // work out what the defaultExtension is and add if not there already
    // NB reconsider if default should really be ".js"?
    var defaultExtension = '.' + (pkg.defaultExtension || 'js');
    if (subPath.substr(subPath.length - defaultExtension.length) != defaultExtension)
      return subPath + defaultExtension;
    else
      return subPath;
  }

  function applyPackageConfigSync(loader, pkg, pkgName, subPath, skipExtensions) {
    // main
    if (!subPath) {
      if (pkg.main)
        subPath = pkg.main.substr(0, 2) == './' ? pkg.main.substr(2) : pkg.main;
      // also no submap if name is package itself (import 'pkg' -> 'path/to/pkg.js')
      else
        // NB can add a default package main convention here when defaultJSExtensions is deprecated
        // if it becomes internal to the package then it would no longer be an exit path
        return pkgName + (loader.defaultJSExtensions ? '.js' : '');
    }

    // map config checking without then with extensions
    if (pkg.map) {
      var mapPath = './' + subPath;

      var mapMatch = getMapMatch(pkg.map, mapPath);

      // we then check map with the default extension adding
      if (!mapMatch) {
        mapPath = './' + addDefaultExtension(loader, pkg, pkgName, subPath, skipExtensions);
        if (mapPath != './' + subPath)
          mapMatch = getMapMatch(pkg.map, mapPath);
      }
      if (mapMatch)
        return doMapSync(loader, pkg, pkgName, mapMatch, mapPath, skipExtensions);
    }

    // normal package resolution
    return pkgName + '/' + addDefaultExtension(loader, pkg, pkgName, subPath, skipExtensions);
  }

  function validateMapping(mapMatch, mapped, pkgName) {
    // disallow internal to subpath maps
    if (mapMatch == '.')
      throw new Error('Package ' + pkgName + ' has a map entry for "." which is not permitted.');
    // disallow internal ./x -> ./x/y recursive maps
    else if (mapped.substr(0, mapMatch.length) == mapMatch && (mapMatch[mapMatch.length - 1] != '/' && mapped[mapMatch.length] == '/'))
      throw new Error('Package ' + pkgName + ' has a recursive map for "' + mapMatch + '" which is not permitted.');
  }

  function doMapSync(loader, pkg, pkgName, mapMatch, path, skipExtensions) {
    var mapped = pkg.map[mapMatch];

    if (typeof mapped == 'object')
      throw new Error('Synchronous conditional normalization not supported sync normalizing ' + mapMatch + ' in ' + pkgName);

    validateMapping(mapMatch, mapped, pkgName);

    // ignore conditionals in sync
    if (typeof mapped != 'string')
      mapped = mapMatch = path;

    validateMapping(mapMatch, mapped, pkgName);

    // package map to main / base-level
    if (mapped == '.')
      mapped = pkgName;

    // internal package map
    else if (mapped.substr(0, 2) == './')
      return pkgName + '/' + addDefaultExtension(loader, pkg, pkgName, mapped.substr(2) + path.substr(mapMatch.length), skipExtensions);
    
    // external map reference
    return loader.normalizeSync(mapped + path.substr(mapMatch.length), pkgName + '/');
  }

  function applyPackageConfig(loader, pkg, pkgName, subPath, skipExtensions) {
    // main
    if (!subPath) {
      if (pkg.main)
        subPath = pkg.main.substr(0, 2) == './' ? pkg.main.substr(2) : pkg.main;
      // also no submap if name is package itself (import 'pkg' -> 'path/to/pkg.js')
      else
        // NB can add a default package main convention here when defaultJSExtensions is deprecated
        // if it becomes internal to the package then it would no longer be an exit path
        return Promise.resolve(pkgName + (loader.defaultJSExtensions ? '.js' : ''));
    }

    // map config checking without then with extensions
    var mapPath, mapMatch;

    if (pkg.map) {
      mapPath = './' + subPath;
      mapMatch = getMapMatch(pkg.map, mapPath);

      // we then check map with the default extension adding
      if (!mapMatch) {
        mapPath = './' + addDefaultExtension(loader, pkg, pkgName, subPath, skipExtensions);
        if (mapPath != './' + subPath)
          mapMatch = getMapMatch(pkg.map, mapPath);
      }
    }

    return (mapMatch ? doMap(loader, pkg, pkgName, mapMatch, mapPath, skipExtensions) : Promise.resolve())
    .then(function(mapped) {
      if (mapped)
        return Promise.resolve(mapped);

      // normal package resolution / fallback resolution for no conditional match
      return Promise.resolve(pkgName + '/' + addDefaultExtension(loader, pkg, pkgName, subPath, skipExtensions));
    });
  }

  function doStringMap(loader, pkg, pkgName, mapMatch, mapped, path, skipExtensions) {
    // NB the interpolation cases should strictly skip subsequent interpolation

    // package map to main / base-level
    if (mapped == '.')
      mapped = pkgName;
    
    // internal package map
    else if (mapped.substr(0, 2) == './')
      return Promise.resolve(pkgName + '/' + addDefaultExtension(loader, pkg, pkgName, mapped.substr(2) + path.substr(mapMatch.length), skipExtensions))
      .then(function(name) {
        return interpolateConditional.call(loader, name, pkgName + '/');
      });
    
    // external map reference
    return loader.normalize(mapped + path.substr(mapMatch.length), pkgName + '/');
  }

  function doMap(loader, pkg, pkgName, mapMatch, path, skipExtensions) {
    var mapped = pkg.map[mapMatch];

    if (typeof mapped == 'string') {
      validateMapping(mapMatch, mapped, pkgName);
      return doStringMap(loader, pkg, pkgName, mapMatch, mapped, path, skipExtensions);
    }

    // we use a special conditional syntax to allow the builder to handle conditional branch points further
    if (loader.builder)
      return Promise.resolve(pkgName + '/#:' + path);

    // map object -> conditional map
    return loader['import'](pkg.map['@env'] || '@system-env', pkgName)
    .then(function(env) {
      // first map condition to match is used
      for (var e in mapped) {
        var negate = e[0] == '~';

        var value = readMemberExpression(negate ? e.substr(1) : e, env);

        if (!negate && value || negate && !value)
          return mapped[e];
      }
    })
    .then(function(mapped) {
      if (mapped) {
        if (typeof mapped != 'string')
          throw new Error('Unable to map a package conditional to a package conditional.');
        validateMapping(mapMatch, mapped, pkgName);
        return doStringMap(loader, pkg, pkgName, mapMatch, mapped, path, skipExtensions);
      }

      // no environment match -> fallback to original subPath by returning undefined
    });
  }

  // normalizeSync = decanonicalize + package resolution
  SystemJSLoader.prototype.normalizeSync = SystemJSLoader.prototype.decanonicalize = SystemJSLoader.prototype.normalize;

  // decanonicalize must JUST handle package defaultExtension: false case when defaultJSExtensions is set
  // to be deprecated!
  hook('decanonicalize', function(decanonicalize) {
    return function(name, parentName) {
      if (this.builder)
        return decanonicalize.call(this, name, parentName, true);

      var decanonicalized = decanonicalize.call(this, name, parentName);

      if (!this.defaultJSExtensions)
        return decanonicalized;
    
      var pkgName = getPackage(this, decanonicalized);

      var pkg = this.packages[pkgName];
      var defaultExtension = pkg && pkg.defaultExtension;

      if (defaultExtension == undefined && pkg && pkg.meta)
        getMetaMatches(pkg.meta, decanonicalized.substr(pkgName), function(metaPattern, matchMeta, matchDepth) {
          if (matchDepth == 0 || metaPattern.lastIndexOf('*') != metaPattern.length - 1) {
            defaultExtension = false;
            return true;
          }
        });
      
      if ((defaultExtension === false || defaultExtension && defaultExtension != '.js') && name.substr(name.length - 3, 3) != '.js' && decanonicalized.substr(decanonicalized.length - 3, 3) == '.js')
        decanonicalized = decanonicalized.substr(0, decanonicalized.length - 3);

      return decanonicalized;
    };
  });

  hook('normalizeSync', function(normalizeSync) {
    return function(name, parentName, isPlugin) {
      warn.call(this, 'SystemJS.normalizeSync has been deprecated for SystemJS.decanonicalize.');

      var loader = this;
      isPlugin = isPlugin === true;

      // apply contextual package map first
      // (we assume the parent package config has already been loaded)
      if (parentName)
        var parentPackageName = getPackage(loader, parentName) ||
            loader.defaultJSExtensions && parentName.substr(parentName.length - 3, 3) == '.js' &&
            getPackage(loader, parentName.substr(0, parentName.length - 3));

      var parentPackage = parentPackageName && loader.packages[parentPackageName];

      // ignore . since internal maps handled by standard package resolution
      if (parentPackage && name[0] != '.') {
        var parentMap = parentPackage.map;
        var parentMapMatch = parentMap && getMapMatch(parentMap, name);

        if (parentMapMatch && typeof parentMap[parentMapMatch] == 'string')
          return doMapSync(loader, parentPackage, parentPackageName, parentMapMatch, name, isPlugin);
      }

      var defaultJSExtension = loader.defaultJSExtensions && name.substr(name.length - 3, 3) != '.js';

      // apply map, core, paths, contextual package map
      var normalized = normalizeSync.call(loader, name, parentName);

      // undo defaultJSExtension
      if (defaultJSExtension && normalized.substr(normalized.length - 3, 3) != '.js')
        defaultJSExtension = false;
      if (defaultJSExtension)
        normalized = normalized.substr(0, normalized.length - 3);

      var pkgConfigMatch = getPackageConfigMatch(loader, normalized);
      var pkgName = pkgConfigMatch && pkgConfigMatch.packageName || getPackage(loader, normalized);

      if (!pkgName)
        return normalized + (defaultJSExtension ? '.js' : '');

      var subPath = normalized.substr(pkgName.length + 1);

      return applyPackageConfigSync(loader, loader.packages[pkgName] || {}, pkgName, subPath, isPlugin);
    };
  });

  hook('normalize', function(normalize) {
    return function(name, parentName, isPlugin) {
      var loader = this;
      isPlugin = isPlugin === true;

      return Promise.resolve()
      .then(function() {
        // apply contextual package map first
        // (we assume the parent package config has already been loaded)
        if (parentName)
          var parentPackageName = getPackage(loader, parentName) ||
              loader.defaultJSExtensions && parentName.substr(parentName.length - 3, 3) == '.js' &&
              getPackage(loader, parentName.substr(0, parentName.length - 3));

        var parentPackage = parentPackageName && loader.packages[parentPackageName];

        // ignore . since internal maps handled by standard package resolution
        if (parentPackage && name.substr(0, 2) != './') {
          var parentMap = parentPackage.map;
          var parentMapMatch = parentMap && getMapMatch(parentMap, name);

          if (parentMapMatch)
            return doMap(loader, parentPackage, parentPackageName, parentMapMatch, name, isPlugin);
        }

        return Promise.resolve();
      })
      .then(function(mapped) {
        if (mapped)
          return mapped;

        var defaultJSExtension = loader.defaultJSExtensions && name.substr(name.length - 3, 3) != '.js';

        // apply map, core, paths, contextual package map
        var normalized = normalize.call(loader, name, parentName);

        // undo defaultJSExtension
        if (defaultJSExtension && normalized.substr(normalized.length - 3, 3) != '.js')
          defaultJSExtension = false;
        if (defaultJSExtension)
          normalized = normalized.substr(0, normalized.length - 3);

        var pkgConfigMatch = getPackageConfigMatch(loader, normalized);
        var pkgName = pkgConfigMatch && pkgConfigMatch.packageName || getPackage(loader, normalized);

        if (!pkgName)
          return Promise.resolve(normalized + (defaultJSExtension ? '.js' : ''));

        var pkg = loader.packages[pkgName];

        // if package is already configured or not a dynamic config package, use existing package config
        var isConfigured = pkg && (pkg.configured || !pkgConfigMatch);
        return (isConfigured ? Promise.resolve(pkg) : loadPackageConfigPath(loader, pkgName, pkgConfigMatch.configPath))
        .then(function(pkg) {
          var subPath = normalized.substr(pkgName.length + 1);

          return applyPackageConfig(loader, pkg, pkgName, subPath, isPlugin);
        });
      });
    };
  });

  // check if the given normalized name matches a packageConfigPath
  // if so, loads the config
  var packageConfigPaths = {};

  // data object for quick checks against package paths
  function createPkgConfigPathObj(path) {
    var lastWildcard = path.lastIndexOf('*');
    var length = Math.max(lastWildcard + 1, path.lastIndexOf('/'));
    return {
      length: length,
      regEx: new RegExp('^(' + path.substr(0, length).replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '[^\\/]+') + ')(\\/|$)'),
      wildcard: lastWildcard != -1
    };
  }

  // most specific match wins
  function getPackageConfigMatch(loader, normalized) {
    var pkgName, exactMatch = false, configPath;
    for (var i = 0; i < loader.packageConfigPaths.length; i++) {
      var packageConfigPath = loader.packageConfigPaths[i];
      var p = packageConfigPaths[packageConfigPath] || (packageConfigPaths[packageConfigPath] = createPkgConfigPathObj(packageConfigPath));
      if (normalized.length < p.length)
        continue;
      var match = normalized.match(p.regEx);
      if (match && (!pkgName || (!(exactMatch && p.wildcard) && pkgName.length < match[1].length))) {
        pkgName = match[1];
        exactMatch = !p.wildcard;
        configPath = pkgName + packageConfigPath.substr(p.length);
      }
    }

    if (!pkgName)
      return;

    return {
      packageName: pkgName,
      configPath: configPath
    };
  }

  function loadPackageConfigPath(loader, pkgName, pkgConfigPath) {
    var configLoader = loader.pluginLoader || loader;

    // NB remove this when json is default
    (configLoader.meta[pkgConfigPath] = configLoader.meta[pkgConfigPath] || {}).format = 'json';
    configLoader.meta[pkgConfigPath].loader = null;

    return configLoader.load(pkgConfigPath)
    .then(function() {
      var cfg = configLoader.get(pkgConfigPath)['default'];

      // support "systemjs" prefixing
      if (cfg.systemjs)
        cfg = cfg.systemjs;

      // modules backwards compatibility
      if (cfg.modules) {
        cfg.meta = cfg.modules;
        warn.call(loader, 'Package config file ' + pkgConfigPath + ' is configured with "modules", which is deprecated as it has been renamed to "meta".');
      }

      // remove any non-system properties if generic config file (eg package.json)
      for (var p in cfg) {
        if (indexOf.call(packageProperties, p) == -1)
          delete cfg[p];
      }

      // deeply-merge (to first level) config with any existing package config
      var pkg = loader.packages[pkgName] = loader.packages[pkgName] || {};
      extendMeta(pkg, cfg, true);

      // support external depCache
      if (cfg.depCache) {
        for (var d in cfg.depCache) {
          var dNormalized;

          if (d.substr(0, 2) == './')
            dNormalized = pkgName + '/' + d.substr(2);
          else
            dNormalized = coreResolve.call(loader, d);
          loader.depCache[dNormalized] = (loader.depCache[dNormalized] || []).concat(cfg.depCache[d]);
        }
        delete cfg.depCache;
      }

      // main object becomes main map
      if (typeof pkg.main == 'object') {
        pkg.map = pkg.map || {};
        pkg.map['./@main'] = pkg.main;
        pkg.main['default'] = pkg.main['default'] || './';
        pkg.main = '@main';
      }

      return pkg;
    });
  }

  function getMetaMatches(pkgMeta, subPath, matchFn) {
    // wildcard meta
    var meta = {};
    var wildcardIndex;
    for (var module in pkgMeta) {
      // allow meta to start with ./ for flexibility
      var dotRel = module.substr(0, 2) == './' ? './' : '';
      if (dotRel)
        module = module.substr(2);

      wildcardIndex = module.indexOf('*');
      if (wildcardIndex === -1)
        continue;

      if (module.substr(0, wildcardIndex) == subPath.substr(0, wildcardIndex)
          && module.substr(wildcardIndex + 1) == subPath.substr(subPath.length - module.length + wildcardIndex + 1)) {
        // alow match function to return true for an exit path
        if (matchFn(module, pkgMeta[dotRel + module], module.split('/').length))
          return;
      }
    }
    // exact meta
    var exactMeta = pkgMeta[subPath] && pkgMeta.hasOwnProperty && pkgMeta.hasOwnProperty(subPath) ? pkgMeta[subPath] : pkgMeta['./' + subPath];
    if (exactMeta)
      matchFn(exactMeta, exactMeta, 0);
  }

  hook('locate', function(locate) {
    return function(load) {
      var loader = this;
      return Promise.resolve(locate.call(this, load))
      .then(function(address) {
        var pkgName = getPackage(loader, load.name);
        if (pkgName) {
          var pkg = loader.packages[pkgName];
          var subPath = load.name.substr(pkgName.length + 1);

          // format
          if (pkg.format)
            load.metadata.format = load.metadata.format || pkg.format;

          var meta = {};
          if (pkg.meta) {
            var bestDepth = 0;

            // NB support a main shorthand in meta here?
            getMetaMatches(pkg.meta, subPath, function(metaPattern, matchMeta, matchDepth) {
              if (matchDepth > bestDepth)
                bestDepth = matchDepth;
              extendMeta(meta, matchMeta, matchDepth && bestDepth > matchDepth);
            });

            extendMeta(load.metadata, meta);
          }
        }

        return address;
      });
    };
  });

})();
/*
 * Script tag fetch
 *
 * When load.metadata.scriptLoad is true, we load via script tag injection.
 */
(function() {

  if (typeof document != 'undefined')
    var head = document.getElementsByTagName('head')[0];

  var curSystem;
  var curRequire;

  // if doing worker executing, this is set to the load record being executed
  var workerLoad = null;
  
  // interactive mode handling method courtesy RequireJS
  var ieEvents = head && (function() {
    var s = document.createElement('script');
    var isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]';
    return s.attachEvent && !(s.attachEvent.toString && s.attachEvent.toString().indexOf('[native code') < 0) && !isOpera;
  })();

  // IE interactive-only part
  // we store loading scripts array as { script: <script>, load: {...} }
  var interactiveLoadingScripts = [];
  var interactiveScript;
  function getInteractiveScriptLoad() {
    if (interactiveScript && interactiveScript.script.readyState === 'interactive')
      return interactiveScript.load;

    for (var i = 0; i < interactiveLoadingScripts.length; i++)
      if (interactiveLoadingScripts[i].script.readyState == 'interactive') {
        interactiveScript = interactiveLoadingScripts[i];
        return interactiveScript.load;
      }
  }
  
  // System.register, System.registerDynamic, AMD define pipeline
  // this is called by the above methods when they execute
  // we then run the reduceRegister_ collection function either immediately
  // if we are in IE and know the currently executing script (interactive)
  // or later if we need to wait for the synchronous load callback to know the script
  var loadingCnt = 0;
  var registerQueue = [];
  hook('pushRegister_', function(pushRegister) {
    return function(register) {
      // if using eval-execution then skip
      if (pushRegister.call(this, register))
        return false;

      // if using worker execution, then we're done
      if (workerLoad)
        this.reduceRegister_(workerLoad, register);

      // detect if we know the currently executing load (IE)
      // if so, immediately call reduceRegister
      else if (ieEvents)
        this.reduceRegister_(getInteractiveScriptLoad(), register);

      // otherwise, add to our execution queue
      // to call reduceRegister on sync script load event
      else if (loadingCnt)
        registerQueue.push(register);

      // if we're not currently loading anything though
      // then do the reduction against a null load
      // (out of band named define or named register)
      // note even in non-script environments, this catch is used
      else
        this.reduceRegister_(null, register);

      return true;
    };
  });

  function webWorkerImport(loader, load) {
    return new Promise(function(resolve, reject) {
      if (load.metadata.integrity)
        reject(new Error('Subresource integrity checking is not supported in web workers.'));

      workerLoad = load;
      try {
        importScripts(load.address);
      }
      catch(e) {
        workerLoad = null;
        reject(e);
      }
      workerLoad = null;

      // if nothing registered, then something went wrong
      if (!load.metadata.entry)
        reject(new Error(load.address + ' did not call System.register or AMD define'));

      resolve('');
    });
  }

  // override fetch to use script injection
  hook('fetch', function(fetch) {
    return function(load) {
      var loader = this;

      if (load.metadata.format == 'json' || !load.metadata.scriptLoad || (!isBrowser && !isWorker))
        return fetch.call(this, load);

      if (isWorker)
        return webWorkerImport(loader, load);

      return new Promise(function(resolve, reject) {
        var s = document.createElement('script');
        
        s.async = true;

        if (load.metadata.crossOrigin)
          s.crossOrigin = load.metadata.crossOrigin;

        if (load.metadata.integrity)
          s.setAttribute('integrity', load.metadata.integrity);

        if (ieEvents) {
          s.attachEvent('onreadystatechange', complete);
          interactiveLoadingScripts.push({
            script: s,
            load: load
          });
        }
        else {
          s.addEventListener('load', complete, false);
          s.addEventListener('error', error, false);
        }

        loadingCnt++;

        curSystem = __global.System;
        curRequire = __global.require;

        s.src = load.address;
        head.appendChild(s);

        function complete(evt) {
          if (s.readyState && s.readyState != 'loaded' && s.readyState != 'complete')
            return;

          loadingCnt--;

          // complete call is sync on execution finish
          // (in ie already done reductions)
          if (!load.metadata.entry && !registerQueue.length) {
            loader.reduceRegister_(load);
          }
          else if (!ieEvents) {
            for (var i = 0; i < registerQueue.length; i++)
              loader.reduceRegister_(load, registerQueue[i]);
            registerQueue = [];
          }

          cleanup();

          // if nothing registered, then something went wrong
          if (!load.metadata.entry && !load.metadata.bundle)
            reject(new Error(load.name + ' did not call System.register or AMD define. If loading a global module configure the global name via the meta exports property for script injection support.'));

          resolve('');
        }

        function error(evt) {
          cleanup();
          reject(new Error('Unable to load script ' + load.address));
        }

        function cleanup() {
          __global.System = curSystem;
          __global.require = curRequire;

          if (s.detachEvent) {
            s.detachEvent('onreadystatechange', complete);
            for (var i = 0; i < interactiveLoadingScripts.length; i++)
              if (interactiveLoadingScripts[i].script == s) {
                if (interactiveScript && interactiveScript.script == s)
                  interactiveScript = null;
                interactiveLoadingScripts.splice(i, 1);
              }
          }
          else {
            s.removeEventListener('load', complete, false);
            s.removeEventListener('error', error, false);
          }

          head.removeChild(s);
        }
      });
    };
  });
})();
/*
 * Instantiate registry extension
 *
 * Supports Traceur System.register 'instantiate' output for loading ES6 as ES5.
 *
 * - Creates the loader.register function
 * - Also supports metadata.format = 'register' in instantiate for anonymous register modules
 * - Also supports metadata.deps, metadata.execute and metadata.executingRequire
 *     for handling dynamic modules alongside register-transformed ES6 modules
 *
 *
 * The code here replicates the ES6 linking groups algorithm to ensure that
 * circular ES6 compiled into System.register can work alongside circular AMD 
 * and CommonJS, identically to the actual ES6 loader.
 *
 */


/*
 * Registry side table entries in loader.defined
 * Registry Entry Contains:
 *    - name
 *    - deps 
 *    - declare for declarative modules
 *    - execute for dynamic modules, different to declarative execute on module
 *    - executingRequire indicates require drives execution for circularity of dynamic modules
 *    - declarative optional boolean indicating which of the above
 *
 * Can preload modules directly on SystemJS.defined['my/module'] = { deps, execute, executingRequire }
 *
 * Then the entry gets populated with derived information during processing:
 *    - normalizedDeps derived from deps, created in instantiate
 *    - groupIndex used by group linking algorithm
 *    - evaluated indicating whether evaluation has happend
 *    - module the module record object, containing:
 *      - exports actual module exports
 *
 *    For dynamic we track the es module with:
 *    - esModule actual es module value
 *    - esmExports whether to extend the esModule with named exports
 *      
 *    Then for declarative only we track dynamic bindings with the 'module' records:
 *      - name
 *      - exports
 *      - setters declarative setter functions
 *      - dependencies, module records of dependencies
 *      - importers, module records of dependents
 *
 * After linked and evaluated, entries are removed, declarative module records remain in separate
 * module binding table
 *
 */

var leadingCommentAndMetaRegEx = /^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)*\s*/;
function detectRegisterFormat(source) {
  var leadingCommentAndMeta = source.match(leadingCommentAndMetaRegEx);
  return leadingCommentAndMeta && source.substr(leadingCommentAndMeta[0].length, 15) == 'System.register';
}

function createEntry() {
  return {
    name: null,
    deps: null,
    originalIndices: null,
    declare: null,
    execute: null,
    executingRequire: false,
    declarative: false,
    normalizedDeps: null,
    groupIndex: null,
    evaluated: false,
    module: null,
    esModule: null,
    esmExports: false
  };
}

(function() {

  /*
   * There are two variations of System.register:
   * 1. System.register for ES6 conversion (2-3 params) - System.register([name, ]deps, declare)
   *    see https://github.com/ModuleLoader/es6-module-loader/wiki/System.register-Explained
   *
   * 2. System.registerDynamic for dynamic modules (3-4 params) - System.registerDynamic([name, ]deps, executingRequire, execute)
   * the true or false statement 
   *
   * this extension implements the linking algorithm for the two variations identical to the spec
   * allowing compiled ES6 circular references to work alongside AMD and CJS circular references.
   *
   */
  SystemJSLoader.prototype.register = function(name, deps, declare) {
    if (typeof name != 'string') {
      declare = deps;
      deps = name;
      name = null;
    }

    // dynamic backwards-compatibility
    // can be deprecated eventually
    if (typeof declare == 'boolean')
      return this.registerDynamic.apply(this, arguments);

    var entry = createEntry();
    // ideally wouldn't apply map config to bundle names but 
    // dependencies go through map regardless so we can't restrict
    // could reconsider in shift to new spec
    entry.name = name && (this.decanonicalize || this.normalize).call(this, name);
    entry.declarative = true;
    entry.deps = deps;
    entry.declare = declare;

    this.pushRegister_({
      amd: false,
      entry: entry
    });
  };
  SystemJSLoader.prototype.registerDynamic = function(name, deps, declare, execute) {
    if (typeof name != 'string') {
      execute = declare;
      declare = deps;
      deps = name;
      name = null;
    }

    // dynamic
    var entry = createEntry();
    entry.name = name && (this.decanonicalize || this.normalize).call(this, name);
    entry.deps = deps;
    entry.execute = execute;
    entry.executingRequire = declare;

    this.pushRegister_({
      amd: false,
      entry: entry
    });
  };
  hook('reduceRegister_', function() {
    return function(load, register) {
      if (!register)
        return;

      var entry = register.entry;
      var curMeta = load && load.metadata;

      // named register
      if (entry.name) {
        if (!(entry.name in this.defined))
          this.defined[entry.name] = entry;

        if (curMeta)
          curMeta.bundle = true;
      }
      // anonymous register
      if (!entry.name || load && entry.name == load.name) {
        if (!curMeta)
          throw new TypeError('Invalid System.register call. Anonymous System.register calls can only be made by modules loaded by SystemJS.import and not via script tags.');
        if (curMeta.entry) {
          if (curMeta.format == 'register')
            throw new Error('Multiple anonymous System.register calls in module ' + load.name + '. If loading a bundle, ensure all the System.register calls are named.');
          else
            throw new Error('Module ' + load.name + ' interpreted as ' + curMeta.format + ' module format, but called System.register.');
        }
        if (!curMeta.format)
          curMeta.format = 'register';
        curMeta.entry = entry;
      }
    };
  });

  hookConstructor(function(constructor) {
    return function() {
      constructor.call(this);

      this.defined = {};
      this._loader.moduleRecords = {};
    };
  });

  function buildGroups(entry, loader, groups) {
    groups[entry.groupIndex] = groups[entry.groupIndex] || [];

    if (indexOf.call(groups[entry.groupIndex], entry) != -1)
      return;

    groups[entry.groupIndex].push(entry);

    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      var depEntry = loader.defined[depName];
      
      // not in the registry means already linked / ES6
      if (!depEntry || depEntry.evaluated)
        continue;
      
      // now we know the entry is in our unlinked linkage group
      var depGroupIndex = entry.groupIndex + (depEntry.declarative != entry.declarative);

      // the group index of an entry is always the maximum
      if (depEntry.groupIndex === null || depEntry.groupIndex < depGroupIndex) {
        
        // if already in a group, remove from the old group
        if (depEntry.groupIndex !== null) {
          groups[depEntry.groupIndex].splice(indexOf.call(groups[depEntry.groupIndex], depEntry), 1);

          // if the old group is empty, then we have a mixed depndency cycle
          if (groups[depEntry.groupIndex].length == 0)
            throw new Error("Mixed dependency cycle detected");
        }

        depEntry.groupIndex = depGroupIndex;
      }

      buildGroups(depEntry, loader, groups);
    }
  }

  function link(name, loader) {
    var startEntry = loader.defined[name];

    // skip if already linked
    if (startEntry.module)
      return;

    startEntry.groupIndex = 0;

    var groups = [];

    buildGroups(startEntry, loader, groups);

    var curGroupDeclarative = !!startEntry.declarative == groups.length % 2;
    for (var i = groups.length - 1; i >= 0; i--) {
      var group = groups[i];
      for (var j = 0; j < group.length; j++) {
        var entry = group[j];

        // link each group
        if (curGroupDeclarative)
          linkDeclarativeModule(entry, loader);
        else
          linkDynamicModule(entry, loader);
      }
      curGroupDeclarative = !curGroupDeclarative; 
    }
  }

  // module binding records
  function ModuleRecord() {}
  defineProperty(ModuleRecord, 'toString', {
    value: function() {
      return 'Module';
    }
  });

  function getOrCreateModuleRecord(name, moduleRecords) {
    return moduleRecords[name] || (moduleRecords[name] = {
      name: name,
      dependencies: [],
      exports: new ModuleRecord(), // start from an empty module and extend
      importers: []
    });
  }

  function linkDeclarativeModule(entry, loader) {
    // only link if already not already started linking (stops at circular)
    if (entry.module)
      return;

    var moduleRecords = loader._loader.moduleRecords;
    var module = entry.module = getOrCreateModuleRecord(entry.name, moduleRecords);
    var exports = entry.module.exports;

    var declaration = entry.declare.call(__global, function(name, value) {
      module.locked = true;

      if (typeof name == 'object') {
        for (var p in name)
          exports[p] = name[p];
      }
      else {
        exports[name] = value;
      }

      for (var i = 0, l = module.importers.length; i < l; i++) {
        var importerModule = module.importers[i];
        if (!importerModule.locked) {
          var importerIndex = indexOf.call(importerModule.dependencies, module);
          importerModule.setters[importerIndex](exports);
        }
      }

      module.locked = false;
      return value;
    }, { id: entry.name });
    
    module.setters = declaration.setters;
    module.execute = declaration.execute;

    if (!module.setters || !module.execute) {
      throw new TypeError('Invalid System.register form for ' + entry.name);
    }

    // now link all the module dependencies
    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      var depEntry = loader.defined[depName];
      var depModule = moduleRecords[depName];

      // work out how to set depExports based on scenarios...
      var depExports;

      if (depModule) {
        depExports = depModule.exports;
      }
      // dynamic, already linked in our registry
      else if (depEntry && !depEntry.declarative) {
        depExports = depEntry.esModule;
      }
      // in the loader registry
      else if (!depEntry) {
        depExports = loader.get(depName);
      }
      // we have an entry -> link
      else {
        linkDeclarativeModule(depEntry, loader);
        depModule = depEntry.module;
        depExports = depModule.exports;
      }

      // only declarative modules have dynamic bindings
      if (depModule && depModule.importers) {
        depModule.importers.push(module);
        module.dependencies.push(depModule);
      }
      else {
        module.dependencies.push(null);
      }
      
      // run setters for all entries with the matching dependency name
      var originalIndices = entry.originalIndices[i];
      for (var j = 0, len = originalIndices.length; j < len; ++j) {
        var index = originalIndices[j];
        if (module.setters[index]) {
          module.setters[index](depExports);
        }
      }
    }
  }

  // An analog to loader.get covering execution of all three layers (real declarative, simulated declarative, simulated dynamic)
  function getModule(name, loader) {
    var exports;
    var entry = loader.defined[name];

    if (!entry) {
      exports = loader.get(name);
      if (!exports)
        throw new Error('Unable to load dependency ' + name + '.');
    }

    else {
      if (entry.declarative)
        ensureEvaluated(name, [], loader);
    
      else if (!entry.evaluated)
        linkDynamicModule(entry, loader);

      exports = entry.module.exports;
    }

    if ((!entry || entry.declarative) && exports && exports.__useDefault)
      return exports['default'];
    
    return exports;
  }

  function linkDynamicModule(entry, loader) {
    if (entry.module)
      return;

    var exports = {};

    var module = entry.module = { exports: exports, id: entry.name };

    // AMD requires execute the tree first
    if (!entry.executingRequire) {
      for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
        var depName = entry.normalizedDeps[i];
        // we know we only need to link dynamic due to linking algorithm
        var depEntry = loader.defined[depName];
        if (depEntry)
          linkDynamicModule(depEntry, loader);
      }
    }

    // now execute
    entry.evaluated = true;
    var output = entry.execute.call(__global, function(name) {
      for (var i = 0, l = entry.deps.length; i < l; i++) {
        if (entry.deps[i] != name)
          continue;
        return getModule(entry.normalizedDeps[i], loader);
      }
      // try and normalize the dependency to see if we have another form
      var nameNormalized = loader.normalizeSync(name, entry.name);
      if (indexOf.call(entry.normalizedDeps, nameNormalized) != -1)
        return getModule(nameNormalized, loader);

      throw new Error('Module ' + name + ' not declared as a dependency of ' + entry.name);
    }, exports, module);
    
    if (output)
      module.exports = output;

    // create the esModule object, which allows ES6 named imports of dynamics
    exports = module.exports;

    // __esModule flag treats as already-named
    if (exports && (exports.__esModule || exports instanceof Module))
      entry.esModule = exports;
    // set module as 'default' export, then fake named exports by iterating properties
    else if (entry.esmExports && exports !== __global)
      entry.esModule = getESModule(exports);
    // just use the 'default' export
    else
      entry.esModule = { 'default': exports };
  }

  /*
   * Given a module, and the list of modules for this current branch,
   *  ensure that each of the dependencies of this module is evaluated
   *  (unless one is a circular dependency already in the list of seen
   *  modules, in which case we execute it)
   *
   * Then we evaluate the module itself depth-first left to right 
   * execution to match ES6 modules
   */
  function ensureEvaluated(moduleName, seen, loader) {
    var entry = loader.defined[moduleName];

    // if already seen, that means it's an already-evaluated non circular dependency
    if (!entry || entry.evaluated || !entry.declarative)
      return;

    // this only applies to declarative modules which late-execute

    seen.push(moduleName);

    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      if (indexOf.call(seen, depName) == -1) {
        if (!loader.defined[depName])
          loader.get(depName);
        else
          ensureEvaluated(depName, seen, loader);
      }
    }

    if (entry.evaluated)
      return;

    entry.evaluated = true;
    entry.module.execute.call(__global);
  }

  // override the delete method to also clear the register caches
  hook('delete', function(del) {
    return function(name) {
      delete this._loader.moduleRecords[name];
      delete this.defined[name];
      return del.call(this, name);
    };
  });

  hook('fetch', function(fetch) {
    return function(load) {
      if (this.defined[load.name]) {
        load.metadata.format = 'defined';
        return '';
      }

      load.metadata.deps = load.metadata.deps || [];
      
      return fetch.call(this, load);
    };
  });

  hook('translate', function(translate) {
    // we run the meta detection here (register is after meta)
    return function(load) {
      load.metadata.deps = load.metadata.deps || [];
      return Promise.resolve(translate.call(this, load)).then(function(source) {
        // run detection for register format
        if (load.metadata.format == 'register' || !load.metadata.format && detectRegisterFormat(load.source))
          load.metadata.format = 'register';
        return source;
      });
    };
  });

  hook('instantiate', function(instantiate) {
    return function(load) {
      if (load.metadata.format == 'detect')
        load.metadata.format = undefined;

      // assumes previous instantiate is sync
      // (core json support)
      instantiate.call(this, load);

      var loader = this;

      var entry;

      // first we check if this module has already been defined in the registry
      if (loader.defined[load.name]) {
        entry = loader.defined[load.name];
        // don't support deps for ES modules
        if (!entry.declarative)
          entry.deps = entry.deps.concat(load.metadata.deps);
      }

      // picked up already by an anonymous System.register script injection
      // or via the dynamic formats
      else if (load.metadata.entry) {
        entry = load.metadata.entry;
        entry.deps = entry.deps.concat(load.metadata.deps);
      }

      // Contains System.register calls
      // (dont run bundles in the builder)
      else if (!(loader.builder && load.metadata.bundle) 
          && (load.metadata.format == 'register' || load.metadata.format == 'esm' || load.metadata.format == 'es6')) {
        
        if (typeof __exec != 'undefined')
          __exec.call(loader, load);

        if (!load.metadata.entry && !load.metadata.bundle)
          throw new Error(load.name + ' detected as ' + load.metadata.format + ' but didn\'t execute.');

        entry = load.metadata.entry;

        // support metadata deps for System.register
        if (entry && load.metadata.deps)
          entry.deps = entry.deps.concat(load.metadata.deps);
      }

      // named bundles are just an empty module
      if (!entry) {
        entry = createEntry();
        entry.deps = load.metadata.deps;
        entry.execute = function() {};
      }

      // place this module onto defined for circular references
      loader.defined[load.name] = entry;
      
      var grouped = group(entry.deps);
      
      entry.deps = grouped.names;
      entry.originalIndices = grouped.indices;
      entry.name = load.name;
      entry.esmExports = load.metadata.esmExports !== false;

      // first, normalize all dependencies
      var normalizePromises = [];
      for (var i = 0, l = entry.deps.length; i < l; i++)
        normalizePromises.push(Promise.resolve(loader.normalize(entry.deps[i], load.name)));

      return Promise.all(normalizePromises).then(function(normalizedDeps) {

        entry.normalizedDeps = normalizedDeps;

        return {
          deps: entry.deps,
          execute: function() {
            // recursively ensure that the module and all its 
            // dependencies are linked (with dependency group handling)
            link(load.name, loader);

            // now handle dependency execution in correct order
            ensureEvaluated(load.name, [], loader);

            // remove from the registry
            loader.defined[load.name] = undefined;

            // return the defined module object
            return loader.newModule(entry.declarative ? entry.module.exports : entry.esModule);
          }
        };
      });
    };
  });
})();
/*
 * Extension to detect ES6 and auto-load Traceur or Babel for processing
 */
(function() {
  // good enough ES6 module detection regex - format detections not designed to be accurate, but to handle the 99% use case
  var esmRegEx = /(^\s*|[}\);\n]\s*)(import\s*(['"]|(\*\s+as\s+)?[^"'\(\)\n;]+\s*from\s*['"]|\{)|export\s+\*\s+from\s+["']|export\s*(\{|default|function|class|var|const|let|async\s+function))/;

  var traceurRuntimeRegEx = /\$traceurRuntime\s*\./;
  var babelHelpersRegEx = /babelHelpers\s*\./;

  hook('translate', function(translate) {
    return function(load) {
      var loader = this;
      return translate.call(loader, load)
      .then(function(source) {
        // detect & transpile ES6
        if (load.metadata.format == 'esm' || load.metadata.format == 'es6' || !load.metadata.format && source.match(esmRegEx)) {
          if (load.metadata.format == 'es6')
            warn.call(loader, 'Module ' + load.name + ' has metadata setting its format to "es6", which is deprecated.\nThis should be updated to "esm".');

          load.metadata.format = 'esm';

          if (loader.transpiler === false) {
            // we accept translation to esm for builds though to enable eg rollup optimizations
            if (loader.builder)
              return source;
            throw new TypeError('Unable to dynamically transpile ES module as SystemJS.transpiler set to false.');
          }

          // setting _loader.loadedTranspiler = false tells the next block to
          // do checks for setting transpiler metadata
          loader._loader.loadedTranspiler = loader._loader.loadedTranspiler || false;
          if (loader.pluginLoader)
            loader.pluginLoader._loader.loadedTranspiler = loader._loader.loadedTranspiler || false;

          // do transpilation
          return (loader._loader.transpilerPromise || (
            loader._loader.transpilerPromise = Promise.resolve(
              __global[loader.transpiler == 'typescript' ? 'ts' : loader.transpiler] || (loader.pluginLoader || loader)['import'](loader.transpiler)
          ))).then(function(transpiler) {
            loader._loader.loadedTranspilerRuntime = true;

            // translate hooks means this is a transpiler plugin instead of a raw implementation
            if (transpiler.translate) {
              // if transpiler is the same as the plugin loader, then don't run twice
              if (transpiler == load.metadata.loaderModule)
                return load.source;

              // convert the source map into an object for transpilation chaining
              if (typeof load.metadata.sourceMap == 'string')
                load.metadata.sourceMap = JSON.parse(load.metadata.sourceMap);

              return Promise.resolve(transpiler.translate.call(loader, load))
              .then(function(source) {
                // sanitize sourceMap if an object not a JSON string
                var sourceMap = load.metadata.sourceMap;
                if (sourceMap && typeof sourceMap == 'object') {
                  var originalName = load.name.split('!')[0];
                  
                  // force set the filename of the original file
                  sourceMap.file = originalName + '!transpiled';

                  // force set the sources list if only one source
                  if (!sourceMap.sources || sourceMap.sources.length <= 1)
                    sourceMap.sources = [originalName];
                }

                if (load.metadata.format == 'esm' && !loader.builder && detectRegisterFormat(source))
                  load.metadata.format = 'register';
                return source;
              });
            }

            // legacy builder support
            if (loader.builder)
              load.metadata.originalSource = load.source;
            
            // defined in es6-module-loader/src/transpile.js
            return transpile.call(loader, load)
            .then(function(source) {
              // clear sourceMap as transpiler embeds it
              load.metadata.sourceMap = undefined;
              return source;
            });            
          });
        }

        // skip transpiler and transpiler runtime loading when transpiler is disabled
        if (loader.transpiler === false)
          return source;

        // load the transpiler correctly
        if (loader._loader.loadedTranspiler === false && (loader.transpiler == 'traceur' || loader.transpiler == 'typescript' || loader.transpiler == 'babel')
            && load.name == loader.normalizeSync(loader.transpiler)) {

          // always load transpiler as a global
          if (source.length > 100 && !load.metadata.format) {
            load.metadata.format = 'global';

            if (loader.transpiler === 'traceur')
              load.metadata.exports = 'traceur';
            if (loader.transpiler === 'typescript')
              load.metadata.exports = 'ts';
          }

          loader._loader.loadedTranspiler = true;
        }

        // load the transpiler runtime correctly
        if (loader._loader.loadedTranspilerRuntime === false) {
          if (load.name == loader.normalizeSync('traceur-runtime')
              || load.name == loader.normalizeSync('babel/external-helpers*')) {
            if (source.length > 100)
              load.metadata.format = load.metadata.format || 'global';

            loader._loader.loadedTranspilerRuntime = true;
          }
        }

        // detect transpiler runtime usage to load runtimes
        if ((load.metadata.format == 'register' || load.metadata.bundle) && loader._loader.loadedTranspilerRuntime !== true) {
          if (!__global.$traceurRuntime && load.source.match(traceurRuntimeRegEx)) {
            loader._loader.loadedTranspilerRuntime = loader._loader.loadedTranspilerRuntime || false;
            return loader['import']('traceur-runtime').then(function() {
              return source;
            });
          }
          if (!__global.babelHelpers && load.source.match(babelHelpersRegEx)) {
            loader._loader.loadedTranspilerRuntime = loader._loader.loadedTranspilerRuntime || false;
            return loader['import']('babel/external-helpers').then(function() {
              return source;
            });
          }
        }

        return source;
      });
    };
  });

})();
/*
  SystemJS Global Format

  Supports
    metadata.deps
    metadata.globals
    metadata.exports

  Without metadata.exports, detects writes to the global object.
*/
var __globalName = typeof self != 'undefined' ? 'self' : 'global';

hook('fetch', function(fetch) {
  return function(load) {
    if (load.metadata.exports && !load.metadata.format)
      load.metadata.format = 'global';
    return fetch.call(this, load);
  };
});

// ideally we could support script loading for globals, but the issue with that is that
// we can't do it with AMD support side-by-side since AMD support means defining the
// global define, and global support means not definining it, yet we don't have any hook
// into the "pre-execution" phase of a script tag being loaded to handle both cases
hook('instantiate', function(instantiate) {
  return function(load) {
    var loader = this;

    if (!load.metadata.format)
      load.metadata.format = 'global';

    // global is a fallback module format
    if (load.metadata.format == 'global' && !load.metadata.registered) {

      var entry = createEntry();

      load.metadata.entry = entry;

      entry.deps = [];

      for (var g in load.metadata.globals) {
        var gl = load.metadata.globals[g];
        if (gl)
          entry.deps.push(gl);
      }

      entry.execute = function(require, exports, module) {

        var globals;
        if (load.metadata.globals) {
          globals = {};
          for (var g in load.metadata.globals)
            if (load.metadata.globals[g])
              globals[g] = require(load.metadata.globals[g]);
        }
        
        var exportName = load.metadata.exports;

        if (exportName)
          load.source += '\n' + __globalName + '["' + exportName + '"] = ' + exportName + ';';

        var retrieveGlobal = loader.get('@@global-helpers').prepareGlobal(module.id, exportName, globals);

        __exec.call(loader, load);

        return retrieveGlobal();
      }
    }
    return instantiate.call(this, load);
  };
});


function getGlobalValue(exports) {
  if (typeof exports == 'string')
    return readMemberExpression(exports, __global);

  if (!(exports instanceof Array))
    throw new Error('Global exports must be a string or array.');

  var globalValue = {};
  var first = true;
  for (var i = 0; i < exports.length; i++) {
    var val = readMemberExpression(exports[i], __global);
    if (first) {
      globalValue['default'] = val;
      first = false;
    }
    globalValue[exports[i].split('.').pop()] = val;
  }
  return globalValue;
}

hook('reduceRegister_', function(reduceRegister) {
  return function(load, register) {
    if (register || !load.metadata.exports)
      return reduceRegister.call(this, load, register);

    load.metadata.format = 'global';
    var entry = load.metadata.entry = createEntry();
    entry.deps = load.metadata.deps;
    var globalValue = getGlobalValue(load.metadata.exports);
    entry.execute = function() {
      return globalValue;
    };
  };
});

hookConstructor(function(constructor) {
  return function() {
    var loader = this;
    constructor.call(loader);

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    // bare minimum ignores
    var ignoredGlobalProps = ['_g', 'sessionStorage', 'localStorage', 'clipboardData', 'frames', 'frameElement', 'external', 
      'mozAnimationStartTime', 'webkitStorageInfo', 'webkitIndexedDB', 'mozInnerScreenY', 'mozInnerScreenX'];

    var globalSnapshot;

    function forEachGlobal(callback) {
      if (Object.keys)
        Object.keys(__global).forEach(callback);
      else
        for (var g in __global) {
          if (!hasOwnProperty.call(__global, g))
            continue;
          callback(g);
        }
    }

    function forEachGlobalValue(callback) {
      forEachGlobal(function(globalName) {
        if (indexOf.call(ignoredGlobalProps, globalName) != -1)
          return;
        try {
          var value = __global[globalName];
        }
        catch (e) {
          ignoredGlobalProps.push(globalName);
        }
        callback(globalName, value);
      });
    }

    loader.set('@@global-helpers', loader.newModule({
      prepareGlobal: function(moduleName, exports, globals) {
        // disable module detection
        var curDefine = __global.define;
        
        __global.define = undefined;

        // set globals
        var oldGlobals;
        if (globals) {
          oldGlobals = {};
          for (var g in globals) {
            oldGlobals[g] = __global[g];
            __global[g] = globals[g];
          }
        }

        // store a complete copy of the global object in order to detect changes
        if (!exports) {
          globalSnapshot = {};

          forEachGlobalValue(function(name, value) {
            globalSnapshot[name] = value;
          });
        }

        // return function to retrieve global
        return function() {
          var globalValue;

          if (exports) {
            globalValue = getGlobalValue(exports);
          }
          else {
            globalValue = {};
            var singleGlobal;
            var multipleExports;

            forEachGlobalValue(function(name, value) {
              if (globalSnapshot[name] === value)
                return;
              if (typeof value == 'undefined')
                return;
              globalValue[name] = value;

              if (typeof singleGlobal != 'undefined') {
                if (!multipleExports && singleGlobal !== value)
                  multipleExports = true;
              }
              else {
                singleGlobal = value;
              }
            });
            globalValue = multipleExports ? globalValue : singleGlobal;
          }

          // revert globals
          if (oldGlobals) {
            for (var g in oldGlobals)
              __global[g] = oldGlobals[g];
          }
          __global.define = curDefine;

          return globalValue;
        };
      }
    }));
  };
});
/*
  SystemJS CommonJS Format
*/
(function() {
  // CJS Module Format
  // require('...') || exports[''] = ... || exports.asd = ... || module.exports = ...
  var cjsExportsRegEx = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])(exports\s*(\[['"]|\.)|module(\.exports|\['exports'\]|\["exports"\])\s*(\[['"]|[=,\.]))/;
  // RegEx adjusted from https://github.com/jbrantly/yabble/blob/master/lib/yabble.js#L339
  var cjsRequireRegEx = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF."'])require\s*\(\s*("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')\s*\)/g;
  var commentRegEx = /(^|[^\\])(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;

  var stringRegEx = /("[^"\\\n\r]*(\\.[^"\\\n\r]*)*"|'[^'\\\n\r]*(\\.[^'\\\n\r]*)*')/g;

  // used to support leading #!/usr/bin/env in scripts as supported in Node
  var hashBangRegEx = /^\#\!.*/;

  function getCJSDeps(source) {
    cjsRequireRegEx.lastIndex = commentRegEx.lastIndex = stringRegEx.lastIndex = 0;

    var deps = [];

    var match;

    // track string and comment locations for unminified source    
    var stringLocations = [], commentLocations = [];

    function inLocation(locations, match) {
      for (var i = 0; i < locations.length; i++)
        if (locations[i][0] < match.index && locations[i][1] > match.index)
          return true;
      return false;
    }

    if (source.length / source.split('\n').length < 200) {
      while (match = stringRegEx.exec(source))
        stringLocations.push([match.index, match.index + match[0].length]);
      
      while (match = commentRegEx.exec(source)) {
        // only track comments not starting in strings
        if (!inLocation(stringLocations, match))
          commentLocations.push([match.index, match.index + match[0].length]);
      }
    }

    while (match = cjsRequireRegEx.exec(source)) {
      // ensure we're not within a string or comment location
      if (!inLocation(stringLocations, match) && !inLocation(commentLocations, match)) {
        var dep = match[1].substr(1, match[1].length - 2);
        // skip cases like require('" + file + "')
        if (dep.match(/"|'/))
          continue;
        // trailing slash requires are removed as they don't map mains in SystemJS
        if (dep[dep.length - 1] == '/')
          dep = dep.substr(0, dep.length - 1);
        deps.push(dep);
      }
    }

    return deps;
  }

  hook('instantiate', function(instantiate) {
    return function(load) {
      var loader = this;
      if (!load.metadata.format) {
        cjsExportsRegEx.lastIndex = 0;
        cjsRequireRegEx.lastIndex = 0;
        if (cjsRequireRegEx.exec(load.source) || cjsExportsRegEx.exec(load.source))
          load.metadata.format = 'cjs';
      }

      if (load.metadata.format == 'cjs') {
        var metaDeps = load.metadata.deps;
        var deps = load.metadata.cjsRequireDetection === false ? [] : getCJSDeps(load.source);

        for (var g in load.metadata.globals)
          if (load.metadata.globals[g])
            deps.push(load.metadata.globals[g]);

        var entry = createEntry();

        load.metadata.entry = entry;

        entry.deps = deps;
        entry.executingRequire = true;
        entry.execute = function(_require, exports, module) {
          function require(name) {
            if (name[name.length - 1] == '/')
              name = name.substr(0, name.length - 1);
            return _require.apply(this, arguments);
          }
          require.resolve = function(name) {
            return loader.get('@@cjs-helpers').requireResolve(name, module.id);
          };

          // ensure meta deps execute first
          if (!load.metadata.cjsDeferDepsExecute)
            for (var i = 0; i < metaDeps.length; i++)
              require(metaDeps[i]);

          var pathVars = loader.get('@@cjs-helpers').getPathVars(module.id);
          var __cjsWrapper = {
            exports: exports,
            args: [require, exports, module, pathVars.filename, pathVars.dirname, __global, __global]
          };

          var cjsWrapper = "(function(require, exports, module, __filename, __dirname, global, GLOBAL";

          // add metadata.globals to the wrapper arguments
          if (load.metadata.globals)
            for (var g in load.metadata.globals) {
              __cjsWrapper.args.push(require(load.metadata.globals[g]));
              cjsWrapper += ", " + g;
            }

          // disable AMD detection
          var define = __global.define;
          __global.define = undefined;
          __global.__cjsWrapper = __cjsWrapper;

          load.source = cjsWrapper + ") {" + load.source.replace(hashBangRegEx, '') + "\n}).apply(__cjsWrapper.exports, __cjsWrapper.args);";

          __exec.call(loader, load);

          __global.__cjsWrapper = undefined;
          __global.define = define;
        };
      }

      return instantiate.call(loader, load);
    };
  });
})();
hookConstructor(function(constructor) {
  return function() {
    var loader = this;
    constructor.call(loader);

    if (typeof window != 'undefined' && typeof document != 'undefined' && window.location)
      var windowOrigin = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');

    function stripOrigin(path) {
      if (path.substr(0, 8) == 'file:///')
        return path.substr(7 + !!isWindows);
      
      if (windowOrigin && path.substr(0, windowOrigin.length) == windowOrigin)
        return path.substr(windowOrigin.length);

      return path;
    }

    loader.set('@@cjs-helpers', loader.newModule({
      requireResolve: function(request, parentId) {
        return stripOrigin(loader.normalizeSync(request, parentId));
      },
      getPathVars: function(moduleId) {
        // remove any plugin syntax
        var pluginIndex = moduleId.lastIndexOf('!');
        var filename;
        if (pluginIndex != -1)
          filename = moduleId.substr(0, pluginIndex);
        else
          filename = moduleId;

        var dirname = filename.split('/');
        dirname.pop();
        dirname = dirname.join('/');

        return {
          filename: stripOrigin(filename),
          dirname: stripOrigin(dirname)
        };
      }
    }))
  };
});/*
 * AMD Helper function module
 * Separated into its own file as this is the part needed for full AMD support in SFX builds
 * NB since implementations have now diverged this can be merged back with amd.js
 */

hook('fetch', function(fetch) {
  return function(load) {
    // script load implies define global leak
    if (load.metadata.scriptLoad && isBrowser)
      __global.define = this.amdDefine;
    return fetch.call(this, load);
  };
});
 
hookConstructor(function(constructor) {
  return function() {
    var loader = this;
    constructor.call(this);

    var commentRegEx = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;
    var cjsRequirePre = "(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])";
    var cjsRequirePost = "\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)";
    var fnBracketRegEx = /\(([^\)]*)\)/;
    var wsRegEx = /^\s+|\s+$/g;
    
    var requireRegExs = {};

    function getCJSDeps(source, requireIndex) {

      // remove comments
      source = source.replace(commentRegEx, '');

      // determine the require alias
      var params = source.match(fnBracketRegEx);
      var requireAlias = (params[1].split(',')[requireIndex] || 'require').replace(wsRegEx, '');

      // find or generate the regex for this requireAlias
      var requireRegEx = requireRegExs[requireAlias] || (requireRegExs[requireAlias] = new RegExp(cjsRequirePre + requireAlias + cjsRequirePost, 'g'));

      requireRegEx.lastIndex = 0;

      var deps = [];

      var match;
      while (match = requireRegEx.exec(source))
        deps.push(match[2] || match[3]);

      return deps;
    }

    /*
      AMD-compatible require
      To copy RequireJS, set window.require = window.requirejs = loader.amdRequire
    */
    function require(names, callback, errback, referer) {
      // in amd, first arg can be a config object... we just ignore
      if (typeof names == 'object' && !(names instanceof Array))
        return require.apply(null, Array.prototype.splice.call(arguments, 1, arguments.length - 1));

      // amd require
      if (typeof names == 'string' && typeof callback == 'function')
        names = [names];
      if (names instanceof Array) {
        var dynamicRequires = [];
        for (var i = 0; i < names.length; i++)
          dynamicRequires.push(loader['import'](names[i], referer));
        Promise.all(dynamicRequires).then(function(modules) {
          if (callback)
            callback.apply(null, modules);
        }, errback);
      }

      // commonjs require
      else if (typeof names == 'string') {
        var defaultJSExtension = loader.defaultJSExtensions && names.substr(names.length - 3, 3) != '.js';
        var normalized = loader.decanonicalize(names, referer);
        if (defaultJSExtension && normalized.substr(normalized.length - 3, 3) == '.js')
          normalized = normalized.substr(0, normalized.length - 3);
        var module = loader.get(normalized);
        if (!module)
          throw new Error('Module not already loaded loading "' + names + '" as ' + normalized + (referer ? ' from "' + referer + '".' : '.'));
        return module.__useDefault ? module['default'] : module;
      }

      else
        throw new TypeError('Invalid require');
    }

    function define(name, deps, factory) {
      if (typeof name != 'string') {
        factory = deps;
        deps = name;
        name = null;
      }
      if (!(deps instanceof Array)) {
        factory = deps;
        deps = ['require', 'exports', 'module'].splice(0, factory.length);
      }

      if (typeof factory != 'function')
        factory = (function(factory) {
          return function() { return factory; }
        })(factory);

      // in IE8, a trailing comma becomes a trailing undefined entry
      if (deps[deps.length - 1] === undefined)
        deps.pop();

      // remove system dependencies
      var requireIndex, exportsIndex, moduleIndex;
      
      if ((requireIndex = indexOf.call(deps, 'require')) != -1) {
        
        deps.splice(requireIndex, 1);

        // only trace cjs requires for non-named
        // named defines assume the trace has already been done
        if (!name)
          deps = deps.concat(getCJSDeps(factory.toString(), requireIndex));
      }

      if ((exportsIndex = indexOf.call(deps, 'exports')) != -1)
        deps.splice(exportsIndex, 1);
      
      if ((moduleIndex = indexOf.call(deps, 'module')) != -1)
        deps.splice(moduleIndex, 1);

      function execute(req, exports, module) {
        var depValues = [];
        for (var i = 0; i < deps.length; i++)
          depValues.push(req(deps[i]));

        module.uri = module.id;

        module.config = function() {};

        // add back in system dependencies
        if (moduleIndex != -1)
          depValues.splice(moduleIndex, 0, module);
        
        if (exportsIndex != -1)
          depValues.splice(exportsIndex, 0, exports);
        
        if (requireIndex != -1) {
          function contextualRequire(names, callback, errback) {
            if (typeof names == 'string' && typeof callback != 'function')
              return req(names);
            return require.call(loader, names, callback, errback, module.id);
          }
          contextualRequire.toUrl = function(name) {
            // normalize without defaultJSExtensions
            var defaultJSExtension = loader.defaultJSExtensions && name.substr(name.length - 3, 3) != '.js';
            var url = loader.decanonicalize(name, module.id);
            if (defaultJSExtension && url.substr(url.length - 3, 3) == '.js')
              url = url.substr(0, url.length - 3);
            return url;
          };
          depValues.splice(requireIndex, 0, contextualRequire);
        }

        // set global require to AMD require
        var curRequire = __global.require;
        __global.require = require;

        var output = factory.apply(exportsIndex == -1 ? __global : exports, depValues);

        __global.require = curRequire;

        if (typeof output == 'undefined' && module)
          output = module.exports;

        if (typeof output != 'undefined')
          return output;
      }

      var entry = createEntry();
      entry.name = name && (loader.decanonicalize || loader.normalize).call(loader, name);
      entry.deps = deps;
      entry.execute = execute;

      loader.pushRegister_({
        amd: true,
        entry: entry
      });
    }
    define.amd = {};

    // reduction function to attach defines to a load record
    hook('reduceRegister_', function(reduceRegister) {
      return function(load, register) {
        // only handle AMD registers here
        if (!register || !register.amd)
          return reduceRegister.call(this, load, register);

        var curMeta = load && load.metadata;
        var entry = register.entry;

        if (curMeta) {
          if (!curMeta.format || curMeta.format == 'detect')
            curMeta.format = 'amd';
          else if (!entry.name && curMeta.format != 'amd')
            throw new Error('AMD define called while executing ' + curMeta.format + ' module ' + load.name);
        }

        // anonymous define
        if (!entry.name) {
          if (!curMeta)
            throw new TypeError('Unexpected anonymous AMD define.');

          if (curMeta.entry && !curMeta.entry.name)
            throw new Error('Multiple anonymous defines in module ' + load.name);
          
          curMeta.entry = entry;
        }
        // named define
        else {
          // if we don't have any other defines, 
          // then let this be an anonymous define
          // this is just to support single modules of the form:
          // define('jquery')
          // still loading anonymously
          // because it is done widely enough to be useful
          // as soon as there is more than one define, this gets removed though
          if (curMeta) {
            if (!curMeta.entry && !curMeta.bundle)
              curMeta.entry = entry;
            else if (curMeta.entry && curMeta.entry.name)
              curMeta.entry = undefined;

            // note this is now a bundle
            curMeta.bundle = true;
          }

          // define the module through the register registry
          if (!(entry.name in this.defined))
            this.defined[entry.name] = entry;
        }
      };
    });

    loader.amdDefine = define;
    loader.amdRequire = require;
  };
});/*
  SystemJS AMD Format
*/
(function() {
  // AMD Module Format Detection RegEx
  // define([.., .., ..], ...)
  // define(varName); || define(function(require, exports) {}); || define({})
  var amdRegEx = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])define\s*\(\s*("[^"]+"\s*,\s*|'[^']+'\s*,\s*)?\s*(\[(\s*(("[^"]+"|'[^']+')\s*,|\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*(\s*("[^"]+"|'[^']+')\s*,?)?(\s*(\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*\s*\]|function\s*|{|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*\))/;

  hook('instantiate', function(instantiate) {
    return function(load) {
      var loader = this;
      
      if (load.metadata.format == 'amd' || !load.metadata.format && load.source.match(amdRegEx)) {
        load.metadata.format = 'amd';
        
        if (!loader.builder && loader.execute !== false) {
          var curDefine = __global.define;
          __global.define = this.amdDefine;

          try {
            __exec.call(loader, load);
          }
          finally {
            __global.define = curDefine;
          }

          if (!load.metadata.entry && !load.metadata.bundle)
            throw new TypeError('AMD module ' + load.name + ' did not define');
        }
        else {
          load.metadata.execute = function() {
            return load.metadata.builderExecute.apply(this, arguments);
          };
        }
      }

      return instantiate.call(loader, load);
    };
  });

})();
/*
  SystemJS Loader Plugin Support

  Supports plugin loader syntax with "!", or via metadata.loader

  The plugin name is loaded as a module itself, and can override standard loader hooks
  for the plugin resource. See the plugin section of the systemjs readme.
*/

(function() {
  function getParentName(loader, parentName) {
    // if parent is a plugin, normalize against the parent plugin argument only
    if (parentName) {
      var parentPluginIndex;
      if (loader.pluginFirst) {
        if ((parentPluginIndex = parentName.lastIndexOf('!')) != -1)
          return parentName.substr(parentPluginIndex + 1);
      }
      else {
        if ((parentPluginIndex = parentName.indexOf('!')) != -1)
          return parentName.substr(0, parentPluginIndex);
      }

      return parentName;
    }
  }

  function parsePlugin(loader, name) {
    var argumentName;
    var pluginName;

    var pluginIndex = name.lastIndexOf('!');

    if (pluginIndex == -1)
      return;

    if (loader.pluginFirst) {
      argumentName = name.substr(pluginIndex + 1);
      pluginName = name.substr(0, pluginIndex);
    }
    else {
      argumentName = name.substr(0, pluginIndex);
      pluginName = name.substr(pluginIndex + 1) || argumentName.substr(argumentName.lastIndexOf('.') + 1);
    }

    return {
      argument: argumentName,
      plugin: pluginName
    };
  }

  // put name back together after parts have been normalized
  function combinePluginParts(loader, argumentName, pluginName, defaultExtension) {
    if (defaultExtension && argumentName.substr(argumentName.length - 3, 3) == '.js')
      argumentName = argumentName.substr(0, argumentName.length - 3);

    if (loader.pluginFirst) {
      return pluginName + '!' + argumentName;
    }
    else {
      return argumentName + '!' + pluginName;
    }
  }

  // note if normalize will add a default js extension
  // if so, remove for backwards compat
  // this is strange and sucks, but will be deprecated
  function checkDefaultExtension(loader, arg) {
    return loader.defaultJSExtensions && arg.substr(arg.length - 3, 3) != '.js'; 
  }

  function createNormalizeSync(normalizeSync) {
    return function(name, parentName, isPlugin) {
      var loader = this;
      
      parentName = getParentName(this, parentName);
      var parsed = parsePlugin(loader, name);

      if (!parsed)
        return normalizeSync.call(this, name, parentName, isPlugin);

      // if this is a plugin, normalize the plugin name and the argument
      var argumentName = loader.normalizeSync(parsed.argument, parentName, true);
      var pluginName = loader.normalizeSync(parsed.plugin, parentName, true);
      return combinePluginParts(loader, argumentName, pluginName, checkDefaultExtension(loader, parsed.argument));
    };
  }
  
  hook('decanonicalize', createNormalizeSync);
  hook('normalizeSync', createNormalizeSync);

  hook('normalize', function(normalize) {
    return function(name, parentName, isPlugin) {
      var loader = this;

      parentName = getParentName(this, parentName);

      var parsed = parsePlugin(loader, name);

      if (!parsed)
        return normalize.call(loader, name, parentName, isPlugin);

      return Promise.all([
        loader.normalize(parsed.argument, parentName, true),
        loader.normalize(parsed.plugin, parentName)
      ])
      .then(function(normalized) {
        return combinePluginParts(loader, normalized[0], normalized[1], checkDefaultExtension(loader, parsed.argument));
      });
    }
  });

  hook('locate', function(locate) {
    return function(load) {
      var loader = this;

      var name = load.name;

      // plugin syntax
      var pluginSyntaxIndex;
      if (loader.pluginFirst) {
        if ((pluginSyntaxIndex = name.indexOf('!')) != -1) {
          load.metadata.loader = name.substr(0, pluginSyntaxIndex);
          load.name = name.substr(pluginSyntaxIndex + 1);
        }
      }
      else {
        if ((pluginSyntaxIndex = name.lastIndexOf('!')) != -1) {
          load.metadata.loader = name.substr(pluginSyntaxIndex + 1);
          load.name = name.substr(0, pluginSyntaxIndex);
        }
      }

      return locate.call(loader, load)
      .then(function(address) {
        if (pluginSyntaxIndex != -1 || !load.metadata.loader)
          return address;

        // normalize plugin relative to parent in locate here when
        // using plugin via loader metadata
        return loader.normalize(load.metadata.loader, load.name)
        .then(function(loaderNormalized) {
          load.metadata.loader = loaderNormalized;
          return address;
        });
      })
      .then(function(address) {
        var plugin = load.metadata.loader;

        if (!plugin)
          return address;

        // don't allow a plugin to load itself
        if (load.name == plugin)
          throw new Error('Plugin ' + plugin + ' cannot load itself, make sure it is excluded from any wildcard meta configuration via a custom loader: false rule.');

        // only fetch the plugin itself if this name isn't defined
        if (loader.defined && loader.defined[name])
          return address;

        var pluginLoader = loader.pluginLoader || loader;

        // load the plugin module and run standard locate
        return pluginLoader['import'](plugin)
        .then(function(loaderModule) {
          // store the plugin module itself on the metadata
          load.metadata.loaderModule = loaderModule;

          load.address = address;
          if (loaderModule.locate)
            return loaderModule.locate.call(loader, load);

          return address;
        });
      });
    };
  });

  hook('fetch', function(fetch) {
    return function(load) {
      var loader = this;
      if (load.metadata.loaderModule && load.metadata.loaderModule.fetch && load.metadata.format != 'defined') {
        load.metadata.scriptLoad = false;
        return load.metadata.loaderModule.fetch.call(loader, load, function(load) {
          return fetch.call(loader, load);
        });
      }
      else {
        return fetch.call(loader, load);
      }
    };
  });

  hook('translate', function(translate) {
    return function(load) {
      var loader = this;
      if (load.metadata.loaderModule && load.metadata.loaderModule.translate && load.metadata.format != 'defined') {
        return Promise.resolve(load.metadata.loaderModule.translate.call(loader, load)).then(function(result) {
          var sourceMap = load.metadata.sourceMap;

          // sanitize sourceMap if an object not a JSON string
          if (sourceMap) {
            if (typeof sourceMap != 'object')
              throw new Error('load.metadata.sourceMap must be set to an object.');

            var originalName = load.name.split('!')[0];
            
            // force set the filename of the original file
            sourceMap.file = originalName + '!transpiled';

            // force set the sources list if only one source
            if (!sourceMap.sources || sourceMap.sources.length <= 1)
              sourceMap.sources = [originalName];
          }

          // if running on file:/// URLs, sourcesContent is necessary
          // load.metadata.sourceMap.sourcesContent = [load.source];

          if (typeof result == 'string')
            load.source = result;
          else
            warn.call(this, 'Plugin ' + load.metadata.loader + ' should return the source in translate, instead of setting load.source directly. This support will be deprecated.');

          return translate.call(loader, load);
        });
      }
      else {
        return translate.call(loader, load);
      }
    };
  });

  hook('instantiate', function(instantiate) {
    return function(load) {
      var loader = this;
      var calledInstantiate = false;

      if (load.metadata.loaderModule && load.metadata.loaderModule.instantiate && !loader.builder && load.metadata.format != 'defined')
        return Promise.resolve(load.metadata.loaderModule.instantiate.call(loader, load, function(load) {
          if (calledInstantiate)
            throw new Error('Instantiate must only be called once.');
          calledInstantiate = true;
          return instantiate.call(loader, load);
        })).then(function(result) {
          if (calledInstantiate)
            return result;

          load.metadata.entry = createEntry();
          load.metadata.entry.execute = function() {
            return result;
          }
          load.metadata.entry.deps = load.metadata.deps;
          load.metadata.format = 'defined';
          return instantiate.call(loader, load);
        });
      else
        return instantiate.call(loader, load);
    };
  });

})();/*
 * Conditions Extension
 *
 *   Allows a condition module to alter the resolution of an import via syntax:
 *
 *     import $ from 'jquery/#{browser}';
 *
 *   Will first load the module 'browser' via `SystemJS.import('browser')` and 
 *   take the default export of that module.
 *   If the default export is not a string, an error is thrown.
 * 
 *   We then substitute the string into the require to get the conditional resolution
 *   enabling environment-specific variations like:
 * 
 *     import $ from 'jquery/ie'
 *     import $ from 'jquery/firefox'
 *     import $ from 'jquery/chrome'
 *     import $ from 'jquery/safari'
 *
 *   It can be useful for a condition module to define multiple conditions.
 *   This can be done via the `|` modifier to specify an export member expression:
 *
 *     import 'jquery/#{./browser.js|grade.version}'
 *
 *   Where the `grade` export `version` member in the `browser.js` module  is substituted.
 *
 *
 * Boolean Conditionals
 *
 *   For polyfill modules, that are used as imports but have no module value,
 *   a binary conditional allows a module not to be loaded at all if not needed:
 *
 *     import 'es5-shim#?./conditions.js|needs-es5shim'
 *
 *   These conditions can also be negated via:
 *     
 *     import 'es5-shim#?~./conditions.js|es6'
 *
 */

  function parseCondition(condition) {
    var conditionExport, conditionModule, negation;

    var negation = condition[0] == '~';
    var conditionExportIndex = condition.lastIndexOf('|');
    if (conditionExportIndex != -1) {
      conditionExport = condition.substr(conditionExportIndex + 1);
      conditionModule = condition.substr(negation, conditionExportIndex - negation) || '@system-env';
    }
    else {
      conditionExport = null;
      conditionModule = condition.substr(negation);
    }

    return {
      module: conditionModule,
      prop: conditionExport,
      negate: negation
    };
  }

  function serializeCondition(conditionObj) {
    return (conditionObj.negate ? '~' : '') + conditionObj.module + (conditionObj.prop ? '|' + conditionObj.prop : '');
  }

  function resolveCondition(conditionObj, parentName, bool) {
    return this['import'](conditionObj.module, parentName)
    .then(function(m) {
      if (conditionObj.prop)
        m = readMemberExpression(conditionObj.prop, m);
      else if (typeof m == 'object' && m + '' == 'Module')
        m = m['default'];

      if (bool && typeof m != 'boolean')
        throw new TypeError('Condition ' + serializeCondition(conditionObj) + ' did not resolve to a boolean.');

      return conditionObj.negate ? !m : m;
    });
  }

  var interpolationRegEx = /#\{[^\}]+\}/;
  function interpolateConditional(name, parentName) {
    // first we normalize the conditional
    var conditionalMatch = name.match(interpolationRegEx);

    if (!conditionalMatch)
      return Promise.resolve(name);

    var conditionObj = parseCondition(conditionalMatch[0].substr(2, conditionalMatch[0].length - 3));

    // in builds, return normalized conditional
    if (this.builder)
      return this['normalize'](conditionObj.module, parentName)
      .then(function(conditionModule) {
        conditionObj.module = conditionModule;
        return name.replace(interpolationRegEx, '#{' + serializeCondition(conditionObj) + '}');
      });

    return resolveCondition.call(this, conditionObj, parentName, false)
    .then(function(conditionValue) {
      if (typeof conditionValue !== 'string')
        throw new TypeError('The condition value for ' + name + ' doesn\'t resolve to a string.');

      if (conditionValue.indexOf('/') != -1)
        throw new TypeError('Unabled to interpolate conditional ' + name + (parentName ? ' in ' + parentName : '') + '\n\tThe condition value ' + conditionValue + ' cannot contain a "/" separator.');

      return name.replace(interpolationRegEx, conditionValue);
    });
  }

  function booleanConditional(name, parentName) {
    // first we normalize the conditional
    var booleanIndex = name.lastIndexOf('#?');

    if (booleanIndex == -1)
      return Promise.resolve(name);

    var conditionObj = parseCondition(name.substr(booleanIndex + 2));

    // in builds, return normalized conditional
    if (this.builder)
      return this['normalize'](conditionObj.module, parentName)
      .then(function(conditionModule) {
        conditionObj.module = conditionModule;
        return name.substr(0, booleanIndex) + '#?' + serializeCondition(conditionObj);
      });

    return resolveCondition.call(this, conditionObj, parentName, true)
    .then(function(conditionValue) {
      return conditionValue ? name.substr(0, booleanIndex) : '@empty';
    });
  }

  // normalizeSync does not parse conditionals at all although it could
  hook('normalize', function(normalize) {
    return function(name, parentName, parentAddress) {
      var loader = this;
      return booleanConditional.call(loader, name, parentName)
      .then(function(name) {
        return normalize.call(loader, name, parentName, parentAddress);
      })
      .then(function(normalized) {
        return interpolateConditional.call(loader, normalized, parentName);
      });
    };
  });
/*
 * Alias Extension
 *
 * Allows a module to be a plain copy of another module by module name
 *
 * SystemJS.meta['mybootstrapalias'] = { alias: 'bootstrap' };
 *
 */
(function() {
  // aliases
  hook('fetch', function(fetch) {
    return function(load) {
      var alias = load.metadata.alias;
      var aliasDeps = load.metadata.deps || [];
      if (alias) {
        load.metadata.format = 'defined';
        var entry = createEntry();
        this.defined[load.name] = entry;
        entry.declarative = true;
        entry.deps = aliasDeps.concat([alias]);
        entry.declare = function(_export) {
          return {
            setters: [function(module) {
              for (var p in module)
                _export(p, module[p]);
              if (module.__useDefault)
                entry.module.exports.__useDefault = true;
            }],
            execute: function() {}
          };
        };
        return '';
      }

      return fetch.call(this, load);
    };
  });
})();/*
 * Meta Extension
 *
 * Sets default metadata on a load record (load.metadata) from
 * loader.metadata via SystemJS.meta function.
 *
 *
 * Also provides an inline meta syntax for module meta in source.
 *
 * Eg:
 *
 * loader.meta({
 *   'my/module': { deps: ['jquery'] }
 *   'my/*': { format: 'amd' }
 * });
 *
 * Which in turn populates loader.metadata.
 *
 * load.metadata.deps and load.metadata.format will then be set
 * for 'my/module'
 *
 * The same meta could be set with a my/module.js file containing:
 *
 * my/module.js
 *   "format amd";
 *   "deps[] jquery";
 *   "globals.some value"
 *   console.log('this is my/module');
 *
 * Configuration meta always takes preference to inline meta.
 *
 * Multiple matches in wildcards are supported and ammend the meta.
 *
 *
 * The benefits of the function form is that paths are URL-normalized
 * supporting say
 *
 * loader.meta({ './app': { format: 'cjs' } });
 *
 * Instead of needing to set against the absolute URL (https://site.com/app.js)
 *
 */

(function() {

  hookConstructor(function(constructor) {
    return function() {
      this.meta = {};
      constructor.call(this);
    };
  });

  hook('locate', function(locate) {
    return function(load) {
      var meta = this.meta;
      var name = load.name;

      // NB for perf, maybe introduce a fast-path wildcard lookup cache here
      // which is checked first

      // apply wildcard metas
      var bestDepth = 0;
      var wildcardIndex;
      for (var module in meta) {
        wildcardIndex = module.indexOf('*');
        if (wildcardIndex === -1)
          continue;
        if (module.substr(0, wildcardIndex) === name.substr(0, wildcardIndex)
            && module.substr(wildcardIndex + 1) === name.substr(name.length - module.length + wildcardIndex + 1)) {
          var depth = module.split('/').length;
          if (depth > bestDepth)
            bestDepth = depth;
          extendMeta(load.metadata, meta[module], bestDepth != depth);
        }
      }

      // apply exact meta
      if (meta[name])
        extendMeta(load.metadata, meta[name]);

      return locate.call(this, load);
    };
  });

  // detect any meta header syntax
  // only set if not already set
  var metaRegEx = /^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)+/;
  var metaPartRegEx = /\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\/\/[^\n]*|"[^"]+"\s*;?|'[^']+'\s*;?/g;

  function setMetaProperty(target, p, value) {
    var pParts = p.split('.');
    var curPart;
    while (pParts.length > 1) {
      curPart = pParts.shift();
      target = target[curPart] = target[curPart] || {};
    }
    curPart = pParts.shift();
    if (!(curPart in target))
      target[curPart] = value;
  }

  hook('translate', function(translate) {
    return function(load) {
      // NB meta will be post-translate pending transpiler conversion to plugins
      var meta = load.source.match(metaRegEx);
      if (meta) {
        var metaParts = meta[0].match(metaPartRegEx);

        for (var i = 0; i < metaParts.length; i++) {
          var curPart = metaParts[i];
          var len = curPart.length;

          var firstChar = curPart.substr(0, 1);
          if (curPart.substr(len - 1, 1) == ';')
            len--;

          if (firstChar != '"' && firstChar != "'")
            continue;

          var metaString = curPart.substr(1, curPart.length - 3);
          var metaName = metaString.substr(0, metaString.indexOf(' '));

          if (metaName) {
            var metaValue = metaString.substr(metaName.length + 1, metaString.length - metaName.length - 1);

            if (metaName.substr(metaName.length - 2, 2) == '[]') {
              metaName = metaName.substr(0, metaName.length - 2);
              load.metadata[metaName] = load.metadata[metaName] || [];
              load.metadata[metaName].push(metaValue);
            }
            else if (load.metadata[metaName] instanceof Array) {
              // temporary backwards compat for previous "deps" syntax
              warn.call(this, 'Module ' + load.name + ' contains deprecated "deps ' + metaValue + '" meta syntax.\nThis should be updated to "deps[] ' + metaValue + '" for pushing to array meta.');
              load.metadata[metaName].push(metaValue);
            }
            else {
              setMetaProperty(load.metadata, metaName, metaValue);
            }
          }
          else {
            load.metadata[metaString] = true;
          }
        }
      }

      return translate.call(this, load);
    };
  });
})();
/*
  System bundles

  Allows a bundle module to be specified which will be dynamically 
  loaded before trying to load a given module.

  For example:
  SystemJS.bundles['mybundle'] = ['jquery', 'bootstrap/js/bootstrap']

  Will result in a load to "mybundle" whenever a load to "jquery"
  or "bootstrap/js/bootstrap" is made.

  In this way, the bundle becomes the request that provides the module
*/

(function() {
  // bundles support (just like RequireJS)
  // bundle name is module name of bundle itself
  // bundle is array of modules defined by the bundle
  // when a module in the bundle is requested, the bundle is loaded instead
  // of the form SystemJS.bundles['mybundle'] = ['jquery', 'bootstrap/js/bootstrap']
  hookConstructor(function(constructor) {
    return function() {
      constructor.call(this);
      this.bundles = {};
      this._loader.loadedBundles = {};
    };
  });

  // assign bundle metadata for bundle loads
  hook('locate', function(locate) {
    return function(load) {
      var loader = this;
      var matched = false;

      if (!(load.name in loader.defined))
        for (var b in loader.bundles) {
          for (var i = 0; i < loader.bundles[b].length; i++) {
            var curModule = loader.bundles[b][i];

            if (curModule == load.name) {
              matched = true;
              break;
            }

            // wildcard in bundles does not include / boundaries
            if (curModule.indexOf('*') != -1) {
              var parts = curModule.split('*');
              if (parts.length != 2) {
                loader.bundles[b].splice(i--, 1);
                continue;
              }
              
              if (load.name.substring(0, parts[0].length) == parts[0] &&
                  load.name.substr(load.name.length - parts[1].length, parts[1].length) == parts[1] &&
                  load.name.substr(parts[0].length, load.name.length - parts[1].length - parts[0].length).indexOf('/') == -1) {
                matched = true;
                break;
              }
            }
          }

          if (matched)
            return loader['import'](b)
            .then(function() {
              return locate.call(loader, load);
            });
        }

      return locate.call(loader, load);
    };
  });
})();
/*
 * Dependency Tree Cache
 * 
 * Allows a build to pre-populate a dependency trace tree on the loader of 
 * the expected dependency tree, to be loaded upfront when requesting the
 * module, avoinding the n round trips latency of module loading, where 
 * n is the dependency tree depth.
 *
 * eg:
 * SystemJS.depCache = {
 *  'app': ['normalized', 'deps'],
 *  'normalized': ['another'],
 *  'deps': ['tree']
 * };
 * 
 * SystemJS.import('app') 
 * // simultaneously starts loading all of:
 * // 'normalized', 'deps', 'another', 'tree'
 * // before "app" source is even loaded
 *
 */

(function() {
  hookConstructor(function(constructor) {
    return function() {
      constructor.call(this);
      this.depCache = {};
    }
  });

  hook('locate', function(locate) {
    return function(load) {
      var loader = this;
      // load direct deps, in turn will pick up their trace trees
      var deps = loader.depCache[load.name];
      if (deps)
        for (var i = 0; i < deps.length; i++)
          loader['import'](deps[i], load.name);

      return locate.call(loader, load);
    };
  });
})();
  
System = new SystemJSLoader();

__global.SystemJS = System;
System.version = '0.19.27 Standard';
  // -- exporting --

  if (typeof exports === 'object')
    module.exports = Loader;

  __global.Reflect = __global.Reflect || {};
  __global.Reflect.Loader = __global.Reflect.Loader || Loader;
  __global.Reflect.global = __global.Reflect.global || __global;
  __global.LoaderPolyfill = Loader;

  if (!System) {
    System = new SystemLoader();
    System.constructor = SystemLoader;
  }

  if (typeof exports === 'object')
    module.exports = System;

  __global.System = System;

})(typeof self != 'undefined' ? self : global);}

// auto-load Promise polyfill if needed in the browser
var doPolyfill = typeof Promise === 'undefined';

// document.write
if (typeof document !== 'undefined') {
  var scripts = document.getElementsByTagName('script');
  $__curScript = scripts[scripts.length - 1];
  if (doPolyfill) {
    var curPath = $__curScript.src;
    var basePath = curPath.substr(0, curPath.lastIndexOf('/') + 1);
    window.systemJSBootstrap = bootstrap;
    document.write(
      '<' + 'script type="text/javascript" src="' + basePath + 'system-polyfills.js">' + '<' + '/script>'
    );
  }
  else {
    bootstrap();
  }
}
// importScripts
else if (typeof importScripts !== 'undefined') {
  var basePath = '';
  try {
    throw new Error('_');
  } catch (e) {
    e.stack.replace(/(?:at|@).*(http.+):[\d]+:[\d]+/, function(m, url) {
      $__curScript = { src: url };
      basePath = url.replace(/\/[^\/]*$/, '/');
    });
  }
  if (doPolyfill)
    importScripts(basePath + 'system-polyfills.js');
  bootstrap();
}
else {
  $__curScript = typeof __filename != 'undefined' ? { src: __filename } : null;
  bootstrap();
}


})();