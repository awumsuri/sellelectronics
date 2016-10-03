<?php
  error_reporting (E_ALL ^ E_NOTICE);
  session_start();
?>
<?php
if ($_POST['registerbtn']){
	$getuser = $_POST['user'];
	$getemail = $_POST['email'];
        $hasFacebook = "false";

	$_SESSION['getuser_air'] = $getuser;
	$_SESSION['getemail_air'] = $getemail;
        if(isset($_POST["has_facebook"])){
          $hasFacebook = $_POST["has_facebook"];
        }

	$getpass = $_POST['pass'];
	$getretypepass = $_POST['retypepass'];
	if ($getuser){
		if ($getemail){
			if ($getpass){
				if ($getretypepass){
					if ($getpass === $getretypepass){
						if ( (strlen($getemail) >= 7) && (strstr($getemail, "@")) && (strstr($getemail, ".")) ){
							require("./connect.php");

							$query = mysqli_query($conn, "SELECT * FROM users WHERE username='$getuser'");
							$numrows = mysqli_num_rows($query);
							if ($numrows == 0){
								$query = mysqli_query($conn, "SELECT * FROM users WHERE email='$getemail'");
								$numrows = mysqli_num_rows($query);
								if ($numrows == 0){
									$password = $getpass;
									// $password = md5(md5("afeAfils".$password."EsfielA24"));
                                                                        date_default_timezone_set("America/Los_Angeles");
									$date = date("F d, Y");
									$code = md5(rand());

									mysqli_query($conn,"INSERT INTO users VALUES ('', '$getuser', '$password', '$getemail', '0', '$code', '$date', '', '', '', '$hasFacebook')");

									$query = mysqli_query($conn, "SELECT * FROM users WHERE username='$getuser'");
									$numrows = mysqli_num_rows($query);
									// $errormsg2 = "Thanks for registering.  <a href=' https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=X3JBGNGY8EY5U'>Click Here</a> to sign up for a <a href=' https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=X3JBGNGY8EY5U'>Free 7-Day Trial</a>";
									if ($numrows == 1){
										$email = $getemail;
										$site = "http://www.playsmoothpiano.com/non_subscribed.php";
										$site2 = "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=X3JBGNGY8EY5U";
										// $site = "http://localhost/users/users";
										$webmaster = "Play Smooth Piano <JSmooth@PlaySmoothPiano.com>";
										$headers = "From: $webmaster";
										$headers .= "MIME-Version: 1.0\r\n";
										$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
										$subject = "Activate Your Membership";
										$message = "$getuser,</br> ";
										$message .= "<!DOCTYPE html><html><body><p>Thanks for registering with PlaySmoothPiano.com.  Click the link below to login, activate your account and gain access to over 200 piano tutorials (and counting!): <a href='http://www.playsmoothpiano.com/login.php'>Activate</a></p></body></html>";
										// $message .= $site \n \n";
										$message .= "<p>Sincerely,</p>";
										$message .= "<p>-JSmooth</p>";

										if (mail($getemail, $subject, $message, $headers) ){
											$errormsg2 = "You have been registered.  Please activate your $14.95/month subscription here: <a href='https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=B2KALZS3TYJ8S'>www.PayPal.com</a>";
											$errormsg3 = "or <a href=' https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=X3JBGNGY8EY5U'>Click Here</a> to sign up for a <a href=' https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=X3JBGNGY8EY5U'>Free 7-Day Trial</a>.";
											?>
                                            <script type="text/javascript">
											<!--
                                                                                            window.location = "login.php?n=1&name=<?php echo $getuser; ?>&email=<?php echo $getemail; ?>";
											//-->
											</script>
                                            <?php
											$_SESSION['register_success'] = 'You have been Registered succefully. Please .';
										}
										else
											$errormsg = "An error has occured.  Your activation email was not sent.";
									}
									else
										$errormsg = "An error has occured. Your account was not created.";

								}
                                                                else {
									$errormsg = "There is already a user with that email. <a href='login.php'>Sign in here.</a>";
                                            ?>

                                                                      <script type="text/javascript">
                                                                          <?php $_SESSION["hasPSPLogin"] = true;?>
                                                                      </script>
                                            <?php
                                                                }
							}
                                                        else {
								$errormsg = "There is already a user with that username. <a href='login.php'>Sign in here.</a>";
                                                                ?>
                                                                <script type="text/javascript">
                                                                   <?php $_SESSION["hasPSPLogin"] = true;?>
                                                                </script>
                                            <?php
                                                        }


							mysqli_close($conn);
						}
						else
							$errormsg = "You must enter a valid email address to register.";

					}
					else
						$errormsg = "Your passwords did not match.";

				}
				else
					$errormsg = "You must retype your password to register.";

			}
			else
				$errormsg = "You must enter your password to register.";

		}
		else
			$errormsg = "You must enter your email to register.";
	}
	else
		$errormsg = "You must enter your username to register.";

        if($errormsg) {
          $_SESSION = array();
          $_POST = array();
        }
}


