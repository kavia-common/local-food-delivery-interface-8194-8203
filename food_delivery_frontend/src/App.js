import React, { useMemo, useState } from 'react';
import './theme.css';

/**
 * PUBLIC_INTERFACE
 * App: Minimal shell for the Food Delivery UI following the Ocean Professional theme.
 * Now includes interactive cuisine filters plus rating and offers filters with in-memory sample data and real-time filtering.
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

          <div className="nav-actions">
            <button className="icon-btn" aria-label="Search">
              🔍
            </button>
            <button className="icon-btn" aria-label="Cart">
              🛒
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
