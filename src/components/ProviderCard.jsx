import './ProviderCard.css'

export default function ProviderCard({ provider, onClick, index = 0 }) {
  const stars = '★'.repeat(Math.floor(provider.rating)) + (provider.rating % 1 >= 0.5 ? '½' : '')

  return (
    <article
      className="provider-card glass glass-hover"
      onClick={() => onClick(provider)}
      style={{ animationDelay: `${index * 60}ms` }}
      id={`provider-card-${provider.id}`}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick(provider)}
      aria-label={`View ${provider.name}`}
    >
      <div className="card-cover" style={{ background: provider.coverColor }}>
        <span className="card-icon">{provider.image}</span>
        <div className="card-badges">
          {provider.isOpen
            ? <span className="badge badge-open">● Open</span>
            : <span className="badge badge-closed">● Closed</span>
          }
          {provider.isEmergency && (
            <span className="badge badge-emergency">🚨 24/7</span>
          )}
        </div>
      </div>

      <div className="card-body">
        <div className="card-meta-row">
          <span className="card-type">{provider.type}</span>
          {provider.isVerified && <span className="badge badge-verified">✓ Verified</span>}
        </div>

        <h3 className="card-name font-display">{provider.name}</h3>
        <p className="card-specialty">{provider.specialty}</p>

        <div className="card-footer">
          <div className="card-rating">
            <span className="stars">{stars}</span>
            <span className="card-rating-value">{provider.rating}</span>
            <span className="card-reviews">({provider.reviews})</span>
          </div>
          <div className="card-distance">
            <span className="distance-icon">📍</span>
            {provider.distance}
          </div>
        </div>

        <div className="card-species">
          {provider.species.slice(0, 3).map(s => (
            <span key={s} className="species-tag">{s}</span>
          ))}
        </div>
      </div>
    </article>
  )
}
