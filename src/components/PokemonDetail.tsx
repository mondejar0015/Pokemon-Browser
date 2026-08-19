import { Pokemon } from '../types/api'
import './PokemonDetail.css'

interface PokemonDetailProps {
  pokemon: Pokemon
  onClose: () => void
}

export function PokemonDetail({ pokemon, onClose }: PokemonDetailProps) {
  const primaryType = pokemon.types[0]?.type.name || 'unknown'

  return (
    <div className="pokemon-detail-overlay" onClick={onClose}>
      <div className="pokemon-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="detail-close-btn" onClick={onClose}>✕</button>
        
        <div className="detail-header">
          <div className="detail-image-container">
            {pokemon.sprites.front_default && (
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="detail-image"
              />
            )}
          </div>
          <div className="detail-title-section">
            <h2 className="detail-name">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h2>
            <div className="detail-id-badge">#{pokemon.id}</div>
            <span className={`detail-type-badge pokemon-type-badge-${primaryType}`}>
              {primaryType}
            </span>
          </div>
        </div>

        <div className="detail-content">
          <section className="detail-section">
            <h3>Basic Info</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Height:</span>
                <span className="detail-value">{(pokemon.height / 10).toFixed(1)}m</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Weight:</span>
                <span className="detail-value">{(pokemon.weight / 10).toFixed(1)}kg</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Experience:</span>
                <span className="detail-value">{pokemon.base_experience}</span>
              </div>
            </div>
          </section>

          {pokemon.types.length > 0 && (
            <section className="detail-section">
              <h3>Types</h3>
              <div className="detail-types-list">
                {pokemon.types.map((t) => (
                  <span
                    key={t.slot}
                    className={`pokemon-type-badge pokemon-type-badge-${t.type.name}`}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {pokemon.abilities && pokemon.abilities.length > 0 && (
            <section className="detail-section">
              <h3>Abilities</h3>
              <ul className="detail-abilities-list">
                {pokemon.abilities.map((ability) => (
                  <li key={ability.ability.name}>
                    <span className="ability-name">
                      {ability.ability.name.replace('-', ' ')}
                    </span>
                    {ability.is_hidden && <span className="hidden-badge">Hidden</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {pokemon.stats && pokemon.stats.length > 0 && (
            <section className="detail-section">
              <h3>Stats</h3>
              <div className="detail-stats">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="stat-bar-container">
                    <span className="stat-name">
                      {stat.stat.name.replace('-', ' ').toUpperCase()}
                    </span>
                    <div className="stat-bar">
                      <div
                        className="stat-bar-fill"
                        style={{ width: `${Math.min((stat.base_stat / 150) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="stat-value">{stat.base_stat}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
