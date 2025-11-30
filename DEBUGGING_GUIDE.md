# Chrome DevTools Debugging Guide для Lab 7

## Налаштування Chrome DevTools

### Крок 1: Відкрийте Chrome Inspect

1. Відкрийте Google Chrome
2. Введіть в адресну строку: `chrome://inspect`
3. Ви побачите сторінку "Devices"

### Крок 2: Налаштування цілей (Targets)

1. Натисніть "Configure..." біля "Discover network targets"
2. Додайте: `localhost:9229`
3. Натисніть "Done"

### Крок 3: Підключення до Node.js процесу

1. Зачекайте кілька секунд
2. У розділі "Remote Target" ви побачите:
   ```
   file:///app/src/index.js
   ```
3. Натисніть "inspect" біля вашого процесу

## Використання Debugger

### Встановлення Breakpoints

1. У відкритому DevTools перейдіть на вкладку "Sources"
2. У лівій панелі знайдіть `src/index.js` або інші файли
3. Клікніть на номер рядка, щоб встановити breakpoint
4. Синя мітка означає активний breakpoint

### Рекомендовані місця для breakpoints

#### У файлі `src/index.js`:
- Рядок з `app.listen()` - початок запуску сервера
- Middleware функції

#### У файлі `src/routes/users.js`:
- Початок кожного route handler
- Наприклад, в `router.get('/', async (req, res, next) => {`
- Перед SQL запитами

#### У файлі `src/routes/items.js`:
- Аналогічно до users.js

### Тестування з Breakpoints

1. Встановіть breakpoint у обробнику GET запиту в `src/routes/users.js`
2. Виконайте запит:
   ```bash
   curl http://localhost:3000/api/users
   ```
3. Виконання зупиниться на breakpoint
4. Ви можете:
   - Переглянути змінні в правій панелі "Scope"
   - Виконати код крок за кроком (Step Over F10, Step Into F11)
   - Переглянути Call Stack
   - Виконати код в Console

### Інспектування змінних

1. Наведіть курсор на змінну в коді
2. Або використайте панель "Scope" → "Local"
3. Або введіть змінну в Console внизу

### Watch Expressions

1. У правій панелі знайдіть "Watch"
2. Натисніть "+"
3. Додайте вирази для відстеження:
   ```
   req.params
   req.body
   req.query
   result.rows
   ```

### Conditional Breakpoints

1. Клікніть правою кнопкою на breakpoint
2. Виберіть "Edit breakpoint..."
3. Введіть умову, наприклад:
   ```javascript
   req.params.id === '1'
   ```
4. Breakpoint спрацює тільки коли умова true

## Практичні сценарії

### Сценарій 1: Відлагодження GET /api/users

1. Відкрийте `src/routes/users.js`
2. Встановіть breakpoint на рядку з `pool.query`
3. Виконайте:
   ```bash
   curl http://localhost:3000/api/users
   ```
4. Коли виконання зупиниться:
   - Перевірте значення в Console: `result.rows`
   - Step Over (F10) для переходу до наступного рядка
   - Continue (F8) для продовження виконання

### Сценарій 2: Відлагодження POST /api/users

1. Встановіть breakpoint на початку POST handler
2. Виконайте:
   ```bash
   curl -X POST http://localhost:3000/api/users \
     -H "Content-Type: application/json" \
     -d '{"name":"Debug User","email":"debug@example.com"}'
   ```
3. Перевірте:
   - `req.body.name` в Console
   - `req.body.email` в Console
   - Прослідкуйте виконання до SQL запиту

### Сценарій 3: Відлагодження помилок

1. Встановіть breakpoint в `src/middleware/errorHandler.js`
2. Створіть помилку (наприклад, невалідний запит):
   ```bash
   curl -X POST http://localhost:3000/api/users \
     -H "Content-Type: application/json" \
     -d '{"name":"Only Name"}'
   ```
3. Перевірте об'єкт помилки `err`

## Корисні команди в Console

```javascript
// Перегляд всіх headers
req.headers

// Перегляд params
req.params

// Перегляд query parameters
req.query

// Перегляд body
req.body

// Результат з бази даних
result.rows

// Перший рядок результату
result.rows[0]
```

## Hot Reload з Debugger

1. Змініть код у файлі (наприклад, додайте console.log)
2. Збережіть файл
3. nodemon автоматично перезапустить сервер
4. Debugger автоматично переподключиться
5. Breakpoints залишаться активними

## Альтернатива: VS Code Debugger

### Використання з VS Code

1. Відкрийте проект в VS Code
2. Перейдіть на вкладку "Run and Debug" (Ctrl+Shift+D)
3. Виберіть "Docker: Attach to Node"
4. Натисніть F5 або зелену кнопку
5. Встановлюйте breakpoints прямо в VS Code

### Переваги VS Code:
- Інтеграція з редактором
- Швидше встановлення breakpoints
- Краща підтримка TypeScript

### Переваги Chrome DevTools:
- Потужніший профайлер
- Memory Inspector
- Network Inspector (для перевірки HTTP запитів)

## Troubleshooting

### Debugger не підключається

1. Перевірте що контейнер запущений:
   ```bash
   docker compose ps
   ```

2. Перевірте логи:
   ```bash
   docker compose logs app
   ```

3. Повинен бути рядок:
   ```
   Debugger listening on ws://0.0.0.0:9229/...
   ```

4. Перевірте що порт 9229 відкритий:
   ```bash
   docker compose port app 9229
   ```

### Breakpoints не працюють

1. Перевірте що файл збережений
2. Перевірте що шлях до файлу правильний в DevTools
3. Спробуйте перезапустити контейнер:
   ```bash
   docker compose restart app
   ```

### Виконання занадто швидке

1. Використовуйте Conditional Breakpoints
2. Додайте `debugger;` statement прямо в код
3. Використовуйте Logpoints замість breakpoints

## Додаткові можливості

### Memory Profiling

1. Вкладка "Memory"
2. Heap snapshot для аналізу пам'яті
3. Allocation timeline

### Performance Profiling

1. Вкладка "Profiler"
2. Запустіть профілювання
3. Виконайте запити
4. Зупиніть профілювання
5. Аналізуйте де витрачається час

### Network Inspection

1. Chrome не може інспектувати мережу для Node.js
2. Використовуйте логування в коді:
   ```javascript
   console.log('Request:', req.method, req.url);
   ```
3. Або використовуйте middleware logger (вже є в проекті)
