# OctoFit Tracker - React 19 Frontend

A modern React 19 + Vite presentation tier for the OctoFit Tracker multi-tier application.

## Features

- **React 19** with Vite for optimal development experience
- **react-router-dom** for client-side navigation
- **Bootstrap** for responsive UI styling
- **Environment-aware API routing** with GitHub Codespaces support
- **Robust error handling** for API calls

## Setup

### Prerequisites

- Node.js LTS
- npm

### Installation

```bash
npm install
```

### Environment Configuration

1. Copy the environment template:
   ```bash
   cp .env.local.example .env.local
   ```

2. Configure your environment:
   - **For GitHub Codespaces**: Set `VITE_CODESPACE_NAME` to your Codespace name
     ```
     VITE_CODESPACE_NAME=yellow-space-robot-abc123
     ```
   - **For local development**: Leave it unset (will use `http://localhost:8000`)

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## API Integration

The application automatically constructs API endpoints based on the environment:

- **GitHub Codespaces**: `https://{VITE_CODESPACE_NAME}-8000.app.github.dev/api/{resource}/`
- **Local Development**: `http://localhost:8000/api/{resource}/`

The API integration layer (`src/utils/api.ts`) handles:
- Dynamic URL construction
- Safe fallback for undefined environment variables
- Support for both paginated and array-based API responses

## Project Structure

```
src/
├── App.jsx              # Main app with routing configuration
├── main.jsx             # React entry point with Router setup
├── index.css            # Global styles
├── components/
│   ├── Activities.jsx   # Activity tracking view
│   ├── Leaderboard.jsx  # Competitive leaderboard
│   ├── Teams.jsx        # Team management
│   ├── Users.jsx        # User directory
│   └── Workouts.jsx     # Workout plans
└── utils/
    └── api.ts           # API integration utilities
```

## Components

### Dashboard (Home)
- Welcome message
- Application status overview

### Activities
- Displays activity logs
- Supports flexible data field mapping

### Leaderboard
- Competitive rankings
- Points-based scoring

### Teams
- Team information cards
- Member counts

### Users
- User directory
- Role and team assignments

### Workouts
- Workout plan cards
- Duration and description

## API Response Handling

The `normalizeCollection()` function in `src/utils/api.ts` intelligently extracts data from various API response formats:

- Direct arrays: `[{...}, {...}]`
- Paginated responses: `{ results: [...], next: "..." }`
- Named collections: `{ items: [...] }` or `{ data: [...] }`
- Resource-specific keys: `{ users: [...] }` or `{ teams: [...] }`

## Development Notes

- All API calls include proper error handling
- Component state cleanup prevents memory leaks
- Responsive design works across all device sizes
- Bootstrap utility classes for rapid styling
