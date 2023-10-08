<?php

    // start session

    session_start();

    define('URL', 'http://localhost/School/');
    
    define('LOCALHOST', 'localhost');
    define('DB_USER', 'root');
    define('DB_PASSWORD', '02976cef6a');
    define('DB_NAME', 'administration');

    // DB connection
    $cnx = mysqli_connect(LOCALHOST, DB_USER, DB_PASSWORD) or die(mysqli_error());
    $db = mysqli_select_db($cnx, DB_NAME) or die(mysqli_error()); 

?>