<?php
if(!isset($_SESSION))
session_start();
if (!empty($_SESSION['username'])){
	$ex = '<li><a href="../logout.php">LOGOUT</a></li>';}
else {
	$ex = '<li><a href="../login.php">LOGIN</a></li>';
}
ini_set('display_errors', '1');
// include "assets/connect_to_mysql.php";
?>
<?php
//if (!empty($_SESSION['dl_sheet'])) {
//   $ck_sheet = $_SESSION['dl_sheet'];}
//else {
//	$ck_sheet = 0;
//}
?>
<?php
// Gather this product's full information for inserting automatically into the edit form below on page
if (isset($_GET['id'])) {
	$image_doc = "";
	// Connect to the MySQL database
    include "../assets/connect_to_mysql.php";
	$targetID = $_GET['id'];
	$id = preg_replace('#[^0-9]#i', '', $_GET['id']);
    $sql = mysqli_query($conn, "SELECT * FROM products WHERE product_id='$targetID' LIMIT 1");
    $productCount = mysqli_num_rows($sql); // count the output amount
    if ($productCount > 0) {
	    while($row = mysqli_fetch_array($sql)){
			 $product_name  = $row["product_name"];
			 $product_id    = $row["product_id"];
			 $price         = $row["price"];
			 $details_short = $row["details_short"];
			 $details       = $row["details"];
			 $available     = $row["available"];
			 $pre_order     = $row["pre_order"];
			 $images        = $row["images"];
			 $link          = $row["link"];
                         $date_added     = $row["date_added"];
                         date_default_timezone_set('America/Los_Angeles');
			 $date_added    = strftime("%b %d, %Y", strtotime($row["date_added"]));

			 $stra = "a";
			 $strb = "b";
			 $strc = "c";
			 $strd = "d";
			 $str_ = "_";

        }

	//encrypt product id, added 12/27/15
	$salt = 'godisoverall';
	$val = $product_id;
	$val_md5 = md5($salt . $val . $salt);

	if ($val == 40) {
		$file_type = ".zip";
	}
	elseif ($val == 2)  {
		$file_type = ".zip";
	}
	else
	{
		$file_type = ".pdf";
	}

	$basket_link = './basket.php';
	$gum_link = 'https://gum.co/pspcn_'. $product_id .'';
	$dl_link = 'http://playsmoothpiano.com/cart/pdffiles/product'.$str_.''.$val.''.$str_.''.$val_md5.''.$file_type.'';

		//$sizes = array($XXS, $XS, $Small, $Medium, $Large, $XL, $XXL);
		//$sizes = array_filter($sizes);
		//$sizes_count = count($sizes);
		if ($pre_order == '1') {
			$adtocart = '<p class="add_to_cart"><button type="submit" class="button submit">Preorder Now &raquo</button></p> Available: ' . $date_added . '';
			$cart_form_link = $basket_link;
			$price_blurb = '$'. $price .'';
			//$adtocart = '<p class="add_to_cart"><button type="submit" class="button submit">Preorder Now &raquo</button><img src="http://www.playsmoothpiano.com/cart/products/pdf_icon_dnld.jpg" alt="' .$product_name. ' height="65" width="49"" /></p>';
		} else {
			if (!empty($_SESSION['username'])) {
				// if the user subscriber
				$cart_form_link = $dl_link;
				$price_blurb = 'Download link found below.';
				$adtocart = '<p class="add_to_cart"><button type="submit" class="button submit">Download Now &raquo</button><img src="http://www.playsmoothpiano.com/cart/products/pdf_icon_dnld.jpg" alt="' .$product_name. ' height="65" width="49"" /></p>';
			} else { // else, they need to buy the sheet music
				$cart_form_link = $gum_link;
				$price_blurb = '$'. $price .'';
				$adtocart = '<p class="add_to_cart"><button type="submit" class="button submit">Add to Cart &raquo</button><img src="http://www.playsmoothpiano.com/cart/products/pdf_icon_dnld.jpg" alt="' .$product_name. ' height="65" width="49"" /></p>';
			}
		}

		$mp3file = '<audio preload="auto"><source src="/mp3/product_' . $product_id . '.mp3" preload="auto"></audio>';

		// if images = x, only show x images
		if ($images == '1') {
			$image_doc = '
			<div class="thumbnails"><ul>
        		<li class="">
                <a href="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$stra. '.png" data-full-size="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$stra. '.png" title="' .$product_name. '"rel="useZoom: "main_zoom", smallImage: "http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$stra. '.png"><img src="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$stra. '.png" alt="' .$product_name. '" /></a>
                </li>

				<li class="divider"></li>
                          </ul>
                    </div>';
		} elseif ($images == '2') {
			$image_doc = '
			<div class="thumbnails"><ul>
        		<li class="">
                <a href="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$stra. '.png" data-full-size="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$stra. '.png" title="' .$product_name. '"rel="useZoom: "main_zoom", smallImage: "http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$stra. '.png"><img src="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$stra. '.png" alt="' .$product_name. '" /></a>
                </li>

				<li class="">
                <a href="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$strb. '.png" data-full-size="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$strb. '.png" title="' .$product_name. '"rel="useZoom: "main_zoom", smallImage: "http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$strb. '.png"><img src="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$strb. '.png" alt="' .$product_name. '" /></a>
                </li>

				<li class="divider"></li>
                          </ul>
                    </div>';

		} elseif ($images == '3') {
			$image_doc = '
			<div class="thumbnails"><ul>
        		<li class="">
                <a href="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$stra. '.png" data-full-size="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$stra. '.png" title="' .$product_name. '"rel="useZoom: "main_zoom", smallImage: "http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$stra. '.png"><img src="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$stra. '.png" alt="' .$product_name. '" /></a>
                </li>

				<li class="">
                <a href="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$strb. '.png" data-full-size="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$strb. '.png" title="' .$product_name. '"rel="useZoom: "main_zoom", smallImage: "http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$strb. '.png"><img src="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$strb. '.png" alt="' .$product_name. '" /></a>
                </li>

				<li class="">
                <a href="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$strc. '.png" data-full-size="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$strc. '.png" title="' .$product_name. '"rel="useZoom: "main_zoom", smallImage: "http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$strc. '.png"><img src="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$strc. '.png" alt="' .$product_name. '" /></a>
                </li>

				<li class="divider"></li>
                          </ul>
                    </div>';

		} elseif ($images == '4') {
			$image_doc = '
			<div class="thumbnails"><ul>
        		<li class="">
                <a href="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$stra. '.png" data-full-size="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$stra. '.png" title="' .$product_name. '"rel="useZoom: "main_zoom", smallImage: "http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$stra. '.png"><img src="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$stra. '.png" alt="' .$product_name. '" /></a>
                </li>

				<li class="">
                <a href="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$strb. '.png" data-full-size="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$strb. '.png" title="' .$product_name. '"rel="useZoom: "main_zoom", smallImage: "http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$strb. '.png"><img src="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$strb. '.png" alt="' .$product_name. '" /></a>
                </li>

				<li class="">
                <a href="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$strc. '.png" data-full-size="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$strc. '.png" title="' .$product_name. '"rel="useZoom: "main_zoom", smallImage: "http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$strc. '.png"><img src="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$strc. '.png" alt="' .$product_name. '" /></a>
                </li>

				<li class="">
                <a href="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$strd. '.png" data-full-size="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$strd. '.png" title="' .$product_name. '"rel="useZoom: "main_zoom", smallImage: "http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$strd. '.png"><img src="http://www.playsmoothpiano.com/cart/products/product' .$str_. '' .$product_id. '' .$str_. '' .$strd. '.png" alt="' .$product_name. '" /></a>
                </li>

				<li class="divider"></li>
                          </ul>
                    </div>';

		} elseif ($images == '0') {
			$image_doc = '<div class="thumbnails"><ul></ul></div>';
		} else {

		}


    } else {
		//$sizes_count = 0;
	    //$sizes = "No Sizes Available";
		exit();
    }
}
?>

