# Лабораторна робота №7: Docker та Бази Даних

**Автор:** Marta Stakhurska  
**Email:** Stakhurska.Marta@gmail.com  
**Курс:** Backend Course 2025

## Опис проекту

Веб-сервіс на Express.js з використанням Docker та PostgreSQL бази даних.

## Функціональність

- RESTful API для управління користувачами (Users) та елементами (Items)
- Інтеграція з PostgreSQL базою даних
- Docker контейнеризація
- Swagger документація API
- Hot reload з nodemon
- Debugging через Chrome DevTools

## Технології

- Node.js + Express.js
- PostgreSQL
- Docker & Docker Compose
- Swagger/OpenAPI
- nodemon
- dotenv

## Встановлення та запуск

### 1. Клонування репозиторію

```bash
git clone <repository-url>
cd backend-course-2025-7
```

### 2. Налаштування змінних середовища

Створіть файл `.env` на основі `.env.sample`:

```bash
cp .env.sample .env
```

Відредагуйте `.env` файл з вашими налаштуваннями:

```env
PORT=3000
NODE_ENV=development
DB_HOST=postgres
DB_PORT=5432
DB_USER=myuser
DB_PASSWORD=mypassword
DB_NAME=mydb
```

### 3. Запуск з Docker

```bash
# Збудувати та запустити контейнери
docker compose up --build

# Запуск у фоновому режимі
docker compose up -d

# Зупинка контейнерів
docker compose down
```

### 4. Запуск локально (без Docker)

```bash
# Встановити залежності
npm install

# Запуск з nodemon
npm run dev

# Запуск з debugging
npm run debug
```

## API Endpoints

### Users

- `GET /api/users` - Отримати всіх користувачів
- `GET /api/users/:id` - Отримати користувача за ID
- `POST /api/users` - Створити нового користувача
- `PUT /api/users/:id` - Оновити користувача
- `DELETE /api/users/:id` - Видалити користувача

### Items

- `GET /api/items` - Отримати всі елементи
- `GET /api/items/:id` - Отримати елемент за ID
- `POST /api/items` - Створити новий елемент
- `PUT /api/items/:id` - Оновити елемент
- `DELETE /api/items/:id` - Видалити елемент

### Інші

- `GET /` - Головна сторінка з інформацією про API
- `GET /health` - Перевірка стану сервера та бази даних
- `GET /api-docs` - Swagger документація

## Debugging

### Chrome DevTools

1. Запустіть проект з Docker Compose
2. Відкрийте Chrome і перейдіть на `chrome://inspect`
3. Натисніть "Configure" і додайте `localhost:9229`
4. Клікніть "inspect" біля вашого процесу Node.js
5. Встановлюйте breakpoints та відлагоджуйте код

### VS Code

Додайте конфігурацію у `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Docker: Attach to Node",
      "port": 9229,
      "address": "localhost",
      "localRoot": "${workspaceFolder}/src",
      "remoteRoot": "/app/src",
      "protocol": "inspector"
    }
  ]
}
```

## Тестування з Postman

1. Імпортуйте Swagger документацію: `http://localhost:3000/api-docs`
2. Або створіть запити вручну для кожного endpoint
3. Переконайтесь, що всі CRUD операції працюють коректно

## Структура проекту

```
.
├── src/
│   ├── config/
│   │   ├── database.js      # Конфігурація PostgreSQL
│   │   └── swagger.js       # Конфігурація Swagger
│   ├── middleware/
│   │   ├── errorHandler.js  # Обробка помилок
│   │   └── logger.js        # Логування запитів
│   ├── routes/
│   │   ├── users.js         # Маршрути користувачів
│   │   └── items.js         # Маршрути елементів
│   └── index.js             # Головний файл
├── db/
│   └── init.sql             # Скрипт ініціалізації БД
├── Dockerfile               # Docker конфігурація
├── compose.yml              # Docker Compose конфігурація
├── package.json
├── .env.sample
├── .gitignore
└── README.md
```

## Git налаштування

```bash
# Встановити ім'я та email для коміту
git config user.name "Marta Stakhurska"
git config user.email "Stakhurska.Marta@gmail.com"

# Перший коміт
git add .
git commit -m "Initial commit: Lab 7 - Docker and Database"
git push origin main
```

## Перевірка виконання завдань

- ✅ Створено Dockerfile та compose.yml
- ✅ Додано PostgreSQL базу даних
- ✅ Створено скрипт ініціалізації БД
- ✅ Налаштовано dotenv для змінних середовища
- ✅ Створено .env.sample (не закомічено .env)
- ✅ Встановлено nodemon як dev dependency
- ✅ Налаштовано hot reload у Docker
- ✅ Додано debugging через --inspect
- ✅ Створено Swagger документацію
- ✅ Всі CRUD операції працюють коректно

## Автор

**Marta Stakhurska**  
Email: Stakhurska.Marta@gmail.com  
Курс: Backend Course 2025, Lab 7
