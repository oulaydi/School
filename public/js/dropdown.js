/* Students - Drop Down */

// Get all the dropdown data
const dropdowns = document.querySelectorAll(".dropdown");

// Loop through all elements
dropdowns.forEach(dropdown => {
  const select = dropdown.querySelector(".select");
  const caret = dropdown.querySelector(".caret");
  const menu = dropdown.querySelector(".menu");
  const options = dropdown.querySelectorAll(".menu li");
  const selected = dropdown.querySelector(".selected");

  select.addEventListener("click", () => {
    select.classList.toggle("select-clicked");
    caret.classList.toggle("caret-rotate"); // Corrected class name
    menu.classList.toggle("menu-open");
  });

  options.forEach(option => {
    option.addEventListener("click", () => {
      selected.innerText = option.innerText; // Corrected property name
      select.classList.remove("select-clicked");
      caret.classList.remove("caret-rotate"); // Corrected class name
      menu.classList.remove("menu-open");

      options.forEach(option => {
        option.classList.remove("active");
      });

      option.classList.add("active");
    });
  });
});