<?php
// Check to see the URL variable is set and that it exists in the database
if(isset($_SESSION["cart_array"]) && is_array($_SESSION["cart_array"])){ //change this line
     $totalquantity = 0;
     foreach($_SESSION["cart_array"] AS $each_item){
       $totalquantity +=  $each_item['quantity']; // and this line, just shorthand of ur line
      }
}
else{
     $totalquantity = 0;
}
     // echo $totalquantity;
mysqli_close($conn);
?>


<!DOCTYPE html>
<html lang="en">
  <!DOCTYPE html>
<!--[if lt IE 7 ]> <html class="no-js ie lt-ie9 lt-ie8 lt-ie7 ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="no-js ie lt-ie9 lt-ie8 ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="no-js ie lt-ie9 ie8" lang="en"> <![endif]-->
<!--[if IE 9 ]>    <html class="no-js ie ie9" lang="en"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
<html lang="en"> <!--<![endif]-->
<head>
    <link href='http://fonts.googleapis.com/css?family=Roboto+Condensed:400,300' rel='stylesheet' type='text/css'>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title><?php echo $product_name;?></title>
    <!-- audio.js script --->
    <style>
      p { clear: both; }
    </style>
	<script src="/audiojs/audio.min.js"></script>
    <script>
       audiojs.events.ready(function() {
       var as = audiojs.createAll();
       });
    </script>
	<!-- audio.js script --->


    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <meta name="ROBOTS" content="FOLLOW, INDEX" />

