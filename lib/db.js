import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const dbPath = path.join(process.cwd(), 'iq_database.db');

export async function openDb() {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Ensure tables exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT,
      phone TEXT,
      age INTEGER,
      education TEXT,
      ielts TEXT,
      experience TEXT,
      preferredCountry TEXT,
      type TEXT,
      score TEXT,
      status TEXT,
      message TEXT,
      date TEXT
    );
  `);

  return db;
}
