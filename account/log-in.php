<?php include('../config/constants.php') ?>

<?php 

    if (isset($_POST['username']) && isset($_POST['password']))
    {
        function validate($data)
        {
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }

        $uname = validate($_POST['username']);
        $pass = validate($_POST['password']);
        // Create an MD5 hash of the password
        $md5Hash = md5($pass);


        if (empty($uname) && empty($pass))
        {
            header("Location: ". URL ."account/index.php?error=الرجاء إدخال اسم المستخدم و كلمة المرور");
            exit();
        }
        else if (empty($uname))
        {
            header("Location: ". URL ."account/index.php?error=الرجاء إدخال اسم المستخدم");
            exit();   
        }
        else if (empty($pass))
        {
            header("Location: ". URL ."account/index.php?error=الرجاء إدخال كلمة المرور");
            exit();
        }
        else
        {
            // Corrected SQL query string
            $sql = "SELECT * FROM table_profs WHERE username='$uname' AND password='$md5Hash'";
            $result = mysqli_query($cnx, $sql);

            if ($result && mysqli_num_rows($result) > 0)
            {
                $row = mysqli_fetch_assoc($result);

                if($row['username'] === $uname && $row['password'] === $md5Hash)
                {
                    // header("Location: ". URL ."account/.php?success=");
                    // exit();
                    echo "welcome back";
                }
                else
                {
                    header("Location: ". URL ."account/index.php?error=اسم المستخدم او كلمة المرور غير صحيح");
                    exit();
                }
            }
            else
            {
                header("Location: ". URL ."account/index.php?error=اسم المستخدم او كلمة المرور غير صحيح");
                exit();
            }
        }
    }
    else
    {
        header("Location: ".URL."account/index.php");
        exit();
    }
?>