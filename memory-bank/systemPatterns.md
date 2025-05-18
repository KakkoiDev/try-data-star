# System Patterns: Try Data-Star

## Architecture Overview
Try Data-Star follows a server-centric architecture that prioritizes server rendering while enabling client-side interactivity where needed. The system is built around BunJS for server-side operations and Data-Star for both server and client components.

```
┌─────────────────┐       ┌─────────────────┐
│                 │       │                 │
│    BunJS        │◄──────┤  Client Browser │
│    Server       │       │                 │
│                 │──────►│                 │
└─────────────────┘       └─────────────────┘
        │                         ▲
        │                         │
        ▼                         │
┌─────────────────┐               │
│                 │               │
│   Data-Star     │───────────────┘
│   Components    │
│                 │
└─────────────────┘
```

## Core Design Patterns

### Server-First Rendering
- Components are primarily rendered on the server
- Server sends both HTML and Web Components to the client (not just traditional HTML elements)
- Only interactive elements require client-side JavaScript

### Component Architecture
- Web Components are used for UI encapsulation
- Components are organized by functionality
- Root-level folders represent major modules/components

### UI Swapping Pattern
- Main content areas can be swapped without full page reloads
- Navigation triggers content replacement in designated areas
- Preserves SPA-like experience without complex state management

### Shadow DOM vs Light DOM Usage
- Primary preference is to use Light DOM wherever possible:
  - Easier to style
  - Allows easier manipulation with Data-Star from the outside
  - Better integration with server-side rendering
- Shadow DOM is used selectively when necessary:
  - Primarily when working with server-sent components that need props
  - When strong encapsulation is absolutely required
- Current approach is to find the minimal necessary use of Shadow DOM while maximizing Light DOM benefits

## Component Relationships

```
┌────────────────────────────────────────┐
│              Application               │
└────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│     Navbar      │    │      Main       │
│   Component     │    │    Component    │
└─────────────────┘    └─────────────────┘
        │                       │
        ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│  Navigation     │    │   Dynamic       │
│     Items       │    │   Content       │
└─────────────────┘    └─────────────────┘
```

## Data Flow
1. Server receives request
2. Server renders appropriate components based on route
3. Components are sent to client with initial props
4. Client hydrates components where needed
5. User interactions may trigger @get and other Data-Star features
6. Content is updated without full page reload

## Technical Decisions

### DOM Strategy Challenges
- Light DOM is preferred for most cases due to easier styling and Data-Star integration
- Shadow DOM is necessary in specific cases for server-sent components with props
- Seeking the optimal minimal-Shadow DOM approach that maintains component functionality while maximizing Light DOM benefits

### Component Communication
- Focus on establishing clear patterns for how components communicate
- Server-side props initialization with client-side interactivity
- Minimize direct component-to-component dependencies

## Performance Considerations
- Server rendering reduces time to first contentful paint
- Minimal client-side JavaScript improves load times
- Selective component hydration reduces unnecessary processing 