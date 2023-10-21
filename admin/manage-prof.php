<?php include('../config/constants.php'); ?>

<?php
      //get the id to change
      $id = $_GET['id_prof'];

      //Create the SQL Query
      $sql = "SELECT * FROM table_profs WHERE id_prof = $id";

      //Execute the Query 
      $result = mysqli_query($cnx, $sql);

      //check the Query if executed or not
      if ($result == true)
      {
          $count = mysqli_num_rows($result);
              if($count == 1){
                  $row = mysqli_fetch_assoc($result);

                  $cin = $row['CIN'];
                  $full_name = $row['full_name'];
                  $username = $row['username'];
                  $pass = $row['password'];
                  $level = $row['niveau'];
                  $subject = $row['matiere'];
              }
              else{
                  echo '<p style="  background-color: #d4edda;
                                    color: #155724;
                                    padding: 10px;
                                    border: 1px solid #c3e6cb;
                                    border-radius: 5px;
                                    font-size: 1rem;
                                    width: 40%;"
                                    >وقع خلل في قاعدة البيانات</p>';
              }
      }
?>

<?php
    // ... (previous code)
    if (isset($_POST['submit']))
    {
        $full_name = $_POST['full_name'];
        $username = $_POST['username'];
        $password1 = $_POST['password'];
        $password2 = $_POST['confirm_password']; // New input for password confirmation
        $level = $_POST['selected_level'];
        $subject = $_POST['selected_subject'];
        
        if(empty($password1) && empty($password2))
        {
          $password = $pass;
        }
        else
        {
          // Check if passwords match
          if ($password1 !== $password2)
          {
            $_SESSION['form_data'] = $_POST;
            header("Location: " . URL . "admin/manage-prof.php?id_prof=$id&error=كلمة المرور غير متطابقة !");
            exit();
          }
          else
          {
            $password = md5($password1);
          }            
        }

        // SQL Query then save into DB
        $sql1 = "UPDATE table_profs SET 
        full_name='$full_name',
        username='$username',
        password='$password',
        niveau='$level',
        matiere='$subject' WHERE id_prof = $id";

        $result1 = mysqli_query($cnx, $sql1) or die(mysqli_error());

        if ($result1 == true)
        {
          header("Location: " . URL . "admin/admin-panel.php?success=لقد تم التحديث بنجاح");
          exit();
        }
        else
        {
          header("Location: " . URL . "admin/manage-prof.php?id_prof=$id&error=لم تتم العملية بنجاح");
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
    <title>تحديث استاذ(ة)</title>
  </head>
<body>
    <div class="logo">
      <img class="LogoMenAr" src="../images/LogoMenAr.png" alt="LogoMenAr"/>
    </div>
    <div class="center-container">
      <div>
        <h3 id="h4" >تحديث استاذ(ة)</h3>
      </div>
      <a href="admin-panel.php" title="إلفاء" class="mt-5"><button type="button" class="btn-close" style="margin-left: 13px;" aria-label="Close"></button></a>
     <div class="container my-5" dir="rtl">
      <?php if (isset($_GET['error'])) { ?>
              <p id="error-container" class="error" dir="rtl">
              <?php echo $_GET['error']; ?></p>
      <?php } ?>
          <form autocomplete="off" method="POST" >
            <div class="mb-3">
              <label class="form-label cus-label" >CIN</label><span> :</span>
              <input type="text" placeholder="رقم البطاقة الوطنية" id="input-field" disabled value="<?php echo $cin; ?>" class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label cus-label" >الإسم الكامل </label><span> :</span>
              <input type="text" placeholder="اسم و نسب الاستاذ(ة)" name="full_name" id="input-field" value="<?php echo $full_name; ?>" class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label cus-label">إسم المستخدم </label><span> :</span>
              <input type="text" placeholder="ادخل اسم المستخدم الخاص" name="username" id="input-field" value="<?php echo $username; ?>" class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label cus-label">كلمة المرور الجديدة</label><span> :</span>
              <input type="password" placeholder="ادخل كلمة المرور" name="password" value="<?php echo isset($_SESSION['form_data']['password']) ? $_SESSION['form_data']['password'] : ''; ?>" id="input-field" class="form-control">
              <i class="fas fa-eye" style="" id="togglePassword"></i>
            </div>
            <div class="mb-3">
              <label class="form-label cus-label">اعد كلمة المرور</label><span> :</span>
              <input type="password" placeholder="ادخل كلمة المرور من جديد" name="confirm_password" value="<?php echo isset($_SESSION['form_data']['confirm_password']) ? $_SESSION['form_data']['confirm_password'] : ''; ?>" id="input-field" class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label cus-label">المستوى</label><span> :</span>
              <select class="form-select" aria-label="Default select example" id="input-field" name="selected_level">
                  <option <?php echo $level === 'إعدادي' ? 'selected' : ''; ?> value="إعدادي">إعدادي</option>
                  <option <?php echo $level === 'ثانوي' ? 'selected' : ''; ?> value="ثانوي">ثانوي</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label cus-label">مادة</label><span> :</span>
              <select class="form-select" aria-label="Default select example" id="input-field" name="selected_subject">
                <option <?php echo $subject === 'اللغة العربية (Arabic Language)' ? 'selected' : ''; ?> value="اللغة العربية (Arabic Language)">اللغة العربية (Arabic Language)</option>
                <option <?php echo $subject === 'اللغة الفرنسية (French Language)' ? 'selected' : ''; ?> value="اللغة الفرنسية (French Language)">اللغة الفرنسية (French Language)</option>
                <option <?php echo $subject === 'اللغة الإنجليزية (English Language)' ? 'selected' : ''; ?> value="اللغة الإنجليزية (English Language)">اللغة الإنجليزية (English Language)</option>
                <option <?php echo $subject === 'اللغة الإسبانية (Spanish Language)' ? 'selected' : ''; ?> value="اللغة الإسبانية (Spanish Language)">اللغة الإسبانية (Spanish Language)</option>
                <option <?php echo $subject === 'اللغة الألمانية (German Language)' ? 'selected' : ''; ?> value="اللغة الألمانية (German Language)">اللغة الألمانية (German Language)</option>
                <option <?php echo $subject === 'الرياضيات (Mathematics)' ? 'selected' : ''; ?> value="الرياضيات (Mathematics)">الرياضيات (Mathematics)</option>
                <option <?php echo $subject === 'الفيزياء (Physics)' ? 'selected' : ''; ?> value="الفيزياء (Physics)">الفيزياء (Physics)</option>
                <option <?php echo $subject === 'الكيمياء (Chemistry)' ? 'selected' : ''; ?> value="الكيمياء (Chemistry)">الكيمياء (Chemistry)</option>
                <option <?php echo $subject === 'الأحياء (Biology)' ? 'selected' : ''; ?> value="الأحياء (Biology)">الأحياء (Biology)</option>
                <option <?php echo $subject === 'الجغرافيا (Geography)' ? 'selected' : ''; ?> value="الجغرافيا (Geography)">الجغرافيا (Geography)</option>
                <option <?php echo $subject === 'التربية الإسلامية (Islamic Education)' ? 'selected' : ''; ?> value="التربية الإسلامية (Islamic Education)">التربية الإسلامية (Islamic Education)</option>
                <option <?php echo $subject === 'الفلسفة (Philosophy)' ? 'selected' : ''; ?> value="الفلسفة (Philosophy)">الفلسفة (Philosophy)</option>
                <option <?php echo $subject === 'ألتربية التشكيلية (Art education)' ? 'selected' : ''; ?> value="ألتربية التشكيلية (Art education)">ألتربية التشكيلية (Art education)</option>
                <option <?php echo $subject === 'المعلوميات (Informatique)' ? 'selected' : ''; ?> value="المعلوميات (Informatique)">المعلوميات (Informatique)</option>
                <option <?php echo $subject === 'التكنولوجيا (technology)' ? 'selected' : ''; ?> value="التكنولوجيا (technology)">التكنولوجيا (technology)</option>
              </select>
            </div>
              <input type="hidden" name="id_prof" value="<?php echo $id;?>">
              <button type="submit" name="submit" class="btn btn-primary">تحديث</button>
            </form>
          </div>
      </div>
      
      <script src="../js/unset.js"></script>

      <?php include('partials/footer.php'); ?>
      <?php include('partials/auth.php'); ?>

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
  </body>
</html>