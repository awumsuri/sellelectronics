System.register(['@angular/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var core_1;
    var TopNav;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            TopNav = class TopNav {
            };
            TopNav = __decorate([
                core_1.Component({
                    selector: 'topnav',
                    template: `
<nav class="nav-top-menu" >
	<a><span class="title">Sell Electronics</span></a>
</nav>
<div class="logo">
	<div *hideItDevice="['mobile']" class="leftpanel" >		
		<img src="/Images/ipad.png"/>
	</div>
		<div class="logo-image">
			<a href=""><img src="/Images/iphone.jpg"/></a>
		</div>
	<div *hideItDevice="['mobile']" class="rightpanel">
		<a href=""><img src="/Images/macbook.png"/></a>
	</div>
</div>
<nav  class="menu">		
    <a  href="#"><img src="/Images/appleicon.png"/></a> 		
    <a class="samsung" href="#" style="border-right-style: none !important;"><img src="/Images/samsuguicon.png"/></a>
</nav>
`
                })
            ], TopNav);
            exports_1("TopNav", TopNav);
        }
    }
});

//# sourceMappingURL=Nav.js.map
