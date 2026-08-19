# Pokémon Browser - WS101 Prelim Project

A Single Page Application (SPA) built with Vite, TypeScript, and React that fetches Pokémon data from the [PokéAPI](https://pokeapi.co/) and displays it with a beautiful, responsive UI.

## Features

- ✅ **TypeScript Strict Mode** - Full type safety with no `any` types
- ✅ **React 18** - Modern functional components with hooks
- ✅ **Generic Custom Hooks** - `useFetch<T>` with discriminated union state
- ✅ **State Management** - Context API with `useTheme` hook
- ✅ **Responsive Design** - Mobile-friendly grid layout
- ✅ **Search & Filter** - Find Pokémon by name
- ✅ **Dark/Light Theme** - Toggle with local storage persistence
- ✅ **Error Handling** - Proper error states and user feedback

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Vite** | ^5.0.0 | Build tool & dev server |
| **React** | ^18.2.0 | UI library |
| **TypeScript** | ^5.2.0 | Type safety |
| **CSS Modules** | Built-in | Component styling |

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Card.tsx        # Generic card container
│   ├── ItemList.tsx    # Generic list renderer with .map()
│   ├── PokemonCard.tsx # Pokémon display card
│   └── SearchBar.tsx   # Controlled search input
├── hooks/              # Custom React hooks
│   └── useFetch.ts     # Generic data fetching hook
├── contexts/           # React context providers
│   └── ThemeContext.tsx # Theme state management
├── types/              # TypeScript interfaces
│   └── api.ts          # API response type definitions
├── App.tsx             # Root component
├── App.css             # App styling
├── main.tsx            # React entry point
└── index.css           # Global styles
```

## Setup Instructions

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Installation

1. **Clone or download the repository**
   ```bash
   cd "Prelim Project"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

4. **Type checking**
   ```bash
   npm run type-check
   # or
   npx tsc --noEmit
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## API Source

This project uses the [PokéAPI](https://pokeapi.co/) - a free REST API for Pokémon data.

- **Endpoints Used:**
  - `https://pokeapi.co/api/v2/pokemon?limit=50` - Get list of Pokémon
  - `https://pokeapi.co/api/v2/pokemon/{id}` - Get detailed Pokémon data

- **No API key required** - Unlimited free access

## TypeScript Configuration

The project uses strict TypeScript configuration:

```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noFallthroughCasesInSwitch": true
}
```

**Type Safety Features:**
- ✅ No `any` types (uses `unknown` where needed)
- ✅ All props typed with interfaces
- ✅ Generic types on custom hooks
- ✅ Discriminated unions for async state

## Key Components

### `useFetch<T>` Hook
Generic hook for API data fetching with proper async state handling:

```typescript
const state = useFetch<Pokemon>('https://pokeapi.co/api/v2/pokemon/1');
// State type: { status: 'idle' | 'loading' | 'success' | 'error', data?, error? }
```

### `ItemList<T>` Component
Generic list renderer with type-safe `.map()`:

```typescript
<ItemList<Pokemon>
  items={pokemonList}
  renderItem={(pokemon) => <PokemonCard pokemon={pokemon} />}
  keyExtractor={(pokemon) => pokemon.name}
/>
```

### Theme Context
Dark/light mode with persistent storage:

```typescript
const { isDark, toggleTheme } = useTheme();
```

## Development Notes

- **State Management**: Uses React hooks (`useState`, `useContext`, `useFetch`)
- **Styling**: Plain CSS with responsive grid layout
- **Async Patterns**: Discriminated union types for loading/error/success states
- **Accessibility**: Semantic HTML and ARIA-friendly

## Error Handling

The application properly handles:
- Network errors from API
- Loading states with user feedback
- Empty search results
- Invalid Pokémon data

## Performance Optimizations

- Lazy loading with `useFetch` hook
- Memoized filtered results with `useMemo`
- CSS Grid for efficient rendering
- Responsive images

## Academic Integrity Note

This is an educational project. When using this as reference material:
- Understand each component and type definition
- Modify and extend it with your own features
- Add comments explaining the implementation
- Reference the official documentation

## Submission Checklist

- [x] GitHub repository created
- [x] `npm install` works
- [x] `npm run dev` starts dev server
- [x] `npx tsc --noEmit` shows zero errors
- [x] README.md included with setup instructions
- [x] TypeScript strict mode enabled
- [x] All props typed with interfaces
- [x] Generic custom hook (`useFetch<T>`)
- [x] Discriminated union for async state
- [x] At least 3 components with typed props
- [x] API data fetching with loading/error/success
- [x] useContext for theme state management
- [x] Responsive CSS styling

## License

This project is for educational purposes as part of WS101 - Web Systems and Technologies 1.

---

**Created for:** San Pancho College - WS101 Prelim Project  
**Academic Year:** 2026
