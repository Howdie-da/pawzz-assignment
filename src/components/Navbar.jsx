import './Navbar.css'

export default function Navbar({ page, navigate }) {
  return (
    <nav className="navbar glass">
      <div className="navbar-inner">
        <button className="navbar-logo" onClick={() => navigate('home')} id="nav-logo">
          <span className="logo-icon">🐾</span>
          <span className="logo-text font-display">Pawzz</span>
        </button>

        <div className="navbar-links">
          <button
            className={`nav-link ${page === 'home' ? 'active' : ''}`}
            onClick={() => navigate('home')}
            id="nav-home"
          >
            Discover
          </button>
          <button
            className={`nav-link ${page === 'ai-reader' ? 'active' : ''}`}
            onClick={() => navigate('ai-reader')}
            id="nav-ai"
          >
            ✨ AI Reader
          </button>
        </div>

        <button className="btn btn-primary btn-sm" id="nav-cta" onClick={() => navigate('home')}>
          🐶 Add Pet
        </button>
      </div>
    </nav>
  )
}
