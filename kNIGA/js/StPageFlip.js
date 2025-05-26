document.addEventListener('DOMContentLoaded', function () {
    const pageFlip = new PageFlip(
        document.getElementById("demoBookExample"),
        {
            width: 550, // base page width
            height: 790, // base page height
            size: "stretch",
            minWidth: 315,
            maxWidth: 1000,
            minHeight: 420,
            maxHeight: 1550,
            maxShadowOpacity: 0.5, // Half shadow intensity
            showCover: true,
            mobileScrollSupport: false // disable content scrolling on mobile devices
        }
    );

    // Загрузка страниц
    pageFlip.loadFromHTML(document.querySelectorAll(".page"));
    document.querySelector(".page-total").innerText = pageFlip.getPageCount();
    document.querySelector(".page-orientation").innerText = pageFlip.getOrientation();

    // Обработчики событий для кнопок "Назад" и "Вперед"
    document.querySelector(".btn-prev").addEventListener("click", () => {
        pageFlip.flipPrev(); // Переход на предыдущую страницу
    });
    document.querySelector(".btn-next").addEventListener("click", () => {
        pageFlip.flipNext(); // Переход на следующую страницу
    });

    // Обработчик события перелистывания страницы
    pageFlip.on("flip", (e) => {
        document.querySelector(".page-current").innerText = e.data + 1;
    });

    // Обработчик изменения состояния книги
    pageFlip.on("changeState", (e) => {
        document.querySelector(".page-state").innerText = e.data;
    });

    // Обработчик изменения ориентации книги
    pageFlip.on("changeOrientation", (e) => {
        document.querySelector(".page-orientation").innerText = e.data;
    });

    // Обработчик колесика мыши для перелистывания страниц
    document.getElementById("demoBookExample").addEventListener("wheel", (event) => {
        if (!zoomMode) { // Проверяем, активен ли режим масштабирования
            event.preventDefault(); // Отключаем стандартное поведение прокрутки
            if (event.deltaY < 0) {
                pageFlip.flipPrev(); // Прокрутка вверх — предыдущая страница
            } else {
                pageFlip.flipNext(); // Прокрутка вниз — следующая страница
            }
        }
    });

    // Обработчик клавиатуры для перелистывания страниц
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            pageFlip.flipPrev(); // Переход на предыдущую страницу
        } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            pageFlip.flipNext(); // Переход на следующую страницу
        }
    });

    // Обработчик переключения режима масштабирования
    let zoomMode = false; // Флаг режима масштабирования
    const toggleZoomButton = document.getElementById('toggleZoom'); // Кнопка переключения режима
    toggleZoomButton.addEventListener('click', () => {
        zoomMode = !zoomMode; // Переключаем режим
        if (zoomMode) {
            toggleZoomButton.textContent = "Выключить режим масштабирования"; // Обновляем текст кнопки
            document.body.style.overflow = 'hidden'; // Отключаем прокрутку страницы
        } else {
            toggleZoomButton.textContent = "Включить режим масштабирования"; // Обновляем текст кнопки
            document.body.style.overflow = 'auto'; // Включаем прокрутку страницы
        }
    });

    // Обработчик колесика мыши для изменения масштаба
    window.addEventListener('wheel', (e) => {
        if (zoomMode) { // Проверяем, активен ли режим масштабирования
            e.preventDefault(); // Отключаем стандартное поведение прокрутки
            // Логика изменения масштаба (добавьте свою реализацию)
            if (e.deltaY < 0) {
                // Увеличиваем масштаб
            } else {
                // Уменьшаем масштаб
            }
        }
    });

    // Обработчики событий для ссылок в сайдбаре
    const sidebarLinks = document.querySelectorAll('#sidebar ul li a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Отключаем стандартное поведение ссылки
            const pageNumber = parseInt(link.dataset.page) - 1; // Получаем номер страницы (индексация с 0)
            pageFlip.flip(pageNumber); // Переходим на нужную страницу
        });
    });
});
