-- Database initialization script for inventory management

-- Create inventory table
CREATE TABLE IF NOT EXISTS inventory (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INTEGER DEFAULT 0,
    price DECIMAL(10, 2) DEFAULT 0,
    photo VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster searches by name
CREATE INDEX IF NOT EXISTS idx_inventory_name ON inventory(name);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_inventory_updated_at ON inventory;
CREATE TRIGGER update_inventory_updated_at
    BEFORE UPDATE ON inventory
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO inventory (name, description, quantity, price) VALUES
    ('Ноутбук Lenovo ThinkPad', 'Потужний ноутбук для роботи та ігор, 16GB RAM, 512GB SSD', 5, 25000.00),
    ('Мишка Logitech G502', 'Бездротова мишка з RGB підсвіткою та налаштуваннями', 15, 800.00),
    ('Клавіатура механічна', 'Механічна клавіатура з підсвіткою RGB та перемикачами Cherry MX', 10, 1500.00),
    ('Монітор Samsung 27"', '27-дюймовий монітор 4K UHD з частотою оновлення 144Hz', 7, 12000.00),
    ('Навушники Sony WH-1000XM5', 'Бездротові навушники з активним шумозаглушенням', 20, 3500.00),
    ('Веб-камера Logitech', 'Full HD веб-камера з автофокусом та мікрофоном', 12, 1200.00),
    ('USB-хаб', '7-портовий USB 3.0 хаб з живленням', 25, 450.00),
    ('SSD диск Samsung', '1TB NVMe SSD диск для швидкого зберігання даних', 8, 3200.00)
ON CONFLICT DO NOTHING;
