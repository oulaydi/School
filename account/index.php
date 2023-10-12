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
    <link rel="stylesheet" href="../css/login.css" />
    <script
      src="https://kit.fontawesome.com/64d58efce2.js"
      crossorigin="anonymous"
    ></script>

    <title>الفضاء الخاص بالأساتذة</title>
  </head>
  <body>
    <div class="container">
      <div class="logo">
        <img class="LogoMenAr" src="../images/LogoMenAr.png" alt="LogoMenAr" />
      </div>
      <div class="forms-container">
        <div class="signin-signup">
          <form action="log-in.php" method="post" class="sign-in-form" autocomplete="off">
            <h2 class="title">تسجيل الدخول</h2>
            <?php if (isset($_GET['error'])) { ?>
              <p id="error-container" class="error">
              <?php echo $_GET['error']; ?></p>
            <?php } ?>
            <div class="input-field" id="username">
              <i class="fas fa-user"></i>
              <input type="text" name="username"  placeholder="اسم المستخدم" />
            </div>
            <div class="input-field" id="password">
              <i class="fas fa-lock"></i>
              <input type="password" name="password" placeholder="كلمة المرور" />
            </div>
            <input type="submit" value="تسجيل الدخول" class="btn-1" />
            <button class="btn transparent" id="sign-up-btn">
              نسيت كلمة المرور؟
            </button>
            <div class="footer">
              <p class="footer-p">
                <i
                  ><a href="https://github.com/oulaydi" target="_blank"
                    >OUALDYI</a
                  ></i
                >
                &copy; 2023 .جميع الحقوق محفوظة
              </p>
            </div>
          </form>
        </div>
      </div>
      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h1>مرحبًا بك في حسابك الخاص</h1>
            <p>
              منظومة معلوماتية متكاملة تمكن من إرساء طرق عمل جديدة للتدبير
              المدرسي على صعيد المؤسسات التعليمية
            </p>
          </div>
          <img src="../images/teacher.svg" class="image" alt="" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h1>ما الحل؟</h1>
            <p style="margin-bottom: 90px">
              من فضلك، انتقل إلى إدارة المدرسة لتحديث كلمة المرور الجديدة الخاصة
              بك.
            </p>
            <img src="../images/solution.svg" class="image" alt="" />
            <button class="btn transparent-1" id="sign-in-btn">عودة</button>
          </div>
        </div>
      </div>
    </div>
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
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
      crossorigin="anonymous"
    ></script>
    <script src="../js/script.js"></script>
  </body>
</html>
