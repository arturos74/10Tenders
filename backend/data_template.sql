/*
  10Tenders – Data (Seed)
  -----------------------------------------------------------
  Run this AFTER schema_template.sql to insert demo data.
*/

USE tenders;

-- =========================================================
-- USERS
-- =========================================================

INSERT INTO users (email, password_hash, full_name, role)
VALUES
  ('admin@10tenders.local', 'demo-hash', 'Admin User', 'ADMIN'),
  ('guest@10tenders.local', 'demo-hash', 'Guest User', 'USER');

-- =========================================================
-- MENU ITEMS
--  IDs here are what we’ll reference from the front-end buttons.
-- =========================================================

INSERT INTO menu_items (name, description, price, category, available)
VALUES
  ( '3-Tender Combo',
    'Fries, drink, and a sauce of your choice.',
    9.99,
    'Combo',
    TRUE
  ),
  ( '5-Tender Combo',
    'Double the crunch with two sauces.',
    13.99,
    'Combo',
    TRUE
  ),
  ( 'Tender Sandwich',
    'Brioche bun, pickles, and house sauce.',
    10.49,
    'Sandwich',
    TRUE
  );

-- =========================================================
-- SAMPLE ORDER (optional, just so there’s something in the DB)
-- =========================================================

INSERT INTO orders (user_id, status, total_price)
VALUES
  (2, 'PLACED', 33. - 0.02); -- roughly 2 combos + 1 sandwich

INSERT INTO order_items (order_id, menu_item_id, quantity, price_each)
VALUES
  (1, 1, 1, 9.99),
  (1, 2, 1, 13.99),
  (1, 3, 1, 10.49);
