import Dexie, { type EntityTable } from "dexie";

import { Note } from "./Note";

const db = new Dexie("notes-database") as Dexie & {
  notes: EntityTable<Note, "id">;
};

db.version(1).stores({
  notes: "++id, title, content",
});

export type { Note };
export { db };
