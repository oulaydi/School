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

        if (empty($uname) && empty($pass))
        {
            header("Location: ". URL ."admin/index.php?error=الرجاء إدخال اسم المستخدم و كلمة المرور");
            exit();
        }
        else if (empty($uname))
        {
            header("Location: ". URL ."admin/index.php?error=الرجاء إدخال اسم المستخدم");
            exit();   
        }
        else if (empty($pass))
        {
            header("Location: ". URL ."admin/index.php?error=الرجاء إدخال كلمة المرور");
            exit();
        }
        else
        {
            // Corrected SQL query string
            $sql = "SELECT * FROM table_admin WHERE username='$uname' AND password='$pass'";
            $result = mysqli_query($cnx, $sql);

            if ($result && mysqli_num_rows($result) > 0)
            {
                $row = mysqli_fetch_assoc($result);

                if($row['username'] === $uname && $row['password'] === $pass)
                {
                    header("Location: ". URL ."admin/admin-panel.php?success=مرحبًا بعودتك");
                    exit();
                }
                else
                {
                    header("Location: ". URL ."admin/index.php?error=اسم المستخدم او كلمة المرور غير صحيح");
                    exit();
                }
            }
            else
            {
                header("Location: ". URL ."admin/index.php?error=اسم المستخدم او كلمة المرور غير صحيح");
                exit();
            }
        }
    }
    else
    {
        header("Location: ".URL."admin/index.php");
        exit();
    }
?>