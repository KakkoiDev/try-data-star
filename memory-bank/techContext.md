# Technical Context: Try Data-Star

## Core Technologies

### Backend
- **BunJS**: Fast JavaScript runtime used for server operations
  - GitHub: [https://github.com/oven-sh/bun](https://github.com/oven-sh/bun)
- **Data-Star**: Framework used for both server-side and client-side functionality
  - GitHub: [https://github.com/starfederation/datastar](https://github.com/starfederation/datastar)
- **SQLite**: Database for storage with minimal setup requirements
  - GitHub: [https://github.com/sqlite/sqlite](https://github.com/sqlite/sqlite)

### Frontend
- **HTML/CSS/JS**: Standard web technologies for UI development
- **Web Components**: Native component system for encapsulation
- **Shadow DOM / Light DOM**: DOM encapsulation techniques

## Development Environment

### Tools
- **Biome**: Used for linting and formatting
  - GitHub: [https://github.com/biomejs/biome](https://github.com/biomejs/biome)
- **Sonar Qube**: Used for code smell detection
  - GitHub: [https://github.com/SonarSource/sonarqube](https://github.com/SonarSource/sonarqube)
- **Bun**: Package management and server runtime
  - GitHub: [https://github.com/oven-sh/bun](https://github.com/oven-sh/bun)
- **Jest**: For unit and integration testing
  - GitHub: [https://github.com/jestjs/jest](https://github.com/jestjs/jest)
- **Playwright**: Planned for end-to-end testing
  - GitHub: [https://github.com/microsoft/playwright](https://github.com/microsoft/playwright)
- **K6**: For performance testing
  - GitHub: [https://github.com/grafana/k6](https://github.com/grafana/k6)

### AI Documentation Access
For easier access to documentation via AI assistants, consider using:
- gitmcp.io for setting up MCP servers to integrate with the documentation
- This allows AI agents like Claude to directly search and access relevant documentation
- Note: As an AI assistant, I don't have direct internet access to perform searches independently. To enable online searches:
  1. Use the web_search tool provided within Cursor
  2. Consider setting up a documentation MCP that can be queried directly
  3. For Data-Star and Bun documentation, use the specialized MCPs already available in Cursor

### Commands
Key commands are available in the package.json file, including:
- Development server startup
- Testing
- Building

## Technical Constraints

### Simplicity Focus
- Minimal external dependencies
- Focus on standard web technologies
- **Zero Build Process**: Complete avoidance of build processes
- Aiming for direct execution without transpilation or bundling

### Server Rendering Priority
- Components should be designed for server rendering first
- Client-side hydration should be selective and minimal

### DOM Challenges
- Balancing Shadow DOM encapsulation with Light DOM prop handling
- Finding optimal solutions for Data-Star features like @get inside components

### TypeScript Considerations
- Goal: Write components in TypeScript for type safety
- Primary Approach: Investigate if Bun can strip TS type annotations at runtime (similar to Node.js) without full transpilation
  - Check if Bun provides a native type-stripping mechanism
  - This would be the simplest approach that maintains zero-build philosophy
- Fallback Approach: Configure Bun to transpile TS files to JS on the fly before serving
  - Only pursue if type-stripping isn't feasible
  - Aim to keep this process invisible to developers
- Priority: Maintain developer experience with TypeScript while avoiding build steps

## Testing Strategy

### Unit Testing
- Component-level testing for core functionality
- Server-side unit tests for API endpoints and services
- Using Jest for both unit and integration testing

### Integration Testing
- Testing component interactions with Jest
- API integration testing
- Focus on key component interactions

### End-to-End Testing
- Playwright will be used for browser testing
- Full user flow testing on critical paths

### Performance Testing
- K6 for load testing and performance benchmarking
- Measure server response times and component rendering performance
- Establish performance baselines and monitor improvements

## Database Strategy
- SQLite for data storage
- Minimal setup requirements
- Focus on simple queries and direct access
- No ORM to keep complexity low

## Deployment

Deployment strategy is not yet determined, but will likely follow these principles:
- Simple deployment process
- No build step requirements
- Easy configuration
- Direct serving of files

## Dependencies

The project aims to have minimal external dependencies, following these guidelines:
- Use built-in capabilities when possible
- Carefully evaluate any proposed new dependencies
- Prefer smaller, focused libraries when external code is needed

## Code Standards

### Style Guidelines
- Biome for consistent code formatting
- Sonar Qube for code quality monitoring

### Architecture Guidelines
- Follow web component best practices
- Maintain clear separation between server and client concerns
- Ensure components are reusable and maintainable
- Document component interfaces and behaviors

## External Resources

### Documentation
- **Bun Documentation**: [https://bun.sh/docs](https://bun.sh/docs)
- **Web Components MDN**: [https://developer.mozilla.org/en-US/docs/Web/API/Web_components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
- **Shadow DOM MDN**: [https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)

### MCP Access
- **Git MCP**: [https://gitmcp.io/idosal/git-mcp](https://gitmcp.io/idosal/git-mcp)
- **Data-Star MCP**: [https://gitmcp.io/starfederation/datastar](https://gitmcp.io/starfederation/datastar)
- **Bun MCP**: [https://gitmcp.io/oven-sh/bun](https://gitmcp.io/oven-sh/bun)

### Tutorials & References
- Collect helpful tutorials and reference materials here
- Document links to community resources
- Track relevant blog posts or articles

### Web Search Guidelines
- Proactively use web_search for:
  - Project dependencies and libraries information
  - Best practices for technologies (BunJS, Web Components, Data-Star)
  - Specific technical challenges identified in the Memory Bank
  - Standards and conventions for frameworks used in the project
- Respond to time-related questions using web_search
- Prioritize using web_search for factual or current information
- Document important external resources in techContext.md 