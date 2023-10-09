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
    <link rel="stylesheet" href="../css/panel-style.css" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <title>الرئيسية - لوحة القيادة</title>
  </head>
<body>
    <div class="logo">
      <img class="LogoMenAr" src="../images/LogoMenAr.png" alt="LogoMenAr"/>
    </div>
      <div class="container" dir="rtl">
        <button class="btn btn-primary my-5"><a href="add-prof.php" class="text-light">إضافة استاذ(ة)</a><span> +</span></button>
      </div>
      <?php if (isset($_GET['success'])) { ?>
              <p id="success-container" class="success" dir="rtl">
              <?php echo $_GET['success']; ?></p>
            <?php } ?>
        <table class="table table-bordered w-75" id="center-container" dir="rtl">
          <thead>
            <tr class="text-center">
              <th scope="col">رقم الاستاذ(ة)</th>
              <th scope="col">الإسم الكامل</th>
              <th scope="col">إسم المستخدم</th>
              <th scope="col">يدرس</th>
              <th scope="col">المادة</th>
              <th scope="col">إجراء</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr>
              <th scope="row">1</th>
              <td>oussama oulaydi</td>
              <td>oulaydi</td>
              <td>ثانوي</td>
              <td>الرياضيات (Mathematics)</td>
              <td>
                <button type="button" class="btn btn-outline-danger" id="text-light"><a class="fw-semibold text-decoration-none link-danger" href="remove-prof.php">حذف</a></button>
                <button type="button" class="btn btn-outline-warning"><a  class="fw-semibold text-decoration-none link-warning" href="manage-prof.php">تحديث</a></button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>oum el hanae aghlamenhoum</td>
              <td>aghla_oum</td>
              <td>إعدادي</td>
              <td>الرياضيات (Mathematics)</td>
              <td>
                <button type="button" class="btn btn-outline-danger"><a  class="fw-semibold text-decoration-none link-danger" href="remove-prof.php">حذف</a></button>
                <button type="button" class="btn btn-outline-warning"><a  class="fw-semibold text-decoration-none link-warning" href="manage-prof.php">تحديث</a></button>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Nejwa aghlamenhoum</td>
              <td>Nejwa_aghla</td>
              <td>ثانوي</td>
              <td>الرياضيات (Mathematics)</td>
              <td>
                <button type="button" class="btn btn-outline-danger"><a  class="fw-semibold text-decoration-none link-danger" href="remove-prof.php">حذف</a></button>
                <button type="button" class="btn btn-outline-warning"><a  class="fw-semibold text-decoration-none link-warning" href="manage-prof.php">تحديث</a></button>
              </td>
            </tr>
          </tbody>
        </table>
    <footer>
      <p><i><a href="https://github.com/oulaydi" target="_blank">OUALDYI</a></i> &copy; 2023 .جميع الحقوق محفوظة</p>
    </footer>

    <script>
      const successContainer = document.querySelector('#success-container');

      // Check if the success message is present and then schedule it to disappear after 5 seconds
      if (successContainer) {
          setTimeout(() => {
              successContainer.style.display = 'none';
          }, 5000);
      }
    </script>
</body>
</html>