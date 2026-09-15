import { providers, categories } from '../data/providers'
import ProviderCard from '../components/ProviderCard'
import './HomePage.css'

const STATS = [
  { value: '1,200+', label: 'Verified Providers' },
  { value: '8 Cities', label: 'And Growing' },
  { value: '94%', label: 'Happy Pet Parents' },
  { value: '18 min', label: 'Avg Emergency Response' },
]

export default function HomePage({ navigate, searchQuery, setSearchQuery }) {
  const handleSearch = (e) => {
    e.preventDefault()
    navigate('results')
  }

  const handleCategory = (cat) => {
    setSearchQuery(cat.label)
    navigate('results')
  }

  const featured = providers.filter(p => p.isOpen).slice(0, 3)

  return (
    <div className="home-page page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            🇮🇳 Now live in Bangalore
          </div>

          <h1 className="hero-title font-display">
            Find the right care<br />
            for your <span className="gradient-text">furry family</span>
          </h1>

          <p className="hero-subtitle">
            Discover verified vets, NGOs, ambulances, boarding and more — all in one place, near you.
          </p>

          {/* Search Bar */}
          <form className="search-bar glass" onSubmit={handleSearch} role="search">
            <div className="search-location">
              <span>📍</span>
              <span className="search-location-text">Bangalore</span>
              <span className="search-divider" />
            </div>
            <input
              id="main-search-input"
              className="search-input"
              type="search"
              placeholder="Search vets, NGOs, ambulances, boarding…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              autoComplete="off"
            />
            <button type="submit" className="btn btn-primary search-submit" id="search-submit-btn">
              Search
            </button>
          </form>

          {/* Category Chips */}
          <div className="category-chips" role="list">
            {categories.map(cat => (
              <button
                key={cat.id}
                id={`cat-chip-${cat.id}`}
                className="cat-chip glass"
                onClick={() => handleCategory(cat)}
                role="listitem"
                style={{ '--cat-color': cat.color }}
              >
                <span className="cat-chip-icon">{cat.icon}</span>
                <span className="cat-chip-label">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-bar">
        <div className="stats-inner">
          {STATS.map((s, i) => (
            <div key={i} className="stat-item">
              <div className="stat-value font-display">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Nearby */}
      <section className="section featured-section">
        <div className="section-inner">
          <div className="section-header">
            <div>
              <h2 className="section-title font-display">Open Near You</h2>
              <p className="section-subtitle">Top-rated providers in Bangalore</p>
            </div>
            <button className="btn btn-ghost" onClick={() => navigate('results')} id="view-all-btn">
              View all →
            </button>
          </div>

          <div className="cards-grid">
            {featured.map((p, i) => (
              <ProviderCard
                key={p.id}
                provider={p}
                index={i}
                onClick={(prov) => navigate('provider', prov)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* AI Feature Banner */}
      <section className="section ai-banner-section">
        <div className="section-inner">
          <div className="ai-banner glass glass-hover" onClick={() => navigate('ai-reader')} id="ai-banner">
            <div className="ai-banner-glow" />
            <div className="ai-banner-content">
              <div className="ai-banner-icon">✨</div>
              <div>
                <h3 className="ai-banner-title font-display">AI Medical Record Reader</h3>
                <p className="ai-banner-desc">
                  Upload your pet's prescription or lab report — our AI extracts key health info in plain English.
                </p>
              </div>
              <button className="btn btn-primary ai-banner-btn" id="try-ai-btn">
                Try Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section how-section">
        <div className="section-inner">
          <div className="section-header centered">
            <h2 className="section-title font-display">How Pawzz Works</h2>
            <p className="section-subtitle">Three simple steps to the right care</p>
          </div>
          <div className="how-steps">
            {[
              { step: '01', icon: '📍', title: 'Share Your Location', desc: 'Allow location or type your area to discover services near you.' },
              { step: '02', icon: '🔍', title: 'Search & Filter', desc: 'Filter by species, service type, open status, and distance.' },
              { step: '03', icon: '📞', title: 'Connect Instantly', desc: 'Call, book, or get directions to the right provider in one tap.' },
            ].map((s, i) => (
              <div key={i} className="how-step glass" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="step-number font-display">{s.step}</div>
                <div className="step-icon">{s.icon}</div>
                <h3 className="step-title font-display">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="logo-icon">🐾</span>
            <span className="footer-name font-display">Pawzz</span>
          </div>
          <p className="footer-copy">© 2025 Pawzz. Made with ❤️ for every animal. • Bangalore, India</p>
        </div>
      </footer>
    </div>
  )
}
