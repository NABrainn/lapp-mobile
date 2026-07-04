import { SQLiteDatabase } from "expo-sqlite";
import { runOnce } from "./run-once";

const create = async (db: SQLiteDatabase) => {
  const createSectionsQuery = `
    CREATE TABLE "sections" (
     	"id"	INTEGER NOT NULL UNIQUE,
     	"title"	TEXT NOT NULL,
     	"created_at"	TEXT NOT NULL DEFAULT current_timestamp,
     	"updated_at"	TEXT NOT NULL DEFAULT current_timestamp,
     	PRIMARY KEY("id" AUTOINCREMENT)
    );
  `;

  const createLessonsQuery = `
    CREATE TABLE "lessons" (
     	"id"	INTEGER NOT NULL UNIQUE,
     	"photo_url"	TEXT,
     	"title"	TEXT NOT NULL,
     	"description"	TEXT,
     	"content"	BLOB NOT NULL,
     	"created_at"	TEXT NOT NULL DEFAULT current_timestamp,
     	"updated_at"	TEXT NOT NULL DEFAULT current_timestamp,
     	"section_id"	INTEGER NOT NULL,
     	PRIMARY KEY("id" AUTOINCREMENT),
     	FOREIGN KEY("section_id") REFERENCES "sections"("id")
    );
  `;

  for (const query of [createSectionsQuery, createLessonsQuery]) {
    await db.execAsync(query);
  }
};

const populate = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    INSERT INTO sections (title) VALUES
      ('Beginner Stories'),
      ('Daily Life'),
      ('Travel');
  `);

  await db.runAsync(
    `
    INSERT INTO lessons (photo_url, title, description, content, section_id)
    VALUES (
      '',
      'Det nye testamentet',
      'Det nye testamentet er den spesifikt kristne delen av Bibelen.',
      '{
        "paragraphs": [
          {
            "tokens": [
              { "inputText": ["Det", "nye", "testamentet"], "outputText": ["The New Testament"], "familiarity": "recognized", "isPressable": true, "isPersisted": true },
              { "inputText": ["er"], "outputText": ["is"], "familiarity": "known", "isPressable": true, "isPersisted": true },
              { "inputText": ["den", "spesifikt", "kristne"], "outputText": ["the specifically Christian"], "familiarity": "new", "isPressable": true, "isPersisted": true },
              { "inputText": ["delen"], "outputText": ["part"], "familiarity": "new", "isPressable": true, "isPersisted": true },
              { "inputText": ["av", "Bibelen."], "outputText": ["of the Bible."], "familiarity": "recognized", "isPressable": true, "isPersisted": true },

              { "inputText": ["Det"], "outputText": ["It"], "familiarity": "known", "isPressable": true, "isPersisted": true },
              { "inputText": ["består", "av"], "outputText": ["consists of"], "familiarity": "recognized", "isPressable": true, "isPersisted": true },
              { "inputText": ["27"], "outputText": ["27"], "familiarity": "pristine", "isPressable": false, "isPersisted": false },
              { "inputText": ["ulike", "tekster"], "outputText": ["different texts"], "familiarity": "new", "isPressable": true, "isPersisted": true },
              { "inputText": ["som"], "outputText": ["that", "which"], "familiarity": "known", "isPressable": true, "isPersisted": true },
              { "inputText": ["handler", "om"], "outputText": ["are about", "deal with"], "familiarity": "recognized", "isPressable": true, "isPersisted": true },
              { "inputText": ["Jesus"], "outputText": ["Jesus"], "familiarity": "ignored", "isPressable": true, "isPersisted": false },
              { "inputText": ["og"], "outputText": ["and"], "familiarity": "known", "isPressable": true, "isPersisted": true },
              { "inputText": ["hans", "betydning,"], "outputText": ["his significance,"], "familiarity": "new", "isPressable": true, "isPersisted": true },
              { "inputText": ["og"], "outputText": ["and"], "familiarity": "known", "isPressable": true, "isPersisted": true },
              { "inputText": ["om", "de", "første", "kristne."], "outputText": ["about the first Christians."], "familiarity": "recognized", "isPressable": true, "isPersisted": true },

              { "inputText": ["Tekstene"], "outputText": ["the texts"], "familiarity": "new", "isPressable": true, "isPersisted": true },
              { "inputText": ["i"], "outputText": ["in"], "familiarity": "known", "isPressable": true, "isPersisted": true },
              { "inputText": ["Det", "nye", "testamentet"], "outputText": ["The New Testament"], "familiarity": "recognized", "isPressable": true, "isPersisted": true },
              { "inputText": ["ble", "skrevet"], "outputText": ["were written"], "familiarity": "new", "isPressable": true, "isPersisted": true },
              { "inputText": ["på", "gresk"], "outputText": ["in Greek"], "familiarity": "recognized", "isPressable": true, "isPersisted": true },
              { "inputText": ["og"], "outputText": ["and"], "familiarity": "known", "isPressable": true, "isPersisted": true },
              { "inputText": ["ble", "til"], "outputText": ["came into being"], "familiarity": "new", "isPressable": true, "isPersisted": true },
              { "inputText": ["mellom"], "outputText": ["between"], "familiarity": "new", "isPressable": true, "isPersisted": true },
              { "inputText": ["cirka", "år", "50"], "outputText": ["around the year 50"], "familiarity": "new", "isPressable": true, "isPersisted": true },
              { "inputText": ["og"], "outputText": ["and"], "familiarity": "known", "isPressable": true, "isPersisted": true },
              { "inputText": ["begynnelsen", "av", "100-tallet"], "outputText": ["the beginning of the 100s", "the beginning of the second century"], "familiarity": "new", "isPressable": true, "isPersisted": true },
              { "inputText": ["evt."], "outputText": ["CE."], "familiarity": "new", "isPressable": true, "isPersisted": true }
            ],
            "newLineHeight": 10
          }
        ]
      }',
      1
    );
    `,
  );
};

export const seed = async (db: SQLiteDatabase): Promise<void> => {
  const callback = async () => {
    await create(db);
    await populate(db);
  };

  await runOnce(db, callback);
};
