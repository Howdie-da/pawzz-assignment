import { useState } from 'react'
import './SOSButton.css'

const EMERGENCY_PROVIDERS = [
  {
    name: 'PetCare 24/7 Veterinary Hospital',
    type: '24/7 Emergency ICU',
    distance: '0.8 km',
    phone: '+91 98450 12345',
    address: 'HSR Layout, Bangalore',
    eta: '5 mins',
  },
  {
    name: 'Swift Paws Pet Ambulance',
    type: 'Mobile Oxygen & ICU Unit',
    distance: '3.2 km',
    phone: '+91 90000 PAWS1',
    address: 'BTM Layout, Bangalore',
    eta: '12 mins',
  },
]

const FIRST_AID_TIPS = [
  {
    id: 'poison',
    icon: '🍫',
    title: 'Toxin / Poison',
    action: 'Do NOT induce vomiting unless instructed by a vet. Note what was ingested and bring the packaging immediately.',
  },
  {
    id: 'bleeding',
    icon: '🩸',
    title: 'Severe Bleeding',
    action: 'Apply firm, continuous pressure with a clean cloth or towel for 5 minutes. Keep pet warm and calm during transit.',
  },
  {
    id: 'heatstroke',
    icon: '☀️',
    title: 'Heatstroke / Panting',
    action: 'Apply cool (never ice-cold) water to foot pads, groin, and neck. Fan immediately and rush to air-conditioned clinic.',
  },
  {
    id: 'choking',
    icon: '🦴',
    title: 'Choking / Gagging',
    action: 'Look in mouth gently; sweep finger only if object is clearly visible. Elevate hindquarters slightly to assist dislodging.',
  },
]

