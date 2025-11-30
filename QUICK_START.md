# Quick Start Guide - Lab 7

## 🚀 Швидкий старт

### 1. Запуск проекту
```bash
# Клонування (якщо потрібно)
git clone <repository-url>
cd backend-course-2025-7

# Запуск з Docker
docker compose up -d

# Перегляд логів
docker compose logs -f app
```

### 2. Перевірка роботи
```bash
# Автоматичне тестування
./test-api.sh

# Або вручну
curl http://localhost:3000/health
```

### 3. Доступ до сервісів
- **API**: http://localhost:3000
- **Swagger Docs**: http://localhost:3000/api-docs
- **Health Check**: http://localhost:3000/health
- **PostgreSQL**: localhost:5433
- **Debugger**: chrome://inspect (port 9229)

## 📝 Основні команди

### Docker
```bash
# Запуск
docker compose up -d

# Зупинка
docker compose down

# Перезапуск
docker compose restart app

# Перебудова
docker compose up -d --build

# Логи
docker compose logs app --tail=50 -f

# Статус
docker compose ps
```

### База даних
```bash
# Підключення до PostgreSQL
docker compose exec postgres psql -U myuser -d mydb

# В psql:
\dt                    # Список таблиць
SELECT * FROM users;   # Вибрати всіх користувачів
SELECT * FROM items;   # Вибрати всі елементи
\q                     # Вихід
```

### Git
```bash
# Перевірка статусу
git status

# Додати зміни
git add .

# Коміт
git commit -m "Your message"

# Пуш
git push origin main
```

## 🧪 Тестування

### Швидке тестування через curl
```bash
# GET всіх користувачів
curl http://localhost:3000/api/users | jq

# POST новий користувач
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com"}' | jq

# GET конкретний користувач
curl http://localhost:3000/api/users/1 | jq

# PUT оновити користувача
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated"}' | jq

# DELETE видалити користувача
curl -X DELETE http://localhost:3000/api/users/4 | jq
```

### Postman
Дивіться [POSTMAN_TESTING.md](./POSTMAN_TESTING.md)

## 🐛 Debugging

### Chrome DevTools
1. Відкрити `chrome://inspect`
2. Configure: `localhost:9229`
3. Клікнути "inspect"

Детальніше в [DEBUGGING_GUIDE.md](./DEBUGGING_GUIDE.md)

### VS Code
1. F5 або Run → Start Debugging
2. Вибрати "Docker: Attach to Node"
3. Встановити breakpoints в коді

## 🔧 Troubleshooting

### Порт зайнятий
```bash
# Знайти процес на порту 3000
lsof -i :3000

# Або для PostgreSQL порту
lsof -i :5433

# Вбити процес
kill -9 <PID>
```

### Контейнери не запускаються
```bash
# Очистити все
docker compose down -v
docker system prune -a

# Перезапустити
docker compose up -d --build
```

### База даних недоступна
```bash
# Перевірити статус PostgreSQL
docker compose ps postgres

# Перезапустити БД
docker compose restart postgres

# Перевірити логи
docker compose logs postgres
```

### Hot reload не працює
```bash
# Перевірити volume в compose.yml
# Має бути:
# - ./src:/app/src

# Перезапустити з rebuild
docker compose up -d --build
```

## 📂 Структура проекту

```
.
├── src/
│   ├── config/
│   │   ├── database.js       # PostgreSQL конфігурація
│   │   └── swagger.js        # Swagger документація
│   ├── middleware/
│   │   ├── errorHandler.js   # Обробка помилок
│   │   └── logger.js         # Логування
│   ├── routes/
│   │   ├── users.js          # Users API
│   │   └── items.js          # Items API
│   └── index.js              # Головний файл
├── db/
│   └── init.sql              # Ініціалізація БД
├── .vscode/
│   ├── launch.json           # Debug конфігурація
│   └── extensions.json       # Рекомендовані розширення
├── Dockerfile                # Docker image
├── compose.yml               # Docker Compose
├── .env                      # Змінні середовища (не в git)
├── .env.sample               # Приклад .env
├── package.json              # NPM залежності
├── nodemon.json              # Nodemon конфігурація
└── README.md                 # Головна документація
```

## 🎯 Checklist виконання завдань

### Частина 2 - Docker + DB
- ✅ Створено Dockerfile
- ✅ Створено compose.yml
- ✅ Програма працює в Docker
- ✅ Встановлено nodemon як dev dependency
- ✅ Nodemon працює в Docker
- ✅ Додано PostgreSQL в compose.yml
- ✅ Створено скрипт ініціалізації БД (db/init.sql)
- ✅ Встановлено dotenv
- ✅ Налаштування в .env (не закомічено)
- ✅ Створено .env.sample

### Частина 3 - Відлагодження
- ✅ Nodemon встановлено як dev dependency
- ✅ Hot reload працює (зміни файлів перезапускають сервер)
- ✅ Всі API endpoints працюють
- ✅ Запуск з `node --inspect`
- ✅ Chrome DevTools debugger працює
- ✅ Можна ставити breakpoints

## 💡 Корисні посилання

- [Express.js Docs](https://expressjs.com/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Docker Docs](https://docs.docker.com/)
- [Node.js Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/)
- [Swagger/OpenAPI](https://swagger.io/specification/)

## 📧 Контакт

**Автор:** Marta Stakhurska  
**Email:** Stakhurska.Marta@gmail.com  
**Курс:** Backend Course 2025  
**Лабораторна:** №7 - Docker та Бази даних
