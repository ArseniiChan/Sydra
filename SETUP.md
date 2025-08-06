# Sydra Development Setup Guide
> Custom Front-End Interface for ECAM 3D Printer (Duet Integration)

**Team:** Ahnaf, Arsenii, Kyame  
**Timeline:** 2 weeks  
**Tech Stack:** React + TypeScript + Tailwind CSS v4

## Prerequisites

### Required Software
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/) 
- **VSCode** - [Download here](https://code.visualstudio.com/)

### Recommended VSCode Extensions
Install these extensions for optimal development:
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Auto Rename Tag
- Prettier - Code formatter
- ESLint

## Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/ArseniiChan/Sydra.git
cd Sydra
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Tailwind CSS
Update `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Replace content in `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. Start Development Server
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

## Development Workflow

### Branch Strategy
- `main` - Production ready code
- `develop` - Integration branch
- `feature/feature-name` - Individual features

### Creating a New Feature
```bash
# Create and switch to feature branch
git checkout -b feature/temperature-control

# Make your changes, then commit
git add .
git commit -m "Add temperature control component"

# Push your branch
git push origin feature/temperature-control

# Create Pull Request on GitHub
```

### Code Standards
- Use TypeScript for all components
- Follow React functional component patterns
- Use Tailwind CSS for styling
- Write descriptive commit messages
- Test components before pushing

## Project Structure
```
sydra/
├── src/
│   ├── components/
│   │   ├── controls/          # Temperature, motor controls
│   │   ├── monitoring/        # Real-time displays
│   │   └── common/           # Shared components
│   ├── hooks/                # Custom React hooks
│   ├── services/
│   │   ├── duetAPI.ts        # HTTP API functions
│   │   └── websocket.ts      # WebSocket connection
│   ├── stores/               # Zustand state stores
│   ├── types/                # TypeScript definitions
│   └── utils/                # Helper functions
├── public/                   # Static assets
└── docs/                     # Documentation
```

## Key Technologies
- **React 18** with TypeScript
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **Zustand** (state management)
- **React Query** (API state)
- **Axios** (HTTP requests)
- **WebSocket** (real-time communication)

## Duet Board Integration
- API Documentation: https://docs.duet3d.com/
- WebSocket endpoint: `ws://[printer-ip]/rr_connect`
- HTTP API: `http://[printer-ip]/rr_gcode?gcode=[command]`

## Common Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run type checking
npm run type-check

# Format code
npm run format
```

## Team Communication
- **Daily standups**: 15 min check-ins
- **GitHub Issues**: Track bugs and features
- **Pull Requests**: Code review required
- **Discord/Slack**: [Add your team communication channel]

## Troubleshooting

### Port Already in Use
```bash
# Kill process using port 5173
sudo lsof -t -i tcp:5173 | xargs kill -9
```

### Node Modules Issues
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Git Issues
```bash
# Reset to latest main
git fetch origin
git reset --hard origin/main
```

## Getting Help
1. Check this documentation first
2. Ask in team chat
3. Create GitHub issue for bugs
4. Check Duet documentation for hardware issues

---

**Ready to start developing? Run `npm run dev` and visit http://localhost:5173**