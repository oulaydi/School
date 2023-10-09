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
      <div class="container my-5" dir="rtl">
          <form autocomplete="off">
            <div class="mb-3">
              <label class="form-label cus-label" >الإسم الكامل </label><span> :</span>
              <input type="full-name" placeholder="اسم و نسب الاستاذ(ة)" id="input-field" class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label cus-label">إسم المستخدم </label><span> :</span>
              <input type="username" placeholder="ادخل اسم المستخدم الخاص" id="input-field" class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label cus-label">كلمة المرور </label><span> :</span>
              <input type="password" placeholder="ادخل كلمة المرور" id="input-field" class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label cus-label">المستوى </label><span> :</span>
              <select class="form-select" aria-label="Default select example" id="input-field">
                <option selected value="1">إعدادي</option>
                <option value="2">ثانوي</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label cus-label">المادة</label><span> :</span>
              <select class="form-select" aria-label="Default select example" id="input-field">
                <option selected value="1">اللغة العربية (Arabic Language)</option>
                <option value="2">اللغة الفرنسية (French Language)</option>
                <option value="3">اللغة الإنجليزية (English Language)</option>
                <option value="4">اللغة الإسبانية (Spanish Language)</option>
                <option value="5">اللغة الألمانية (German Language)</option>
                <option value="6">الرياضيات (Mathematics)</option>
                <option value="7">الفيزياء (Physics)</option>
                <option value="8">الكيمياء (Chemistry)</option>
                <option value="9">الأحياء (Biology)</option>
                <option value="10">الجغرافيا (Geography)</option>
                <option value="11">التربية الإسلامية (Islamic Education)</option>
                <option value="12">الفلسفة (Philosophy)</option>
              </select>
            </div>
            <div class="mb-3 custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="customCheck1">
                <label class="custom-control-label" for="customCheck1">اشهد على صحة المعلومات المصرح بها</label>
            </div>
            <button type="submit" class="btn btn-primary"><span> +</span>إضافة</button>
          </form>
      </div>
    </div>
    <footer>
      <p><i><a href="https://github.com/oulaydi" target="_blank">OUALDYI</a></i> &copy; 2023 .جميع الحقوق محفوظة</p>
    </footer>
</body>
</html>