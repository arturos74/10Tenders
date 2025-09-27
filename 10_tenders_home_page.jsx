import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Phone, MapPin, Star, Menu as MenuIcon, Instagram, Facebook, Twitter } from "lucide-react";

// Tailwind is assumed. If using Vite + React, ensure Tailwind is configured.
// Drop this component into your app (e.g., src/App.jsx) and render <HomePage />.
// Replace image src values with your assets.

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Top Announcement Bar */}
      <div className="bg-red-600 text-white text-sm py-2 px-4 text-center">
        <span className="font-semibold">🔥 Launch Deal:</span> Free fries with any 3‑Tender combo. Use code <span className="font-mono bg-white/15 px-1 rounded">FRYDAY</span> at checkout.
      </div>

      {/* Header / Nav */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-2">
              <img src="/images/logo-10tenders.svg" alt="10Tenders" className="h-8 w-8" />
              <span className="text-xl font-black tracking-tight">10<span className="text-red-600">Tenders</span></span>
            </a>

            <nav className="hidden md:flex items-center gap-8 text-sm">
              <a href="#menu" className="hover:text-red-600 transition">Menu</a>
              <a href="#order" className="hover:text-red-600 transition">Order Online</a>
              <a href="#locations" className="hover:text-red-600 transition">Locations</a>
              <a href="#rewards" className="hover:text-red-600 transition">Rewards</a>
              <a href="#about" className="hover:text-red-600 transition">About</a>
              <a href="#contact" className="hover:text-red-600 transition">Contact</a>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a href="#order" className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold hover:shadow">
                <ShoppingBag className="h-4 w-4" /> Order Now
              </a>
              <a href="tel:+17145551234" className="inline-flex items-center gap-2 rounded-2xl bg-red-600 text-white px-4 py-2 text-sm font-semibold hover:bg-red-700">
                <Phone className="h-4 w-4" /> (714) 555‑1234
              </a>
            </div>

            <button className="md:hidden inline-flex items-center p-2 rounded-lg hover:bg-neutral-100" aria-label="Open Menu">
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-tenders.jpg"
            alt="Crispy chicken tenders"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-black text-white drop-shadow"
          >
            Crispy. Juicy. Legendary.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-4 max-w-2xl text-white/90 text-lg"
          >
            Hand‑breaded tenders, signature sauces, and sides that slap. Welcome to <span className="font-semibold">10Tenders</span>.
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#order" className="inline-flex items-center rounded-2xl bg-red-600 text-white px-6 py-3 font-semibold hover:bg-red-700">Order for Pickup</a>
            <a href="#menu" className="inline-flex items-center rounded-2xl bg-white text-neutral-900 px-6 py-3 font-semibold hover:shadow">Explore Menu</a>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="menu">
        <h2 className="text-2xl sm:text-3xl font-black">Fan Favorites</h2>
        <p className="mt-2 text-neutral-600">Our most‑ordered combos this week.</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "3‑Tender Combo", img: "/images/items/3-tender.jpg", desc: "Fries, drink, and a sauce of your choice.", price: "$9.99" },
            { title: "5‑Tender Combo", img: "/images/items/5-tender.jpg", desc: "Double the crunch with two sauces.", price: "$13.99" },
            { title: "Tender Sandwich", img: "/images/items/sandwich.jpg", desc: "Brioche bun, pickles, and house sauce.", price: "$10.49" },
          ].map((item) => (
            <motion.div key={item.title} whileHover={{ y: -4 }} className="rounded-3xl border overflow-hidden shadow-sm">
              <img src={item.img} alt={item.title} className="h-48 w-full object-cover" />
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <span className="font-semibold text-red-600">{item.price}</span>
                </div>
                <p className="mt-1 text-sm text-neutral-600">{item.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-yellow-500" aria-label="rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="ml-2 text-xs text-neutral-500">4.9 (1.2k)</span>
                </div>
                <a href="#order" className="mt-4 inline-flex items-center justify-center w-full rounded-xl bg-neutral-900 text-white py-2.5 font-semibold hover:bg-neutral-800">Add to Order</a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* USP / Features */}
      <section className="bg-neutral-50 py-14" id="rewards">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Fresh, Never Frozen", desc: "Premium chicken marinated 24 hours for flavor that hits." },
              { title: "Sauces on Sauces", desc: "From House Heat to Sweet Garlic—10 signature sauces." },
              { title: "Rewards That Stack", desc: "Earn points every bite. Free tenders faster than you think." },
            ].map((f) => (
              <div key={f.title} className="rounded-3xl border bg-white p-6">
                <h3 className="font-bold">{f.title}</h3>
                <p className="mt-1 text-neutral-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="locations">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black">Find a 10Tenders Near You</h2>
            <p className="mt-2 text-neutral-600">Pickup or dine‑in. More locations launching soon.</p>
            <div className="mt-6 space-y-4">
              {[
                { name: "Fullerton, CA", addr: "123 Crispy Ave", phone: "(714) 555‑1234" },
                { name: "Anaheim, CA", addr: "77 Dipper Rd", phone: "(714) 555‑9087" },
              ].map((loc) => (
                <div key={loc.name} className="rounded-2xl border p-4 flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-red-600 mt-1" />
                  <div>
                    <div className="font-semibold">{loc.name}</div>
                    <div className="text-sm text-neutral-600">{loc.addr}</div>
                    <a href={`tel:${loc.phone}`} className="text-sm text-red-600 hover:underline">{loc.phone}</a>
                  </div>
                </div>
              ))}
            </div>
            <a href="#order" className="mt-6 inline-flex items-center rounded-2xl bg-red-600 text-white px-5 py-3 font-semibold hover:bg-red-700">Start an Order</a>
          </div>

          {/* Map / Image Placeholder */}
          <div className="rounded-3xl overflow-hidden border">
            <img src="/images/map-placeholder.png" alt="Map of 10Tenders locations" className="w-full h-[360px] object-cover" />
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="bg-neutral-50" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <img src="/images/kitchen-team.jpg" alt="10Tenders kitchen team" className="rounded-3xl border w-full object-cover h-72" />
            <div>
              <h2 className="text-2xl sm:text-3xl font-black">About 10Tenders</h2>
              <p className="mt-3 text-neutral-700 leading-relaxed">
                We started with a simple obsession: nail the perfect tender. At 10Tenders, we hand‑bread every piece,
                craft our sauces in‑house, and serve it hot and fast. Whether you’re grabbing lunch between classes or
                fueling a late‑night study session, we’ve got you.
              </p>
              <a href="/about" className="mt-5 inline-flex items-center rounded-2xl border px-5 py-3 font-semibold hover:shadow">Learn more</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section id="order" className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="rounded-3xl border p-8 lg:p-10 bg-gradient-to-r from-red-600 to-red-500 text-white">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black">Hungry now?</h3>
                <p className="mt-1 text-white/90">Order online for pickup. Average prep time: 12–15 minutes.</p>
              </div>
              <div className="flex gap-3">
                <a href="/order/pickup" className="inline-flex items-center rounded-2xl bg-white text-neutral-900 px-6 py-3 font-semibold hover:shadow">Order Pickup</a>
                <a href="/order/delivery" className="inline-flex items-center rounded-2xl bg-black/20 text-white border border-white/30 px-6 py-3 font-semibold hover:bg-black/30">Delivery</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-black">What People Are Saying</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {[
            { quote: "Crisp on the outside, juicy inside. The House Heat sauce is undefeated.", name: "Alex M." },
            { quote: "Best late‑night fuel near campus. Quick, consistent, delicious.", name: "Jas S." },
            { quote: "The 5‑Tender combo with sweet garlic? Instant favorite.", name: "Diego R." },
          ].map((t) => (
            <div key={t.name} className="rounded-3xl border p-6 bg-white">
              <p className="italic">“{t.quote}”</p>
              <div className="mt-3 text-sm text-neutral-600">— {t.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="rounded-3xl border bg-white p-6 md:p-10 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-black">Get exclusive deals</h3>
              <p className="mt-1 text-neutral-600">Join the 10Tenders list for drops, rewards, and spicy surprises.</p>
            </div>
            <form className="w-full md:w-auto flex gap-3">
              <input type="email" placeholder="you@email.com" className="w-full md:w-80 rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-red-500" />
              <button className="rounded-xl bg-red-600 text-white px-5 py-3 font-semibold hover:bg-red-700" type="button">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <img src="/images/logo-10tenders.svg" alt="10Tenders" className="h-7 w-7" />
              <span className="text-lg font-black">10<span className="text-red-600">Tenders</span></span>
            </div>
            <p className="mt-3 text-sm text-neutral-600 max-w-xs">Hand‑breaded tenders, signature sauces, and sides that slap. Founded in Orange County, CA.</p>
            <div className="mt-4 flex gap-3 text-neutral-600">
              <a href="#" aria-label="Instagram" className="hover:text-red-600"><Instagram /></a>
              <a href="#" aria-label="Facebook" className="hover:text-red-600"><Facebook /></a>
              <a href="#" aria-label="Twitter" className="hover:text-red-600"><Twitter /></a>
            </div>
          </div>
          <div>
            <div className="font-semibold">Explore</div>
            <ul className="mt-3 space-y-2 text-sm text-neutral-600">
              <li><a className="hover:text-red-600" href="#menu">Menu</a></li>
              <li><a className="hover:text-red-600" href="#order">Order</a></li>
              <li><a className="hover:text-red-600" href="#rewards">Rewards</a></li>
              <li><a className="hover:text-red-600" href="#locations">Locations</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Company</div>
            <ul className="mt-3 space-y-2 text-sm text-neutral-600">
              <li><a className="hover:text-red-600" href="#about">About</a></li>
              <li><a className="hover:text-red-600" href="#contact">Contact</a></li>
              <li><a className="hover:text-red-600" href="#careers">Careers</a></li>
              <li><a className="hover:text-red-600" href="#press">Press</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Contact</div>
            <ul className="mt-3 space-y-2 text-sm text-neutral-600">
              <li>123 Crispy Ave, Fullerton, CA</li>
              <li>(714) 555‑1234</li>
              <li>hello@10tenders.com</li>
              <li>Open Daily 11am–11pm</li>
            </ul>
          </div>
        </div>
        <div className="border-t py-5 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} 10Tenders. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