<meta content="Black Twill Hat with White Speckle. Small Stampd logo Above Snaps." name="description"/>
<meta content="http://www.stampdla.com/shop/categories/headwear/black-speckle-hat/" property="og:url"/>
<meta content="www.stampdla.com" property="og:site_name"/>
<meta content="product" property="og:type"/>
<meta content="Black Twill Hat with White Speckle. Small Stampd logo Above Snaps." property="og:description"/>
<meta content="Black Speckle Twill Hat" property="og:title"/>
<meta content="http://www.playsmoothpiano.com/cart/products/product<?php echo $str_,$product_id,$str_,$stra;?>.png" property="og:image"/>
<meta content="http://www.playsmoothpiano.com/cart/products/product<?php echo $str_,$product_id,$str_,$stra;?>.png" property="og:image"/>
<meta content="http://www.playsmoothpiano.com/cart/products/product<?php echo $str_,$product_id,$str_,$stra;?>.png" property="og:image"/>
<meta content="http://www.playsmoothpiano.com/cart/products/product<?php echo $str_,$product_id,$str_,$stra;?>.png" property="og:image"/>

    <meta name="viewport" content="width=device-width" />

    <script src="../assets/static/webcubecore/js/modernizr.min.js"></script>
    <link rel="stylesheet" href="../assets/static/webcubecore/css/webcube.min.css" media="screen" />


<link rel="stylesheet" href="../assets/static/simplecartcore/css/catalog.css" type="text/css" />

    <link href="../assets/static/webcubecore/css/fancybox.css" rel="stylesheet" media="screen" />
    <link href="../assets/static/webcubecore/css/cloud-zoom.css" rel="stylesheet" media="screen" />
	<link href="http://playsmoothpiano.com/favicon.ico" type="text/css" rel="shortcut icon">

    <!-- <link rel="shortcut icon" href="http://24.media.tumblr.com/avatar_b57f605961b6_128.png" /> -->

    <!-- <link rel="apple-touch-icon" href="../assets/static/cloud/apple-touch-icon.png" /> -->

    <link rel="stylesheet" href="../assets/static/cloud/css/default.min.css" media="screen" />
    <link rel="stylesheet" href="../cloud/css/site.css" media="screen" />

    <style type="text/css">


    </style>



    <link rel="stylesheet" href="/assets/static/cloud/css/print.css" media="print" />
</head>


  <body id="default" class="catalog product_detail">

  <div id="fb-root"></div>
    <script>(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id; js.async = true;
      js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));</script>


    <div id="wrap">
        <div class="">

            <section id="global">
                <div class="position">
                    <div class="container">
                        <header>
                            <h1 id="logo"><a href="/" alt="www.stampdla.com">www.stampdla.com</a></h1>
                        </header>

                        <nav>

<ul id="nav_global">


<li id="nav_global_stampdla" class=" ">
    <a href ="../AtoL.php">
        <span class="text">Old Site</span>


    </a>



</li>



<li id="nav_global_inspired" class=" ">
    <a href ="../register.php">
        <span class="text">Register</span>


    </a>



</li>



<li id="nav_global_tv" class=" ">
    <a href="http://playsmoothpiano.wordpress.com/">
        <span class="text">Blog</span>


    </a>



</li>



<li id="nav_global_blog" class=" ">
    <a href ="../Contact_Us.php">
        <span class="text">Contact Us</span>


    </a>



</li>



<!-- <li id="nav_global_login" class=" ">
    <a href ="../login.php">
        <span class="text">login</span>


    </a>



