<?php
  session_start();

  header("Content-type: text/css; charset: UTF-8");
  $nofacebook = $_SESSION["nofacebook"];
?>
      #input_fields {
        text-align: center;
      }
      .facebook {
        width:380px !important;
        text-align: center;
        margin: 0 auto;
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
