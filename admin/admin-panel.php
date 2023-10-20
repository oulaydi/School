<?php include('../config/constants.php'); ?>

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
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <title>الرئيسية - لوحة القيادة</title>
  </head>
<body>
    <div class="logo">
      <img class="LogoMenAr" src="../images/LogoMenAr.png" alt="LogoMenAr"/>
    </div>
    <div class="container" id="header">
      <div>
          <h3>الفضاء الخاص بالإدارة</h3>
          </div>
          <div class="container" id="add-rem">
            <button class="btn" title="تسجيل الخروج"><a href="logout.php" style="color: #6c757d;"><i id="bi-icon2" class="bi bi-box-arrow-left fw-bold"></i></a></button>
            <button class="btn btn-primary my-5"><a href="add-prof.php" class="text-light">إضافة استاذ(ة) <i id="bi-icon" class="bi bi-plus fw-bold"></i></a></button>
          </div>
        </div>
        <?php unset($_SESSION['form_data']); ?>
        <?php if (isset($_GET['success'])) { ?>
                <p id="success-container" class="success" dir="rtl">
                <?php echo $_GET['success']; ?></p>
        <?php } ?>
        <?php if (isset($_GET['error'])) { ?>
                  <p id="error-container" class="error" dir="rtl">
                  <?php echo $_GET['error']; ?></p>
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

          <?php
                //Query to get all admins
                $sql = "SELECT * FROM table_profs";
                // Execute the Query 
                $result = mysqli_query($cnx, $sql);

                if ($result == true)
                {
                    $rows = mysqli_num_rows($result); //functions that gets all rows from db
                    if ($rows > 0)
                    {
                      // we hava data
                          while($rows = mysqli_fetch_assoc($result))
                          {
                              $id = $rows['id_prof'];
                              $cin = $rows['CIN'];
                              $full_name = $rows['full_name'];
                              $username = $rows['username'];
                              $level = $rows['niveau'];
                              $subject = $rows['matiere'];

                              //Dispalying the values
                              ?>
                              
                              <tbody class="table-group-divider">
                                <tr class="text-center">
                                  <td><?php echo $cin; ?></td>
                                  <td><?php echo $full_name; ?></td>
                                  <td><?php echo $username; ?></td>
                                  <td><?php echo $level; ?></td>
                                  <td><?php echo $subject; ?></td>
                                  <td>
                                      <button type="button" class="btn btn-warning"><a class="fw-semibold text-decoration-none link-light py-3" href="<?php echo URL; ?>admin/manage-prof.php?id_prof=<?php echo $id; ?>">تحديث</a></button>
                                      <button type="button" class="btn btn-danger"><a class="fw-semibold text-decoration-none link-light py-3" href="<?php echo URL; ?>admin/remove-prof.php?id_prof=<?php echo $id; ?>">حذف</a></button>
                                  </td>
                                </tr>
                              </tbody>

                              <?php
                          }
                    }
                    else
                    {
                        echo '<p id="error-container">! لا يوجد اي أساتذة</p>';                      
                    }
                
                }
            ?>
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
          }, 4000);
      }
    </script>
</body>
</html>