let scale = 1; // Начальный масштаб
let isDragging = false; // Флаг для отслеживания состояния перетаскивания
let startX, startY; // Начальные координаты мыши
let scrollLeft, scrollTop; // Начальные координаты прокрутки
let zoomMode = false; // Флаг для отслеживания режима масштабирования
let offsetX = 0; // Смещение по оси X
let offsetY = 0; // Смещение по оси Y

const zoomInButton = document.getElementById('zoomIn');
const zoomOutButton = document.getElementById('zoomOut');
const toggleZoomButton = document.getElementById('toggleZoom'); // Кнопка для переключения режима
const images = document.querySelectorAll('.page-image');

zoomInButton.addEventListener('click', () => {
    if (zoomMode) {
        scale += 0.1; // Увеличиваем масштаб
        updateImageScale();
    }
});

zoomOutButton.addEventListener('click', () => {
    if (zoomMode) {
        scale = Math.max(scale - 0.1, 0.1); // Уменьшаем масштаб, не позволяя ему быть меньше 0.1
        updateImageScale();
    }
});

// Функция для обновления масштаба изображения
function updateImageScale() {
    images.forEach(image => {
        image.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`; // Применяем масштаб и смещение
        image.style.transformOrigin = "top left"; // Устанавливаем точку отсчета для трансформации
    });
}

// Переключение режима масштабирования
toggleZoomButton.addEventListener('click', () => {
    zoomMode = !zoomMode; // Переключаем режим
    if (zoomMode) {
        toggleZoomButton.textContent = "Выключить режим масштабирования"; // Меняем текст кнопки
        images.forEach(image => {
            image.style.cursor = "grab"; // Устанавливаем курсор для перетаскивания
        });
        // Отключаем прокрутку страницы
        document.body.style.overflow = 'hidden';
    } else {
        toggleZoomButton.textContent = "Включить режим масштабирования"; // Меняем текст кнопки
        images.forEach(image => {
            image.style.cursor = "default"; // Убираем курсор для перетаскивания
        });
    }
});

// Обработка перетаскивания изображения
images.forEach(image => {
    image.addEventListener('mousedown', (e) => {
        if (!zoomMode) return; // Прекращаем выполнение, если режим масштабирования не активен
        isDragging = true;
        startX = e.pageX - offsetX; // Начальная позиция с учетом смещения
        startY = e.pageY - offsetY; // Начальная позиция с учетом смещения
    });

    image.addEventListener('mouseup', () => {
        isDragging = false;
    });

    image.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    image.addEventListener('mousemove', (e) => {
        if (!isDragging || !zoomMode) return; // Прекращаем выполнение, если не перетаскиваем или режим масштабирования не активен
        e.preventDefault();
        const x = e.pageX;
        const y = e.pageY;
        const walkX = (x - startX); // Скорость перемещения по оси X
        const walkY = (y - startY); // Скорость перемещения по оси Y
        
        offsetX += walkX; // Обновляем смещение по оси X
        offsetY += walkY; // Обновляем смещение по оси Y
        
        startX = x; // Обновляем начальную позицию
        startY = y; // Обновляем начальную позицию

        updateImageScale(); // Обновляем масштаб и смещение изображения
    });
});

// Добавляем обработчик события для колесика мыши
window.addEventListener('wheel', (e) => {
    if (zoomMode) { // Проверяем, активен ли режим масштабирования
        e.preventDefault(); // Предотвращаем прокрутку страницы
        if (e.deltaY < 0) {
            // Если прокрутка вверх, увеличиваем масштаб
            scale += 0.1;
        } else {
            // Если прокрутка вниз, уменьшаем масштаб
            scale = Math.max(scale - 0.1, 0.1); // Не допускаем уменьшения масштаба меньше 0.1
        }
        updateImageScale(); // Обновляем масштаб изображения
    }
});

