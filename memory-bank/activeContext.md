# Active Context: Try Data-Star

## Current Focus
The project is currently focused on developing the dashboard's main component architecture, specifically:
1. Improving the navbar component that switches elements in the main component
2. Enhancing the main component to accept title props from the server
3. Enabling Data-Star features (like @get) inside the main component
4. Resolving the balance between Shadow DOM and Light DOM approaches
5. Implementing TypeScript support through type annotation stripping

## Current Implementation
Based on recent code examination:

- **Main Component**: Currently using a hybrid approach with Shadow DOM for styling encapsulation but Light DOM for title elements that need Data-Star access
- **Navbar Component**: Using Light DOM with Data-Star @get events for navigation
- **Server**: BunJS server serving components and handling routes with ServerSentEventGenerator

## Recent Changes
- Initial implementation of navbar component
- Basic dashboard structure established
- Server rendering setup with BunJS
- Database connection with SQLite
- Hybrid DOM approach in the main component
- Shift in TypeScript strategy to favor type annotation stripping over transpilation

## Active Technical Challenges

### Main Component Implementation
The primary challenge is making the main component work effectively with both server-side rendering and client-side Data-Star features. Specifically:

**Shadow DOM Challenges:**
- Currently using a hybrid approach where some elements are in Light DOM but attached to Shadow DOM slots
- Need to further refine this pattern to ensure Data-Star features work consistently

**Light DOM Preferences:**
- The preference is to use Light DOM more extensively as it makes styling and Data-Star integration easier
- Currently exploring how to minimize Shadow DOM usage while maintaining component structure
- Light DOM makes handling props from the server easier but requires careful handling of styling

### TypeScript Strategy
- Investigating if Bun can strip TypeScript type annotations at runtime (similar to Node.js)
- This approach would maintain zero-build philosophy while providing type safety during development
- Only pursuing transpilation as a fallback if type stripping isn't feasible

## Decision Points
1. **DOM Strategy**: Moving toward Light DOM preference with minimal Shadow DOM usage
2. **Component Props**: Establish patterns for passing props from server to components
3. **State Management**: Define how state should be managed between server and client
4. **Data-Star Integration**: Resolve how to best integrate Data-Star features in components
5. **TypeScript Strategy**: Determine if Bun can strip type annotations at runtime without a build step

## Upcoming Work

### Short-term Tasks
1. Complete the main component implementation with title props support
2. Resolve Data-Star @get functionality inside the main component
3. Improve the interaction between navbar and main component
4. Implement basic styling system
5. Establish SQLite data access patterns
6. Research and implement TypeScript type annotation stripping with Bun

### Medium-term Goals
1. Establish testing framework with Jest (unit/integration) and Playwright (e2e)
2. Create additional dashboard components
3. Implement more complex server-client data flows
4. Document component patterns and best practices
5. Set up K6 for performance testing

## Questions to Resolve
- What's the best approach to balance Shadow DOM encapsulation with Data-Star features?
- How to efficiently pass props from server to client components?
- What patterns should be established for component communication?
- Does Bun provide a mechanism to strip TypeScript annotations at runtime without a build step? 