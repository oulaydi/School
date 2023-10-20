<?php include('../config/constants.php'); ?>

<?php
    // process the velue form and save it in DB
    // checking if lboton tecklika elih or not!

    if(isset($_POST['submit'])){
        $cin = $_POST['CIN'];
        $full_name = $_POST['full_name'];
        $username = $_POST['username'];
        $password1 = $_POST['password'];
        $password2 = $_POST['confirm_password']; // New input for password confirmation
        $level = $_POST['selected_level'];
        $subject = $_POST['selected_subject'];
        
        // Check if passwords match
        if ($password1 !== $password2)
        {
          $_SESSION['form_data'] = $_POST;
          header("Location: " . URL . "admin/add-prof.php?error=كلمة المرور غير متطابقة !");
          exit();
        }

        $password = md5($password1);

        //SQL Query then sabe inot DB
        $sql = "INSERT INTO table_profs SET 
            CIN='$cin',
            full_name='$full_name',
            username='$username',
            password='$password',
            niveau='$level',
            matiere='$subject'
        ";

        $results = mysqli_query($cnx, $sql) or die(mysqli_error());

        if ($results == true)
        {
            header("Location: ". URL ."admin/admin-panel.php?success=تمت الإضافة بنجاح");
            exit();
        }
        else
        {
            header("Location: ". URL ."admin/add-prof.php?error=لم تتم العملية بنجاح");
            exit();
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="info" content="Web school project" />
    <meta
      name="description"
      content="Hi, I am OULAYDI Oussama and I'm working on a school project :3"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="../images/icon.PNG" type="image/x-icon" />
    <link rel="stylesheet" href="../css/add-prof.css" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <title>إضافة استاذ(ة)</title>
  </head>
<body>
    <div class="logo">
      <img class="LogoMenAr" src="../images/LogoMenAr.png" alt="LogoMenAr"/>
    </div>
    <div class="center-container">
      <div>
        <h3 id="h4">إضافة استاذ(ة)</h3>
      </div>
     <a href="<?php URL; ?>admin-panel.php" title="إلفاء" class="mt-5"><button type="button" class="btn-close" aria-label="Close" style="margin-left: 13px;"></button></a> 
     <div class="container my-5" dir="rtl">
        <?php if (isset($_GET['error'])) { ?>
                <p id="error-container" class="error" dir="rtl">
                <?php echo $_GET['error']; ?></p>
        <?php } ?>
          <form autocomplete="off" method="POST">
            <div class="mb-3">
              <label class="form-label cus-label" >CIN</label><span> :</span>
              <input type="text" name="CIN" required placeholder="رقم البطاقة الوطنية" value="<?php echo isset($_SESSION['form_data']['CIN']) ? $_SESSION['form_data']['CIN'] : ''; ?>" id="input-field" class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label cus-label" >الإسم الكامل </label><span> :</span>
              <input type="text" name="full_name" placeholder="اسم و نسب الاستاذ(ة)" value="<?php echo isset($_SESSION['form_data']['full_name']) ? $_SESSION['form_data']['full_name'] : ''; ?>" id="input-field" class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label cus-label">إسم المستخدم </label><span> :</span>
              <input type="text" name="username" required placeholder="ادخل اسم المستخدم الخاص" value="<?php echo isset($_SESSION['form_data']['username']) ? $_SESSION['form_data']['username'] : ''; ?>" id="input-field" class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label cus-label">كلمة المرور </label><span> :</span>
              <input type="password" name="password" required placeholder="ادخل كلمة المرور" value="<?php echo isset($_SESSION['form_data']['password']) ? $_SESSION['form_data']['password'] : ''; ?>" id="input-field" class="form-control">
              <i class="fas fa-eye" style="" id="togglePassword"></i>
            </div>
            <div class="mb-3">
              <label class="form-label cus-label">اعد كلمة المرور</label><span> :</span>
              <input type="password" required placeholder="ادخل كلمة المرور من جديد" name="confirm_password" value="<?php echo isset($_SESSION['form_data']['confirm_password']) ? $_SESSION['form_data']['confirm_password'] : ''; ?>" id="input-field" class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label cus-label">المستوى </label><span> :</span>
              <select class="form-select" aria-label="Default select example" id="input-field" name="selected_level">
                <option selected name="colle" value="إعدادي">إعدادي</option>
                <option name="lycee" value="ثانوي">ثانوي</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label cus-label">المادة</label><span> :</span>
              <select class="form-select" aria-label="Default select example" id="input-field" name="selected_subject">
                <option selected value="اللغة العربية (Arabic Language)">اللغة العربية (Arabic Language)</option>
                <option value="اللغة الفرنسية (French Language)">اللغة الفرنسية (French Language)</option>
                <option value="اللغة الإنجليزية (English Language)">اللغة الإنجليزية (English Language)</option>
                <option value="اللغة الإسبانية (Spanish Language)">اللغة الإسبانية (Spanish Language)</option>
                <option value="اللغة الألمانية (German Language)">اللغة الألمانية (German Language)</option>
                <option value="الرياضيات (Mathematics)">الرياضيات (Mathematics)</option>
                <option value="الفيزياء (Physics)">الفيزياء (Physics)</option>
                <option value="الكيمياء (Chemistry)">الكيمياء (Chemistry)</option>
                <option value="الأحياء (Biology)">الأحياء (Biology)</option>
                <option value="الجغرافيا (Geography)">الجغرافيا (Geography)</option>
                <option value="التربية الإسلامية (Islamic Education)">التربية الإسلامية (Islamic Education)</option>
                <option value="الفلسفة (Philosophy)">الفلسفة (Philosophy)</option>
                <option value="ألتربية التشكيلية (Art education)">ألتربية التشكيلية (Art education)</option>
                <option value="المعلوميات (Informatique)">المعلوميات (Informatique)</option>
                <option value="التكنولوجيا (technology)">التكنولوجيا (technology)</option>
              </select>
            </div>
            <div class="mb-3 custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="customCheck1" required>
                <label class="custom-control-label" for="customCheck1">اشهد على صحة المعلومات المصرح بها</label>
            </div>
            <button type="submit" name="submit" class="btn btn-primary"><span> +</span>إضافة</button>
          </form>
      </div>
    </div>
    <script>
            const passwordInput = document.querySelector('input[name="password"]');
            const confirmInput = document.querySelector('input[name="confirm_password"]');
            const togglePassword = document.getElementById('togglePassword');
            
            togglePassword.addEventListener('click', function () {
              togglePasswordVisibility(passwordInput);
              togglePasswordVisibility(confirmInput);
            });
            
            function togglePasswordVisibility(inputField) {
              if (inputField.type === 'password') {
                    inputField.type = 'text';
                } else {
                    inputField.type = 'password';
                  }
            }
          </script>
    <script src="../js/unset.js"></script>
    
    <?php include('partials/footer.php'); ?>

</body>
</html>