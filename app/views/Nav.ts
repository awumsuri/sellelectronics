/**
 * Created by Mtui on 9/17/16.
 */
import { Component } from '@angular/core';

@Component({
    selector: 'topnav',
    template:`     


<nav class="nav-top-menu" >
	<a><span class="title">Sell Electronics</span></a>
</nav>
<div class="logo">
	<div class="leftpanel" >		
		<img src="/Images/ipad.png"/>
	</div>
		<div class="logo-image">
			<a href=""><img src="/Images/iphone.jpg"/></a>
		</div>
	<div class="rightpanel">
		<a href=""><img src="/Images/macbook.png"/></a>
	</div>
</div>
	<nav class="menu">		
		<a href="#"><img src="/Images/appleicon.png"/></a> 		
		<a class="samsung" href="#" style="border-right-style: none !important;"><img src="/Images/samsuguicon.png"/></a>
	</nav>
<div id="menu" class="nav-container">
	<nav class="menu">		
		<a href="">contact</a>
		<a href=""><img src="/Images/new-icon.png"/> waterfall tutorials</a>
		<a href="">concept noir tutorials</a>
		<a href="">retro tutorials</a>
		<a href="">sheet music</a>
		<a id="" href="#" style="border-right-style: none !important;"><img src=""/></a>
		"
	</nav>
	<script>
		function clearMenuFeild() {
			document.getElementById('search-field2').value = '';
		}
	</script>
</div>
            `
})

export class TopNav{}


