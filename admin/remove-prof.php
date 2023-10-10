<?php 

    include('../config/constants.php');

    // get the id if the admin li bina removiwh

    $id = $_GET['id_prof'];

    //Create a SQL Query to delete admin

    $sql = "DELETE FROM table_profs WHERE id_prof=$id";

    // Execute the Query 

    $result = mysqli_query($cnx, $sql);

    //check the Query if successfully executed or not

    if($result == true){
        header("Location: ". URL ."admin/admin-panel.php?success=تم حذف الاستاذ(ة) بنجاح");
        exit();
    }
    else
    {
        echo '<p id="error-container">! لا يوجد اي أساتذة</p>';
    }

    //Redirect to manage admin page with a message
?>

<script>
      const errorContainer = document.querySelector('#error-container');

      // Check if the success message is present and then schedule it to disappear after 5 seconds
      if (errorContainer) {
          setTimeout(() => {
              errorContainer.style.display = 'none';
          }, 4000);
      }
    </script>