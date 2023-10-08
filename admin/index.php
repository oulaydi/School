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
    <link rel="stylesheet" href="../css/admin.css">
    <script
      src="https://kit.fontawesome.com/64d58efce2.js"
      crossorigin="anonymous"
    ></script>

    <title>الفضاء الخاص بالإدارة </title>
  </head>
  <body>
      <div class="logo">
        <img class="LogoMenAr" src="../images/LogoMenAr.png" alt="LogoMenAr" />
      </div>

      <div class="forms-container">
        <div class="signin-signup">
          <form action="login.php" method="post" class="sign-in-form">
            <h2 class="title">الإدارة</h2>
            <?php if (isset($_GET['error'])) { ?>
              <p id="error-container" class="error"><?php echo $_GET['error']; ?></p>
            <?php } ?>
            <div class="input-field">
              <input id="username" type="text" name="username" autocomplete="off" placeholder="اسم المستخدم" />
            </div>
            <div class="input-field">
              <input id="password" type="password" name="password" placeholder="كلمة المرور" />
            </div>
              <div class="btn-1">
                <button id="submit" type="submit">تسجيل الدخول</button>
              </div>
          </form>
        </div>
      </div>

     <footer>
      <p><i><a href="https://github.com/oulaydi" target="_blank">OUALDYI</a></i> &copy; 2023 .جميع الحقوق محفوظة</p>
    </footer>

    <script src="../js/admin.js"></script>
    </body>
</html>

