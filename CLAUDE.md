# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `yarn dev` - Start development server with Vite
- `yarn dev:mock` - Start development server with mock data (sets VITE_USE_MOCKS=true)
- `yarn build` - Build for production
- `yarn preview` - Preview production build locally
- `yarn test` - Run Jest tests
- `yarn lint` - Run ESLint on TypeScript/JavaScript files
- `yarn lint:all` - Run ESLint with auto-fix and TypeScript type checking

### Testing and Quality
Always run `yarn lint:all` after making changes to ensure code quality and type safety.

## Architecture Overview

### Technology Stack
- **Frontend**: React 18 with TypeScript
- **Bundler**: Vite
- **UI Library**: Material-UI (MUI) v5 with Emotion for styling
- **Routing**: React Router v6 with HashRouter
- **State Management**: React Context + TanStack Query for server state
- **Blockchain**: Web3.js for Ethereum/BSC interactions
- **Charts**: Lightweight Charts library

### Key Architectural Patterns

#### Context Providers
The app uses multiple context providers for global state:
- `TokensDataProvider` - Manages cryptocurrency token data with mock/real API switching
- `NewsDataProvider` - Handles news data fetching
- `ColorModeContext` - Theme mode (dark/light) management

#### Data Fetching Strategy
- TanStack Query with 5-minute stale time and 10-minute garbage collection
- Environment-based mock data system via `VITE_USE_MOCKS` environment variable
- Mock data files in `/src/mocks/` directory
- Real API calls use dynamic configuration from `getApiConfig()`

#### Component Structure
- Pages in `/src/pages/` with dedicated subdirectories and elements
- Reusable components in `/src/components/` 
- Custom hooks in `/src/hooks/`
- Comprehensive TypeScript interfaces in `/src/utils/types.ts`

### Web3 Integration
The app integrates with blockchain networks (primarily BSC) for:
- Token contract analysis and safety testing
- DEX price checking and trading functionality
- Contract address validation and metadata retrieval
- Custom ABI definitions in `/src/abi/`

### Routing Structure
Uses HashRouter for GitHub Pages compatibility with these main routes:
- `/` - Home dashboard
- `/news` - Cryptocurrency news
- `/biggest-coins` - Market overview with settings
- `/charts` - Trading charts
- `/trending` - Trending cryptocurrencies
- `/top-gainers` - Top gaining tokens
- `/worst-losers` - Worst performing tokens
- `/rug-checker` - Token safety analysis
- `/bsc-sniffer` - BSC contract monitoring
- `/sniper` - Trading automation tools

### Theme System
Material-UI theme with custom dark/light mode switching:
- Theme configuration in `ThemeByMode`
- Persistent theme state via custom hook
- Theme toggle component integrated in app bar

### Build Configuration
- Vite configuration optimized for GitHub Pages deployment
- Base path set to `/cryptools-public/`
- ES2015 target for broader browser compatibility
- Asset chunking and hashing for optimal caching