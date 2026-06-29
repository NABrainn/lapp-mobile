import { SQLiteDatabase } from "expo-sqlite";

type UserVersion = { user_version: number } | null;

const DATABASE_VERSION: number = 1;

export const runOnce = async (
  db: SQLiteDatabase,
  callback: () => Promise<void>,
) => {
  const versionResult = await db.getFirstAsync<UserVersion>(
    "PRAGMA user_version",
  );
  const currentVersion: number = versionResult?.user_version ?? 0;
  if (currentVersion >= DATABASE_VERSION) {
    return;
  }
  await callback();
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
};
