import express from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import multer from 'multer';
import { Command } from 'commander';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();
program
  .option('-h, --host <host>', 'host', process.env.HOST || '0.0.0.0')
  .option('-p, --port <port>', 'port', process.env.PORT || '3000')
  .option('-c, --cache <path>', 'cache', process.env.CACHE || './cache')
  .parse(process.argv);

const options = program.opts();

const app = express();

// DB
const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASSWORD || 'mypassword',
  database: process.env.DB_NAME || 'mydb',
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) console.error('DB error:', err);
  else console.log('DB OK:', res.rows[0].now);
});

// uploads
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static(uploadsDir));

// routes
app.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'ok', timestamp: result.rows[0].now, uptime: process.uptime() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => res.send('<h1>Lab 7</h1><a href="/register.html">Register</a> | <a href="/search.html">Search</a>'));

app.post('/register', upload.single('photo'), async (req, res) => {
  try {
    const { name, description, quantity, price } = req.body;
    if (!name) return res.status(400).json({ error: 'Name required' });
    
    const photo = req.file ? `/uploads/${req.file.filename}` : null;
    const result = await pool.query(
      'INSERT INTO inventory (name, description, quantity, price, photo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, quantity || 0, price || 0, photo]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/inventory', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/inventory/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/inventory/:id', async (req, res) => {
  try {
    const { name, description, quantity, price } = req.body;
    const result = await pool.query(
      'UPDATE inventory SET name = COALESCE($1, name), description = COALESCE($2, description), quantity = COALESCE($3, quantity), price = COALESCE($4, price), updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
      [name, description, quantity, price, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/inventory/:id', async (req, res) => {
  try {
    const item = await pool.query('SELECT photo FROM inventory WHERE id = $1', [req.params.id]);
    if (item.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    
    if (item.rows[0].photo) {
      const filePath = path.join(__dirname, item.rows[0].photo);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    
    await pool.query('DELETE FROM inventory WHERE id = $1', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/inventory/:id/photo', upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file' });
    
    const oldItem = await pool.query('SELECT photo FROM inventory WHERE id = $1', [req.params.id]);
    if (oldItem.rows.length === 0) {
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ error: 'Not found' });
    }
    
    if (oldItem.rows[0].photo) {
      const oldPath = path.join(__dirname, oldItem.rows[0].photo);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    
    const photo = `/uploads/${req.file.filename}`;
    const result = await pool.query(
      'UPDATE inventory SET photo = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [photo, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(options.port, options.host, () => {
  console.log(`Server: http://${options.host}:${options.port}`);
});
