# 10Tenders

My First Full Stack Website – a simple demo site for a fictional chicken tenders restaurant.

## Stack

- **Front-end:** Vanilla HTML, CSS, and JavaScript
- **Back-end:** Node.js + Express
- **Database:** MySQL (see `schema_template.sql` and `data_template.sql`)

## Features

- Responsive landing page with hero, menu, locations, about, newsletter.
- Interactive mobile navigation and smooth scrolling.
- "Fan Favorites" menu with **Add to Order** buttons.
- **Order panel** (cart) that:
  - Tracks items client-side.
  - Accepts customer name + email.
  - Sends a demo order to the backend via `POST /api/orders`.
- Backend logic that:
  - Finds or creates a user (by email) in the `users` table.
  - Looks up item prices from `menu_items`.
  - Inserts an order into `orders` and each line into `order_items`.

## Project Structure

```text
.
├─ index.html           # main page
├─ styles.css           # styling
├─ app.js               # client-side behavior (nav, cart, order API)
├─ server.js            # Node + Express server / API
├─ schema_template.sql  # database schema (tables, FKs)
├─ data_template.sql    # seed data (users, menu_items, sample order)
└─ package.json         # Node project config
