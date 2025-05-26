let db;

async function initDatabase() {
    const SQL = await initSqlJs({ locateFile: filename => `libs/${filename}` });

    const storedDb = localStorage.getItem('myDatabase');
    if (storedDb) {
        const data = new Uint8Array(JSON.parse(storedDb));
        db = new SQL.Database(data);
    } else {
        db = new SQL.Database();
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        );`);
    }
}

function saveDatabase() {
    const data = db.export();
    localStorage.setItem('myDatabase', JSON.stringify(Array.from(data)));
}

function registerUser (username, password) {
    const hashedPassword = btoa(password); // Простой способ хеширования (не безопасно для продакшена)

    try {
        db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword]);
        saveDatabase(); // Сохраняем базу данных после регистрации
        document.getElementById('message').innerText = "Пользователь зарегистрирован";
    } catch (e) {
        document.getElementById('message').innerText = "Ошибка регистрации: " + e.message;
    }
}

function loginUser (username, password) {
    const hashedPassword = btoa(password); // Хеширование пароля

    const stmt = db.prepare(`SELECT * FROM users WHERE username = ? AND password = ?`);
    stmt.bind([username, hashedPassword]);

    if (stmt.step()) {
        const user = stmt.getAsObject();
        document.getElementById('message').innerText = "Авторизация успешна: " + user.username;
        
        // Перенаправление на editor.html
        window.location.href = "editor.html"; // Перенаправление на страницу редактора
        return true; // Успешная авторизация
    } else {
        document.getElementById('message').innerText = "Неверный логин или пароль";
        return false; // Неуспешная авторизация
    }
}

function changePassword(username, oldPassword, newPassword) {
    const hashedOldPassword = btoa(oldPassword);
    const hashedNewPassword = btoa(newPassword);

    const stmt = db.prepare(`SELECT * FROM users WHERE username = ? AND password = ?`);
    stmt.bind([username, hashedOldPassword]);

    if (stmt.step()) {
        db.run(`UPDATE users SET password = ? WHERE username = ?`, [hashedNewPassword, username]);
        saveDatabase(); // Сохраняем базу данных после смены пароля
        document.getElementById('message').innerText = "Пароль успешно изменен";
    } else {
        document.getElementById('message').innerText = "Старый пароль неверен";
    }
}

// Обработчики событий для форм
window.onload = function() {
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;
        registerUser (username, password);
    });

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value; // Исправлено
        const password = document.getElementById('loginPassword').value; // Исправлено
        loginUser (username, password);
    });

    document.getElementById('changePasswordForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('changeUsername').value;
        const oldPassword = document.getElementById('oldPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        changePassword(username, oldPassword, newPassword);
    });

    // Инициализация базы данных
    initDatabase();
};
