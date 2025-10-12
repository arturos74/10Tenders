/*
  10Tenders – Data (Template)
  -----------------------------------------------------------
  Notes:
    - Commented-out examples show what to add.
*/

USE tenders;

-- =========================================================
-- USERS (example placeholders)
-- =========================================================

-- INSERT INTO users (email, password_hash, full_name, role)
-- VALUES
-- ('admin@yourdomain.com', '<bcrypt_hash_here>', 'Admin Name', 'ADMIN'),
-- ('user@example.com', '<bcrypt_hash_here>', 'Test User', 'USER');

-- =========================================================
-- MENU ITEMS (example placeholders)
-- =========================================================

-- INSERT INTO menu_items (name, description, price, category, available)
-- VALUES
-- ('Classic Tenders', 'Hand-breaded crispy tenders', 9.99, 'Chicken', TRUE),
-- ('Spicy Tenders', 'Cayenne-seasoned tenders', 10.49, 'Chicken', TRUE),
-- ('BBQ Tenders', 'Smoky and sweet glaze', 10.49, 'Chicken', TRUE);

-- =========================================================
-- ORDERS & ORDER_ITEMS (example placeholders)
-- =========================================================

-- INSERT INTO orders (user_id, status, total_price)
-- VALUES
-- (1, 'PLACED', 21.47);

-- INSERT INTO order_items (order_id, menu_item_id, quantity, price_each)
-- VALUES
-- (1, 1, 2, 9.99),
-- (1, 3, 1, 1.49);
