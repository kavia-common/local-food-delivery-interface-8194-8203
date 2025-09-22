import React from 'react';
import './theme.css';

/**
 * PUBLIC_INTERFACE
 * App: Minimal shell for the Food Delivery UI following the Ocean Professional theme.
 * Provides a simple layout:
 * - Top navigation bar with brand placeholder and a cart icon button
 * - Sidebar with placeholder cuisine filters
 * - Main content grid with placeholder restaurant/menu cards
 * - Footer with basic text
 * No heavy libraries, only React and CSS. All content is placeholder for future extensibility.
 */
function App() {
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
          <div className="filter-group">
            <span className="filter-chip">🍕 Italian</span>
            <span className="filter-chip">🍣 Japanese</span>
            <span className="filter-chip">🌮 Mexican</span>
            <span className="filter-chip">🥗 Healthy</span>
            <span className="filter-chip">🍔 American</span>
            <span className="filter-chip">🧑‍🍳 Chef's Special</span>
          </div>
        </aside>

        {/* Main Area */}
        <section className="main">
          <div className="section-header">
            <div>
              <div className="title">Nearby Restaurants</div>
              <div className="subtitle">Hand-picked options based on your location</div>
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
            {/* Placeholder cards */}
            <article className="card">
              <div className="card-title">Blue Ocean Sushi</div>
              <div className="card-meta">Sushi • 25–35 min • $$</div>
              <div style={{ height: 8 }}></div>
              <button className="icon-btn" aria-label="Add to cart" title="Add to cart" style={{ width: 80, height: 36, color: 'var(--color-surface)', background: 'var(--color-primary)', borderColor: 'transparent' }}>
                Add
              </button>
            </article>

            <article className="card">
              <div className="card-title">Amber Grill</div>
              <div className="card-meta">Burgers • 20–30 min • $</div>
              <button className="icon-btn" aria-label="Add to cart" title="Add to cart" style={{ width: 80, height: 36, color: 'var(--color-surface)', background: 'var(--color-secondary)', borderColor: 'transparent' }}>
                Add
              </button>
            </article>

            <article className="card">
              <div className="card-title">Harbor Greens</div>
              <div className="card-meta">Healthy • 30–40 min • $$</div>
              <button className="icon-btn" aria-label="Add to cart" title="Add to cart" style={{ width: 80, height: 36, color: 'var(--color-surface)', background: 'var(--color-primary)', borderColor: 'transparent' }}>
                Add
              </button>
            </article>

            <article className="card">
              <div className="card-title">Taco Wave</div>
              <div className="card-meta">Mexican • 15–25 min • $</div>
              <button className="icon-btn" aria-label="Add to cart" title="Add to cart" style={{ width: 80, height: 36, color: 'var(--color-surface)', background: 'var(--color-secondary)', borderColor: 'transparent' }}>
                Add
              </button>
            </article>
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