</li> -->
<?php echo $ex;?>



<li id="nav_global_cart" class=" ">
    <a href ="../artists.php">
        <span class="text"></span>


    </a>



</li>


</ul>

</nav>
                        <div id="secondary_nav">


<ul id="nav_global_secondary">

</ul>


                            <div id="nav_search" class="last">
                                <form id="form_nav_search" action="/search/" method="get" >
                                    <input type="text" name="q" value="" placeholder="Search" />
                                    <input type="submit" class="button" value="Submit"/>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section id="content_wrap" role="main" class="">


                <div class="position">
                    <div id="content_container" class="container">

                        <div id="content" class="">


<div class="column_nav">
    <nav id="product_nav">


	<ul>




<li class="all">
    <a href="/shop/" data-category="all">All</a>

<li class="selected">
    <a href="/shop/categories/headwear/" data-category="headwear">Headwear</a>




</li>



<li >
    <a href="/shop/categories/shirts/" data-category="shirts">Shirts</a>




</li>



<li >
    <a href="/shop/categories/footwear/" data-category="footwear">Footwear</a>




</li>



<li >
    <a href="/shop/categories/accessories/" data-category="accessories">Accessories</a>




</li>



<li >
    <a href="/shop/categories/selects/" data-category="selects">Selects</a>




</li>


	</ul>

    </nav>
</div>


  <div class="column_content">
    <p class="back_to_product_listing"><a href="../artists.php?pg=sheet-music">&larr; Back</a></p>


<article>
	<div id="product" class="" itemscope itemtype="http://schema.org/Product" data-productfeatures="media options">
	    <section class="media"
            data-recentlyviewed="http://www.playsmoothpiano.com/cart/products/product<?php echo $str_,$product_id,$str_,$stra;?>.png">



                    <div class="display" data-test="true">
                        <a href="http://www.playsmoothpiano.com/cart/products/product<?php echo $str_,$product_id,$str_,$stra;?>.png" id="main_zoom" class="cloud-zoom" rel="position:'inside', showTitle:false" >
                            <img src="http://www.playsmoothpiano.com/cart/products/product<?php echo $str_,$product_id,$str_,$stra;?>.png" alt="Product" itemprop="image"/>
                        </a>
                    </div>

                        <p id="view_larger" class="column_last"><a href="http://www.playsmoothpiano.com/cart/products/product<?php echo $str_,$product_id,$str_,$stra;?>.png"><span class="accent"></span><span>View Larger</span></a></p>





            </section>

        <section class="details" >





	                <header><h1 id="product_name" itemprop="name"><?php echo $product_name;?></h1></header>

	                <div class="description" itemprop="description">
                    <p><?php echo $details_short;?></p>
					<p><?php echo $details;?></p>
                    <p>Login and download sheet music for free! (Members)</p>
                    </div>

<!-- keytext #keytext_extra_product_description -->






                        <h2 class="price">


			                <?php echo $price_blurb;?>


	                </h2>


                    <p class="product_style">Style #: <span class="style">SLA-U229HT</span></p>




	<!-- <form id="add_form" method="post" action="/cart/add-to-cart/"> -->

    <form id="add_form" name="form1" method="post" action="<?php echo $cart_form_link; ?>">
	<input type="hidden" name="pid" id="pid" value="<?php echo $product_id; ?>" />


        <script type="application/json" data-webcube-name="black-speckle-hat" data-type="product">{"options": [{"key": "option1", "title": "size"}, {"key": "option2", "title": ""}, {"key": "option3", "title": ""}], "product_options": [{"sku": "SLA-U229HT", "price": "$<?php echo $price;?>", "object_id": 2026, "option3": "", "availability_date": "2013-11-12", "in_stock": true, "content_type": 160, "option2": "", "can_order": true, "option1": "OS"}], "id": 599, "name": "Black Speckle Twill Hat"}</script>

			<!-- <p class="product_option">
				<select class="product_option1" name="option1">
					<option value="">Select Size</option>
				</select>
			</p> -->



		<div id="order_form">
			<input type="hidden" name="sku" />
			<input type="hidden" name="content_type" />
			<input type="hidden" name="object_id" />
			<input type="hidden" name="url" value="/shop/categories/headwear/black-speckle-hat/" />
			<p id="quantity_p"><input type="text" value="1" name="quantity" id="id_quantity"  /><label for="id_quantity">Quantity</label></p>

            <?php echo $adtocart;?>
            <!-- <p class="add_to_cart"><button type="submit" class="button submit">Add to Cart</button></p>
		    <p class="add_to_cart_preorder"><input type="submit" class="sub_accent_button" value="Preorder Now"/></p> -->






		</div>

	</form>
	<form class="request_instock_notification" name="request_instock_notification" method="get" action="/request/request-instock-notification/">
			<p class="availability_date">Availability: <span id="availability_date">&nbsp;</span></p>
			<input type="hidden" name="sku"/>
			<input type="hidden" name="content_type"/>
			<input type="hidden" name="object_id"/>
			<input type="hidden" name="url" value="/shop/categories/headwear/black-speckle-hat/" />

            <p>

