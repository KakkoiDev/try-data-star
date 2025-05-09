import { seedDatabase } from "./db.ts";

// Seed the database
await seedDatabase();

console.log("Database seeding complete!");
