$(document).ready(function() {
    // Количество страниц
    const totalPages = $('.page').length;
    $('#searchButton').on('click', function() {
        const pageNumber = parseInt($('#searchInput').val());
        
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            // Перейти к указанной странице
            $('.page').hide(); // Скрыть все страницы
            $('.page').eq(pageNumber - 1).show(); // Показать только нужную страницу
            
            // Обновить текущую страницу
            $('.page-current').text(pageNumber);
        } else {
            alert('Пожалуйста, введите действительный номер страницы (от 1 до ' + totalPages + ').');
        }
    });
});