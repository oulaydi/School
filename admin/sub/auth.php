<?php

include('../../config/constants.php');

if(!isset($_SESSION['error']))
{
    header("Location: ". URL ."admin/index.php?error= ! المرجو تسجيل الدخول اولا");
    exit();
}

?>