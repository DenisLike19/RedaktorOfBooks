document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.getElementById("sidebar");
    const closeSidebarButton = document.getElementById("closeSidebar");
    const toggleSidebarButton = document.createElement("button");

    // Создаем кнопку для открытия бокового окна
    toggleSidebarButton.innerText = "☰"; // Символ для значка меню
    toggleSidebarButton.style.position = "absolute";
    toggleSidebarButton.style.top = "10px";
    toggleSidebarButton.style.left = "10px";
    toggleSidebarButton.classList.add("btn", "btn-primary");

    document.body.appendChild(toggleSidebarButton);

    toggleSidebarButton.addEventListener("click", function() {
        sidebar.classList.toggle("open");
    });

    closeSidebarButton.addEventListener("click", function() {
        sidebar.classList.remove("open");
    });
});
$(document).ready(function() {
    $('#toggleSidebars').click(function() {
        $('#leftSidebar').toggle();
        $('#rightSidebar').toggle();
    });

    $('#closeLeftSidebar').click(function() {
        $('#leftSidebar').hide();
    });

    $('#closeRightSidebar').click(function() {
        $('#rightSidebar').hide();
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('#sidebar ul li a');
  
    sidebarLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageNumber = parseInt(link.dataset.page) - 1; // Индексация с 0
        const pageFlip = StPageFlip.getInstance();
        pageFlip.flip(pageNumber);
      });
    });
  });
