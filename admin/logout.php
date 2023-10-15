<?php
    //include the constans file
    include('../config/constants.php');

    //destory the session
    session_destroy(); //Unsert $_SESSION['user'] 

    //Redirect to the login page
    header("location:".URL.'admin/');

?>