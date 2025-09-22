import React, { useMemo, useState } from 'react';
import './theme.css';

/**
 * PUBLIC_INTERFACE
 * App: Minimal shell for the Food Delivery UI following the Ocean Professional theme.
 * Now includes interactive cuisine filters with in-memory sample data and real-time filtering.
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

  const restaurants = useMemo(
    () => [
      { id: 'r1', name: 'Blue Ocean Sushi', cuisines: ['japanese'], meta: 'Sushi • 25–35 min • $$', accent: 'primary' },
      { id: 'r2', name: 'Amber Grill', cuisines: ['american'], meta: 'Burgers • 20–30 min • $', accent: 'secondary' },
      { id: 'r3', name: 'Harbor Greens', cuisines: ['healthy'], meta: 'Healthy • 30–40 min • $$', accent: 'primary' },
      { id: 'r4', name: 'Taco Wave', cuisines: ['mexican'], meta: 'Mexican • 15–25 min • $', accent: 'secondary' },
      { id: 'r5', name: 'Coastal trattoria', cuisines: ['italian'], meta: 'Italian • 20–30 min • $$', accent: 'primary' },
      { id: 'r6', name: 'Chef’s Table', cuisines: ['special'], meta: 'Chef\'s Special • 30–50 min • $$$', accent: 'secondary' },
    ],
    []
  );

  // Selected cuisines state
  const [selectedCuisineKeys, setSelectedCuisineKeys] = useState([]);

  // Toggle handler for cuisine checkboxes
  const handleCuisineToggle = (key) => {
    setSelectedCuisineKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  // Derived filtered restaurants (if none selected, show all)
  const filteredRestaurants = useMemo(() => {
    if (selectedCuisineKeys.length === 0) return restaurants;
    return restaurants.filter((r) =>
      r.cuisines.some((c) => selectedCuisineKeys.includes(c))
    );
  }, [restaurants, selectedCuisineKeys]);

  // Helper to render a button with theme accent
  const buttonStyleFor = (accent) =>
    accent === 'secondary'
      ? { width: 80, height: 36, color: 'var(--color-surface)', background: 'var(--color-secondary)', borderColor: 'transparent' }
      : { width: 80, height: 36, color: 'var(--color-surface)', background: 'var(--color-primary)', borderColor: 'transparent' };

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
        </aside>

        {/* Main Area */}
        <section className="main">
          <div className="section-header">
            <div>
              <div className="title">Nearby Restaurants</div>
              <div className="subtitle">
                {selectedCuisineKeys.length === 0
                  ? 'Showing all'
                  : `Filtered by ${selectedCuisineKeys.length} cuisine${selectedCuisineKeys.length > 1 ? 's' : ''}`}
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
                <div className="card-meta">Try adjusting your cuisine filters.</div>
              </article>
            ) : (
              filteredRestaurants.map((r) => (
                <article key={r.id} className="card">
                  <div className="card-title">{r.name}</div>
                  <div className="card-meta">{r.meta}</div>
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
