class App {
    constructor() {
        this.zoomMode = false; // Флаг для режима масштабирования
    }
    setZoomMode(mode) {
        this.zoomMode = mode;
        if (this.zoomMode) {
            this.disableOtherScripts();
        } else {
            this.enableOtherScripts();
        }
    }
    disableOtherScripts() {
        const scripts = document.getElementsByTagName('script');
        for (let i = scripts.length - 1; i >= 0; i--) {
            const script = scripts[i];
            // Проверяем, не является ли это скриптом StPageFlip.js
            if (!script.src.includes('StPageFlip.js')) {
                script.parentNode.removeChild(script); // Удаляем скрипт
            }
        }
        console.log("Другие скрипты отключены");
    }
    enableOtherScripts() {
        // Восстановление скриптов не так просто, как их удаление.
        // Если у вас есть ссылки на скрипты, которые были отключены, вы можете снова их добавить.
        // Здесь можно реализовать логику для повторной загрузки скриптов.
        console.log("Другие скрипты включены (не реализовано)");
    }
    isZoomMode() {
        return this.zoomMode;
    }
}
// Пример использования
const myApp = new App();
// Включение режима масштабирования
myApp.setZoomMode(true);
// Проверка состояния
if (!myApp.isZoomMode()) {
    // Выполнение других скриптов
    console.log("Выполнение других скриптов");
}
// Выключение режима масштабирования
myApp.setZoomMode(false);
