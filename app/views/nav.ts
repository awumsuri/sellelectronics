/**
 * Created by Mtui on 9/17/16.
 */
import { Component } from '@angular/core';


@Component({
    selector: 'topnav',
    template:`               


<nav class="nav-top-menu" >
	<a href="artists.php"><span class="title">Sell Electronics</span></a>
</nav>
<div class="logo">
	<div class="leftpanel" >		
		<img src="/Images/ipad.png"/>
	</div>
		<div class="logo-image">
			<a href="index.php"><img src="/Images/iphone.jpg"/></a>
		</div>
	<div class="rightpanel">
		<a href="index.php"><img src="/Images/macbook.png"/></a>
	</div>
</div>
	<nav class="menu">		
		<a href="waterfall.php"><img src="/Images/appleicon.png"/></a> 		
		<a class="samsung" href="#" style="border-right-style: none !important;"><img src="/Images/samsuguicon.png"/></a>
	</nav>
<div id="menu" class="nav-container">
	<nav class="menu">
		<form id="searchForm" class="searchForm" novalidate="true" method="get" action="./artists.php">
			<input id="search-field2" class="search" onclick="clearMenuFeild();" type="text" value="find songs"  name='pg' maxlength="30"/>
		</form>
		<a href="Contact_Us.php">contact</a>
		<a href="waterfall.php"><img src="/Images/new-icon.png"/> waterfall tutorials</a>
		<a href="artists.php">concept noir tutorials</a>
		<a href="retro.php">retro tutorials</a>
		<a href="artists.php?pg=sheet-music">sheet music</a>
		<a id="authBtn2" href="#" style="border-right-style: none !important;"><img src=""/></a>
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


