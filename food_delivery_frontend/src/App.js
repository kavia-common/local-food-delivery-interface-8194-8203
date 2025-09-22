import React, { useEffect, useMemo, useState } from 'react';
import './theme.css';
import { lsGet, lsSet, ensureSeed } from './storage';

/**
 * PUBLIC_INTERFACE
 * App: Minimal shell for the Food Delivery UI following the Ocean Professional theme.
 * Includes interactive filters and a complete in-memory cart with a minimal checkout flow.
 */
function App() {
  // Seed defaults for cuisines and restaurants in localStorage and read them back.
  const cuisineOptions = useMemo(() => {
    // Expanded cuisine list for richer filtering
    return ensureSeed('cuisines', [
      { key: 'italian', label: '🍕 Italian' },
      { key: 'japanese', label: '🍣 Japanese' },
      { key: 'mexican', label: '🌮 Mexican' },
      { key: 'healthy', label: '🥗 Healthy' },
      { key: 'american', label: '🍔 American' },
      { key: 'indian', label: '🍛 Indian' },
      { key: 'thai', label: '🍜 Thai' },
      { key: 'chinese', label: '🥟 Chinese' },
      { key: 'mediterranean', label: '🧆 Mediterranean' },
      { key: 'middleeastern', label: '🍢 Middle Eastern' },
      { key: 'korean', label: '🍲 Korean' },
      { key: 'vietnamese', label: '🍜 Vietnamese' },
      { key: 'bbq', label: '🍖 BBQ' },
      { key: 'seafood', label: '🦞 Seafood' },
      { key: 'bakery', label: '🥐 Bakery' },
      { key: 'dessert', label: '🍰 Dessert' },
      { key: 'breakfast', label: '🍳 Breakfast' },
      { key: 'vegan', label: '🌱 Vegan' },
      { key: 'special', label: '🧑‍🍳 Chef\'s Special' }
    ]);
  }, []);

  // Seed menu items per restaurant (kept for future menu rendering; does not affect current UI)
  useMemo(() => {
    ensureSeed('menus', {
      r1: [
        { id: 'r1-m1', name: 'Salmon Nigiri', price: 8.5 },
        { id: 'r1-m2', name: 'Tuna Roll', price: 7.0 },
        { id: 'r1-m3', name: 'Dragon Roll', price: 12.0 }
      ],
      r2: [
        { id: 'r2-m1', name: 'Classic Cheeseburger', price: 9.0 },
        { id: 'r2-m2', name: 'Crispy Fries', price: 3.5 },
        { id: 'r2-m3', name: 'BBQ Bacon Burger', price: 11.5 }
      ],
      r3: [
        { id: 'r3-m1', name: 'Quinoa Bowl', price: 10.0 },
        { id: 'r3-m2', name: 'Green Smoothie', price: 5.0 },
        { id: 'r3-m3', name: 'Avocado Toast', price: 7.5 }
      ],
      r4: [
        { id: 'r4-m1', name: 'Carne Asada Taco', price: 3.0 },
        { id: 'r4-m2', name: 'Chicken Tinga Taco', price: 2.8 },
        { id: 'r4-m3', name: 'Chips & Salsa', price: 2.5 }
      ],
      r5: [
        { id: 'r5-m1', name: 'Spaghetti Carbonara', price: 12.0 },
        { id: 'r5-m2', name: 'Margherita Pizza', price: 11.0 },
        { id: 'r5-m3', name: 'Bruschetta', price: 6.0 }
      ],
      r6: [
        { id: 'r6-m1', name: 'Chef’s Tasting Menu', price: 65.0 },
        { id: 'r6-m2', name: 'Seasonal Appetizer', price: 18.0 }
      ],
      r7: [
        { id: 'r7-m1', name: 'Chicken Tikka Masala', price: 13.0 },
        { id: 'r7-m2', name: 'Vegetable Biryani', price: 11.0 },
        { id: 'r7-m3', name: 'Garlic Naan', price: 3.0 }
      ],
      r8: [
        { id: 'r8-m1', name: 'Pad Thai', price: 12.0 },
        { id: 'r8-m2', name: 'Green Curry', price: 12.5 },
        { id: 'r8-m3', name: 'Tom Yum Soup', price: 7.0 }
      ],
      r9: [
        { id: 'r9-m1', name: 'Kung Pao Chicken', price: 11.0 },
        { id: 'r9-m2', name: 'Fried Rice', price: 9.0 },
        { id: 'r9-m3', name: 'Spring Rolls', price: 4.0 }
      ],
      r10: [
        { id: 'r10-m1', name: 'Chicken Shawarma Wrap', price: 9.5 },
        { id: 'r10-m2', name: 'Falafel Plate', price: 10.0 },
        { id: 'r10-m3', name: 'Hummus', price: 4.5 }
      ],
      r11: [
        { id: 'r11-m1', name: 'Bibimbap', price: 12.0 },
        { id: 'r11-m2', name: 'Bulgogi', price: 14.0 },
        { id: 'r11-m3', name: 'Kimchi', price: 3.5 }
      ],
      r12: [
        { id: 'r12-m1', name: 'Beef Pho', price: 11.0 },
        { id: 'r12-m2', name: 'Chicken Pho', price: 10.5 },
        { id: 'r12-m3', name: 'Fresh Spring Rolls', price: 5.0 }
      ],
      r13: [
        { id: 'r13-m1', name: 'Gyro Plate', price: 12.0 },
        { id: 'r13-m2', name: 'Greek Salad', price: 8.0 },
        { id: 'r13-m3', name: 'Spanakopita', price: 6.5 }
      ],
      r14: [
        { id: 'r14-m1', name: 'Smoked Ribs', price: 16.0 },
        { id: 'r14-m2', name: 'Pulled Pork Sandwich', price: 11.0 },
        { id: 'r14-m3', name: 'Cornbread', price: 3.5 }
      ],
      r15: [
        { id: 'r15-m1', name: 'Avocado Toast', price: 7.0 },
        { id: 'r15-m2', name: 'Breakfast Burrito', price: 8.5 },
        { id: 'r15-m3', name: 'Latte', price: 4.0 }
      ],
      r16: [
        { id: 'r16-m1', name: 'Chocolate Cake Slice', price: 5.5 },
        { id: 'r16-m2', name: 'Cheesecake', price: 6.0 },
        { id: 'r16-m3', name: 'Macarons (6)', price: 8.0 }
      ],
      r17: [
        { id: 'r17-m1', name: 'Tofu Buddha Bowl', price: 11.5 },
        { id: 'r17-m2', name: 'Vegan Brownie', price: 3.5 },
        { id: 'r17-m3', name: 'Kombucha', price: 4.0 }
      ],
      r18: [
        { id: 'r18-m1', name: 'Grilled Salmon', price: 18.0 },
        { id: 'r18-m2', name: 'Fish & Chips', price: 14.0 },
        { id: 'r18-m3', name: 'Clam Chowder', price: 7.5 }
      ],
      r19: [
        { id: 'r19-m1', name: 'Pepperoni Pizza (Large)', price: 12.0 },
        { id: 'r19-m2', name: 'Garlic Knots', price: 4.0 },
        { id: 'r19-m3', name: 'Caesar Salad', price: 6.0 }
      ],
      r20: [
        { id: 'r20-m1', name: 'Al Pastor Tacos (3)', price: 9.5 },
        { id: 'r20-m2', name: 'Quesadilla', price: 7.5 },
        { id: 'r20-m3', name: 'Elote', price: 4.0 }
      ]
    });
  }, []);

  // Sample restaurants data (seed once if missing)
  const restaurants = useMemo(() => {
    // Mix accents and ensure varied ratings and offers
    return ensureSeed('restaurants', [
      { id: 'r1', name: 'Blue Ocean Sushi', cuisines: ['japanese', 'seafood'], meta: 'Sushi • 25–35 min • $$', accent: 'primary', rating: 4.6, hasOffer: true, offerText: '10% off rolls' },
      { id: 'r2', name: 'Amber Grill', cuisines: ['american', 'bbq'], meta: 'Burgers • 20–30 min • $', accent: 'secondary', rating: 4.1, hasOffer: false },
      { id: 'r3', name: 'Harbor Greens', cuisines: ['healthy', 'vegan'], meta: 'Healthy • 30–40 min • $$', accent: 'primary', rating: 4.8, hasOffer: true, offerText: 'Free smoothie' },
      { id: 'r4', name: 'Taco Wave', cuisines: ['mexican'], meta: 'Mexican • 15–25 min • $', accent: 'secondary', rating: 3.9, hasOffer: false },
      { id: 'r5', name: 'Coastal Trattoria', cuisines: ['italian', 'mediterranean'], meta: 'Italian • 20–30 min • $$', accent: 'primary', rating: 4.3, hasOffer: true, offerText: '2-for-1 pastas' },
      { id: 'r6', name: 'Chef’s Table', cuisines: ['special'], meta: 'Chef\'s Special • 30–50 min • $$$', accent: 'secondary', rating: 4.9, hasOffer: false },

      { id: 'r7', name: 'Curry Harbor', cuisines: ['indian'], meta: 'Indian • 30–40 min • $$', accent: 'primary', rating: 4.5, hasOffer: true, offerText: '15% off biryani' },
      { id: 'r8', name: 'Bangkok Breeze', cuisines: ['thai'], meta: 'Thai • 20–30 min • $$', accent: 'secondary', rating: 4.2, hasOffer: false },
      { id: 'r9', name: 'Dragon Wok', cuisines: ['chinese'], meta: 'Chinese • 25–35 min • $', accent: 'primary', rating: 3.8, hasOffer: true, offerText: 'Free spring roll' },
      { id: 'r10', name: 'Shawarma Shore', cuisines: ['middleeastern'], meta: 'Wraps • 15–25 min • $', accent: 'secondary', rating: 4.0, hasOffer: false },
      { id: 'r11', name: 'Seoul Kitchen', cuisines: ['korean'], meta: 'Korean • 25–35 min • $$', accent: 'primary', rating: 4.4, hasOffer: true, offerText: 'Buy 2 get 1 kimchi' },
      { id: 'r12', name: 'Pho Bay', cuisines: ['vietnamese'], meta: 'Pho • 20–30 min • $', accent: 'secondary', rating: 4.7, hasOffer: false },

      { id: 'r13', name: 'Mediterraneo', cuisines: ['mediterranean'], meta: 'Mediterranean • 30–45 min • $$', accent: 'primary', rating: 4.3, hasOffer: false },
      { id: 'r14', name: 'Smokehouse Dock', cuisines: ['bbq', 'american'], meta: 'BBQ • 35–45 min • $$', accent: 'secondary', rating: 4.0, hasOffer: true, offerText: 'Ribs combo deal' },
      { id: 'r15', name: 'Morning Tide', cuisines: ['breakfast', 'bakery'], meta: 'Breakfast • 15–25 min • $', accent: 'primary', rating: 4.1, hasOffer: true, offerText: 'Coffee + croissant $5' },
      { id: 'r16', name: 'Sweet Sail', cuisines: ['dessert', 'bakery'], meta: 'Desserts • 20–30 min • $', accent: 'secondary', rating: 4.6, hasOffer: false },
      { id: 'r17', name: 'Greenport Vegan', cuisines: ['vegan', 'healthy'], meta: 'Vegan • 25–35 min • $$', accent: 'primary', rating: 4.9, hasOffer: true, offerText: 'Free dessert bar' },
      { id: 'r18', name: 'Harbor Seafood Grill', cuisines: ['seafood', 'american'], meta: 'Seafood • 35–45 min • $$$', accent: 'secondary', rating: 4.2, hasOffer: false },
      { id: 'r19', name: 'Napoli by the Bay', cuisines: ['italian'], meta: 'Pizza • 25–35 min • $', accent: 'primary', rating: 3.6, hasOffer: true, offerText: 'Large pizza $12' },
      { id: 'r20', name: 'Tortilla Coast', cuisines: ['mexican'], meta: 'Mexican • 20–30 min • $', accent: 'secondary', rating: 4.8, hasOffer: true, offerText: 'Taco Tuesday 20% off' }
    ]);
  }, []);

  // Selected cuisines state (persisted)
  const [selectedCuisineKeys, setSelectedCuisineKeys] = useState(() => lsGet('filters:selectedCuisines', []));
  // Rating filter (minimum) (persisted)
  const [minRating, setMinRating] = useState(() => lsGet('filters:minRating', 0)); // 0..5 in 0.5 increments
  // Offers toggle (persisted)
  const [onlyOffers, setOnlyOffers] = useState(() => lsGet('filters:onlyOffers', false));

  // Minimal cart state: array of {id, name, qty} (persisted)
  const [cart, setCart] = useState(() => lsGet('cart', []));
  // Brief feedback pulse when adding to cart (used to animate badge)
  const [cartPulse, setCartPulse] = useState(false);
  // Drawer state
  const [cartOpen, setCartOpen] = useState(false);
  // Checkout mock state
  const [checkoutStage, setCheckoutStage] = useState('cart'); // 'cart' | 'details' | 'review' | 'success'
  const [checkoutDetails, setCheckoutDetails] = useState({ name: '', address: '', notes: '' });

  // Persist filters to localStorage on change
  useEffect(() => {
    lsSet('filters:selectedCuisines', selectedCuisineKeys);
  }, [selectedCuisineKeys]);

  useEffect(() => {
    lsSet('filters:minRating', minRating);
  }, [minRating]);

  useEffect(() => {
    lsSet('filters:onlyOffers', onlyOffers);
  }, [onlyOffers]);

  // Persist cart to localStorage on change
  useEffect(() => {
    lsSet('cart', cart);
  }, [cart]);

  // Toggle handler for cuisine checkboxes
  const handleCuisineToggle = (key) => {
    setSelectedCuisineKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  // Derived filtered restaurants applying cuisine, rating, and offers filters
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      const cuisineOk =
        selectedCuisineKeys.length === 0
          ? true
          : r.cuisines.some((c) => selectedCuisineKeys.includes(c));

      const ratingOk = (r.rating ?? 0) >= minRating;
      const offersOk = onlyOffers ? !!r.hasOffer : true;

      return cuisineOk && ratingOk && offersOk;
    });
  }, [restaurants, selectedCuisineKeys, minRating, onlyOffers]);

  // Helper to render a button with theme accent
  const buttonStyleFor = (accent) =>
    accent === 'secondary'
      ? { width: 80, height: 36, color: 'var(--color-surface)', background: 'var(--color-secondary)', borderColor: 'transparent' }
      : { width: 80, height: 36, color: 'var(--color-surface)', background: 'var(--color-primary)', borderColor: 'transparent' };

  // PUBLIC_INTERFACE
  function RatingBadge({ rating }) {
    /** Displays a small rounded badge for rating. */
    const color =
      rating >= 4.5 ? 'rgba(37,99,235,0.1)' :
      rating >= 4.0 ? '#f5f7fb' : '#fafafa';
    const border =
      rating >= 4.5 ? 'rgba(37,99,235,0.45)' :
      rating >= 4.0 ? 'rgba(37,99,235,0.25)' : 'var(--border-color)';
    return (
      <span
        className="card-meta"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 8px',
          borderRadius: 999,
          border: `1px solid ${border}`,
          background: color
        }}
        aria-label={`Average rating ${rating}`}
        title={`Average rating ${rating}`}
      >
        ⭐ {rating.toFixed(1)}
      </span>
    );
  }

  // PUBLIC_INTERFACE
  function CartBadge({ count, pulsing }) {
    /** Renders a small badge with item count next to the cart icon. */
    const badgeStyle = {
      minWidth: 18,
      height: 18,
      padding: '0 4px',
      borderRadius: 999,
      background: 'var(--color-primary)',
      color: 'var(--color-surface)',
      fontSize: 11,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid rgba(37,99,235,0.5)',
      transform: pulsing ? 'scale(1.08)' : 'scale(1)',
      transition: 'transform 200ms ease'
    };
    if (count <= 0) return null;
    return <span aria-live="polite" style={badgeStyle}>{count}</span>;
  }

  // PUBLIC_INTERFACE
  function addToCart(item) {
    /**
     * Adds an item to the in-memory cart, increments qty if already present,
     * and triggers a short visual pulse for feedback.
     */
    setCart((prev) => {
      const idx = prev.findIndex((it) => it.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { id: item.id, name: item.name, qty: 1 }];
    });

    // brief pulse effect for cart badge
    setCartPulse(true);
    window.setTimeout(() => setCartPulse(false), 220);
  }

  // PUBLIC_INTERFACE
  function cartCountTotal() {
    /** Returns the sum of quantities in the cart. */
    return cart.reduce((sum, it) => sum + (it.qty || 0), 0);
  }

  // PUBLIC_INTERFACE
  function updateQty(id, qty) {
    /** Update quantity for a cart item. Remove if qty <= 0. */
    setCart((prev) => {
      if (qty <= 0) return prev.filter((it) => it.id !== id);
      return prev.map((it) => (it.id === id ? { ...it, qty } : it));
    });
  }

  // PUBLIC_INTERFACE
  function removeFromCart(id) {
    /** Remove an item from the cart by id. */
    setCart((prev) => prev.filter((it) => it.id !== id));
  }

  // PUBLIC_INTERFACE
  function clearCart() {
    /** Clear the entire cart. */
    setCart([]);
  }

  // PUBLIC_INTERFACE
  function openCart() {
    /** Open cart drawer and reset to cart stage. */
    setCheckoutStage('cart');
    setCartOpen(true);
  }

  // PUBLIC_INTERFACE
  function startCheckout() {
    /** Proceed to checkout details if cart has items. */
    if (cartCountTotal() === 0) return;
    setCheckoutStage('details');
  }

  // PUBLIC_INTERFACE
  function placeOrderMock() {
    /** Mock placing an order: show success, then clear cart. */
    setCheckoutStage('success');
    // Clear cart after a moment
    setTimeout(() => {
      clearCart();
    }, 300);
  }

  return (
    <div className="app-shell">
      {/* Top Navigation */}
      <nav className="navbar shadow-sm">
        <div className="container navbar-inner">
          <div className="brand">
            <div className="brand-mark">FD</div>
            <div>
              <div style={{ fontSize: 16 }}>Food Delivery</div>
              <div style={{ fontSize: 12, color: 'var(--color-muted)' }}>Ocean Professional</div>
            </div>
          </div>

          <div className="nav-actions" aria-live="polite">
            <button className="icon-btn" aria-label="Search">
              🔍
            </button>
            <button
              className="icon-btn"
              aria-label="Cart"
              title="Cart"
              onClick={openCart}
            >
              <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                🛒
                <CartBadge count={cartCountTotal()} pulsing={cartPulse} />
              </span>
            </button>
            <button
              className="icon-btn"
              aria-label="Profile"
              title="Profile"
              style={{ borderColor: 'var(--border-color)' }}
            >
              👤
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="container app-content">
        {/* Hero Cover */}
        <section className="hero-cover rounded shadow-md" aria-label="App features and highlights">
          <div className="hero-media">
            <img
              src="/assets/food.jpg"
              alt="Fresh and delicious food selection"
              loading="eager"
              decoding="async"
            />
            <div className="hero-overlay" aria-hidden="true" />
          </div>
          <div className="hero-content">
            <div className="hero-eyebrow">Your favorites, delivered</div>
            <h1 className="hero-title">Order delicious food in minutes</h1>
            <p className="hero-subtitle">
              Explore nearby restaurants and enjoy seamless ordering with smart filters and a clean checkout.
            </p>
            <ul className="hero-features" aria-label="Key features">
              <li>🍽️ Browse Menus</li>
              <li>🧠 Smart Filters</li>
              <li>⚡ Quick Add-to-Cart</li>
              <li>🛒 Easy Checkout</li>
              <li>🏷️ Live Offers</li>
            </ul>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="sidebar rounded shadow-sm">
          <h3>Filter by cuisine</h3>
          {/* PUBLIC_INTERFACE */}
          {/* Cuisine filters: simple checkbox list with clear UI feedback (checked state + chip) */}
          <div className="filter-group" role="group" aria-label="Cuisine filters">
            {cuisineOptions.map((c) => {
              const checked = selectedCuisineKeys.includes(c.key);
              return (
                <label
                  key={c.key}
                  className="filter-chip"
                  style={{
                    borderColor: checked ? 'rgba(37,99,235,0.55)' : undefined,
                    background: checked ? '#f0f5ff' : undefined,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleCuisineToggle(c.key)}
                    aria-label={`Filter by ${c.label.replace(/^[^ ]+ /, '')}`}
                    style={{ marginRight: 8 }}
                  />
                  <span>{c.label}</span>
                </label>
              );
            })}
            {/* PUBLIC_INTERFACE */}
            <button
              className="icon-btn"
              aria-label="Clear cuisine filters"
              title="Clear filters"
              onClick={() => setSelectedCuisineKeys([])}
              style={{ width: '100%', height: 38, borderStyle: 'dashed' }}
            >
              Clear
            </button>
          </div>

          {/* NEW: Rating filter */}
          <div style={{ height: 16 }} />
          <h3>Minimum rating</h3>
          <div className="filter-group" role="group" aria-label="Minimum rating">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                aria-label="Minimum average rating"
                style={{ flex: 1 }}
              />
              <div
                className="filter-chip"
                style={{ padding: '6px 10px', cursor: 'default' }}
                aria-live="polite"
              >
                ⭐ {minRating.toFixed(1)}+
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[0, 3, 4, 4.5].map((preset) => {
                const active = minRating === preset;
                return (
                  <button
                    key={preset}
                    className="icon-btn"
                    onClick={() => setMinRating(preset)}
                    aria-label={`Set minimum rating to ${preset}`}
                    title={`Min ${preset}+`}
                    style={{
                      width: 'auto',
                      padding: '0 10px',
                      borderColor: active ? 'rgba(37,99,235,0.55)' : 'var(--border-color)',
                      background: active ? '#f0f5ff' : 'var(--color-surface)'
                    }}
                  >
                    ⭐ {preset}+
                  </button>
                );
              })}
            </div>
          </div>

          {/* NEW: Offers toggle */}
          <div style={{ height: 16 }} />
          <h3>Offers</h3>
          <div className="filter-group" role="group" aria-label="Offers">
            <label
              className="filter-chip"
              style={{
                borderColor: onlyOffers ? 'rgba(37,99,235,0.55)' : undefined,
                background: onlyOffers ? '#f0f5ff' : undefined,
              }}
            >
              <input
                type="checkbox"
                checked={onlyOffers}
                onChange={() => setOnlyOffers((v) => !v)}
                aria-label="Show only restaurants with offers"
                style={{ marginRight: 8 }}
              />
              <span>Only with current offers</span>
            </label>
          </div>
        </aside>

        {/* Main Area */}
        <section className="main">
          <div className="section-header">
            <div>
              <div className="title">Nearby Restaurants</div>
              <div className="subtitle" aria-live="polite">
                {(() => {
                  const parts = [];
                  if (selectedCuisineKeys.length > 0) parts.push(`${selectedCuisineKeys.length} cuisine${selectedCuisineKeys.length > 1 ? 's' : ''}`);
                  if (minRating > 0) parts.push(`⭐ ${minRating.toFixed(1)}+`);
                  if (onlyOffers) parts.push('with offers');
                  const filterSummary = parts.length > 0 ? `Filtered by ${parts.join(' • ')}` : 'Showing all';
                  return `${filterSummary} • ${filteredRestaurants.length} result${filteredRestaurants.length === 1 ? '' : 's'}`;
                })()}
              </div>
            </div>
            <button
              className="icon-btn"
              aria-label="Sort options"
              title="Sort"
              style={{ color: 'var(--color-primary)' }}
            >
              ⤓
            </button>
          </div>

          <div className="card-grid">
            {filteredRestaurants.length === 0 ? (
              <article className="card" role="status">
                <div className="card-title">No matches</div>
                <div className="card-meta">Try adjusting your filters (cuisine, rating, or offers).</div>
              </article>
            ) : (
              filteredRestaurants.map((r) => (
                <article key={r.id} className="card">
                  <div className="card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <span>{r.name}</span>
                    <RatingBadge rating={r.rating ?? 0} />
                  </div>
                  <div className="card-meta">
                    {r.meta} {r.hasOffer ? `• 🔖 ${r.offerText ?? 'Offer available'}` : ''}
                  </div>
                  <div style={{ height: 8 }}></div>
                  <button
                    className="icon-btn"
                    aria-label={`Add ${r.name} to cart`}
                    title="Add to cart"
                    onClick={() => addToCart(r)}
                    style={buttonStyleFor(r.accent)}
                  >
                    Add
                  </button>
                </article>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Cart Drawer */}
      {cartOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Cart and checkout"
          className="cart-overlay"
          onClick={() => setCartOpen(false)}
        >
          <div
            className="cart-drawer rounded shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cart-header">
              <div className="title" style={{ fontSize: 18 }}>
                {checkoutStage === 'cart' && 'Your Cart'}
                {checkoutStage === 'details' && 'Checkout Details'}
                {checkoutStage === 'review' && 'Review Order'}
                {checkoutStage === 'success' && 'Order Placed'}
              </div>
              <button
                className="icon-btn"
                aria-label="Close cart"
                title="Close"
                onClick={() => setCartOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="cart-content">
              {checkoutStage === 'cart' && (
                <>
                  {cart.length === 0 ? (
                    <div className="card-meta">Your cart is empty.</div>
                  ) : (
                    <ul className="cart-items">
                      {cart.map((it) => (
                        <li key={it.id} className="cart-item">
                          <div className="cart-item-info">
                            <div className="cart-item-name">{it.name}</div>
                          </div>
                          <div className="cart-item-actions">
                            <button
                              className="icon-btn"
                              aria-label={`Decrease ${it.name}`}
                              title="Decrease"
                              onClick={() => updateQty(it.id, (it.qty || 0) - 1)}
                            >−</button>
                            <input
                              className="qty-input"
                              aria-label={`${it.name} quantity`}
                              type="number"
                              min="0"
                              value={it.qty}
                              onChange={(e) => updateQty(it.id, Math.max(0, parseInt(e.target.value || '0', 10)))}
                            />
                            <button
                              className="icon-btn"
                              aria-label={`Increase ${it.name}`}
                              title="Increase"
                              onClick={() => updateQty(it.id, (it.qty || 0) + 1)}
                            >+</button>
                            <button
                              className="icon-btn"
                              aria-label={`Remove ${it.name}`}
                              title="Remove"
                              onClick={() => removeFromCart(it.id)}
                              style={{ width: 'auto', padding: '0 10px', color: 'var(--color-error)', borderColor: 'rgba(239,68,68,0.35)' }}
                            >
                              Remove
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="cart-footer">
                    <div className="cart-summary">
                      <span className="card-meta">Items</span>
                      <strong>{cartCountTotal()}</strong>
                    </div>
                    <div className="cart-actions">
                      <button
                        className="icon-btn"
                        aria-label="Clear cart"
                        title="Clear cart"
                        onClick={clearCart}
                        style={{ width: 'auto', padding: '0 12px', borderStyle: 'dashed' }}
                        disabled={cart.length === 0}
                      >
                        Clear
                      </button>
                      <button
                        className="icon-btn"
                        aria-label="Checkout"
                        title="Checkout"
                        onClick={startCheckout}
                        style={{ width: 'auto', padding: '0 14px', background: 'var(--color-primary)', color: 'var(--color-surface)', borderColor: 'transparent' }}
                        disabled={cart.length === 0}
                      >
                        Checkout →
                      </button>
                    </div>
                  </div>
                </>
              )}

              {checkoutStage === 'details' && (
                <form
                  className="checkout-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setCheckoutStage('review');
                  }}
                >
                  <label className="form-field">
                    <span>Name</span>
                    <input
                      type="text"
                      required
                      value={checkoutDetails.name}
                      onChange={(e) => setCheckoutDetails({ ...checkoutDetails, name: e.target.value })}
                      placeholder="Your full name"
                    />
                  </label>
                  <label className="form-field">
                    <span>Address</span>
                    <textarea
                      required
                      rows="3"
                      value={checkoutDetails.address}
                      onChange={(e) => setCheckoutDetails({ ...checkoutDetails, address: e.target.value })}
                      placeholder="Delivery address"
                    />
                  </label>
                  <label className="form-field">
                    <span>Notes (optional)</span>
                    <input
                      type="text"
                      value={checkoutDetails.notes}
                      onChange={(e) => setCheckoutDetails({ ...checkoutDetails, notes: e.target.value })}
                      placeholder="Any delivery instructions?"
                    />
                  </label>
                  <div className="cart-actions" style={{ marginTop: 8 }}>
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => setCheckoutStage('cart')}
                      aria-label="Back to cart"
                      title="Back"
                      style={{ width: 'auto', padding: '0 12px' }}
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="icon-btn"
                      aria-label="Review order"
                      title="Review"
                      style={{ width: 'auto', padding: '0 14px', background: 'var(--color-primary)', color: 'var(--color-surface)', borderColor: 'transparent' }}
                    >
                      Review →
                    </button>
                  </div>
                </form>
              )}

              {checkoutStage === 'review' && (
                <div className="review">
                  <div className="card-meta" style={{ marginBottom: 8 }}>
                    Please confirm your order and details.
                  </div>
                  <div className="review-block">
                    <div className="review-title">Items</div>
                    <ul className="cart-items">
                      {cart.map((it) => (
                        <li key={it.id} className="cart-item">
                          <div className="cart-item-info">
                            <div className="cart-item-name">{it.name}</div>
                          </div>
                          <div className="cart-item-actions">
                            <span className="qty-badge">{it.qty}x</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="review-block">
                    <div className="review-title">Delivery</div>
                    <div className="card-meta">Name: <strong>{checkoutDetails.name}</strong></div>
                    <div className="card-meta">Address: <strong>{checkoutDetails.address}</strong></div>
                    {checkoutDetails.notes && (
                      <div className="card-meta">Notes: <strong>{checkoutDetails.notes}</strong></div>
                    )}
                  </div>

                  <div className="cart-actions" style={{ marginTop: 8 }}>
                    <button
                      className="icon-btn"
                      onClick={() => setCheckoutStage('details')}
                      aria-label="Back to details"
                      title="Back"
                      style={{ width: 'auto', padding: '0 12px' }}
                    >
                      ← Back
                    </button>
                    <button
                      className="icon-btn"
                      onClick={placeOrderMock}
                      aria-label="Place order"
                      title="Place order"
                      style={{ width: 'auto', padding: '0 14px', background: 'var(--color-secondary)', color: 'var(--color-surface)', borderColor: 'transparent' }}
                    >
                      Place order
                    </button>
                  </div>
                </div>
              )}

              {checkoutStage === 'success' && (
                <div className="success-state">
                  <div style={{ fontSize: 36 }}>✅</div>
                  <div className="title" style={{ fontSize: 18, marginTop: 8 }}>Order Confirmed</div>
                  <div className="card-meta">Your delicious food is on its way!</div>
                  <button
                    className="icon-btn"
                    style={{ width: 'auto', padding: '0 14px', marginTop: 12, background: 'var(--color-primary)', color: 'var(--color-surface)', borderColor: 'transparent' }}
                    onClick={() => setCartOpen(false)}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <div>© {new Date().getFullYear()} Food Delivery</div>
          <div style={{ color: 'var(--color-muted)' }}>Built with React • Ocean Professional Theme</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