$form = "<form action='./register.php' method='post'>
<fc4b><table>
<tr>
	<td></td>
	<td><font color='blue'>$errormsg2</font></td>
</tr>
<tr>
	<td></td>
	<td><font color='blue'>$errormsg3</font></td>
</tr>
<tr>
	<td></td>
	<td><font color='red'>$errormsg</font></td>
</tr>
<tr>
	<td>USERNAME:</td>
	<td><input type='text' name='user' value='$getuser' /></td>
</tr>
<tr>
	<td>EMAIL:</td>
	<td><input type='text' name='email' value='$getemail' /></td>
</tr>
<tr>
	<td>PASSWORD:</td>
	<td><input type='password' name='pass' value='' /></td>
</tr>
<tr>
	<td>RETYPE:</td>
	<td><input type='password' name='retypepass' value='' /></td>
</tr>
<tr>
	<td></td>
	<td><input type='submit' name='registerbtn' value='Register' /></td>
</tr>
</table></fc4b>
</form>";

//echo $form;

?>
<!DOCTYPE html>
<!--[if lt IE 7 ]> <html class="no-js ie lt-ie9 lt-ie8 lt-ie7 ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="no-js ie lt-ie9 lt-ie8 ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="no-js ie lt-ie9 ie8" lang="en"> <![endif]-->
<!--[if IE 9 ]>    <html class="no-js ie ie9" lang="en"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
    <script src="assets/js/jquery.min.js" type="text/javascript"></script>
    <script src="assets/jquery-ui/jquery-ui.min.js" type="text/javascript"></script>
    <link href='http://fonts.googleapis.com/css?family=Roboto+Condensed:400,300' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="/assets/css/facebook.css" media="screen" />
    <link rel="stylesheet" href="/assets/css/facebook.css" media="screen" />
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>PSP | REGISTER</title>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <meta name="ROBOTS" content="FOLLOW, INDEX" />

    <meta name="description" content="" />
    <meta name="keywords" content="" />

    <meta name="viewport" content="width=device-width" />

    <!-- <script src="https://webcube-general.s3.amazonaws.com/stampd/static/webcubecore/js/modernizr.min.js"></script> -->
    <link rel="stylesheet" href="../assets/static/webcubecore/css/webcube.min.css" media="screen" />


