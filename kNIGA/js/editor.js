document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы
    const toggleButton = document.getElementById('toggleSidebars');
    const leftSidebar = document.getElementById('leftSidebar');
    const rightSidebar = document.getElementById('rightSidebar');
    const closeLeftButton = document.getElementById('closeLeftSidebar');
    const closeRightButton = document.getElementById('closeRightSidebar');

    // Функция для открытия/закрытия сайдбаров
    toggleButton.onclick = function() {
        // Проверяем текущее состояние сайдбаров
        if (leftSidebar.style.display === 'none' && rightSidebar.style.display === 'none') {
            leftSidebar.style.display = 'block';  // Открываем левый сайдбар
            rightSidebar.style.display = 'block'; // Открываем правый сайдбар
        } else {
            leftSidebar.style.display = 'none';   // Закрываем левый сайдбар
            rightSidebar.style.display = 'none';  // Закрываем правый сайдбар
        }
    };

    // Закрытие левого сайдбара
    closeLeftButton.onclick = function() {
        leftSidebar.style.display = 'none';
    };

    // Закрытие правого сайдбара
    closeRightButton.onclick = function() {
        rightSidebar.style.display = 'none';
    };
});
