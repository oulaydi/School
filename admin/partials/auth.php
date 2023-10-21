<?php
    define('SITE', 'http://localhost/School/');

    // Access Control
    if(!isset($_SESSION['user']))
    {
        header("Location: ". SITE ."admin/index.php?error=! المرجو تسجيل الدخول اولا");
        exit();
    }
?>