export default function SOSButton() {
  const [modalOpen, setModalOpen] = useState(false)
  const [ambulanceDispatched, setAmbulanceDispatched] = useState(false)
  const [copiedLocation, setCopiedLocation] = useState(false)
  const [selectedTip, setSelectedTip] = useState(FIRST_AID_TIPS[0].id)

  const handleDispatchAmbulance = () => {
    setAmbulanceDispatched(true)
  }

  const handleCopyLocation = () => {
    navigator.clipboard?.writeText?.('12.9352° N, 77.6245° E (HSR Layout, Bangalore)')
    setCopiedLocation(true)
    setTimeout(() => setCopiedLocation(false), 3000)
  }

  return (
    <>
      {/* Floating SOS Trigger */}
      <div className="sos-wrapper">
        <button
          className="sos-btn"
          onClick={() => setModalOpen(true)}
          id="sos-button"
          aria-label="Emergency Animal SOS 24/7"
          title="Emergency Animal Care 24/7"
        >
          <span className="sos-ring sos-ring-1" />
          <span className="sos-ring sos-ring-2" />
          <span className="sos-inner">
            <span className="sos-emoji">🆘</span>
            <span className="sos-label">SOS</span>
          </span>
        </button>
        <div className="sos-pill-badge" onClick={() => setModalOpen(true)}>
          <span className="sos-pill-dot" />
          <span>24/7 EMERGENCY</span>
        </div>
      </div>

      {/* Emergency Action Hub Modal */}
      {modalOpen && (
        <div className="sos-modal-overlay" onClick={() => setModalOpen(false)}>
          <div
            className="sos-modal glass"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            id="emergency-modal"
          >
            {/* Caution Hazard Top Tape */}
            <div className="sos-hazard-bar font-display">
              ⚠️ EMERGENCY ANIMAL RESPONSE • BANGALORE ⚠️
            </div>

            <button
              className="sos-close-btn"
              onClick={() => setModalOpen(false)}
              aria-label="Close emergency modal"
            >
              ✕
            </button>

            <div className="sos-modal-content">
              {/* Header Title */}
              <div className="sos-header">
                <div className="sos-header-icon">🚨</div>
                <div>
                  <h2 className="sos-modal-title font-display">Animal Care Emergency Hub</h2>
                  <p className="sos-modal-subtitle">
                    Instant dispatch, 24/7 ICU hotlines & critical first-aid guidance.
                  </p>
                </div>
              </div>

              {/* Primary Direct Ambulance Call CTA */}
              <div className="sos-action-banner">
                <div className="sos-banner-info">
                  <span className="sos-banner-badge">FASTEST RESPONSE</span>
                  <div className="sos-banner-title font-display">
                    Bangalore Pet Ambulance & ICU Hotline
                  </div>
                  <div className="sos-banner-eta">⚡ Paravet unit on standby • 18 min avg response</div>
                </div>
                <a
                  href="tel:+919000072971"
                  className="btn btn-accent sos-banner-call font-display"
                  id="sos-call-ambulance"
                >
                  📞 Call Ambulance Now
                </a>
              </div>

              {/* One-Tap GPS Dispatch Button */}
              <div className="sos-dispatch-box">
                {!ambulanceDispatched ? (
                  <div className="sos-dispatch-prompt">
                    <div>
                      <div className="sos-dispatch-title font-display">
                        📍 Auto-Dispatch to Current Location
                      </div>
                      <div className="sos-dispatch-sub">
                        Sends your live GPS coordinates to nearest available unit
                      </div>
                    </div>
                    <button
                      className="btn btn-primary sos-dispatch-btn font-display"
                      onClick={handleDispatchAmbulance}
                      id="sos-auto-dispatch-btn"
                    >
                      🚑 Dispatch to Me
                    </button>
                  </div>
                ) : (
                  <div className="sos-dispatch-active">
                    <div className="sos-active-icon">📡</div>
                    <div className="sos-active-text">
                      <div className="sos-active-title font-display">
                        ✅ Ambulance Dispatched (Unit #BLR-4)
                      </div>
                      <div className="sos-active-sub">
                        En route from BTM Layout • Driver will call you within 2 minutes.
                      </div>
                    </div>
                    <div className="sos-eta-badge font-display">ETA: 9 MIN</div>
                  </div>
                )}
              </div>

              {/* Nearest 24/7 Clinics List */}
              <div className="sos-section">
                <h3 className="sos-section-title font-display">🏥 Nearest 24/7 Verified Emergency Centers</h3>
                <div className="sos-providers-list">
                  {EMERGENCY_PROVIDERS.map((p, i) => (
                    <div key={i} className="sos-provider-card">
                      <div className="sos-prov-info">
                        <div className="sos-prov-name font-display">{p.name}</div>
                        <div className="sos-prov-meta">
                          <span className="sos-prov-type">{p.type}</span> •{' '}
                          <span className="sos-prov-dist">📍 {p.distance}</span> ({p.eta} away)
                        </div>
                        <div className="sos-prov-addr">{p.address}</div>
                      </div>
                      <a
                        href={`tel:${p.phone}`}
                        className="btn btn-ghost sos-prov-call-btn font-display"
                        id={`sos-call-provider-${i}`}
                      >
                        📞 Call {p.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* 30-Second Life Saving First Aid Guide */}
              <div className="sos-section">
                <h3 className="sos-section-title font-display">
                  🩹 Immediate First Aid (While Waiting)
                </h3>
                <div className="sos-first-aid-tabs">
                  {FIRST_AID_TIPS.map((tip) => (
                    <button
                      key={tip.id}
                      className={`sos-tab-btn ${selectedTip === tip.id ? 'active' : ''}`}
                      onClick={() => setSelectedTip(tip.id)}
                    >
                      <span>{tip.icon}</span>
                      <span className="font-display">{tip.title}</span>
                    </button>
                  ))}
                </div>
                <div className="sos-first-aid-card">
                  <div className="sos-fa-icon">
                    {FIRST_AID_TIPS.find((t) => t.id === selectedTip)?.icon}
                  </div>
                  <div className="sos-fa-text">
                    <div className="sos-fa-heading font-display">
                      {FIRST_AID_TIPS.find((t) => t.id === selectedTip)?.title} Instructions:
                    </div>
                    <p>{FIRST_AID_TIPS.find((t) => t.id === selectedTip)?.action}</p>
                  </div>
                </div>
              </div>

              {/* Share Location Helper */}
              <div className="sos-footer-actions">
                <button
                  className="btn btn-ghost sos-loc-btn font-display"
                  onClick={handleCopyLocation}
                  id="sos-copy-gps-btn"
                >
                  {copiedLocation ? '✅ GPS Coordinates Copied!' : '📍 Copy GPS Location for Driver / Rescuer'}
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setModalOpen(false)}
                  id="sos-exit-modal-btn"
                >
                  Back to App
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
