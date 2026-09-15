import { useState } from 'react'
import './ProviderPage.css'

const REVIEWS = [
  { author: 'Ananya R.', rating: 5, text: 'Outstanding care for our Labrador. The doctors are incredibly thorough and the facility is spotless. Highly recommend!', date: '2 weeks ago', avatar: '👩' },
  { author: 'Rahul M.', rating: 5, text: 'Had an emergency at midnight — they were immediately available, calm, and professional. Our cat is fully recovered now. Lifesavers!', date: '1 month ago', avatar: '👨' },
  { author: 'Divya K.', rating: 4, text: 'Wonderful staff and very pet-friendly environment. Slightly long wait times but the quality of care makes up for it.', date: '3 weeks ago', avatar: '👩‍🦱' },
]

export default function ProviderPage({ provider, navigate }) {
  const [activeTab, setActiveTab] = useState('about')
  const [bookingOpen, setBookingOpen] = useState(false)

  if (!provider) return (
    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--clr-text-secondary)' }}>
      Provider not found.{' '}
      <button className="btn btn-primary" onClick={() => navigate('results')}>← Back</button>
    </div>
  )

  const stars = '★'.repeat(Math.floor(provider.rating)) + (provider.rating % 1 >= 0.5 ? '½' : '')

  return (
    <div className="provider-page page-enter">
      {/* Hero Cover */}
      <div className="provider-hero" style={{ background: provider.coverColor }}>
        <div className="provider-hero-glow" />
        <button className="btn btn-ghost back-btn-provider" onClick={() => navigate('results')} id="provider-back-btn">
          ← Back to Results
        </button>
        <div className="provider-hero-icon">{provider.image}</div>
      </div>

      <div className="provider-layout">
        {/* Left: Main Content */}
        <div className="provider-main">
          {/* Header */}
          <div className="provider-header glass">
            <div className="provider-header-top">
              <div>
                <div className="provider-meta-row">
                  <span className="provider-type">{provider.type}</span>
                  {provider.isVerified && <span className="badge badge-verified">✓ Verified</span>}
                  {provider.isOpen
                    ? <span className="badge badge-open">● Open Now</span>
                    : <span className="badge badge-closed">● Closed</span>}
                  {provider.isEmergency && <span className="badge badge-emergency">🚨 24/7 Emergency</span>}
                </div>
                <h1 className="provider-name font-display">{provider.name}</h1>
                <p className="provider-specialty">{provider.specialty}</p>
              </div>
            </div>

            <div className="provider-stats-row">
              <div className="pstat">
                <div className="pstat-value font-display">
                  <span className="stars">{stars}</span> {provider.rating}
                </div>
                <div className="pstat-label">{provider.reviews} reviews</div>
              </div>
              <div className="pstat-divider" />
              <div className="pstat">
                <div className="pstat-value font-display">📍 {provider.distance}</div>
                <div className="pstat-label">{provider.address}</div>
              </div>
              <div className="pstat-divider" />
              <div className="pstat">
                <div className="pstat-value font-display">🕐</div>
                <div className="pstat-label">{provider.timings}</div>
              </div>
              <div className="pstat-divider" />
              <div className="pstat">
                <div className="pstat-value font-display">{provider.fee}</div>
                <div className="pstat-label">Consultation fee</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="provider-tabs glass">
            {['about', 'services', 'reviews', 'records'].map(tab => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
                id={`tab-${tab}`}
              >
                {tab === 'about' && '📋 About'}
                {tab === 'services' && '⚕️ Services'}
                {tab === 'reviews' && '⭐ Reviews'}
                {tab === 'records' && '📄 Medical Records'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tab-content glass" key={activeTab}>
            {activeTab === 'about' && (
              <div className="tab-panel page-enter">
                <p className="about-text">{provider.about}</p>
                <div className="species-section">
                  <h4 className="section-mini-title font-display">Species We Treat</h4>
                  <div className="species-list">
                    {provider.species.map(s => (
                      <span key={s} className="species-pill">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="tab-panel page-enter">
                <div className="services-grid">
                  {provider.services.map((s, i) => (
                    <div key={i} className="service-item glass">
                      <span className="service-check">✓</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-panel page-enter">
                <div className="reviews-list">
                  {REVIEWS.map((r, i) => (
                    <div key={i} className="review-card">
                      <div className="review-header">
                        <span className="review-avatar">{r.avatar}</span>
                        <div>
                          <div className="review-author font-display">{r.author}</div>
                          <div className="review-date">{r.date}</div>
                        </div>
                        <div className="review-stars stars">{'★'.repeat(r.rating)}</div>
                      </div>
                      <p className="review-text">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'records' && (
              <div className="tab-panel page-enter">
                <div className="records-upload-area" onClick={() => navigate('ai-reader')} id="upload-records-btn">
                  <div className="upload-icon">✨</div>
                  <h3 className="font-display">AI Medical Record Reader</h3>
                  <p>Upload your pet's prescription or lab report — our AI will extract and summarise key health information.</p>
                  <button className="btn btn-primary" style={{ marginTop: 'var(--sp-md)' }}>
                    Upload Records →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Action Sidebar */}
        <aside className="provider-sidebar">
          <div className="action-card glass">
            <button
              className="btn btn-primary action-btn"
              onClick={() => setBookingOpen(true)}
              id="book-appointment-btn"
            >
              📅 Book Appointment
            </button>
            <a
              href={`tel:${provider.phone}`}
              className="btn btn-ghost action-btn"
              id="call-provider-btn"
            >
              📞 {provider.phone}
            </a>
            <button
              className="btn btn-ghost action-btn"
              id="get-directions-btn"
            >
              🗺 Get Directions
            </button>
            <button
              className="btn btn-ghost action-btn"
              onClick={() => navigate('ai-reader')}
              id="upload-records-sidebar-btn"
            >
              ✨ Upload Medical Records
            </button>
          </div>

          <div className="map-mini glass">
            <div className="map-mini-mock">
              <div className="map-mini-bg" />
              <div className="map-mini-pin">{provider.image}</div>
              <div className="map-mini-label">
                <span>📍</span> {provider.address}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Booking Modal */}
      {bookingOpen && (
        <div className="modal-overlay" onClick={() => setBookingOpen(false)} id="booking-modal-overlay">
          <div className="modal glass" onClick={e => e.stopPropagation()} id="booking-modal">
            <button className="modal-close" onClick={() => setBookingOpen(false)}>✕</button>
            <h2 className="font-display modal-title">Book Appointment</h2>
            <p className="modal-subtitle">at {provider.name}</p>

            <div className="form-group">
              <label className="form-label">Pet Name</label>
              <input id="pet-name-input" className="form-input glass" type="text" placeholder="e.g. Bruno" />
            </div>
            <div className="form-group">
              <label className="form-label">Species</label>
              <select id="pet-species-input" className="form-input glass">
                {provider.species.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Preferred Date</label>
              <input id="appt-date-input" className="form-input glass" type="date" />
            </div>
            <div className="form-group">
              <label className="form-label">Reason for Visit</label>
              <textarea id="visit-reason-input" className="form-input glass" rows={3} placeholder="Briefly describe the concern…" />
            </div>
            <div className="form-group">
              <label className="form-label">Your Phone</label>
              <input id="phone-input" className="form-input glass" type="tel" placeholder="+91 98765 43210" />
            </div>
            <button className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--sp-md)' }} id="confirm-booking-btn"
              onClick={() => { alert('✅ Appointment request sent! The clinic will confirm via SMS.'); setBookingOpen(false); }}>
              Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
