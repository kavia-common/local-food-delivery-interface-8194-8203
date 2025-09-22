import React, { useMemo, useState } from 'react';
import './theme.css';

/**
 * PUBLIC_INTERFACE
 * App: Minimal shell for the Food Delivery UI following the Ocean Professional theme.
 * Includes interactive filters and a complete in-memory cart with a minimal checkout flow.
 */
function App() {
  // Simple in-memory cuisines and restaurants (placeholder for future persistent/local JSON storage)
  const cuisineOptions = useMemo(
    () => [
      { key: 'italian', label: '🍕 Italian' },
      { key: 'japanese', label: '🍣 Japanese' },
      { key: 'mexican', label: '🌮 Mexican' },
      { key: 'healthy', label: '🥗 Healthy' },
      { key: 'american', label: '🍔 American' },
      { key: 'special', label: '🧑‍🍳 Chef\'s Special' }
    ],
    []
  );

  // Sample data extended with rating and offers to enable new filters
  const restaurants = useMemo(
    () => [
      { id: 'r1', name: 'Blue Ocean Sushi', cuisines: ['japanese'], meta: 'Sushi • 25–35 min • $$', accent: 'primary', rating: 4.6, hasOffer: true, offerText: '10% off rolls' },
      { id: 'r2', name: 'Amber Grill', cuisines: ['american'], meta: 'Burgers • 20–30 min • $', accent: 'secondary', rating: 4.1, hasOffer: false },
      { id: 'r3', name: 'Harbor Greens', cuisines: ['healthy'], meta: 'Healthy • 30–40 min • $$', accent: 'primary', rating: 4.8, hasOffer: true, offerText: 'Free smoothie' },
      { id: 'r4', name: 'Taco Wave', cuisines: ['mexican'], meta: 'Mexican • 15–25 min • $', accent: 'secondary', rating: 3.9, hasOffer: false },
      { id: 'r5', name: 'Coastal Trattoria', cuisines: ['italian'], meta: 'Italian • 20–30 min • $$', accent: 'primary', rating: 4.3, hasOffer: true, offerText: '2-for-1 pastas' },
      { id: 'r6', name: 'Chef’s Table', cuisines: ['special'], meta: 'Chef\'s Special • 30–50 min • $$$', accent: 'secondary', rating: 4.9, hasOffer: false },
    ],
    []
  );

  // Selected cuisines state
  const [selectedCuisineKeys, setSelectedCuisineKeys] = useState([]);
  // Rating filter (minimum)
  const [minRating, setMinRating] = useState(0); // 0..5 in 0.5 increments
  // Offers toggle
  const [onlyOffers, setOnlyOffers] = useState(false);

  // Minimal cart state: array of {id, name, qty}
  const [cart, setCart] = useState([]);
  // Brief feedback pulse when adding to cart (used to animate badge)
  const [cartPulse, setCartPulse] = useState(false);
  // Drawer state
  const [cartOpen, setCartOpen] = useState(false);
  // Checkout mock state
  const [checkoutStage, setCheckoutStage] = useState('cart'); // 'cart' | 'details' | 'review' | 'success'
  const [checkoutDetails, setCheckoutDetails] = useState({ name: '', address: '', notes: '' });

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
