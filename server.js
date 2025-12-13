// server.js
// 10Tenders – simple full stack demo server

const path = require('path');
const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();

// ---------- Config ----------
const PORT = process.env.PORT || 3000;

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tenders',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ---------- Middleware ----------
app.use(express.json());

// Serve static files (index.html, styles.css, app.js, etc.)
app.use(express.static(path.join(__dirname)));

// ---------- Routes ----------

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    res.json({ ok: true, db: 'up' });
  } catch (err) {
    console.error('Health check failed:', err);
    res.status(500).json({ ok: false, error: 'Database not reachable' });
  }
});

// List menu 
app.get('/api/menu', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, description, price, category, available FROM menu_items WHERE available = TRUE ORDER BY id ASC'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching menu:', err);
    res.status(500).json({ error: 'Failed to load menu' });
  }
});

/*
  POST /api/orders
*/
app.post('/api/orders', async (req, res) => {
  const { customer, items } = req.body || {};

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'No items in order' });
  }

  const full_name = customer?.full_name?.trim() || 'Demo Guest';
  const email = customer?.email?.trim() || 'guest@example.com';

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Find or create user
    let userId;
    {
      const [existing] = await conn.query(
        'SELECT id FROM users WHERE email = ? LIMIT 1',
        [email]
      );
      if (existing.length) {
        userId = existing[0].id;
      } else {
        const [insertRes] = await conn.query(
          'INSERT INTO users (email, password_hash, full_name, role) VALUES (?, ?, ?, ?)',
          [email, 'demo-hash', full_name, 'USER']
        );
        userId = insertRes.insertId;
      }
    }

    // Fetch prices from menu_items
    const uniqueIds = [...new Set(items.map(i => i.menu_item_id))];
    const [menuRows] = await conn.query(
      `SELECT id, price FROM menu_items WHERE id IN (${uniqueIds
        .map(() => '?')
        .join(',')})`,
      uniqueIds
    );
    const priceMap = new Map(menuRows.map(row => [row.id, Number(row.price)]));

    let totalPrice = 0;
    const normalizedItems = items.map(item => {
      const qty = Number(item.quantity) || 1;
      const price = priceMap.get(item.menu_item_id) ?? 0;
      const lineTotal = qty * price;
      totalPrice += lineTotal;
      return {
        menu_item_id: item.menu_item_id,
        quantity: qty,
        price_each: price
      };
    });

    // Insert into orders
    const [orderRes] = await conn.query(
      'INSERT INTO orders (user_id, status, total_price) VALUES (?, ?, ?)',
      [userId, 'PLACED', totalPrice.toFixed(2)]
    );
    const orderId = orderRes.insertId;

    // Insert item rows
    const values = normalizedItems.map(i => [
      orderId,
      i.menu_item_id,
      i.quantity,
      i.price_each.toFixed(2)
    ]);

    await conn.query(
      'INSERT INTO order_items (order_id, menu_item_id, quantity, price_each) VALUES ?',
      [values]
    );

    await conn.commit();

    res.status(201).json({
      ok: true,
      orderId,
      total_price: totalPrice.toFixed(2)
    });
  } catch (err) {
    await conn.rollback();
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Failed to create order' });
  } finally {
    conn.release();
  }
});

// Fallback: serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ---------- Start server ----------
app.listen(PORT, () => {
  console.log(`10Tenders server running at http://localhost:${PORT}`);
});
