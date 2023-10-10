<?php include('../config/constants.php') ?>

<?php
    // process the velue form and save it in DB
    // checking if lboton tecklika elih or not!

    if(isset($_POST['submit'])){
        $cin = $_POST['CIN'];
        $full_name = $_POST['full_name'];
        $username = $_POST['username'];
        $password = md5($_POST['password']); // md5 make an encrypted passcode
        $level = $_POST['selected_level'];
        $subject = $_POST['selected_subject'];
        
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
            header("Location: ". URL ."admin/admin-panel.php?success=لقد تمت الإضافة بنجاح");
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
    <title>إضافة استاذ(ة)</title>
  </head>
<body>
    <div class="logo">
      <img class="LogoMenAr" src="../images/LogoMenAr.png" alt="LogoMenAr"/>
    </div>
    <div class="center-container">
      <?php if (isset($_GET['success'])) { ?>
              <p id="success-container" class="success" dir="rtl">
              <?php echo $_GET['success']; ?></p>
      <?php } ?>
      <?php if (isset($_GET['error'])) { ?>
              <p id="error-container" class="error" dir="rtl">
              <?php echo $_GET['error']; ?></p>
      <?php } ?>
      <div class="container my-5" dir="rtl">
          <form autocomplete="off" method="POST">
            <div class="mb-3">
              <label class="form-label cus-label" >CIN</label><span> :</span>
              <input type="text" name="CIN" placeholder="رقم البطاقة الوطنية" id="input-field" class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label cus-label" >الإسم الكامل </label><span> :</span>
              <input type="text" name="full_name" required placeholder="اسم و نسب الاستاذ(ة)" id="input-field" class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label cus-label">إسم المستخدم </label><span> :</span>
              <input type="text" name="username" required placeholder="ادخل اسم المستخدم الخاص" id="input-field" class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label cus-label">كلمة المرور </label><span> :</span>
              <input type="password" name="password" required placeholder="ادخل كلمة المرور" id="input-field" class="form-control">
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
    <footer>
      <p><i><a href="https://github.com/oulaydi" target="_blank">OUALDYI</a></i> &copy; 2023 .جميع الحقوق محفوظة</p>
    </footer>
</body>
</html>