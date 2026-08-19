import './TypeFilter.css'

interface TypeFilterProps {
  types: string[]
  selectedType: string | null
  onTypeSelect: (type: string | null) => void
}

export function TypeFilter({ types, selectedType, onTypeSelect }: TypeFilterProps) {
  return (
    <div className="type-filter">
      <div className="type-filter-label">Filter by Type:</div>
      <div className="type-filter-buttons">
        <button
          className={`type-filter-btn type-filter-all ${selectedType === null ? 'active' : ''}`}
          onClick={() => onTypeSelect(null)}
        >
          All Types
        </button>
        {types.map((type) => (
          <button
            key={type}
            className={`type-filter-btn pokemon-type-badge-${type} ${selectedType === type ? 'active' : ''}`}
            onClick={() => onTypeSelect(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  )
}
