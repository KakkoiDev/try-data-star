# Data-Star

A lightweight, server-sent events (SSE) based web application framework built with Bun. Data-Star enables dynamic UI updates through server-sent events without requiring a full page reload.

## Features

- Real-time UI updates via Server-Sent Events (SSE)
- HTML fragment merging into the DOM
- Client-side signal management
- Lightweight and performant
- Built with TypeScript
- Uses Web Components for modular UI

## Prerequisites

- [Bun](https://bun.sh/) runtime

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   bun install
   ```
3. Start the development server:
   ```
   bun run start
   ```
4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `/comp` - Frontend components and assets
  - `index.html` - Main HTML template
  - `client.js` - Client-side entry point
  - `main.ts` - Main component definition
  - `navbar.ts` - Navigation component
  - `style.css` - Global styles
- `/lib` - Server-side libraries
  - `serverSentEventGenerator.ts` - SSE implementation
  - `abstractServerSentEventGenerator.ts` - Base SSE functionality
- `index.ts` - Server entry point
- `types.ts` - TypeScript type definitions
- `consts.ts` - Constants and configurations

## How It Works

Data-Star uses Server-Sent Events to establish a one-way connection from the server to the client. When a user navigates to a route, the server streams HTML fragments that are merged into the DOM without a full page reload.

The framework handles:
- HTML fragment merging
- DOM manipulation
- Script execution
- Signal management

## Routes

- `/` - Home page with default content
- `/home` - Home page content
- `/about` - About page content

## Technologies

- [Bun](https://bun.sh/) - JavaScript runtime and toolkit
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) - Custom HTML elements
- [Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) - Real-time server updates

## License

MIT 