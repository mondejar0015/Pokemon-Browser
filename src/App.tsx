import { useState, useMemo, useEffect } from 'react'
import { useFetch } from './hooks/useFetch'
import { PokemonListResponse, Pokemon } from './types/api'
import { SearchBar } from './components/SearchBar'
import { ItemList } from './components/ItemList'
import { PokemonCard } from './components/PokemonCard'
import { PokemonDetail } from './components/PokemonDetail'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import './App.css'

function AppContent() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [isLoadingDetails, setIsLoadingDetails] = useState<boolean>(false)
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
  const { isDark, toggleTheme } = useTheme()

  // Fetch initial Pokemon list
  const pokemonListState = useFetch<PokemonListResponse>(
    'https://pokeapi.co/api/v2/pokemon?limit=151'
  )

  // Fetch detailed Pokemon data after initial list is loaded
  useEffect(() => {
    if (pokemonListState.status === 'success' && pokemonListState.data) {
      setIsLoadingDetails(true)
      Promise.all(
        pokemonListState.data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        )
      )
        .then((data: Pokemon[]) => {
          setPokemonList(data)
          setIsLoadingDetails(false)
        })
        .catch(() => {
          setIsLoadingDetails(false)
        })
    }
  }, [pokemonListState.status])

  // Filter Pokemon based on search term
  const filteredPokemon = useMemo(() => {
    if (!searchTerm.trim()) return pokemonList
    return pokemonList.filter((pokemon: Pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [pokemonList, searchTerm])

  const isLoading = pokemonListState.status === 'loading' || isLoadingDetails
  const isError = pokemonListState.status === 'error'

  return (
    <div className={`app ${isDark ? 'dark-mode' : 'light-mode'}`}>
      <header className="app-header">
        <h1>🔍 Pokémon Browser</h1>
        <button onClick={toggleTheme} className="theme-toggle">
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </header>

      <main className="app-main">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search Pokémon by name..."
        />

        {isLoading && <div className="loading">Loading Pokémon...</div>}

        {isError && pokemonListState.status === 'error' && (
          <div className="error">
            Error loading Pokémon: {pokemonListState.error?.message}
          </div>
        )}

        {pokemonListState.status === 'success' && (
          <>
            <ItemList<Pokemon>
              items={filteredPokemon}
              renderItem={(pokemon) => (
                <PokemonCard pokemon={pokemon} onClick={() => setSelectedPokemon(pokemon)} />
              )}
              keyExtractor={(pokemon) => pokemon.id}
              emptyMessage="No Pokémon found matching your search."
            />
            {selectedPokemon && (
              <PokemonDetail pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
