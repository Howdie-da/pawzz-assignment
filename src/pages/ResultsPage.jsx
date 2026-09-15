import { useState, useMemo } from 'react'
import { providers, categories } from '../data/providers'
import ProviderCard from '../components/ProviderCard'
import './ResultsPage.css'

const SPECIES_OPTIONS = ['All Species', 'Dogs', 'Cats', 'Birds', 'Exotic']
const SORT_OPTIONS = ['Nearest First', 'Top Rated', 'Open Now First']

export default function ResultsPage({ navigate, searchQuery }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [speciesFilter, setSpeciesFilter] = useState('All Species')
  const [openOnly, setOpenOnly] = useState(false)
  const [sort, setSort] = useState('Top Rated')
  const [mapView, setMapView] = useState(false)

  const filtered = useMemo(() => {
    let list = [...providers]

    if (activeFilter !== 'all') {
      const cat = categories.find(c => c.id === activeFilter)
      if (cat) list = list.filter(p =>
        p.type.toLowerCase().includes(activeFilter) ||
        p.type.toLowerCase().includes(cat.label.toLowerCase().split(' ')[0].toLowerCase())
      )
    }

    if (speciesFilter !== 'All Species') {
      list = list.filter(p => p.species.includes(speciesFilter))
    }

    if (openOnly) list = list.filter(p => p.isOpen)

    if (sort === 'Top Rated') list.sort((a, b) => b.rating - a.rating)
    if (sort === 'Open Now First') list.sort((a, b) => (b.isOpen ? 1 : 0) - (a.isOpen ? 1 : 0))

    return list
  }, [activeFilter, speciesFilter, openOnly, sort])

  return (
    <div className="results-page page-enter">
      {/* Top Bar */}
      <div className="results-topbar glass">
        <div className="results-topbar-inner">
          <button className="btn btn-ghost back-btn" onClick={() => navigate('home')} id="back-btn">
            ← Back
          </button>
          <div className="results-search-pill glass">
            <span>🔍</span>
            <span className="results-query">
              {searchQuery || 'All animal care services'}
            </span>
            <span className="results-location">📍 Bangalore</span>
          </div>
          <button
            className={`btn ${mapView ? 'btn-primary' : 'btn-ghost'} view-toggle`}
            onClick={() => setMapView(v => !v)}
            id="map-toggle-btn"
          >
            {mapView ? '☰ List' : '🗺 Map'}
          </button>
        </div>
      </div>

      <div className="results-layout">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar glass">
          <h3 className="filters-title font-display">Filters</h3>

          <div className="filter-group">
            <label className="filter-label">Category</label>
            <div className="filter-chips">
              <button
                className={`filter-chip ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
                id="filter-all"
              >
                All
              </button>
              {categories.map(c => (
                <button
                  key={c.id}
                  className={`filter-chip ${activeFilter === c.id ? 'active' : ''}`}
                  onClick={() => setActiveFilter(c.id)}
                  id={`filter-${c.id}`}
                >
                  {c.icon} {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Species</label>
            <select
              className="filter-select glass"
              value={speciesFilter}
              onChange={e => setSpeciesFilter(e.target.value)}
              id="species-filter"
            >
              {SPECIES_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Sort By</label>
            <select
              className="filter-select glass"
              value={sort}
              onChange={e => setSort(e.target.value)}
              id="sort-filter"
            >
              {SORT_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-toggle-row">
              <input
                type="checkbox"
                checked={openOnly}
                onChange={e => setOpenOnly(e.target.checked)}
                id="open-now-filter"
              />
              <span className="toggle-track" />
              <span className="filter-label" style={{ margin: 0 }}>Open Now Only</span>
            </label>
          </div>
        </aside>

        {/* Main Content */}
        <main className="results-main">
          <div className="results-count">
            <span className="count-number font-display">{filtered.length}</span>
            <span className="count-text"> providers found</span>
            {openOnly && <span className="badge badge-open" style={{ marginLeft: 8 }}>Open Now</span>}
          </div>

          {mapView ? (
            <div className="map-container glass">
              <div className="map-mock">
                <div className="map-bg" />
                <div className="map-label">📍 Interactive map — Bangalore</div>
                {filtered.slice(0, 4).map((p, i) => (
                  <div
                    key={p.id}
                    className="map-pin"
                    style={{
                      left: `${20 + i * 18}%`,
                      top: `${25 + (i % 2) * 35}%`,
                    }}
                    onClick={() => navigate('provider', p)}
                    id={`map-pin-${p.id}`}
                    title={p.name}
                  >
                    <span className="pin-icon">{p.image}</span>
                    <span className="pin-label">{p.name.split(' ')[0]}</span>
                    {p.isOpen && <span className="pin-dot" />}
                  </div>
                ))}
              </div>
              <div className="map-list-strip">
                {filtered.slice(0, 3).map(p => (
                  <div
                    key={p.id}
                    className="map-strip-card glass-hover"
                    onClick={() => navigate('provider', p)}
                    id={`map-strip-${p.id}`}
                  >
                    <span className="strip-icon">{p.image}</span>
                    <div>
                      <div className="strip-name font-display">{p.name}</div>
                      <div className="strip-meta">{p.distance} • ★{p.rating}</div>
                    </div>
                    {p.isOpen
                      ? <span className="badge badge-open" style={{ marginLeft: 'auto' }}>Open</span>
                      : <span className="badge badge-closed" style={{ marginLeft: 'auto' }}>Closed</span>
                    }
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="cards-grid">
              {filtered.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">🔍</div>
                  <h3 className="font-display">No providers found</h3>
                  <p>Try adjusting your filters</p>
                </div>
              ) : (
                filtered.map((p, i) => (
                  <ProviderCard
                    key={p.id}
                    provider={p}
                    index={i}
                    onClick={(prov) => navigate('provider', prov)}
                  />
                ))
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
