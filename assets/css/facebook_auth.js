var LOGIN_URL = "login.php";
var LOGOUT_URL = "logout.php";
var HOME_URL = "index.php";
var REGISTER_URL = "register.php";

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.debug("status", response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  createShareButtons();
  var pathname = window.location.pathname;
  if(pathname.indexOf("logout") !== -1){
    FBLogout();
  }

  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    if(pathname.indexOf("login") !== -1)
      loginUsingFB();
    //else if(pathname.indexOf("register") !== -1)
    //  registerToPlaysmooth(response);
    if(pathname.indexOf("login") === -1 && isLoggedIn)
      setLoginHTML();

  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    //document.getElementById('status').innerHTML = "Login";
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    //document.getElementById('status').innerHTML = "Login"
  }
}

function createHandlers() {
  $("#nav_global_login").live("click", authHandler);
  $("#authBtn").live("click", authHandler);
}

function authHandler(e) {
  var state = e.target.textContent;
  if( state === "LOGIN" || state === "login") {
    window.location.href = LOGIN_URL;
    return false;
  } else {

    $.ajax({
      url: LOGOUT_URL,
      cache: false,
      success: function(resp){
        var data = JSON.parse(resp);
        if(data.has_facebook === "true"){
          FB.logout(function(response) {
            window.location.href = HOME_URL;
            return false;
          });

        } else {
            window.location.href = HOME_URL;
            return false;
        }
      }
    });
  }
}

function clearCookies(name) {
  var fbCookie = document.cookie;
  var index = fbCookie.indexOf(name);
  fbCookie = fbCookie.slice(index);
  index = fbCookie.indexOf("=");
  fbCookie = fbCookie.slice(0, index);
  fbCookie = fbCookie+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=www.playsmoothpiano.com;";
  document.cookie = fbCookie;
}

function appendInputToForm(form, value, name) {
  var input = document.createElement("input");
  input.setAttribute("name", name);
  input.setAttribute("value", value);
  input.setAttribute("type", "hidden");
  form.appendChild(input);
}

function registerUser() {
    var form = document.getElementById("psp_login_form")

    form.setAttribute("action", REGISTER_URL);
    appendInputToForm(form, "Login", "loginbtn");
    appendInputToForm(form, form.elements.pass.value,  "retypepass");
    appendInputToForm(form, "register", "registerbtn");
    form.submit();
}

function registerUserFB() {
  FB.getLoginStatus(function(response) {
    if (response.status === "connected") {
      sendRegisterData();
    } else {
      FB.login(function(resp) {
        sendRegisterData();
      });
    }
  });
}

function sendRegisterData() {
  FB.api("/me", function(resp) {
    var form = document.createElement("form");
    var error = document.getElementById("login_error").innerHTML;

    form.setAttribute("method", "POST");
    form.setAttribute("action", REGISTER_URL);
    appendInputToForm(form, resp.name, "username");
    appendInputToForm(form, resp.email, "email");
    appendInputToForm(form, resp.name, "user");
    appendInputToForm(form, "Login", "loginbtn");
    appendInputToForm(form, resp.id, "password");
    appendInputToForm(form, resp.id, "pass");
    appendInputToForm(form, "register", "registerbtn");
    appendInputToForm(form, resp.id, "retypepass");
    appendInputToForm(form, "true", "has_facebook");

      form.submit();
  }, {"fields": "name, email"} );
}

function loginActiveUser() {
  var form = document.getElementById("signInForm");
  appendInputToForm(form, "Login", "loginbtn");
  form.submit();
}

function loginUsingFB(pressedBtn) {
  FB.api("/me", function(resp) {
    var form = document.createElement("form");
    var url;

    form.setAttribute("method", "POST");
    appendInputToForm(form, resp.name, "username");
    appendInputToForm(form, resp.email, "email");
    appendInputToForm(form, resp.name, "user");
    appendInputToForm(form, "Login", "loginbtn");
    appendInputToForm(form, resp.id, "password");
    appendInputToForm(form, resp.id, "pass");
    appendInputToForm(form, "register", "registerbtn");
    appendInputToForm(form, resp.id, "retypepass");
    appendInputToForm(form, resp.name, "haroon");

    $.ajax({
      url: "facebook_login.php",
      type: "POST",
      data: {
        email: resp.email
      },
      cache: true,
      success: function(response) {
        var responseObject = JSON.parse(response);
        if(pressedBtn) {
           form.setAttribute("action", LOGIN_URL);
           form.submit();
        }
        else if (responseObject &&  responseObject.has_facebook == "true") {
          if(responseObject.active == "1") {
            form.setAttribute("action", LOGIN_URL);
            form.submit();
          }
        }
      },
      fail: function(response) {

      }
    });
  }, {"fields": "name, email"} );
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '129119580125',
    xfbml      : true,
    version    : 'v2.7',
    cookie     : true
  });

  // Now that we've initialized the JavaScript SDK, we call
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

};

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML = getLoginHTML(response);
  });
}

function getUserInfo() {
  FB.api('/me', function(response) {
    console.log('Successful login for: ',  response);
    return response;
  },{"fields": "name, email"} );
}

function FBLogin() {
  FB.login(function(response) {
    console.log("login response:", response)
      if(response.status == "connected") {
        loginUsingFB(true)
        setLoginHTML();
      }
  },{scope: 'email,user_likes'});
}

function setLoginHTML() {
  FB.api("/me", function(resp){
    if(document.getElementById("fb_image"))
      document.getElementById('fb_image').innerHTML = "<style> .fb_profile img{ border-radius: 5px; width: 40px; height: 40px;} </style> <div class='fb_profile'><img src='http://graph.facebook.com/"+resp.id+"/picture?type=normal'> </img></div>";
  }, {"fields": "name, email"});
}

function FBLogout() {
  FB.logout(function(response) {
    window.location.href  = LOGOUT_URL;
    return false;
  });
}

function createShareButtons() {
  FB.XFBML.parse(document.getElementsByClassName("fb-like")[0]);
  console.log("Button parsed");
}

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
createHandlers();