<input class="notify_me_button" type="image" value="Notify me when available" src="/cloud/file/notify-when-available.gif" /></p>
	</form>




<!-- keytext #keytext_extra_product_form -->








<!-- <div class="addthis_toolbox addthis_default_style">

	<a href="http://www.addthis.com/bookmark.php?v=250" class="addthis_button_compact">Share</a>
	<span class="addthis_separator">|</span>
	<a class="addthis_button_facebook"></a>
	<a class="addthis_button_twitter"></a>
	<a class="addthis_button_delicious"></a>
	<a class="addthis_button_stumbleupon"></a>






</div> -->



<!-- keytext #keytext_extra_product_detail -->


	<!-- instance of audio.js -->
    <!-- <audio preload="auto"><source src="/mp3/Drake_From_Time.mp3" preload="auto"></audio> -->
    <?php echo $mp3file;?>
	<!-- instance of audio.js -->

		</section>



                <!-- Sub Picture Main -->

                <?php echo $image_doc;?>






    </div>

 </article>
</div>


                        </div>

                    </div>
                </div>


            </section>

        </div>
    </div>

    <div class="footer">

                          <ul id="footer_nav_main">
        <li class="footer_nav">
          <ul>
              <li><a href="../Contact_Us.php">ABOUT</a></li>
              <li><a href="../Contact_Us.php">CONTACT</a></li>
              <li><a href="../register.php">FREE 7-DAY TRIAL</a></li>
          </ul>
        </li>
        <li class="soc_icons">
          <ul>
              <li class="youtube_icn"><a href="http://www.youtube.com/user/PlaySmoothPiano?feature=watch">YouTube</a></li>
              <li class="fb_icn"><a href="http://www.facebook.com/pages/Play-Smooth-Piano/9678854837">Facebook</a></li>
              <li class="twitter_icn"><a href="https://twitter.com/PlaySmoothPiano">Twitter</a></li>
          </ul>
        </li>

      </ul>
    </div>



    <script src="http://webcube-general.s3.amazonaws.com/stampd/static/webcubecore/js/jquery.min.js"></script>
    <script src="http://webcube-general.s3.amazonaws.com/stampd/static/webcubecore/js/webcube.min.js"></script>
    <script src="http://webcube-general.s3.amazonaws.com/stampd/static/simplecartcore/js/json.cookie.jsoncookie.min.js"></script>
    <script src="http://webcube-general.s3.amazonaws.com/stampd/static/simplecartcore/js/webcube.catalog.min.js"></script>
    <script src="http://webcube-general.s3.amazonaws.com/stampd/static/simplecartcore/js/webcube.product.min.js"></script>

    <script src="/R.js"></script>


    <script type="text/javascript" src="http://webcube-general.s3.amazonaws.com/stampd/static/webcubecore/js/jquery.fancybox-1.3.4.pack.js" ></script>
    <script type="text/javascript" src="http://webcube-general.s3.amazonaws.com/stampd/static/webcubecore/js/cloud-zoom.1.0.2.min.js" ></script>
<script type="text/javascript">var addthis_config = {};</script>
<script type="text/javascript" src="https://s7.addthis.com/js/250/addthis_widget.js"></script>





    <script src="http://webcube-general.s3.amazonaws.com/stampd/static/cloud/js/default.js"></script>
    <script type="text/javascript" charset="utf-8">
	try {

	} catch(e) {}
    </script>
    <script src="/cloud/js/site.js"></script>

    <script type="text/javascript" charset="utf-8"></script>

    <!-- GOOGLE ANALYTICS -->
    <script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-7410295-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>


  </body>
</html>
