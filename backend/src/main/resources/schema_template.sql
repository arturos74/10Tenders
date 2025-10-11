/*
  10Tenders – Schema (Template)
  -----------------------------------------------------------
  Purpose: Defines the database structure (no real data yet).
  
*/

CREATE DATABASE IF NOT EXISTS tenders
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

USE tenders;

-- =========================================================
-- USERS: customers and admins
-- =========================================================
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,      -- login email
  password_hash VARCHAR(255) NOT NULL,     -- bcrypt hash
  full_name VARCHAR(100),                  -- user's full name
  role ENUM('USER','ADMIN') DEFAULT 'USER',-- access level
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Index for faster login lookups
CREATE INDEX idx_users_email ON users(email);

-- =========================================================
-- MENU_ITEMS: available dishes/items
-- =========================================================
DROP TABLE IF EXISTS menu_items;
CREATE TABLE menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,              -- item name
  description TEXT,                         -- description
  price DECIMAL(8,2) NOT NULL,             -- item price
  category VARCHAR(50),                     -- item category
  available BOOLEAN DEFAULT TRUE            -- admin bool
) ENGINE=InnoDB;

-- =========================================================
-- ORDERS: one record per checkout
-- =========================================================
DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,                                -- FK → users.id
  status ENUM('PLACED','PREPARING','READY','COMPLETED','CANCELLED')
         DEFAULT 'PLACED',
  total_price DECIMAL(10,2),                           -- total at purchase time
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_orders_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =========================================================
-- ORDER_ITEMS: items within each order
-- =========================================================
DROP TABLE IF EXISTS order_items;
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,                   -- FK → orders.id
  menu_item_id INT NOT NULL,               -- FK → menu_items.id
  quantity INT NOT NULL CHECK (quantity > 0),
  price_each DECIMAL(8,2) NOT NULL,        -- snapshot of menu_items.price

  CONSTRAINT fk_order_items_order
    FOREIGN KEY (order_id) REFERENCES orders(id)
    ON DELETE CASCADE ON UPDATE CASCADE,

  CONSTRAINT fk_order_items_menu_item
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

