import { setupDatabase } from "./db.ts";

// Initialize database with migrations
const db = await setupDatabase();

console.log("Database setup & migrations applied!");
