export async function fetchPokemonDescription(pokemonName: string): Promise<string> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
    if (!response.ok) return 'No description available'
    
    const data = await response.json()
    
    // Get the first English flavor text
    const flavorText = data.flavor_text_entries?.find(
      (entry: any) => entry.language?.name === 'en'
    )?.flavor_text
    
    if (flavorText) {
      return flavorText.replace(/\f/g, ' ').replace(/\n/g, ' ').trim()
    }
    
    return data.description || 'No description available'
  } catch (error) {
    return 'No description available'
  }
}