<link rel="stylesheet" href="../assets/static/simplecartcore/css/catalog.css" type="text/css" />


    <link rel="shortcut icon" href="/media-upload/favicon.ico" />
    <link rel="apple-touch-icon" href="https://webcube-general.s3.amazonaws.com/stampd/static/cloud/apple-touch-icon.png" />

    <link rel="stylesheet" href="../assets/static/cloud/css/default.min.css" media="screen" />
    <link rel="stylesheet" href="/cloud/css/site_final.css" media="screen" />

    <style type="text/css">


    </style>

    <style type="text/css">

      .fb_fail_message {
         color: red;
         text-align: center;
       }

      .facebook.flat_btn{

        height: 44px;
      }
      #input_fields {
        text-align: center;
      }
      .facebook {
        width:380px !important;
        text-align: center;
        margin: 0 auto;
      }
      .login_error{

        color: #770000;
        font-weight: bold;

      }

      input, h1,h2, .signup_container h1, .break{
        text-align: center;
      }

      .signup_container {
        text-align: center !important;
      }
      #facebook_btn {
        margin: 0 auto;
        width: 380px;

      }
      label, input{
        display: inline-block !important;
}
      #form_container label{

        margin: 0 auto;
        width: 244px !important;
      }
      #form_container{
        margin: 0 auto;
        width: 244px !important;
      }
      form{
        width: 244px !important;
      }

      .facebook_signup{
        width: 380px !important;
        text-align: center;
        margin: 0 auto !important;
      }
    </style>
    <script type="text/javascript">
      window.isLoggedIn = <?php echo json_encode(isset($_SESSION["username"])); ?>
    </script>

    <link rel="stylesheet" href="../assets/static/cloud/css/print.css" media="print" />
</head>

<body id="default" class="accounts login accounts_login">




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
                    	<?php include("nav.php"); ?>
                    </div>    
      <div class="signup_container">
       
        <h1>Join today</h1>
        <h2>There's a world of music waiting for you.</h2>
        <p id="login_error" class="fb_fail_message"><?php echo $errormsg?></p>
        <div class="input_error" style="display: none;"></div>
        <div class="facebook_login_button autogen_class_widgets_base" id="facebook_btn" data-remote="true">
          <button class="facebook flat_btn" onclick="registerUserFB();"><span class="scribd_spinner permanent_rotation" data-size="30" style="height: 30px; width: 30px; background-size: 30px;"></span><span class="icon icon-facebook"></span><span class="flat_btn_content">Join with Facebook</span></button>
          <form id="facebook_signup"  method="post" action="register.php">
            <input id="on_success_redirect_to" name="on_success_redirect_to" type="hidden" value="/"><input id="on_error_redirect_to" name="on_error_redirect_to" type="hidden" value="https://www.scribd.com/?no_cache=1469909346">
            <div class="session_fields has_login_context"><input type="hidden" name="login_params[source]" value="global_signup"><input type="hidden" name="login_params[doc_signup_context]" value=""><input type="hidden" name="login_params[document_id]" value=""><input type="hidden" name="login_params[this_url]" value="https://www.scribd.com/"></div>
          </form>
        </div>
  <div class="break">or</div>
  <div id="form_container">
  <form id="psp_login_form" method="post" action="non_subscribed.php" class="signup_form newform" data-remote="true" data-type="json">
    <div class="hidden_fields has_login_context"><input type="hidden" name="login_params[next_url]" value="/archive/pmp_checkout?metadata=%7B%22context%22%3A%22pmp%22%2C%22page%22%3A%22home2%22%2C%22action%22%3A%22start_trial%22%2C%22logged_in%22%3Afalse%2C%22platform%22%3A%22web%22%7D"><input type="hidden" name="login_params[context]" value="join"></div>
<div id="labels">
    <label><input type="text" class="input username_input" name="user" placeholder="Username" maxlength="50" required></label><label><input type="email" class="input email_input inspectletIgnore" placeholder="Email" name="email" required></label><label><input type="password" class="input inspectletIgnore" placeholder="Password" name="pass" required></label><label class="signup_optin"><input type="checkbox" class="optin_check" name="optin" checked="checked" value="y">Send me news from time to time</label>
</div>
  <div class="button_container"><button class="flat_btn" onclick="registerUser();"><span class="scribd_spinner permanent_rotation" data-size="30" style="height: 30px; width: 30px; background-size: 30px;"></span><span class="flat_btn_content">Join now</span></button></div>
    <div class="signin_instead">Already a member? <a href="login.php" class="signin_instead_btn">Sign in.</a></div>
  </form>
