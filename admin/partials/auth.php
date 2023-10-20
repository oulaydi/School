<?php
    // Access Control
    if(!isset($_SESSION['auth']))
    {
        header("Location: index.php?error=المرجو تسجيل الدخول اولا !");
        exit();
    }
?>