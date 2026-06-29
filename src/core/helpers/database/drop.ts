import { SQLiteDatabase } from "expo-sqlite";

const dropTables = ["lessons", "sections"];

export const drop = async (db: SQLiteDatabase): Promise<void> => {
  for (const table of dropTables) {
    await db.execAsync(`DROP TABLE IF EXISTS ${table};`);
  }
  await db.execAsync(`PRAGMA user_version = 0`);
};
