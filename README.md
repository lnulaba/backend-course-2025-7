# Лабораторна робота №7: Docker та Бази Даних

**Автор:** Marta Stakhurska  
**Email:** Stakhurska.Marta@gmail.com  
**Репозиторій:** https://github.com/lnulaba/backend-course-2025-7

## Опис проекту

Веб-додаток для управління інвентарем з можливістю завантаження фото товарів. Використовує Docker, PostgreSQL, Express.js та сучасні веб-технології.

## Функціональність

- 📝 Реєстрація товарів з фото
- 🔍 Пошук та перегляд товарів
- ✏️ Редагування товарів
- 🗑️ Видалення товарів
- 📷 Завантаження та зберігання фото
- 🎨 Сучасний веб-інтерфейс
- 🐳 Docker контейнеризація
- 🔥 Hot reload для розробки
- 🐛 Debugging підтримка

## Технології

- **Backend:** Node.js + Express.js (ES6 модулі)
- **Database:** PostgreSQL 15
- **File Upload:** Multer
- **CLI:** Commander.js
- **Containerization:** Docker + Docker Compose
- **Dev Tools:** nodemon, dotenv

## Структура проекту

```
.
├── db/
│   └── init.sql              # SQL скрипт ініціалізації БД
├── public/
│   ├── register.html         # Форма реєстрації товару
│   └── search.html           # Сторінка пошуку та управління
├── uploads/                  # Завантажені фото (автоматично створюється)
├── .env                      # Змінні середовища (не в git)
├── .env.sample               # Шаблон змінних середовища
├── .dockerignore             # Виключення для Docker
├── .gitignore                # Виключення для Git
├── compose.yml               # Docker Compose конфігурація
├── Dockerfile                # Docker образ
├── main.js                   # Головний файл додатку
├── nodemon.json              # Налаштування nodemon
├── package.json              # Залежності Node.js
└── README.md                 # Цей файл
```

## Встановлення та запуск

### 1. Клонування репозиторію

```bash
git clone https://github.com/lnulaba/backend-course-2025-7.git
cd backend-course-2025-7
```

### 2. Налаштування змінних середовища

Створіть файл `.env`:

```bash
cp .env.sample .env
```

### 3. Запуск через Docker Compose

```bash
# Збірка та запуск контейнерів
docker compose up --build

# Запуск в фоновому режимі
docker compose up -d
```

### 4. Ініціалізація бази даних (якщо потрібно)

```bash
docker exec -i postgres-db psql -U myuser -d mydb < db/init.sql
```

### 5. Відкрийте браузер

- 🏠 **Головна:** http://localhost:3000
- 📝 **Реєстрація товару:** http://localhost:3000/register.html
- 🔍 **Пошук товарів:** http://localhost:3000/search.html
- ❤️ **Health Check:** http://localhost:3000/health

## API Endpoints

### Товари (Inventory)

- `POST /register` - Реєстрація нового товару (з фото)
- `GET /inventory` - Отримати всі товари
- `GET /inventory/:id` - Отримати товар за ID
- `PUT /inventory/:id` - Оновити товар
- `DELETE /inventory/:id` - Видалити товар
- `POST /inventory/:id/photo` - Завантажити фото для існуючого товару

### Інше

- `GET /` - Головна сторінка
- `GET /health` - Перевірка стану сервера

## Приклади використання API

### Реєстрація товару

```bash
curl -X POST http://localhost:3000/register \
  -F "name=Ноутбук HP" \
  -F "description=Новий ноутбук" \
  -F "quantity=5" \
  -F "price=30000" \
  -F "photo=@/path/to/photo.jpg"
```

### Отримати всі товари

```bash
curl http://localhost:3000/inventory
```

### Оновити товар

```bash
curl -X PUT http://localhost:3000/inventory/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Новий ноутбук HP","price":28000}'
```

### Видалити товар

```bash
curl -X DELETE http://localhost:3000/inventory/1
```

## CLI аргументи

Додаток підтримує CLI аргументи через Commander.js:

```bash
node main.js --help
node main.js --host 0.0.0.0 --port 8080 --cache 60
```

## Debugging

Додаток запускається з прапорцем `--inspect`, що дозволяє підключитися через Chrome DevTools:

1. Відкрийте Chrome: `chrome://inspect`
2. Натисніть "Configure" та додайте `localhost:9229`
3. Підключіться до Node.js процесу

## Зупинка

```bash
# Зупинити контейнери
docker compose down

# Зупинити та видалити volumes (включаючи БД)
docker compose down -v
```

## Логи

```bash
# Переглянути логи всіх сервісів
docker compose logs

# Логи конкретного сервісу
docker compose logs app
docker compose logs postgres

# Слідкувати за логами в реальному часі
docker compose logs -f
```

## База даних

### Структура таблиці `inventory`

```sql
CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INTEGER DEFAULT 0,
    price DECIMAL(10, 2) DEFAULT 0,
    photo VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Доступ до PostgreSQL

```bash
# Підключення до бази даних
docker exec -it postgres-db psql -U myuser -d mydb

# Перегляд таблиць
docker exec postgres-db psql -U myuser -d mydb -c "\dt"

# Перегляд даних
docker exec postgres-db psql -U myuser -d mydb -c "SELECT * FROM inventory;"
```

## Змінні середовища

```env
# Application
PORT=3000
NODE_ENV=development
HOST=0.0.0.0

# Database
DB_HOST=postgres
DB_PORT=5432
DB_USER=myuser
DB_PASSWORD=mypassword
DB_NAME=mydb
```

## Особливості проекту

1. **ES6 Modules** - використання `import/export` замість `require`
2. **Monolithic structure** - весь код в одному файлі `main.js`
3. **File uploads** - Multer для завантаження фото (до 5MB)
4. **Commander.js** - підтримка CLI аргументів
5. **Hot reload** - nodemon відстежує зміни в `main.js` та `public/`
6. **Docker volumes** - збереження даних БД та зображень
7. **Graceful shutdown** - коректне закриття з'єднань

## Автор

**Marta Stakhurska**  
Email: Stakhurska.Marta@gmail.com  
GitHub: [@lnulaba](https://github.com/lnulaba)

## Ліцензія

ISC
