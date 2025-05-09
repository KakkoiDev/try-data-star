import { Database } from "bun:sqlite";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { DB_PATH, MIGRATIONS_DIR, SEEDS_DIR } from "../consts.ts";

export const db = new Database(DB_PATH);

export async function setupDatabase() {
	// Create migrations table if it doesn't exist
	db.run(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY,
      name TEXT,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

	// Get applied migrations
	const appliedMigrations = db.query("SELECT name FROM migrations").all() as {
		name: string;
	}[];
	const appliedMigrationNames = new Set(appliedMigrations.map((m) => m.name));

	// Get all migration files
	const migrationFiles = readdirSync(MIGRATIONS_DIR)
		.filter((file) => file.endsWith(".sql"))
		.sort(); // This ensures migrations run in order (001, 002, etc.)

	// Run pending migrations
	for (const migrationFile of migrationFiles) {
		if (!appliedMigrationNames.has(migrationFile)) {
			console.log(`Applying migration: ${migrationFile}`);

			const migrationSql = await Bun.file(
				join(MIGRATIONS_DIR, migrationFile),
			).text();

			// Begin transaction for this migration
			db.run("BEGIN TRANSACTION");

			try {
				// Run the migration SQL
				db.run(migrationSql);

				// Record the migration
				db.run("INSERT INTO migrations (name) VALUES (?)", [migrationFile]);

				// Commit the transaction
				db.run("COMMIT");
				console.log(`Migration applied: ${migrationFile}`);
			} catch (error) {
				// Rollback on error
				db.run("ROLLBACK");
				console.error(`Error applying migration ${migrationFile}:`, error);
				throw error;
			}
		}
	}

	return db;
}

export async function seedDatabase() {
	const db = new Database(DB_PATH);

	// Create seeds tracking table if it doesn't exist
	db.run(`
    CREATE TABLE IF NOT EXISTS seeds (
      id INTEGER PRIMARY KEY,
      name TEXT,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

	// Get applied seeds
	const appliedSeeds = db.query("SELECT name FROM seeds").all() as {
		name: string;
	}[];
	const appliedSeedNames = new Set(appliedSeeds.map((s) => s.name));

	// Get all seed files
	const seedFiles = readdirSync(SEEDS_DIR)
		.filter((file) => file.endsWith(".sql"))
		.sort();

	// Run pending seeds
	for (const seedFile of seedFiles) {
		if (!appliedSeedNames.has(seedFile)) {
			console.log(`Applying seed: ${seedFile}`);

			const seedSql = await Bun.file(join(SEEDS_DIR, seedFile)).text();

			// Begin transaction for this seed
			db.run("BEGIN TRANSACTION");

			try {
				// Run the seed SQL
				db.run(seedSql);

				// Record the seed
				db.run("INSERT INTO seeds (name) VALUES (?)", [seedFile]);

				// Commit the transaction
				db.run("COMMIT");
				console.log(`Seed applied: ${seedFile}`);
			} catch (error) {
				// Rollback on error
				db.run("ROLLBACK");
				console.error(`Error applying seed ${seedFile}:`, error);
				throw error;
			}
		}
	}
}
