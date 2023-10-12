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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

    <title>الإدارة - تسجيل الدخول</title>
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
              <p id="error-container" class="error">
              <?php echo $_GET['error']; ?></p>
            <?php } ?>
            <div class="input-field">
              <input id="username" type="text" name="username" autocomplete="off" placeholder="اسم المستخدم" />
            </div>
            <div class="input-field">
              <input id="password" type="password" name="password" placeholder="كلمة المرور" />
            </div>
              <div class="btn-1">
                <button class="rounded-1" id="submit" type="submit">تسجيل الدخول</button>
              </div>
          </form>
        </div>
      </div>

    <footer>
      <p><i><a href="https://github.com/oulaydi" target="_blank">OUALDYI</a></i> &copy; 2023 .جميع الحقوق محفوظة</p>
    </footer>

    <script>
      <?php if (isset($_GET['error'])) { ?>
        // Change the border color to red
        document.getElementById('username').style.border = '2px solid red';
        document.getElementById('password').style.border = '2px solid red';

      const usernameInput = document.getElementById('username');
      const passwordInput = document.getElementById('password');

      usernameInput.addEventListener('input', function() {
        usernameInput.style.border = '2px solid #FFA300';
      });

      passwordInput.addEventListener('input', function() {
        passwordInput.style.border = '2px solid #FFA300';
      });

      <?php } ?>
    </script>
    </body>
</html>

