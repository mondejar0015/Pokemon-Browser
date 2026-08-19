import { Pokemon } from '../types/api'
import { Card } from './Card'
import './PokemonCard.css'

interface PokemonCardProps {
  pokemon: Pokemon
  onClick?: () => void
}

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const primaryType = pokemon.types[0]?.type.name || 'unknown'

  return (
    <Card onClick={onClick} className={`pokemon-card pokemon-type-${primaryType}`}>
      <div className="pokemon-card-content">
        {pokemon.sprites.front_default && (
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="pokemon-image"
          />
        )}
        <h3 className="pokemon-name">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h3>
        <div className="pokemon-meta">
          <span className="pokemon-id">#{pokemon.id}</span>
          <span className={`pokemon-type pokemon-type-badge-${primaryType}`}>
            {primaryType}
          </span>
        </div>
        <div className="pokemon-stats">
          <div className="stat">
            <span className="stat-label">Height:</span>
            <span className="stat-value">{pokemon.height / 10}m</span>
          </div>
          <div className="stat">
            <span className="stat-label">Weight:</span>
            <span className="stat-value">{pokemon.weight / 10}kg</span>
          </div>
        </div>
        <button className="view-details-btn">View Details</button>
      </div>
    </Card>
  )
}
