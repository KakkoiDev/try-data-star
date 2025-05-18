# Data-Star

A lightweight framework using server-sent events (SSE) for dynamic UI updates without page reloads.

## Features
- Real-time UI updates via SSE
- HTML fragment merging
- Client-side signal management
- Web Components for UI

## Quick Start
```bash
# Install dependencies
bun install

# Start server
bun run start

# Initialize database (first time)
bun run db:setup

# Seed database (optional)
bun run db:seed
```

## Project Structure
- `/components` - Web components (main.ts, navbar.ts)
- `/public` - Static assets (client.js, style.css)
- `/lib` - Server utilities
- `/db` - Database files
- `index.ts` - Server entry point

## Routes
- `/` - Home page
- `/home` - Displays user data
- `/about` - About page 