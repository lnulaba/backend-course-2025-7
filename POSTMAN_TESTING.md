# Postman Testing Guide для Lab 7

## Імпорт колекції

### Метод 1: Через Swagger
1. Відкрийте http://localhost:3000/api-docs в браузері
2. Натисніть на посилання "Download OpenAPI specification"
3. У Postman: File → Import → Upload файл

### Метод 2: Ручне створення запитів

## Тестові запити

### 1. Health Check
```
GET http://localhost:3000/health
```
**Очікуваний результат:** 
```json
{
  "status": "OK",
  "database": "connected",
  "timestamp": "..."
}
```

### 2. Отримати всіх користувачів
```
GET http://localhost:3000/api/users
```
**Очікуваний результат:** Масив користувачів

### 3. Отримати користувача за ID
```
GET http://localhost:3000/api/users/1
```
**Очікуваний результат:** Об'єкт користувача з ID 1

### 4. Створити нового користувача
```
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "Postman User",
  "email": "postman@example.com"
}
```
**Очікуваний результат:** Створений користувач з новим ID

### 5. Оновити користувача
```
PUT http://localhost:3000/api/users/1
Content-Type: application/json

{
  "name": "Updated Name"
}
```
**Очікуваний результат:** Оновлений користувач

### 6. Видалити користувача
```
DELETE http://localhost:3000/api/users/4
```
**Очікуваний результат:** Підтвердження видалення

### 7. Отримати всі елементи
```
GET http://localhost:3000/api/items
```
**Очікуваний результат:** Масив елементів з іменами користувачів

### 8. Створити новий елемент
```
POST http://localhost:3000/api/items
Content-Type: application/json

{
  "title": "Postman Item",
  "description": "Created via Postman",
  "user_id": 1
}
```
**Очікуваний результат:** Створений елемент

### 9. Оновити елемент
```
PUT http://localhost:3000/api/items/1
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description"
}
```
**Очікуваний результат:** Оновлений елемент

### 10. Видалити елемент
```
DELETE http://localhost:3000/api/items/4
```
**Очікуваний результат:** Підтвердження видалення

## Тестування помилок

### 11. Неіснуючий користувач
```
GET http://localhost:3000/api/users/999
```
**Очікуваний результат:** 404 Not Found

### 12. Невалідні дані
```
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "Only Name"
}
```
**Очікуваний результат:** 400 Bad Request (відсутній email)

### 13. Дублікат email
```
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "Duplicate",
  "email": "john@example.com"
}
```
**Очікуваний результат:** 400 Bad Request (email already exists)

### 14. Неіснуючий маршрут
```
GET http://localhost:3000/api/nonexistent
```
**Очікуваний результат:** 404 Not Found

## Автоматизація в Postman

### Pre-request Script
Додайте в колекцію:
```javascript
// Генерація унікального email
pm.environment.set("randomEmail", `user${Date.now()}@example.com`);
```

### Tests
Додайте в кожен запит:

```javascript
// Перевірка статус коду
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Перевірка наявності поля success
pm.test("Response has success field", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('success');
});

// Перевірка типу даних
pm.test("Data is present", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.exist;
});
```

## Runner для масового тестування

1. У Postman створіть колекцію з усіма запитами
2. Натисніть "Runner"
3. Виберіть колекцію
4. Встановіть порядок виконання
5. Запустіть тести

## Змінні оточення

Створіть Environment у Postman:
```
BASE_URL: http://localhost:3000
USER_ID: 1
ITEM_ID: 1
```

Використовуйте у запитах:
```
{{BASE_URL}}/api/users/{{USER_ID}}
```
