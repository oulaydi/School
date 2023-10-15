<?php

// Access Control
if(!isset($_SESSION['user']))
{
    header("Location: loclahost/School/admin/index.php?error=الرجاء تسجيل الدخول اولا!");
    exit();
}

?>