</div>
</div>

            <section id="content_wrap" role="main" class="">
                <div class="position">
                    <div id="content_container" class="container">

                        <div id="content" class="">


<div style="display: none" class="position_accent_block">
    <div class="accent_block">
        <h2>Registration Form</h2>



<!-- keytext #keytext_accounts_login_intro -->




    <!-- cta #cta_key_accounts_login_intro -->




        <ul class="connect">
            <!-- <li class="webcube active"><a href="#"><span><span>Stampd LA</span></span></a></li>

             <li class="facebook"><a href="/auth/login/facebook/"><span class="icon"></span><span>Facebook</span></a></li>
            <li class="google"><a href="/auth/login/google/"><span class="icon"></span><span>Google</span></a></li> -->

        </ul>
        <form action="./register.php" method="post" accept-charset="utf-8"><div style='display:none'></div>
    <div id="row_username" class="row">


    <?php //echo $errormsg?>
    <?php //echo $errormsg2?>
    <?php //echo $errormsg4?>
   <ul class="errorlist"><li><?php echo $errormsg?><?php echo $errormsg2?></li></ul>
            <label for="id_username">
                <span class="required">*</span>Username:
            </label>
            <input type="text" name="user" id="$getuser" maxlength="30" />
	</p>
    </div>
    <div id="row_password" class="row">
	<p >
		    <label for="id_password">
                <span class="required">*</span>Email:
            </label>
            <input type="text" name="email" id="$getemail"/>
	</p>
    </div>
    <div id="row_password" class="row">
	<p >
		    <label for="id_password">
                <span class="required">*</span>Password:
            </label>
            <input type="password" name="pass" value="" />
	</p>
    </div>
    <div id="row_password" class="row">
	<p >

            <label for="id_password">
                <span class="required">*</span>Retype:
            </label>
            <input type="password" name="retypepass" value="" />
	</p>
    </div>
	<p class="no_label">
			<input type="submit" class="button" name="registerbtn" value="Register" />
	</p>
        </form>
        <!-- <form action="./http://www.playsmoothpiano.com/newsletter_air.php"></form> -->
    </div>
    <p class="post_accent_block"><img width="78" height="74" border="0" alt="Pay Pal Merchant - Click to Verify" src="Images/blkx/paypal_logo_2.png"></p>
    <!-- <p class="post_accent_block">Don't have an account? <a href="register.php">Sign up now</a>.<br/>
    <a href="forgotpass.php">Forgot your password?</a></p> -->
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
              <li><a href="Contact_Us.php">CONTACT</a></li>
              <li><a href="register.php">REGISTER</a></li>
              <li><a href="index.html">RETRO VIDEO TUTORIALS</a></li>
              <!-- <li><a href="/sitemap.xml">XML Sitemap</a></li> -->
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
    <script src="facebook_auth.js"></script>
    <script src="https://webcube-general.s3.amazonaws.com/stampd/static/webcubecore/js/jquery.min.js"></script>
    <script src="https://webcube-general.s3.amazonaws.com/stampd/static/webcubecore/js/webcube.min.js"></script>
    <script src="https://webcube-general.s3.amazonaws.com/stampd/static/simplecartcore/js/json.cookie.jsoncookie.min.js"></script>
    <script src="https://webcube-general.s3.amazonaws.com/stampd/static/simplecartcore/js/webcube.catalog.min.js"></script>
    <script src="https://webcube-general.s3.amazonaws.com/stampd/static/simplecartcore/js/webcube.product.min.js"></script>
    <script src="/R.js"></script>
    <script src="https://webcube-general.s3.amazonaws.com/stampd/static/cloud/js/default.js"></script>
    <script src="/cloud/js/site.js"></script>
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
